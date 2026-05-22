import { Gallery } from "./gallery"
import type { GalleryImage } from "@/data/case-studies"

const sampleImages: GalleryImage[] = [
  { src: "/projects/diniiz.png", alt: "Diniiz dashboard", caption: "Diniiz — Restaurant Dashboard" },
  { src: "/projects/newon.webp", alt: "Newon inventory", caption: "Newon — Inventory Management" },
  { src: "/projects/metrics.webp", alt: "Metrics dashboard", caption: "Metrics — Analytics Dashboard" },
  { src: "/projects/voyager.png", alt: "Voyager app", caption: "Voyager — Exploration Tool" },
  { src: "/projects/audix.png", alt: "Audix platform", caption: "Audix — Audio Platform" },
  { src: "/projects/mangadom.png", alt: "Mangadom", caption: "Mangadom — Manga Reader" },
]

export function GalleryPreview() {
  return <Gallery images={sampleImages} />
}
