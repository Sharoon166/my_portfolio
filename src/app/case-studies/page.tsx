"use client";
import { caseStudies } from "@/data/case-studies";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { technologiesCollection, projects } from "@/constants";
import { useState, useRef } from "react";
import { ContactSection } from "@/components/home/contact";

const categories = ["All", "Full-stack", "Internal Tool", "Frontend", "Web Design"];

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState("All");

  const filteredStudies = Object.values(caseStudies).filter((study) => {
    if (filter === "All") return true;
    const searchFilter = filter.toLowerCase().replace(/[^a-z0-9]/g, '');
    const studyType = study.type.toLowerCase().replace(/[^a-z0-9]/g, '');
    const studyCats = study.categories.map(c => c.toLowerCase().replace(/[^a-z0-9]/g, ''));
    
    return studyType.includes(searchFilter) || studyCats.some(cat => cat.includes(searchFilter));
  });

  return (
    <div className="min-h-screen relative overflow-hidden pb-32 mx-auto py-24 space-y-14">
      <div className="px-6 md:px-12 pt-28 relative z-10">
        {/* Header Section */}
        <header className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <h1 className="font-bold tracking-tight leading-[1.1] max-w-4xl">
              Under the <span className="text-destructive">hood</span>
            </h1>

            <p className="ml-auto text-muted-foreground leading-snug max-w-2xl">
              A detailed look at the problem, the approach, key decisions, tradeoffs, and the lessons that came out of it.
            </p>
          </motion.div>
        </header>

        {/* Section Header & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div className="space-y-4">
            <h2 className="dot-suffix w-fit">
              Selected works
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 lg:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 lg:px-6 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${filter === cat
                  ? "bg-background border-foreground text-background"
                  : "bg-white/5 border-white/10 hover:border-destructive/50 text-muted-foreground"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Style Projects Listing */}
        <div className="border-t border-border/50">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study, index) => {
              const projectMeta = projects.find(p => p.caseStudyId === study.id);
              const imageUrl = projectMeta?.image || "";

              return (
                <ProjectAccordionItem
                  key={study.id}
                  study={study}
                  imageUrl={imageUrl}
                  index={index}
                />
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-22">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}

function ProjectAccordionItem({ study, imageUrl, index }: { study: any, imageUrl: string, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Magnet Effect Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
    const pullRadius = 160;

    if (dist < pullRadius) {
      const strength = 1 - (dist / pullRadius);
      mouseX.set((e.clientX - centerX) * 0.45 * strength);
      mouseY.set((e.clientY - centerY) * 0.45 * strength);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const brandColor = study.themeColor || "var(--destructive)";
  const projectMeta = projects.find(p => p.caseStudyId === study.id);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      onMouseMove={handleMouseMove}
      layout
      className="group border-b border-white/5 relative overflow-visible"
    >
      {/* Ambient Brand Highlight */}
      <div
        className={`max-md:hidden absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-40 lg:opacity-0'
          }`}
        style={{
          background: `linear-gradient(90deg, ${brandColor}0D 0%, transparent 80%)`
        }}
      />

      <Link href={`/case-studies/${study.id}`} className="block relative z-10 py-8 lg:py-16 hover:bg-white/1 transition-colors">
        <div className="grid grid-cols-12 items-center px-4 md:px-12 gap-4">
          {/* Index */}
          <div className="col-span-1 hidden lg:block">
            <motion.span
              animate={{
                color: isHovered ? brandColor : "rgba(255,255,255,0.05)",
                x: isHovered ? 10 : 0
              }}
              className="text-5xl font-black italic select-none"
            >
              {(index + 1).toString().padStart(2, '0')}
            </motion.span>
          </div>

          {/* Title Area & Mobile Indicator */}
          <div className="col-span-10 lg:col-span-5 relative">
            <div className="flex flex-col gap-1 lg:gap-2">
              <div className="flex items-center gap-3 lg:hidden">
                <span className="text-xs font-bold opacity-20 italic">{(index + 1).toString().padStart(2, '0')}</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <motion.h3
                animate={{
                  color: isHovered ? brandColor : "rgba(200,200,200,0.8)",
                  x: isHovered ? 20 : 0
                }}
                className="text-2xl md:text-6xl font-extrabold tracking-tighter leading-none italic uppercase flex items-center lg:gap-4"
              >
                <span className="">{study.title}</span>
                <AnimatePresence mode="popLayout">
                  {isHovered && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 80, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="h-[4px] bg-current hidden lg:block"
                    />
                  )}
                </AnimatePresence>
              </motion.h3>
              <span className="text-xs uppercase opacity-30">
                {study.type} • {study.year}
              </span>
            </div>
          </div>

          {/* The Monolith Stage (Right Projection) */}
          <div className="col-span-1 lg:col-span-4 relative h-full">
            <AnimatePresence>
              {isHovered && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-10">
                  <motion.div
                    initial={{ opacity: 0, x: 80, rotateY: 35, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, rotateY: -20, rotateX: 8, scale: 1 }}
                    exit={{ opacity: 0, x: 40, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="relative w-[380px] z-50 perspective-1000 hidden xl:block"
                  >
                    <div className="relative">
                      <div className="rounded-lg p-px bg-linear-to-br from-white/10 to-transparent relative overflow-hidden">
                        <div className="rounded-[inherit] overflow-hidden bg-zinc-950/80 backdrop-blur-xl border border-white/5 aspect-video relative">
                          <Image
                            src={imageUrl}
                            alt={study.title}
                            fill
                            className="object-cover"
                          />
                          <motion.div
                            animate={{ y: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-x-0 h-1/2 bg-linear-to-b from-transparent via-white/5 to-transparent shadow-2xl"
                          />
                        </div>
                      </div>
                      <div className="mt-8 flex items-center justify-between">
                        <div className="flex gap-2">
                          {projectMeta?.technologies?.slice(0, 2).map((techKey: any, i: number) => {
                            const techName = (technologiesCollection[techKey as keyof typeof technologiesCollection] as any)?.name || techKey;
                            return (
                              <span key={i} className="text-[9px] font-black uppercase tracking-tighter border-l-2 pl-2" style={{ borderColor: brandColor }}>
                                {techName}
                              </span>
                            );
                          })}
                        </div>
                        <span className="text-[10px] opacity-20 italic">REF_{study.id.toUpperCase()}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Arrow Toggle */}
          <div className="col-span-2 lg:col-span-1 flex justify-end overflow-visible">
            <motion.div
              ref={containerRef}
              style={{ x: springX, y: springY }}
              className={`size-10 lg:size-16 rounded-full border flex items-center justify-center transition-all duration-500 ${isHovered ? 'border-foreground text-foreground bg-foreground/5' : 'border-border text-muted-foreground/10'
                }`}
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={24} className={`transition-all duration-700 ${isHovered ? '-rotate-45' : ''}`} />
            </motion.div>
          </div>
        </div>

        {/* Expanded Section on Hover (Disabled on Mobile) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden hidden lg:block"
            >
              <div className="grid grid-cols-12 px-6 md:px-12 py-10 gap-12">
                <div className="col-span-1 hidden lg:block" />
                <div className="col-span-12 lg:col-span-6 space-y-6">
                  <div className="h-px w-20 bg-destructive/30" />
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-xl">
                    {projectMeta?.description || study.vision}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {projectMeta?.technologies?.map((techKey, i: number) => {
                      const techInfo = technologiesCollection[techKey as keyof typeof technologiesCollection];
                      return (
                        <div key={i} className="flex items-center gap-2 group/icon">
                          {techInfo?.icon && (
                            <div className="size-4 relative opacity-40 group-hover/icon:opacity-100 transition-opacity">
                              <Image src={techInfo.icon} alt={techInfo.name} fill className="object-contain" />
                            </div>
                          )}
                          <span className="text-[10px] font-bold opacity-30 group-hover/icon:opacity-100 transition-opacity uppercase">
                            {techInfo?.name || techKey}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
}

