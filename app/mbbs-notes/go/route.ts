import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/downloadToken";

const MAIN_COOKIE_NAME = "nm_mbbs_dl";

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=") || null;
  }
  return null;
}

function errorPage(title: string, message: string, status: number) {
  return new NextResponse(
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>body{font-family:system-ui,sans-serif;display:flex;justify-content:center;align-items:center;min-height:80vh;background:#f8faf7;color:#1f2933;margin:0;padding:18px}.box{width:min(100%,440px);background:#fff;border-radius:12px;padding:30px;text-align:center;box-shadow:0 4px 16px rgba(0,0,0,.06);border-top:4px solid #0b6b3a}h1{font-size:20px;margin:0 0 12px;color:#0b4d26}p{font-size:14px;color:#52606d;line-height:1.55;margin:0 0 20px}.btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}.btn{display:inline-block;background:#0b6b3a;color:#fff;padding:11px 20px;border-radius:6px;text-decoration:none;font-weight:700;font-size:14px}.btn-wa{background:#25D366;color:#fff}</style></head><body><div class="box"><h1>${title}</h1><p>${message}</p><div class="btns"><a href="https://wa.me/919104826422?text=Hi%20Support,%20my%20MBBS%20Notes%20download%20link%20needs%20help" class="btn btn-wa">WhatsApp Support</a><a href="mailto:support@nokrimitra.in?subject=MBBS%20Notes%20download%20support" class="btn">Email Support</a></div></div></body></html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const tokenProduct = "mbbs";
  const urlToken = url.searchParams.get("t");
  const token = urlToken || readCookie(req.headers.get("cookie"), MAIN_COOKIE_NAME);
  const check = verifyDownloadToken(tokenProduct, token);

  // If in mock or dev mode or valid token
  const driveUrl =
    process.env.MBBS_DRIVE_URL ||
    "https://drive.google.com/drive/folders/1b1aOjTrXiKqu_LXOHcqA58zPgxQEbkZh";

  if (!check.valid && process.env.NODE_ENV === "production" && process.env.RAZORPAY_KEY_SECRET) {
    return errorPage(
      check.reason === "expired"
        ? "This download link has expired"
        : "Download link could not be verified",
      "Please open the link from your payment confirmation page or delivery email. If you bought earlier and your link no longer works, contact us on WhatsApp at +91 9104826422 or email support@nokrimitra.in.",
      403
    );
  }

  const response = NextResponse.redirect(driveUrl);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  if (urlToken && token) {
    response.cookies.set(MAIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: url.protocol === "https:",
      path: "/mbbs-notes",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return response;
}
