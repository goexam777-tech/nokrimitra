import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | 500+ Human Anatomy Coloring Book Bundle",
  description:
    "Complete your secure ₹149 order for the 500+ Human Anatomy Coloring Book Bundle. Your PDF download link is delivered by email after payment.",
  robots: { index: false, follow: false },
};

export default function AnatomyCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
