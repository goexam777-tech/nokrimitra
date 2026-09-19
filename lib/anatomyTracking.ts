export const ANATOMY_PIXEL_ID =
  process.env.NEXT_PUBLIC_FB_PIXEL_ID_ANATOMY || "1399128725611345";

type MetaEventData = Record<string, string | number | boolean>;

export function trackAnatomyMetaEvent(
  eventName: string,
  data: MetaEventData,
  eventId?: string,
  attempt = 0
): void {
  if (typeof window === "undefined") return;

  const pixelWindow = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    __anatomyPixelInitialized?: boolean;
  };
  const fbq = pixelWindow.fbq;
  if (typeof fbq === "function") {
    if (!pixelWindow.__anatomyPixelInitialized) {
      fbq("init", ANATOMY_PIXEL_ID);
      pixelWindow.__anatomyPixelInitialized = true;
    }

    if (eventId) {
      fbq("trackSingle", ANATOMY_PIXEL_ID, eventName, data, {
        eventID: eventId,
      });
    } else {
      fbq("trackSingle", ANATOMY_PIXEL_ID, eventName, data);
    }
    return;
  }

  if (attempt < 15) {
    window.setTimeout(
      () => trackAnatomyMetaEvent(eventName, data, eventId, attempt + 1),
      250
    );
  }
}
