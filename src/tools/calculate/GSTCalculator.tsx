import { useMemo, useState } from "react";
import { OutputPanel } from "../../components/common/OutputPanel";

export function GSTCalculator() {
  const [mode, setMode] = useState("add");
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);
  const result = useMemo(() => {
    if (mode === "add") {
      const gst = amount * rate / 100;
      return { base: amount, gst, total: amount + gst };
    }
    const base = amount / (1 + rate / 100);
    return { base, gst: amount - base, total: amount };
  }, [mode, amount, rate]);
  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Calculate GST</h2>
        <div className="field-grid">
          <label className="field">Mode<select className="tool-select" value={mode} onChange={(e) => setMode(e.target.value)}><option value="add">Add GST</option><option value="remove">Remove GST</option></select></label>
          <label className="field">Amount<input className="tool-input" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></label>
          <label className="field">GST rate<select className="tool-select" value={rate} onChange={(e) => setRate(Number(e.target.value))}>{[5, 12, 18, 28].map((item) => <option key={item} value={item}>{item}%</option>)}</select></label>
        </div>
      </section>
      <OutputPanel title="GST split">
        <div className="stat-grid">
          <div className="stat"><strong>{result.base.toFixed(2)}</strong><span>Base amount</span></div>
          <div className="stat"><strong>{result.gst.toFixed(2)}</strong><span>GST amount</span></div>
          <div className="stat"><strong>{result.total.toFixed(2)}</strong><span>Total amount</span></div>
        </div>
      </OutputPanel>
    </div>
  );
}
