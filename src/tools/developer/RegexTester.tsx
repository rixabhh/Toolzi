import { useMemo, useState } from "react";
import { OutputPanel } from "../../components/common/OutputPanel";

export function RegexTester() {
  const [pattern, setPattern] = useState("\\btool\\w+\\b");
  const [flags, setFlags] = useState("gi");
  const [text, setText] = useState("Toolzi is a local toolkit. toolzi tools stay private.");
  const result = useMemo(() => {
    try {
      const regex = new RegExp(pattern, flags);
      return { error: "", matches: [...text.matchAll(regex)].map((m) => `${m[0]} at ${m.index}`) };
    } catch (error) { return { error: error instanceof Error ? error.message : "Invalid regex", matches: [] }; }
  }, [flags, pattern, text]);
  return <div className="tool-layout"><section className="tool-panel neu-card"><h2>Test regex</h2><div className="field-grid"><label className="field">Pattern<input className="tool-input" value={pattern} onChange={(e) => setPattern(e.target.value)} /></label><label className="field">Flags<input className="tool-input" value={flags} onChange={(e) => setFlags(e.target.value)} /></label></div><textarea className="tool-textarea" value={text} onChange={(e) => setText(e.target.value)} /></section><OutputPanel title="Matches">{result.error ? <p>{result.error}</p> : <textarea className="tool-textarea" readOnly value={result.matches.join("\n") || "No matches"} />}</OutputPanel></div>;
}
