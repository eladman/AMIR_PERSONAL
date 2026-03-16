"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const CAROUSEL_IMAGES = [
  { src: "/images/MainScroll.jpeg", alt: "Globes 40x40 cover" },
  { src: "/images/pic_3.jpeg", alt: "תנועה וטבע" },
  { src: "/images/pic_4.jpeg", alt: "מפגש אנושי" },
  { src: "/images/pic_12.jpeg", alt: "אווירת הסדנה" },
];

export default function Format() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      // RTL: swipe left (positive diff) = next, swipe right = prev
      goTo(activeIndex + (diff > 0 ? 1 : -1));
    }
  }, [activeIndex, goTo]);

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

      gsap.from(".format-carousel", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      // Desktop grid images — entrance + parallax
      gsap.from(".format-image", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
      });

      gsap.utils.toArray<HTMLElement>(".format-image").forEach((img) => {
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: -30,
          ease: "none",
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
            תוכן. טבע. תנועה.השראה. <br />
            <span className="text-secondary/60">מפגש אנושי נטול אינטרס</span>
          </h3>
          {/* Date, Time & Location details */}
          <div className="format-text mt-10 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
              </div>
              <div>
                <p className="text-sm text-secondary/50 font-medium">מתי?</p>
                <p className="text-xl font-bold">10.4.2026 | יום שישי</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <div>
                <p className="text-sm text-secondary/50 font-medium">באיזה שעות?</p>
                <p className="text-xl font-bold">09:00 – 14:30</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div>
                <p className="text-sm text-secondary/50 font-medium">איפה?</p>
                <p className="text-xl font-bold">טל הדר, כפר מונש - עמק חפר</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Carousel — hidden on desktop */}
        <div className="format-carousel w-full lg:hidden relative">
          <div
            className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
            >
              {CAROUSEL_IMAGES.map((img, i) => (
                <div key={i} className="relative w-full h-full shrink-0">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {CAROUSEL_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  i === activeIndex ? "bg-primary" : "bg-secondary/20"
                }`}
                aria-label={`תמונה ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid — hidden on mobile */}
        <div className="hidden lg:grid grid-cols-2 gap-4 lg:w-1/2">
          <div className="format-image relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl group">
            <Image
              src="/images/pic_3.jpeg"
              alt="תנועה וטבע"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="format-image relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl group">
            <Image
              src="/images/pic_4.jpeg"
              alt="מפגש אנושי"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
