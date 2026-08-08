import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/downloadToken";

/**
 * Branded download link for the Electric Scooter Repairing 3-book bundle.
 * e.g. https://nokrimitra.in/electric-scooter-repairing/go?t=<token>
 *
 * The token is issued only after a Razorpay payment signature is verified,
 * so this link works for buyers (including from their email, on any device)
 * but not for anyone who simply guesses the URL.
 */
const COOKIE_NAME = "nm_escooter_dl";

export async function GET(req: Request) {
  const urlToken = new URL(req.url).searchParams.get("t");

  // Buyers who already used a valid link can re-download on the same device
  // without the token in the URL.
  const cookieToken = readCookie(req.headers.get("cookie"), COOKIE_NAME);

  const token = urlToken || cookieToken;
  const check = verifyDownloadToken("escooter", token);

  if (!check.valid) {
    return blockedResponse(check.reason);
  }

  const driveUrl = process.env.ESCOOTER_DRIVE_URL;

  if (
    driveUrl &&
    driveUrl !== "your_google_drive_link_here" &&
    driveUrl.trim() !== ""
  ) {
    const res = NextResponse.redirect(driveUrl);
    res.headers.set("Cache-Control", "no-store");
    // Keep the token out of Google's Referer and out of search engines.
    res.headers.set("Referrer-Policy", "no-referrer");
    res.headers.set("X-Robots-Tag", "noindex, nofollow");

    if (urlToken && token) {
      res.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: new URL(req.url).protocol === "https:",
        path: "/electric-scooter-repairing",
        maxAge: 60 * 60 * 24 * 180,
      });
    }
    return res;
  }

  return new NextResponse(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Download link is not ready yet</title>
      <style>
        :root { --ink:#17201c; --paper:#f4f0e7; --white:#fffefa; --green-dark:#116437; --lime:#d0eb63; --orange:#df642e; --line:#d8d2c6; --muted:#657068; }
        * { box-sizing:border-box; }
        body {
          margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px 16px;
          font-family:'Segoe UI',system-ui,-apple-system,Roboto,Arial,sans-serif; color:var(--ink); line-height:1.6;
          background-color:var(--paper);
          background-image:linear-gradient(rgba(23,32,28,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(23,32,28,.035) 1px, transparent 1px);
          background-size:34px 34px;
        }
        .box { width:100%; max-width:520px; border:1px solid rgba(23,32,28,.18); background:var(--white); box-shadow:12px 12px 0 rgba(23,32,28,.08); }
        .strip { padding:16px 22px; background:var(--orange); color:#fff; font-size:.72rem; font-weight:800; letter-spacing:.14em; text-transform:uppercase; }
        .body { padding:24px 22px; }
        h1 { margin:0 0 10px; font-size:1.4rem; font-weight:800; letter-spacing:-.03em; line-height:1.25; }
        p { margin:0 0 18px; font-size:.94rem; color:#3f4a43; }
        .safe { display:flex; gap:12px; padding:15px 16px; margin:0 0 20px; border-left:5px solid var(--green-dark); background:var(--paper); font-size:.86rem; color:var(--muted); }
        .safe strong { display:block; color:var(--ink); font-size:.9rem; margin-bottom:3px; }
        .btn { display:flex; min-height:54px; align-items:center; justify-content:center; background:var(--green-dark); color:#fff; font-size:1rem; font-weight:800; text-decoration:none; box-shadow:inset 0 -3px 0 rgba(0,0,0,.2); }
        .btn:hover { background:var(--ink); }
        .back { display:flex; min-height:44px; align-items:center; justify-content:center; margin-top:12px; color:var(--green-dark); font-size:.86rem; font-weight:700; text-decoration:none; }
      </style>
    </head>
    <body>
      <div class="box">
        <div class="strip">Download pending</div>
        <div class="body">
          <h1>Your download link is not ready yet</h1>
          <p>Please try again in a little while, or contact our support team.</p>
          <div class="safe">
            <div>
              <strong>Your order is safe</strong>
              We have your payment on record. Contact support and the link will be sent to you right away.
            </div>
          </div>
          <a href="https://wa.me/919104826422" class="btn">WhatsApp Support</a>
          <a href="/electric-scooter-repairing" class="back">Back to the product page</a>
        </div>
      </div>
    </body>
    </html>`,
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
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

/** Styled page shown when a download link is missing, tampered or expired. */
function blockedResponse(reason: "missing" | "malformed" | "invalid" | "expired") {
  const expired = reason === "expired";
  const title = expired
    ? "This download link has expired"
    : "This download link is not valid";
  const message = expired
    ? "Your bundle is still yours. Message us on WhatsApp with your Order ID and we will issue a fresh link."
    : "Download links only work for the buyer who completed the payment. Please use the link from your confirmation email.";

  return new NextResponse(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="robots" content="noindex,nofollow">
      <title>${title}</title>
      <style>
        :root { --ink:#17201c; --paper:#f4f0e7; --white:#fffefa; --green-dark:#116437; --orange:#df642e; --muted:#657068; }
        * { box-sizing:border-box; }
        body {
          margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px 16px;
          font-family:'Segoe UI',system-ui,-apple-system,Roboto,Arial,sans-serif; color:var(--ink); line-height:1.6;
          background-color:var(--paper);
          background-image:linear-gradient(rgba(23,32,28,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(23,32,28,.035) 1px, transparent 1px);
          background-size:34px 34px;
        }
        .box { width:100%; max-width:520px; border:1px solid rgba(23,32,28,.18); background:var(--white); box-shadow:12px 12px 0 rgba(23,32,28,.08); }
        .strip { padding:16px 22px; background:var(--orange); color:#fff; font-size:.72rem; font-weight:800; letter-spacing:.14em; text-transform:uppercase; }
        .body { padding:24px 22px; }
        h1 { margin:0 0 10px; font-size:1.35rem; font-weight:800; letter-spacing:-.03em; line-height:1.25; }
        p { margin:0 0 18px; font-size:.94rem; color:#3f4a43; }
        .safe { display:flex; gap:12px; padding:15px 16px; margin:0 0 20px; border-left:5px solid var(--green-dark); background:var(--paper); font-size:.86rem; color:var(--muted); }
        .safe strong { display:block; color:var(--ink); font-size:.9rem; margin-bottom:3px; }
        .btn { display:flex; min-height:54px; align-items:center; justify-content:center; background:var(--green-dark); color:#fff; font-size:1rem; font-weight:800; text-decoration:none; box-shadow:inset 0 -3px 0 rgba(0,0,0,.2); }
        .btn:hover { background:var(--ink); }
        .back { display:flex; min-height:44px; align-items:center; justify-content:center; margin-top:12px; color:var(--green-dark); font-size:.86rem; font-weight:700; text-decoration:none; }
      </style>
    </head>
    <body>
      <div class="box">
        <div class="strip">${expired ? "Link expired" : "Access denied"}</div>
        <div class="body">
          <h1>${title}</h1>
          <p>${message}</p>
          <div class="safe">
            <div>
              <strong>Already bought the bundle?</strong>
              Send your Order ID on WhatsApp and we will resend your download link right away.
            </div>
          </div>
          <a href="https://wa.me/919104826422" class="btn">WhatsApp Support</a>
          <a href="/electric-scooter-repairing" class="back">Back to the product page</a>
        </div>
      </div>
    </body>
    </html>`,
    {
      status: expired ? 410 : 403,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    }
  );
}
