import { useEffect, useMemo, useState } from "react";
import { Dropzone } from "../../components/common/Dropzone";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { downloadBlob } from "../../lib/downloads";
import { fileToDataUrl, loadImage } from "../../lib/files";

type SampleMode = "corners" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

function colorDistance(a: Uint8ClampedArray, index: number, color: [number, number, number]) {
  const dr = a[index] - color[0];
  const dg = a[index + 1] - color[1];
  const db = a[index + 2] - color[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function sampleColor(data: Uint8ClampedArray, width: number, height: number, mode: SampleMode): [number, number, number] {
  const points: Record<SampleMode, Array<[number, number]>> = {
    corners: [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]],
    "top-left": [[0, 0]],
    "top-right": [[width - 1, 0]],
    "bottom-left": [[0, height - 1]],
    "bottom-right": [[width - 1, height - 1]]
  };
  const colors = points[mode].map(([x, y]) => {
    const i = (y * width + x) * 4;
    return [data[i], data[i + 1], data[i + 2]] as [number, number, number];
  });
  return [
    Math.round(colors.reduce((sum, color) => sum + color[0], 0) / colors.length),
    Math.round(colors.reduce((sum, color) => sum + color[1], 0) / colors.length),
    Math.round(colors.reduce((sum, color) => sum + color[2], 0) / colors.length)
  ];
}

export function BackgroundRemover() {
  const [src, setSrc] = useState("");
  const [result, setResult] = useState("");
  const [tolerance, setTolerance] = useState(42);
  const [softness, setSoftness] = useState(18);
  const [mode, setMode] = useState<SampleMode>("corners");
  const [message, setMessage] = useState("");

  const canRemove = useMemo(() => Boolean(src), [src]);

  useEffect(() => {
    return () => {
      if (result) URL.revokeObjectURL(result);
    };
  }, [result]);

  async function removeBackground() {
    if (!src) {
      setMessage("Choose an image first.");
      return;
    }

    try {
      const image = await loadImage(src);
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) throw new Error("Canvas is not available.");

      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const bg = sampleColor(data, canvas.width, canvas.height, mode);

      for (let i = 0; i < data.length; i += 4) {
        const distance = colorDistance(data, i, bg);
        if (distance <= tolerance) {
          data[i + 3] = 0;
        } else if (distance <= tolerance + softness) {
          const alpha = Math.min(255, Math.round(((distance - tolerance) / softness) * 255));
          data[i + 3] = alpha;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) {
          setMessage("Couldn’t generate the output. Please try again.");
          return;
        }
        if (result) URL.revokeObjectURL(result);
        setResult(URL.createObjectURL(blob));
        setMessage("Background removed locally. Works best with plain backgrounds.");
      }, "image/png");
    } catch {
      setMessage("The image could not be processed in the browser. Try another file.");
    }
  }

  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Remove image background</h2>
        <Dropzone label="Choose an image" accept="image/*" onFiles={async ([file]) => file && setSrc(await fileToDataUrl(file))} />
        <div className="field-grid">
          <label className="field">
            Background sample
            <select className="tool-select" value={mode} onChange={(event) => setMode(event.target.value as SampleMode)}>
              <option value="corners">Average corners</option>
              <option value="top-left">Top left</option>
              <option value="top-right">Top right</option>
              <option value="bottom-left">Bottom left</option>
              <option value="bottom-right">Bottom right</option>
            </select>
          </label>
          <label className="field">
            Tolerance: {tolerance}
            <input type="range" min="8" max="120" value={tolerance} onChange={(event) => setTolerance(Number(event.target.value))} />
          </label>
          <label className="field">
            Edge softness: {softness}
            <input type="range" min="0" max="80" value={softness} onChange={(event) => setSoftness(Number(event.target.value))} />
          </label>
        </div>
        <div className="button-row">
          <NeuButton onClick={removeBackground} disabled={!canRemove}>Remove background</NeuButton>
          {result && <NeuButton onClick={() => fetch(result).then((r) => r.blob()).then((blob) => downloadBlob(blob, "toolzi-background-removed.png"))}>Download PNG</NeuButton>}
        </div>
        <p className="muted">This local MVP works best on product photos, screenshots, and images with a mostly solid background.</p>
      </section>
      <OutputPanel title="Transparent preview">
        <p>{message || "The transparent PNG preview appears here."}</p>
        {result && <div className="media-preview-frame"><img className="image-preview" src={result} alt="Background removed preview" /></div>}
      </OutputPanel>
    </div>
  );
}
