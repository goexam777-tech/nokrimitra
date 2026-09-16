import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | 500+ Human Anatomy Coloring Book Bundle",
  description:
    "Complete your secure order for the 500+ Human Anatomy Coloring Book Bundle. Instant PDF download on Email & WhatsApp.",
  robots: { index: false, follow: false },
};

export default function AnatomyCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
