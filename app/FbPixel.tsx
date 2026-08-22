"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Default (old) pixel used by every product EXCEPT the GSRTC funnel.
const DEFAULT_PIXEL =
  process.env.NEXT_PUBLIC_FB_PIXEL_ID || "2012096232739016";

// Separate pixel used ONLY for the GSRTC product pages.
// Falls back to the default pixel until a dedicated GSRTC pixel id is set.
const GSRTC_PIXEL =
  process.env.NEXT_PUBLIC_FB_PIXEL_ID_GSRTC || DEFAULT_PIXEL;

// Route prefixes that belong to the GSRTC conductor product.
const GSRTC_PREFIXES = [
  "/buy",
  "/thank-you",
  "/gsrtc-mcq-course",
  "/gsrtc-conductor-model-paper-1",
  "/mcq-1",
  "/gujarat-no-itihas",
];

function isGsrtcPath(path: string): boolean {
  if (path === "/") return true;
  return GSRTC_PREFIXES.some(
    (p) => path === p || path.startsWith(p + "/")
  );
}

export default function FbPixel() {
  const pathname = usePathname();
  const initedIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const path = pathname || "/";
    const id = isGsrtcPath(path) ? GSRTC_PIXEL : DEFAULT_PIXEL;
    if (!id) return;

    let cancelled = false;

    const fire = () => {
      const w = window as unknown as { fbq?: (...a: unknown[]) => void };
      if (!w.fbq) {
        if (!cancelled) window.setTimeout(fire, 200);
        return;
      }
      // init each pixel only once per session, then fire a PageView
      // scoped to just that pixel so the two products stay separated.
      if (!initedIds.current.has(id)) {
        w.fbq("init", id);
        initedIds.current.add(id);
      }
      w.fbq("trackSingle", id, "PageView");
    };

    fire();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
