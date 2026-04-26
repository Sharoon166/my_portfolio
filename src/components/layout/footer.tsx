"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { CodeIcon } from "@hugeicons/core-free-icons";

export function Footer() {
  return (
    <footer className="py-3 flex justify-between gap-5 flex-wrap-reverse">
      <div className="flex justify-between items-center text-sm">
        <div>© {new Date().getFullYear()} - Made with <HugeiconsIcon icon={CodeIcon} size={18} className="inline-block" /> by Sharoon.</div>
      </div>
      <div>
        <span className="mr-1 inline-block size-2 bg-green-500 rounded-full animate-pulse" />{" "}
        Available for Hire
      </div>
    </footer>
  );
}
