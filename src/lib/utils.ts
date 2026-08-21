import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for conditionally joining Tailwind CSS class names.
 *
 * This is the standard shadcn/ui `cn` helper. It combines clsx (conditional
 * class logic) with tailwind-merge (conflict resolution for Tailwind classes).
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-500", "bg-red-500")
 * // → "px-4 py-2 bg-red-500"  (tailwind-merge resolves the bg conflict)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
