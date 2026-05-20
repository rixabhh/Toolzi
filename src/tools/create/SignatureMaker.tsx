import { useRef, useState } from "react";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { downloadBlob } from "../../lib/downloads";

export function SignatureMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [transparent, setTransparent] = useState(true);

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: ((event.clientX - rect.left) / rect.width) * canvas.width, y: ((event.clientY - rect.top) / rect.height) * canvas.height };
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const out = document.createElement("canvas");
    out.width = canvas.width;
    out.height = canvas.height;
    const ctx = out.getContext("2d")!;
    if (!transparent) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, out.width, out.height);
    }
    ctx.drawImage(canvas, 0, 0);
    out.toBlob((blob) => blob && downloadBlob(blob, "toolzi-signature.png"), "image/png");
  };

  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Draw signature</h2>
        <canvas
          ref={canvasRef}
          width={1000}
          height={360}
          className="signature-canvas"
          aria-label="Signature drawing canvas"
          onPointerDown={(event) => {
            drawing.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            const ctx = event.currentTarget.getContext("2d")!;
            const p = point(event);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
          }}
          onPointerMove={(event) => {
            if (!drawing.current) return;
            const ctx = event.currentTarget.getContext("2d")!;
            const p = point(event);
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.strokeStyle = "#202225";
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }}
          onPointerUp={() => { drawing.current = false; }}
        />
        <label className="field">Transparent background<input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} /></label>
        <div className="button-row"><NeuButton onClick={download}>Download PNG</NeuButton><NeuButton variant="ghost" onClick={clear}>Clear</NeuButton></div>
      </section>
      <OutputPanel title="Tip"><p>Draw with mouse, touch, or stylus. The downloaded PNG is created locally.</p></OutputPanel>
    </div>
  );
}
