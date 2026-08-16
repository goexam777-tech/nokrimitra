import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/downloadToken";

/**
 * Branded download link for the Nursing Protocol Reference Notebook.
 * e.g. https://nokrimitra.in/nursing-mastery/go?t=<token>
 *
 * A signed token is issued only after a Razorpay payment signature has been
 * verified, so guessing the URL does not unlock the file. The token is also
 * stored as an HttpOnly cookie, letting a buyer return later without the link.
 */
const COOKIE_NAME = "nm_nursing_dl";

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
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>body{font-family:system-ui,sans-serif;display:flex;justify-content:center;align-items:center;min-height:80vh;background:#eef6ff;color:#333;margin:0;padding:18px}.box{width:min(100%,420px);background:#fff;border-radius:12px;padding:30px;text-align:center;box-shadow:0 4px 12px rgba(9,45,98,.08);border-top:4px solid #1689ef}h1{font-size:20px;margin:0 0 12px;color:#092d62}p{font-size:14px;color:#52606d;line-height:1.55;margin:0 0 20px}.btn{display:inline-block;background:#1689ef;color:#fff;padding:11px 22px;border-radius:6px;text-decoration:none;font-weight:700;font-size:14px}</style></head><body><div class="box"><h1>${title}</h1><p>${message}</p><a href="mailto:support@nokrimitra.in?subject=Nursing%20E-book%20download%20help" class="btn">Email Support</a></div></body></html>`,
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
  const urlToken = url.searchParams.get("t");
  const token = urlToken || readCookie(req.headers.get("cookie"), COOKIE_NAME);
  const check = verifyDownloadToken("nursing", token);

  if (!check.valid) {
    return errorPage(
      check.reason === "expired"
        ? "This download link has expired"
        : "Download link could not be verified",
      check.reason === "expired"
        ? "Email us your Order ID and we will send you a fresh download link."
        : "Please open the link from your payment confirmation page or delivery email. If you bought earlier and your link no longer works, email us your Order ID and we will send a new one.",
      403
    );
  }

  const driveUrl = process.env.NURSING_DRIVE_URL;

  if (
    driveUrl &&
    driveUrl !== "your_google_drive_link_here" &&
    driveUrl.trim() !== ""
  ) {
    const response = NextResponse.redirect(driveUrl);
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");

    if (urlToken && token) {
      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: url.protocol === "https:",
        path: "/nursing-mastery",
        maxAge: 60 * 60 * 24 * 180,
      });
    }
    return response;
  }

  return errorPage(
    "Your download link is not ready yet",
    "Please try again shortly, or email our support and we will send your files right away. Your payment record is safe with us.",
    404
  );
}
