"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

interface CopyButtonProps {
  text: string;
  className: string;
}

export const CopyButton = ({ text, className = "" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <motion.button
      className={cn(`p-2 rounded-md ${className}`)}
      onClick={handleCopy}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      title="Copy to clipboard"
      data-mouse-text={copied ? "Copied" : "Copy"}
    >
      <motion.div
        initial={false}
        animate={{ scale: copied ? 0.8 : 1 }}
        transition={{ duration: 0.2 }}
        data-mouse-text={copied ? "Copied" : "Copy"}
      >
        {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
      </motion.div>
    </motion.button>
  );
};
