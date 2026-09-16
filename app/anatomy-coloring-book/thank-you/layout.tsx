import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | 500+ Human Anatomy Coloring Book Bundle",
  description:
    "Your payment is confirmed. Download your 500+ Human Anatomy Coloring Book Bundle instantly.",
  robots: { index: false, follow: false },
};

export default function AnatomyThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
