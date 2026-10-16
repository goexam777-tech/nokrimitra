/**
 * Tracking helper for the Medical Masterbook product.
 * Supports Meta Pixel and GA4 events.
 */
export const MEDICAL_PIXEL_ID =
  process.env.NEXT_PUBLIC_FB_PIXEL_ID_GSRTC || "1399128725611345";

type MetaEventData = Record<string, string | number | boolean>;

export function trackMedicalMetaEvent(
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
    if (!w.__nmInitedPixels.has(MEDICAL_PIXEL_ID)) {
      w.fbq("init", MEDICAL_PIXEL_ID);
      w.__nmInitedPixels.add(MEDICAL_PIXEL_ID);
    }
    if (eventId) {
      w.fbq("trackSingle", MEDICAL_PIXEL_ID, eventName, data, { eventID: eventId });
      w.fbq("track", eventName, data, { eventID: eventId });
    } else {
      w.fbq("trackSingle", MEDICAL_PIXEL_ID, eventName, data);
      w.fbq("track", eventName, data);
    }
    return;
  }

  // Script not loaded yet: retry for up to ~10 seconds
  if (attempt < 40) {
    window.setTimeout(
      () => trackMedicalMetaEvent(eventName, data, eventId, attempt + 1),
      250
    );
  }
}

/** GA4 item used in all Medical Masterbook ecommerce events */
export const MEDICAL_GA_ITEM = {
  item_id: "medical-masterbook",
  item_name: "Medical Masterbook",
  item_category: "Book",
  quantity: 1,
};

/**
 * Sends a GA4 event once Google Analytics is configured on the page.
 */
export function trackMedicalGaEvent(
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
    window.setTimeout(() => trackMedicalGaEvent(eventName, params, attempt + 1), 250);
  }
}
