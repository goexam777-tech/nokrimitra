import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | House Plans & Vastu Bundle | NokriMitra",
  description:
    "Complete your secure order for the 10,000+ House Plans, AutoCAD Files & Vastu Designs bundle. Instant download after payment.",
  robots: { index: false, follow: false },
};

export default function VastuCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
