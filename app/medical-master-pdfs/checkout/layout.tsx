import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - 31 Medical Master PDFs Bundle | Instant Access ₹149",
  description:
    "Complete your order for 31 Medical Master PDFs Bundle (20 Core + 11 Free Bonuses). 100% Secure Checkout, Instant Digital Access.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
