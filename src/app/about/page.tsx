import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  GithubIcon,
  InstagramIcon,
  Linkedin01Icon
} from "@hugeicons/core-free-icons";
import {
  profile,
  technologiesCollection,
  experience,
  skillCategories,
} from "@/constants";
import { TimelineReimagined } from "@/components/timeline-reimagined";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack developer and CS student at NUML. Building production-grade web apps with React, Next.js, and Node.js.",
  openGraph: {
    title: "About — Sharoon Shaleem",
    description:
      "Full-stack developer and CS student at NUML. Building production-grade web apps with React, Next.js, and Node.js.",
    url: `${siteConfig.url}/about`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  alternates: { canonical: `${siteConfig.url}/about` },
}

export default function About() {

  return (
    <section className="mx-auto space-y-32">
      {/* Header */}
      <header className="pt-20 md:pt-32 mb-16 lg:mb-24 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between gap-12 border-b border-white/5 pb-16 relative">
          <div className="max-w-5xl space-y-12">
            <div className="w-fit meta-label px-3 py-1 border border-white/10 rounded-full">
              Available for Hire
            </div>

            <h1 className="max-w-4xl">
              The developer behind the <span className="text-destructive">pixels</span>
            </h1>

            <p className="nd:ml-auto max-w-lg text-muted-foreground text-pretty">
              I obsess over clean code and sharp interfaces. Here&apos;s the story of how I got here, and where I&apos;m headed next.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:self-end">
            <Button asChild size="lg" variant="secondary">
              <a
                href={profile.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Résumé</span>
                <HugeiconsIcon icon={ArrowRight02Icon} size={22} className="-rotate-45 transition-transform" />
              </a>
            </Button>

            <div className="flex items-center gap-3 px-2">
              <a href={profile.github} target="_blank" className="p-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors opacity-50 hover:opacity-100">
                <HugeiconsIcon icon={GithubIcon} size={20} />
              </a>
              <a href={profile.linkenIn} target="_blank" className="p-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors opacity-50 hover:opacity-100">
                <HugeiconsIcon icon={Linkedin01Icon} size={20} />
              </a>
              <a href={profile.instagram} target="_blank" className="p-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors opacity-50 hover:opacity-100">
                <HugeiconsIcon icon={InstagramIcon} size={20} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Narrative Section */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-24 items-start">
        <aside className="w-[75%] lg:w-[25%] order-2 lg:order-1">
          <div className="overflow-hidden shadow-2xl bg-white p-3 pb-12 space-y-2 sm:-rotate-2">
            <Image
              src="/me.webp"
              alt="Sharoon Shaleem"
              height={400}
              width={400}
              className="w-full h-auto grayscale-0 transition-all duration-700"
            />
          </div>
        </aside>

        <div className="flex-1 order-1 lg:order-2 space-y-12">
          <div className="space-y-8">
            <h2 className="dot-suffix w-fit">About me</h2>
            <div className="text-muted-foreground space-y-6">
              <p>
                I&apos;m a full-stack developer who&apos;s shipped production apps for real clients, from restaurant platforms to business dashboards. I work in React, Next.js, Node.js and MongoDB, and I care about code that actually holds up in production.
              </p>
              <p>
                I&apos;m always up for tech discussions, collaborations, or just geeking out about anime or space. Feel free to reach out!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section - Categorized & Minimalist */}
      <div className="space-y-20">
        <div className="space-y-4">
          <h3 className="dot-suffix uppercase tracking-[0.2em] text-xs font-bold">Skills & Tools</h3>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
            My technical <span className="text-destructive">stack</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {skillCategories.map((category) => (
            <div key={category.title} className="space-y-8">
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
                  {category.title}
                </h4>
                <div className="h-0.5 w-8 bg-destructive" />
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const data = (technologiesCollection as any)[skill];
                  if (!data) return null;
                  return (
                    <div
                      key={skill}
                      className="group flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-colors duration-300"
                    >
                      <div className="relative size-4 shrink-0">
                        <Image
                          src={data.icon}
                          alt={data.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-white/60 group-hover:text-white transition-colors duration-300">
                        {data.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="dot-suffix">Experience</h3>
        <TimelineReimagined items={experience} />
      </div>
    </section>
  );
}