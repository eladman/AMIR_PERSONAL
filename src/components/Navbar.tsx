"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        toggleClass: { className: "nav-scrolled", targets: navRef.current },
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        ref={navRef}
        className="pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full transition-all duration-500 bg-transparent text-white border border-transparent [&.nav-scrolled]:bg-background/80 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:text-secondary [&.nav-scrolled]:border-secondary/10 shadow-sm [&.nav-scrolled]:shadow-md"
      >
        <div className="font-black text-xl tracking-tight">
          מאפס לאחד
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link href="#about" className="hover:-translate-y-[1px] transition-transform">על עמיר</Link>
          <Link href="#topics" className="hover:-translate-y-[1px] transition-transform">הסדנה</Link>
          <Link href="#format" className="hover:-translate-y-[1px] transition-transform">המפגש</Link>
        </div>

        <Link
          href="#register"
          className="group relative overflow-hidden bg-primary text-white px-6 py-2 rounded-full font-bold transition-transform hover:scale-[1.03] active:scale-95"
          style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
        >
          <span className="relative z-10">הצטרף עכשיו</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Link>
      </nav>
    </div>
  );
}
