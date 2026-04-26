"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { CodeIcon } from "@hugeicons/core-free-icons";
import { ProjectCard, ProjectCategory } from "@/components/home/project-card";
import { MinorProjectCard } from "@/components/home/minor-project-card";
import { minorProjects, projects } from "@/constants";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const categories: (ProjectCategory | "All")[] = ["All", "Full Stack", "Frontend", "Dashboard", "Web Design"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "All">("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.categories?.includes(selectedCategory));

  return (
    <>
      <div className="min-h-screen relative pb-32 py-24 sm:space-y-14">

        {/* Header */}
        <header className="pt-28 mb-12 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <h1 className="font-black tracking-tighter leading-[1.1] max-w-2xl">
              Built, shipped, <span className="text-destructive">iterated</span> & deployed
            </h1>

            <p className="ml-auto text-muted-foreground leading-snug max-w-2xl font-mono">
              Real products for real clients. From restaurant platforms to analytics dashboards. Every project here solved a problem that mattered.
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
            {categories.map((cat) => {
              const count = cat === "All"
                ? projects.length
                : projects.filter(p => p.categories?.includes(cat as ProjectCategory)).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-1.5 lg:px-6 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer",
                    selectedCategory === cat
                      ? "bg-primary border-primary text-background"
                      : "bg-white/5 border-white/10 hover:border-destructive/50 text-muted-foreground"
                  )}
                >
                  {cat} <span className="opacity-40 text-[9px]">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-10 lg:space-y-32 relative z-10"
          >
            {filteredProjects.map((project, idx) => (
              <div key={project.title}>
                <ProjectCard {...project} reverse={idx % 2 === 0} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {minorProjects.length > 0 && (
          <div className="mt-32 relative z-10">
            <div className="inline-flex items-center gap-3 mb-12">
              <HugeiconsIcon icon={CodeIcon} size={24} className="text-destructive" />
              <h2 className="dot-suffix w-fit">Minor Projects</h2>
            </div>
            <div className="space-y-4" role="list">
              {minorProjects.map((project, index) => (
                <MinorProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
