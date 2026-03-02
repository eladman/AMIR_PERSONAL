"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Format() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".format-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".format-image", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
      });

      // Parallax scrub
      gsap.utils.toArray<HTMLElement>(".format-image").forEach((img, i) => {
        gsap.to(img, {
          y: i === 0 ? -40 : 40, ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="format" ref={containerRef} className="relative overflow-hidden py-24 md:py-32 px-6 bg-background text-secondary">
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-60" />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">

        {/* Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h2 className="format-text text-primary font-bold text-xl mb-4 uppercase tracking-widest">
            איך זה יראה?
          </h2>
          <h3 className="format-text text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
            תנועה. טבע. קפה. <br/>
            <span className="text-secondary/60">מפגש אנושי נטול אינטרס.</span>
          </h3>
          <p className="format-text text-2xl md:text-3xl leading-relaxed font-medium">
            לא עוד ישיבה באולם —
          </p>
          <p className="format-text text-xl md:text-2xl leading-relaxed text-secondary/70 mt-2">
            אלא סדנה חיה, תוך כדי תנועה, מחוץ לאזור הנוחות ובתוך הטבע.
          </p>
        </div>

        {/* Images Grid */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 md:gap-6">
          <div className="format-image group relative aspect-square rounded-[2rem] overflow-hidden lg:translate-y-8 shadow-xl">
            <Image
              src="/images/pic_3.jpeg"
              alt="תנועה וטבע"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
          </div>
          <div className="format-image group relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl">
            <Image
              src="/images/pic_4.jpeg"
              alt="מפגש אנושי"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
          </div>
        </div>

      </div>
    </section>
  );
}
