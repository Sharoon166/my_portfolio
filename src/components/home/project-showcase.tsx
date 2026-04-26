import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { ProjectCard } from "./project-card";
import { projects } from "@/constants";
import Link from "next/link";

export function ProjectShowcase() {
  return (
    <section id="projects">
      <h2 className="mb-16 dot-suffix">Projects</h2>
      <div className="space-y-8 mb-12 lg:space-y-28">
        {
          projects.slice(0,3).map((project, idx) => (
            <ProjectCard key={project.title} {...project} reverse={idx%2===0} />
          ))
        }
      </div>
      <div className="text-center mt-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 group relative overflow-hidden text-2xl text-destructive hover:underline underline-offset-4 p-3"
        >
          View more{" "}
          <HugeiconsIcon icon={ArrowRight02Icon} size={28} className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-destructive" />
        </Link>
      </div>
    </section>
  );
}
