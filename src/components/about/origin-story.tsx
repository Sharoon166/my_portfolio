"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import {
  experience,
  projects,
  minorProjects,
  skillCategories,
} from "@/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Stats ── */
interface Stat {
  value: number | null; // null → static glyph (∞)
  decimals?: number;
  suffix?: string;
  label: string;
}

const LEFT_STATS: Stat[] = [
  {
    value: projects.length + minorProjects.length,
    suffix: "+",
    label: "Projects shipped",
  },
  { value: 3, label: "Platforms at Synctom" },
  { value: 3.9, decimals: 1, label: "CGPA at NUML" },
];

const RIGHT_STATS: Stat[] = [
  {
    value: skillCategories.reduce((n, c) => n + c.skills.length, 0),
    suffix: "+",
    label: "Skills in rotation",
  },
  { value: experience.length, label: "Chapters of work" },
  { value: null, label: "Curiosity" },
];

/* Lead paragraph, pre-split for the scroll-fill reveal.
   The final token is the highlighted phrase (rendered as one word). */
const LEAD_WORDS =
  "A full-stack developer and problem-solver dedicated to shipping production apps that actually hold up, from restaurant platforms to business dashboards. I work in React, Next.js, Node.js and MongoDB, and I sweat the details most people skip.".split(
    " ",
  );
const LEAD_TOTAL = LEAD_WORDS.length + 1; // + highlighted closer

function useCountUp(
  target: number,
  decimals: number,
  active: boolean,
  instant: boolean,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (instant) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1300;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, instant]);

  if (decimals > 0) return value.toFixed(decimals);
  return String(Math.round(value)).padStart(2, "0");
}

function StatBlock({
  stat,
  active,
  instant,
}: {
  stat: Stat;
  active: boolean;
  instant: boolean;
}) {
  const decimals = stat.decimals ?? 0;
  const counted = useCountUp(
    stat.value ?? 0,
    decimals,
    active && stat.value !== null,
    instant,
  );
  const display = stat.value === null ? "∞" : counted;

  return (
    <div>
      <p className="font-bricolage text-3xl font-bold tracking-tight tabular-nums md:text-4xl lg:text-5xl">
        {display}
        {stat.suffix && <span className="text-destructive">{stat.suffix}</span>}
      </p>
      <p className="mt-1 text-xs tracking-wider text-muted-foreground ">
        {stat.label}
      </p>
    </div>
  );
}

/* Simple fade-up reveal per line — no masks, nothing to break */
const RevealLine = ({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) => (
  <motion.span
    className="block"
    initial={{ opacity: 0, y: "40%" }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
  >
    {children}
  </motion.span>
);

/* A single word that lights up as the paragraph scrolls past.
   progress spans 0→1 across the whole paragraph; each word owns its slice. */
function LitWord({
  children,
  progress,
  index,
  total,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const reduce = useReducedMotion();
  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0.14, 1],
  );

  return (
    <motion.span
      style={reduce ? { opacity: 1 } : { opacity }}
      className={`inline-block ${index === total - 1 ? "" : "mr-[0.25em]"}`}
    >
      {children}
    </motion.span>
  );
}

/* Handwritten aside with a squiggle that draws in */
function CaveatNote({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.aside
      initial={{ opacity: 0, y: 8, rotate: -7 }}
      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      className="w-fit"
    >
      <p className="font-caveat text-lg leading-snug text-destructive lg:text-xl">
        {text}
      </p>
      <svg
        viewBox="0 0 120 8"
        aria-hidden="true"
        className="mx-auto mt-1 h-2 w-20 overflow-visible text-destructive/70"
      >
        <motion.path
          d="M2 5 C 20 1, 40 8, 60 4 S 100 1, 118 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: delay + 0.35 }}
        />
      </svg>
    </motion.aside>
  );
}

/* Portrait — single image, gentle parallax, no drag */
function PortraitCard() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <motion.div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[24rem] select-none"
      style={{ y: reduce ? undefined : parallaxY }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 22,
          delay: 0.15,
        }}
      >
        <div className="aspect-4/5">
          <Image
            src="/me.png"
            alt="Sharoon Shaleem"
            width={400}
            height={500}
            draggable={false}
            className="h-full w-full object-contain pointer-events-none"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function OriginStory() {
  const reduce = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });

  /* Scroll driver for the word-by-word bio reveal */
  const leadRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress: leadProgress } = useScroll({
    target: leadRef,
    offset: ["start 0.85", "end 0.6"],
  });

  const flankReveal = (from: number): Variants => ({
    hidden: { opacity: 0, x: from, y: 12 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: EASE, delay: 0.25 },
    },
  });

  return (
    <section aria-labelledby="story-heading">
      {/* ── Stats flanks + portrait ── */}
      <div
        ref={statsRef}
        className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-[1fr_minmax(0,24rem)_1fr] lg:gap-14"
      >
        {/* Left stats — right-aligned against the portrait on desktop */}
        <motion.div
          variants={flankReveal(-32)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="order-2 grid grid-cols-3 gap-x-4 gap-y-8 text-center lg:order-1 lg:flex lg:flex-col lg:gap-0 lg:space-y-12 lg:text-right"
        >
          {LEFT_STATS.map((stat) => (
            <StatBlock
              key={stat.label}
              stat={stat}
              active={statsInView}
              instant={Boolean(reduce)}
            />
          ))}
        </motion.div>

        {/* Portrait */}
        <div className="order-1 lg:order-2">
          <PortraitCard />
          <div className="mt-6 flex justify-center">
            <CaveatNote
              text="Exhibit A — the developer, unfiltered"
              delay={0.6}
            />
          </div>
        </div>

        {/* Right stats — left-aligned against the portrait on desktop */}
        <motion.div
          variants={flankReveal(32)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="order-3 grid grid-cols-3 gap-x-4 gap-y-8 text-center lg:flex lg:flex-col lg:gap-0 lg:space-y-12 lg:text-left"
        >
          {RIGHT_STATS.map((stat) => (
            <StatBlock
              key={stat.label}
              stat={stat}
              active={statsInView}
              instant={Boolean(reduce)}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Centered bio ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        className="mx-auto mt-8 max-w-3xl space-y-6 text-center"
      >
        <p
          ref={leadRef}
          className="mx-auto max-w-2xl font-medium font-bricolage text-xl leading-snug text-pretty text-foreground/90 sm:text-2xl lg:text-4xl"
        >
          {LEAD_WORDS.map((word, i) => (
            <LitWord
              key={i}
              progress={leadProgress}
              index={i}
              total={LEAD_TOTAL}
            >
              {word}
            </LitWord>
          ))}
        </p>

        <div className="flex justify-center pt-2">
          <CaveatNote
            text="Debates welcome — anime recommendations, especially."
            delay={0.4}
          />
        </div>
      </motion.div>
    </section>
  );
}
