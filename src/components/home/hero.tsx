"use client"
import { motion, useScroll, useTransform } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Note01Icon, GithubIcon, Linkedin01Icon, InstagramIcon } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { profile } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative py-24 hero"
    >

      <div className="absolute inset-0 -z-10">
        {/* Geometric Patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] opacity-70" />
        <div className="absolute inset-0" />
      </div>

      <div className="flex flex-col-reverse justify-between lg:flex-row gap-4 gap-y-24 items-center">
        <div className="px-4 lg:px-6 relative w-fit">
          {/* Main Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="space-y-2">
                <span className="text-muted-foreground font-bricolage italic block text-2xl lg:text-3x">
                  Hey 👋, I&apos;m
                </span>
                <h1>
                  <motion.span
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="block -m-2 tracking-tight font-black"
                  >
                    Sharoon Shaleem
                  </motion.span>
                </h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-xl text-pretty"
              >
               I build full-stack web applications with a focus on performance, scalability, and clean architecture. Most of my work lives around React, Next.js, and backend systems.

              </motion.p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex gap-x-6 gap-y-2 flex-wrap"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="default"
                  asChild
                  className="px-6 py-4 rounded-xl bg-linear-to-br from-destructive via-red-500 to-red-600 hover:from-destructive hover:via-red-600 hover:to-red-700 border border-destructive/30 transition-all duration-300"
                >
                  <a href="#contact">
                    <span className="mr-2 font-medium">Talk to Me</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="text-white" />
                  </a>
                </Button>
              </motion.div>{" "}
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="secondary"
                  asChild
                >
                  <a href={profile.resumeLink} download>
                    <span className="mr-2 font-medium">View Résumé</span>
                    <HugeiconsIcon icon={Note01Icon} size={20} className="text-destructive" />
                  </a>
                </Button>
              </motion.div>{" "}
            </motion.div>
          </div>
        </div>

        <div className="grow">
          <div className="mx-auto w-[90%] max-w-md group relative">
            <div className="relative">
              <Link href={"/about"}>
                <Image
                  src="/sharoon.png"
                  alt="pfp"
                  width={600}
                  height={700}
                  className="z-10 mx-auto grayscale drop-shadow-2xl brightness-50 group-hover:brightness-75 group-hover:grayscale-0 transition-all duration-700"
                  data-mouse-text="Get to know me 🙃 Go here ->"
                />
              </Link>
              <div className="absolute -bottom-2 right-[1%] w-[105%]   border-8 border-white shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] skew-x-12 h-52 rounded-xl -z-10">

                {/* Noise Texture Overlay (Blended with Image) */}
                <div
                  className="absolute w-full h-full z-20 pointer-events-none opacity-[0.15] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                  }}
                />
              </div>

              {/* Floating Social Orbitals */}
              <div className="absolute bottom-0 w-full h-full z-40 pointer-events-none">
                {/* GitHub */}
                <motion.a
                  href={profile.github}
                  target="_blank"
                  animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[15%] left-[10%] p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md pointer-events-auto hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <HugeiconsIcon icon={GithubIcon} size={18} className="text-white/50 group-hover:text-white" />
                  <span className="absolute left-full ml-2 px-2 py-1 rounded bg-black/80 text-[10px]text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">/Github</span>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href={profile.linkenIn}
                  target="_blank"
                  animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-[40%] right-[5%] p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md pointer-events-auto hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <HugeiconsIcon icon={Linkedin01Icon} size={18} className="text-white/50 group-hover:text-white" />
                  <span className="absolute right-full mr-2 px-2 py-1 rounded bg-black/80 text-[10px]text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">/LinkedIn</span>
                </motion.a>

                {/* Instagram */}
                <motion.a
                  href={profile.instagram}
                  target="_blank"
                  animate={{ y: [0, -8, 0], x: [0, -5, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-[20%] left-[15%] p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md pointer-events-auto hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <HugeiconsIcon icon={InstagramIcon} size={18} className="text-white/50 group-hover:text-white" />
                  <span className="absolute left-full ml-2 px-2 py-1 rounded bg-black/80 text-[10px]text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">/Instagram</span>
                </motion.a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}
