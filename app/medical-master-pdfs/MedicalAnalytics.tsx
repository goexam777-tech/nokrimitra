"use client";

import { useEffect } from "react";

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "2012096232739016";
const PRODUCT_NAME = "31 Medical Master PDFs Bundle";
const PRICE = 149;

export default function MedicalAnalytics() {
  useEffect(() => {
    let cancelled = false;

    const fire = () => {
      if (cancelled) return;
      const w = window as unknown as {
        fbq?: (...args: unknown[]) => void;
        gtag?: (...args: unknown[]) => void;
      };

      if (!w.fbq && !w.gtag) {
        window.setTimeout(fire, 250);
        return;
      }

      if (w.fbq) {
        w.fbq("track", "ViewContent", {
          content_name: PRODUCT_NAME,
          content_category: "Medical PDFs",
          value: PRICE,
          currency: "INR",
        });
        w.fbq("trackSingle", PIXEL_ID, "ViewContent", {
          content_name: PRODUCT_NAME,
          content_category: "Medical PDFs",
          value: PRICE,
          currency: "INR",
        });
      }

      if (w.gtag) {
        w.gtag("event", "view_item", {
          currency: "INR",
          value: PRICE,
          items: [
            {
              item_name: PRODUCT_NAME,
              price: PRICE,
              quantity: 1,
            },
          ],
        });
      }
    };

    fire();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
