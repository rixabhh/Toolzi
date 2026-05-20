import { useMemo, useState } from "react";
import { NeuButton } from "../../components/common/NeuButton";
import { copyText } from "../../lib/downloads";

export function CssGradientGenerator() {
  const [a, setA] = useState("#f3c7c7"), [b, setB] = useState("#c9ddf2"), [angle, setAngle] = useState(135);
  const css = useMemo(() => `linear-gradient(${angle}deg, ${a}, ${b})`, [a, angle, b]);
  return <div className="tool-layout"><section className="tool-panel neu-card"><h2>CSS gradient</h2><div className="field-grid"><label className="field">First color<input className="tool-input color-input" type="color" value={a} onChange={(e) => setA(e.target.value)} /></label><label className="field">Second color<input className="tool-input color-input" type="color" value={b} onChange={(e) => setB(e.target.value)} /></label><label className="field">Angle: {angle}<input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} /></label></div><div className="button-row"><NeuButton onClick={() => copyText(`background: ${css};`)}>Copy CSS</NeuButton></div></section><section className="output-panel neu-card"><div className="output-panel-header"><h3>Preview</h3><span>Local preview</span></div><div className="gradient-preview" style={{ background: css }} /><textarea className="tool-textarea" readOnly value={`background: ${css};`} /></section></div>;
}
