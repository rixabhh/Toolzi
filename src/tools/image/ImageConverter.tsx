import { useState } from "react";
import { Dropzone } from "../../components/common/Dropzone";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { downloadBlob } from "../../lib/downloads";
import { fileToDataUrl, loadImage } from "../../lib/files";

const mimeByFormat: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp"
};

export function ImageConverter() {
  const [src, setSrc] = useState("");
  const [format, setFormat] = useState("webp");
  const [preview, setPreview] = useState("");
  const [blob, setBlob] = useState<Blob | null>(null);
  const [message, setMessage] = useState("");

  async function convert() {
    if (!src) {
      setMessage("Choose an image first.");
      return;
    }
    try {
      const image = await loadImage(src);
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext("2d")?.drawImage(image, 0, 0);
      canvas.toBlob((next) => {
        if (!next) {
          setMessage("Couldn’t generate the output. Please try again.");
          return;
        }
        const url = URL.createObjectURL(next);
        if (preview) URL.revokeObjectURL(preview);
        setBlob(next);
        setPreview(url);
        setMessage("Converted image is ready.");
      }, mimeByFormat[format], 0.92);
    } catch {
      setMessage("Couldn’t generate the output. Please try again.");
    }
  }

  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Convert image format</h2>
        <Dropzone label="Choose an image" accept="image/*" onFiles={async ([file]) => file && setSrc(await fileToDataUrl(file))} />
        <label className="field">
          Output format
          <select className="tool-select" value={format} onChange={(event) => setFormat(event.target.value)}>
            <option value="jpg">JPG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
          </select>
        </label>
        <div className="button-row">
          <NeuButton onClick={convert}>Convert</NeuButton>
          {blob && <NeuButton onClick={() => downloadBlob(blob, `toolzi-converted.${format}`)}>Download</NeuButton>}
        </div>
      </section>
      <OutputPanel title="Preview">
        <p>{message || "Converted image appears here."}</p>
        {preview && <div className="media-preview-frame"><img className="image-preview" src={preview} alt="Converted preview" /></div>}
      </OutputPanel>
    </div>
  );
}
