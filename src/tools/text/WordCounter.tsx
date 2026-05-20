import { useMemo, useState } from "react";
import { NeuButton } from "../../components/common/NeuButton";
import { OutputPanel } from "../../components/common/OutputPanel";
import { copyText } from "../../lib/downloads";
import { countWords } from "../../lib/text";

export function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => countWords(text), [text]);
  return (
    <div className="tool-layout">
      <section className="tool-panel neu-card">
        <h2>Count text</h2>
        <textarea className="tool-textarea" value={text} onChange={(event) => setText(event.target.value)} placeholder="Paste text here..." />
        <div className="button-row">
          <NeuButton onClick={() => copyText(text)}>Copy text</NeuButton>
          <NeuButton variant="ghost" onClick={() => setText("")}>Clear</NeuButton>
        </div>
      </section>
      <OutputPanel title="Stats">
        <div className="stat-grid">
          {Object.entries({
            Words: stats.words,
            Characters: stats.characters,
            "No spaces": stats.charactersNoSpaces,
            Sentences: stats.sentences,
            Paragraphs: stats.paragraphs,
            "Read time": `${stats.readingMinutes} min`
          }).map(([label, value]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </OutputPanel>
    </div>
  );
}
