import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Successful - Thank You! 🎉 | Nursing Notes",
  description:
    "Thank you for your Nursing Notes purchase. Download your 600+ pages PDF below.",
};

export default function NursingThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
