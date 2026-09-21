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
} from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainsFont = JetBrains_Mono({ subsets: ["latin"] });
const ubuntuFont = Ubuntu_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const ptMonoFont = PT_Mono({ subsets: ["latin"], weight: "400" });
const workSansFont = Work_Sans({ subsets: ["latin"] });
const ibmSansFont = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "600"] });
const ibmMonoFont = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"] });

const bodyFonts = [
  { id: "jetbrains", name: "JetBrains Mono · mono", font: jetbrainsFont },
  { id: "ubuntu", name: "Ubuntu Mono · mono", font: ubuntuFont },
  { id: "pt-mono", name: "PT Mono · mono", font: ptMonoFont },
  { id: "ibm-mono", name: "IBM Plex Mono · mono", font: ibmMonoFont },
  { id: "work-sans", name: "Work Sans · sans", font: workSansFont },
  { id: "ibm-sans", name: "IBM Plex Sans · sans", font: ibmSansFont },
];

export function FontPreview() {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("pt-mono");

  const selectedBody = bodyFonts.find((f) => f.id === body) ?? bodyFonts[0];

  const applyBody = (id: string) => {
    setBody(id);
    const option = bodyFonts.find((f) => f.id === id);
    if (option) {
      document.body.style.setProperty("--font-body", option.font.style.fontFamily);
    }
  };

  const reset = () => {
    document.body.style.removeProperty("--font-bricolage");
    document.body.style.removeProperty("--font-body");
    setBody("pt-mono");
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
            <p className="text-xs leading-relaxed" style={{ fontFamily: selectedBody.font.style.fontFamily }}>
              The quick brown fox jumps over the lazy dog — 0123456789, &lt;code&gt; &amp; _*
            </p>
          </div>

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
