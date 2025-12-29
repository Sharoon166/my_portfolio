import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Code,
  LayoutGrid,
  ArrowUpRight,
} from 'lucide-react';
import { projects, minorProjects, technologiesCollection } from '@/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type ProjectType = typeof projects[0] & {
  longDescription?: string;
  features?: string[];
  challenges?: string;
};

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const allProjects = [...projects, ...minorProjects];
  const project = allProjects.find(
    (p) =>
      (p?.slug || p.title.toLowerCase().replace(/\s+/g, '-')) === slug
  ) as ProjectType;
  console.log(project)

  if (!project) notFound();

  const projectTechnologies = project.technologies
    ?.map((tech) =>
      Object.values(technologiesCollection).find(
        (t) => t.name.toLowerCase() === tech.toLowerCase()
      )
    )
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8 -ml-4 group" size="sm">
            <Link
              href="/projects"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Button>

          <div className="space-y-16">
            {/* Project Header */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {project.previewUrl && (
                  <Button
                    asChild
                    className="gap-2 transition-all hover:shadow-lg hover:scale-[1.02]"
                    style={
                      project.themeColor
                        ? { backgroundColor: project.themeColor }
                        : {}
                    }
                  >
                    <a
                      href={project.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="gap-2 transition-all hover:scale-[1.02]"
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Project Image */}
            {project.image && (
              <div className="relative aspect-video rounded-2xl overflow-hidden border bg-muted/50 shadow-xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-sm text-muted-foreground">
                    Click to view full size
                  </p>
                </div>
              </div>
            )}

            {/* Project Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                {/* About Section */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    About the Project
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {project.longDescription || project.description}
                    </p>
                  </div>
                </section>

                {/* Features Section */}
                {project.features && project.features.length > 0 && (
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                      <LayoutGrid className="w-5 h-5" />
                      Key Features
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Challenges Section */}
                {project.challenges && (
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                      Challenges & Learnings
                    </h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-muted-foreground">{project.challenges}</p>
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Technologies Used */}
                {projectTechnologies && projectTechnologies.length > 0 && (
                  <section className="space-y-4">
                    <h3 className="text-lg font-semibold">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {projectTechnologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-3 py-1.5 text-sm font-medium flex items-center gap-2 hover:bg-muted/50 transition-colors"
                        >
                          {/* {tech?.icon && <tech.icon className="w-4 h-4" />} */}
                          {tech?.name}
                        </Badge>
                      ))}
                    </div>
                  </section>
                )}

                {/* Project Links */}
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold">Project Links</h3>
                  <div className="space-y-2">
                    {project.previewUrl && (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-between group"
                      >
                        <a
                          href={project.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-between group"
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on GitHub
                          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </a>
                      </Button>
                    )}
                  </div>
                </section>
              </div>
            </div>

            {/* More Projects */}
            <section className="pt-12 border-t border-border">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold">More Projects</h2>
                <Button asChild variant="ghost" className="gap-2">
                  <Link href="/projects">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProjects
                  .filter((p) => p.title !== project.title)
                  .slice(0, 3)
                  .map((p) => (
                    <div
                      key={p.title}
                      className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
                    >
                      <Link
                        href={`/projects/${
                          p.slug || p.title.toLowerCase().replace(/\s+/g, '-')
                        }`}
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <Image
                            src={p.image || '/projects/placeholder.png'}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <div>
                              <h3 className="font-medium text-foreground">
                                {p.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {p.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
