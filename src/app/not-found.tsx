"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full aspect-square bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              animation: `twinkle ${Math.random() * 3 + 1}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="text-center">
        <Image
          src="/astronaut.png"
          alt="Lost astronaut"
          width={250}
          height={250}
          className="mx-auto mb-4 animate-float"
        />
        <h1 className="text-4xl font-bold text-white mb-4">Oops! Page Not Found</h1>
        <p className="text-gray-300 mb-8">Looks like you&apos;ve ventured too far into space!</p>
        <Link
          href="/"
          className="px-6 py-4 rounded-xl bg-gradient-to-br from-destructive via-red-500 to-red-600 hover:from-destructive hover:via-red-600 hover:to-red-700 border border-destructive/30 transition-all duration-300 text-white font-medium"
        >
          Return Home
        </Link>      </div>
    </div>
  );
}
