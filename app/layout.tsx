import type { Metadata } from "next";
import { Noto_Sans_Gujarati } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "2012096232739016";
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-5YV4ZMWTDC";

  return (
    <html lang="gu">
      <head>
        {/* Google AdSense */}
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7620768572446680"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* Google Analytics (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={notoGujarati.className}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            alt="facebook pixel"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}

