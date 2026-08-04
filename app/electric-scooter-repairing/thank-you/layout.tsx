import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "धन्यवाद | Electric Scooter Repairing Complete Practical Guide (Hindi) | NokriMitra",
  description:
    "आपका order confirm हो गया है. Electric Scooter Repairing Guide अभी download करें.",
  robots: { index: false, follow: false },
};

export default function EscooterThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
