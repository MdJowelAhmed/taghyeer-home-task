"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Phone, User } from "lucide-react";

interface UserAvatarProps {
  name: string;
  phone?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  isOnline?: boolean;
  showTooltip?: boolean;
  alignTooltip?: "left" | "right" | "center";
  onClick?: () => void;
}

/**
 * UserAvatar component rendering name initials avatar with dynamic color gradient.
 * Displays interactive hover tooltip showing User Name and Phone Number without boundary clipping.
 */
export function UserAvatar({
  name,
  phone,
  className,
  size = "md",
  isOnline,
  showTooltip = true,
  alignTooltip = "left",
  onClick,
}: UserAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const initials = name
    .trim()
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

  const gradients = [
    "bg-brand-gradient",
    "bg-gradient-to-r from-violet-600 to-indigo-600",
    "bg-gradient-to-r from-fuchsia-600 to-pink-600",
    "bg-gradient-to-r from-purple-700 to-indigo-500",
    "bg-gradient-to-r from-cyan-600 to-blue-600",
  ];
  const colorIndex =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    gradients.length;
  const bgGradient = gradients[colorIndex];

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const tooltipAlignClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  const caretAlignClasses = {
    left: "left-3.5",
    right: "right-3.5",
    center: "left-1/2 -translate-x-1/2",
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative shrink-0 group cursor-pointer"
    >
      {/* Avatar Name Initials Circle */}
      <div
        className={cn(
          "flex items-center justify-center rounded-full font-bold text-white shadow-md select-none ring-1 ring-purple-500/20 hover:scale-105 transition-all duration-200",
          bgGradient,
          sizeClasses[size],
          className
        )}
      >
        {initials}
      </div>

      {/* Online Indicator Badge */}
      {isOnline !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-brand-bg",
            size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5",
            isOnline ? "bg-emerald-400 shadow-sm shadow-emerald-400/50" : "bg-slate-600"
          )}
        />
      )}

      {/* Hover Tooltip showing User Name & Phone Number */}
      {showTooltip && isHovered && (
        <div
          className={cn(
            "absolute bottom-full mb-2.5 z-50 px-3.5 py-2 rounded-xl bg-[#0b102b] border border-purple-500/40 text-white text-xs shadow-2xl shadow-purple-950/90 whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-150",
            tooltipAlignClasses[alignTooltip]
          )}
        >
          <div className="flex items-center gap-1.5 font-bold text-slate-100">
            <User className="h-3.5 w-3.5 text-fuchsia-400" />
            <span>{name}</span>
          </div>
          {phone ? (
            <div className="flex items-center gap-1.5 text-[11px] text-purple-300 font-mono mt-0.5">
              <Phone className="h-3 w-3 text-cyan-400" />
              <span>{phone}</span>
            </div>
          ) : (
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              No phone listed
            </div>
          )}
          {/* Tooltip Caret Pointer */}
          <div
            className={cn(
              "absolute top-full -mt-1 border-4 border-transparent border-t-[#0b102b]",
              caretAlignClasses[alignTooltip]
            )}
          />
        </div>
      )}
    </div>
  );
}
