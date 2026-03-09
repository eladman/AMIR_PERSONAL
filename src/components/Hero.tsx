"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      // Reveal elements — runs synchronously before .from() sets opacity:0/transforms,
      // so no flash occurs (browser doesn't repaint mid-JS-execution)
      gsap.set(
        ".hero-float-img, .hero-subtitle, .hero-tagline, .hero-manifesto, .hero-cta, .hero-scroll-indicator, .hero-line-1, .hero-line-2",
        { visibility: "visible" }
      );

      // force3D ensures translate3d() is used, keeping animations on the GPU
      const tl = gsap.timeline({ defaults: { ease: "power3.out", force3D: true } });

      // Floating images entrance — slide up + fade
      tl.from(".hero-float-img", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Headline clip-reveal
      tl.from(
        ".hero-line-1",
        { yPercent: 100, duration: 1, ease: "power4.out" },
        "-=0.8"
      );
      tl.from(
        ".hero-line-2",
        { yPercent: 100, duration: 1, ease: "power4.out" },
        "-=0.7"
      );

      // Subtitle (above title)
      tl.from(
        ".hero-subtitle",
        { y: 20, opacity: 0, duration: 0.8 },
        "-=0.5"
      );

      // Tagline (below title)
      tl.from(
        ".hero-tagline",
        { y: 15, opacity: 0, duration: 0.7 },
        "-=0.4"
      );

      // Manifesto stagger
      tl.from(
        ".hero-manifesto",
        { y: 30, opacity: 0, duration: 0.8, stagger: 0.12 },
        "-=0.4"
      );

      // Accent line reveal
      tl.to(".hero-line-accent", { width: "80px", duration: 0.6, ease: "power2.out" }, "-=0.4");

      // CTA + scroll indicator
      tl.from(
        ".hero-cta",
        { y: 20, opacity: 0, duration: 0.8 },
        "-=0.3"
      );
      tl.from(
        ".hero-scroll-indicator",
        { opacity: 0, duration: 0.8 },
        "-=0.5"
      );

      // Continuous float/rotate loops — desktop only (images are hidden on mobile
      // but the tweens would still run and consume CPU/GPU time)
      if (!isMobile) {
        gsap.utils.toArray<HTMLElement>(".hero-float-img").forEach((img, i) => {
          gsap.to(img, {
            y: i % 2 === 0 ? -12 : 12,
            rotation: i % 2 === 0 ? 1.5 : -1.5,
            duration: 3 + i * 0.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            force3D: true,
          });
        });
      }

      // scrub: 1 adds 1s of lag-smoothing so animation chases the scroll
      // position instead of jumping on every frame — feels much smoother on
      // mobile devices that drop frames under scroll load.
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

      // Scroll-driven: images fade-out
      gsap.to(".hero-images", {
        opacity: 0,
        y: -40,
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
      className="relative w-full h-[100dvh] overflow-hidden bg-white"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      {/* Ambient orange orb */}
      <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.06] blur-[80px]"
        style={{ top: "10%", right: "-5%" }} />
      {/* Secondary cool orb */}
      <div className="ambient-orb w-[400px] h-[400px] bg-secondary/[0.03] blur-[60px]"
        style={{ animationDelay: "-3s", bottom: "5%", left: "0%" }} />

      {/* Geometric ring accent */}
      <div className="geo-ring w-[700px] h-[700px]"
        style={{ top: "50%", right: "-10%", transform: "translateY(-50%)" }} />

      {/* 2-column grid */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text side */}
        <div className="hero-content order-2 md:order-1 flex flex-col justify-center">
          {/* Subtitle */}
          <p className="hero-subtitle text-primary text-sm md:text-base tracking-[0.3em] uppercase font-bold mb-6">
            הסדנה של עמיר מנחם
          </p>

          {/* Headline */}
          <h1 className="mb-6 md:mb-8">
            <span className="split-line block">
              <span className="hero-line-1 block text-secondary text-8xl sm:text-8xl md:text-8xl lg:text-[10rem] font-black leading-[0.9]">
                מאפס
              </span>
            </span>
            <span className="split-line block">
              <span className="hero-line-2 block text-primary text-8xl sm:text-8xl md:text-8xl lg:text-[10rem] font-black leading-[0.9]">
                לאחד
              </span>
            </span>
          </h1>

          {/* Subtitle tagline */}
          <p className="hero-tagline text-secondary/50 text-lg md:text-2xl font-light mb-6 md:mb-8 tracking-wide">
            איך הופכים שאיפות למעשים...
          </p>

          {/* Accent line */}
          <div className="hero-line-accent w-0 h-[2px] bg-primary/30 rounded-full mb-6" />

          {/* Manifesto */}
          <div className="flex flex-col gap-1 md:gap-2 mb-6 md:mb-10 max-w-xl">
            <p className="hero-manifesto text-secondary/90 text-xl md:text-2xl font-medium">
              יש רגע בו אתה מבין.
            </p>
            <p className="hero-manifesto text-secondary/60 text-lg md:text-xl">
              אף אחד לא יבוא לשנות לך את החיים.
            </p>
            <p className="hero-manifesto text-secondary/60 text-lg md:text-xl">
              לא המדינה, לא הבוס, לא אלגוריתם.
            </p>
            <p className="hero-manifesto text-primary text-xl md:text-2xl font-bold mt-1">
              טל הדר, כפר מונש - עמק חפר
            </p>
          </div>

          {/* Date, Time & Location badge */}
          <div className="hero-manifesto flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 bg-secondary/5 border border-secondary/10 rounded-full px-4 py-2 text-sm font-bold text-secondary/80">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              10.4.2026
            </span>
            <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-bold text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              09:00 – 14:30
            </span>
            <span className="inline-flex items-center gap-2 bg-secondary/5 border border-secondary/10 rounded-full px-4 py-2 text-sm font-bold text-secondary/80">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              טל הדר, כפר מונש - עמק חפר
            </span>
          </div>

          {/* CTA */}
          <Link
            href="/register"
            className="hero-cta group relative inline-flex overflow-hidden bg-primary text-white px-8 py-4 rounded-full text-lg md:text-xl font-bold transition-transform hover:scale-[1.03] active:scale-95 w-fit"
          >
            <span className="relative z-10">אני רוצה להירשם</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </div>

        {/* Image side — floating gallery */}
        <div className="hero-images hidden md:flex order-1 md:order-2 relative h-[45vh] md:h-[80vh] items-center justify-center">
          {/* Image 1 — main, centered-right */}
          <div className="hero-float-img absolute top-[10%] right-[5%] md:right-[10%] w-[65%] md:w-[60%] aspect-[3/4] rounded-[2rem] overflow-hidden border border-secondary/10 shadow-[0_8px_40px_rgba(255,135,20,0.15)] group">
            <Image
              src="/images/pic_10.jpeg"
              alt="סדנה מאפס לאחד"
              fill
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-[transform,filter] duration-700 scale-105 group-hover:scale-100"
              sizes="(max-width: 768px) 55vw, 30vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
          </div>

          {/* Image 2 — bottom-left, overlapping */}
          <div className="hero-float-img absolute bottom-[5%] left-[0%] md:left-[5%] w-[50%] md:w-[45%] aspect-[4/3] rounded-[2rem] overflow-hidden border border-secondary/10 shadow-[0_8px_40px_rgba(255,135,20,0.12)] group">
            <Image
              src="/images/pic_8.jpeg"
              alt="אווירת הסדנה"
              fill
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-[transform,filter] duration-700 scale-105 group-hover:scale-100"
              sizes="(max-width: 768px) 45vw, 22vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
          </div>

          {/* Image 3 — top-left, smaller accent */}
          <div className="hero-float-img hidden sm:block absolute top-[5%] left-[10%] md:left-[0%] w-[35%] md:w-[35%] aspect-[3/4] rounded-[2rem] overflow-hidden border border-secondary/10 shadow-[0_8px_40px_rgba(255,135,20,0.10)] group">
            <Image
              src="/images/pic_7.jpeg"
              alt="אווירת הסדנה"
              fill
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-[transform,filter] duration-700 scale-105 group-hover:scale-100"
              sizes="(max-width: 768px) 35vw, 17vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-secondary/40 text-xs tracking-widest uppercase">גלול</span>
        <div className="w-[1px] h-8 bg-secondary/20 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-full bg-primary animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
