import { siteConfig } from "@/data/site-config";

/**
 * Shared JSON-LD builders — one source of truth for every schema the site
 * emits. Rendered through `<JsonLd data={...} />`.
 */

/** Person + WebSite graph. Other page schemas reference these via `@id`. */
export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
      url: siteConfig.author.url,
      email: siteConfig.author.email,
      image: `${siteConfig.url}/me.webp`,
      jobTitle: "Full-Stack Developer",
      description: siteConfig.description,
      sameAs: Object.values(siteConfig.links),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      author: { "@id": `${siteConfig.url}/#person` },
    },
  ],
};

const ABOUT_DESCRIPTION =
  "Full-stack developer and CS student at NUML. Building production-grade web apps with React, Next.js, and Node.js.";

/** About page: AboutPage entity + breadcrumbs, wired into the site graph. */
export const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${siteConfig.url}/about#aboutpage`,
      url: `${siteConfig.url}/about`,
      name: "About — Sharoon Shaleem",
      description: ABOUT_DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      mainEntity: { "@id": `${siteConfig.url}/#person` },
      breadcrumb: { "@id": `${siteConfig.url}/about#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.url}/about#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${siteConfig.url}/about`,
        },
      ],
    },
  ],
};

/** Article schema for a case-study detail page. */
export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: "en",
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
    author: { "@id": `${siteConfig.url}/#person` },
    publisher: { "@id": `${siteConfig.url}/#person` },
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  };
}

/** Breadcrumb list from an ordered list of `{ name, url }` hops. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
