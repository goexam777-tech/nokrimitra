import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/downloadToken";

/**
 * Tokenized access route for Medical Masterbook.
 * e.g. /medical-masterbook/go?t=<token>
 */
const MAIN_COOKIE_NAME = "nm_medical_dl";
const UPSELL_COOKIE_NAME = "nm_medical_upsell_dl";
const UPSELL_ITEM_ID = "opd-bundle";

const MAIN_DRIVE_URL =
  process.env.MEDICAL_MASTERBOOK_DRIVE_URL ||
  "https://drive.google.com/drive/folders/1p6idmX2ZRaHtATChPq09KPX4czY1XIdD?usp=sharing";

const UPSELL_DRIVE_URL =
  process.env.MEDICAL_UPSELL_DRIVE_URL ||
  "https://drive.google.com/drive/folders/1uGZ9PL_jrvFK1c_efbIjpedPcpffhZ0y?usp=sharing";

const COOKIE_PATH = "/medical-masterbook";
const SUPPORT_MAIL =
  "mailto:vadaviyarohit785@gmail.com?subject=Medical%20Masterbook%20access%20help";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const item = url.searchParams.get("item");
  const isUpsell = item === UPSELL_ITEM_ID || item === "upsell";

  const tokenProduct = isUpsell ? "medical-masterbook-upsell" : "medical-masterbook";
  const cookieName = isUpsell ? UPSELL_COOKIE_NAME : MAIN_COOKIE_NAME;

  const urlToken = url.searchParams.get("t");
  const cookieToken = readCookie(req.headers.get("cookie"), cookieName);
  const token = urlToken || cookieToken;

  const check = verifyDownloadToken(tokenProduct, token);
  if (!check.valid) {
    const expired = check.reason === "expired";
    return statusPage(
      expired ? 410 : 403,
      expired ? "This link has expired" : "This link is not valid",
      expired
        ? "Your book is still yours. Send us your Order ID and we will share a fresh link."
        : "Book links only work for verified buyers. Please use the link from your confirmation email."
    );
  }

  const driveUrl = (isUpsell ? UPSELL_DRIVE_URL : MAIN_DRIVE_URL).trim();
  if (!driveUrl) {
    return statusPage(
      404,
      "Your book link is not ready yet",
      "Your payment is safe. Please contact support with your Order ID and we will send your link right away."
    );
  }

  // If specific file ID is present and dl=1 -> direct download, otherwise folder redirect.
  const fileId = driveUrl.match(/\/d\/([\w-]+)/)?.[1];
  const target =
    url.searchParams.get("dl") === "1" && fileId
      ? `https://drive.google.com/uc?export=download&id=${fileId}`
      : driveUrl;

  const res = NextResponse.redirect(target);
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("Referrer-Policy", "no-referrer");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");

  if (urlToken) {
    res.cookies.set(cookieName, urlToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: url.protocol === "https:",
      path: COOKIE_PATH,
      maxAge: 60 * 60 * 24 * 180,
    });
  }
  return res;
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

function statusPage(status: number, title: string, message: string) {
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex,nofollow">
  <title>${title}</title>
  <style>
    body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px 16px; background:#fff; color:#2a2a2a; font-family:Arial,Helvetica,sans-serif; line-height:1.6; }
    .box { max-width:440px; width:100%; }
    h1 { margin:0 0 10px; font-size:1.3rem; color:#7b55ab; }
    p { margin:0 0 20px; color:#555; }
    a.btn { display:flex; min-height:50px; align-items:center; justify-content:center; border-radius:10px; background:#7b55ab; color:#fff; font-weight:bold; text-decoration:none; }
    a.back { display:block; margin-top:14px; text-align:center; color:#555; font-size:.9rem; }
  </style>
</head>
<body>
  <div class="box">
    <h1>${title}</h1>
    <p>${message}</p>
    <a class="btn" href="${SUPPORT_MAIL}">Contact support</a>
    <a class="back" href="/medical-masterbook">Back to Medical Masterbook</a>
  </div>
</body>
</html>`,
    {
      status,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
    }
  );
}
