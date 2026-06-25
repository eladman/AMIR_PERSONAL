"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

// Cinematic background carousel — workshop atmosphere images crossfade behind the title.
const SLIDES = [
  "/images/workshop/IMG_3450.jpg.png",
  "/images/workshop/IMG_3454.jpg.png",
  "/images/workshop/IMG_3457.jpg.png",
  "/images/workshop/IMG_3459.jpg.png",
  "/images/workshop/IMG_3461.jpg.png",
  "/images/workshop/IMG_3456.jpg.png",
];

const SLIDE_DURATION = 5000; // ms each image stays before crossfading

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Auto-advance the background slideshow (respects reduced-motion).
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      // Reveal elements — runs synchronously before .from() sets opacity:0/transforms,
      // so no flash occurs (browser doesn't repaint mid-JS-execution)
      gsap.set(
        ".hero-subtitle, .hero-tagline, .hero-cta, .hero-badges, .hero-scroll-indicator, .hero-line-1, .hero-line-2",
        { visibility: "visible" }
      );

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", force3D: true },
      });

      // Eyebrow / subtitle (above title)
      tl.from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.8 });

      // Headline clip-reveal
      tl.from(
        ".hero-line-1",
        { yPercent: 100, duration: 1, ease: "power4.out" },
        "-=0.4"
      );
      tl.from(
        ".hero-line-2",
        { yPercent: 100, duration: 1, ease: "power4.out" },
        "-=0.75"
      );

      // Tagline (below title)
      tl.from(".hero-tagline", { y: 15, opacity: 0, duration: 0.7 }, "-=0.4");

      // Accent line reveal
      tl.to(
        ".hero-line-accent",
        { width: "80px", duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      // Badges + CTA + scroll indicator
      tl.from(
        ".hero-badges",
        { y: 20, opacity: 0, duration: 0.7 },
        "-=0.3"
      );
      tl.from(".hero-cta", { y: 20, opacity: 0, duration: 0.8 }, "-=0.4");
      tl.from(
        ".hero-scroll-indicator",
        { opacity: 0, duration: 0.8 },
        "-=0.5"
      );

      const scrubValue = isMobile ? 1.5 : 1;

      // Scroll-driven: content fade-out
      gsap.to(".hero-content", {
        opacity: 0,
        y: -60,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "30% top",
          end: "bottom top",
          scrub: scrubValue,
        },
      });

      // Scroll progress bar
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-secondary"
    >
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <Image
              src={src}
              alt="אווירת הסדנה מאפס לאחד"
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${
                i === active ? "hero-kenburns" : ""
              }`}
            />
          </div>
        ))}
      </div>

      {/* Dark readability layers — gradient bottom→top plus a flat scrim */}
      <div className="absolute inset-0 bg-secondary/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-secondary/70 pointer-events-none" />

      {/* Centered cinematic content */}
      <div className="relative z-10 h-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <div className="hero-content flex flex-col items-center">
          {/* Eyebrow / subtitle */}
          <p className="hero-subtitle text-primary text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-6">
            סדנת יום אחד · עמיר מנחם
          </p>

          {/* Headline */}
          <h1 className="mb-6 md:mb-8">
            <span className="split-line block overflow-hidden">
              <span className="hero-line-1 block text-white text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black leading-[0.85] drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                מאפס
              </span>
            </span>
            <span className="split-line block overflow-hidden">
              <span className="hero-line-2 block text-primary text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black leading-[0.85] drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                לאחד
              </span>
            </span>
          </h1>

          {/* Subtitle tagline */}
          <p className="hero-tagline text-white/80 text-xl md:text-3xl font-light tracking-wide mb-6">
            איך הופכים שאיפות למעשים...
          </p>

          {/* Accent line */}
          <div className="hero-line-accent w-0 h-[2px] bg-primary rounded-full mb-8" />

          {/* Date, Time & Location badges */}
          <div className="hero-badges flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
              21.08.2026 · טל והדר, עמק חפר
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
              02.10.2026 · הפגודה, שדות ים
            </span>
            <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-2 text-sm font-bold text-primary backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              09:00 – 14:30
            </span>
          </div>

          {/* CTA */}
          <Link
            href="https://zygo.co.il/event/710553243573321580/ZF10o46f2"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta group relative inline-flex overflow-hidden bg-primary text-white px-10 py-4 rounded-full text-lg md:text-xl font-bold transition-transform hover:scale-[1.03] active:scale-95 shadow-[0_8px_40px_rgba(255,135,20,0.4)]"
          >
            <span className="relative z-10">אני רוצה להירשם</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/50 text-xs tracking-widest uppercase">גלול</span>
        <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-full bg-primary animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
