export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`logo-mark ${className}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M10 14c0-2.2 1.8-4 4-4h20c2.2 0 4 1.8 4 4v20c0 2.2-1.8 4-4 4H14c-2.2 0-4-1.8-4-4z" />
        <path d="M16 18h16" />
        <path d="M20 18v14" />
        <path d="M16 32h16" />
        <path d="m30 22-8 10" />
        <circle cx="34" cy="14" r="4" />
      </svg>
    </span>
  );
}

export function LogoLockup() {
  return (
    <>
      <LogoMark />
      <span className="wordmark-title">Toolzi</span>
    </>
  );
}
