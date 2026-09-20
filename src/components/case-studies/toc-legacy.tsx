"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

interface LegacyTableOfContentsProps {
  items: TocItem[];
  activeId: string;
  onSelect: (id: string) => void;
  accentColor?: string;
  className?: string;
}

export function LegacyTableOfContents({
  items,
  activeId,
  onSelect,
  accentColor,
  className,
}: LegacyTableOfContentsProps) {
  return (
    <nav className={cn("flex flex-col relative", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={cn(
            "group relative text-left py-3 pl-6 text-xs tracking-wide transition-all duration-300 cursor-pointer",
            activeId === item.id
              ? "text-foreground font-bold"
              : "text-muted-foreground hover:text-foreground/80"
          )}
        >
          {activeId === item.id && (
            <motion.div
              layoutId="toc-indicator"
              className="absolute left-0 top-0 bottom-0 w-0.5"
              style={
                accentColor
                  ? { backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }
                  : undefined
              }
            />
          )}

          <div className="flex items-center gap-4">
            <span
              className={cn(
                "transition-colors duration-300",
                activeId === item.id ? "opacity-100" : "opacity-30"
              )}
              style={activeId === item.id && accentColor ? { color: accentColor } : {}}
            >
              {item.id}
            </span>
            <span>{item.label}</span>
          </div>
        </button>
      ))}
    </nav>
  );
}
