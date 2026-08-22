"use client";

import { cn } from "@/lib/utils";

interface LoaderProps {
  /** Size multiplier: 1 = 48px, 0.5 = 24px, 0.35 = 16.8px */
  size?: number;
  className?: string;
  color1?: string;
  color2?: string;
}

/**
 * Custom dual-color rotating circle loader component.
 */
export function Loader({
  size = 1,
  className,
  color1,
  color2,
}: LoaderProps) {
  const style: React.CSSProperties = {
    "--size": `${size}px`,
    ...(color1 ? { "--color-1": color1 } : {}),
    ...(color2 ? { "--color-2": color2 } : {}),
  } as React.CSSProperties;

  return <span className={cn("loader", className)} style={style} />;
}
