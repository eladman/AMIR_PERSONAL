"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const items = [
  "איך מייצרים חיים פרו-אקטיביים?", "✦",
  "איך הופכים שאיפות לתוצאות?", "✦",
  "איך הופכים דיבורים, למעשים?", "✦",
  "מה מייחד אנשים שמצליחים?", "✦",
  "מה הצעד הבא שלך?", "✦",
];

// 4 copies so the viewport is always full, even on wide screens.
// We animate exactly one copy's worth of pixels, so the reset is invisible.
const repeated = [...items, ...items, ...items, ...items];

export default function Ticker() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll entrance
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 90%" },
        opacity: 0, y: 20, duration: 0.8, ease: "power2.out",
      });
    }, sectionRef);

    const track = trackRef.current;
    if (!track) return () => ctx.revert();

    // Reset to left edge (overrides any RTL drift)
    gsap.set(track, { x: 0 });

    // Animate by exactly one copy width; repeat: -1 resets seamlessly
    // because copy N and copy N+1 are identical.
    const oneCopyWidth = track.scrollWidth / 4;
    const tween = gsap.to(track, {
      x: -oneCopyWidth,
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    const pause = () => tween.pause();
    const resume = () => tween.play();
    const section = sectionRef.current;
    section?.addEventListener("mouseenter", pause);
    section?.addEventListener("mouseleave", resume);

    return () => {
      ctx.revert();
      tween.kill();
      section?.removeEventListener("mouseenter", pause);
      section?.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-secondary py-5 border-y border-white/5 overflow-hidden">
      {/* direction: ltr on the wrapper ensures the track div is pinned
          to the left edge regardless of the RTL page direction. */}
      <div style={{ direction: "ltr" }}>
        <div ref={trackRef} className="flex w-max">
          {repeated.map((item, i) => (
            <span
              key={i}
              className={`shrink-0 px-8 ${
                item === "✦"
                  ? "text-primary text-xl"
                  : "text-white/80 text-lg md:text-xl font-medium whitespace-nowrap"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
