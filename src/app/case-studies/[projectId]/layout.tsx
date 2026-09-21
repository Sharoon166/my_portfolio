import { caseStudies } from "@/data/case-studies"
import { siteConfig } from "@/data/site-config"
import { articleSchema, breadcrumbSchema } from "@/data/json-ld"
import { JsonLd } from "@/components/seo/json-ld"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ projectId: string }> }): Promise<Metadata> {
  const { projectId } = await params
  const study = caseStudies[projectId]
  if (!study) return { title: "Case Study Not Found" }

  const projectImage = `/projects/${projectId}.png`

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

  return (
    <>
      <JsonLd data={articleSchema(study.title, study.tagline)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Case Studies", url: `${siteConfig.url}/case-studies` },
          { name: study.title, url: `${siteConfig.url}/case-studies/${projectId}` },
        ])}
      />
      {children}
    </>
  )
}
