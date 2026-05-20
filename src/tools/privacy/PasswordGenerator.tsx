import { useMemo, useState } from "react";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { copyText } from "../../lib/downloads";

const sets = { lower: "abcdefghijklmnopqrstuvwxyz", upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", numbers: "0123456789", symbols: "!@#$%^&*_-+=?" };
export function PasswordGenerator() { const [length, setLength] = useState(18); const [password, setPassword] = useState(""); const generate = () => { const chars = Object.values(sets).join(""); const bytes = crypto.getRandomValues(new Uint32Array(length)); setPassword([...bytes].map((n) => chars[n % chars.length]).join("")); }; useMemo(generate, []); return <div className="tool-layout"><section className="tool-panel neu-card"><h2>Generate password</h2><label className="field">Length: {length}<input type="range" min="8" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} /></label><div className="button-row"><NeuButton onClick={generate}>Generate</NeuButton></div></section><OutputPanel title="Password"><textarea className="tool-textarea" readOnly value={password} /><div className="button-row"><NeuButton onClick={() => copyText(password)}>Copy password</NeuButton></div></OutputPanel></div>; }
