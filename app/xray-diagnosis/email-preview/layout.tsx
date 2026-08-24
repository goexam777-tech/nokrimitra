import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Template Preview | X-Ray Diagnosis",
  description: "Preview auto-confirmation email template for X-Ray Diagnosis.",
  robots: { index: false, follow: false },
};

export default function XrayEmailPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
