import { useEffect, useState } from "react";
import { Dropzone } from "../../components/common/Dropzone";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { downloadBlob } from "../../lib/downloads";
import { fileToDataUrl, loadImage } from "../../lib/files";

const presets = [
  { id: "custom", label: "Custom", width: 0, height: 0 },
  { id: "instagram-square", label: "Instagram post", width: 1080, height: 1080 },
  { id: "instagram-portrait", label: "Instagram portrait", width: 1080, height: 1350 },
  { id: "story", label: "Story / Reel / Short", width: 1080, height: 1920 },
  { id: "youtube-thumbnail", label: "YouTube thumbnail", width: 1280, height: 720 },
  { id: "x-post", label: "X / Twitter post", width: 1600, height: 900 },
  { id: "linkedin-post", label: "LinkedIn post", width: 1200, height: 1200 },
  { id: "facebook-cover", label: "Facebook cover", width: 1640, height: 924 },
  { id: "pinterest-pin", label: "Pinterest pin", width: 1000, height: 1500 }
];

export function ImageResizer() {
  const [src, setSrc] = useState("");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [lock, setLock] = useState(true);
  const [ratio, setRatio] = useState(4 / 3);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [preset, setPreset] = useState("custom");

  useEffect(() => {
    if (!src) return;
    loadImage(src).then((image) => {
      setWidth(image.width);
      setHeight(image.height);
      setRatio(image.width / image.height);
    }).catch(() => setMessage("Couldn’t read that image. Please try another file."));
  }, [src]);

  async function resize() {
    if (!src) {
      setMessage("Choose an image first.");
      return;
    }
    const image = await loadImage(src);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.drawImage(image, 0, 0, width, height);
    const url = canvas.toDataURL("image/png");
    setPreview(url);
    setMessage("Resized image is ready.");
  }

  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Resize an image</h2>
        <Dropzone label="Choose an image" accept="image/*" onFiles={async ([file]) => file && setSrc(await fileToDataUrl(file))} />
        <label className="field">
          Social media format
          <select
            className="tool-select"
            value={preset}
            onChange={(event) => {
              const next = presets.find((item) => item.id === event.target.value) ?? presets[0];
              setPreset(next.id);
              if (next.id !== "custom") {
                setWidth(next.width);
                setHeight(next.height);
                setLock(false);
              }
            }}
          >
            {presets.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}{item.id !== "custom" ? ` (${item.width} x ${item.height})` : ""}
              </option>
            ))}
          </select>
        </label>
        <div className="field-grid">
          <label className="field">
            Width
            <input className="tool-input" type="number" min="1" value={width} onChange={(event) => {
              const next = Number(event.target.value);
              setWidth(next);
              setPreset("custom");
              if (lock) setHeight(Math.max(1, Math.round(next / ratio)));
            }} />
          </label>
          <label className="field">
            Height
            <input className="tool-input" type="number" min="1" value={height} onChange={(event) => {
              const next = Number(event.target.value);
              setHeight(next);
              setPreset("custom");
              if (lock) setWidth(Math.max(1, Math.round(next * ratio)));
            }} />
          </label>
          <label className="field">
            Lock aspect ratio
            <input type="checkbox" checked={lock} onChange={(event) => setLock(event.target.checked)} />
          </label>
        </div>
        <div className="button-row">
          <NeuButton onClick={resize}>Resize</NeuButton>
          {preview && <NeuButton onClick={() => fetch(preview).then((r) => r.blob()).then((blob) => downloadBlob(blob, "toolzi-resized.png"))}>Download</NeuButton>}
        </div>
      </section>
      <OutputPanel title="Preview">
        <p>{message || "Resized image appears here."}</p>
        {preview && <div className="media-preview-frame"><img className="image-preview" src={preview} alt="Resized preview" /></div>}
      </OutputPanel>
    </div>
  );
}
