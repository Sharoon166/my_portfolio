"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { Star } from "lucide-react";
import { experience, extraTestimonials, type Testimonial } from "@/constants";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideVariants = {
  enter: { opacity: 0, y: 24 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.25, ease: [0.7, 0, 0.84, 0] },
  },
};

/** First sentence becomes the big display quote, the rest the muted support line. */
function splitQuote(testimony: string) {
  const firstSentence = testimony.match(/^[^.!?]*[.!?]/);
  if (!firstSentence || firstSentence[0].length === testimony.length) {
    return { lead: testimony, support: "" };
  }
  return { lead: firstSentence[0], support: testimony.slice(firstSentence[0].length).trim() };
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    ...experience.map((item) => item.testimonial).filter((t): t is Testimonial => Boolean(t)),
    ...extraTestimonials,
  ];

  const [index, setIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const active = testimonials[index];
  const rating = active.rating;
  const { lead, support } = splitQuote(active.testimony);
  const goTo = (direction: 1 | -1) =>
    setIndex((i) => (i + direction + testimonials.length) % testimonials.length);

  /* Touch swipe: horizontal only, so vertical page scroll is never hijacked */
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      goTo(dx < 0 ? 1 : -1);
    }
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  const navButton =
    "grid size-11 place-items-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:border-destructive hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destructive";

  return (
    <section
      id="testimonials"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        {/* ── Left rail: label, context, controls ── */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="dot-suffix">Testimonials</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
              A few words from the people I&apos;ve built for — founders, leads, and teammates
              I&apos;ve shipped alongside.
            </p>

            {testimonials.length > 1 && (
              <div className="mt-10 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => goTo(-1)}
                  aria-label="Previous testimonial"
                  className={navButton}
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  aria-label="Next testimonial"
                  className={navButton}
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                </button>
                <span className="ml-2 font-mono text-xs tabular-nums text-muted-foreground">
                  {pad(index + 1)} <span className="text-border">/</span> {pad(testimonials.length)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: the quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[24rem] lg:col-span-8 lg:border-l lg:border-border lg:pl-12"
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={active.name}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative pt-12 sm:pt-14"
            >
              {/* Quote glyph — absolutely placed so it never displaces the text */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 block font-bricolage text-[3.5rem] leading-[0.7] font-black italic text-destructive/25 select-none sm:text-[4.5rem]"
              >
                &rdquo;
              </span>

              <motion.blockquote
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="font-bricolage text-3xl leading-[1.08] font-semibold tracking-tight text-pretty md:text-4xl xl:text-5xl"
              >
                {lead.split(" ").map((word, i) => (
                  <motion.span key={i} variants={wordVariants} className="inline-block">
                    {word}
                    {i < lead.split(" ").length - 1 ? "\u00A0" : ""}
                  </motion.span>
                ))}
              </motion.blockquote>

              {support && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
                >
                  {support}
                </motion.p>
              )}

              {/* ── Attribution ── */}
              <motion.figcaption
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 flex flex-wrap items-center gap-4 border-t border-border pt-6"
              >
                {active.avatar ? (
                  <Image
                    src={active.avatar}
                    alt={active.name}
                    width={48}
                    height={48}
                    className="size-12 rounded-full border border-border object-cover grayscale contrast-125"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="grid size-12 place-items-center rounded-full border border-border bg-muted font-bricolage text-sm font-bold tracking-tight"
                  >
                    {initials(active.name)}
                  </span>
                )}

                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-bricolage text-base font-bold tracking-tight">
                      {active.name}
                    </span>
                    {rating && (
                      <>
                        <span className="font-mono text-xs tabular-nums text-muted-foreground">
                          {rating.toFixed(1)} / 5
                        </span>
                        <span
                          role="img"
                          aria-label={`${rating} out of 5 stars`}
                          className="flex items-center gap-0.5"
                        >
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              size={12}
                              strokeWidth={1.5}
                              className={
                                i < rating
                                  ? "fill-destructive text-destructive"
                                  : "text-muted-foreground/40"
                              }
                            />
                          ))}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {active.designation}
                  </p>
                </div>

                {active.source && (
                  <a
                    href={active.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group ml-auto flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-destructive"
                  >
                    {active.source.label ?? "Source"}
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={18}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                )}
              </motion.figcaption>
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
