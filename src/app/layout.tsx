import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommandPallete from "@/components/command-pallete";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import CustomCursor from "@/components/mouse-cursor";
import { ScrollProgressButton } from "@/components/layout/scroll-progress-button";
import { FontPreview } from "@/components/font-preview";
import { MotionConfig } from "motion/react";
import { siteConfig } from "@/data/site-config";
import { JsonLd } from "@/components/seo/json-ld";
import { siteSchema } from "@/data/json-ld";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

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

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#050505" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
        <Script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.remove('dark');else document.documentElement.classList.add('dark')}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body
        className={`${jetBrainsMono.variable} ${bricolage.variable} ${caveat.variable} antialiased font-body text-foreground/90 leading-relaxed`}
      >
        <JsonLd data={siteSchema} />
        <ThemeProvider>
          <SmoothScrollProvider>
            <MotionConfig reducedMotion="user">
              <div className="container py-6 min-h-screen space-y-4">
                <Header />
                <main className="relative" role="main">
                  {children}
                </main>
                <Footer />
              </div>
              <CustomCursor />
              <ScrollProgressButton />
              {/*<FontPreview />*/}
              <CommandPallete />
              <ToastContainer
                position="bottom-right"
                autoClose={2000}
                closeOnClick
                pauseOnHover={false}
                draggable={false}
                theme="dark"
              />
            </MotionConfig>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
