import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | OPD Mastery E-Book (2026 Edition)",
  description:
    "Complete your secure order for OPD Mastery E-Book. Instant PDF download on Email & WhatsApp.",
  robots: { index: false, follow: false },
};

export default function OpdEbookCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
