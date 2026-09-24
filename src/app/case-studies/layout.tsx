import type { Metadata } from "next"
import { siteConfig } from "@/data/site-config"
import { breadcrumbSchema } from "@/data/json-ld"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "In-depth case studies of projects I've built — the problem, the approach, key decisions, and lessons learned.",
  openGraph: {
    title: "Case Studies | Sharoon Shaleem",
    description:
      "In-depth case studies of projects I've built — the problem, the approach, key decisions, and lessons learned.",
    url: `${siteConfig.url}/case-studies`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  alternates: { canonical: `${siteConfig.url}/case-studies` },
}

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Case Studies", url: `${siteConfig.url}/case-studies` },
        ])}
      />
      {children}
    </>
  )
}
