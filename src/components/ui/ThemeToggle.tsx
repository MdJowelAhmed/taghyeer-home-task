"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: "default" | "sm" | "icon";
}

/**
 * ThemeToggle component that switches between Dark and Light mode.
 */
export function ThemeToggle({ className, size = "icon" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      size={size}
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
      className={cn(
        "h-9 w-9 rounded-xl border border-purple-500/25 bg-brand-card/70 hover:bg-brand-surface text-purple-300 hover:text-white transition-all duration-200 shadow-sm",
        className
      )}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-300 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-indigo-600 transition-transform duration-200 hover:-rotate-12" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
