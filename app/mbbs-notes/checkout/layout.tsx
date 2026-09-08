import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Complete MBBS Notes (All 21 Subjects) | NokriMitra",
  description:
    "Complete your purchase of Complete MBBS Notes (All 21 Subjects). Instant PDF download after payment.",
  robots: { index: false, follow: false },
};

export default function MbbsCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
