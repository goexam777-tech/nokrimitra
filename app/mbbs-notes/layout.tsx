import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete MBBS Notes — All 21 Subjects (3,826 Pages) | ₹199 Only",
  description:
    "Complete MBBS Notes PDF covering All 21 Subjects (3,826 pages) — Anatomy, Pharmacology, Pathology, OSCE, Medicine, Surgery & more. Instant digital download at ₹199 only.",
  keywords: [
    "MBBS Notes",
    "MBBS Notes PDF",
    "Complete MBBS 21 Subjects",
    "Medical study material",
    "Anatomy notes",
    "Pharmacology notes",
    "Pathology notes",
    "OSCE clinical skills",
    "NokriMitra Medical",
  ],
  alternates: { canonical: "/mbbs-notes" },
  openGraph: {
    title: "Complete MBBS Notes — All 21 Subjects (3,826 Pages)",
    description:
      "Anatomy, Pharmacology, Pathology, OSCE & all 21 subjects. 3,826 pages of high-yield medical notes. Instant download at ₹199.",
    url: "/mbbs-notes",
    type: "website",
    images: [{ url: "/mbnote.webp" }],
  },
};

export default function MbbsNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="en">{children}</div>;
}
