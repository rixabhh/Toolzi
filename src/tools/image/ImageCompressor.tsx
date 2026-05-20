import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { Dropzone } from "../../components/common/Dropzone";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { downloadBlob } from "../../lib/downloads";
import { formatFileSize } from "../../lib/files";

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.72);
  const [output, setOutput] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!output) return;
    const url = URL.createObjectURL(output);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [output]);

  async function compress() {
    if (!file) {
      setMessage("Choose an image first.");
      return;
    }
    setMessage("Compressing locally...");
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 8,
        initialQuality: quality,
        useWebWorker: true
      });
      setOutput(compressed);
      setMessage("Compressed image is ready.");
    } catch {
      setMessage("The image is too large for your browser to handle smoothly. Try a smaller file.");
    }
  }

  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Compress an image</h2>
        <Dropzone label="Choose an image" accept="image/*" onFiles={([next]) => setFile(next ?? null)} />
        {file && <p className="muted">Original: {file.name} · {formatFileSize(file.size)}</p>}
        <label className="field">
          Quality: {Math.round(quality * 100)}%
          <input type="range" min="0.2" max="1" step="0.02" value={quality} onChange={(event) => setQuality(Number(event.target.value))} />
        </label>
        <div className="button-row">
          <NeuButton onClick={compress}>Compress</NeuButton>
          {output && <NeuButton onClick={() => downloadBlob(output, `toolzi-${output.name}`)}>Download</NeuButton>}
        </div>
      </section>
      <OutputPanel title="Preview">
        <p>{message || "Compressed output appears here."}</p>
        {output && <p className="muted">New size: {formatFileSize(output.size)}</p>}
        {preview && <div className="media-preview-frame"><img className="image-preview" src={preview} alt="Compressed preview" /></div>}
      </OutputPanel>
    </div>
  );
}
