"use client";

import { Text3DFlip } from "@/components/ui/Text3DFlip";
import { cn } from "@/lib/utils";

interface StaggeredTitleProps {
  text: string;
  highlightText?: string;
  className?: string;
  isMonoItalic?: boolean;
}

/**
 * StaggeredTitle Component powered by Text3DFlip 3D character rotation.
 * Supports font-mono italic styling and gradient text highlights.
 */
export function StaggeredTitle({
  text,
  highlightText,
  className = "",
  isMonoItalic = true,
}: StaggeredTitleProps) {
  return (
    <div className={cn("tracking-tight leading-[1.1] font-bold text-white", isMonoItalic && "font-mono italic", className)}>
      <Text3DFlip as="span" rotateDirection="top" staggerDuration={0.03}>
        {text}
      </Text3DFlip>
      {" "}
      {highlightText && (
        <Text3DFlip
          as="span"
          rotateDirection="top"
          staggerDuration={0.03}
          className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
        >
          {highlightText}
        </Text3DFlip>
      )}
    </div>
  );
}
