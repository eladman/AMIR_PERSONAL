import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "מאפס לאחד | עמיר מנחם",
  description: "סדנה אישית של עמיר מנחם - מאפס לאחד",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}>
        <svg
          className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.05] mix-blend-soft-light"
          aria-hidden="true"
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
        {children}
      </body>
    </html>
  );
}
