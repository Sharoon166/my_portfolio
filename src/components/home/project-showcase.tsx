import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { ProjectCard } from "./project-card";
import { projects } from "@/constants";

export function ProjectShowcase() {
  return (
    <section id="projects">
      <h2 className="mb-16 dot-suffix">Projects</h2>
      <div className="space-y-8 mb-12 md:space-y-28">
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
          <LuArrowRight className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-destructive" />
        </Link>
      </div>
    </section>
  );
}
