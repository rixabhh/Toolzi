import { useMemo, useState } from "react";

function lum(hex: string) { const rgb = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16) / 255) ?? [0, 0, 0]; const c = rgb.map((v) => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; }
export function ColorTools() {
  const [fg, setFg] = useState("#2f3136"); const [bg, setBg] = useState("#e6e6e6");
  const ratio = useMemo(() => { const a = lum(fg), b = lum(bg); return ((Math.max(a, b) + .05) / (Math.min(a, b) + .05)); }, [fg, bg]);
  return <div className="tool-layout"><section className="tool-panel neu-card"><h2>Color contrast</h2><div className="field-grid"><label className="field">Text<input className="tool-input color-input" type="color" value={fg} onChange={(e) => setFg(e.target.value)} /></label><label className="field">Background<input className="tool-input color-input" type="color" value={bg} onChange={(e) => setBg(e.target.value)} /></label></div></section><section className="output-panel neu-card"><div className="output-panel-header"><h3>Preview</h3><span>Local preview</span></div><div className="color-sample" style={{ color: fg, background: bg }}>Toolzi contrast sample</div><div className="stat"><strong>{ratio.toFixed(2)}:1</strong><span>{ratio >= 4.5 ? "Passes normal text" : ratio >= 3 ? "Passes large text" : "Needs more contrast"}</span></div></section></div>;
}
