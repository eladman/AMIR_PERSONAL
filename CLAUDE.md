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

## Design System (from PRD)

- **Primary:** `#FF8714` (orange) — buttons, accents
- **Secondary:** `#000032` (dark navy) — text, dark backgrounds
- **Background:** `#FFFFFF` (white)
- **Font:** Heebo from Google Fonts (weights 300, 400, 700, 900)
- **Direction:** RTL (`dir="rtl"`, `lang="he"`)
- **Layout:** Mobile-first, alternating white and dark navy sections
- **CTA buttons:** Orange background with dark navy or white text

## Key Conventions

- TypeScript strict mode enabled
- ESLint extends `next/core-web-vitals` and `next/typescript`
- Tailwind config uses CSS variable-based `background`/`foreground` colors — PRD colors (`primary`, `secondary`) need to be added to the theme
- Root layout currently loads Geist fonts locally; Heebo (per PRD) still needs to be added
- GSAP is installed for scroll/entrance animations but not yet wired up
