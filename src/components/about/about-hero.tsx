"use client";

import { motion, type Variants } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  GithubIcon,
  InstagramIcon,
  Linkedin01Icon,
} from "@hugeicons/core-free-icons";
import { profile } from "@/constants";
import { Button } from "@/components/ui/button";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Line-mask reveal: each line slides up out of a clipped box */
const lineVariants: Variants = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.12 },
  }),
};

const DOSSIER_FACTS: [string, string][] = [
  ["Role", "Full-Stack Developer"],
  ["Base", "Islamabad, Pakistan · UTC+5"],
  ["Status", "Open to work"],
];

export function AboutHero() {
  return (
    <header className="relative overflow-hidden pt-16 md:pt-28">
      <div className="mt-10 ">
        {/* ── Left: stamp, headline, dossier table ── */}
        <div>
          <h1 className="mt-8">
            <span className="-mb-[0.14em] block overflow-y-hidden pb-[0.14em]">
              <motion.span
                custom={0}
                variants={lineVariants}
                initial="hidden"
                animate="show"
                className="block"
              >
                The developer behind
              </motion.span>
            </span>
            <span className="-mb-[0.14em] block overflow-y-hidden pb-[0.14em]">
              <motion.span
                custom={1}
                variants={lineVariants}
                initial="hidden"
                animate="show"
                className="block"
              >
                the <span className="text-destructive">pixels</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
            className="ml-auto mt-8 max-w-lg text-muted-foreground text-pretty"
          >
            I obsess over clean code and sharp interfaces. Here&apos;s the story of
            how I got here, and where I&apos;m headed next.
          </motion.p>

          {/* Dossier facts table */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10 grid w-full max-w-md grid-cols-[5.5rem_1fr] gap-x-5 gap-y-2.5 pt-5"
          >
            {DOSSIER_FACTS.map(([key, value]) => (
              <div key={key} className="contents">
                <dt className="text-sm uppercase tracking-widest text-muted-foreground">
                  {key}
                </dt>
                <dd className="text-foreground">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── Right: résumé + socials ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
          className="flex py-4 gap-4 lg:self-end"
        >
          <Button asChild size="lg" variant="secondary">
            <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer">
              <span>View Résumé</span>
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                size={22}
                className="-rotate-45 transition-transform"
              />
            </a>
          </Button>

          <div className="flex items-center gap-3 px-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 border border-border rounded-xl hover:bg-muted/50 transition-colors opacity-50 hover:opacity-100"
            >
              <HugeiconsIcon icon={GithubIcon} size={20} />
            </a>
            <a
              href={profile.linkenIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 border border-border rounded-xl hover:bg-muted/50 transition-colors opacity-50 hover:opacity-100"
            >
              <HugeiconsIcon icon={Linkedin01Icon} size={20} />
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-3 border border-border rounded-xl hover:bg-muted/50 transition-colors opacity-50 hover:opacity-100"
            >
              <HugeiconsIcon icon={InstagramIcon} size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
