"use client";
import { motion } from "motion/react"

export function GradientBg() {
  return (
    <>
      <motion.div
        className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px]"
        animate={{
          x: [0, 100, -100, 50, -50, 0],
          y: [0, -100, 100, -50, 150, 0],
          rotate: [0, 45, -45, 20, -20, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-destructive/30 rounded-full blur-[100px]"
        animate={{
          x: [0, -100, 100, -50, 150, 0],
          y: [0, 100, -100, 150, -50, 0],
          rotate: [0, -45, 45, -20, 20, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </>
  )
}
