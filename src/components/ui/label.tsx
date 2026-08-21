import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the Label component.
 */
export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Displays an asterisk indicating the field is required.
   */
  required?: boolean;
  /**
   * Optional badge or helper indicator.
   */
  badge?: string;
}

/**
 * Label component for form controls with dark theme text styling.
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, badge, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-semibold leading-none text-slate-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-between gap-1 select-none",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-1">
        {children}
        {required && <span className="text-[#D72DFC] font-bold">*</span>}
      </span>
      {badge && (
        <span className="text-[10px] font-normal text-purple-300 bg-purple-500/15 px-1.5 py-0.5 rounded">
          {badge}
        </span>
      )}
    </label>
  )
);
Label.displayName = "Label";

export { Label };
