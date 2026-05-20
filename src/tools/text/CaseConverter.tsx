import { useMemo, useState } from "react";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { copyText } from "../../lib/downloads";
import { sentenceCase, toTitleCase } from "../../lib/text";

const convert = (text: string, mode: string) => {
  if (mode === "upper") return text.toUpperCase();
  if (mode === "lower") return text.toLowerCase();
  if (mode === "title") return toTitleCase(text);
  if (mode === "sentence") return sentenceCase(text);
  if (mode === "capitalize") return text.replace(/\b\w/g, (char) => char.toUpperCase());
  if (mode === "kebab") return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (mode === "snake") return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  return text;
};

export function CaseConverter() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("title");
  const output = useMemo(() => convert(text, mode), [text, mode]);
  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Change text case</h2>
        <textarea className="tool-textarea" value={text} onChange={(event) => setText(event.target.value)} placeholder="Paste text here..." />
        <label className="field">
          Mode
          <select className="tool-select" value={mode} onChange={(event) => setMode(event.target.value)}>
            <option value="upper">UPPERCASE</option>
            <option value="lower">lowercase</option>
            <option value="title">Title Case</option>
            <option value="sentence">Sentence case</option>
            <option value="capitalize">Capitalize Words</option>
            <option value="kebab">kebab-case</option>
            <option value="snake">snake_case</option>
          </select>
        </label>
      </section>
      <OutputPanel title="Output">
        <textarea className="tool-textarea" readOnly value={output} />
        <div className="button-row"><NeuButton onClick={() => copyText(output)}>Copy output</NeuButton></div>
      </OutputPanel>
    </div>
  );
}
