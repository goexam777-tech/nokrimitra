import { NextResponse } from "next/server";

/**
 * Branded redirect for the Vastu / House Plans bundle and its upsells.
 * e.g. https://nokrimitra.in/vastu-plan-checkout/go            -> main bundle
 *      https://nokrimitra.in/vastu-plan-checkout/go?item=vedic -> Vedic Remedies Mastery
 *      https://nokrimitra.in/vastu-plan-checkout/go?item=vastu-guide -> Practical Vastu Shastra Guide
 * Redirects to the Google Drive links set in env vars,
 * so email/download links stay on our own domain.
 */
const LINKS: Record<string, string | undefined> = {
  main: process.env.VASTU_DRIVE_URL,
  vedic: process.env.VASTU_VEDIC_DRIVE_URL,
  "vastu-guide": process.env.VASTU_VASTU_GUIDE_DRIVE_URL,
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const item = searchParams.get("item") || "main";
  const driveUrl = LINKS[item] || LINKS.main;

  if (
    driveUrl &&
    driveUrl !== "your_google_drive_link_here" &&
    driveUrl.trim() !== ""
  ) {
    return NextResponse.redirect(driveUrl);
  }

  return new NextResponse(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Download link not ready</title>
      <style>
        body { font-family: system-ui, sans-serif; display:flex; justify-content:center; align-items:center; min-height:80vh; background:#eef1f6; color:#333; margin:0; }
        .box { background:#fff; border-radius:12px; padding:30px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,.05); max-width:400px; border-top:4px solid #1e63d3; }
        h1 { font-size:20px; margin-bottom:12px; color:#111827; }
        p { font-size:14px; color:#52606d; line-height:1.5; margin-bottom:20px; }
        .btn { display:inline-block; background:#16a34a; color:#fff; padding:10px 20px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:14px; }
      </style>
    </head>
    <body>
      <div class="box">
        <h1>Download link is not ready yet</h1>
        <p>Please try again in a few minutes, or contact our support for help.</p>
        <a href="https://wa.me/919104826422" class="btn">WhatsApp Support</a>
      </div>
    </body>
    </html>`,
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
