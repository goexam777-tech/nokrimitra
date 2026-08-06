import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-opd",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-opd-display",
});

export const metadata: Metadata = {
  title: "Thank you | OPD Mastery E-book | NokriMitra",
  description:
    "Your order is confirmed. Download the OPD Mastery e-book (2026 Edition).",
  robots: { index: false, follow: false },
};

export default function OpdThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The page reads query params via useSearchParams, which needs a boundary.
  return (
    <div className={`${inter.variable} ${playfair.variable}`}>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}