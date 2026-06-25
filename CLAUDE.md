# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page Hebrew (RTL) landing site for "מאפס לאחד" (Zero to One) workshop by Amir Menachem. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, GSAP for animations, and lucide-react for icons.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint (next lint)
```

No test framework is configured.

## Architecture

- **Next.js App Router** in `src/app/` — single route at `/`
- **Components** go in `src/components/`
- **Path alias:** `@/` maps to `src/` (e.g., `@/components/Hero`)
- **Public assets:** 13 workshop atmosphere images at `public/images/pic_1.jpeg` through `pic_13.jpeg`

## Design System

- **Primary:** `#FF8714` (orange) — buttons, accents
- **Secondary:** `#171717` (warm near-black) — text, dark backgrounds. (The
  original PRD specified navy `#000032`; the build settled on warm near-black and
  that is the source of truth. Defined as the `secondary` token + `--secondary`
  CSS variable.)
- **Background:** `#FFFFFF` (white)
- **Font:** Heebo from Google Fonts (weights 300, 400, 700, 900), wired via the
  `--font-heebo` variable and the Tailwind `sans` family.
- **Direction:** RTL (`dir="rtl"`, `lang="he"`)
- **Layout:** Mobile-first, alternating white and dark sections
- **CTA buttons:** Orange background with white text (`text-white`) — see the
  shared `CTAButton` component. Note: white-on-orange is ~2.4:1, below WCAG-AA.
- **Section eyebrows:** Use the shared `SectionLabel` component, not bespoke styles.

## Key Conventions

- TypeScript strict mode enabled
- ESLint extends `next/core-web-vitals` and `next/typescript`
- Tailwind theme defines `primary`/`secondary` colors plus `card`/`image` radius tokens; `background`/`foreground` remain CSS-variable based
- Heebo is loaded and exposed via the `--font-heebo` variable (Tailwind `sans` family)
- GSAP drives entrance + scroll animations across all sections; all animations are gated behind `prefersReducedMotion()` (`src/lib/prefersReducedMotion.ts`)
