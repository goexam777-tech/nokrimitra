import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-opd",
});

export const metadata: Metadata = {
  title: "Checkout | OPD Mastery E-book 2026 | NokriMitra",
  description:
    "Complete your purchase of the OPD Mastery e-book (2026 Edition). Instant PDF download after payment.",
  robots: { index: false, follow: true },
};

export default function OpdCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={plusJakarta.variable}>{children}</div>
  );
}