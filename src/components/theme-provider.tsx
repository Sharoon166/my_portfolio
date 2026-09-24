"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: (event: React.MouseEvent<HTMLElement>) => void;
}>({ theme: "dark", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

function updateFavicon(theme: Theme) {
  const link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (link) {
    link.href = theme !== "dark" ? "/logo_bw.png" : "/logo.png";
  }
}

function updateMetaThemeColor(theme: Theme) {
  const meta = document.querySelector<HTMLMetaElement>(
    "meta[name='theme-color']",
  );
  if (meta) {
    meta.content = theme === "dark" ? "#050505" : "#fafafa";
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
  updateFavicon(theme);
  updateMetaThemeColor(theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const toggle = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const next = theme === "dark" ? "light" : "dark";

      // Store click coordinates for the view transition origin
      const x = event.clientX;
      const y = event.clientY;

      // Set CSS custom properties so the clip-path animation expands from the click point
      document.documentElement.style.setProperty("--theme-x", `${x}px`);
      document.documentElement.style.setProperty("--theme-y", `${y}px`);

      // Use View Transitions API if supported
      if (!document.startViewTransition) {
        setTheme(next);
        applyTheme(next);
        return;
      }

      document.startViewTransition(() => {
        setTheme(next);
        applyTheme(next);
      });
    },
    [theme],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <head>
        <link
          rel="icon"
          href={theme === "light" ? "logo.png" : "logo_bw.png"}
        />
      </head>
      {children}
    </ThemeContext.Provider>
  );
}
