"use client";

import { useEffect, useState } from "react";

const themes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" }
] as const;

type ThemeValue = (typeof themes)[number]["value"];

function applyTheme(theme: ThemeValue) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle(
    "dark",
    theme === "dark" || (theme === "system" && prefersDark)
  );
}

export function ThemeSettings() {
  const [theme, setTheme] = useState<ThemeValue>(() => {
    if (typeof window === "undefined") {
      return "system";
    }

    return (localStorage.getItem("subtrack-theme") as ThemeValue | null) ?? "system";
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function updateTheme(nextTheme: ThemeValue) {
    setTheme(nextTheme);
    localStorage.setItem("subtrack-theme", nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <section className="grid gap-4 rounded-2xl border border-line bg-panel p-5 shadow-sm">
      <div>
        <h2 className="text-xl font-black text-ink">Theme</h2>
        <p className="mt-1 text-sm text-muted">
          Stored in this browser only. No account or database setting is needed.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {themes.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => updateTheme(option.value)}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
              theme === option.value
                ? "border-brand bg-brand text-white"
                : "border-line bg-soft text-ink hover:border-brand"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
