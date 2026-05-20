import { useMemo, useState } from "react";
import { OutputPanel } from "../../components/common/OutputPanel";
import { calculateAge } from "../../lib/dates";

export function AgeCalculator() {
  const [dob, setDob] = useState("");
  const age = useMemo(() => calculateAge(dob), [dob]);
  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Calculate age</h2>
        <label className="field">Date of birth<input className="tool-input" type="date" value={dob} onChange={(e) => setDob(e.target.value)} /></label>
      </section>
      <OutputPanel title="Result">
        {age ? <div className="stat-grid"><div className="stat"><strong>{age.years}</strong><span>Years</span></div><div className="stat"><strong>{age.months}</strong><span>Months</span></div><div className="stat"><strong>{age.days}</strong><span>Days</span></div><div className="stat"><strong>{age.nextBirthdayDays}</strong><span>Days to birthday</span></div></div> : <p>Pick a date to calculate age.</p>}
      </OutputPanel>
    </div>
  );
}
