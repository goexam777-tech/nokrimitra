import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Electric Repairing Course",
  // Payment pages shouldn't show up in Google search
  robots: { index: false, follow: false },
};

export default function ElectricCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
