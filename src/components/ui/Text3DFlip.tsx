"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Text3DFlipProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  textClassName?: string;
  flipTextClassName?: string;
  rotateDirection?: "top" | "bottom";
  staggerDuration?: number;
  staggerFrom?: "first" | "last";
}

/**
 * Text3DFlip Component (Magic UI 3D Perspective Character Flip).
 * Animates text characters with 3D rotation and perspective flipping on view.
 */
export function Text3DFlip({
  children,
  as: Component = "h2",
  className = "",
  rotateDirection = "top",
  staggerDuration = 0.04,
}: Text3DFlipProps) {
  const textContent = typeof children === "string" ? children : String(children);
  const words = textContent.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
      },
    },
  };

  const charVariants: Variants = {
    hidden: {
      opacity: 0,
      rotateX: rotateDirection === "top" ? -90 : 90,
      y: rotateDirection === "top" ? 15 : -15,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 18,
        stiffness: 120,
      },
    },
  };

  return (
    <Component className={cn("inline-flex flex-wrap items-center [perspective:1000px]", className)}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="inline-flex flex-wrap gap-x-2"
      >
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-flex whitespace-nowrap">
            {word.split("").map((char, cIdx) => (
              <motion.span
                key={cIdx}
                variants={charVariants}
                className="inline-block transform-gpu origin-center"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
