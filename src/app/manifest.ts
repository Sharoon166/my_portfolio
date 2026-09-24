import type { MetadataRoute } from "next"
import { siteConfig } from "@/data/site-config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#050505",
    icons: [
      { src: "/logo.png", sizes: "500x500", type: "image/png" },
      { src: "/logo_bw.png", sizes: "500x500", type: "image/png" },
    ],
  }
}
