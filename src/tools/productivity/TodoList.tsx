import { useMemo, useState } from "react";
import { NeuButton } from "../../components/common/NeuButton";
import { readLocalJson, writeLocalJson } from "../../lib/storage";

type Todo = { id: string; text: string; done: boolean };

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => readLocalJson("toolzi:todos", []));
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const save = (next: Todo[]) => { setTodos(next); writeLocalJson("toolzi:todos", next); };
  const visible = useMemo(() => todos.filter((todo) => filter === "all" || (filter === "active" ? !todo.done : todo.done)), [todos, filter]);

  return (
    <section className="tool-panel neu-card">
      <h2>To-do list</h2>
      <p className="muted">Saved only in this browser.</p>
      <div className="field-grid">
        <label className="field">Task<input className="tool-input" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => {
          if (e.key === "Enter" && text.trim()) {
            save([{ id: crypto.randomUUID(), text: text.trim(), done: false }, ...todos]);
            setText("");
          }
        }} /></label>
        <label className="field">Filter<select className="tool-select" value={filter} onChange={(e) => setFilter(e.target.value)}><option value="all">All</option><option value="active">Active</option><option value="completed">Completed</option></select></label>
      </div>
      <div className="button-row"><NeuButton onClick={() => { if (text.trim()) { save([{ id: crypto.randomUUID(), text: text.trim(), done: false }, ...todos]); setText(""); } }}>Add task</NeuButton></div>
      <ul className="list">
        {visible.map((todo) => (
          <li className="list-item" key={todo.id}>
            <label className="todo-label"><input type="checkbox" checked={todo.done} onChange={(e) => save(todos.map((item) => item.id === todo.id ? { ...item, done: e.target.checked } : item))} /> <span className={todo.done ? "todo-complete" : ""}>{todo.text}</span></label>
            <NeuButton variant="ghost" onClick={() => save(todos.filter((item) => item.id !== todo.id))}>Delete</NeuButton>
          </li>
        ))}
      </ul>
    </section>
  );
}
