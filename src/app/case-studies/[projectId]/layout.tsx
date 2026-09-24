import { caseStudies } from "@/data/case-studies"
import { siteConfig } from "@/data/site-config"
import { articleSchema, breadcrumbSchema } from "@/data/json-ld"
import { JsonLd } from "@/components/seo/json-ld"
import { projects } from "@/constants"
import type { Metadata } from "next"

export function generateStaticParams() {
  return Object.keys(caseStudies).map((projectId) => ({ projectId }))
}

export async function generateMetadata({ params }: { params: Promise<{ projectId: string }> }): Promise<Metadata> {
  const { projectId } = await params
  const study = caseStudies[projectId]
  if (!study) return { title: "Case Study Not Found" }

  const projectImage =
    projects.find((p) => p.caseStudyId === projectId)?.image ?? siteConfig.ogImage

  return {
    title: study.title,
    description: study.tagline,
    openGraph: {
      title: `${study.title} — Case Study`,
      description: study.tagline,
      url: `${siteConfig.url}/case-studies/${projectId}`,
      images: [{ url: projectImage, width: 1200, height: 630 }],
    },
    alternates: { canonical: `${siteConfig.url}/case-studies/${projectId}` },
  }
}

export default async function CaseStudyDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const study = caseStudies[projectId]

  if (!study) return children

  const url = `${siteConfig.url}/case-studies/${projectId}`
  const image =
    projects.find((p) => p.caseStudyId === projectId)?.image ?? siteConfig.ogImage

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: study.title,
          description: study.tagline,
          url,
          image: `${siteConfig.url}${image}`,
          datePublished: study.datePublished,
          dateModified: study.dateModified,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Case Studies", url: `${siteConfig.url}/case-studies` },
          { name: study.title, url },
        ])}
      />
      {children}
    </>
  )
}
