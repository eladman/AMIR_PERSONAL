"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Check } from "lucide-react";
import {
  validateRegistration,
  REFERRAL_OPTIONS,
  type RegistrationData,
  type RegistrationErrors,
} from "@/lib/validation";

const initialData: RegistrationData = {
  fullName: "",
  email: "",
  phone: "",
  lifeStatus: "",
  referralSource: "",
  reason: "",
};

function SubmittingLoader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { opacity: 0, duration: 0.35, ease: "power2.out" });
      gsap.from(".ldr-inner", {
        scale: 0.75,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        ease: "back.out(2)",
      });
      gsap.from(".ldr-text", {
        y: 22,
        opacity: 0,
        stagger: 0.09,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-secondary"
    >
      <style>{`
        @keyframes ldr-orbit   { to { transform: rotate(360deg); } }
        @keyframes ldr-orbit-r { to { transform: rotate(-360deg); } }
        @keyframes ldr-dots {
          0%, 80%, 100% { transform: scale(0); opacity: 0.25; }
          40%            { transform: scale(1); opacity: 1; }
        }
        @keyframes ldr-glow {
          0%, 100% { text-shadow: 0 0 18px rgba(255,135,20,0.35); }
          50%       { text-shadow: 0 0 42px rgba(255,135,20,0.9), 0 0 80px rgba(255,135,20,0.3); }
        }
        @keyframes ldr-shimmer {
          0%, 100% { opacity: 0.28; }
          50%       { opacity: 0.85; }
        }
        @keyframes ldr-breathe {
          0%, 100% { transform: scale(1);    opacity: 0.12; }
          50%       { transform: scale(1.12); opacity: 0.24; }
        }
      `}</style>

      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,135,20,0.07) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Ambient glow orb */}
      <div
        className="absolute w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,135,20,0.09) 0%, transparent 70%)",
          animation: "ldr-breathe 3.5s ease-in-out infinite",
        }}
      />

      <div className="ldr-inner relative flex flex-col items-center gap-10">
        {/* ─── Orbital ring system ─── */}
        <div className="relative w-44 h-44">

          {/* Outer track ring */}
          <div className="absolute inset-0 rounded-full border border-white/8" />

          {/* Outer orbiting dot */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ animation: "ldr-orbit 2.5s linear infinite" }}
          >
            <div
              className="absolute w-4 h-4 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ background: "#FF8714", boxShadow: "0 0 16px rgba(255,135,20,0.95)" }}
            />
          </div>

          {/* Middle track ring */}
          <div className="absolute inset-8 rounded-full border border-white/6" />

          {/* Inner orbiting dot (counter-clockwise) */}
          <div
            className="absolute inset-8 rounded-full"
            style={{ animation: "ldr-orbit-r 1.8s linear infinite" }}
          >
            <div
              className="absolute w-2.5 h-2.5 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ background: "rgba(255,135,20,0.55)", boxShadow: "0 0 8px rgba(255,135,20,0.55)" }}
            />
          </div>

          {/* Innermost static ring */}
          <div className="absolute inset-16 rounded-full border border-white/10" />

          {/* Center: 0 → 1 */}
          <div className="absolute inset-0 flex items-center justify-center gap-2.5" dir="ltr">
            <span
              className="text-4xl font-black leading-none select-none text-white/20"
              style={{ fontFamily: "Heebo, sans-serif" }}
            >
              0
            </span>
            <span
              className="text-xl font-bold leading-none select-none text-primary/50"
              style={{ animation: "ldr-shimmer 1.5s ease-in-out infinite" }}
            >
              →
            </span>
            <span
              className="text-4xl font-black leading-none select-none text-primary"
              style={{
                fontFamily: "Heebo, sans-serif",
                animation: "ldr-glow 2s ease-in-out infinite",
              }}
            >
              1
            </span>
          </div>
        </div>

        {/* ─── Labels ─── */}
        <div className="text-center" dir="rtl">
          <p className="ldr-text text-white text-xl font-bold tracking-wide">שולח את הפרטים</p>
          <p className="ldr-text mt-1.5 text-white/40 text-sm">בדרך מאפס לאחד...</p>
        </div>

        {/* ─── Animated loading dots ─── */}
        <div className="ldr-text flex gap-2.5">
          {[0, 0.2, 0.4].map((delay, i) => (
            <span
              key={i}
              className="block w-2 h-2 rounded-full bg-primary"
              style={{
                animation: "ldr-dots 1.3s ease-in-out infinite",
                animationDelay: `${delay}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RegisterForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<RegistrationData>(initialData);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".reg-back", { y: -20, opacity: 0, duration: 0.6 });
      tl.from(".reg-header", { y: 30, opacity: 0, duration: 0.8, stagger: 0.15 }, "-=0.3");
      tl.from(".reg-field", { y: 25, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.4");
      tl.from(".reg-submit", { scale: 0.9, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Success animation
  useEffect(() => {
    if (!success || !successRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".success-icon", { scale: 0, duration: 0.6, ease: "back.out(1.7)" });
      tl.from(".success-text", { y: 20, opacity: 0, duration: 0.6 }, "-=0.2");
      tl.from(".success-btn", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3");
    }, successRef);
    return () => ctx.revert();
  }, [success]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegistrationErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof RegistrationErrors];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const validationErrors = validateRegistration(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = document.querySelector(`[name="${firstErrorField}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        if (result.errors && typeof result.errors === "object") {
          if (result.errors.server) {
            setServerError(result.errors.server);
          } else {
            setErrors(result.errors);
          }
        } else {
          setServerError("שגיאה בשליחה, נסה שוב");
        }
        return;
      }

      setSuccess(true);
    } catch {
      setServerError("שגיאה בשליחה, נסה שוב");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = (field: keyof RegistrationErrors) =>
    `w-full rounded-2xl border px-5 py-3 bg-white text-secondary placeholder:text-secondary/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30 focus:border-primary/40 ${
      errors[field] ? "border-red-400" : "border-secondary/15"
    }`;

  if (success) {
    return (
      <div
        ref={successRef}
        className="relative min-h-screen flex items-center justify-center bg-white"
      >
        <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
        <div
          className="ambient-orb w-[500px] h-[500px] bg-primary/[0.06] blur-[80px]"
          style={{ top: "30%", right: "10%" }}
        />
        <div className="relative z-10 text-center flex flex-col items-center gap-6 px-6">
          <div className="success-icon w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Check className="w-10 h-10 text-primary" strokeWidth={3} />
          </div>
          <h2 className="success-text text-3xl md:text-4xl font-black text-secondary">
            ההרשמה התקבלה!
          </h2>
          <p className="success-text text-secondary/60 text-lg max-w-md">
            תודה שנרשמת. ניצור איתך קשר בקרוב עם כל הפרטים.
          </p>
          <Link
            href="/"
            className="success-btn inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-lg font-bold transition-transform hover:scale-[1.03] active:scale-95"
          >
            חזרה לדף הראשי
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white py-12 md:py-20">
      {submitting && <SubmittingLoader />}
      {/* Background decorations */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
      <div
        className="ambient-orb w-[500px] h-[500px] bg-primary/[0.06] blur-[80px]"
        style={{ top: "10%", right: "-5%" }}
      />
      <div
        className="ambient-orb w-[350px] h-[350px] bg-secondary/[0.03] blur-[60px]"
        style={{ bottom: "10%", left: "0%", animationDelay: "-3s" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/"
          className="reg-back inline-flex items-center gap-2 text-secondary/60 hover:text-primary transition-colors mb-8 md:mb-12 text-sm font-medium"
        >
          <ArrowRight className="w-4 h-4" />
          חזרה לדף הראשי
        </Link>

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <h1 className="reg-header text-4xl md:text-5xl font-black text-secondary mb-3">
            הרשמה <span className="text-primary">לסדנה</span>
          </h1>
          <p className="reg-header text-secondary/50 text-lg">
            מלא את הפרטים ונחזור אליך בהקדם
          </p>
        </div>

        {/* Server error banner */}
        {serverError && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-red-600 text-sm font-medium"
          >
            {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {/* Full name */}
          <div className="reg-field">
            <label htmlFor="fullName" className="block text-sm font-bold text-secondary mb-2">
              שם מלא
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className={inputClass("fullName")}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
            />
            {errors.fullName && (
              <p id="fullName-error" role="alert" className="mt-1.5 text-sm text-red-500">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="reg-field">
            <label htmlFor="email" className="block text-sm font-bold text-secondary mb-2">
              אימייל
            </label>
            <input
              id="email"
              name="email"
              type="email"
              dir="ltr"
              value={formData.email}
              onChange={handleChange}
              className={inputClass("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="reg-field">
            <label htmlFor="phone" className="block text-sm font-bold text-secondary mb-2">
              מספר טלפון
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              dir="ltr"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass("phone")}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p id="phone-error" role="alert" className="mt-1.5 text-sm text-red-500">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Life status */}
          <div className="reg-field">
            <label htmlFor="lifeStatus" className="block text-sm font-bold text-secondary mb-2">
              מה אתה עושה בחיים
            </label>
            <input
              id="lifeStatus"
              name="lifeStatus"
              type="text"
              value={formData.lifeStatus}
              onChange={handleChange}
              className={inputClass("lifeStatus")}
              aria-invalid={!!errors.lifeStatus}
              aria-describedby={errors.lifeStatus ? "lifeStatus-error" : undefined}
            />
            {errors.lifeStatus && (
              <p id="lifeStatus-error" role="alert" className="mt-1.5 text-sm text-red-500">
                {errors.lifeStatus}
              </p>
            )}
          </div>

          {/* Referral source */}
          <div className="reg-field">
            <label htmlFor="referralSource" className="block text-sm font-bold text-secondary mb-2">
              איך הגעת אלינו
            </label>
            <select
              id="referralSource"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className={`${inputClass("referralSource")} appearance-none`}
              aria-invalid={!!errors.referralSource}
              aria-describedby={errors.referralSource ? "referralSource-error" : undefined}
            >
              <option value="">בחר/י אפשרות</option>
              {REFERRAL_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.referralSource && (
              <p id="referralSource-error" role="alert" className="mt-1.5 text-sm text-red-500">
                {errors.referralSource}
              </p>
            )}
          </div>

          {/* Reason */}
          <div className="reg-field">
            <label htmlFor="reason" className="block text-sm font-bold text-secondary mb-2">
              למה אתה רוצה להשתתף
            </label>
            <textarea
              id="reason"
              name="reason"
              rows={4}
              value={formData.reason}
              onChange={handleChange}
              className={`${inputClass("reason")} resize-none`}
              aria-invalid={!!errors.reason}
              aria-describedby={errors.reason ? "reason-error" : undefined}
            />
            {errors.reason && (
              <p id="reason-error" role="alert" className="mt-1.5 text-sm text-red-500">
                {errors.reason}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="reg-submit group relative w-full overflow-hidden bg-primary text-white py-4 rounded-full text-lg font-bold transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-70 disabled:pointer-events-none mt-4"
          >
            <span className="relative z-10">
              {submitting ? "שולח..." : "שליחת הרשמה"}
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </form>
      </div>
    </div>
  );
}
