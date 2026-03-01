"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Closing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".closing-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="register" ref={containerRef} className="py-24 md:py-40 px-6 bg-background text-secondary relative overflow-hidden flex flex-col items-center justify-center text-center">

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <p className="closing-text text-2xl md:text-4xl font-bold mb-6 leading-relaxed">
          שום דבר לא ישתנה מחר בבוקר.
        </p>
        <p className="closing-text text-2xl md:text-4xl font-bold mb-12 leading-relaxed text-secondary/60">
          אבל אם תתחיל להתאמן —<br/> <span className="text-primary text-3xl md:text-5xl font-black mt-2 inline-block">הכל יתחיל להשתנות בטווח הארוך.</span>
        </p>
        
        <p className="closing-text text-xl md:text-2xl font-medium mb-16 max-w-2xl text-secondary/80">
          אם אתה מוכן לקחת אחריות על החיים שלך ולא לחכות שמישהו יגדיר אותם עבורך — זה המקום.
        </p>

        <a
          href="#"
          className="closing-text group relative overflow-hidden bg-primary text-white px-10 py-5 rounded-full text-xl md:text-2xl font-black transition-transform hover:scale-[1.03] shadow-2xl shadow-primary/20"
          style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
        >
          <span className="relative z-10 flex items-center gap-3">
            אני רוצה להירשם
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 group-hover:-translate-x-1 transition-transform">
              <path d="m5 12 7-7 7 7"/>
              <path d="M12 19V5"/>
            </svg>
          </span>
          <div className="absolute inset-0 bg-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}
