import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Confirmed | EV Repair 3-Book Bundle | NokriMitra",
  description: "Verified buyers can download the Electric Scooter Repairing 3-Book Digital Bundle here.",
  robots: { index: false, follow: false },
};

export default function EscooterThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
