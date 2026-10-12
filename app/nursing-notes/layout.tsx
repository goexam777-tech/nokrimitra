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
  return (
    <>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1399128725611345&ev=PageView&noscript=1"
          alt="facebook pixel"
        />
      </noscript>
      {children}
    </>
  );
}
