import type { MetadataRoute } from "next"
import { siteConfig } from "@/data/site-config"
import { caseStudies } from "@/data/case-studies"

export default function sitemap(): MetadataRoute.Sitemap {
  // lastmod reflects real content dates (from case-study dateModified),
  // not the build time, so crawlers can trust it.
  const newestStudyUpdate = Object.values(caseStudies).reduce(
    (latest, study) => {
      const modified = new Date(study.dateModified)
      return modified > latest ? modified : latest
    },
    new Date("2000-01-01"),
  )

  const staticPages = [
    {
      url: siteConfig.url,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/projects`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/case-studies`,
      lastModified: newestStudyUpdate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ]

  const caseStudyPages = Object.values(caseStudies).map((study) => ({
    url: `${siteConfig.url}/case-studies/${study.id}`,
    lastModified: new Date(study.dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...caseStudyPages]
}
