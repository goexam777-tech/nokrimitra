import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/downloadToken";

/**
 * Branded download link for the OPD Mastery e-book.
 * e.g. https://nokrimitra.in/opd-mastery/go?t=<token>
 *
 * The token is issued only after a Razorpay payment signature is verified,
 * so the link works for buyers (including from their email, on any device)
 * but not for anyone who simply guesses the URL.
 */
const MAIN_COOKIE_NAME = "nm_opd_dl";
const ADDON_COOKIE_NAME = "nm_opd_emergency_dl";
const ADDON_ID = "emergency-handbook";
const SUPPORT_MAIL =
  "mailto:goexam777@gmail.com?subject=OPD%20Mastery%20download%20help";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const item = url.searchParams.get("item");
  if (item && item !== ADDON_ID) {
    return statusPage({
      status: 404,
      strip: "Not found",
      title: "This download does not exist",
      message: "Please use the download link from your confirmation email.",
      note: "Need help? Contact support with your Order ID.",
    });
  }

  const isAddon = item === ADDON_ID;
  const tokenProduct = isAddon ? "opd-emergency-handbook" : "opd";
  const cookieName = isAddon ? ADDON_COOKIE_NAME : MAIN_COOKIE_NAME;
  const urlToken = url.searchParams.get("t");
  const cookieToken = readCookie(req.headers.get("cookie"), cookieName);
  const token = urlToken || cookieToken;
  const check = verifyDownloadToken(tokenProduct, token);

  if (!check.valid) {
    return blockedResponse(check.reason);
  }

  const driveUrl = isAddon
    ? process.env.OPD_EMERGENCY_MEDICINE_HANDBOOK_DRIVE_URL
    : process.env.OPD_DRIVE_URL;

  if (
    driveUrl &&
    driveUrl !== "your_google_drive_link_here" &&
    driveUrl.trim() !== ""
  ) {
    const res = NextResponse.redirect(driveUrl);
    res.headers.set("Cache-Control", "no-store");
    res.headers.set("Referrer-Policy", "no-referrer");
    res.headers.set("X-Robots-Tag", "noindex, nofollow");

    if (urlToken && token) {
      res.cookies.set(cookieName, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: url.protocol === "https:",
        path: "/opd-mastery",
        maxAge: 60 * 60 * 24 * 180,
      });
    }
    return res;
  }

  return statusPage({
    status: 404,
    strip: "Download pending",
    title: "Your download link is not ready yet",
    message:
      "Please try again shortly, or contact support and we will send your link right away.",
    note: "Your payment record is safe with us.",
  });
}

/** Reads one cookie value from a request Cookie header. */
function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

/** Page shown when a download link is missing, tampered or expired. */
function blockedResponse(
  reason: "missing" | "malformed" | "invalid" | "expired"
) {
  const expired = reason === "expired";
  return statusPage({
    status: expired ? 410 : 403,
    strip: expired ? "Link expired" : "Access denied",
    title: expired
      ? "This download link has expired"
      : "This download link is not valid",
    message: expired
      ? "Your e-book is still yours. Send us your Order ID and we will share a fresh link."
      : "Download links only work for buyers. Please use the link from your confirmation email.",
    note: "Already purchased? Send your Order ID and we will resend the link.",
  });
}

function statusPage({
  status,
  strip,
  title,
  message,
  note,
}: {
  status: number;
  strip: string;
  title: string;
  message: string;
  note: string;
}) {
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex,nofollow">
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
      padding: 26px 14px; background: #eef6ff; color: #101820; line-height: 1.6;
      font-family: Arial, Helvetica, sans-serif;
    }
    .box { width: 100%; max-width: 480px; border-radius: 20px; overflow: hidden; background: #fff; box-shadow: 0 16px 40px rgba(30,77,150,.12); }
    .strip { padding: 13px 22px; background: #e5271c; color: #fff; font-size: .72rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
    .body { padding: 24px 22px; }
    h1 { margin: 0 0 10px; font-size: 1.25rem; font-weight: 800; letter-spacing: -.025em; line-height: 1.3; color: #092d62; }
    p { margin: 0 0 16px; font-size: .92rem; color: #4f5c6b; }
    .note { padding: 14px 15px; margin: 0 0 18px; border-radius: 12px; background: #f4f8fd; font-size: .84rem; color: #5d6c7c; }
    .btn { display: flex; min-height: 54px; align-items: center; justify-content: center; border-radius: 14px; background: linear-gradient(135deg,#1179e2,#0c4f9f); color: #fff; font-size: 1rem; font-weight: 800; text-decoration: none; }
    .back { display: flex; min-height: 44px; align-items: center; justify-content: center; margin-top: 10px; color: #0d3aa0; font-size: .85rem; font-weight: 700; text-decoration: none; }
  </style>
</head>
<body>
  <div class="box">
    <div class="strip">${strip}</div>
    <div class="body">
      <h1>${title}</h1>
      <p>${message}</p>
      <div class="note">${note}</div>
      <a class="btn" href="${SUPPORT_MAIL}">Contact support</a>
      <a class="back" href="/opd-mastery">Back to OPD Mastery</a>
    </div>
  </div>
</body>
</html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    }
  );
}
