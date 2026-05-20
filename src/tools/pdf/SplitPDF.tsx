import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Dropzone } from "../../components/common/Dropzone";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { downloadBlob } from "../../lib/downloads";
import { formatFileSize } from "../../lib/files";
import { parsePageRanges } from "../../lib/pdf";

export function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [range, setRange] = useState("1-3");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function split() {
    if (!file) {
      setMessage("Choose a PDF first.");
      return;
    }
    setBusy(true);
    try {
      const source = await PDFDocument.load(await file.arrayBuffer());
      const indices = parsePageRanges(range, source.getPageCount());
      const out = await PDFDocument.create();
      const pages = await out.copyPages(source, indices);
      pages.forEach((page) => out.addPage(page));
      const bytes = await out.save();
      downloadBlob(new Blob([bytes.slice().buffer], { type: "application/pdf" }), "toolzi-split.pdf");
      setMessage(`Downloaded ${indices.length} page${indices.length === 1 ? "" : "s"}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "This PDF could not be processed in the browser. Try another file.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Extract pages</h2>
        <Dropzone label="Choose one PDF" accept="application/pdf,.pdf" onFiles={([next]) => setFile(next ?? null)} />
        {file && <p className="muted">{file.name} · {formatFileSize(file.size)}</p>}
        <label className="field">
          Page ranges
          <input className="tool-input" value={range} onChange={(event) => setRange(event.target.value)} placeholder="1-3, 5, 8" />
          <small>Use ranges like 1-3, 5, or 2,4,6.</small>
        </label>
        <div className="button-row">
          <NeuButton onClick={split} disabled={busy}>{busy ? "Splitting..." : "Split and download"}</NeuButton>
        </div>
      </section>
      <OutputPanel title="Status">
        <p>{message || "Selected pages are copied into a new PDF locally."}</p>
      </OutputPanel>
    </div>
  );
}
