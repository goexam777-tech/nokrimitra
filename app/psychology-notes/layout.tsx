import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Psychology Notes PDF — Basic to Advance | NokriMitra",
  description:
    "Complete Psychology Notes PDF (Basic to Advance) with easy notes, visual diagrams and 17+ topics — from Science of Psychology to Personality & Disorders. Instant download after purchase.",
  keywords: [
    "Psychology Notes",
    "Psychology PDF",
    "Psychology study material",
    "Basic to Advance Psychology",
    "Psychology notes for students",
    "NokriMitra",
  ],
  alternates: { canonical: "/psychology-notes" },
  openGraph: {
    title: "Psychology Notes PDF — Basic to Advance | NokriMitra",
    description:
      "Complete Psychology Notes (Basic to Advance) with easy notes & diagrams. Instant download. Limited-time 96% OFF — only ₹99.",
    url: "/psychology-notes",
    type: "website",
    images: [{ url: "/clinical1.webp" }],
  },
};

export default function PsychologyNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="en">{children}</div>;
}
