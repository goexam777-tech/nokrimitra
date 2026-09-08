"use client";

import { useEffect } from "react";

const PRODUCT_NAME = "Complete MBBS Notes (All 21 Subjects)";
const PRICE = 199;

export default function MbbsAnalytics() {
  useEffect(() => {
    let cancelled = false;

    const fire = () => {
      if (cancelled) return;
      const w = window as unknown as {
        fbq?: (...args: unknown[]) => void;
        gtag?: (...args: unknown[]) => void;
      };

      if (!w.fbq && !w.gtag) {
        window.setTimeout(fire, 200);
        return;
      }

      if (w.fbq) {
        w.fbq("track", "ViewContent", {
          content_name: PRODUCT_NAME,
          content_category: "Medical Notes",
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
