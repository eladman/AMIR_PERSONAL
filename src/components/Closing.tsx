"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Closing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Text timeline reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".closing-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });

      // CTA scales up with spring
      tl.from(
        ".closing-cta",
        { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3"
      );

      // Ring entrance
      gsap.from(".closing-ring", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        scale: 0.3, opacity: 0, duration: 2, ease: "power3.out",
      });
    }, containerRef);

    // Magnetic button effect — desktop only
    const btn = btnRef.current;
    if (!btn) return () => ctx.revert();

    if (window.innerWidth >= 768) {
      const handleMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      };

      btn.addEventListener("mousemove", handleMove);
      btn.addEventListener("mouseleave", handleLeave);

      return () => {
        ctx.revert();
        btn.removeEventListener("mousemove", handleMove);
        btn.removeEventListener("mouseleave", handleLeave);
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="register"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-white"
    >
      {/* Crosshatch background texture */}
      <div className="absolute inset-0 bg-crosshatch pointer-events-none" />

      {/* Main ambient orb */}
      <div className="ambient-orb w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-primary/[0.07] blur-[100px]"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

      {/* Concentric rotating rings */}
      <div className="closing-ring geo-ring w-[300px] md:w-[500px] h-[300px] md:h-[500px]"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      <div className="closing-ring geo-ring w-[450px] md:w-[750px] h-[450px] md:h-[750px]"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", animationDirection: "reverse", animationDuration: "60s", borderColor: "rgba(23,23,23,0.05)" }} />

      {/* Corner bracket accents */}
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-primary/20 rounded-tr-lg" />
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-lg" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-lg" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary/20 rounded-bl-lg" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
        <p className="closing-text text-secondary text-2xl md:text-4xl font-bold mb-6 leading-relaxed">
          שום דבר לא ישתנה מחר בבוקר.
        </p>
        <p className="closing-text text-secondary/50 text-2xl md:text-4xl font-bold mb-4 leading-relaxed">
          אבל אם תתחיל להתאמן —
        </p>
        <p className="closing-text text-primary text-3xl md:text-5xl lg:text-6xl font-black mb-12 leading-tight">
          הכל יתחיל להשתנות בטווח הארוך.
        </p>

        <p className="closing-text text-secondary/50 text-lg md:text-xl font-medium mb-10 md:mb-16 max-w-2xl">
          אם אתה מוכן לקחת אחריות על החיים שלך ולא לחכות שמישהו יגדיר אותם
          עבורך — זה המקום.
        </p>

        <a
          ref={btnRef}
          href="#"
          className="closing-cta group relative inline-flex overflow-hidden bg-primary text-secondary px-8 py-4 md:px-12 md:py-6 rounded-full text-xl md:text-2xl font-black shadow-2xl shadow-primary/30 transition-shadow hover:shadow-primary/50"
        >
          <span className="relative z-10 flex items-center gap-3 text-[rgba(255,255,240,1)]">
            אני רוצה להירשם
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rotate-180 group-hover:-translate-x-1 transition-transform"
            >
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}
