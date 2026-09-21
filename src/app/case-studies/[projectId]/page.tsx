"use client";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  GithubIcon,
  ArrowUpRight01Icon,
  LockPasswordIcon,
} from "@hugeicons/core-free-icons";
import { use, useEffect, useState } from "react";
import { technologiesCollection, projects } from "@/constants";
import Image from "next/image";
import { motion } from "motion/react";
import { ContactSection } from "@/components/home/contact";
import { TableOfContents } from "@/components/case-studies/table-of-contents";
import { Gallery } from "@/components/case-studies/gallery";

export default function CaseStudyPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params);
  const study = caseStudies[projectId];
  const project = projects.find(p => p.caseStudyId === projectId);
  const [activeSection, setActiveSection] = useState("01");

  // HUD Navigation Logic — scrollspy picks the last section whose top
  // has crossed the 25% viewport line, so short sections track correctly.
  useEffect(() => {
    if (!study) return;

    let sections: HTMLElement[] = [];

    const update = () => {
      const line = window.innerHeight * 0.25;
      let current = sections[0]?.getAttribute("data-section-index") ?? "01";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) {
          current = section.getAttribute("data-section-index") ?? current;
        }
      }
      setActiveSection(current);
    };

    const timeout = setTimeout(() => {
      sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-section-index]")
      );
      window.addEventListener("scroll", update, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", update);
    };
  }, [study]);

  if (!study) notFound();

  const brandColor = study.themeColor;
  const sections = [
    { label: "Vision" },
    { label: "Problem" },
    { label: "Solution" },
    { label: "Features" },
    ...(study.challenges.length > 0 ? [{ label: "Hurdles" }] : []),
    { label: "Impact" },
    { label: "Reflection" }
  ];

  const navItems = sections.map((s, i) => ({
    id: (i + 1).toString().padStart(2, '0'),
    label: s.label,
  }));

  const scrollToSection = (id: string) => {
    const element = document.querySelector(`[data-section-index="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen selection:bg-primary selection:text-primary-foreground">

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-32 py-24">
        {/* Hero Content */}
        <header className="pt-28 mb-24 lg:mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-4xl space-y-8">
              <h1 className="font-bold tracking-tighter leading-[0.9] italic">
                {study.title}
              </h1>

              <p className="font-heading text-muted-foreground max-w-2xl leading-tight text-pretty">
                {study.tagline}
              </p>
            </div>

            {/* Action Links */}
            <div className="flex flex-col gap-4">
              {study.previewUrl && (
                <a href={study.previewUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 px-6 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors group">
                  <span className="font-semibold text-sm tracking-tight">Preview</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              )}
              {study.githubUrl && (
                <a href={study.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 px-6 py-4 border border-border rounded-xl hover:bg-muted/50 transition-colors group">
                  <span className="font-semibold text-sm tracking-tight">Source Code</span>
                  <HugeiconsIcon icon={GithubIcon} size={24} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Project Metadata & Stack Grid - Replaces Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 border-y border-border/50 py-12">
          {/* Left: Meta Fields */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-8">
            <MetaField label="Role" value={study.role} />
            <MetaField label="Timeline" value={study.year} />
            <MetaField label="Type" value={study.type} />
            <MetaField label="Status" value={study.status} />
          </div>

          {/* Right: Skills Mini-Grid Grouped by Category */}
          <div className="lg:col-span-7 space-y-6">
            <h4 className="meta-label">Technical Stack</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {Object.entries(study.techStack).map(([category, techs]) => (
                techs && (techs as string[]).length > 0 && (
                  <div key={category} className="space-y-3">
                    <h5 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">
                      {category}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {(techs as string[]).map((tech, i) => {
                        const techKey = tech.toLowerCase().replace(/[^a-z0-9]/g, '');
                        const techInfo = technologiesCollection[techKey as keyof typeof technologiesCollection];
                        return (
                          <div 
                            key={i} 
                            className="flex items-center gap-2 px-2 py-1 rounded-md bg-muted/30 border border-border/50 hover:border-border transition-colors"
                          >
                            {techInfo?.icon && (
                              <div className="size-3 relative shrink-0 opacity-60">
                                <Image src={techInfo.icon} alt={tech} fill className="object-contain" />
                              </div>
                            )}
                            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-tight">
                              {tech}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {study.private && (
          <div className="p-6 bg-destructive/5 border border-destructive/20 rounded-2xl flex gap-4 items-start mb-12">
            <HugeiconsIcon icon={LockPasswordIcon} size={16} className="text-destructive shrink-0 mt-1" />
            <p className="text-xs text-destructive/80 leading-relaxed italic">
              {study.privateNote}
            </p>
          </div>
        )}
        {/* The Stage (Immersion) - Home Card Animation Style */}
        <div className="relative mb-32 group">
          <div className="absolute inset-0 bg-muted/50 blur-3xl -z-10 opacity-10 group-hover:opacity-20 transition-opacity" />
          <div
            className="rounded-2xl p-1 px-3 border relative overflow-hidden max-h-[300px] md:max-h-[500px] bg-card"
            style={{ backgroundColor: study.themeColor, borderColor: study.themeColor }}
          >
            <motion.div
              initial={{ y: "60%", scale: 0.95, rotate: -2 }}
              animate={{ y: "8%" }}
              whileHover={{ scale: 1 }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
              }}
              className="relative rounded-xl overflow-hidden aspect-video shadow-2xl"
            >
              {project?.image && (
                <Image
                  src={project.image}
                  alt={study.title}
                  fill
                  className="object-cover select-none brightness-95 group-hover:brightness-100 transition-all duration-500"
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-12 gap-8 lg:gap-16 mb-32 relative">
          {/* Left Aside (Table of Contents) */}
          <aside className="col-span-12 lg:col-span-2 hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents
                items={navItems}
                activeId={activeSection}
                onSelect={scrollToSection}
              />
            </div>
          </aside>

          {/* Main Story Narrative */}
          <div className="col-span-12 lg:col-span-10 space-y-32">
            
            
            <Section number="01" label="Vision" title="Project Vision">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {study.overview}
              </p>
            </Section>

            {/* Gallery — only shown if case study has images */}
            {study.images.length > 0 && (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="meta-label">GALLERY</span>
                  <div className="h-px flex-1 bg-foreground/3" />
                </div>
                <Gallery images={study.images} />
              </div>
            )}


            <Section number="02" label="Problem" title="The Friction">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{study.problem}</p>
            </Section>

            <Section number="03" label="Solution" title="The Strategy">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{study.solution}</p>
            </Section>

            <Section number="04" label="Features" title="Core Features">
              <div className="grid gap-4">
                {study.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 group/item">
                    <div className="size-8 min-w-8 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center text-xs opacity-40 group-hover/item:border-brand-color group-hover/item:opacity-100 transition-all mt-1">
                      {i + 1}
                    </div>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Hurdles & Breakthroughs - Diagnostic Feed Layout */}
            {study.challenges.length > 0 && (
              <Section number="05" label="Hurdles" title="Hurdles & Breakthroughs">
                <div className="space-y-20">
                  {study.challenges.map((c, i) => (
                    <div key={i} className="group relative">
                      {/* Content Stack */}
                      <div className="space-y-10 mt-8 pb-6 border-b border-border/50">
                        {/* Narrative */}
                        <div className="space-y-6 max-w-3xl">
                          <div className="space-y-2">
                            <h4 className="text-xl md:text-2xl font-bold tracking-tight text-foreground/90 leading-tight inline-flex items-center">
                              <span className="text-2xl md:text-3xl text-destructive">#{i + 1}</span> &emsp; {c.challenge}
                            </h4>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="size-1 rounded-full" style={{ backgroundColor: brandColor }} />
                              <span className="text-xs uppercase tracking-widest" style={{ color: brandColor }}>Resolution_Strategy</span>
                            </div>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
                              {c.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            <Section number={study.challenges.length > 0 ? "06" : "05"} label="Impact" title="Final Outcome">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{study.outcome}</p>
            </Section>

            <Section number={study.challenges.length > 0 ? "07" : "06"} label="Reflection" title="Key Learnings">
              <div className="p-8 border border-border/50 rounded-3xl bg-destructive/3 border-l-destructive/50 text-base md:text-lg text-muted-foreground leading-relaxed italic">
                "{study.learnings}"
              </div>
            </Section>
          </div>
        </div>

        <div className="mt-32 border-t border-border/50 pt-32">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}

function MetaField({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <h4 className="text-xs uppercase tracking-widest text-muted-foreground/60">{label}</h4>
      <p className="text-sm font-medium text-foreground/90 tracking-tight">{value}</p>
    </div>
  );
}

function Section({ number, label, title, children }: { number: string, label: string, title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-6 scroll-mt-32" data-section-index={number} id={`section-${number}`}>
      <div className="flex items-center gap-4">
        <span className="meta-label">{number} // {label}</span>
        <div className="h-px flex-1 bg-foreground/3" />
      </div>
      <h3 className="dot-suffix w-fit">{title}</h3>
      <div className="pt-2 max-w-[80ch]">
        {children}
      </div>
    </div>
  );
}
