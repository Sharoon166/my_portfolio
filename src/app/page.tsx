// "use client";
import { HeroSection } from "@/components/home/hero";
import { ProjectShowcase } from "@/components/home/project-showcase";
import { AboutPreview } from "@/components/home/about";
import { ContactSection } from "@/components/home/contact";
import CurvedLoop from "@/components/CurvedLoop";

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
