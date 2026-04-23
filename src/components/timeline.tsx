"use client";

import { motion } from "motion/react";
import type { ExperienceItem } from "@/constants";

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <div className="relative max-w-5xl">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            delay: index * 0.1,
          }}
          className="relative grid md:grid-cols-[200px_20px_1fr] gap-8 pb-12 last:pb-0"
        >
          {/* Left: Info */}
          <div className="space-y-1 text-right">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              {item.period}
            </p>
            <h3 className="text-lg font-semibold text-foreground">
              {item.company}
            </h3>
            <p className="text-sm text-muted-foreground">
              {item.role}
            </p>
            <p className="text-sm text-muted-foreground">
              {item.location}
            </p>
          </div>

          {/* Middle: Line with dot */}
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2" />
            <div className="absolute left-1/2 top-6 size-3 rounded-full border-2 border-zinc-700 bg-background z-10 -translate-x-1/2" />
          </div>

          {/* Right: Card with content */}
          <div>
            <div className="group relative rounded-xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-sm p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/50">
              <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4 whitespace-pre-line">
                {item.desc}
              </p>
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-zinc-800/50 text-muted-foreground border border-zinc-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {/* Hover accent */}
              <div className="absolute inset-0 rounded-xl bg-destructive/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}