"use client";

import { Text3DFlip } from "./Text3DFlip";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: string;
  className?: string;
  align?: "left" | "center" | "right";
  as?: "h1" | "h2" | "h3" | "p" | "span";
  isEyebrow?: boolean;
}

/**
 * Shared animated section title using Text3DFlip with font-mono italic styling support.
 */
export function SectionTitle({
  children,
  className = "",
  align = "center",
  as = "h2",
  isEyebrow = false,
}: SectionTitleProps) {
  const alignClass =
    align === "left"
      ? "justify-start text-left"
      : align === "right"
        ? "justify-end text-right"
        : "justify-center text-center";

  return (
    <div className={cn("flex w-full mb-3", alignClass, className)}>
      <Text3DFlip
        as={as}
        className={cn(
          isEyebrow
            ? "font-mono italic text-xs md:text-sm tracking-wider uppercase text-purple-300 font-medium"
            : "font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight"
        )}
        rotateDirection="top"
        staggerDuration={0.03}
      >
        {children}
      </Text3DFlip>
    </div>
  );
}

export default SectionTitle;
