import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Template Preview | Nursing Notes",
  description: "Preview auto-confirmation email template for Nursing Notes.",
};

export default function NursingEmailPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
