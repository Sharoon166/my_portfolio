import type { MetadataRoute } from "next"
import { siteConfig } from "@/data/site-config"
import { profile } from "@/constants"

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    lang: "en",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui", "browser"],
    background_color: "#fafafa",
    theme_color: "#050505",
    icons: [
      { src: "/logo_pwa.png", sizes: "500x500", type: "image/png", purpose: "any" },
      { src: "/logo-pwa-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/logo-pwa-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      {
        src: "/logo-pwa-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "About",
        short_name: "About",
        description: "About Sharoon Shaleem",
        url: "/about",
      },
      {
        name: "Résumé",
        short_name: "Résumé",
        description: "View my résumé (PDF)",
        url: profile.resumeLink,
      },
      {
        name: "Book a Meeting",
        short_name: "Meeting",
        description: "Schedule a meeting on Cal.com",
        url: profile.meeting,
      },
    ],
  }
}
