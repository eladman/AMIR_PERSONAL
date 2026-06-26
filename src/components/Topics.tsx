"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";
import { prefersReducedMotion } from "@/lib/prefersReducedMotion";

const topics = [
  {
    id: 1,
    title: "החלטות",
    essence: "לקבל החלטות גדולות בלי להיתקע.",
    description: "שיטה לקבל החלטות גדולות בלי להיתקע בהתלבטויות אינסופיות. כלים להבחין בין מה שאני באמת רוצה לבין רעשי רקע וציפיות של הסביבה. מודל פרקטי לקבלת החלטות בקריירה, זוגיות ולימודים.",
  },
  {
    id: 2,
    title: 'דיוק עצמי',
    essence: 'מעבר מ"מה אני" ל"מי אני".',
    description: "תהליך לזיהוי הערכים והעקרונות שמובילים את החיים שלך. בניית חזון אישי לשנים הקרובות. הגדרת זהות אישית שתעזור לך לקבל החלטות בצורה ברורה יותר.",
  },
  {
    id: 3,
    title: "יזמות והשפעה",
    essence: "להפוך רעיון לתנועה קדימה.",
    description: "איך לקחת רעיון ולהפוך אותו לתוכנית פעולה. כלים להובלת אנשים ויצירת השפעה גם בלי תפקיד ניהולי. בניית הרגלים של אנשים שמייצרים הזדמנויות במקום לחכות להן.",
  },
];

export default function Topics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      gsap.from(".topic-title-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".topic-card", {
        scrollTrigger: {
          trigger: ".topic-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="topics" ref={containerRef} className="py-24 md:py-32 px-6 bg-secondary relative overflow-hidden">
      {/* Decorative glow */}
      <div className="hidden md:block absolute top-0 left-0 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/3 translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <SectionLabel withLine className="topic-title-anim mb-4">
            על מה נעבוד?
          </SectionLabel>
          <h2 className="topic-title-anim text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1]">
            הכלים שייקחו אותך{" "}
            <span className="text-primary relative inline-block">
              לשלב הבא
              <svg className="absolute -bottom-2 right-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="topic-title-anim mt-8 text-xl text-white/50 leading-relaxed font-medium">
            הסדנה בנויה כהליך התפתחותי, שלב אחר שלב. לפניכם שלושת השלבים שנעבור יחד.
          </p>
        </div>

        {/* Connected stepper */}
        <div className="topic-grid relative">
          {/* Horizontal progress line — aligned to node centers (desktop) */}
          <div className="hidden md:block absolute top-7 left-[16.666%] right-[16.666%] h-px bg-gradient-to-l from-primary/0 via-primary/40 to-primary/0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 lg:gap-x-8 gap-y-0 relative">
            {topics.map((topic, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={topic.id} className="topic-card flex flex-col items-center">
                  {/* Numbered node sitting on the line */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-label={`${topic.title} — ${isOpen ? "סגירה" : "הרחבה"}`}
                    className={`relative z-10 flex items-center justify-center w-14 h-14 rounded-full font-black text-lg cursor-pointer transition-all duration-300 ${
                      isOpen
                        ? "bg-primary text-secondary border-2 border-primary shadow-[0_0_30px_rgba(255,135,20,0.5)] scale-105"
                        : "bg-secondary text-primary border-2 border-primary/40 hover:border-primary hover:scale-105"
                    }`}
                  >
                    {index + 1}
                  </button>

                  {/* Connector stub from node down to card */}
                  <div
                    className={`w-px h-5 transition-colors duration-300 ${
                      isOpen ? "bg-primary/60" : "bg-primary/25"
                    }`}
                  />

                  {/* Card */}
                  <div
                    className={`w-full flex flex-col flex-1 text-center border rounded-card p-7 lg:p-8 transition-all duration-300 ${
                      isOpen
                        ? "bg-white/[0.07] border-primary/40 shadow-[0_8px_40px_-12px_rgba(255,135,20,0.35)]"
                        : "bg-white/[0.04] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                    }`}
                  >
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                      {topic.title}
                    </h3>

                    {/* Essence — always visible */}
                    <p className="text-base md:text-lg text-primary font-bold leading-relaxed flex-1">
                      {topic.essence}
                    </p>

                    {/* Expand button */}
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex items-center justify-center gap-2 mt-7 text-white/40 text-sm font-medium hover:text-primary transition-colors duration-200 cursor-pointer mx-auto"
                      aria-expanded={isOpen}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                      {isOpen ? "סגירה" : "לחיצה להרחבה"}
                    </button>

                    {/* Collapsible description */}
                    <div
                      style={{
                        maxHeight: isOpen ? "300px" : "0px",
                        opacity: isOpen ? 1 : 0,
                      }}
                      className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.2,1)]"
                    >
                      <p className="text-sm lg:text-base text-white/50 leading-relaxed font-medium mt-5 border-t border-white/10 pt-5 text-right">
                        {topic.description}
                      </p>
                    </div>
                  </div>

                  {/* Vertical connector between steps (mobile only) */}
                  {index < topics.length - 1 && (
                    <div className="md:hidden w-px h-8 bg-gradient-to-b from-primary/40 to-primary/10" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
