import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-nursing",
});

export const metadata: Metadata = {
  title: "Checkout | Nursing Protocol Reference Notebook",
  description:
    "Secure checkout for the Nursing Protocol Reference Notebook — 100 ward situations across 7 clinical sections. Instant PDF download after payment.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#092d62",
};

export default function NursingCheckoutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={montserrat.variable}>{children}</div>;
}
