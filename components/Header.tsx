"use client";

import Link from "next/link";
import { type Ref, useSyncExternalStore } from "react";
import RollText from "@/components/RollText";

type Theme = "light" | "dark";

const THEME_EVENT = "themechange";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
  window.dispatchEvent(new Event(THEME_EVENT));
}

export default function Header({
  menuOpen,
  onOpenMenu,
  menuButtonRef,
}: {
  menuOpen: boolean;
  onOpenMenu: () => void;
  menuButtonRef: Ref<HTMLButtonElement>;
}) {
  const theme = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme as Theme,
    () => "dark" as Theme,
  );

  return (
    <header className="header">
      <Link href="/" className="wordmark">
        Liliána Török
      </Link>
      <div className="header-actions">
        <div className="theme-switch" role="group" aria-label="Color theme">
          {(["light", "dark"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={theme === option}
              onClick={() => setTheme(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          ref={menuButtonRef}
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={onOpenMenu}
        >
          <RollText text="Menu" />
        </button>
      </div>
    </header>
  );
}
