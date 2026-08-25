import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | 2000+ AI Baby Reels Bundle",
  description:
    "Your payment is confirmed. Download your 2000+ AI Baby Reels Bundle and free bonus resources.",
  robots: { index: false, follow: false },
};

export default function AiReelsThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
