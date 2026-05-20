import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BackgroundDecor } from "./BackgroundDecor";
import { LogoLockup } from "../common/Logo";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("toolzi:theme") ?? "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("toolzi:theme", theme);
  }, [theme]);

  return (
    <div className="app">
      <BackgroundDecor />
      <header className="site-header">
        <Link to="/" className="wordmark" aria-label="Toolzi home">
          <LogoLockup />
        </Link>
        <div className="header-actions">
          <nav className="nav-links" aria-label="Main navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/tools">Tools</NavLink>
            <a href="/#PDF">PDF</a>
            <a href="/#Image">Images</a>
            <a href="/#Text">Text</a>
            <a href="/#Calculate">Calculate</a>
            <a href="/#Create">Create</a>
            <a href="/#Developer">Developer</a>
            <a href="/#Privacy">Privacy</a>
          </nav>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          >
            <span aria-hidden="true">{theme === "dark" ? "L" : "D"}</span>
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <span>Toolzi runs tools in your browser.</span>
        <span>No upload. No sign-up. Just get it done.</span>
      </footer>
    </div>
  );
}
