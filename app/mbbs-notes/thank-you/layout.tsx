import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank you | Complete MBBS Notes (All 21 Subjects) | NokriMitra",
  description:
    "Your order is confirmed. Download Complete MBBS Notes (All 21 Subjects, 3,826 pages).",
  robots: { index: false, follow: false },
};

export default function MbbsThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
