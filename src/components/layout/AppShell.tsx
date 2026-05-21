import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BackgroundDecor } from "./BackgroundDecor";
import { LogoLockup } from "../common/Logo";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("toolzi:theme") ?? "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("toolzi:theme", theme);
  }, [theme]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  return (
    <div className="app">
      <BackgroundDecor />
      <header className={`site-header ${menuOpen ? "mobile-menu-open" : ""}`}>
        <Link to="/" className="wordmark" aria-label="Toolzi home">
          <LogoLockup />
        </Link>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <button className="nav-scrim" type="button" aria-label="Dismiss menu" onClick={() => setMenuOpen(false)} />
        <div className="header-actions" id="site-menu">
          <div className="mobile-menu-head">
            <span>Menu</span>
            <button type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)}>
              x
            </button>
          </div>
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
        <a className="creator-link" href="https://github.com/rixabhh" target="_blank" rel="noreferrer">
          Built by rixabhh
        </a>
      </footer>
    </div>
  );
}
