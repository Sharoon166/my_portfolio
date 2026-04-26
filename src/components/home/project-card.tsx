"use client";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, ArrowUpRight01Icon, GithubIcon, Scroll01Icon, } from "@hugeicons/core-free-icons";
import Tooltip from "../tooltip";
import { technologiesCollection } from "@/constants";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CometCard } from "../ui/comet-card";

export type ProjectCategory = "Full Stack" | "Frontend" | "Dashboard" | "Web Design";

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
  caseStudyId,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        `mx-auto flex flex-col-reverse lg:flex-row lg:items-center justify-between gap-x-20 gap-y-2 sm:gap-y-6 max-lg:max-w-xl lg:group max-sm:p-2 p-4 max-lg:border-2 border-zinc-800/80 rounded-xl max-lg:bg-muted/10 max-lg:backdrop-blur-3xl`,
        {
          "lg:flex-row-reverse": reverse,
        }
      )}
      style={{ "--themeColor": themeColor || "coral" } as React.CSSProperties}
    >
      <motion.div
        className="lg:w-1/2 space-y-4 sm:space-y-6 max-sm:px-2"
        initial={{ opacity: 0, x: reverse ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full ">
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
            className="max-w-lg text-muted-foreground text-sm lg:text-base mt-1 lg:mt-4 text-pretty max-sm:line-clamp-3"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            {description}
          </motion.p>
          <div className="sm:space-y-4 mt-2 lg:mt-8">
            <h4 className="text-sm font-semibold text-gray-100 uppercase max-lg:hidden">
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
                        className="flex items-center gap-0.5 bg-zinc-800 backdrop-blur-sm rounded-xl overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <span className="size-9 lg:size-12 p-2 bg-zinc-800/80 max-lg:hidden flex items-center justify-center">
                          <Image src={icon} alt={name} />
                        </span>
                        <span className="text-xs px-2 py-1 text-(--themeColor) lg:hidden">
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
          {caseStudyId && (
            <Link href={`/case-studies/${caseStudyId}`}>
              <motion.div
                className="text-2xl bg-zinc-800/80 backdrop-blur-sm p-3 rounded-full"
                whileHover={{ scale: 1.1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <HugeiconsIcon icon={Scroll01Icon} size={24} />
              </motion.div>
            </Link>
          )}
          <motion.a
            href={githubUrl}
            target="_blank"
            className={cn("text-2xl bg-zinc-800/80 backdrop-blur-sm p-3 rounded-full", !githubUrl && "pointer-events-none cursor-not-allowed opacity-80", caseStudyId && "-ml-4")}
            whileHover={{ scale: 1.1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <HugeiconsIcon icon={GithubIcon} size={24} />
          </motion.a>
          <motion.a
            href={previewUrl}
            target="_blank"
            className={cn("inline-flex items-center gap-2 relative overflow-hidden text-xl p-3 bg-foreground  rounded-full -ml-4 group", !previewUrl && "pointer-events-none cursor-not-allowed opacity-80")}
            whileHover={{ scale: 1.1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative size-6 overflow-hidden" aria-hidden="true">
              <div className="absolute inset-0 flex items-center justify-center group-hover:translate-x-full group-hover:-translate-y-full transition-transform duration-300">
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={24} className="text-black" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300">
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={24} className="text-black" />
              </div>
            </div>
          </motion.a>{" "}
        </div>

        <div className="lg:hidden flex items-center *:grow lg:justify-start flex-wrap gap-3 mt-6">
          {caseStudyId && (
            <Button
              asChild
              size="sm"
              variant="secondary"
            >
              <Link href={`/case-studies/${caseStudyId}`}>
                <motion.span whileTap={{ scale: 0.98 }} className="flex items-center gap-2">
                  <span>Case Study</span>
                  <HugeiconsIcon icon={Scroll01Icon} size={18} className="text-(--themeColor)" />
                </motion.span>
              </Link>
            </Button>
          )}
          <Button
            asChild
            variant="secondary"
            size="sm"
            disabled={!githubUrl}
            className={cn(!githubUrl && "pointer-events-none cursor-not-allowed opacity-80")}
          >
            <motion.a
              href={githubUrl}
              target="_blank"
              whileTap={{ scale: 0.98 }}
            >
              <span>View Code</span>
              <HugeiconsIcon icon={GithubIcon} size={18} className="text-(--themeColor)" />
            </motion.a>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="sm"
            disabled={!previewUrl}
            className={cn("group",!previewUrl && "pointer-events-none cursor-not-allowed opacity-80")}
          >
            <motion.a
              href={previewUrl}
              target="_blank"
              // whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Live Preview</span>
              <HugeiconsIcon icon={ArrowRight02Icon} size={18} className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-(--themeColor)" />
            </motion.a>
          </Button>
        </div>
      </motion.div>
      <div className="relative lg:w-1/2 xl:w-2/3 group overflow-hidden">
        <a
          target="_blank"
          href={previewUrl}
          className="rounded-xl p-1 px-3 border bg-(--themeColor)  relative block overflow-hidden max-h-[280px]"
          data-mouse-text={previewUrl ? "View Website · View Website · " : "Private · Private · Private"}
        >
          <CometCard transparent className="rounded-[inherit]">
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
                data-mouse-text={previewUrl ? "View Website · View Website · " : "Private · Private · Private"}
                width={800}
                height={450}
              />
            </motion.div>
          </CometCard>
        </a>
      </div>
    </motion.div>
  );
}
