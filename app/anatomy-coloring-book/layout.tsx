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
  title: "500+ Human Anatomy Coloring Book Bundle | Anatomy Study Guide PDF",
  description:
    "500+ Human Anatomy Coloring Book Bundle covering all body systems with labelled diagrams and MCQs. Instant PDF download for nursing, MBBS and paramedical students.",
};

export default function AnatomyLayout({
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
