// Shared check for the OS "reduce motion" setting. Used to skip GSAP entrance
// and scroll-reveal animations so the whole page respects the preference, not
// just the CSS keyframes and the Hero slideshow.
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
