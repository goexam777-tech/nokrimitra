import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "સુરક્ષિત ચેકઆઉટ | GSRTC કંડક્ટર MCQ પેકેજ | નોકરી મિત્ર",
  description: "GSRTC કંડક્ટર MCQ પેકેજ માટે સુરક્ષિત ચેકઆઉટ. પેમેન્ટ પછી તરત ડાઉનલોડ.",
  robots: { index: false, follow: false },
};

export default function McqCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
