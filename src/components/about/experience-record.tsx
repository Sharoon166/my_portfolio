"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Plus, ArrowUpRight } from "lucide-react";
import type { ExperienceItem } from "@/constants";
import { technologiesCollection, profile } from "@/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Shared column grid: PERIOD | ROLE | COMPANY | TYPE | toggle */
const COLS = "md:grid-cols-[11rem_1fr_1fr_7rem_1.5rem]";

/* Hover paint-flood — same left-to-right wipe language as the CTA fill */
const FLOOD =
  "absolute inset-0 origin-left scale-x-0 bg-destructive transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none";

const STAMP: Record<string, string> = {
  Work: "border-destructive/50 text-destructive group-hover:border-destructive-foreground/60 group-hover:text-destructive-foreground",
  Education:
    "border-border text-muted-foreground group-hover:border-destructive-foreground/40 group-hover:text-destructive-foreground/80",
  Status: "border-destructive bg-destructive text-destructive-foreground group-hover:border-destructive-foreground group-hover:bg-destructive-foreground group-hover:text-destructive",
};

const stampClass = (type: string) =>
  `inline-flex w-fit items-center rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${STAMP[type] ?? STAMP.Education}`;

interface LedgerRow {
  id?: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  note?: string;
}

/* The closing beat of the record — the story doesn't stop at the last job. */
const NOW_ROW: LedgerRow = {
  period: "April 2026 – Present",
  role: "Open to Work",
  company: "Islamabad, Pakistan",
  location: "Remote · UTC+5",
  type: "Status",
  note: "your move →",
};

function Cells({ row, glyph }: { row: LedgerRow; glyph: React.ReactNode }) {
  return (
    <span className={`relative grid gap-1.5 md:gap-6 md:items-baseline ${COLS}`}>
      <span className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-destructive-foreground/85">
        {row.period}
      </span>

      <span className="block space-y-1">
        <span className="block font-bricolage text-2xl font-black tracking-tight text-foreground transition-colors duration-300 group-hover:text-destructive-foreground md:text-3xl lg:text-4xl">
          {row.role}
        </span>
        {row.note && (
          <span className="block -rotate-2 font-caveat text-lg text-destructive transition-colors duration-300 group-hover:text-destructive-foreground/90">
            {row.note}
          </span>
        )}
      </span>

      <span className="block space-y-0.5">
        <span className="block text-sm font-medium text-foreground/85 transition-colors duration-300 group-hover:text-destructive-foreground md:text-base">
          {row.company}
        </span>
        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-destructive-foreground/70">
          {row.location}
        </span>
      </span>

      <span>
        <span className={stampClass(row.type)}>{row.type}</span>
      </span>

      <span className="absolute right-0 top-0 text-muted-foreground transition-colors duration-300 group-hover:text-destructive-foreground md:static md:justify-self-end md:self-center">
        {glyph}
      </span>
    </span>
  );
}

export function ExperienceRecord({ items }: { items: ExperienceItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      {/* Column heads — the printed form's header rule */}
      <div
        className={`hidden md:grid ${COLS} gap-6 border-b px-5 pb-3 text-sm font-bricolage font-semibold tracking-wider text-muted-foreground`}
      >
        <span>Period</span>
        <span>Role</span>
        <span>Company</span>
        <span>Type</span>
        <span aria-hidden="true" />
      </div>

      {items.map((item, index) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className="border-b">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`record-${item.id}`}
              onClick={() => setOpenId(open ? null : item.id)}
              className="group relative block w-full overflow-hidden px-4 py-6 text-left md:px-5 md:py-8"
            >
              <span aria-hidden="true" className={FLOOD} />
              <Cells
                row={{
                  id: item.id,
                  period: item.period,
                  role: item.role,
                  company: item.company,
                  location: item.location,
                  type: item.type,
                  note: index === 0 ? "started here →" : undefined,
                }}
                glyph={
                  <Plus
                    size={22}
                    className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                  />
                }
              />
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`record-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-10 px-4 pb-10 md:grid-cols-[1fr_20rem] md:gap-12 md:px-5">
                    {/* Narrative */}
                    <div className="space-y-6 lg:ml-[12.5rem]">
                      <p className="max-w-[70ch] whitespace-pre-line text-sm leading-relaxed text-muted-foreground md:text-base">
                        {item.desc}
                      </p>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.technologies && item.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech) => {
                            const techData = technologiesCollection[tech];
                            if (!techData) return null;
                            return (
                              <span
                                key={tech}
                                className="inline-flex items-center gap-1.5 rounded-md border border-border/50 bg-muted/50 px-2 py-1"
                              >
                                <Image
                                  src={techData.icon}
                                  alt=""
                                  width={12}
                                  height={12}
                                  className="opacity-60"
                                />
                                <span className="text-[10px] font-medium text-muted-foreground">
                                  {techData.name}
                                </span>
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Margin testimony */}
                    {item.testimonial && (
                      <aside className="border-l-[3px] border-destructive/40 pl-5">
                        <p className="text-base italic leading-snug text-foreground/80">
                          &ldquo;{item.testimonial.testimony}&rdquo;
                        </p>
                        <footer className="mt-4 flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 text-[10px] font-bold text-muted-foreground">
                            {item.testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                          <span className="flex flex-col">
                            <span className="text-sm font-bold text-foreground">
                              {item.testimonial.name}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                              {item.testimonial.designation}
                            </span>
                          </span>
                        </footer>
                        {item.testimonial.source && (
                          <a
                            href={item.testimonial.source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-destructive hover:underline"
                          >
                            {item.testimonial.source.label ?? "Source"} ↗
                          </a>
                        )}
                      </aside>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Closing rule + the NOW row */}
      <div className="border-b">
        <a
          href={profile.meeting}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden px-4 py-6 md:px-5 md:py-8"
        >
          <span aria-hidden="true" className={FLOOD} />
          <Cells row={NOW_ROW} glyph={<ArrowUpRight size={22} />} />
        </a>
      </div>
    </div>
  );
}
