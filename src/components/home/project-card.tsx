"use client";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  GithubIcon,
} from "@hugeicons/core-free-icons";
import Tooltip from "../tooltip";
import { technologiesCollection } from "@/constants";
import Image from "next/image";
import { motion } from "motion/react";
import { CometCard } from "../ui/comet-card";
import { withEffectGate } from "../ui/effect-gate";

/* 3D tilt/glare only on md+; below that the gate renders the image bare. */
const GatedCometCard = withEffectGate(CometCard, {
  enableQuery: "(min-width: 768px)",
});

export type ProjectCategory =
  "Full Stack" | "Frontend" | "Dashboard" | "Web Design";

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  previewUrl: string;
  technologies: (keyof typeof technologiesCollection)[];
  reverse?: boolean;
  themeColor?: string;
  categories?: ProjectCategory[];
  caseStudyId?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  githubUrl,
  previewUrl,
  technologies,
  reverse,
  themeColor,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        `mx-auto flex flex-col-reverse lg:flex-row lg:items-center justify-between gap-x-20 gap-y-2 sm:gap-y-6 max-lg:max-w-2xl lg:group`,
        {
          "lg:flex-row-reverse": reverse,
        },
      )}
      style={{ "--themeColor": themeColor || "coral" } as React.CSSProperties}
    >
      <motion.div
        className="lg:w-1/2 space-y-4 sm:space-y-6 py-2 px-4"
        initial={{ opacity: 0, x: reverse ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-row-reverse lg:flex-row gap-2 max-lg:justify-end  items-center leading-loose text-lg lg:text-2xl"
          >
            <motion.span
              style={{
                backgroundColor: themeColor || "coral",
              }}
              className="w-10 h-1 bg-red-500 inline-block align-middle mr-3 rounded-sm"
              initial={{ width: 0, y: 8 }}
              whileInView={{ width: 40, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {title}
            </motion.span>
          </motion.h3>
          <motion.p
            className="max-w-lg text-muted-foreground text-sm lg:text-base mt-1 lg:mt-4 text-pretty max-md:line-clamp-2"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            {description}
          </motion.p>
          <div className="sm:space-y-4 mt-2 lg:mt-8">
            <h4 className="text-sm font-semibold text-foreground uppercase max-lg:hidden">
              <span className="mr-1.5 text-xl font-normal align-middle text-destructive">
                *
              </span>
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {technologies.map((tech, index) => {
                if (!technologiesCollection[tech]) return;
                const { name, icon } = technologiesCollection[tech];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 * index }}
                  >
                    <Tooltip content={name} className="max-lg:hidden">
                      <motion.div
                        className="flex items-center gap-0.5 bg-muted backdrop-blur-sm rounded-xl overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <span className="size-9 lg:size-12 p-2 bg-primary max-lg:hidden flex items-center justify-center">
                          <Image src={icon} alt={name} />
                        </span>
                        <span className="text-xs! px-2 py-1 text-primary lg:hidden">
                          {name}
                        </span>
                      </motion.div>
                    </Tooltip>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center">
          {githubUrl ? (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} source code on GitHub`}
              className="text-2xl bg-muted/80 backdrop-blur-sm p-3 rounded-full"
              whileHover={{ scale: 1.1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <HugeiconsIcon icon={GithubIcon} size={24} />
            </motion.a>
          ) : (
            <span
              aria-hidden="true"
              className="text-2xl bg-muted/80 backdrop-blur-sm p-3 rounded-full cursor-not-allowed opacity-80"
            >
              <HugeiconsIcon icon={GithubIcon} size={24} />
            </span>
          )}
          {previewUrl ? (
            <motion.a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit the ${title} live site`}
              className={cn(
                "inline-flex items-center gap-2 relative overflow-hidden text-xl p-3 bg-foreground  rounded-full -ml-4 group",
              )}
              whileHover={{ scale: 1.1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div
                className="relative size-6 overflow-hidden"
                aria-hidden="true"
              >
                <div className="absolute inset-0 flex items-center justify-center group-hover:translate-x-full group-hover:-translate-y-full transition-transform duration-300">
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={24}
                    className="text-primary-foreground"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300">
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={24}
                    className="text-primary-foreground"
                  />
                </div>
              </div>
            </motion.a>
          ) : (
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex items-center gap-2 relative overflow-hidden text-xl p-3 bg-foreground  rounded-full -ml-4 group cursor-not-allowed opacity-80",
              )}
            >
              <div className="relative size-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={24}
                    className="text-primary-foreground"
                  />
                </div>
              </div>
            </span>
          )}
        </div>

        <div className="lg:hidden flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 justify-between">
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} source code on GitHub`}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 text-destructive text-lg hover:underline underline-offset-4 py-2"
            >
              <span>View Code</span>
              <HugeiconsIcon
                icon={GithubIcon}
                size={20}
                className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300"
              />
            </motion.a>
          )}
          {previewUrl && (
            <motion.a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit the ${title} live site`}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 text-destructive text-lg hover:underline underline-offset-4 py-2"
            >
              <span>Live Preview</span>
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={20}
                className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300"
              />
            </motion.a>
          )}
        </div>
      </motion.div>
      <div className="relative lg:w-1/2 xl:w-2/3 group overflow-hidden">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={previewUrl}
          className="rounded-xl p-1 px-3 border bg-(--themeColor)  relative block overflow-hidden aspect-2/1"
          data-mouse-text={
            previewUrl
              ? "View Website · View Website · "
              : "Private · Private · Private"
          }
        >
          <GatedCometCard transparent className="rounded-[inherit]">
            <motion.div
              initial={{ y: "60%", scale: 0.95, rotate: reverse ? 2 : -2 }}
              whileInView={{ y: "8%" }}
              whileHover={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
              }}
              className="relative rounded-[inherit]"
            >
              <Image
                src={image}
                alt={`${title} preview`}
                className={`mx-auto brightness-95 group-hover:brightness-100 shadow-lg rounded-[inherit] max-h-[450px] w-full object-cover`}
                data-mouse-text={
                  previewUrl
                    ? "View Website · View Website · "
                    : "Private · Private · Private"
                }
                width={800}
                height={450}
              />
            </motion.div>
          </GatedCometCard>
        </a>
      </div>
    </motion.div>
  );
}
