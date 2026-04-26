import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Caveat, Fira_Code } from "next/font/google";
import "./globals.css";
import CommandPallete from "@/components/command-pallete";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import CustomCursor from "@/components/mouse-cursor";
import { MotionConfig } from "motion/react";
import { GradientBg } from "@/components/gradient-bg";

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
  title: {
    default: "Sharoon • Developer",
    template: "%s • Sharoon",
  },
  description:
    "Hey I'm Sharoon, a 22 y/o Computer Science student with a curious mind and a passion for exploration — both in tech and beyond.",
  openGraph: {
    title: "Sharoon • Developer",
    description:
      "Hey I'm Sharoon, a 22 y/o Computer Science student with a curious mind and a passion for exploration — both in tech and beyond.",
    siteName: "Sharoon's Portfolio",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630
      }
    ]
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
    <html lang="en" className="dark">
      <body
        className={`${firaCode.variable} ${bricolage.variable} ${caveat.variable} antialiased font-fira-code text-foreground/90 leading-relaxed`}
      >
        {/* <GradientBg /> */}
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
