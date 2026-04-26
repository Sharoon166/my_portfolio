"use client";

import { motion, useSpring, useMotionValue, useTransform } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  ArrowUpRight01Icon
} from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { profile, projects, minorProjects } from "@/constants";
import { useEffect } from "react";

const totalProjects = projects.length + minorProjects.length;

function MagneticWrapper({ children, strength = 0.5 }: { children: React.ReactNode; strength?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex items-center justify-center py-20"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">

        {/* Animated Grid / Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      {/* Vertical KPIs (Top Right) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-1/4 right-8 lg:right-16 hidden md:flex flex-col gap-10 z-20"
      >
        <div className="flex flex-col items-end text-right gap-1 group">
          <span className="text-4xl xl:text-5xl font-bricolage font-black text-white/90 group-hover:text-destructive transition-colors">{totalProjects}+</span>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground font-bold">Projects Built</span>
        </div>
      </motion.div>

      <div className="container relative z-10 space-y-6">

        {/* Top Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-75" />
            <div className="relative size-2 rounded-full bg-green-500" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-white/70">
            Available for new projects
          </span>
        </motion.div>

        {/* Main Title Area */}
        <div className="space-y-6">
          <div className="space-y-2">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-destructive text-sm block"
            >
              001 - Full-stack Developer
            </motion.span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bricolage font-black tracking-tighter leading-[0.9] italic!">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Digital Experiences
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block text-destructive stroked"
              >
                That Actually Matter
              </motion.span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="max-w-2xl ml-auto text-base md:text-lg text-muted-foreground font-light leading-relaxed text-pretty"
          >
            I&apos;m <span className="text-foreground font-semibold">Sharoon Shaleem</span>. I
            specialize in building scalable, high-performance applications that users love and businesses can rely on.
          </motion.p>
        </div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <MagneticWrapper strength={0.1}>
            <a href="/case-studies" className="flex items-center justify-between gap-4 px-6 py-2 bg-white text-black rounded-2xl hover:bg-zinc-200 transition-colors group">
              <span className="relative z-10">See case studies</span>
              <HugeiconsIcon icon={ArrowRight02Icon} size={18} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </MagneticWrapper>

          <MagneticWrapper strength={0.1}>
            <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer" download
              className="inline-flex items-center gap-2 group relative overflow-hidden text-2xl text-destructive hover:underline underline-offset-4 p-3">
              <span>View Résumé</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={32} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </MagneticWrapper>
        </motion.div>

      </div>
    </motion.section>
  );
}
