import type { Metadata } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";

const hindiFont = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-hindi",
});

const PRODUCT_NAME =
  "Electric Scooter Repairing Complete Practical Guide (Hindi)";
const PRODUCT_DESC =
  "Electric Scooter Repairing की complete practical guide हिंदी में — Battery, BMS, BLDC Motor, Controller, Wiring Diagram, Throttle, Hall Sensor, Charger Repair, Fault Finding और Error Codes. Instant PDF download, lifetime access.";

export const metadata: Metadata = {
  title:
    "Electric Scooter Repairing Complete Practical Guide (Hindi) — PDF Guide | NokriMitra",
  description: PRODUCT_DESC,
  keywords: [
    "electric scooter repairing",
    "electric scooter repairing hindi",
    "e-scooter repair guide",
    "EV repairing course hindi",
    "BLDC motor repair",
    "BMS battery repair",
    "scooter controller repair",
    "electric scooter wiring diagram",
    "electric scooter error codes",
    "EV technician guide hindi",
    "NokriMitra",
  ],
  openGraph: {
    title:
      "Electric Scooter Repairing Complete Practical Guide (Hindi) — PDF Guide",
    description: PRODUCT_DESC,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Electric Scooter Repairing Complete Practical Guide (Hindi) — PDF Guide",
    description: PRODUCT_DESC,
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: PRODUCT_NAME,
  description: PRODUCT_DESC,
  brand: {
    "@type": "Brand",
    name: "NokriMitra",
  },
  offers: {
    "@type": "Offer",
    price: 149,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
  },
};

export default function ElectricScooterRepairingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${hindiFont.className} ${hindiFont.variable}`} lang="hi">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {children}
    </div>
  );
}
