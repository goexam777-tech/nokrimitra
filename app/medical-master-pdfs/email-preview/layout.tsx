import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automatic Email Preview - 31 Medical Master PDFs Bundle",
  description: "Preview the automatic order delivery email sent to customers upon payment.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmailPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
