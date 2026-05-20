import { useMemo, useState } from "react";
import { NeuButton } from "../../components/common/NeuButton";
import { readLocalJson, writeLocalJson } from "../../lib/storage";

type Note = { id: string; title: string; body: string; updatedAt: string };

export function NotesPad() {
  const [notes, setNotes] = useState<Note[]>(() => readLocalJson("toolzi:notes", []));
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => notes.filter((note) => `${note.title} ${note.body}`.toLowerCase().includes(query.toLowerCase())), [notes, query]);
  const save = (next: Note[]) => { setNotes(next); writeLocalJson("toolzi:notes", next); };

  return (
    <section className="tool-panel neu-card">
      <h2>Notes saved only in this browser</h2>
      <div className="button-row">
        <NeuButton onClick={() => save([{ id: crypto.randomUUID(), title: "Untitled note", body: "", updatedAt: new Date().toISOString() }, ...notes])}>New note</NeuButton>
      </div>
      <label className="field">Search notes<input className="tool-input" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
      <div className="list">
        {filtered.map((note) => (
          <article className="neu-card tool-panel" key={note.id}>
            <input className="tool-input" value={note.title} onChange={(e) => save(notes.map((item) => item.id === note.id ? { ...item, title: e.target.value, updatedAt: new Date().toISOString() } : item))} aria-label="Note title" />
            <textarea className="tool-textarea" value={note.body} onChange={(e) => save(notes.map((item) => item.id === note.id ? { ...item, body: e.target.value, updatedAt: new Date().toISOString() } : item))} aria-label="Note body" />
            <div className="button-row"><NeuButton variant="ghost" onClick={() => save(notes.filter((item) => item.id !== note.id))}>Delete</NeuButton></div>
          </article>
        ))}
      </div>
    </section>
  );
}
