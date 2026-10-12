"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ANATOMY_PIXEL_ID } from "@/lib/anatomyTracking";

// Default (old) pixel used by every product EXCEPT the GSRTC funnel.
const DEFAULT_PIXEL =
  process.env.NEXT_PUBLIC_FB_PIXEL_ID || "2012096232739016";

// Separate pixel used ONLY for the GSRTC product pages.
const GSRTC_PIXEL =
  process.env.NEXT_PUBLIC_FB_PIXEL_ID_GSRTC || "1399128725611345";

// Dedicated pixel (PureWow) used ONLY for the Anatomy Coloring Book product.
const ANATOMY_PIXEL = ANATOMY_PIXEL_ID;

// Dedicated pixel used for Nursing Notes funnel (/nursing-notes/**)
const NURSING_PIXEL =
  process.env.NEXT_PUBLIC_FB_PIXEL_ID_NURSING || "1399128725611345";

// Route prefixes that use the 905602885399577 pixel (GSRTC).
const GSRTC_PREFIXES = [
  "/buy",
  "/thank-you",
  "/gsrtc-mcq-course",
  "/gsrtc-conductor-model-paper-1",
  "/mcq-1",
  "/gujarat-no-itihas",
];

// Route prefixes that use the dedicated Anatomy Coloring Book pixel.
const ANATOMY_PREFIXES = ["/anatomy-coloring-book"];

// Route prefixes that use the dedicated Nursing Notes pixel.
const NURSING_PREFIXES = ["/nursing-notes"];

function isGsrtcPath(path: string): boolean {
  if (path === "/") return true;
  return GSRTC_PREFIXES.some(
    (p) => path === p || path.startsWith(p + "/")
  );
}

function isAnatomyPath(path: string): boolean {
  return ANATOMY_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
}

function isNursingPath(path: string): boolean {
  return NURSING_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
}

export default function FbPixel() {
  const pathname = usePathname();
  const initedIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const path = pathname || "/";
    const id = isNursingPath(path)
      ? NURSING_PIXEL
      : isAnatomyPath(path)
      ? ANATOMY_PIXEL
      : isGsrtcPath(path)
      ? GSRTC_PIXEL
      : DEFAULT_PIXEL;
    if (!id) return;

    let cancelled = false;

    const fire = () => {
      const w = window as unknown as {
        fbq?: (...a: unknown[]) => void;
        __anatomyPixelInitialized?: boolean;
      };
      if (!w.fbq) {
        if (!cancelled) window.setTimeout(fire, 200);
        return;
      }
      // init each pixel only once per session, then fire a PageView
      // scoped to just that pixel so the two products stay separated.
      if (!initedIds.current.has(id)) {
        w.fbq("init", id);
        initedIds.current.add(id);
        if (id === ANATOMY_PIXEL) {
          w.__anatomyPixelInitialized = true;
        }
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
