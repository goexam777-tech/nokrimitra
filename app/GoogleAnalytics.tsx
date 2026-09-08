"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function GoogleAnalyticsTracker({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId || typeof window === "undefined") return;

    // 1. Ensure dataLayer and gtag are always defined on window
    const w = window as unknown as {
      dataLayer: unknown[];
      gtag: (...args: unknown[]) => void;
    };
    w.dataLayer = w.dataLayer || [];
    if (typeof w.gtag !== "function") {
      w.gtag = function () {
        w.dataLayer.push(arguments);
      };
    }

    const queryString = searchParams?.toString();
    const url = pathname + (queryString ? `?${queryString}` : "");

    // 2. Track page_view in GA4 on every single-page navigation
    w.gtag("config", gaId, {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });

    w.gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams, gaId]);

  return null;
}

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  if (!gaId) return null;

  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsTracker gaId={gaId} />
    </Suspense>
  );
}
