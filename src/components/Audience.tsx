"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";

const audienceList = [
  "לאנשים שרוצים ליזום ולהוביל ",
  "לאנשים שלא מחפשים רק תוכן, אלא דרך ותהליך ",
  "לאנשים שמרגישים שהם יכולים יותר",
];

export default function Audience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

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
          <SectionLabel className="mb-4">למי זה מיועד?</SectionLabel>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight">
            האם המקום הזה{" "}
            <span className="text-primary">עבורך?</span>
          </h2>
          <p className="mt-6 text-lg md:text-2xl text-secondary/60 font-medium max-w-2xl leading-relaxed">
            הסדנה נפתחת לקבוצה מצומצמת ומדויקת — לא לכולם, אלא למי שבאמת מוכן לזוז.
          </p>
        </div>

        {/* Line-style items */}
        <div className="audience-list flex flex-col">
          {audienceList.map((item, index) => (
            <div
              key={index}
              className="audience-item group flex items-center gap-4 md:gap-6 lg:gap-10 py-6 md:py-8 lg:py-10 border-b border-secondary/10 hover:border-primary/30 transition-colors cursor-default"
            >
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
