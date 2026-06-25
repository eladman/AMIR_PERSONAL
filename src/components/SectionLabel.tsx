import type { ElementType, ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  /** GSAP hooks + spacing (e.g. mb-8, method-anim). */
  className?: string;
  /** Leading accent line — use on left-aligned labels, omit on centered ones. */
  withLine?: boolean;
  /** Rendered element. Eyebrows are NOT headings; default to <p>. */
  as?: ElementType;
};

// One eyebrow style for every section. Previously each section invented its own
// size (xs/sm/base/xl), tracking (0.3em/0.32em/widest), and line treatment.
const BASE =
  "text-primary font-bold text-sm md:text-base tracking-[0.3em] uppercase";

export default function SectionLabel({
  children,
  className = "",
  withLine = false,
  as: Tag = "p",
}: SectionLabelProps) {
  if (withLine) {
    return (
      <Tag className={`inline-flex items-center gap-4 ${BASE} ${className}`}>
        <span
          aria-hidden="true"
          className="w-10 h-[2px] bg-primary rounded-full shrink-0"
        />
        {children}
      </Tag>
    );
  }
  return <Tag className={`${BASE} ${className}`}>{children}</Tag>;
}
