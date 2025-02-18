"use client";
import { HeroSection } from "@/components/home/hero";
import { ProjectShowcase } from "@/components/home/project-showcase";
import { AboutPreview } from "@/components/home/about";
import { ContactSection } from "@/components/home/contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectShowcase />
      <AboutPreview />
      <ContactSection />
    </>
  );
}
