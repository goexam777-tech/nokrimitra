import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "सुरक्षित Checkout | Electric Scooter Repairing Complete Practical Guide (Hindi) | NokriMitra",
  description:
    "Electric Scooter Repairing Complete Practical Guide (Hindi) के लिए secure checkout. Payment के बाद तुरंत PDF download link मिलेगा.",
  robots: { index: false, follow: false },
};

export default function EscooterCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
