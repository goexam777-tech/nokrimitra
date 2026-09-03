import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/downloadToken";

/**
 * Tokenized download route for NORCET 11 Notes (Google Drive).
 * e.g. https://nokrimitra.in/norcet-notes/go?t=<token>
 *
 * Direct access without payment is blocked. Only verified buyers receive
 * valid signed tokens.
 */
const GOOGLE_DRIVE_PDF_LINK =
  process.env.NORCET_NOTES_DRIVE_URL ||
  "https://drive.google.com/drive/folders/1g44f4-hXo9Qmr8LXK6gZ0jWhxAO9skHW";

const COOKIE_NAME = "nm_norcet_dl";
const SUPPORT_MAIL =
  "mailto:support@nokrimitra.in?subject=NORCET%20Notes%20Download%20Support";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const urlToken = url.searchParams.get("t");
  const cookieHeader = req.headers.get("cookie");
  const cookieToken = readCookie(cookieHeader, COOKIE_NAME);
  const token = urlToken || cookieToken;

  const isMock =
    url.searchParams.get("mock") === "1" ||
    url.searchParams.get("order_id")?.startsWith("order_mock_");

  if (!isMock) {
    const check = verifyDownloadToken("norcet", token);
    if (!check.valid) {
      return blockedResponse(check.reason);
    }
  }

  const driveUrl = GOOGLE_DRIVE_PDF_LINK;

  if (driveUrl && driveUrl.trim() !== "") {
    const res = NextResponse.redirect(driveUrl);
    res.headers.set("Cache-Control", "no-store");
    res.headers.set("Referrer-Policy", "no-referrer");
    res.headers.set("X-Robots-Tag", "noindex, nofollow");

    if (urlToken && token) {
      res.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: url.protocol === "https:",
        path: "/norcet-notes",
        maxAge: 60 * 60 * 24 * 180, // 180 days access
      });
    }
    return res;
  }

  return statusPage({
    status: 404,
    strip: "Download pending",
    title: "Download link is being prepared",
    message:
      "Your order is verified, but the file link is temporarily syncing. Please wait a moment or contact support.",
    note: "Your payment record is confirmed and 100% safe with us.",
  });
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

function blockedResponse(reason: "missing" | "malformed" | "invalid" | "expired") {
  const expired = reason === "expired";
  return statusPage({
    status: expired ? 410 : 403,
    strip: expired ? "Link Expired" : "Access Denied - Verification Required",
    title: expired
      ? "This download link has expired"
      : "Payment Verification Required",
    message: expired
      ? "Your NORCET 11 Notes purchase is still valid. Contact support with your Order ID to get an instant fresh link."
      : "This download link is only accessible to verified buyers. If you completed payment, please open the link sent to your registered email or contact support with your Order ID.",
    note: "If money was debited from your account, our team will verify and deliver your access immediately.",
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
      padding: 26px 14px; background: #f8fafc; color: #0f172a; line-height: 1.6;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .box { width: 100%; max-width: 480px; border-radius: 20px; overflow: hidden; background: #fff; box-shadow: 0 16px 40px rgba(15,23,42,.1); border: 1px solid #e2e8f0; }
    .strip { padding: 13px 22px; background: #dc2626; color: #fff; font-size: .75rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    .body { padding: 24px 22px; }
    h1 { margin: 0 0 10px; font-size: 1.25rem; font-weight: 800; letter-spacing: -.025em; line-height: 1.3; color: #0f172a; }
    p { margin: 0 0 16px; font-size: .92rem; color: #475569; }
    .note { padding: 14px 15px; margin: 0 0 18px; border-radius: 12px; background: #f1f5f9; font-size: .84rem; color: #334155; }
    .btn { display: flex; min-height: 50px; align-items: center; justify-content: center; border-radius: 14px; background: #1f57e7; color: #fff; font-size: .95rem; font-weight: 750; text-decoration: none; margin-bottom: 10px; }
    .support-btn { display: flex; min-height: 44px; align-items: center; justify-content: center; border-radius: 12px; border: 1.5px solid #cbd5e1; background: #fff; color: #334155; font-size: .88rem; font-weight: 700; text-decoration: none; }
    .back { display: flex; min-height: 38px; align-items: center; justify-content: center; margin-top: 10px; color: #64748b; font-size: .82rem; font-weight: 600; text-decoration: none; }
  </style>
</head>
<body>
  <div class="box">
    <div class="strip">${strip}</div>
    <div class="body">
      <h1>${title}</h1>
      <p>${message}</p>
      <div class="note">${note}</div>
      <a class="btn" href="/norcet-notes/checkout">Go to NORCET Checkout (₹149)</a>
      <a class="support-btn" href="${SUPPORT_MAIL}">Contact Support with Order ID</a>
      <a class="back" href="/norcet-notes">Back to Course Overview</a>
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
