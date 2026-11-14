"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const storageKey = "vigilix-theme";
const themeChangeEvent = "vigilix-theme-change";

function subscribe(onChange: () => void) {
  window.addEventListener(themeChangeEvent, onChange);
  return () => window.removeEventListener(themeChangeEvent, onChange);
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#10151d" : "#ffffff");
  window.dispatchEvent(new Event(themeChangeEvent));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerThemeSnapshot);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(storageKey);
    } catch {
      // The system theme remains available when browser storage is blocked.
    }
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const followsSystem = stored !== "dark" && stored !== "light";
    const syncSystemTheme = (event: MediaQueryListEvent) => {
      applyTheme(event.matches ? "dark" : "light");
    };
    const syncOtherTab = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      const next = event.newValue === "dark" || event.newValue === "light"
        ? event.newValue
        : media.matches ? "dark" : "light";
      applyTheme(next);
    };
    if (followsSystem) media.addEventListener("change", syncSystemTheme);
    window.addEventListener("storage", syncOtherTab);
    return () => {
      if (followsSystem) media.removeEventListener("change", syncSystemTheme);
      window.removeEventListener("storage", syncOtherTab);
    };
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // The current page theme still changes when storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
      title={`${theme === "dark" ? "Light" : "Dark"} mode`}
      onClick={toggleTheme}
    >
      <svg className="theme-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 2.5v2M12 19.5v2M4.8 4.8l1.4 1.4m11.6 11.6 1.4 1.4M2.5 12h2m15 0h2M4.8 19.2l1.4-1.4M17.8 6.2l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <svg className="theme-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 15.2A8.4 8.4 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
