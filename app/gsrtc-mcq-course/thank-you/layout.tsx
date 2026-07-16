import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "આભાર | GSRTC કંડક્ટર MCQ પેકેજ | નોકરી મિત્ર",
  description: "તમારો ઓર્ડર કન્ફર્મ થઈ ગયો છે. તરત ડાઉનલોડ કરો.",
  robots: { index: false, follow: false },
};

export default function McqThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
