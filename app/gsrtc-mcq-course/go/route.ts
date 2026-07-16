import { NextResponse } from "next/server";

/**
 * Branded redirect for the GSRTC MCQ course product.
 * e.g. https://nokrimitra.in/gsrtc-mcq-course/go
 * Redirects to the Google Drive link set in MCQ_DRIVE_URL env var,
 * so email/download links stay on our own domain.
 */
export async function GET() {
  const driveUrl = process.env.MCQ_DRIVE_URL;

  if (
    driveUrl &&
    driveUrl !== "your_google_drive_link_here" &&
    driveUrl.trim() !== ""
  ) {
    return NextResponse.redirect(driveUrl);
  }

  return new NextResponse(
    `<!DOCTYPE html>
    <html lang="gu">
    <head>
      <meta charset="UTF-8">
      <title>ડાઉનલોડ લિંક તૈયાર નથી</title>
      <style>
        body { font-family: system-ui, sans-serif; display:flex; justify-content:center; align-items:center; min-height:80vh; background:#f6f8f5; color:#333; margin:0; }
        .box { background:#fff; border-radius:12px; padding:30px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,.05); max-width:400px; border-top:4px solid #0b6b3a; }
        h1 { font-size:20px; margin-bottom:12px; color:#111827; }
        p { font-size:14px; color:#52606d; line-height:1.5; margin-bottom:20px; }
        .btn { display:inline-block; background:#0b6b3a; color:#fff; padding:10px 20px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:14px; }
      </style>
    </head>
    <body>
      <div class="box">
        <h1>ડાઉનલોડ લિંક હજી તૈયાર નથી</h1>
        <p>કૃપા કરીને થોડી વારમાં ફરી પ્રયાસ કરો, અથવા સપોર્ટનો સંપર્ક કરો.</p>
        <a href="https://wa.me/919104826422" class="btn">WhatsApp સપોર્ટ</a>
      </div>
    </body>
    </html>`,
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
