import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import ClarityAnalytics from "../opd-mastery/ClarityAnalytics";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-opd",
});

export const metadata: Metadata = {
  title: "OPD Mastery E-Book 2026 | Clinical Reference Guide",
  description:
    "OPD Mastery Clinical Practice E-Book (2026 Edition). Instant PDF download for MBBS, BAMS, BHMS, and Medical Interns.",
};

export default function OpdEbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={plusJakarta.variable}>
      <ClarityAnalytics />
      {children}
    </div>
  );
}
