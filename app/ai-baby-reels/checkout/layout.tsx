import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | 2000+ AI Baby Reels Bundle",
  description:
    "Complete your secure purchase of the 2000+ AI Baby Reels Bundle. Instant download + email delivery after payment.",
  robots: { index: false, follow: false },
};

export default function AiReelsCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
