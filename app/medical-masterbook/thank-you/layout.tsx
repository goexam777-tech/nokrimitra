import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful | Medical Masterbook",
  // Order pages shouldn't show up in Google search
  robots: { index: false, follow: false },
};

export default function MedicalThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
