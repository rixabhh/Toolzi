import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Dropzone } from "../../components/common/Dropzone";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";

const sample = `# Project Notes

Turn Markdown into a printable PDF.

- Works with lists
- **Bold text** and _italic text_
- Tables and checklists

| Task | Status |
| --- | --- |
| Draft | Done |
| Review | Next |

> Files stay in your browser.

\`\`\`ts
const app = "Toolzi";
\`\`\`
`;

export function MarkdownToPDF() {
  const [markdown, setMarkdown] = useState(sample);
  const [pageSize, setPageSize] = useState("A4");
  const [fontSize, setFontSize] = useState("normal");
  const [theme, setTheme] = useState("clean");
  const [showDate, setShowDate] = useState(true);

  const previewClass = useMemo(() => `markdown-preview markdown-${fontSize} markdown-${theme}`, [fontSize, theme]);

  return (
    <div className="tool-layout markdown-tool-layout">
      <section className="tool-panel neu-card markdown-editor-panel">
        <div className="panel-heading">
          <div>
            <h2>Markdown source</h2>
            <p>Paste text, import a .md file, then print the preview as PDF.</p>
          </div>
          <Dropzone
            label="Import .md"
            hint="Local file only"
            accept=".md,text/markdown,text/plain"
            onFiles={async ([file]) => {
              if (file) setMarkdown(await file.text());
            }}
          />
        </div>
        <textarea
          className="tool-textarea markdown-editor"
          aria-label="Markdown source"
          value={markdown}
          onChange={(event) => setMarkdown(event.target.value)}
          spellCheck={false}
        />
        <div className="field-grid markdown-options">
          <label className="field">
            Page size
            <select className="tool-select" value={pageSize} onChange={(event) => setPageSize(event.target.value)}>
              <option>A4</option>
              <option>Letter</option>
            </select>
          </label>
          <label className="field">
            Font size
            <select className="tool-select" value={fontSize} onChange={(event) => setFontSize(event.target.value)}>
              <option value="small">Small</option>
              <option value="normal">Normal</option>
              <option value="large">Large</option>
            </select>
          </label>
          <label className="field">
            Theme
            <select className="tool-select" value={theme} onChange={(event) => setTheme(event.target.value)}>
              <option value="clean">Clean</option>
              <option value="notes">Notes</option>
              <option value="report">Report</option>
            </select>
          </label>
          <label className="field">
            Show date
            <span className="toggle-row">
              <input type="checkbox" checked={showDate} onChange={(event) => setShowDate(event.target.checked)} />
              <span>{showDate ? "On" : "Off"}</span>
            </span>
          </label>
        </div>
        <div className="button-row">
          <NeuButton onClick={() => window.print()}>Print / Save as PDF</NeuButton>
          <NeuButton variant="ghost" onClick={() => setMarkdown(sample)}>Sample Markdown</NeuButton>
        </div>
        <p className="muted">Print settings are local to your browser. Selected page size: {pageSize}.</p>
      </section>
      <OutputPanel title="PDF preview">
        <div className="preview-box document-preview-box">
          <article className={previewClass}>
            {showDate && <p className="document-date">Generated with Toolzi on {new Date().toLocaleDateString()}</p>}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </article>
        </div>
      </OutputPanel>
    </div>
  );
}
