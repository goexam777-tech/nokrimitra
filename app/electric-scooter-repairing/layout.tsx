import type { Metadata } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";
import { ESCOOTER_CATALOG } from "@/lib/escooterCatalog";

// Devanagari is still bundled: the books themselves are bilingual and the
// legal pages may quote Hindi terms, but the UI copy is English.
const bodyFont = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  // 800 is loaded because headings and the checkout CTA use it; without it the
  // browser only synthesises a faux-bold from 700.
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-hindi",
});

const DESCRIPTION =
  "Electric Scooter Repairing 3-Book Digital Bundle: Main Repair Guide, E-Bike Conversion Guide and Quick Diagnostic Toolkit. Step-by-step diagnostics, BLDC wiring, BMS testing and error-code lookup, in Hindi and English.";

export const metadata: Metadata = {
  title: "Electric Scooter Repairing 3-Book Bundle — Hindi & English | NokriMitra",
  description: DESCRIPTION,
  keywords: ["electric scooter repairing", "EV repair guide", "BMS testing", "BLDC motor wiring", "e-bike conversion guide", "electric scooter error codes"],
  openGraph: { title: ESCOOTER_CATALOG.name, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image", title: ESCOOTER_CATALOG.name, description: DESCRIPTION },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: ESCOOTER_CATALOG.name,
  description: DESCRIPTION,
  brand: { "@type": "Brand", name: "NokriMitra" },
  offers: { "@type": "Offer", price: ESCOOTER_CATALOG.price, priceCurrency: "INR", availability: "https://schema.org/InStock" },
};

export default function ElectricScooterRepairingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${bodyFont.className} ${bodyFont.variable}`} lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {children}
    </div>
  );
}
