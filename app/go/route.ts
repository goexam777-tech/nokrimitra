import { NextResponse } from "next/server";

/**
 * Branded redirect route: e.g. https://pdf.nokrimitra.in/go
 * Redirects to the Google Drive folder specified in the GOOGLE_DRIVE_URL env variable.
 * This keeps the email links matching your domain, avoiding spam filter triggers.
 */
export async function GET() {
  const driveUrl = process.env.GOOGLE_DRIVE_URL;

  if (
    driveUrl &&
    driveUrl !== "your_google_drive_folder_link_here" &&
    driveUrl.trim() !== ""
  ) {
    return NextResponse.redirect(driveUrl);
  }

  // Fallback html if the link is not yet configured in .env.local
  return new NextResponse(
    `<!DOCTYPE html>
    <html lang="gu">
    <head>
      <meta charset="UTF-8">
      <title>લિંક ઉપલબ્ધ નથી</title>
      <style>
        body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 80vh; background-color: #f4f6f3; color: #333; margin: 0; }
        .box { background: white; border-radius: 12px; padding: 30px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05); max-width: 400px; border-top: 4px solid #0b6b3a; }
        h1 { font-size: 20px; margin-bottom: 12px; color: #14181f; }
        p { font-size: 14px; color: #52606d; line-height: 1.5; margin-bottom: 20px; }
        .btn { display: inline-block; background-color: #0b6b3a; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="box">
        <h1>ડાઉનલોડ લિંક હજી ઉપલબ્ધ નથી</h1>
        <p>કૃપા કરીને થોડીવાર પછી ફરીથી પ્રયાસ કરો અથવા મદદ માટે સીધા જ અમારા WhatsApp સપોર્ટ નંબર <b>+91 91048 26422</b> પર સંપર્ક કરો.</p>
        <a href="https://wa.me/919104826422" class="btn">WhatsApp સપોર્ટ</a>
      </div>
    </body>
    </html>`,
    {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}
