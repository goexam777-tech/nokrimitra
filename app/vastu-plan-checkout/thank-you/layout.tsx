import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You For Your Purchase | NokriMitra",
  description:
    "Your House Plans & Vastu bundle is confirmed. Download your files instantly.",
  robots: { index: false, follow: false },
};

export default function VastuThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
