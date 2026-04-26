"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import CircularText from "./circular-text";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, LockPasswordIcon } from "@hugeicons/core-free-icons";

const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [msg, setMsg] = useState("");
  const [isLink, setIsLink] = useState(false);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth animation with different delays
  const cursorX = useSpring(mouseX, { stiffness: 800, damping: 40 });
  const cursorY = useSpring(mouseY, { stiffness: 800, damping: 40 });

  const ringX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const ringY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  // Detect hover on elements with a data-mouse-text attribute
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const mouseText = target.getAttribute("data-mouse-text") ?? "";
      const isLinkElement = target.closest("a");
      setIsLink(!!isLinkElement);
      if (mouseText) {
        setMsg(mouseText);
        setIsHovering(true);
      } else if (isLinkElement) {
        setIsHovering(false);
        setMsg("");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!(e.relatedTarget as HTMLElement)?.closest("a")) {
        setIsHovering(false);
        setMsg("");
        setIsLink(false);
      }
    };

    const handleWindowResize = () => {
      if (window.innerWidth <= 786) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    if (window.innerWidth <= 786) {
      setIsSmallScreen(true);
    }

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (isSmallScreen) return null;

  return (
    <>

      {/* Inner Circle */}
      <motion.div
        className="fixed left-0 top-0 pointer-events-none flex items-center justify-center text-xs z-999"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <AnimatePresence mode="wait">
          {isHovering && msg ? (
            <motion.div
              key="circular"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center text-zinc-900 bg-zinc-200/90 backdrop-blur-md rounded-full border-2 border-dotted border-zinc-400"
            >
              <CircularText
                text={`${msg.toUpperCase()}`}
                radius={32}
                autoSpin
              >
                {msg.toLowerCase().includes("private") ? (
                  <HugeiconsIcon icon={LockPasswordIcon} size={16} className="text-zinc-900" />
                ) : (
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} className="text-zinc-900" />
                )}
              </CircularText>
            </motion.div>
          ) : (
            <motion.div
              key="dot"
              className={cn(
                "size-2 rounded-full text-center flex items-center justify-center transition-all duration-700 bg-transparent",
                {
                  "scale-0": isLink,
                  "scale-75": msg === "" && !isLink,
                }
              )}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Cursor;
