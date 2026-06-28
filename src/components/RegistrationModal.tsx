"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// The two workshop dates. Each opens its own Zygo registration page.
// Single source of truth — CTAButton and the modal both read from here.
export type RegistrationOption = {
  /** Display date, DD.MM.YYYY to match the rest of the site. */
  date: string;
  location: string;
  /** Schedule, shown as a secondary detail on the card. */
  time: string;
  href: string;
};

export const REGISTRATION_OPTIONS: RegistrationOption[] = [
  // August date is temporarily disabled — only October is open for registration
  // for now. Re-enable this entry to bring back the date-selection modal.
  // {
  //   date: "07.08.2026",
  //   location: "הפגודה, שדות ים",
  //   time: "09:00 – 14:30",
  //   href: "https://zygo.co.il/event/660685259884575622/ZF10o46f2",
  // },
  {
    date: "02.10.2026",
    location: "הפגודה, שדות ים",
    time: "09:00 – 14:30",
    href: "https://zygo.co.il/event/440624261379923143/ZF10o46f2",
  },
];

// Hebrew month names, indexed by month number (1–12), for the calendar tile.
const HEBREW_MONTHS = [
  "",
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

/** Split "07.08.2026" into the parts the ticket tile needs. */
function parseDate(date: string) {
  const [day, month, year] = date.split(".");
  return { day, month: HEBREW_MONTHS[Number(month)] ?? "", year };
}

type RegistrationContextValue = {
  /** Open the date-selection modal. */
  open: () => void;
};

const RegistrationContext = createContext<RegistrationContextValue | null>(null);

/**
 * Wrap the app once. Provides `open()` to every CTA and renders the single
 * shared date-selection modal at the root.
 */
export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    // With a single date open, skip the "באיזה מועד תרצו להשתתף?" picker and go
    // straight to its registration page. The modal returns automatically once a
    // second date is re-enabled in REGISTRATION_OPTIONS.
    if (REGISTRATION_OPTIONS.length === 1) {
      window.open(
        REGISTRATION_OPTIONS[0].href,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <RegistrationContext.Provider value={{ open }}>
      {children}
      <RegistrationDialog isOpen={isOpen} onClose={close} />
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }
  return ctx;
}

const PinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

function RegistrationDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  // Remember what was focused before opening, restore it on close.
  const lastFocused = useRef<HTMLElement | null>(null);

  // Close on Escape + lock body scroll while open, and manage focus.
  useEffect(() => {
    if (!isOpen) return;

    lastFocused.current = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog (first option button).
    const firstOption = cardRef.current?.querySelector<HTMLElement>(
      "[data-option]"
    );
    firstOption?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastFocused.current?.focus?.();
    };
  }, [isOpen, onClose]);

  const handleSelect = (href: string) => {
    // Open the registration page in a new tab, then dismiss the modal.
    window.open(href, "_blank", "noopener,noreferrer");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-modal-title"
    >
      {/* Scrim — strong enough to isolate the card (70% black + blur). */}
      <button
        type="button"
        aria-label="סגירת החלון"
        onClick={onClose}
        className="modal-scrim absolute inset-0 cursor-default bg-black/70 backdrop-blur-md"
      />

      <div
        ref={cardRef}
        className="modal-card relative w-full max-w-lg overflow-hidden rounded-card border border-white/10 bg-secondary text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
      >
        {/* Soft orange glow bleeding from the top — cinematic, on-brand. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[28rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[80px]"
        />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="סגירה"
          className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="relative p-7 sm:p-9">
          {/* Eyebrow — matches the site's SectionLabel treatment. */}
          <p className="text-primary text-xs font-bold uppercase tracking-[0.3em]">
            הרשמה לסדנה
          </p>
          <h2
            id="registration-modal-title"
            className="mt-3 text-2xl font-black leading-tight sm:text-3xl"
          >
            באיזה מועד תרצו להשתתף?
          </h2>
          <p className="mt-2 text-sm text-white/55 sm:text-base">
            שני מועדים פתוחים להרשמה. בחרו את התאריך שמתאים לכם.
          </p>

          <div className="mt-7 flex flex-col gap-3">
            {REGISTRATION_OPTIONS.map((option, i) => {
              const { day, month, year } = parseDate(option.date);
              return (
                <button
                  key={option.href}
                  data-option
                  type="button"
                  onClick={() => handleSelect(option.href)}
                  style={{ animationDelay: `${120 + i * 70}ms` }}
                  className="modal-option group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 pr-4 text-right transition-all duration-200 hover:border-primary/70 hover:bg-white/[0.07] focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                >
                  {/* Ticket-style calendar tile */}
                  <span className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-inset ring-white/10 transition-colors duration-200 group-hover:bg-primary group-hover:ring-primary">
                    <span className="text-2xl font-black leading-none tabular-nums text-white">
                      {day}
                    </span>
                    <span className="mt-1 text-[11px] font-bold text-primary transition-colors duration-200 group-hover:text-white">
                      {month}
                    </span>
                  </span>

                  {/* Details */}
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="text-base font-bold text-white">
                      {month} {year}
                    </span>
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/55">
                      <span className="inline-flex items-center gap-1.5">
                        <PinIcon />
                        {option.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <ClockIcon />
                        {option.time}
                      </span>
                    </span>
                  </span>

                  {/* Forward chevron (RTL → points left) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mr-auto shrink-0 text-white/30 transition-all duration-200 group-hover:-translate-x-1 group-hover:text-primary"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
              );
            })}
          </div>

          {/* Reassurance / urgency footer */}
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            מספר המקומות מוגבל
          </p>
        </div>
      </div>
    </div>
  );
}
