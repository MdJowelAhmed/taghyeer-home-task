import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the Input component.
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional error flag to apply error styles.
   */
  error?: boolean;
  /**
   * Optional helper text displayed below the input.
   */
  helperText?: string;
}

/**
 * Standard dark-themed Taghyeer input element.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-xl border border-purple-500/25 bg-brand-sidebar px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gradient-from focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p
            className={cn(
              "text-xs",
              error ? "text-red-400" : "text-slate-400"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
