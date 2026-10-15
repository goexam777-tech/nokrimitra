import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful | Electric Repairing Course",
  // Order pages shouldn't show up in Google search
  robots: { index: false, follow: false },
};

export default function ElectricThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
