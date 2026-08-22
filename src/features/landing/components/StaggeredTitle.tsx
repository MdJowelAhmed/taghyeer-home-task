"use client";

import { motion, Variants } from "framer-motion";

interface StaggeredTitleProps {
  text: string;
  highlightText?: string;
  className?: string;
}

/**
 * StaggeredTitle Component.
 * Word-by-word animated entrance effect for hero titles.
 */
export function StaggeredTitle({
  text,
  highlightText,
  className = "",
}: StaggeredTitleProps) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 * i },
    }),
  };

  const wordVariants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 25,
      transition: { type: "spring" as const, damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`font-extrabold tracking-tight leading-[1.1] ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={wordVariants}
          className="inline-block mr-3"
        >
          {word}
        </motion.span>
      ))}
      {highlightText && (
        <motion.span
          variants={wordVariants}
          className="inline-block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
        >
          {highlightText}
        </motion.span>
      )}
    </motion.h1>
  );
}
