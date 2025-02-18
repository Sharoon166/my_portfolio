import type { Metadata } from "next";
import { Poppins, Caveat } from "next/font/google";
import "./globals.css";
import CommandPallete from "@/components/command-pallete";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import CustomCursor from "@/components/mouse-cursor";
import { MotionConfig } from "motion/react";
import { GradientBg } from "@/components/gradient-bg";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  preload: true,
});
export const metadata: Metadata = {
  title: {
    default: "Sharoon • Developer",
    template: "%s • Sharoon",
  },
  description:
    "Hey I'm Sharoon, a 22 y/o Computer Science student with a curious mind and a passion for exploration — both in tech and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${caveat.variable}  antialiased dark font-poppins`}
      >
        <GradientBg />
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
