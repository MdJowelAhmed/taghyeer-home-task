"use client";

import { motion } from "framer-motion";

/**
 * AnimatedBackgroundNodes Component.
 * Floating glowing mesh orbs and animated connection lines background.
 */
export function AnimatedBackgroundNodes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orbiting Radial Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.45, 0.25],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-600/30 via-fuchsia-600/20 to-indigo-600/30 blur-[140px]"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-cyan-600/25 via-purple-600/20 to-pink-600/25 blur-[150px]"
      />

      {/* Floating Animated Connection Nodes (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <pattern
          id="net-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="rgba(139, 92, 246, 0.25)"
            strokeWidth="0.8"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#net-grid)" />
      </svg>
    </div>
  );
}
