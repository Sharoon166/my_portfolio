"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useState, useEffect } from "react";

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
      {/* Outer Ring */}
      <motion.div
        className="fixed left-0 top-0 pointer-events-none z-[998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className={cn(
            "size-12 rounded-full border-2 border-white/20 transition-all duration-700",
            {
              "scale-[1.9] border-[#3335] border": isHovering,
              "scale-50": isLink && !isHovering,
              "scale-75": msg === "" && !isLink,
            }
          )}
        />
      </motion.div>

      {/* Inner Circle */}
      <motion.div
        className="fixed left-0 top-0 pointer-events-none flex items-center justify-center text-xs z-[999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className={cn(
            "size-2 rounded-full text-center flex items-center justify-center transition-all duration-700 bg-white/70",
            {
              "w-20 h-20 p-2 bg-[#3335] backdrop-blur-md border-white/40 text-white":
                isHovering,
              "scale-0": isLink && !isHovering,
              "scale-75": msg === "" && !isLink,
            }
          )}
        >
          {msg}
        </div>
      </motion.div>
    </>
  );
};

export default Cursor;
