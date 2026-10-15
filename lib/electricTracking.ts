/**
 * Meta Pixel helper for the Electric Repairing course.
 * Uses the same pixel as the home page (GSRTC pixel) and sends every event
 * ONLY to that pixel via `trackSingle`, so other products' pixels never get it.
 * Waits for the Facebook script to load instead of silently dropping events.
 */
export const ELECTRIC_PIXEL_ID =
  process.env.NEXT_PUBLIC_FB_PIXEL_ID_GSRTC || "1399128725611345";

type MetaEventData = Record<string, string | number | boolean>;

export function trackElectricMetaEvent(
  eventName: string,
  data: MetaEventData,
  eventId?: string,
  attempt = 0
): void {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    __nmInitedPixels?: Set<string>;
  };

  if (typeof w.fbq === "function") {
    w.__nmInitedPixels = w.__nmInitedPixels || new Set<string>();
    if (!w.__nmInitedPixels.has(ELECTRIC_PIXEL_ID)) {
      w.fbq("init", ELECTRIC_PIXEL_ID);
      w.__nmInitedPixels.add(ELECTRIC_PIXEL_ID);
    }
    if (eventId) {
      w.fbq("trackSingle", ELECTRIC_PIXEL_ID, eventName, data, { eventID: eventId });
    } else {
      w.fbq("trackSingle", ELECTRIC_PIXEL_ID, eventName, data);
    }
    return;
  }

  // Script not loaded yet: retry for up to ~10 seconds
  if (attempt < 40) {
    window.setTimeout(
      () => trackElectricMetaEvent(eventName, data, eventId, attempt + 1),
      250
    );
  }
}

/** GA4 item used in all Electric course ecommerce events */
export const ELECTRIC_GA_ITEM = {
  item_id: "electric-repairing-master-course",
  item_name: "Complete Electric & Repairing Master Course",
  item_category: "Course",
  quantity: 1,
};

/**
 * Sends a GA4 event once Google Analytics is configured on the page.
 * The root layout queues `gtag('config', ...)` after the page has loaded;
 * events sent before that can be lost, so we wait for the config entry
 * in dataLayer (up to ~10s) before sending.
 */
export function trackElectricGaEvent(
  eventName: string,
  params: Record<string, unknown>,
  attempt = 0
): void {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  const configured =
    Array.isArray(w.dataLayer) &&
    w.dataLayer.some(
      (entry) =>
        entry != null &&
        typeof entry === "object" &&
        (entry as { 0?: unknown })[0] === "config"
    );

  if (typeof w.gtag === "function" && configured) {
    w.gtag("event", eventName, params);
    return;
  }

  if (attempt < 40) {
    window.setTimeout(() => trackElectricGaEvent(eventName, params, attempt + 1), 250);
  }
}
