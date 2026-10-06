"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

type GateOptions = {
  /** Media query that must MATCH for `Component` to be used (e.g. "(min-width: 768px)"). */
  enableQuery: string;
};

/**
 * Higher-order wrapper around an effect-driven component (e.g. CometCard).
 *
 * - Query matches: renders `<Component {...props} />` with all props passed through.
 * - Query doesn't match: renders the children untouched — the effect "does not exist".
 *
 * SSR always renders the plain variant; the effect upgrades after hydration,
 * so small screens never download/render the effect's DOM or listeners.
 */
export function withEffectGate<P extends { children?: React.ReactNode }>(
  Component: React.ComponentType<P>,
  { enableQuery }: GateOptions,
) {
  function Gated(props: P) {
    const enabled = useMediaQuery(enableQuery);
    if (!enabled) return <>{props.children}</>;
    return <Component {...props} />;
  }

  Gated.displayName = `withEffectGate(${Component.displayName ?? "Component"})`;

  return Gated;
}
