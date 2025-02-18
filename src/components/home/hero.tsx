import { motion } from "motion/react";
import { LuArrowRight, LuDownload } from "react-icons/lu";
import { Button } from "../ui/button";
import { profile } from "@/constants";
import Image from "next/image";

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative py-4"
    >
      <div className="absolute inset-0 -z-10">
        {/* Geometric Patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]" />
        <div className="absolute inset-0" />
      </div>
      <div className="flex flex-col-reverse justify-between lg:flex-row gap-4 items-center">
        <div className="px-4 lg:px-6 relative w-fit">
          {/* Main Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="space-y-1 font-caveat text-2xl lg:text-4xl ">
                <span className="text-muted-foreground">Hey 👋, I&apos;m</span>
                <h1 className="text-6xl lg:text-7xl">
                  <motion.span
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="block -m-2 bg-gradient-to-tr from-destructive to-red-500 bg-clip-text text-transparent tracking-tight font-normal"
                  >
                    Sharoon Shaleem
                  </motion.span>
                </h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-muted-foreground max-w-xl hover:text-zinc-300 md:text-lg transition-colors"
              >
                A full-stack developer passionate about crafting innovative web
                solutions. Let&apos;s collaborate to create something
                exceptional!
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
                  className="px-6 py-4 rounded-xl bg-gradient-to-br from-destructive via-red-500 to-red-600 hover:from-destructive hover:via-red-600 hover:to-red-700 border border-destructive/30 transition-all duration-300"
                >
                  <a href="#contact">
                    <span className="mr-2 font-medium">Let&apos;s Talk</span>
                    <LuArrowRight className="text-white size-5" />
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
                  variant="outline"
                  asChild
                  className="px-6 py-4 rounded-xl bg-secondary/60 backdrop-blur-md border border-border transition-all duration-300"
                >
                  <a href={profile.resume} download>
                    <span className="mr-2 font-medium">Résumé</span>
                    <LuDownload className="text-destructive size-5" />
                  </a>
                </Button>
              </motion.div>{" "}
            </motion.div>
          </div>
        </div>
        <div className="grow">
          <Image
            src="/hero_pic.png"
            alt="pfp"
            width={600}
            height={600}
            className="mx-auto max-w-sm lg:max-w-lg"
          />
        </div>
      </div>
    </motion.section>
  );
}