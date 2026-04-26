import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, GithubIcon } from "@hugeicons/core-free-icons";
import { technologiesCollection } from "@/constants";
import Tooltip from "../tooltip";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface MinorProjectCardProps {
  title: string;
  description: string;
  liveUrl: string;
  technologies?: (keyof typeof technologiesCollection)[];
}

export const MinorProjectCard = ({
  title,
  description,
  liveUrl,
  technologies,
}: MinorProjectCardProps) => (
  <div
    className="group py-6 border-b border-white/5"
    role="listitem"
  >
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-lg lg:text-xl font-bold text-white/90 group-hover:text-destructive transition-colors duration-300">
            {title}
          </h3>
          {technologies && technologies.length > 0 && (
            <div className="flex gap-2 items-center">
              {technologies.map((tech) => {
                const techData = technologiesCollection[tech];
                if (!techData) return null;
                return (
                  <Tooltip key={tech} content={techData.name}>
                    <div className="size-5 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                      <Image src={techData.icon} alt={techData.name} width={20} height={20} className="grayscale group-hover:grayscale-0 transition-all duration-300" />
                    </div>
                  </Tooltip>
                );
              })}
            </div>
          )}
        </div>
        <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>

      <div className="flex items-center">
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-destructive group/visit"
        >
          <span className="group-hover/visit:mr-1 transition-all duration-300">Visit</span>
          <div className="relative size-4 overflow-hidden">
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={14}
              className="absolute transition-transform duration-300 group-hover/visit:translate-x-full group-hover/visit:-translate-y-full"
            />
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={14}
              className="absolute -translate-x-full translate-y-full transition-transform duration-300 group-hover/visit:translate-x-0 group-hover/visit:translate-y-0"
            />
          </div>
        </a>
      </div>
    </div>
  </div>
);