import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | Electric Scooter Repairing 3-Book Bundle | NokriMitra",
  description:
    "Secure checkout for the ₹149 Electric Scooter Repairing 3-Book Digital Bundle. The protected bundle download is released after your payment is verified.",
  robots: { index: false, follow: false },
};

export default function EscooterCheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
