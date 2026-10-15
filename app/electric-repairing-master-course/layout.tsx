import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { ELECTRIC_CATALOG } from "@/lib/electricCatalog";

const fontHeading = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  // Makes share-preview image URLs absolute (WhatsApp / Facebook need full URLs)
  metadataBase: new URL("https://nokrimitra.in"),
  // Short tab / Google title (~50 chars so it isn't cut off)
  title: "Electric & Repairing Master Course | AC, Fridge, Wiring",
  description:
    "AC, Fridge, Cooler, Fan, Motor, Pump, House Wiring & Mobile Repairing, Sab Kuch Ek Hi Complete Course Mein! Beginner se practical repair skills tak, step-by-step learning.",
  keywords: [
    "Electric Repairing Course",
    "Complete Electric and Repairing Master Course",
    "AC Repairing Course",
    "Fridge Repairing",
    "House Electrical Wiring",
    "Motor Pump Repairing",
    "Mobile Repairing Course",
    "Electrician Practical Training",
  ],
  openGraph: {
    title: ELECTRIC_CATALOG.name,
    description: ELECTRIC_CATALOG.subheadline,
    type: "website",
    images: [
      {
        url: "/basic-repairing-ebook.webp",
        width: 1200,
        height: 675,
        alt: ELECTRIC_CATALOG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ELECTRIC_CATALOG.name,
    description: ELECTRIC_CATALOG.subheadline,
    images: ["/basic-repairing-ebook.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: ELECTRIC_CATALOG.name,
  description: ELECTRIC_CATALOG.description,
  provider: {
    "@type": "Organization",
    name: "Electric Repairing Master",
    sameAs: "https://nokrimitra.in",
  },
  offers: {
    "@type": "Offer",
    price: ELECTRIC_CATALOG.price,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1450",
  },
};

export default function ElectricRepairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${fontHeading.variable} ${fontBody.variable} ${fontBody.className}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
