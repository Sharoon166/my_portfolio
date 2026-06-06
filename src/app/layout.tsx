import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Caveat, Fira_Code } from "next/font/google";
import "./globals.css";
import CommandPallete from "@/components/command-pallete";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import CustomCursor from "@/components/mouse-cursor";
import { MotionConfig } from "motion/react";
import { siteConfig } from "@/data/site-config";
import { JsonLd } from "@/components/seo/json-ld";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  preload: true,
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Sharoon", "Sharoon Shaleem", "full-stack developer", "React developer", "Next.js developer", "Islamabad developer"],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo_bw.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: ["/logo.png"],
    apple: ["/logo.png"],
  },
};

const siteSchema = {
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${firaCode.variable} ${bricolage.variable} ${caveat.variable} antialiased font-fira-code text-foreground/90 leading-relaxed`}
      >
        <JsonLd data={siteSchema} />
        <MotionConfig reducedMotion="user">
          <div className="container py-6 min-h-screen space-y-4">
            <Header />
            <main className="relative" role="main">
              {children}
            </main>
            <Footer />
          </div>
          <CustomCursor />
          <CommandPallete />
        </MotionConfig>
      </body>
    </html>
  );
}
