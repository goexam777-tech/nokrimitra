import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed | OPD Mastery E-Book (2026 Edition)",
  description:
    "Thank you for your order. Download your OPD Mastery E-Book and clinical guides instantly.",
  robots: { index: false, follow: false },
};

export default function OpdEbookThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
