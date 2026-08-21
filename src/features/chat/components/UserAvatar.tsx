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

  return (
    <div className="relative shrink-0">
      <div
        className={cn(
          "flex items-center justify-center rounded-full font-semibold text-white shadow-md select-none ring-1 ring-purple-500/20",
          bgGradient,
          sizeClasses[size],
          className
        )}
      >
        {initials}
      </div>
      {isOnline !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-brand-bg",
            size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5",
            isOnline ? "bg-emerald-400 shadow-sm shadow-emerald-400/50" : "bg-slate-600"
          )}
        />
      )}
    </div>
  );
}
