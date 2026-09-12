"use client";

import { useEffect, useRef } from "react";

const PRODUCT_NAME = "OPD Mastery E-book (2026 Edition)";
const PRICE = 149;

export default function OpdAnalytics() {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasTrackedRef.current) return;
    hasTrackedRef.current = true;

    const w = window as unknown as {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
      fbq?: (...args: unknown[]) => void;
    };

    // 1. Google Analytics (view_item)
    w.dataLayer = w.dataLayer || [];
    if (typeof w.gtag !== "function") {
      w.gtag = function () {
        w.dataLayer?.push(arguments);
      };
    }
    w.gtag?.("event", "view_item", {
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

    // 2. Facebook Pixel (ViewContent)
    const fireFb = (attempts = 0) => {
      if (typeof w.fbq === "function") {
        w.fbq("track", "ViewContent", {
          content_name: PRODUCT_NAME,
          content_category: "Medical E-book",
          value: PRICE,
          currency: "INR",
        });
      } else if (attempts < 10) {
        setTimeout(() => fireFb(attempts + 1), 300);
      }
    };
    fireFb();
  }, []);

  return null;
}
