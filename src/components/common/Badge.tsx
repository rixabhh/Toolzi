export function Badge({ children, icon, tone }: { children: React.ReactNode; icon?: "check"; tone?: string }) {
  return (
    <span className={`badge ${tone ? `badge-${tone}` : ""}`}>
      {icon === "check" && (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m5 12 4 4L19 6" />
        </svg>
      )}
      {children}
    </span>
  );
}
