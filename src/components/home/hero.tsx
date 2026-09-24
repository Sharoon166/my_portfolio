"use client";

import { motion, useSpring, useMotionValue, useTransform } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { profile, projects, minorProjects } from "@/constants";
import { useEffect } from "react";
import Image from "next/image";

const totalProjects = projects.length + minorProjects.length;

const portraitMask = {
  maskImage: "linear-gradient(to bottom, black 40%, transparent 92%)",
  WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 92%)",
};

function MagneticWrapper({
  children,
  strength = 0.5,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
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
      className="relative min-h-screen flex max-sm:flex-col-reverse items-center justify-center"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated Grid / Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_70%,transparent_100%)] opacity-40" />
      </div>

      {/* Vertical KPIs (Top Right) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-1/4 right-8 lg:right-16 hidden md:flex flex-col gap-10 z-30"
      >
        <div className="flex flex-col items-end text-right gap-1 group">
          <span className="text-4xl xl:text-5xl font-bricolage font-black text-foreground/90 group-hover:text-destructive transition-colors">
            {totalProjects}+
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground font-bold">
            Projects Built
          </span>
        </div>
      </motion.div>

      <div className="container relative z-10 space-y-6 py-20">
        
        {/* Portrait Image Behind Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="sm:absolute inset-0 bottom-0 z-2 flex items-end justify-center pointer-events-none select-none"
        >
          <div className="relative w-full h-[85vh] max-h-[450px] sm:h-[70vh] sm:max-h-[600px] md:h-[93vh] md:max-h-[950px]]">
            <Image
              src="/me-v2.png"
              alt="Sharoon Shaleem"
              fill
              className="theme-img-dark object-contain object-bottom"
              style={portraitMask}
              priority
            />
            <Image
              src="/me.png"
              alt="Sharoon Shaleem"
              fill
              className="theme-img-light object-contain object-bottom"
              style={portraitMask}
              priority
            />
          </div>
        </motion.div>
        
        {/* Top Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-sm:-mt-[60%] mb-2 flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border border-border backdrop-blur-md w-fit relative -z-10 "
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-75" />
            <div className="relative size-2 rounded-full bg-green-500" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest font-bold text-muted-foreground">
            Available for new projects
          </span>
        </motion.div>

        {/* Main Title Area */}
        <div className="space-y-6 relative">
          <div className="space-y-2">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-destructive text-sm block relative z-20"
            >
              001 - Full-stack Developer
            </motion.span>
            <h1 className="space-y-2">
              <span className="sr-only">
                Sharoon Shaleem — Full-stack Developer. Digital Experiences That
                Actually Matter
              </span>
              {/* "Digital Experiences" — behind the image */}
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bricolage font-black tracking-tighter leading-[0.9] italic! relative z-1 text-center"
              >
                Digital Experiences
              </motion.span>
              {/* "That Actually Matter" — on top of the image */}
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bricolage font-black tracking-tighter leading-[0.9] italic! text-destructive stroked relative z-30"
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
            I&apos;m{" "}
            <span className="text-foreground font-semibold">
              Sharoon Shaleem
            </span>
            . I specialize in building scalable, high-performance applications
            that users love and businesses can rely on.
          </motion.p>
        </div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="*:mx-auto flex flex-wrap gap-x-6 gap-y-2 items-center relative z-20"
        >
          <MagneticWrapper strength={0.1}>
            <a
              href="/case-studies"
              className="flex items-center justify-between gap-4 px-6 py-2 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors group"
            >
              <span className="relative z-10">See case studies</span>
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                size={18}
                className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
          </MagneticWrapper>

          <MagneticWrapper strength={0.1}>
            <a
              href={profile.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              // download
              className="inline-flex items-center gap-2 group relative overflow-hidden text-2xl text-destructive hover:underline underline-offset-4 p-3"
            >
              <span>View Résumé</span>
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={32}
                className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
          </MagneticWrapper>
        </motion.div>
      </div>
    </motion.section>
  );
}
