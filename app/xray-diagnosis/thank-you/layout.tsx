import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed | X-Ray Diagnosis Guide",
  description:
    "Thank you for your purchase. Download your X-Ray Diagnosis Guide PDF instantly.",
  robots: { index: false, follow: false },
};

export default function XrayThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
