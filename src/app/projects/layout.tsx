import type { Metadata } from "next"
import { siteConfig } from "@/data/site-config"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated collection of projects — from production SaaS platforms to design experiments. Built with React, Next.js, and Node.js.",
  openGraph: {
    title: "Projects — Sharoon Shaleem",
    description:
      "A curated collection of projects — from production SaaS platforms to design experiments.",
    url: `${siteConfig.url}/projects`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  alternates: { canonical: `${siteConfig.url}/projects` },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
