"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pre-set initial states — prevents flash before timeline reaches each element
      gsap.set(".hero-float-img", { y: 80, opacity: 0 });
      gsap.set(".hero-line-1", { yPercent: 100 });
      gsap.set(".hero-line-2", { yPercent: 100 });
      gsap.set(".hero-subtitle", { y: 20, opacity: 0 });
      gsap.set(".hero-manifesto", { y: 30, opacity: 0 });
      gsap.set(".hero-cta", { y: 20, opacity: 0 });
      gsap.set(".hero-scroll-indicator", { opacity: 0 });

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

      // Subtitle
      tl.from(
        ".hero-subtitle",
        { y: 20, opacity: 0, duration: 0.8 },
        "-=0.5"
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

      // Continuous float loops for images — rotation skipped on mobile (too expensive)
      const isMobile = window.innerWidth < 768;
      gsap.utils.toArray<HTMLElement>(".hero-float-img").forEach((img, i) => {
        gsap.to(img, {
          y: `${i % 2 === 0 ? "-" : ""}${isMobile ? 6 : 12}`,
          ...(isMobile ? {} : { rotation: i % 2 === 0 ? 1.5 : -1.5 }),
          duration: 3 + i * 0.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          overwrite: "auto",
        });
      });

      // Scroll-driven: content fade-out
      gsap.to(".hero-content", {
        opacity: 0,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "30% top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Scroll-driven: images fade-out
      gsap.to(".hero-images", {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "30% top",
          end: "bottom top",
          scrub: true,
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
              רק אתה.
            </p>
          </div>

          {/* CTA */}
          <a
            href="#register"
            className="hero-cta group relative inline-flex overflow-hidden bg-primary text-white px-8 py-4 rounded-full text-lg md:text-xl font-bold transition-transform hover:scale-[1.03] active:scale-95 w-fit"
          >
            <span className="relative z-10">אני רוצה להירשם</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </div>

        {/* Image side — floating gallery */}
        <div className="hero-images hidden md:flex order-1 md:order-2 relative h-[45vh] md:h-[80vh] items-center justify-center">
          {/* Image 1 — main, centered-right */}
          <div className="hero-float-img absolute top-[10%] right-[5%] md:right-[10%] w-[65%] md:w-[60%] aspect-[3/4] rounded-[2rem] overflow-hidden border border-secondary/10 shadow-[0_8px_40px_rgba(255,135,20,0.15)] group">
            <Image
              src="/images/pic_10.jpeg"
              alt="סדנה מאפס לאחד"
              fill
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
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
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
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
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
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
