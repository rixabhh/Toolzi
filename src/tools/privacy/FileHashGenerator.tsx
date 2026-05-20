import { useState } from "react";
import { Dropzone } from "../../components/common/Dropzone";
import { OutputPanel } from "../../components/common/OutputPanel";
import { NeuButton } from "../../components/common/NeuButton";
import { copyText } from "../../lib/downloads";

const hex = (buffer: ArrayBuffer) => [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
export function FileHashGenerator() { const [hash, setHash] = useState(""); const [name, setName] = useState(""); return <div className="tool-layout"><section className="tool-panel neu-card"><h2>Hash a file</h2><Dropzone label="Choose a file" accept="*/*" onFiles={async ([file]) => { if (!file) return; setName(file.name); setHash(hex(await crypto.subtle.digest("SHA-256", await file.arrayBuffer()))); }} /></section><OutputPanel title="SHA-256">{name && <p>{name}</p>}<textarea className="tool-textarea" readOnly value={hash} /><div className="button-row"><NeuButton onClick={() => copyText(hash)}>Copy hash</NeuButton></div></OutputPanel></div>; }
