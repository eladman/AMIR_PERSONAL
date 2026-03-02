"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations for text elements
      gsap.from(".hero-element", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      // Continuous floating animation for images
      gsap.to(".floating-image-1", {
        y: "-15px",
        rotation: 1,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".floating-image-2", {
        y: "15px",
        rotation: -2,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });

      gsap.to(".floating-image-3", {
        y: "-10px",
        rotation: 2,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      // Entrance animation for images
      gsap.from(".floating-image", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] bg-white overflow-hidden flex items-center pt-20"
    >
      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      
      {/* Background radial gradient to create depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,135,20,0.08),transparent_50%)] z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Right Side: Text Content (RTL -> appears on the right in the layout, actually it's left in the DOM but RTL makes it right) */}
        <div className="flex flex-col items-start text-secondary order-2 lg:order-1">
          <h1 className="hero-element text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
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

          <div className="hero-element flex flex-wrap gap-3 mb-12 opacity-90 font-medium">
            <span className="bg-secondary/5 border border-secondary/10 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm md:text-base">איך מייצרים חיים פרו-אקטיביים?</span>
            <span className="bg-secondary/5 border border-secondary/10 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm md:text-base">איך הופכים שאיפות לתוצאות?</span>
            <span className="bg-secondary/5 border border-secondary/10 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm md:text-base">איך הופכים דיבורים, למעשים?</span>
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

        {/* Left Side: Floating Image Gallery */}
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full flex items-center justify-center order-1 lg:order-2 mt-8 lg:mt-0">
          {/* Main Image */}
          <div className="floating-image floating-image-1 absolute z-30 w-[60%] sm:w-[50%] lg:w-[55%] aspect-[3/4] left-[5%] sm:left-[15%] lg:left-[10%] rounded-[2rem] overflow-hidden shadow-2xl border border-secondary/10 transform rotate-[-3deg]">
            <Image
              src="/images/pic_10.jpeg"
              alt="Atmosphere 1"
              fill
              className="object-cover mix-blend-luminosity opacity-80 transition-all duration-500 hover:mix-blend-normal hover:opacity-100"
              sizes="(max-width: 768px) 60vw, 30vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay pointer-events-none transition-opacity duration-500 hover:opacity-0" />
          </div>

          {/* Secondary Image (Back Right) */}
          <div className="floating-image floating-image-2 absolute z-20 w-[50%] sm:w-[40%] lg:w-[45%] aspect-square right-[10%] sm:right-[20%] lg:right-[15%] top-[5%] rounded-[2rem] overflow-hidden shadow-2xl border border-secondary/10 transform rotate-[6deg]">
            <Image
              src="/images/pic_8.jpeg"
              alt="Atmosphere 2"
              fill
              className="object-cover mix-blend-luminosity opacity-60 transition-all duration-500 hover:mix-blend-normal hover:opacity-100"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-secondary/40 mix-blend-multiply pointer-events-none transition-opacity duration-500 hover:opacity-0" />
          </div>

          {/* Tertiary Image (Bottom Right) */}
          <div className="floating-image floating-image-3 absolute z-40 w-[45%] sm:w-[35%] lg:w-[40%] aspect-[4/3] right-[15%] sm:right-[25%] lg:right-[20%] bottom-[10%] rounded-[2rem] overflow-hidden shadow-xl border border-secondary/10 transform rotate-[-5deg]">
            <Image
              src="/images/pic_7.jpeg"
              alt="Atmosphere 3"
              fill
              className="object-cover mix-blend-luminosity opacity-70 transition-all duration-500 hover:mix-blend-normal hover:opacity-100"
              sizes="(max-width: 768px) 45vw, 20vw"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-color pointer-events-none transition-opacity duration-500 hover:opacity-0" />
          </div>
        </div>

      </div>
    </section>
  );
}
