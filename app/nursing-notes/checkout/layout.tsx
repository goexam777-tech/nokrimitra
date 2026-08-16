import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | Nursing Notes 🔒",
  description: "Complete your order for ALL-In-One Nursing Notes PDF.",
};

export default function NursingCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
