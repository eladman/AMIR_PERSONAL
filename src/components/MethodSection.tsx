"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";

const pillars = ["קבלת החלטות", "דיוק", "תנועה קדימה"];

export default function MethodSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      gsap.from(".method-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // The "0 → 1" headline draws attention with a scale pop
      gsap.from(".method-zero, .method-one", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        scale: 0.6,
        opacity: 0,
        duration: 0.9,
        stagger: 0.25,
        ease: "back.out(1.7)",
      });

      gsap.from(".method-arrow", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        scaleX: 0,
        opacity: 0,
        transformOrigin: "right center",
        duration: 0.8,
        delay: 0.35,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="method"
      ref={containerRef}
      className="relative overflow-hidden bg-secondary text-white py-24 md:py-32 px-6"
    >
      {/* Decorative layers (hidden on mobile via globals.css) */}
      <div
        className="ambient-orb w-[600px] h-[600px] bg-primary/[0.06] blur-[90px]"
        style={{ top: "-8rem", right: "-6rem" }}
      />
      <div
        className="geo-ring w-[480px] h-[480px]"
        style={{ bottom: "-12rem", left: "-8rem" }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Eyebrow */}
        <SectionLabel className="method-anim mb-8">המתודה</SectionLabel>

        {/* 1 ← 0 visual */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-10" dir="ltr">
          <span className="method-one text-7xl md:text-9xl font-black text-primary leading-none select-none">
            1
          </span>
          <svg
            className="method-arrow shrink-0 w-16 md:w-28 text-primary"
            height="20"
            viewBox="0 0 112 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M112 10H14M14 10L26 4M14 10L26 16"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="method-zero text-7xl md:text-9xl font-black text-white/15 leading-none select-none">
            0
          </span>
        </div>

        {/* Headline */}
        <h2 className="method-anim text-4xl md:text-6xl font-black leading-tight mb-8">
          מאפס. <span className="text-primary">לאחד.</span>
        </h2>

        {/* Body */}
        <p className="method-anim text-xl md:text-2xl leading-relaxed text-white/75 font-medium max-w-3xl mx-auto">
          <span className="text-white font-bold">״אפס״</span> הוא הרגע שבו הכל עדיין פוטנציאל - רעיון, שאיפה, תחושה שאפשר יותר.{" "}
          <span className="text-white font-bold">״אחד״</span> הוא הצעד הראשון הממשי שהופך את זה למשהו אמיתי. הסדנה היא כלי ליצירת הגשר בין השניים
        </p>

        {/* Pillars */}
        <div className="method-anim flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-12">
          {pillars.map((pillar, i) => (
            <div key={i} className="flex items-center gap-4 md:gap-6">
              {i > 0 && <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />}
              <span className="text-lg md:text-2xl font-bold text-white/90">
                {pillar}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
