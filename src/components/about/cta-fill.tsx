"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { profile } from "@/constants";

// const TEXT = "WORK WITH ME";
const TEXT = "Let's Get started on that project";
const WORDS = TEXT.split(" ");

const SIZE = "text-[clamp(2.6rem,12vw,9.5rem)]";
const TYPE = "font-sans font-black uppercase leading-none tracking-tighter";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Each word = an outline layer + a fill layer stacked in a `relative
 * inline-block` wrapper. The absolutely-positioned fill is pixel-locked over
 * the in-flow outline via `inset-0` (identical text, type inherited from the
 * wrapper = no drift), and keeping the stroke off the clipped layer means the
 * wipe can never notch the outline.
 *
 * The fill is solid red revealed by an animated diagonal clip-path polygon —
 * a hard paint wipe with a slanted leading edge (SKEW), not an opacity fade.
 * Word-by-word slots keep it reading in order across wraps; everything is
 * solid by 0.8 of the range so nothing parks half-filled. The scrub ignores
 * prefers-reduced-motion: a color wipe isn't spatial motion, and
 * permanently-solid text would remove the point of the section.
 */
// const GRADIENT = "linear-gradient(90deg, rgba(239,67,67,1) 0 50%, rgba(239,67,67,0) 50% 100%)";
const GRADIENT = "linear-gradient(105deg, rgba(239,67,67,1) 0 50%, rgba(239,67,67,0) 50% 100%)";

const slot = (index: number, total: number): [number, number] => [
  (0.8 * index) / total,
  (0.8 * (index + 0.85)) / total,
];

const SKEW = "2rem"; // tilt amount — bigger = more slant

function FillWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // 0 -> 1 across this word's slot, buffered so the diagonal edge
  // fully clears the glyph box at both ends (not just the top edge)
  const reveal = useTransform(progress, slot(index, total), [0, 1]);

  const clipPath = useTransform(reveal, (v) => {
    // -20% to 120% gives buffer room for the skew to fully clear
    const x = v * 140 - 20;
    return `polygon(0 0, calc(${x}% ) 0, calc(${x}% - ${SKEW}) 150%, 0 150%)`;
  });

  return (
    <span className={`relative inline-block ${SIZE} ${TYPE}`}>
      {/* outline layer — unchanged */}
      <span aria-hidden="true" className="stroked block">
        {word}
      </span>

      {/* fill layer — solid color, wiped by an animated diagonal clip-path */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 block"
        style={{
          color: "rgba(239,67,67,1)",
          clipPath,
          WebkitClipPath: clipPath,
        }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export function CtaFill() {
  const ref = useRef<HTMLAnchorElement>(null);

  /* Long runway: the fill plays across ~90vh of scroll — from the moment the
     headline peeks in at the bottom edge to just past center — so you can
     actually watch it happen while the words are on screen. */
  const { scrollYProgress: progress } = useScroll({
    target: ref,
    offset: ["start 50%", "center 0.45"],
  });

  return (
    <>
      <a
        ref={ref}
        href={profile.meeting}
        target="_blank"
        rel="noopener noreferrer"
        data-mouse-text="LET'S TALK - LET'S TALK -"
        aria-label="Book a call with Sharoon"
        className="group relative block w-full overflow-hidden py-8 text-center my-0"
      >
        <span className={`block ${SIZE} ${TYPE}`}>
          {WORDS.map((word, i) => (
            <Fragment key={i}>
              <FillWord word={word} index={i} total={WORDS.length} progress={progress} />
              {i < WORDS.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      </a>

      {/* The big email — second way in */}
      <div className="flex flex-col items-center gap-3 pt-4 text-center mb-18">
        <span className="font-mono text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
          or reach me at
        </span>
        <motion.a
          href={profile.emailLink}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-bricolage text-[clamp(1.4rem,5.5vw,3.2rem)] leading-none font-bold tracking-tight wrap-break-word underline decoration-destructive/40 decoration-[3px] underline-offset-10 transition-colors hover:text-destructive hover:decoration-destructive"
        >
          {profile.email}
        </motion.a>
      </div>
    </>
  );
}
