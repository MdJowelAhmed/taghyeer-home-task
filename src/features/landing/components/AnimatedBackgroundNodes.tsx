"use client";

import { motion } from "framer-motion";

/**
 * AnimatedBackgroundNodes Component.
 * Subtle ambient glow lighting overlay for Hero section.
 */
export function AnimatedBackgroundNodes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft Breathing Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-cyan-600/20 via-purple-600/20 to-fuchsia-600/20 blur-[150px]"
      />
    </div>
  );
}
