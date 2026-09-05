import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Status - 31 Medical Master PDFs Bundle",
  description:
    "Official order confirmation and download page for 31 Medical Master PDFs Bundle.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
