"use client"
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { motion } from "motion/react";
import { DottedMap } from "@/components/ui/dotted-map";
import { LinkPreview } from "../ui/link-preview";

export function AboutPreview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative sm:h-96"
    >
      <h2 className="dot-suffix leading-loose">About me</h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="relative max-w-3xl md:text-lg leading-relaxed z-20"
      >
        I&apos;m a full-stack developer specializing in building scalable, user-focused applications. I gained my professional footing at <LinkPreview url="https://synctom.com" className="underline">Synctom</LinkPreview>, a startup where I worked directly with clients, shipped production-ready apps, and solved real business problems under real constraints. I love exploring new technologies and constantly push myself to stay sharp and ahead of the curve.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="my-8 sm:h-[400px] overflow-hidden sm:absolute right-0 top-0 z-0 opacity-50 sm:opacity-100"
      >
        <div className="w-full h-full flex items-center justify-center">
          <DottedMap
            width={300}
            height={150}
            markers={[{ lat: 33.6844, lng: 73.0479, size: 1, pulse: true,}]}
            markerColor="#A0FF00"
            dotColor="currentColor"
            renderMarkerOverlay={({ x, y }) => (
              <text
                x={x}
                y={y - 8}
                textAnchor="middle"
                className="text-[8px] sm:text-[4px] font-semibold fill-foreground select-auto"
              >
                Based in Islamabad
              </text>
            )}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <Link
          href="/about"
          className="mt-4 py-3 inline-flex items-center gap-2 group relative overflow-hidden text-2xl text-destructive hover:underline underline-offset-4"
        >
          Learn More{" "}
          <HugeiconsIcon icon={ArrowRight02Icon} size={24} className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-destructive" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
