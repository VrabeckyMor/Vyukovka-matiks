"use client";

import { useEffect, useState } from "react";

const LIGHT_DARK: string[] = ["light", "dark"];

export default function ThemeToggleModules() {
  const [theme, setTheme] = useState<string>(LIGHT_DARK[0]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      const prefersDark =
        typeof window !== "undefined" &&
        (window.matchMedia as any) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = (saved as string) ?? (prefersDark ? "dark" : "light");
      applyTheme(initial);
      setTheme(initial);
    } catch (e) {
      // ignore
    }
  }, []);

  function applyTheme(t: string) {
    const html = document.documentElement;
    html.dataset.theme = t;
  }

  // Left click: cycle light <-> dark; if currently maty/hacker -> go to light
  function handleLeftClick() {
    try {
      if (theme === "maty" || theme === "hacker") {
        applyTheme("light");
        setTheme("light");
        localStorage.setItem("theme", "light");
      } else {
        const idx = LIGHT_DARK.indexOf(theme as string);
        const next = LIGHT_DARK[(idx + 1) % LIGHT_DARK.length] ?? "light";
        applyTheme(next);
        setTheme(next);
        localStorage.setItem("theme", next);
      }
    } catch (e) {
      // ignore storage errors
    }
  }

  // Right click: if on light/dark -> go to hacker; if on hacker -> maty; if on maty -> hacker
  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    try {
      if (theme === "hacker") {
        applyTheme("maty");
        setTheme("maty");
        localStorage.setItem("theme", "maty");
      } else if (theme === "maty") {
        applyTheme("hacker");
        setTheme("hacker");
        localStorage.setItem("theme", "hacker");
      } else {
        // light or dark -> go to hacker
        applyTheme("hacker");
        setTheme("hacker");
        localStorage.setItem("theme", "hacker");
      }
    } catch (err) {
      // ignore storage errors
    }
  }

  const emoji = theme === "dark" ? "🌙" : theme === "hacker" ? "🧑🏻‍💻" : theme === "maty" ? "🌈" : "☀️";

  return (
    <button
      aria-label={`Toggle theme (current: ${theme})`}
      onClick={handleLeftClick}
      onContextMenu={handleContextMenu}
      title={`Switch theme (current: ${theme})`}
      style={{
        position: "fixed",
        top: 12,
        right: 12,
        padding: "6px 10px",
        borderRadius: 8,
        border: "none",
        background: "rgba(0,0,0,0.15)",
        color: "white",
        cursor: "pointer",
        zIndex: 9999,
      }}
    >
      {emoji}
    </button>
  );
}
