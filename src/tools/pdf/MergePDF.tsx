import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Dropzone } from "../../components/common/Dropzone";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { downloadBlob } from "../../lib/downloads";
import { formatFileSize } from "../../lib/files";

export function MergePDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const move = (index: number, direction: -1 | 1) => {
    const next = [...files];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setFiles(next);
  };

  async function merge() {
    if (files.length < 2) {
      setMessage("Choose at least two PDFs to merge.");
      return;
    }
    setBusy(true);
    setMessage("Merging locally...");
    try {
      const out = await PDFDocument.create();
      for (const file of files) {
        const source = await PDFDocument.load(await file.arrayBuffer());
        const pages = await out.copyPages(source, source.getPageIndices());
        pages.forEach((page) => out.addPage(page));
      }
      const bytes = await out.save();
      downloadBlob(new Blob([bytes.slice().buffer], { type: "application/pdf" }), "toolzi-merged.pdf");
      setMessage("Merged PDF downloaded.");
    } catch {
      setMessage("This PDF could not be processed in the browser. Try another file.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Combine PDFs</h2>
        <Dropzone label="Choose PDF files" accept="application/pdf,.pdf" multiple onFiles={(next) => setFiles(next)} />
        <ul className="list">
          {files.map((file, index) => (
            <li className="list-item" key={`${file.name}-${index}`}>
              <span>{file.name} · {formatFileSize(file.size)}</span>
              <span>
                <NeuButton variant="ghost" onClick={() => move(index, -1)} aria-label={`Move ${file.name} up`}>Up</NeuButton>{" "}
                <NeuButton variant="ghost" onClick={() => move(index, 1)} aria-label={`Move ${file.name} down`}>Down</NeuButton>
              </span>
            </li>
          ))}
        </ul>
        <div className="button-row">
          <NeuButton onClick={merge} disabled={busy}>{busy ? "Merging..." : "Merge and download"}</NeuButton>
        </div>
      </section>
      <OutputPanel title="Status">
        <p>{message || "PDFs are merged inside your browser. Nothing gets uploaded."}</p>
      </OutputPanel>
    </div>
  );
}
