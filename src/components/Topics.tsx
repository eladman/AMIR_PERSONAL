"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  TrendingUp, 
  Target, 
  Shield, 
  Lightbulb, 
  Activity, 
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const topics = [
  {
    id: 1,
    title: "בניית תנועה ארוכת טווח",
    description: 'איך מפסיקים לחיות "מעכשיו לעכשיו" ומתחילים לבנות תנועה ארוכת טווח?',
    icon: TrendingUp,
  },
  {
    id: 2,
    title: "אזור ההרמוניה האישי",
    description: "איך מוצאים את אזור ההרמוניה האישי שלך? — מודל האיקיגאי",
    icon: Target,
  },
  {
    id: 3,
    title: "בניית סנטר חזק",
    description: "איך בונים סנטר חזק — הלימה בין מחשבה, דיבור ולב",
    icon: Shield,
  },
  {
    id: 4,
    title: "נבונים מול חכמים",
    description: "למה אנשים נבונים חשובים יותר מחכמים?",
    icon: Lightbulb,
  },
  {
    id: 5,
    title: "אימון כדרך חיים",
    description: "איך להפוך אימון יומיומי לדרך חיים",
    icon: Activity,
  },
  {
    id: 6,
    title: "עשייה למען אחרים",
    description: "למה התכלית האמיתית קשורה תמיד בעשייה למען אחרים",
    icon: Users,
  },
];

export default function Topics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < topics.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Entrance animation for the whole section
    const ctx = gsap.context(() => {
      gsap.from(".topic-title-anim", {
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
      
      gsap.from(".stack-container", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        x: -50, // Slides in from right (RTL context)
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="topics" ref={containerRef} className="py-24 md:py-32 px-6 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10 items-center">
        
        {/* Right Column - Title */}
        <div className="lg:w-5/12 relative z-20">
          <div>
            <h2 className="topic-title-anim text-primary font-bold text-xl mb-4 uppercase tracking-widest flex items-center gap-4">
              <span className="w-12 h-[2px] bg-primary rounded-full"></span>
              על מה נעבוד?
            </h2>
            <h3 className="topic-title-anim text-5xl md:text-6xl lg:text-7xl font-black text-secondary leading-[1.1]">
              הכלים שייקחו <br />
              אותך <span className="text-primary relative inline-block">
                לשלב הבא
                <svg className="absolute -bottom-2 right-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h3>
            <p className="topic-title-anim mt-8 text-xl text-secondary/70 leading-relaxed font-medium max-w-md">
              הסדנה בנויה כהליך התפתחותי, שלב אחר שלב. לחצו על הכרטיסיות או השתמשו בחיצים כדי לגלות את השלבים שנעבור יחד.
            </p>

            {/* Navigation Controls */}
            <div className="topic-title-anim flex items-center gap-4 mt-10">
              {/* In RTL, Right chevron is Previous, Left chevron is Next */}
              <button 
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="w-12 h-12 rounded-full border-2 border-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-secondary disabled:cursor-not-allowed"
                aria-label="הקודם"
              >
                <ChevronRight size={24} />
              </button>
              
              <div className="text-xl font-bold text-secondary font-mono w-16 text-center">
                {activeIndex + 1} <span className="text-secondary/30 text-lg">/</span> {topics.length}
              </div>
              
              <button 
                onClick={handleNext}
                disabled={activeIndex === topics.length - 1}
                className="w-12 h-12 rounded-full border-2 border-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-secondary disabled:cursor-not-allowed"
                aria-label="הבא"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Left Column - Card Stack */}
        <div className="lg:w-7/12 relative stack-container h-[450px] md:h-[500px] w-full mt-10 lg:mt-0">
          <div className="relative w-full h-full max-w-lg mx-auto lg:mr-auto lg:ml-0">
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              const offset = index - activeIndex;
              const isActive = offset === 0;
              const isPast = offset < 0;
              
              return (
                <div 
                  key={topic.id}
                  onClick={() => {
                    if (offset > 0) {
                      setActiveIndex(index);
                    }
                  }}
                  className={`absolute inset-0 bg-secondary rounded-[2.5rem] p-8 md:p-12 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.2,1)] flex flex-col justify-center overflow-hidden
                    ${offset > 0 ? 'cursor-pointer hover:bg-[#000042]' : ''}
                  `}
                  style={{
                    zIndex: isPast ? 40 + offset : 30 - offset,
                    transform: isPast 
                      ? 'translateY(-100px) scale(0.95)' 
                      : `translateY(${offset * 28}px) scale(${1 - offset * 0.06})`,
                    opacity: isPast ? 0 : Math.max(1 - offset * 0.3, 0),
                    pointerEvents: isActive || offset > 0 ? 'auto' : 'none',
                    visibility: isPast && offset < -1 ? 'hidden' : 'visible'
                  }}
                >
                  {/* Faint Background Number */}
                  <div className="absolute -top-8 left-4 text-[160px] md:text-[220px] font-black text-white/5 leading-none select-none pointer-events-none transition-transform duration-700"
                       style={{ transform: isActive ? 'scale(1)' : 'scale(0.9)' }}>
                    0{index + 1}
                  </div>

                  <div className="relative z-10 transform transition-transform duration-700"
                       style={{ transform: isActive ? 'translateY(0)' : 'translateY(20px)' }}>
                    <div className="w-16 h-16 bg-primary/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 text-primary transition-all duration-500 hover:scale-110 hover:bg-primary hover:text-secondary">
                      <Icon size={32} strokeWidth={2} />
                    </div>
                    
                    <h4 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      {topic.title}
                    </h4>
                    
                    <p className="text-xl text-white/70 leading-relaxed font-light">
                      {topic.description}
                    </p>
                  </div>
                  
                  {/* Click to reveal indicator for upcoming cards */}
                  {offset > 0 && offset < 3 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity text-white/40 text-sm font-medium tracking-wide">
                      לחץ להצגה
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
