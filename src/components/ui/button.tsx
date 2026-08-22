import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/ui/Loader";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    const variantStyles = {
      default:
        "bg-brand-gradient text-white shadow-lg shadow-purple-950/50 hover:shadow-purple-600/30 hover:brightness-110 focus-visible:ring-purple-500",
      destructive:
        "bg-red-600/90 text-white hover:bg-red-600 shadow-sm focus-visible:ring-red-500",
      outline:
        "border border-purple-500/30 bg-brand-card/60 hover:bg-brand-surface hover:border-purple-400 text-slate-200 focus-visible:ring-purple-400",
      secondary:
        "bg-brand-surface text-slate-200 hover:bg-[#172255] border border-purple-500/20 focus-visible:ring-purple-400",
      ghost:
        "hover:bg-purple-950/40 hover:text-purple-300 text-slate-300 focus-visible:ring-purple-400",
      link: "text-brand-gradient-to underline-offset-4 hover:underline focus-visible:ring-purple-400",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-lg px-3 text-xs",
      lg: "h-12 rounded-xl px-8 text-base",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader size={0.3} className="mr-2 inline-block" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
