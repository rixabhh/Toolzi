export function OutputPanel({ title = "Output", children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="output-panel neu-card">
      <div className="output-panel-header">
        <h3>{title}</h3>
        <span>Local preview</span>
      </div>
      <div className="output-panel-body">{children}</div>
    </section>
  );
}
