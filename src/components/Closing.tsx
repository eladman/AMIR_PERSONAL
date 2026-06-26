"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "@/components/CTAButton";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";

export default function Closing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

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

    if (window.innerWidth >= 768 && !prefersReducedMotion()) {
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
      id="closing"
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

        {/* Title */}
        <h2 className="closing-text text-secondary font-black leading-tight mb-4 text-3xl md:text-5xl lg:text-6xl">
          בסוף הסדנה לא תצאו
          <br />
          רק עם{" "}
          <span className="relative inline-block">
            השראה
            {/* wavy orange underline */}
            <svg
              aria-hidden="true"
              className="absolute -bottom-2 right-0 w-full text-primary"
              viewBox="0 0 120 8"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6 C22 2, 42 6, 62 3 C82 0, 102 4, 118 2"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          .
        </h2>

        {/* Divider */}
        <div className="closing-text w-12 h-0.5 bg-primary mb-10 mt-2" />

        {/* Outcome list */}
        <ul className="closing-text mb-12 space-y-4 text-right w-full max-w-xl">
          {[
            "שיטה לקבל החלטות",
            "בהירות לגבי הכיוון שלכם",
            "כלים פרקטיים שיעזרו לכם להוביל את החיים במקום להגיב אליהם",
          ].map((item) => (
            <li key={item} className="flex items-start gap-4">
              <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
              <span className="text-secondary/80 text-lg md:text-xl font-medium leading-snug">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <div className="closing-text flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10 md:mb-16 text-secondary/70">
          <span className="inline-flex items-center gap-2 text-lg font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
            21.08.2026 · הפגודה, שדות ים
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-secondary/30" />
          <span className="inline-flex items-center gap-2 text-lg font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
            02.10.2026 · הפגודה, שדות ים
          </span>
        </div>

        <CTAButton
          ref={btnRef}
          size="lg"
          className="closing-cta shadow-2xl shadow-primary/30 hover:shadow-primary/50"
          icon={
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
          }
        >
          אני רוצה להירשם
        </CTAButton>
      </div>
    </section>
  );
}
