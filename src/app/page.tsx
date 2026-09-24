import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { HeroSection } from "@/components/home/hero";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ProjectShowcase } from "@/components/home/project-showcase";
import { AboutPreview } from "@/components/home/about";
import { ContactSection } from "@/components/home/contact";
import { CaseStudiesGrid } from "@/components/home/case-studies-grid";
import CurvedLoop from "@/components/CurvedLoop";
import { ExperienceRecord } from "@/components/about/experience-record";
import { experience } from "@/constants";


export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  alternates: { canonical: siteConfig.url },
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="-mt-[10%]">
        <CurvedLoop
          marqueeText="REACT ✦ NEXT.JS ✦ NODE.JS ✦ MONGODB ✦ TAILWIND ✦ TYPESCRIPT ✦ POSTGRESQL ✦ EXPRESS ✦ Sveltekit"
          speed={2}
          curveAmount={100}
          className="max-sm:hidden text-4xl"
        />
      </div>
      <div className="space-y-32 lg:space-y-44">
        <ProjectShowcase />
        <CaseStudiesGrid />
        <div className="space-y-8">
          <h2 className="dot-suffix">My Journey</h2>
          <ExperienceRecord items={experience} />
        </div>
        <TestimonialsSection />
        <AboutPreview />
        <ContactSection />
      </div>
    </div>
  );
}
