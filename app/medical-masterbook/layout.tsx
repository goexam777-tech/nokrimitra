import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { MEDICAL_CATALOG } from "@/lib/medicalMasterbookCatalog";

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
  metadataBase: new URL("https://nokrimitra.in"),
  title: "Medical Masterbook — 5,000+ Medicines. 200+ Diseases. 500+ Pages. All in One PDF.",
  description:
    "Medical Masterbook — 5,000+ Medicines. 200+ Diseases. 500+ Pages. All in One PDF. Clinical Medicine, OPD Diagnosis, Drug Dosages, Emergency Care & Practical Medical Knowledge.",
  keywords: [
    "Medical Masterbook",
    "Clinical Medicine Handbook",
    "OPD Diagnosis Guide",
    "Drug Dosages Medical Book",
    "Emergency Medicine Protocol",
    "MBBS Clinical Guide",
    "Practical Medical Handbook",
    "Clinical Examination Notes",
  ],
  openGraph: {
    title: MEDICAL_CATALOG.name,
    description: MEDICAL_CATALOG.subheadline,
    type: "website",
    images: [
      {
        url: "/Gemini_Generated_Image_u8awxxu8awxxu8aw.webp",
        width: 1024,
        height: 1024,
        alt: MEDICAL_CATALOG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: MEDICAL_CATALOG.name,
    description: MEDICAL_CATALOG.subheadline,
    images: ["/Gemini_Generated_Image_u8awxxu8awxxu8aw.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: MEDICAL_CATALOG.name,
  description: MEDICAL_CATALOG.description,
  provider: {
    "@type": "Organization",
    name: "Medical Masterbook",
    sameAs: "https://nokrimitra.in",
  },
  offers: {
    "@type": "Offer",
    price: MEDICAL_CATALOG.price,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1680",
  },
};

export default function MedicalMasterbookLayout({
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
