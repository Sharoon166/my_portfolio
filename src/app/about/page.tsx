import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { experience } from "@/constants";
import { ExperienceRecord } from "@/components/about/experience-record";
import { AboutHero } from "@/components/about/about-hero";
import { OriginStory } from "@/components/about/origin-story";
import { SkillsSpecimen } from "@/components/about/skills-specimen";
import { CtaFill } from "@/components/about/cta-fill";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack developer and CS student at NUML. Building production-grade web apps with React, Next.js, and Node.js.",
  openGraph: {
    title: "About | Sharoon Shaleem",
    description:
      "Full-stack developer and CS student at NUML. Building production-grade web apps with React, Next.js, and Node.js.",
    url: `${siteConfig.url}/about`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  alternates: { canonical: `${siteConfig.url}/about` },
};

/* Paper grain — sells the "printed dossier" metaphor at a whisper of opacity */
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function About() {
  return (
    <section className="relative mx-auto space-y-28">
      {/* Paper grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: "180px 180px" }}
      />

      <AboutHero />
      <OriginStory />
      <SkillsSpecimen />

      <div className="space-y-8">
        <h3 className="dot-suffix">Experience</h3>
        <ExperienceRecord items={experience} />
      </div>

      <CtaFill />
    </section>
  );
}
