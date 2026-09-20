"use client";

import { motion, useMotionValue, useSpring, useMotionValueEvent } from "motion/react";
import type { MotionValue } from "motion/react";
import { useEffect, useRef } from "react";
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

interface TocItemRowProps {
  item: TocItem;
  index: number;
  isActive: boolean;
  hasMark: boolean;
  className: string;
  mouseY: MotionValue<number>;
  onSelect?: (id: string) => void;
}

function TocItemRow({ item, index, isActive, hasMark, className, mouseY, onSelect }: TocItemRowProps) {
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

  return (
    <div className={cn("relative", className)}>
      {hasMark && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2.5 left-0 h-px w-1.5 bg-white/15"
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
          <span className="flex w-8 shrink-0 items-center" aria-hidden>
            <span
              className={cn(
                "h-px transition-all duration-300",
                isActive
                  ? "w-8 bg-destructive"
                  : index % 3 === 1
                    ? "w-5 bg-white/25 group-hover:bg-white/50"
                    : "w-4 bg-white/25 group-hover:bg-white/50"
              )}
            />
          </span>

          <span
            className={cn(
              "w-6 shrink-0 font-mono text-xs transition-colors duration-300",
              isActive ? "text-destructive" : "text-white/30 group-hover:text-white/60"
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
        </a>
      </motion.div>
    </div>
  );
}

export function TableOfContents({
  items,
  activeId,
  onSelect,
  className,
}: TableOfContentsProps) {
  const mouseY = useMotionValue(-9999);

  return (
    <nav
      aria-label="Table of contents"
      className={cn("flex w-fit flex-col", className)}
      onMouseMove={(e) => mouseY.set(e.clientY)}
      onMouseLeave={() => mouseY.set(-9999)}
    >
      {items.map((item, i) => (
        <TocItemRow
          key={item.id}
          item={item}
          index={i}
          isActive={item.id === activeId}
          hasMark={i > 1 && i % 2 === 0}
          className={cn(i === 1 ? "mt-3" : i > 1 ? "mt-5" : "mt-0")}
          mouseY={mouseY}
          onSelect={onSelect}
        />
      ))}
    </nav>
  );
}
