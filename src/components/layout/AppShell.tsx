import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BackgroundDecor } from "./BackgroundDecor";
import { LogoLockup } from "../common/Logo";
import { ToolIcon } from "../common/ToolIcon";
import { categories } from "../../tools/registry";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const categoryIcons = {
  PDF: "merge",
  Image: "compress",
  Text: "word",
  Calculate: "percent",
  Create: "qr",
  Productivity: "notes",
  Developer: "json",
  Privacy: "privacy"
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("toolzi:theme") ?? "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [appInstalled, setAppInstalled] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);
  const toolsMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("toolzi:theme", theme);
  }, [theme]);

  useEffect(() => {
    setMenuOpen(false);
    setToolsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!toolsOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!toolsMenuRef.current?.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [toolsOpen]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnOutsideTap = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideTap);
    return () => document.removeEventListener("pointerdown", closeOnOutsideTap);
  }, [menuOpen]);

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const onAppInstalled = () => {
      setAppInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted" || choice.outcome === "dismissed") {
      setInstallPrompt(null);
    }
  };

  const canInstall = Boolean(installPrompt && !appInstalled);
  const toolsActive =
    location.pathname.startsWith("/tools") || categories.some((category) => location.hash === `#${category}`);
  const privacyActive = location.hash === "#Privacy";

  return (
    <div className="app">
      <BackgroundDecor />
      <header ref={headerRef} className={`site-header ${menuOpen ? "mobile-menu-open" : ""}`}>
        <Link to="/" className="wordmark" aria-label="Toolzi home">
          <LogoLockup />
        </Link>
        <div className="header-controls">
          {canInstall && (
            <button className="install-button" type="button" aria-label="Install Toolzi app" onClick={installApp}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3v10" />
                <path d="m8 9 4 4 4-4" />
                <path d="M5 15v3.5A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V15" />
              </svg>
              <span>Install app</span>
            </button>
          )}
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          >
            <span className="theme-icon" aria-hidden="true">
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24">
                  <path d="M20.2 14.4A7.6 7.6 0 0 1 9.6 3.8 8.3 8.3 0 1 0 20.2 14.4Z" />
                </svg>
              )}
            </span>
            <span className="theme-label">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>
        </div>
        <button className="nav-scrim" type="button" aria-label="Dismiss menu" onClick={() => setMenuOpen(false)} />
        <div className="header-actions" id="site-menu">
          <div className="mobile-menu-head">
            <span>Menu</span>
            <button type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)}>
              x
            </button>
          </div>
          <nav className="nav-links" aria-label="Main navigation">
            <NavLink to="/" end>
              Home
            </NavLink>
            <div className="nav-dropdown" ref={toolsMenuRef}>
              <button
                className={`nav-dropdown-trigger ${toolsActive && !privacyActive ? "active" : ""}`}
                type="button"
                aria-expanded={toolsOpen}
                aria-controls="tools-menu"
                onClick={() => setToolsOpen((open) => !open)}
              >
                Tools <span aria-hidden="true">▾</span>
              </button>
              {toolsOpen && (
                <div className="tools-dropdown" id="tools-menu">
                  {categories.map((category) => (
                    <a key={category} href={`/#${category}`} onClick={() => setToolsOpen(false)}>
                      <ToolIcon name={categoryIcons[category]} category={category} />
                      <span>{category === "Calculate" ? "Calculators" : category}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a className={privacyActive ? "active" : ""} href="/#Privacy">
              Privacy
            </a>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <span>Toolzi runs tools in your browser.</span>
        <span>No upload. No sign-up. Just get it done.</span>
        <span className="creator-credit">
          Built with
          <svg className="heart-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s-7.2-4.7-9.5-9.1C0.8 8.7 2.5 5 6.1 5c2 0 3.4 1.1 4.2 2.4C11.1 6.1 12.7 5 14.7 5c3.6 0 5.3 3.7 3.6 6.9C16 16.3 12 21 12 21Z" />
          </svg>
          by
          <a className="creator-link" href="https://github.com/rixabhh" target="_blank" rel="noreferrer">
            <svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.7.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.8-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1 .8-.2 1.6-.3 2.4-.3.8 0 1.6.1 2.4.3 1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.7 1 2.8 0 3.9-2.4 4.8-4.6 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2Z" />
            </svg>
            rixabhh
          </a>
        </span>
      </footer>
    </div>
  );
}
