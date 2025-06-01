"use client";
import { cn } from "@/lib/utils";
import { LuArrowRight, LuArrowUpRight, LuGithub } from "react-icons/lu";
import Tooltip from "../tooltip";
import { technologiesCollection } from "@/constants";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "../ui/button";

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  previewUrl: string;
  technologies: (keyof typeof technologiesCollection)[];
  reverse?: boolean;
  themeColor?: string;
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
              className="w-10 h-1 bg-red-500 inline-block align-middle mr-3 rounded"
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
            className="max-w-lg text-muted-foreground text-sm lg:text-base mt-1 lg:mt-4 text-pretty"
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
                        className="flex items-center gap-0.5 bg-zinc-800 backdrop-blur rounded-xl overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <span className="inline-block size-9 lg:size-12 p-2 bg-zinc-800/80 max-lg:hidden flex items-center justify-center">
                          <Image src={icon} alt={name} />
                        </span>
                        <span className="text-xs px-2 py-1 text-[var(--themeColor)] lg:hidden">
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
          <motion.a
            href={githubUrl}
            target="_blank"
            className="text-2xl bg-zinc-800/80 backdrop-blur p-3 rounded-full"
            whileHover={{ scale: 1.1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <LuGithub />
          </motion.a>
          <motion.a
            href={previewUrl}
            target="_blank"
            className="inline-flex items-center gap-2 relative overflow-hidden text-xl p-3 bg-destructive/70  rounded-full -ml-4 group"
            whileHover={{ scale: 1.1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative size-6 overflow-hidden" aria-hidden="true">
              <div className="absolute inset-0 flex items-center justify-center group-hover:translate-x-full group-hover:-translate-y-full transition-transform duration-300">
                <LuArrowUpRight className="text-primary-foreground" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300">
                <LuArrowUpRight className="text-primary-foreground" />
              </div>
            </div>
          </motion.a>{" "}
        </div>

        <div className="lg:hidden flex items-center *:grow lg:justify-start flex-wrap gap-3 mt-6">
          <Button
            asChild
            variant="secondary"
            className="inline-flex items-center gap-2 rounded-lg lg:py-6 hover:bg-zinc-800/90 transition-colors duration-300"
          >
            <motion.a
              href={githubUrl}
              target="_blank"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LuGithub className="text-[var(--themeColor)] text-lg" />
              <span>View Code</span>
            </motion.a>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="inline-flex items-center gap-2 rounded-lg lg:py-6 group hover:bg-zinc-800/90 transition-colors duration-300"
          >
            <motion.a
              href={previewUrl}
              target="_blank"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LuArrowRight className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[var(--themeColor)] text-lg" />
              <span>Live Preview</span>
            </motion.a>
          </Button>
        </div>
      </motion.div>
      <div className="relative lg:w-1/2 group">
        <a
          target="_blank"
          href={previewUrl}
          className="rounded-xl p-1 px-3 border relative block bg-[var(--themeColor)] overflow-hidden max-h-[250px]"
          data-mouse-text="View Website"
        >
          <motion.div
            initial={{ y: "80%", scale: 0.95, rotate: 2 }}
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
              data-mouse-text="View Website"
              width={800}
              height={450}
            />
          </motion.div>
        </a>
      </div>
    </motion.div>
  );
}
