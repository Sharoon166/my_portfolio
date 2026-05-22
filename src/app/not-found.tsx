import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full aspect-square bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
      {/* Massive 404 Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[40vw] font-black font-bricolage tracking-tighter text-white opacity-5">
          404
        </span>
      </div>
      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-6 pt-24">
        {/* Alien Astronaut Image */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48 md:w-56 md:h-56 animate-float">
            <Image
              src="/astronaut.png"
              alt="Lost astronaut"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="font-black tracking-tighter leading-[0.9] italic">
            <span className="text-destructive">Lost</span> in space
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            This page drifted off course. Let&apos;s get you back to familiar territory.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-xl font-semibold text-sm hover:bg-zinc-200 transition-all group"
        >
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
