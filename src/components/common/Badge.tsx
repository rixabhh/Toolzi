export function Badge({ children, tone }: { children: React.ReactNode; tone?: string }) {
  return <span className={`badge ${tone ? `badge-${tone}` : ""}`}>{children}</span>;
}
