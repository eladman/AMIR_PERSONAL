import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meepes-leechad.com"),
  title: "מאפס לאחד | עמיר מנחם",
  description: "סדנה אישית אינטנסיבית של עמיר מנחם שתעזור לך לקחת את הרעיון שלך ולהפוך אותו למציאות.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    title: "מאפס לאחד | עמיר מנחם",
    description: "סדנה אישית אינטנסיבית שתעזור לך לקחת את הרעיון שלך ולהפוך אותו למציאות.",
    url: "https://meepes-leechad.com",
    siteName: "מאפס לאחד",
    images: [
      {
        url: "/images/pic_2.jpeg",
        width: 1200,
        height: 630,
        alt: "סדנת מאפס לאחד - עמיר מנחם",
      },
    ],
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "מאפס לאחד | עמיר מנחם",
    description: "סדנה אישית אינטנסיבית שתעזור לך לקחת את הרעיון שלך ולהפוך אותו למציאות.",
    images: ["/images/pic_2.jpeg"],
  },
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
          className="hidden md:block pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-soft-light"
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
        <div className="scroll-progress" />
        {children}
      </body>
    </html>
  );
}
