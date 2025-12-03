"use client";

import styles from '../app/Home.module.css';
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
        window.matchMedia("(prefers-color-scheme: light)").matches;
      const initial = (saved as string) ?? (prefersDark ? "dark" : "light");
      applyTheme(initial);
      setTheme(initial);
    } catch (e) {

    }
  }, []);

  /** tohle načte poslední theme před zavřením (když jseš tu poprvé tak to dá light) ↑ */

  function applyTheme(t: string) {
    const html = document.documentElement;
    html.dataset.theme = t;
  }

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
    }
  }

  //* tohle děla left-click switch a když je to na jeden z right-click switch modů tak to dá light ↑ */

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
        applyTheme("hacker");
        setTheme("hacker");
        localStorage.setItem("theme", "hacker");
      }
    } catch (err) {
    }
  }

  /** tohle dělá že right-click switch a když je to jeden z left-click módů tak to dá hacker ↑ */
  const emoji = theme === "dark" ? "🌙" : theme === "hacker" ? "🧑🏻‍💻" : theme === "maty" ? "🌈" : "☀️";

  return (
    <button
      aria-label={`Toggle theme (current: ${theme})`}
      onClick={handleLeftClick}
      onContextMenu={handleContextMenu}
      title={`Current theme: ${theme} | Left-click to cycle, Right-click for special themes`}
      className={styles.toggle}
    >
      {emoji}
    </button>
  );
}

/* tohle dělá tlačítko na přepínání módů ↑ */
