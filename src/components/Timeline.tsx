"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";

const stages = [
  {
    time: "09:00",
    title: "התכנסות ופתיחה",
    detail: "קפה, הכרות, והנחת היסוד למסע של היום.",
  },
  {
    time: "09:30",
    title: "החלטות",
    detail:
      "שיטה לקבל החלטות גדולות בלי להיתקע — להבחין בין מה שאתה באמת רוצה לבין רעשי הרקע והציפיות של הסביבה.",
  },
  {
    time: "11:00",
    title: "הפסקה בטבע · תנועה",
    detail: "יציאה החוצה, אוויר, ועיבוד אישי של מה שעלה עד עכשיו.",
  },
  {
    time: "11:30",
    title: "דיוק עצמי",
    detail:
      'המעבר מ״מה אני״ ל״מי אני״ — זיהוי הערכים שמובילים אותך ובניית חזון אישי לשנים הקרובות.',
  },
  {
    time: "13:00",
    title: "יזמות ותנועה קדימה",
    detail:
      "להפוך רעיון לתוכנית פעולה, וליצור השפעה — גם בלי תפקיד ניהולי. הרגלים של אנשים שמייצרים הזדמנויות.",
  },
  {
    time: "14:00",
    title: "הצעד הראשון",
    detail:
      'סיכום, מחויבות אישית, והגדרת ה״אחד״ הקונקרטי שאיתו יוצאים מהיום.',
  },
  {
    time: "14:30",
    title: "סיום",
    detail: "",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  // First content stage open by default so the value is immediately visible.
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".timeline-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".timeline-stage", {
        scrollTrigger: {
          trigger: ".timeline-list",
          start: "top 85%",
        },
        x: 60, // slide in from the right (RTL)
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Draw the vertical rail as the section enters
      gsap.from(".timeline-rail", {
        scrollTrigger: {
          trigger: ".timeline-list",
          start: "top 85%",
        },
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.1,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative overflow-hidden bg-secondary text-white py-24 md:py-32 px-6"
    >
      <div
        className="ambient-orb w-[500px] h-[500px] bg-primary/[0.05] blur-[90px]"
        style={{ bottom: "-6rem", right: "-5rem" }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="timeline-header mb-14 md:mb-20">
          <h2 className="text-primary font-bold text-sm md:text-base mb-4 tracking-[0.3em] uppercase">
            מה קורה ביום עצמו?
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            5.5 שעות, <span className="text-primary">צעד אחר צעד.</span>
          </h3>
          <p className="mt-6 text-lg md:text-xl text-white/60 font-medium">
            לחצו על כל שלב כדי לגלות מה מתרחש בו.
          </p>
        </div>

        {/* Timeline list with right-anchored rail */}
        <div className="timeline-list relative pr-8 md:pr-12">
          {/* Vertical rail (RTL: on the right) */}
          <div className="timeline-rail absolute top-2 bottom-2 right-[5px] md:right-[7px] w-[2px] bg-white/10" />

          <div className="flex flex-col">
            {stages.map((stage, index) => {
              const isOpen = activeIndex === index;
              const hasDetail = stage.detail.length > 0;

              return (
                <div key={index} className="timeline-stage relative">
                  {/* Node on the rail */}
                  <span
                    className={`absolute -right-8 md:-right-12 top-[26px] w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-colors duration-300 ${
                      isOpen
                        ? "bg-primary border-primary"
                        : "bg-secondary border-white/30"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => hasDetail && toggle(index)}
                    disabled={!hasDetail}
                    className={`w-full text-right flex items-center gap-4 md:gap-6 py-5 md:py-6 border-b border-white/10 transition-colors ${
                      hasDetail ? "group cursor-pointer" : "cursor-default"
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span className="font-mono text-lg md:text-2xl font-bold text-primary shrink-0 w-16 md:w-20">
                      {stage.time}
                    </span>
                    <span
                      className={`flex-1 text-xl md:text-2xl font-bold transition-colors ${
                        isOpen ? "text-white" : "text-white/80 group-hover:text-white"
                      }`}
                    >
                      {stage.title}
                    </span>
                    {hasDetail && (
                      <Plus
                        size={22}
                        className={`shrink-0 text-primary transition-transform duration-300 ${
                          isOpen ? "rotate-45" : "group-hover:rotate-90"
                        }`}
                      />
                    )}
                  </button>

                  {/* Expandable detail */}
                  {hasDetail && (
                    <div
                      className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.2,1)]"
                      style={{
                        maxHeight: isOpen ? "200px" : "0px",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <p className="text-lg md:text-xl leading-relaxed text-white/70 font-medium pr-20 md:pr-[6.5rem] py-4">
                        {stage.detail}
                      </p>
                    </div>
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
