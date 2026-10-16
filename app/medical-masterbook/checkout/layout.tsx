import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Medical Masterbook",
  // Payment pages shouldn't show up in Google search
  robots: { index: false, follow: false },
};

export default function MedicalCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
