"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";

const heroImages = [
  "/images/pic_10.jpeg",
  "/images/pic_8.jpeg",
  "/images/pic_7.jpeg",
  "/images/pic_3.jpeg",
];

const SLIDE_INTERVAL = 5000;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const advanceSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(advanceSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [advanceSlide]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] flex items-end justify-start overflow-hidden"
    >
      {/* Background Images with crossfade */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            <Image
              src={src}
              alt="מאפס לאחד סדנה"
              fill
              sizes="100vw"
              quality={90}
              className="object-cover object-center blur-[2px] scale-[1.02]"
              priority={i === 0}
            />
          </div>
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32 lg:px-12 flex flex-col items-start text-white">
        
        <h1 className="hero-element text-5xl md:text-8xl font-black mb-6 leading-tight">
          מאפס <span className="text-primary">לאחד</span>
        </h1>

        <div className="hero-element flex flex-col gap-2 border-r-4 border-primary pr-6 mb-10">
          <p className="text-xl md:text-3xl font-medium">
            יש רגע בו אתה מבין.
          </p>
          <p className="text-lg md:text-2xl opacity-90">
            אף אחד לא יבוא לשנות לך את החיים.
          </p>
          <p className="text-lg md:text-2xl opacity-90">
            לא המדינה, לא הבוס, לא אלגוריתם.
          </p>
          <p className="text-xl md:text-3xl font-bold mt-2 text-primary">
            רק אתה.
          </p>
        </div>

        <div className="hero-element flex flex-col md:flex-row gap-4 mb-12 opacity-80 font-medium">
          <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm md:text-base">איך מייצרים חיים פרו-אקטיביים?</span>
          <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm md:text-base">איך הופכים שאיפות לתוצאות?</span>
          <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm md:text-base">איך הופכים דיבורים, למעשים?</span>
        </div>

        <a
          href="#register"
          className="hero-element group relative overflow-hidden bg-primary text-secondary px-8 py-4 rounded-full text-lg md:text-xl font-bold transition-transform hover:scale-[1.03]"
          style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
        >
          <span className="relative z-10">אני רוצה להירשם</span>
          <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}
