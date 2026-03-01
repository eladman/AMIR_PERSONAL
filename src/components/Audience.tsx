"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

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
      gsap.from(".audience-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".audience-item", {
        scrollTrigger: {
          trigger: ".audience-list",
          start: "top 85%",
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="audience" ref={containerRef} className="py-24 md:py-32 px-6 bg-background text-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="audience-header mb-16">
          <h2 className="text-primary font-bold text-xl mb-4 uppercase tracking-widest">
            למי זה מיועד?
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black">
            האם המקום הזה <br className="md:hidden" />
            <span className="text-primary">עבורך?</span>
          </h3>
        </div>

        <div className="audience-list flex flex-col gap-6 items-start text-right max-w-2xl mx-auto">
          {audienceList.map((item, index) => (
            <div 
              key={index}
              className="audience-item flex items-center gap-6 bg-secondary/5 border border-secondary/10 w-full p-6 md:p-8 rounded-[2rem] hover:bg-secondary/10 transition-colors"
            >
              <div className="text-primary shrink-0">
                <CheckCircle2 size={32} strokeWidth={2.5} />
              </div>
              <p className="text-xl md:text-2xl font-medium leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
