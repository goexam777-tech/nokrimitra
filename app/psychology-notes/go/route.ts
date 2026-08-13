import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/downloadToken";

const ADDON_ITEM = "therapeutic-interventions";

function errorPage(title: string, message: string, status: number) {
  return new NextResponse(
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>body{font-family:system-ui,sans-serif;display:flex;justify-content:center;align-items:center;min-height:80vh;background:#f4f6fb;color:#333;margin:0;padding:18px}.box{width:min(100%,400px);background:#fff;border-radius:12px;padding:30px;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,.05);border-top:4px solid #12213f}h1{font-size:20px;margin:0 0 12px;color:#111827}p{font-size:14px;color:#52606d;line-height:1.5;margin:0 0 20px}.btn{display:inline-block;background:#16a34a;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:700;font-size:14px}</style></head><body><div class="box"><h1>${title}</h1><p>${message}</p><a href="mailto:support@nokrimitra.in" class="btn">Email Support</a></div></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

/**
 * Main links without a token remain supported for existing buyers. The paid
 * upsell always requires a signed token issued after Razorpay verification.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const item = searchParams.get("item");
  const token = searchParams.get("t");
  const isAddon = item === ADDON_ITEM;

  if (item && !isAddon) {
    return errorPage("Invalid download", "This download item does not exist.", 404);
  }

  if (isAddon) {
    const check = verifyDownloadToken(
      "psychology-therapeutic-interventions",
      token
    );
    if (!check.valid) {
      return errorPage(
        "Download link could not be verified",
        "Please use the add-on link from your payment confirmation page or delivery email.",
        403
      );
    }
  } else if (token) {
    const check = verifyDownloadToken("psychology", token);
    if (!check.valid) {
      return errorPage(
        "Download link could not be verified",
        "Please use the link from your payment confirmation page or delivery email.",
        403
      );
    }
  }

  const driveUrl = isAddon
    ? process.env.PSYCHOLOGY_ADDON_DRIVE_URL
    : process.env.PSYCHOLOGY_DRIVE_URL;

  if (
    driveUrl &&
    driveUrl !== "your_google_drive_link_here" &&
    driveUrl.trim() !== ""
  ) {
    const response = NextResponse.redirect(driveUrl);
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return errorPage(
    "Download link is not ready yet",
    "Please try again in a few minutes, or email our support for help.",
    404
  );
}
