import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  isOnline?: boolean;
}

export function UserAvatar({
  name,
  className,
  size = "md",
  isOnline,
}: UserAvatarProps) {
  const initials = name
    .trim()
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

  // Deterministic color from name
  const colors = [
    "bg-indigo-500",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-sky-500",
    "bg-teal-500",
  ];
  const colorIndex =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  const bgColor = colors[colorIndex];

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div className="relative shrink-0">
      <div
        className={cn(
          "flex items-center justify-center rounded-full font-semibold text-white shadow-sm select-none",
          bgColor,
          sizeClasses[size],
          className
        )}
      >
        {initials}
      </div>
      {isOnline !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-white",
            size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5",
            isOnline ? "bg-emerald-500" : "bg-slate-400"
          )}
        />
      )}
    </div>
  );
}
