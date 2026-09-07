import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Psychology Notes PDF | NokriMitra",
  description:
    "Secure checkout for Psychology Notes PDF (Basic to Advance). Instant download access after payment.",
  robots: { index: false, follow: false },
};

export default function PsyCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
