import { useMemo, useState } from "react";
import { OutputPanel } from "../../components/common/OutputPanel";

export function PercentageCalculator() {
  const [mode, setMode] = useState("of");
  const [a, setA] = useState(20);
  const [b, setB] = useState(100);
  const result = useMemo(() => {
    if (mode === "of") return `${a}% of ${b} = ${(a / 100) * b}`;
    if (mode === "change") return `Change from ${a} to ${b} = ${a === 0 ? 0 : (((b - a) / a) * 100).toFixed(2)}%`;
    if (mode === "discount") return `${a}% off ${b} = ${b - (a / 100) * b}`;
    return `${a} out of ${b} = ${b === 0 ? 0 : ((a / b) * 100).toFixed(2)}%`;
  }, [mode, a, b]);
  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Calculate percentages</h2>
        <div className="field-grid">
          <label className="field">Mode<select className="tool-select" value={mode} onChange={(e) => setMode(e.target.value)}><option value="of">Percentage of number</option><option value="change">Increase / decrease</option><option value="discount">Discount</option><option value="marks">Marks percentage</option></select></label>
          <label className="field">First number<input className="tool-input" type="number" value={a} onChange={(e) => setA(Number(e.target.value))} /></label>
          <label className="field">Second number<input className="tool-input" type="number" value={b} onChange={(e) => setB(Number(e.target.value))} /></label>
        </div>
      </section>
      <OutputPanel title="Result"><div className="stat"><strong>{result}</strong></div></OutputPanel>
    </div>
  );
}
