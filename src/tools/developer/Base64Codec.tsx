import { useMemo, useState } from "react";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { copyText } from "../../lib/downloads";

export function Base64Codec() {
  const [text, setText] = useState("Toolzi");
  const [mode, setMode] = useState("encode");
  const output = useMemo(() => {
    try { return mode === "encode" ? btoa(unescape(encodeURIComponent(text))) : decodeURIComponent(escape(atob(text))); } catch { return "Could not decode that Base64 text."; }
  }, [mode, text]);
  return <div className="tool-layout"><section className="tool-panel neu-card"><h2>Base64</h2><label className="field">Mode<select className="tool-select" value={mode} onChange={(e) => setMode(e.target.value)}><option value="encode">Encode</option><option value="decode">Decode</option></select></label><textarea className="tool-textarea" value={text} onChange={(e) => setText(e.target.value)} /></section><OutputPanel title="Output"><textarea className="tool-textarea" readOnly value={output} /><div className="button-row"><NeuButton onClick={() => copyText(output)}>Copy output</NeuButton></div></OutputPanel></div>;
}
