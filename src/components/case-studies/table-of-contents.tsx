"use client";

import { motion, useMotionValue, useSpring, useMotionValueEvent } from "motion/react";
import type { MotionValue } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

const ACTIVE_BASE = 1.12;
const BOOST_ACTIVE = 0.13;
const BOOST_INACTIVE = 0.11;
const FALLOFF_RADIUS = 260;

/* Collapsed minimap rail width — fits the active line even when scale-boosted */
const RAIL_W = 44;
/* Proportional line width range (shortest → longest section) */
const LINE_MIN = 22;
const LINE_MAX = 44;
/* Headroom so proximity-scaled rows never clip against the rail edge */
const EXPANDED_HEADROOM = 1.3;

/* Gap above a row. Tight dashes when collapsed, airy list when expanded. */
function gapBefore(index: number, expanded: boolean) {
  if (index === 0) return 0;
  if (!expanded) return 10;
  return index === 1 ? 12 : 20;
}

interface TocItemRowProps {
  item: TocItem;
  index: number;
  total: number;
  isActive: boolean;
  hasMark: boolean;
  expanded: boolean;
  /** Measured line width for this section (null → static fallback) */
  lineWidth: number | null;
  mouseY: MotionValue<number>;
  onSelect?: (id: string) => void;
}

function TocItemRow({
  item,
  index,
  total,
  isActive,
  hasMark,
  expanded,
  lineWidth,
  mouseY,
  onSelect,
}: TocItemRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useSpring(1, { stiffness: 200, damping: 30, mass: 0.9 });

  useEffect(() => {
    scale.set(isActive ? ACTIVE_BASE : 1);
  }, [isActive, scale]);

  useMotionValueEvent(mouseY, "change", (y) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dist = Math.abs(rect.top + rect.height / 2 - y);
    const proximity = Math.max(0, 1 - dist / FALLOFF_RADIUS);
    scale.set(
      (isActive ? ACTIVE_BASE : 1) + (isActive ? BOOST_ACTIVE : BOOST_INACTIVE) * proximity
    );
  });

  const lineW = isActive
    ? LINE_MAX
    : lineWidth ?? (index % 3 === 1 ? 26 : 22);

  /* Gaps are split into row padding so rows stay a contiguous hover target
     (no dead zones between dashes that would collapse the rail mid-hover). */
  const padTop = gapBefore(index, expanded) / 2;
  const padBottom = index < total - 1 ? gapBefore(index + 1, expanded) / 2 : 0;

  return (
    <motion.div
      className="relative pointer-events-auto"
      animate={{ paddingTop: padTop, paddingBottom: padBottom }}
      transition={{ type: "spring", stiffness: 300, damping: 34 }}
    >
      {hasMark && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2.5 left-0 h-0.5 w-2 bg-foreground/15"
        />
      )}

      <motion.div ref={ref} style={{ scale }} className="origin-left">
        <a
          href={`#section-${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            onSelect?.(item.id);
          }}
          aria-current={isActive ? "true" : undefined}
          className="group flex items-center gap-2"
        >
          {/* Minimap line — width encodes how much scroll this section owns */}
          <span className="flex shrink-0 items-center" aria-hidden>
            <span
              className={cn(
                "h-0.5 transition-all duration-300",
                isActive
                  ? "bg-destructive"
                  : "bg-foreground/25 group-hover:bg-foreground/50 rounded-full"
              )}
              style={{ width: lineW }}
            />
          </span>

          {/* Number + label — revealed when the rail expands */}
          <motion.span
            className="flex items-center gap-2"
            animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : -6 }}
            transition={{
              duration: expanded ? 0.35 : 0.18,
              delay: expanded ? 0.06 : 0,
            }}
          >
            <span
              className={cn(
                "w-6 shrink-0 font-mono text-xs transition-colors duration-300",
                isActive
                  ? "text-destructive"
                  : "text-muted-foreground group-hover:text-foreground/70"
              )}
            >
              {item.id}
            </span>
            <span
              className={cn(
                "whitespace-nowrap text-sm tracking-wide transition-colors duration-300",
                isActive
                  ? "font-medium text-foreground"
                  : "text-muted-foreground group-hover:text-foreground/80"
              )}
            >
              {item.label}
            </span>
          </motion.span>
        </a>
      </motion.div>
    </motion.div>
  );
}

export function TableOfContents({
  items,
  activeId,
  onSelect,
  className,
}: TableOfContentsProps) {
  const mouseY = useMotionValue(-9999);
  const [expanded, setExpanded] = useState(false);
  const [expandedWidth, setExpandedWidth] = useState<number>(RAIL_W);
  const [lineWidths, setLineWidths] = useState<(number | null)[] | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  /* Stable key — navItems is recreated on every scrollspy update,
     but the measurement only needs to run when the sections change. */
  const itemsKey = items.map((i) => `${i.id}:${i.label}`).join("|");

  useLayoutEffect(() => {
    const ids = itemsKey.split("|").map((entry) => entry.split(":")[0]);

    const measure = () => {
      if (innerRef.current) {
        const natural = innerRef.current.offsetWidth;
        setExpandedWidth(
          natural > 0
            ? Math.max(RAIL_W, Math.ceil(natural * EXPANDED_HEADROOM))
            : RAIL_W
        );
      }

      const elements = ids.map((id) => document.getElementById(`section-${id}`));
      const tops = elements.map((el) => el?.offsetTop ?? -1);

      /* Scroll span each section owns: distance to the next section
         (includes gaps and interleaved blocks like the gallery). */
      const spans = elements.map((el, i) => {
        if (!el || tops[i] < 0) return -1;
        if (i + 1 < elements.length && tops[i + 1] >= 0) return tops[i + 1] - tops[i];
        return el.offsetHeight > 0 ? el.offsetHeight : -1;
      });

      const valid = spans.filter((s) => s > 0);
      if (valid.length === 0) {
        setLineWidths(null);
        return;
      }

      const min = Math.min(...valid);
      const max = Math.max(...valid);
      setLineWidths(
        spans.map((s) =>
          s <= 0
            ? null
            : max === min
              ? LINE_MAX
              : Math.round(LINE_MIN + ((s - min) / (max - min)) * (LINE_MAX - LINE_MIN))
        )
      );
    };

    measure();
    window.addEventListener("resize", measure);
    /* Web fonts can shift section heights after first measure */
    document.fonts.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [itemsKey]);

  return (
    <motion.nav
      ref={navRef}
      aria-label="Table of contents"
      animate={{ width: expanded ? expandedWidth : RAIL_W }}
      transition={{ type: "spring", stiffness: 300, damping: 34 }}
      className={cn(
        /* pointer-events only on rows: the expanded headroom is invisible
           and must not swallow clicks meant for the page next to the rail */
        "pointer-events-none overflow-hidden py-2",
        className
      )}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => {
        if (!navRef.current?.contains(document.activeElement)) setExpanded(false);
        mouseY.set(-9999);
      }}
      onFocus={() => setExpanded(true)}
      onBlur={(e) => {
        if (!(e.relatedTarget instanceof Node) || !e.currentTarget.contains(e.relatedTarget)) {
          setExpanded(false);
        }
      }}
      onMouseMove={(e) => mouseY.set(e.clientY)}
    >
      <div ref={innerRef} className="w-max">
        {items.map((item, i) => (
          <TocItemRow
            key={item.id}
            item={item}
            index={i}
            total={items.length}
            isActive={item.id === activeId}
            hasMark={i > 1 && i % 2 === 0}
            expanded={expanded}
            lineWidth={lineWidths?.[i] ?? null}
            mouseY={mouseY}
            onSelect={onSelect}
          />
        ))}
      </div>
    </motion.nav>
  );
}
