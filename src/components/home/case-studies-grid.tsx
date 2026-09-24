"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { caseStudies } from "@/data/case-studies";
import { projects } from "@/constants";
import { useRef } from "react";
import { CometCard } from "../ui/comet-card";

/* Only projects that have a case study */
const featuredStudies = projects
  .filter((p) => p.caseStudyId)
  .map((p) => ({
    ...p,
    study: caseStudies[p.caseStudyId!],
  }));

function ParallaxCard({
  children,
  speed = 0,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y }} className="will-change-transform">
      {children}
    </motion.div>
  );
}

function CaseStudyCard({
  project,
  index,
}: {
  project: (typeof featuredStudies)[number];
  index: number;
}) {
  const study = project.study;

  return (
    <Link
      href={`/case-studies/${project.caseStudyId}`}
      className="group block space-y-4"
    >
      {/* Image area — themed frame with spring reveal + 3D tilt, like the project cards */}
      <div
        className="relative  rounded-2xl overflow-hidden border border-border flex items-center justify-center p-1 px-3"
        style={{ backgroundColor: project.themeColor }}
      >
        <div
          className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl"
          data-mouse-text="Case Study · Case Study · "
        >
          <CometCard transparent className="w-full">
            <motion.div
              initial={{ y: "60%", scale: 0.95, rotate: index % 2 === 0 ? -2 : 2 }}
              whileInView={{ y: "8%" }}
              whileHover={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
              className="relative aspect-3/2 w-full"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top brightness-95 group-hover:brightness-100 transition-[filter] duration-500"
              />
            </motion.div>
          </CometCard>
        </div>
      </div>

      {/* Text content */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: project.themeColor }}>
            {project.title}
          </h3>
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            size={32}
            className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 shrink-0"
            style={{ color: `${project.themeColor}` }}
          />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {project.description}
        </p>
        {/* Tag pill */}
        {study?.type && (
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-muted/50 text-foreground/50 border border-border">
            {study.type}
          </span>
        )}
      </div>
    </Link>
  );
}

export function CaseStudiesGrid() {
  /* Split into left and right columns */
  const leftStudies = featuredStudies.slice(0, 2);
  const rightStudies = featuredStudies.slice(2, 4);

  return (
    <section id="case-studies" className="relative">
      <div className="grid  md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* ── LEFT COLUMN ─────────────────────────────────── */}
        <div className="space-y-10 md:pt-16 max-md:order-2">
          {leftStudies.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ParallaxCard speed={30}>
                <CaseStudyCard project={project} index={i} />
              </ParallaxCard>
            </motion.div>
          ))}

          {/* Footer text + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 pt-4"
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-foreground">
              I help ambitious brands stand out,{" "}
              <span className="text-destructive">make more money</span>
            </h3>
            <MagneticButton>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors duration-300 group"
              >
                View All Work
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ────────────────────────────────── */}
        <div className="space-y-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <span className="text-destructive">✦</span>
              Some Recent Case Studies
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Selected Work That Delivers{" "}
              <span className="text-destructive italic">Results</span>
            </h2>
          </motion.div>

          {/* Right column cards */}
          {rightStudies.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            >
              <ParallaxCard speed={50}>
                <CaseStudyCard
                  project={project}
                  index={i + 2}
                />
              </ParallaxCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
