import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | NORCET 11 Notes (700+ Pages PDF)",
  description: "Secure checkout for NORCET 11 Notes. Instant PDF delivery to your email.",
};

export default function NorcetCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
