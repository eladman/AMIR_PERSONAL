"use client";

import { forwardRef, type ReactNode } from "react";
import { useRegistration } from "@/components/RegistrationModal";

// Registration no longer links straight to a single Zygo page — there are two
// workshop dates. Every CTA opens the shared date-selection modal instead.
// (The modal owns the per-date links; see RegistrationModal.tsx.)

type CTAButtonProps = {
  children: ReactNode;
  /** sm = navbar, md = hero, lg = closing climax */
  size?: "sm" | "md" | "lg";
  /** Extra classes for context: GSAP target hooks, contextual shadow, etc. */
  className?: string;
  /** Optional trailing icon (slides on hover). */
  icon?: ReactNode;
};

const sizeClasses: Record<NonNullable<CTAButtonProps["size"]>, string> = {
  sm: "px-5 py-1.5 text-sm",
  md: "px-10 py-4 text-lg md:text-xl",
  lg: "px-8 py-4 md:px-12 md:py-6 text-xl md:text-2xl",
};

// One register button: same shape, weight, hover overlay, and white text on
// orange. Note: white-on-orange is ~2.4:1, below WCAG-AA (4.5:1).
const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  function CTAButton({ children, size = "md", className = "", icon }, ref) {
    const { open } = useRegistration();

    return (
      <button
        ref={ref}
        type="button"
        onClick={open}
        className={`group relative inline-flex cursor-pointer items-center overflow-hidden rounded-full bg-primary font-bold text-white transition-[transform,box-shadow] duration-300 hover:scale-[1.03] active:scale-95 ${sizeClasses[size]} ${className}`}
      >
        <span className="relative z-10 flex items-center gap-3">
          {children}
          {icon}
        </span>
        <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
      </button>
    );
  }
);

export default CTAButton;
