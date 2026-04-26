// "use client";

// import { motion } from "motion/react";
// import { usePathname } from "next/navigation";

// // Define the animation for the panels
// const transitionVariants = {
//   initial: { scaleY: 0 },
//   animate: { scaleY: 0 },
//   exit: { scaleY: 1 },
// };

// const transitionEase = [0.76, 0, 0.24, 1];

// export default function Template({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const nbOfColumns = 5; // How many "slats" in the wipe

//   return (
//     <div className="relative">
//       {/* The Staggered Overlay Layer */}
//       <div className="fixed inset-0 pointer-events-none z-50 flex">
//         {[...Array(nbOfColumns)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="relative h-full w-full bg-black"
//             variants={transitionVariants}
//             initial="initial"
//             exit="exit"
//             // This creates the "stagger" effect
//             transition={{
//               duration: 0.5,
//               ease: transitionEase,
//               delay: 0.05 * i, 
//             }}
//           />
//         ))}
//       </div>

//       {/* The Second Overlay Layer (to wipe the screen back to clear) */}
//       <div className="fixed inset-0 pointer-events-none z-50 flex">
//         {[...Array(nbOfColumns)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="relative h-full w-full bg-black"
//             variants={{
//               initial: { scaleY: 1 },
//               animate: { scaleY: 0 },
//             }}
//             initial="initial"
//             animate="animate"
//             transition={{
//               duration: 0.5,
//               ease: transitionEase,
//               delay: 0.05 * i,
//             }}
//           />
//         ))}
//       </div>

//       {/* The Actual Page Content */}
//       <motion.div key={pathname}>
//         {children}
//       </motion.div>
//     </div>
//   );
// }


"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

const transitionEase = [0.76, 0, 0.24, 1];
const wipeColors = ["#000000", "#B22222", "#000000"];

const curve = {
  initial: {
    d: "M0 100 L100 100 L100 100 Q50 100 0 100 Z", // Flat at bottom
  },
  animate: (i: number) => ({
    d: [
      "M0 100 L100 100 L100 100 Q50 100 0 100 Z", // Start (Bottom)
      "M0 100 L100 100 L100 0 Q50 0 0 0 Z",      // Middle (Full Screen)
      "M0 0 L100 0 L100 0 Q50 0 0 0 Z"           // End (Hidden Top)
    ],
    transition: {
      duration: 1.4,
      ease: transitionEase,
      delay: 0.08 * i,
      times: [0, 0.5, 1]
    },
  }),
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[9999] h-screen w-screen">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          {wipeColors.map((color, i) => (
            <motion.path
              key={`${pathname}-${i}`}
              custom={i}
              variants={curve}
              initial="initial"
              animate="animate"
              fill={color}
            />
          ))}
        </svg>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={pathname}
          // Initial/Animate handle the "Entry" of the NEW page
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // Exit handles the "Departure" of the OLD page
          exit={{ opacity: 0 }} 
          transition={{ 
            // Entry is delayed so the wipe covers the screen first
            opacity: { delay: 0.7, duration: 0.3 },
            // Exit is instant (duration 0)
            default: { duration: 0 } 
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}


// export default function Template({children}: {children: React.ReactNode}){
//     return <>{children}</>
// }