"use client";

import Link from "next/link";
import { forwardRef, type ReactNode } from "react";

// Single source of truth for the registration link, previously duplicated
// across Hero, Navbar and Closing.
export const REGISTRATION_URL =
  "https://zygo.co.il/event/710553243573321580/ZF10o46f2";

type CTAButtonProps = {
  children: ReactNode;
  /** sm = navbar, md = hero, lg = closing climax */
  size?: "sm" | "md" | "lg";
  href?: string;
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
const CTAButton = forwardRef<HTMLAnchorElement, CTAButtonProps>(
  function CTAButton(
    { children, size = "md", href = REGISTRATION_URL, className = "", icon },
    ref
  ) {
    return (
      <Link
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative inline-flex items-center overflow-hidden rounded-full bg-primary font-bold text-white transition-[transform,box-shadow] duration-300 hover:scale-[1.03] active:scale-95 ${sizeClasses[size]} ${className}`}
      >
        <span className="relative z-10 flex items-center gap-3">
          {children}
          {icon}
        </span>
        <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
      </Link>
    );
  }
);

export default CTAButton;
