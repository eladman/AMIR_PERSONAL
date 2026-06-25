"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";

const AUTOPLAY_MS = 6500;

const testimonials = [
  "לקחתי הרבה, בעיקר נקודות למחשבה והתעסקות בהחלטות שהיו יותר אותנטיות בעתיד",
  "הסדנה העלתה לי המון שאלות לעצמי שאני חוקר וסקרן לחקור עוד, שזה בעייני הדבר הכי חשוב",
  "סדנה מרגשת, ממש עוברים תהליך",
  "הכנות, האנרגיה והגישה של עמיר השאירו עליי רושם גדול. אדם מעורר השראה, ורואים שפועל מתוך תשוקה ואמונה במה שעושה",
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const goTo = useCallback(
    (next: number) => setIndex((next + total) % total),
    [total]
  );

  // Auto-advance — pauses on hover/focus and when tab is hidden.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, goTo]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Entrance animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".testimonials-reveal", {
        scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
        y: 50,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const pad = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative overflow-hidden bg-secondary text-white py-28 md:py-40 px-6"
    >
      {/* Single soft, off-center accent — restrained, not symmetric */}
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/[0.07] blur-[120px]" />

      <div
        className="mx-auto max-w-4xl relative z-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Eyebrow */}
        <SectionLabel withLine className="testimonials-reveal mb-12 md:mb-16">
          קולות מהסדנה הראשונה
        </SectionLabel>

        {/* Quote stage */}
        <div
          className="testimonials-reveal relative"
          role="region"
          aria-roledescription="קרוסלת ציטוטים"
          aria-label="מה אמרו המשתתפים"
        >
          <blockquote
            key={index}
            aria-live="polite"
            className="testimonial-enter relative min-h-[8.5rem] md:min-h-[11rem]"
          >
            <p className="text-center font-light text-2xl md:text-4xl lg:text-5xl leading-[1.4] md:leading-[1.35] tracking-tight text-white/90 [text-wrap:balance]">
              {`”${testimonials[index]}”`}
            </p>
          </blockquote>
        </div>

        {/* Controls row */}
        <div className="testimonials-reveal mt-12 md:mt-16 flex items-center justify-between gap-6">
          {/* Counter — tabular so it doesn't shift */}
          <div className="font-bold text-sm md:text-base text-white/40 tabular-nums tracking-widest shrink-0">
            <span className="text-primary">{pad(index)}</span>
            <span className="mx-1.5">/</span>
            <span>{pad(total - 1)}</span>
          </div>

          {/* Prev / Next (RTL: prev = ►, next = ◄) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => goTo(index - 1)}
              aria-label="הציטוט הקודם"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary focus-visible:outline-none transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="הציטוט הבא"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary focus-visible:outline-none transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
