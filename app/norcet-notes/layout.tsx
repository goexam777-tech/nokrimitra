import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "India's Most Trusted NORCET 11 NOTES Platform | ₹149 Only",
  description:
    "Crack NORCET with high-yield, exam-focused notes covering all nursing topics — 700+ pages, simple explanations, high-yield points, and instant PDF download for Nursing Officer exams.",
  keywords: [
    "NORCET 11",
    "NORCET Notes",
    "AIIMS Nursing Officer",
    "NORCET 2024",
    "NORCET 2025",
    "Nursing Officer Exam Notes",
    "AIIMS NORCET Notes PDF",
    "ESIC Nursing Notes",
    "Safdarjung Nursing Notes",
  ],
  openGraph: {
    title: "India's Most Trusted NORCET 11 NOTES Platform",
    description:
      "Crack NORCET with high-yield, exam-focused notes covering all nursing topics — 700+ Pages, Instant PDF Download.",
    type: "website",
  },
};

export default function NorcetNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
