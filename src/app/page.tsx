import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { HeroSection } from "@/components/home/hero";
import { ProjectShowcase } from "@/components/home/project-showcase";
import { AboutPreview } from "@/components/home/about";
import { ContactSection } from "@/components/home/contact";
import CurvedLoop from "@/components/CurvedLoop";

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
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="-mt-18">
        <CurvedLoop marqueeText="REACT ✦ NEXT.JS ✦ NODE.JS ✦ MONGODB ✦ TAILWIND ✦ TYPESCRIPT ✦ POSTGRESQL ✦ EXPRESS ✦" speed={2} curveAmount={100} className="max-sm:hidden text-4xl text-primary-foreground bg-black!" />
      </div>
      <div className="space-y-22">
        <ProjectShowcase />
        <AboutPreview />
        <ContactSection />
      </div>
    </div>
  );
}
