import { useEffect, useRef, useState } from "react";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { downloadBlob } from "../../lib/downloads";

export function BratGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("brat");
  const [background, setBackground] = useState("#8ace00");
  const [textColor, setTextColor] = useState("#111111");
  const [transparent, setTransparent] = useState(false);
  const [blur, setBlur] = useState(1.1);
  const [fontSize, setFontSize] = useState(118);
  const [format, setFormat] = useState<"square" | "story" | "wide">("square");
  const [style, setStyle] = useState<"cover" | "poster">("cover");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dimensions = format === "story" ? [1080, 1920] : format === "wide" ? [1600, 900] : [1080, 1080];
    canvas.width = dimensions[0];
    canvas.height = dimensions[1];
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!transparent) {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const fontFamily = `"Arial Narrow", "Helvetica Neue Condensed", "Roboto Condensed", Arial, sans-serif`;
    const rawLines = text.trim().toLowerCase().split(/\n+/).filter(Boolean);
    const lines = rawLines.length ? rawLines : ["brat"];
    const maxWidth = canvas.width * (style === "cover" ? 0.68 : 0.82);
    const baseSize = style === "cover" ? Math.min(fontSize, canvas.width * 0.13) : fontSize;
    let fittedSize = baseSize;
    ctx.font = `500 ${fittedSize}px ${fontFamily}`;
    const widest = () => Math.max(...lines.map((line) => ctx.measureText(line).width));
    while (widest() > maxWidth && fittedSize > 28) {
      fittedSize -= 2;
      ctx.font = `500 ${fittedSize}px ${fontFamily}`;
    }

    ctx.save();
    ctx.fillStyle = textColor;
    ctx.font = `500 ${fittedSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.filter = `blur(${style === "cover" ? blur : Math.max(0, blur * 0.55)}px)`;
    ctx.globalAlpha = style === "cover" ? 0.92 : 1;
    const lineHeight = fittedSize * (style === "cover" ? 0.92 : 1.08);
    const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, index) => {
      if (style === "cover") {
        ctx.save();
        ctx.translate(canvas.width / 2, startY + index * lineHeight);
        ctx.scale(0.82, 1);
        ctx.fillText(line, 0, 0);
        ctx.restore();
      } else {
        ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
      }
    });
    ctx.restore();
  }, [background, blur, fontSize, format, style, text, textColor, transparent]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => blob && downloadBlob(blob, "toolzi-brat.png"), "image/png");
  }

  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Make a brat-style cover</h2>
        <label className="field">
          Text
          <textarea className="tool-textarea brat-textarea" value={text} onChange={(event) => setText(event.target.value)} maxLength={80} />
        </label>
        <div className="field-grid">
          <label className="field">
            Style
            <select className="tool-select" value={style} onChange={(event) => setStyle(event.target.value as "cover" | "poster")}>
              <option value="cover">Brat cover</option>
              <option value="poster">Poster text</option>
            </select>
          </label>
          <label className="field">
            Format
            <select className="tool-select" value={format} onChange={(event) => setFormat(event.target.value as "square" | "story" | "wide")}>
              <option value="square">Square post</option>
              <option value="story">Story</option>
              <option value="wide">Wide</option>
            </select>
          </label>
          <label className="field">
            Background
            <input className="tool-input color-input" type="color" value={background} onChange={(event) => setBackground(event.target.value)} disabled={transparent} />
          </label>
          <label className="field">
            Text color
            <input className="tool-input color-input" type="color" value={textColor} onChange={(event) => setTextColor(event.target.value)} />
          </label>
          <label className="field">
            Transparent background
            <input type="checkbox" checked={transparent} onChange={(event) => setTransparent(event.target.checked)} />
          </label>
          <label className="field">
            Text size: {fontSize}px
            <input type="range" min="48" max="180" value={fontSize} onChange={(event) => setFontSize(Number(event.target.value))} />
          </label>
          <label className="field">
            Blur: {blur.toFixed(1)}px
            <input type="range" min="0" max="2.8" step="0.1" value={blur} onChange={(event) => setBlur(Number(event.target.value))} />
          </label>
        </div>
        <div className="button-row">
          <NeuButton onClick={download}>Download PNG</NeuButton>
          <NeuButton variant="ghost" onClick={() => {
            setText("brat");
            setBackground("#8ace00");
            setTextColor("#111111");
            setTransparent(false);
            setBlur(1.1);
            setFontSize(118);
            setFormat("square");
            setStyle("cover");
          }}>Reset</NeuButton>
        </div>
        <p className="muted">Cover mode keeps the text small, lowercase, condensed, and slightly blurry. Add line breaks only when you want multiple lines.</p>
      </section>
      <OutputPanel title="Meme preview">
        <div className="media-preview-frame brat-preview-frame">
          <canvas ref={canvasRef} className="brat-canvas" aria-label="Generated brat-style meme preview" />
        </div>
      </OutputPanel>
    </div>
  );
}
