"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import CircularText from "./circular-text";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, LockPasswordIcon } from "@hugeicons/core-free-icons";

const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [msg, setMsg] = useState("");

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
      // Match the hovered element itself or any ancestor, so the badge also
      // appears when the pointer lands on a child of a data-mouse-text element.
      const mouseText =
        target
          .closest("[data-mouse-text]")
          ?.getAttribute("data-mouse-text") ?? "";
      const isLinkElement = target.closest("a");
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
              className="flex items-center justify-center text-background bg-foreground/90 backdrop-blur-md rounded-full border-2 border-dotted border-background/40"
            >
              <CircularText
                text={`${msg.toUpperCase()}`}
                radius={32}
                autoSpin
              >
                {msg.toLowerCase().includes("private") ? (
                  <HugeiconsIcon icon={LockPasswordIcon} size={16} className="text-background" />
                ) : (
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} className="text-background" />
                )}
              </CircularText>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Cursor;
