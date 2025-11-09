"use client";

import { useEffect, useState } from "react";

export default function ThemeToggleModules() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      const prefersDark =
        typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = saved ?? (prefersDark ? "dark" : "light");
      applyTheme(initial);
      setTheme(initial);
    } catch (e) {
    }
  }, []);

  function applyTheme(t: string) {
    const html = document.documentElement;
    html.dataset.theme = t;
  }

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
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
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
