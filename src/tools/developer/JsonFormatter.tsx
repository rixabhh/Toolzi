import { useMemo, useState } from "react";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { copyText } from "../../lib/downloads";

export function JsonFormatter() {
  const [input, setInput] = useState('{"tool":"Toolzi","local":true}');
  const parsed = useMemo(() => {
    try {
      return { ok: true, pretty: JSON.stringify(JSON.parse(input), null, 2), error: "" };
    } catch (error) {
      return { ok: false, pretty: "", error: error instanceof Error ? error.message : "Invalid JSON" };
    }
  }, [input]);
  return <div className="tool-layout"><section className="tool-panel neu-card"><h2>Format JSON</h2><textarea className="tool-textarea" value={input} onChange={(e) => setInput(e.target.value)} /></section><OutputPanel title="JSON output">{parsed.ok ? <><textarea className="tool-textarea" readOnly value={parsed.pretty} /><div className="button-row"><NeuButton onClick={() => copyText(parsed.pretty)}>Copy pretty</NeuButton><NeuButton variant="ghost" onClick={() => copyText(JSON.stringify(JSON.parse(input)))}>Copy minified</NeuButton></div></> : <p>{parsed.error}</p>}</OutputPanel></div>;
}
