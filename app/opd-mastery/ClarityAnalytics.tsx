"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

/**
 * Microsoft Clarity, scoped to the OPD Mastery funnel only.
 *
 * Rendered from app/opd-mastery/layout.tsx, so it loads on the OPD landing
 * page, checkout, thank-you and legal pages, but on no other product.
 */
const PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

// Guards against a second init during client-side navigation or React's
// development double-render.
let started = false;

export default function ClarityAnalytics() {
  useEffect(() => {
    if (started || !PROJECT_ID) return;
    // Local and preview sessions are skipped so the dashboard only holds
    // real visitor recordings.
    if (process.env.NODE_ENV !== "production") return;

    started = true;
    Clarity.init(PROJECT_ID);
  }, []);

  return null;
}
