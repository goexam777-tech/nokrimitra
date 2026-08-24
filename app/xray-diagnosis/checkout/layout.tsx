import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | X-Ray Diagnosis Guide",
  description:
    "Complete your secure purchase of the X-Ray Diagnosis Guide. Instant PDF delivery on email after payment.",
  robots: { index: false, follow: false },
};

export default function XrayCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
