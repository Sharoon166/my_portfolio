"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { skillCategories, technologiesCollection } from "@/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * The categorized chip grid from the original commit — kept as-is,
 * with two light touches: a red hover accent and a gentle column reveal.
 */
export function SkillsSpecimen() {
  return (
    <section aria-labelledby="skills-heading" className="space-y-20">
      <div className="space-y-4">
        <h3 id="skills-heading" className="dot-suffix uppercase tracking-[0.2em] text-xs font-bold">
          Skills &amp; Tools
        </h3>
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
          My technical <span className="text-destructive">stack</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {skillCategories.map((category, ci) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE, delay: ci * 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                {category.title}
              </h4>
              <div className="h-0.5 w-8 bg-destructive" />
            </div>

            <div className="flex md:justify-center flex-wrap gap-2">
              {category.skills.map((skill) => {
                const data = (technologiesCollection as any)[skill];
                if (!data) return null;
                return (
                  <div
                    key={skill}
                    className="group flex items-center gap-2.5 px-3 py-2 rounded-xl bg-foreground/30 border border-border/50"
                  >
                    <div className="relative size-4 shrink-0">
                      <Image src={data.icon} alt={data.name} fill className="object-contain" />
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      {data.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
