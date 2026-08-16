import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ALL-In-One Nursing Notes at your Fingertips 📚",
  description:
    "Complete 600+ pages Nursing Notes PDF for Nursing Students, ANM, GNM, B.Sc & Competitive Nursing Exams.",
};

export default function NursingNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
