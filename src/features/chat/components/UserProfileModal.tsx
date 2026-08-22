"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { User } from "@/features/auth/types/auth.types";
import { UserAvatar } from "./UserAvatar";
import { useTheme } from "@/components/providers/theme-provider";
import { Home, Sun, Moon, LogOut } from "lucide-react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  onLogout: () => void;
}

/**
 * Small anchored dropdown modal that opens directly below the profile button.
 * Includes: 1. Go to Home, 2. Dark/Light mode toggle, 3. Logout.
 */
export function UserProfileModal({
  isOpen,
  onClose,
  user,
  onLogout,
}: UserProfileModalProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Handle outside clicks & escape key to dismiss dropdown
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-brand-card/95 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-950/60 p-2 z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150 text-brand-text select-none"
    >
      {/* Mini Profile Header */}
      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-1.5">
        <UserAvatar name={user.name} size="sm" isOnline={true} showTooltip={false} />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-brand-text truncate">{user.name}</p>
          <p className="text-[10px] text-purple-400 font-mono truncate">{user.phone}</p>
        </div>
      </div>

      {/* Feature 1: Go to Home */}
      <Link
        href="/"
        onClick={onClose}
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-brand-text hover:text-purple-400 hover:bg-purple-500/15 transition-all group"
      >
        <Home className="h-4 w-4 text-brand-gradient-to" />
        <span>Go to Home</span>
      </Link>

      {/* Feature 2: Dark & Light Mode Toggle */}
      <button
        onClick={toggleTheme}
        type="button"
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-brand-text hover:text-purple-400 hover:bg-purple-500/15 transition-all text-left group"
      >
        <div className="flex items-center gap-2.5">
          {isDark ? (
            <Sun className="h-4 w-4 text-amber-300" />
          ) : (
            <Moon className="h-4 w-4 text-indigo-500" />
          )}
          <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
        </div>
        <span className="text-[10px] text-brand-muted font-mono uppercase">
          {theme}
        </span>
      </button>

      <div className="my-1 border-t border-purple-500/15" />

      {/* Feature 3: Logout */}
      <button
        onClick={() => {
          onClose();
          onLogout();
        }}
        type="button"
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-white hover:bg-red-600/90 transition-all text-left"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  );
}
