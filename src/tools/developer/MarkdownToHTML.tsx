import { useMemo, useState } from "react";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { copyText } from "../../lib/downloads";

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));
const mdToHtml = (md: string) => md.split("\n").map((line) => line.startsWith("# ") ? `<h1>${esc(line.slice(2))}</h1>` : line.startsWith("## ") ? `<h2>${esc(line.slice(3))}</h2>` : line.startsWith("- ") ? `<li>${esc(line.slice(2))}</li>` : line.trim() ? `<p>${esc(line).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/_(.*?)_/g, "<em>$1</em>")}</p>` : "").join("\n");
export function MarkdownToHTML() { const [md, setMd] = useState("# Toolzi\n\n**Local** tools."); const html = useMemo(() => mdToHtml(md), [md]); return <div className="tool-layout"><section className="tool-panel neu-card"><h2>Markdown to HTML</h2><textarea className="tool-textarea" value={md} onChange={(e) => setMd(e.target.value)} /></section><OutputPanel title="HTML"><textarea className="tool-textarea" readOnly value={html} /><div className="button-row"><NeuButton onClick={() => copyText(html)}>Copy HTML</NeuButton></div></OutputPanel></div>; }
