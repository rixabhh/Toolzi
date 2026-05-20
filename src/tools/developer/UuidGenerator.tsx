import { useState } from "react";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { copyText } from "../../lib/downloads";

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() => Array.from({ length: 5 }, () => crypto.randomUUID()));
  const generate = () => setUuids(Array.from({ length: count }, () => crypto.randomUUID()));
  return <div className="tool-layout"><section className="tool-panel neu-card"><h2>Generate UUIDs</h2><label className="field">Count<input className="tool-input" type="number" min="1" max="100" value={count} onChange={(e) => setCount(Number(e.target.value))} /></label><div className="button-row"><NeuButton onClick={generate}>Generate</NeuButton></div></section><OutputPanel title="UUIDs"><textarea className="tool-textarea" readOnly value={uuids.join("\n")} /><div className="button-row"><NeuButton onClick={() => copyText(uuids.join("\n"))}>Copy all</NeuButton></div></OutputPanel></div>;
}
