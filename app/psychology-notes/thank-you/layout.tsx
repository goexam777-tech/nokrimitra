import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed | Psychology Notes | NokriMitra",
  description:
    "Thank you for your purchase! Download your Psychology Notes materials here.",
  robots: { index: false, follow: false },
};

export default function PsyThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
