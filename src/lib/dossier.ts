/**
 * Dossier design atoms shared by the about-page ledger (ExperienceRecord)
 * and the landing-page timeline (ExperienceSection) — one source of truth
 * so hover behavior and stamp typography can't drift between pages.
 */

/* Hover paint-flood — same left-to-right wipe language as the CTA fill.
   Expects an inverted (destructive-foreground) text state while active;
   don't clip with overflow-hidden if child elements overhang the box. */
export const FLOOD =
  "absolute inset-0 origin-left scale-x-0 bg-destructive transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none";

const STAMP: Record<string, string> = {
  Work: "border-destructive/50 text-destructive group-hover:border-destructive-foreground/60 group-hover:text-destructive-foreground",
  Education:
    "border-border text-muted-foreground group-hover:border-destructive-foreground/40 group-hover:text-destructive-foreground/80",
  Status: "border-destructive bg-destructive text-destructive-foreground group-hover:border-destructive-foreground group-hover:bg-destructive-foreground group-hover:text-destructive",
};

export const stampClass = (type: string) =>
  `inline-flex w-fit items-center rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${STAMP[type] ?? STAMP.Education}`;
