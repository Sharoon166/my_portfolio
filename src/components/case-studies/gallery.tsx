"use client"

import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react"
import { useState, useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import type { GalleryImage } from "@/data/case-studies"

interface GalleryProps {
  images: GalleryImage[]
  projectLabels?: string[]
}

/* subtle rotations for a curated physical spread feel */
function rotation(index: number) {
  const r = [-1.2, 0.8, -0.4, 1.5, -0.9, 0.3, -1.6, 1.1, 0.5, -0.7, 1.3, -0.2]
  return r[index % r.length]
}
function offset(index: number) {
  const o = [0, 28, -12, 36, -18, 12, -6, 30, 8, -14, 20, -4]
  return o[index % o.length]
}

/* alternating entrance direction per column */
function entrance(index: number) {
  const from = index % 2 === 0 ? "left" : "right"
  return {
    initial: { opacity: 0, x: from === "left" ? -60 : 60, y: 30 },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { type: "spring" as const, damping: 20, stiffness: 160, delay: 0.06 },
  }
}

/* ------------------------------------------------------------------ */
/*  Grid Card                                                          */
/* ------------------------------------------------------------------ */
function GalleryCard({
  image,
  index,
  label,
  onClick,
}: {
  image: GalleryImage
  index: number
  label?: string
  onClick: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 12, stiffness: 130 })
  const springY = useSpring(mouseY, { damping: 12, stiffness: 130 })
  const [hovered, setHovered] = useState(false)

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    mouseX.set(x * 10)
    mouseY.set(y * -10)
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      onMouseMove={handleMove}
      style={{ rotate: `${rotation(index)}deg`, marginTop: `${offset(index)}px` }}
      {...entrance(index)}
      className="relative cursor-pointer text-left w-full group"
    >
      {/* faint ambient glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 0.06 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute -inset-8 blur-3xl rounded-3xl pointer-events-none bg-white"
      />

      <motion.div
        style={{ rotateX: springY, rotateY: springX }}
        className="relative"
      >
        <div
          className={cn(
            "relative overflow-hidden transition-all duration-500 bg-zinc-900 rounded-sm",
            hovered ? "scale-[1.015]" : "scale-100",
          )}
          style={{
            border: "1px solid",
            borderColor: hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)",
            boxShadow: hovered
              ? "0 24px 64px -16px rgba(0,0,0,0.6)"
              : "0 4px 16px rgba(0,0,0,0.25)",
          }}
        >
          <div className="aspect-[4/3] relative">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-all duration-700"
              style={{
                filter: hovered ? "brightness(1.04) contrast(1.04)" : "brightness(0.88)",
              }}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* label below card */}
        <div
          className={cn(
            "flex items-center gap-2 pt-3 transition-all duration-500",
            hovered
              ? "translate-y-0 opacity-100"
              : "translate-y-1 opacity-0 pointer-events-none",
          )}
        >
          <span className="size-1 rounded-full bg-white/30 shrink-0" />
          <span className="text-[10px] font-mono text-white/40 tracking-wide">
            {label ?? image.caption}
          </span>
        </div>
      </motion.div>
    </motion.button>
  )
}

/* ------------------------------------------------------------------ */
/*  Lightbox slide variants                                            */
/* ------------------------------------------------------------------ */
const slide = {
  enter: (d: number) => ({ x: d > 0 ? 280 : -280, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -280 : 280, opacity: 0 }),
}

/* ------------------------------------------------------------------ */
/*  Gallery                                                             */
/* ------------------------------------------------------------------ */
export function Gallery({ images, projectLabels }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(1)
  const [uiVisible, setUiVisible] = useState(true)
  const uiTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const isOpen = selectedIndex !== null

  const open = useCallback((i: number) => {
    setDirection(1)
    setSelectedIndex(i)
  }, [])

  const close = useCallback(() => setSelectedIndex(null), [])

  const goNext = useCallback(() => {
    setDirection(1)
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))
    showUi()
  }, [images.length])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null,
    )
    showUi()
  }, [images.length])

  const showUi = useCallback(() => {
    setUiVisible(true)
    if (uiTimer.current) clearTimeout(uiTimer.current)
    uiTimer.current = setTimeout(() => setUiVisible(false), 2000)
  }, [])

  /* keyboard */
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, goNext, goPrev, close])

  /* auto-scroll filmstrip */
  useEffect(() => {
    if (!isOpen || !stripRef.current || selectedIndex === null) return
    const child = stripRef.current.children[selectedIndex] as HTMLElement | undefined
    if (child) {
      child.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    }
  }, [selectedIndex, isOpen])

  useEffect(() => {
    return () => {
      if (uiTimer.current) clearTimeout(uiTimer.current)
    }
  }, [])

  if (images.length === 0) return null

  return (
    <>
      {/* ============  GRID  ============ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
        {images.map((img, i) => (
          <GalleryCard
            key={i}
            image={img}
            index={i}
            label={projectLabels?.[i]}
            onClick={() => open(i)}
          />
        ))}
      </div>

      {/* ============  LIGHTBOX  ============ */}
      <AnimatePresence>
        {isOpen && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-black select-none"
            style={{ backgroundColor: "#050505" }}
            onMouseMove={() => showUi()}
          >
            {/* click zones */}
            <div
              className="absolute inset-y-0 left-0 z-30 w-1/2 cursor-w-resize"
              onClick={goPrev}
            />
            <div
              className="absolute inset-y-0 right-0 z-30 w-1/2 cursor-e-resize"
              onClick={goNext}
            />

            {/* counter */}
            <div className="absolute top-5 left-5 z-40">
              <span className="text-[10px] font-mono text-white/20 tracking-widest">
                {String(selectedIndex + 1).padStart(2, "0")}
                <span className="text-white/10 mx-1">/</span>
                {String(images.length).padStart(2, "0")}
              </span>
            </div>

            {/* close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-40 size-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-white/40"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* ---- image ---- */}
            <div className="flex-1 relative flex items-center justify-center min-h-0 px-8 sm:px-16 lg:px-24">
              <AnimatePresence>
                {uiVisible && (
                  <motion.button
                    key="prev"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    onClick={goPrev}
                    className="absolute left-4 lg:left-8 z-20 size-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-colors cursor-pointer text-white/30 hover:text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>

              <div className="relative w-full h-full max-w-5xl max-h-[72vh] flex items-center justify-center">
                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.div
                    key={selectedIndex}
                    custom={direction}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", damping: 28, stiffness: 240 }}
                    className="relative w-full h-full max-w-4xl"
                  >
                    <Image
                      src={images[selectedIndex].src}
                      alt={images[selectedIndex].alt}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {uiVisible && (
                  <motion.button
                    key="next"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    onClick={goNext}
                    className="absolute right-4 lg:right-8 z-20 size-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-colors cursor-pointer text-white/30 hover:text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* ---- caption ---- */}
            <AnimatePresence>
              {uiVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-40 flex items-center justify-center px-6 py-3"
                >
                  <div className="h-px flex-1 bg-white/5 max-w-20" />
                  <p className="text-[11px] text-white/35 font-mono tracking-wide px-4 text-center">
                    {images[selectedIndex].caption}
                  </p>
                  <div className="h-px flex-1 bg-white/5 max-w-20" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ---- film strip ---- */}
            <AnimatePresence>
              {uiVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-40 border-t border-white/5"
                >
                  <div
                    ref={stripRef}
                    className="flex gap-2 overflow-x-auto px-5 py-3"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "rgba(255,255,255,0.08) transparent",
                    }}
                  >
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDirection(i > selectedIndex ? 1 : -1)
                          setSelectedIndex(i)
                        }}
                        className={cn(
                          "relative shrink-0 w-14 aspect-video rounded-sm overflow-hidden transition-all duration-300 cursor-pointer",
                          "border",
                          i === selectedIndex
                            ? "border-white/60 ring-1 ring-white/20 scale-110"
                            : "border-white/10 opacity-40 hover:opacity-80",
                        )}
                      >
                        <Image src={img.src} alt="" fill className="object-cover" sizes="56px" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
