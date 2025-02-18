"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "motion/react";

interface TooltipComponentProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

export default function TooltipComponent({
  children,
  content,
  className
}: TooltipComponentProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger className="cursor-pointer" asChild>
          {children}
        </TooltipTrigger>
        <AnimatePresence>
          <TooltipContent className={className}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
            }}
            >
              <p>{content}</p>
            </motion.div>
          </TooltipContent>
        </AnimatePresence>
      </Tooltip>
    </TooltipProvider>
  );
}
