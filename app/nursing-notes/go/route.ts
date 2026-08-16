import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/downloadToken";

/**
 * Branded tokenized download route for ALL-In-One Nursing Notes PDF.
 * e.g. https://nokrimitra.in/nursing-notes/go?t=<token>
 *
 * The token is issued after a valid Razorpay payment verification,
 * protecting the direct Google Drive link while giving instant access to legitimate buyers.
 */
const COOKIE_NAME = "nm_nursing_dl";
const GOOGLE_DRIVE_PDF_LINK =
  process.env.NURSING_NOTES_DRIVE_URL ||
  process.env.NURSING_DRIVE_URL ||
  "https://drive.google.com/file/d/1DH3zflyLjRkZq5eEy_YhtH-LWWuLWs7D/view?usp=sharing";
const SUPPORT_MAIL =
  "mailto:support@nokrimitra.in?subject=Nursing%20Notes%20download%20help";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const urlToken = url.searchParams.get("t");
  const cookieToken = readCookie(req.headers.get("cookie"), COOKIE_NAME);
  const token = urlToken || cookieToken;

  const check = verifyDownloadToken("nursing", token);

  if (!check.valid) {
    return blockedResponse(check.reason);
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
        path: "/nursing-notes",
        maxAge: 60 * 60 * 24 * 180, // 180 days access
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

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

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
      ? "Your Nursing Notes PDF is still yours. Send us your Order ID and we will share a fresh link."
      : "Download links only work for verified buyers. Please use the link from your confirmation email.",
    note: "Already purchased? Contact support with your Order ID for instant assistance.",
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
      font-family: Arial, Helvetica, sans-serif;
    }
    .box { width: 100%; max-width: 480px; border-radius: 20px; overflow: hidden; background: #fff; box-shadow: 0 16px 40px rgba(15,23,42,.1); border: 1px solid #e2e8f0; }
    .strip { padding: 13px 22px; background: #dc2626; color: #fff; font-size: .72rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
    .body { padding: 24px 22px; }
    h1 { margin: 0 0 10px; font-size: 1.25rem; font-weight: 800; letter-spacing: -.025em; line-height: 1.3; color: #0f172a; }
    p { margin: 0 0 16px; font-size: .92rem; color: #475569; }
    .note { padding: 14px 15px; margin: 0 0 18px; border-radius: 12px; background: #f1f5f9; font-size: .84rem; color: #334155; }
    .btn { display: flex; min-height: 52px; align-items: center; justify-content: center; border-radius: 14px; background: linear-gradient(180deg,#22c55e,#16a34a); color: #fff; font-size: 1rem; font-weight: 700; text-decoration: none; }
    .back { display: flex; min-height: 44px; align-items: center; justify-content: center; margin-top: 10px; color: #2563eb; font-size: .85rem; font-weight: 600; text-decoration: none; }
  </style>
</head>
<body>
  <div class="box">
    <div class="strip">${strip}</div>
    <div class="body">
      <h1>${title}</h1>
      <p>${message}</p>
      <div class="note">${note}</div>
      <a class="btn" href="${SUPPORT_MAIL}">Contact Support</a>
      <a class="back" href="/nursing-notes">Back to Nursing Notes</a>
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
