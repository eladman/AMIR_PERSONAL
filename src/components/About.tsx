"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const stats = [
  { value: 500, suffix: "+", label: "משתתפים בסדנאות" },
  { value: 5,   suffix: "",  label: "תנועות שייסד" },
  { value: 15,  suffix: "+", label: "שנות ניסיון" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".about-element", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      // Stat counters
      stats.forEach((stat, i) => {
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: stat.value, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%", once: true },
          onUpdate: () => {
            const el = statRefs.current[i];
            if (el) el.textContent = Math.round(proxy.val).toString();
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative overflow-hidden py-24 md:py-32 px-6 bg-background">
      <div className="absolute inset-0 bg-crosshatch pointer-events-none" />
      <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.04] blur-[80px]"
        style={{ top: "-5rem", left: "-5rem", animationDelay: "-1.5s" }} />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24 relative z-10">

        {/* Image */}
        <div className="about-image w-full md:w-1/2 bg-gray-200 rounded-[3rem] p-3">
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <Image
              src="/images/pic_2.jpeg"
              alt="עמיר מנחם"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-secondary">
          <h2 className="about-element text-primary font-bold text-xl mb-4 uppercase tracking-widest">
            מי זה עמיר?
          </h2>

          <h3 className="about-element text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
            יזם סדרתי, <br/>
            <span className="text-secondary/70">איש של עשייה.</span>
          </h3>

          <p className="about-element text-xl md:text-2xl leading-relaxed text-secondary/80 font-medium">
            עמיר מנחם, יזם סדרתי שייסד את תנועת <span className="text-primary font-bold">חמש אצבעות</span>, תוכנית יואב ועוד מיזמים ופרויקטים רבים.
          </p>

          <p className="about-element text-lg md:text-xl leading-relaxed text-secondary/70 mt-6">
            בסדנה זו, עמיר ישתף בדרך שלו ובכלים הפרקטיים שמובילים אותו בחיים, ויעזור לכם למצוא את המצפן הפנימי שלכם כדי להתחיל לנוע קדימה.
          </p>

          <div className="about-element grid grid-cols-3 gap-4 mt-10 w-full">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card-shimmer relative flex flex-col items-center p-5 rounded-2xl border border-secondary/10 bg-white shadow-sm">
                <span className="text-4xl md:text-5xl font-black text-secondary leading-none">
                  <span ref={el => { statRefs.current[i] = el; }}>0</span>{stat.suffix}
                </span>
                <span className="mt-2 text-xs md:text-sm text-secondary/50 font-medium text-center leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
