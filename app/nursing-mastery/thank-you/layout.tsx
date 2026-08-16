import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Thank You | Nursing Protocol Reference Notebook",
  description:
    "Your Nursing Protocol Reference Notebook download is ready. Access your e-book instantly after payment.",
  robots: { index: false, follow: false },
};

export default function NursingThankYouLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
