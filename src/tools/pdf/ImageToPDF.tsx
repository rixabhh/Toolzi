import { useState } from "react";
import { PDFDocument, PageSizes } from "pdf-lib";
import { Dropzone } from "../../components/common/Dropzone";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { downloadBlob } from "../../lib/downloads";
import { formatFileSize } from "../../lib/files";

export function ImageToPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [pageSize, setPageSize] = useState<"A4" | "Letter">("A4");
  const [fitMode, setFitMode] = useState("fit");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function createPdf() {
    if (!files.length) {
      setMessage("Choose at least one image.");
      return;
    }
    setBusy(true);
    try {
      const pdf = await PDFDocument.create();
      const size = pageSize === "A4" ? PageSizes.A4 : PageSizes.Letter;
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const image = file.type.includes("png") ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
        const page = pdf.addPage(size);
        const pageWidth = page.getWidth();
        const pageHeight = page.getHeight();
        const scale = fitMode === "original" ? 1 : Math[fitMode === "fill" ? "max" : "min"](pageWidth / image.width, pageHeight / image.height);
        const width = Math.min(image.width * scale, pageWidth);
        const height = Math.min(image.height * scale, pageHeight);
        page.drawImage(image, { x: (pageWidth - width) / 2, y: (pageHeight - height) / 2, width, height });
      }
      const bytes = await pdf.save();
      downloadBlob(new Blob([bytes.slice().buffer], { type: "application/pdf" }), "toolzi-images.pdf");
      setMessage("Image PDF downloaded.");
    } catch {
      setMessage("Couldn’t generate the output. Please try JPG or PNG images.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Make a PDF from images</h2>
        <Dropzone label="Choose images" accept="image/jpeg,image/png,.jpg,.jpeg,.png" multiple onFiles={setFiles} />
        <div className="field-grid">
          <label className="field">
            Page size
            <select className="tool-select" value={pageSize} onChange={(event) => setPageSize(event.target.value as "A4" | "Letter")}>
              <option>A4</option>
              <option>Letter</option>
            </select>
          </label>
          <label className="field">
            Fit mode
            <select className="tool-select" value={fitMode} onChange={(event) => setFitMode(event.target.value)}>
              <option value="fit">Fit</option>
              <option value="fill">Fill</option>
              <option value="original">Original</option>
            </select>
          </label>
        </div>
        <ul className="list">
          {files.map((file) => <li className="list-item" key={file.name}>{file.name} · {formatFileSize(file.size)}</li>)}
        </ul>
        <div className="button-row">
          <NeuButton onClick={createPdf} disabled={busy}>{busy ? "Creating..." : "Create PDF"}</NeuButton>
        </div>
      </section>
      <OutputPanel title="Status">
        <p>{message || "JPG and PNG images can be packed into a PDF locally."}</p>
      </OutputPanel>
    </div>
  );
}
