import { caseStudies } from "@/data/case-studies"
import { siteConfig } from "@/data/site-config"
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.tagline,
    author: { "@type": "Person", name: siteConfig.author.name },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${siteConfig.url}/case-studies` },
      { "@type": "ListItem", position: 3, name: study.title, item: `${siteConfig.url}/case-studies/${projectId}` },
    ],
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  )
}
