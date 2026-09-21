"use client";

import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";

export function ScrollProgressButton() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(Math.round(v * 100));
  });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={`Scroll to top — ${progress}% read`}
          className="group fixed bottom-6 right-6 z-40 size-16 cursor-pointer rounded-full bg-background/80 shadow-lg shadow-background/40 ring-1 ring-border backdrop-blur-md transition-colors hover:ring-destructive/40"
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              strokeWidth="4"
              className="stroke-white/10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="1"
              style={{ pathLength: smoothProgress }}
              className="stroke-destructive"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="absolute font-mono text-[11px] font-semibold text-foreground/80 transition-opacity duration-200 group-hover:opacity-0">
              {progress}%
            </span>
            <HugeiconsIcon
              icon={ArrowUp01Icon}
              size={18}
              className="absolute text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
