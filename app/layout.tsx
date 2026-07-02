import type { Metadata } from "next";
import { Noto_Sans_Gujarati } from "next/font/google";
import "./globals.css";

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "નોકરી મિત્ર | GSRTC કંડક્ટર તૈયારી",
  description:
    "GSRTC કંડક્ટર ભરતી પરીક્ષાની સંપૂર્ણ તૈયારી માટે ગુજરાતીમાં અભ્યાસ સામગ્રી, PDF અને માર્ગદર્શન.",
  keywords: [
    "GSRTC",
    "કંડક્ટર",
    "GSRTC conductor",
    "ગુજરાત ભરતી",
    "નોકરી મિત્ર",
    "nokrimitra",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="gu">
      <body className={notoGujarati.className}>{children}</body>
    </html>
  );
}
