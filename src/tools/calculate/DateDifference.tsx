import { useMemo, useState } from "react";
import { OutputPanel } from "../../components/common/OutputPanel";
import { diffDates } from "../../lib/dates";

export function DateDifference() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [includeEnd, setIncludeEnd] = useState(false);
  const diff = useMemo(() => diffDates(start, end, includeEnd), [start, end, includeEnd]);
  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Find days between dates</h2>
        <div className="field-grid">
          <label className="field">Start date<input className="tool-input" type="date" value={start} onChange={(e) => setStart(e.target.value)} /></label>
          <label className="field">End date<input className="tool-input" type="date" value={end} onChange={(e) => setEnd(e.target.value)} /></label>
          <label className="field">Include end date<input type="checkbox" checked={includeEnd} onChange={(e) => setIncludeEnd(e.target.checked)} /></label>
        </div>
      </section>
      <OutputPanel title="Difference">
        {diff ? <div className="stat-grid"><div className="stat"><strong>{diff.days}</strong><span>Days</span></div><div className="stat"><strong>{diff.months}</strong><span>Approx months</span></div><div className="stat"><strong>{diff.years}</strong><span>Approx years</span></div></div> : <p>Pick both dates to see the difference.</p>}
      </OutputPanel>
    </div>
  );
}
