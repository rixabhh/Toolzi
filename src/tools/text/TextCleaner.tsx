import { useMemo, useState } from "react";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { copyText } from "../../lib/downloads";
import { cleanText } from "../../lib/text";

const defaults = {
  extraSpaces: true,
  blankLines: true,
  trimLines: true,
  duplicates: false,
  special: false,
  normalizeBreaks: true
};

export function TextCleaner() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(defaults);
  const output = useMemo(() => cleanText(text, options), [text, options]);
  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Clean messy text</h2>
        <textarea className="tool-textarea" value={text} onChange={(event) => setText(event.target.value)} placeholder="Paste messy text here..." />
        <div className="field-grid checkbox-grid">
          {Object.entries({
            extraSpaces: "Remove extra spaces",
            blankLines: "Remove blank lines",
            trimLines: "Trim lines",
            duplicates: "Remove duplicate lines",
            special: "Remove special characters",
            normalizeBreaks: "Normalize line breaks"
          }).map(([key, label]) => (
            <label className="field" key={key}>
              {label}
              <input type="checkbox" checked={options[key as keyof typeof options]} onChange={(event) => setOptions({ ...options, [key]: event.target.checked })} />
            </label>
          ))}
        </div>
      </section>
      <OutputPanel title="Clean output">
        <textarea className="tool-textarea" readOnly value={output} />
        <div className="button-row"><NeuButton onClick={() => copyText(output)}>Copy output</NeuButton></div>
      </OutputPanel>
    </div>
  );
}
