"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24">
        
        {/* Image */}
        <div className="about-image w-full md:w-1/2 relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
          <Image
            src="/images/pic_2.jpeg"
            alt="עמיר מנחם"
            fill
            className="object-cover"
          />
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

        </div>
      </div>
    </section>
  );
}
