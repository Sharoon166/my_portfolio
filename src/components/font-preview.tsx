"use client";

// TEMP font preview tool — delete this file and remove <FontPreview /> from layout.tsx when done.

import { useState } from "react";
import {
  JetBrains_Mono,
  Ubuntu_Mono,
  PT_Mono,
  Work_Sans,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Tenor_Sans,
} from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainsFont = JetBrains_Mono({ subsets: ["latin"] });
const ubuntuFont = Ubuntu_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const ptMonoFont = PT_Mono({ subsets: ["latin"], weight: "400" });
const workSansFont = Work_Sans({ subsets: ["latin"] });
const ibmSansFont = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "600"] });
const ibmMonoFont = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"] });
const tenorSansFont = Tenor_Sans({ subsets: ["latin"], weight: "400" });

const bodyFonts = [
  { id: "jetbrains", name: "JetBrains Mono · mono", font: jetbrainsFont },
  { id: "ubuntu", name: "Ubuntu Mono · mono", font: ubuntuFont },
  { id: "pt-mono", name: "PT Mono · mono", font: ptMonoFont },
  { id: "ibm-mono", name: "IBM Plex Mono · mono", font: ibmMonoFont },
  { id: "work-sans", name: "Work Sans · sans", font: workSansFont },
  { id: "ibm-sans", name: "IBM Plex Sans · sans", font: ibmSansFont },
];

/* font: null → site default (Bricolage via --font-bricolage, no override). */
const headingFonts: {
  id: string;
  name: string;
  font: { style: { fontFamily: string } } | null;
}[] = [
  { id: "bricolage", name: "Bricolage Grotesque · current", font: null },
  { id: "tenor", name: "Tenor Sans · heading", font: tenorSansFont },
];

export function FontPreview() {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("pt-mono");
  const [heading, setHeading] = useState("bricolage");

  const selectedBody = bodyFonts.find((f) => f.id === body) ?? bodyFonts[0];
  const selectedHeading =
    headingFonts.find((f) => f.id === heading) ?? headingFonts[0];

  const applyBody = (id: string) => {
    setBody(id);
    const option = bodyFonts.find((f) => f.id === id);
    if (option) {
      document.body.style.setProperty("--font-body", option.font.style.fontFamily);
    }
  };

  const applyHeading = (id: string) => {
    setHeading(id);
    const option = headingFonts.find((f) => f.id === id);
    if (option?.font) {
      document.body.style.setProperty(
        "--font-bricolage",
        option.font.style.fontFamily,
      );
    } else {
      document.body.style.removeProperty("--font-bricolage");
    }
  };

  const reset = () => {
    document.body.style.removeProperty("--font-bricolage");
    document.body.style.removeProperty("--font-body");
    setBody("pt-mono");
    setHeading("bricolage");
  };

  return (
    <div className="fixed bottom-6 right-6 z-60">
      {open ? (
        <div className="w-80 rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="meta-label font-bold">Font Lab</span>
            <button
              onClick={reset}
              className="text-[10px] font-bold uppercase tracking-widest text-destructive hover:underline"
            >
              Reset
            </button>
          </div>

          <div className="mb-3 space-y-2 rounded-xl border border-border bg-muted/50 p-4">
            <p
              className="font-bricolage text-2xl font-bold leading-tight tracking-tight"
              style={{
                fontFamily: selectedHeading.font
                  ? selectedHeading.font.style.fontFamily
                  : undefined,
              }}
            >
              {selectedHeading.font ? "Tenor Sans heading" : "Bricolage heading"}
            </p>
            <p className="text-xs leading-relaxed" style={{ fontFamily: selectedBody.font.style.fontFamily }}>
              The quick brown fox jumps over the lazy dog — 0123456789, &lt;code&gt; &amp; _*
            </p>
          </div>

          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Headings
          </p>
          <ul className="mb-3 flex flex-col gap-0.5">
            {headingFonts.map((option) => (
              <li key={option.id}>
                <button
                  onClick={() => applyHeading(option.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left transition-colors",
                    heading === option.id ? "bg-muted" : "hover:bg-muted/50"
                  )}
                >
                  <span
                    className="text-sm font-semibold"
                    style={
                      option.font
                        ? { fontFamily: option.font.style.fontFamily }
                        : undefined
                    }
                  >
                    {option.name}
                  </span>
                  {heading === option.id && (
                    <span className="size-1.5 shrink-0 rounded-full bg-destructive" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Body
          </p>
          <ul className="flex max-h-64 flex-col gap-0.5 overflow-y-auto pr-1">
            {bodyFonts.map((option) => (
              <li key={option.id}>
                <button
                  onClick={() => applyBody(option.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left transition-colors",
                    body === option.id ? "bg-muted" : "hover:bg-muted/50"
                  )}
                >
                  <span className="text-sm" style={{ fontFamily: option.font.style.fontFamily }}>
                    {option.name}
                  </span>
                  {body === option.id && (
                    <span className="size-1.5 shrink-0 rounded-full bg-destructive" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen(false)}
            className="mt-3 w-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            Collapse
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full border border-border bg-background/95 px-4 py-2 text-[10px] font-bold uppercase tracking-widest shadow-2xl backdrop-blur-xl transition-colors hover:border-destructive/40"
        >
          Font Lab
        </button>
      )}
    </div>
  );
}
