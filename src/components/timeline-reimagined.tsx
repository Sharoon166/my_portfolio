"use client";

import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import type { ExperienceItem } from "@/constants";
import { technologiesCollection } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { AtSign, Quote } from "lucide-react";

interface TimelineReimaginedProps {
  items: ExperienceItem[];
}

export function TimelineReimagined({ items }: TimelineReimaginedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const x = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.floor(latest * items.length);
      setActiveIndex(Math.min(index, items.length - 1));
    });

    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  const activeItem = items[activeIndex];
  const mobileActiveItem = items[mobileIndex];

  const handleNext = () => {
    setMobileIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setMobileIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDotClick = (index: number) => {
    setMobileIndex(index);
  };

  return (
    <div ref={containerRef} className="relative lg:min-h-[300vh]">
      {/* Mobile: Motion-controlled carousel */}
      <div className="lg:hidden space-y-16 py-12 px-6">
        {items.map((item) => (
          <div key={item.id} className="relative pl-8">
            {/* Timeline Line Segment */}
            <div className="absolute left-0 top-0 bottom-[-64px] w-px bg-destructive last:hidden" />
            
            <div className="relative space-y-6">
              {/* Floating Period Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold">
                {item.period}
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight">
                  {item.role}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <AtSign size={14} className="text-destructive" />
                  <span>{item.company}</span>
                  <span className="text-white/10">•</span>
                  <span className="text-xs">{item.location}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground/80 leading-relaxed whitespace-pre-line">
                {item.desc}
              </p>

              {item.technologies && item.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.technologies.map((tech) => {
                    const techData = technologiesCollection[tech];
                    if (!techData) return null;
                    return (
                      <div key={tech} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/5">
                        <Image src={techData.icon} alt={techData.name} width={12} height={12} className="opacity-50" />
                        <span className="text-[10px] font-medium text-white/40">{techData.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Sticky scroll */}
      <div className="hidden lg:flex sticky top-0 h-screen items-center justify-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-[200px_1fr] gap-8 items-center">
          
          <div className="space-y-8">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0.3 }}
                animate={{ 
                  opacity: index === activeIndex ? 1 : 0.3,
                  scale: index === activeIndex ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="text-left cursor-pointer py-2 px-1 -mx-1 rounded-lg hover:bg-zinc-800/30 transition-colors"
                onClick={() => {
                  const target = containerRef.current;
                  if (target) {
                    const scrollTarget = (index / (items.length - 1)) * (target.scrollHeight - window.innerHeight);
                    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
                  }
                }}
              >
                <p className="text-2xl font-bold font-caveat">
                  {item.period.split(" - ")[0]}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.company}
                </p>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-6 max-w-[80ch]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-semibold mb-2 inline-flex items-center gap-2">
                  {activeItem.role} <AtSign /> {activeItem.company}
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {activeItem.location}
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-muted-foreground/80 leading-relaxed whitespace-pre-line"
              >
                {activeItem.desc}
              </motion.p>

              {activeItem.tags && activeItem.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2 justify-start"
                >
                  {activeItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-3 py-1.5 rounded-full bg-zinc-800/50 text-muted-foreground border border-zinc-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}

              {activeItem.testimonial && (
                <div className="relative mt-12 pl-8 border-l-[3px] border-destructive/40 space-y-6">
                  <p className="text-xl text-white/80 italic leading-snug text-pretty">
                    &quot;{activeItem.testimonial.testimony}&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <span className="text-xs font-bold text-white/40">
                        {activeItem.testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-white/90">{activeItem.testimonial.name}</span>
                      <span className="text-xs text-white/30 uppercase tracking-widest">{activeItem.testimonial.designation}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeItem.technologies && activeItem.technologies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-wrap gap-2 justify-start"
                >
                  {activeItem.technologies.map((tech) => {
                    const techData = technologiesCollection[tech];
                    if (!techData) return null;
                    return (
                      <Badge key={tech} variant="secondary" className="font-normal gap-2 text-sm">
                        <Image src={techData.icon} alt={techData.name} width={16} height={16} />
                        {techData.name}
                      </Badge>
                    );
                  })}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isInView && (
          <motion.div
            ref={paginationRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:flex fixed bottom-8 right-10 z-50"
          >
            <div className="flex gap-2">
              {items.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: index === activeIndex ? 1 : 0.3,
                    width: index === activeIndex ? 24 : 8,
                  }}
                  className="h-1 rounded-full bg-destructive"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide navbar on mobile when timeline is in view */}
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
