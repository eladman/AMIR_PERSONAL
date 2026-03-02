"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, { visibility: "visible" });

      // Entrance: slide down after hero loads
      gsap.from(containerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.5,
      });

      // Scroll morph
      ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        toggleClass: { className: "nav-scrolled", targets: navRef.current! },
      });
    });

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        ".mobile-link",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out", delay: 0.2 }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      <div
        ref={containerRef}
        className="nav-init fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <nav
          ref={navRef}
          className="pointer-events-auto flex items-center justify-between w-full max-w-4xl px-5 py-2 rounded-full transition-all duration-500 bg-white/80 md:bg-white/60 md:backdrop-blur-md text-secondary border border-secondary/10 [&.nav-scrolled]:bg-white/95 [&.nav-scrolled]:md:bg-white/90 [&.nav-scrolled]:md:backdrop-blur-xl [&.nav-scrolled]:border-secondary/10 [&.nav-scrolled]:shadow-sm [&.nav-scrolled]:py-1.5"
        >
          {/* Logo */}
          <Link href="/" className="font-black text-lg tracking-tight">
            <span className="font-light">מאפס</span>
            <span className="text-primary font-black">לאחד</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            {[
              { href: "#about", label: "על עמיר" },
              { href: "#topics", label: "הסדנה" },
              { href: "#format", label: "המפגש" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/register"
            className="hidden md:inline-flex group relative overflow-hidden bg-primary text-white px-5 py-1.5 rounded-full text-sm font-bold transition-transform hover:scale-[1.03] active:scale-95"
          >
            <span className="relative z-10">להרשמה</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="תפריט"
          >
            <span
              className={`w-6 h-[2px] bg-secondary transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-secondary transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-secondary transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8">
          {[
            { href: "#about", label: "על עמיר" },
            { href: "#topics", label: "הסדנה" },
            { href: "#format", label: "המפגש" },
            { href: "/register", label: "הצטרף עכשיו" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="mobile-link text-secondary text-3xl font-bold hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
