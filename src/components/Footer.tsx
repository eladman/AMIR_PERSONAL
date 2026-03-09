"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".footer-el", {
        scrollTrigger: { trigger: containerRef.current, start: "top 95%" },
        y: 20, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="bg-background text-secondary py-12 px-6 rounded-t-[3rem] md:rounded-t-[4rem] relative overflow-hidden -mt-8 z-20 border-t border-secondary/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="footer-el flex flex-col items-center md:items-start gap-2">
          <h4 className="font-black text-2xl tracking-tight">עמיר מנחם</h4>
          <p className="text-secondary/60 text-sm font-medium">מאפס לאחד - סדנה אישית</p>
          <p className="text-secondary/50 text-xs font-medium">10.4.2026 · טל הדר, כפר מונש - עמק חפר</p>
        </div>

        <div className="footer-el flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-secondary/60 text-sm font-medium">
          <a href="#about" className="hover:text-primary transition-colors">מי זה עמיר?</a>
          <a href="#topics" className="hover:text-primary transition-colors">על מה נעבוד?</a>
          <a href="#format" className="hover:text-primary transition-colors">המפגש</a>
        </div>

        <div className="footer-el flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-2 bg-secondary/5 px-4 py-2 rounded-full border border-secondary/10">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-secondary/80">הרשמה פתוחה</span>
          </div>
          <p className="text-secondary/40 text-xs mt-4 md:mt-2">
            © {new Date().getFullYear()} כל הזכויות שמורות.
          </p>
        </div>

      </div>
    </footer>
  );
}
