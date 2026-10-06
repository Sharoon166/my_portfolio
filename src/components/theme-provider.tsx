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

const DARK_MEDIA = "(prefers-color-scheme: dark)";

function getSystemTheme(): Theme {
  return window.matchMedia(DARK_MEDIA).matches ? "dark" : "light";
}

/**
 * A saved user choice always wins. With nothing saved, fall back to the OS
 * preference — and keep following it live until the user picks a theme.
 */
function resolveTheme(): { theme: Theme; persisted: boolean } {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    return { theme: saved, persisted: true };
  }
  return { theme: getSystemTheme(), persisted: false };
}

function updateFavicon(theme: Theme) {
  const link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (link) {
    // logo.png = black mark (light bg), logo_bw.png = white mark (dark bg)
    link.href = theme === "light" ? "/logo.png" : "/logo_bw.png";
  }
}

function updateMetaThemeColor(theme: Theme) {
  const color = theme === "dark" ? "#050505" : "#fafafa";
  // Update every theme-color tag (layout ships a light + a dark one).
  // Once JS has run, the app state is the truth — so drop the media
  // attribute that was only a pre-hydration guess based on the OS.
  document
    .querySelectorAll<HTMLMetaElement>("meta[name='theme-color']")
    .forEach((meta) => {
      meta.content = color;
      meta.removeAttribute("media");
    });
}

function applyTheme(theme: Theme, persist = true) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  if (persist) localStorage.setItem("theme", theme);
  updateFavicon(theme);
  updateMetaThemeColor(theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const { theme: resolved, persisted } = resolveTheme();
    setTheme(resolved);
    applyTheme(resolved, persisted);

    // Only follow live OS changes while the user hasn't chosen a theme —
    // once they toggle, their explicit choice is persisted and sticky.
    if (persisted) return;

    const mq = window.matchMedia(DARK_MEDIA);
    const onChange = () => {
      const next = getSystemTheme();
      setTheme(next);
      applyTheme(next, false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
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

      // Persist the explicit choice so the OS preference no longer overrides it
      const commit = () => {
        setTheme(next);
        applyTheme(next, true);
      };

      // Use View Transitions API if supported
      if (!document.startViewTransition) {
        commit();
        return;
      }

      document.startViewTransition(commit);
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
