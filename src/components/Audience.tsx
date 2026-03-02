"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const audienceList = [
  "לאנשים שמרגישים שהם יכולים יותר",
  "לאנשים שלא מחפשים עוד תוכן — אלא דרך",
  "לאנשים שמבינים שהעתיד לא יציב, ולכן צריך לבנות יציבות פנימית",
];

export default function Audience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header dramatic entrance
      gsap.from(".audience-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Items slide in from right (RTL) with stagger
      gsap.from(".audience-item", {
        scrollTrigger: {
          trigger: ".audience-list",
          start: "top 85%",
        },
        x: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Numbers pop in
      gsap.from(".audience-number", {
        scrollTrigger: {
          trigger: ".audience-list",
          start: "top 85%",
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 0.3,
      });

      // Line draw per item
      gsap.utils.toArray<HTMLElement>(".audience-item").forEach((item) => {
        const line = item.querySelector(".audience-line");
        if (!line) return;
        gsap.from(line, {
          scrollTrigger: { trigger: item, start: "top 85%" },
          scaleX: 0, transformOrigin: "right center", duration: 0.8, ease: "power2.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="audience"
      ref={containerRef}
      className="py-24 md:py-32 px-6 bg-white text-secondary relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="audience-header mb-16 md:mb-20">
          <h2 className="text-primary font-bold text-sm md:text-base mb-4 tracking-[0.3em] uppercase">
            למי זה מיועד?
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight">
            האם המקום הזה{" "}
            <span className="text-primary">עבורך?</span>
          </h3>
        </div>

        {/* Decorative background text */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[300px] font-black text-secondary/[0.025] leading-none select-none pointer-events-none whitespace-nowrap" aria-hidden="true">
          עשייה
        </div>

        {/* Line-style items */}
        <div className="audience-list flex flex-col">
          {audienceList.map((item, index) => (
            <div
              key={index}
              className="audience-item group flex items-center gap-6 md:gap-10 py-8 md:py-10 border-b border-secondary/10 hover:border-primary/30 transition-colors cursor-default"
            >
              {/* Large faded number */}
              <span className="audience-number text-5xl md:text-7xl font-black text-secondary/10 group-hover:text-primary/40 transition-colors duration-300 shrink-0 w-20 md:w-28 text-center">
                0{index + 1}
              </span>

              {/* Divider line */}
              <span className="audience-line hidden md:block w-12 group-hover:w-20 h-[2px] bg-secondary/20 group-hover:bg-primary transition-all duration-500 shrink-0" />

              {/* Text */}
              <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-secondary/70 group-hover:text-secondary transition-colors duration-300">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
