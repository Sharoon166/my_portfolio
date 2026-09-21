"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { experience, technologiesCollection } from "@/constants";

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ExperienceSection() {
  return (
    <section id="experience">
      <div className="grid gap-6 gap-y-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 className="dot-suffix">Experience</h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
              Two chapters so far. One about shipping software at a startup, one about getting the fundamentals right.
            </p>
            <Link
              href="/about"
              className="group mt-8 inline-flex w-fit items-center gap-2 text-2xl text-destructive hover:underline underline-offset-4"
            >
              Full story
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                size={24}
                className="-rotate-45 text-destructive transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        <motion.ol
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="relative border-l border-border lg:col-span-7"
        >
          {experience.map((item) => (
            <motion.li
              key={item.id}
              variants={itemVariants}
              className="group relative pb-16 pl-10 last:pb-0 sm:pl-14"
            >
              <span className="absolute left-0 top-2 size-2.5 -translate-x-1/2 rounded-full bg-destructive ring-4 ring-destructive/15 transition-transform duration-300 group-hover:scale-150" />

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {item.period}
                </span>
                <span className="rounded-full border border-border px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 group-hover:border-destructive/40 group-hover:text-destructive">
                  {item.type}
                </span>
              </div>

              <h3 className="mt-4 font-bricolage text-2xl font-black italic leading-none tracking-tight lg:text-3xl">
                {item.role}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.company} <span className="text-muted-foreground/60">·</span> {item.location}
              </p>

              <p className="mt-5 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-muted-foreground/90">
                {item.desc}
              </p>

              {item.technologies && item.technologies.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                  {item.technologies.slice(0, 6).map((techKey) => {
                    const tech = technologiesCollection[techKey];
                    if (!tech) return null;
                    return (
                      <span
                        key={techKey}
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-foreground/70 transition-colors duration-300 group-hover:text-foreground/70"
                      >
                        <span className="relative size-3.5 shrink-0 opacity-60">
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            fill
                            className="object-contain"
                          />
                        </span>
                        {tech.name}
                      </span>
                    );
                  })}
                </div>
              )}
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
