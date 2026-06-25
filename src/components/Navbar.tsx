"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  // Over the dark cinematic hero the bar is dark glass + white text;
  // once scrolled into the white page sections it morphs to light glass.
  const [scrolled, setScrolled] = useState(false);

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

      // Scroll morph — flip to the light style once past the hero edge
      ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        onToggle: (self) => setScrolled(self.isActive),
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

  // Color tokens that flip with scroll state
  const textColor = scrolled ? "text-secondary" : "text-white";
  const barClass = scrolled
    ? "bg-white/90 md:backdrop-blur-xl border-secondary/10 shadow-sm py-1.5"
    : "bg-white/10 md:backdrop-blur-md border-white/20 py-2";

  return (
    <>
      <div
        ref={containerRef}
        className="nav-init fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between w-full max-w-4xl px-5 rounded-full border transition-all duration-500 ${barClass}`}
        >
          {/* Logo */}
          <Link href="/" className={`font-black text-lg tracking-tight transition-colors duration-500 ${textColor}`}>
            <span className="font-light">מאפס</span>
            <span className="text-primary font-black">לאחד</span>
          </Link>

          {/* Desktop links */}
          <div className={`hidden md:flex items-center gap-8 font-medium text-sm transition-colors duration-500 ${textColor}`}>
            {[
              { href: "#method", label: "המתודה" },
              { href: "#topics", label: "הסדנה" },
              { href: "#about", label: "על עמיר" },
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
          <div className="hidden md:block">
            <CTAButton size="sm">להרשמה</CTAButton>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="תפריט"
          >
            <span
              className={`w-6 h-[2px] transition-all duration-300 ${
                scrolled ? "bg-secondary" : "bg-white"
              } ${menuOpen ? "rotate-45 translate-y-[5px] !bg-white" : ""}`}
            />
            <span
              className={`w-6 h-[2px] transition-all duration-300 ${
                scrolled ? "bg-secondary" : "bg-white"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`w-6 h-[2px] transition-all duration-300 ${
                scrolled ? "bg-secondary" : "bg-white"
              } ${menuOpen ? "-rotate-45 -translate-y-[5px] !bg-white" : ""}`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay — dark to match the cinematic hero */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-secondary flex flex-col items-center justify-center gap-8">
          {[
            { href: "#method", label: "המתודה" },
            { href: "#audience", label: "למי זה מיועד" },
            { href: "#topics", label: "הסדנה" },
            { href: "#about", label: "על עמיר" },
            { href: "#timeline", label: "לוח היום" },
            { href: "#format", label: "המפגש" },
            { href: "https://zygo.co.il/event/710553243573321580/ZF10o46f2", label: "הצטרף עכשיו" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="mobile-link text-white text-3xl font-bold hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
