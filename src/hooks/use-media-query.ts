import { useCallback, useSyncExternalStore } from "react";

const getServerSnapshot = () => false;

/**
 * SSR-safe media query hook.
 *
 * The server always reports `false`, so effect-gated UI ships as plain
 * children in the HTML and only upgrades after hydration on viewports
 * where the query matches.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
