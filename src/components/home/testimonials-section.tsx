"use client";

import { motion } from "motion/react";
import { experience, type Testimonial } from "@/constants";

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

export function TestimonialsSection() {
  const testimonials = experience
    .map((item) => item.testimonial)
    .filter((t): t is Testimonial => Boolean(t));

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials">
      <div className="mb-12 text-center">
        <h2 className="dot-suffix">Testimonials</h2>
      </div>

      <div className="mx-auto max-w-3xl">
        {testimonials.map((t) => {
          const words = t.testimony.split(" ");
          return (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-center"
            >
              <span className="absolute top-0 pointer-events-none block select-none font-bricolage text-[6rem] font-black italic leading-24 text-destructive/10 lg:text-[8rem]">
                &ldquo;
              </span>

              <motion.blockquote
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="relative font-body text-2xl font-medium leading-snug text-pretty"
              >
                {words.map((word, i) => (
                  <motion.span key={i} variants={wordVariants} className="inline-block">
                    {word}
                    {i < words.length - 1 ? "\u00A0" : ""}
                  </motion.span>
                ))}
              </motion.blockquote>

              <motion.figcaption
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="relative mt-12 flex items-center justify-center gap-x-3"
              >
                <span className="h-px w-8 bg-white/20 sm:w-12" />
                <div>
                  <p className="font-bricolage text-3xl font-semibold leading-none text-destructive">
                    {t.name}
                  </p>
                  <p className="mt-1.5 text-sm uppercase text-muted-foreground">
                    {t.designation}
                  </p>
                </div>
                <span className="h-px w-8 bg-white/20 sm:w-12" />
              </motion.figcaption>
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
}
