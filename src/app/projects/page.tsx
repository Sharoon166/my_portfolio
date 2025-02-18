import { LuCodeXml } from "react-icons/lu";
import { ProjectCard } from "@/components/home/project-card";
import { MinorProjectCard } from "@/components/home/minor-project-card";
import { minorProjects, projects } from "@/constants";

export default function Projects() {
  return (
    <>
      <div className="relative">
        <div className="space-y-10 lg:space-y-32 relative z-10">
          {projects.map((project, idx) => (
            <div key={project.title}>
              <ProjectCard {...project} reverse={idx % 2 === 0} />
            </div>
          ))}
        </div>

        {minorProjects.length > 0 && (
          <div className="mt-32 relative z-10">
            <div className="inline-flex items-center gap-3 mb-8 text-primary-foreground">
              <LuCodeXml className="text-2xl" aria-hidden="true" />

              <h2 className="text-xl font-semibold text-primary-foreground">Minor Projects</h2>
            </div>

            <div className="divide-y-2 divide-zinc-300/30" role="list">
              {minorProjects.map((project, index) => (
                <div key={index} className="group">
                  <MinorProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
