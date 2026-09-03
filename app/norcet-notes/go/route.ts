import { NextResponse } from "next/server";

/**
 * Direct safe download redirect for NORCET 11 Notes PDF.
 * e.g. https://nokrimitra.in/norcet-notes/go
 */
const GOOGLE_DRIVE_PDF_LINK =
  process.env.NORCET_NOTES_DRIVE_URL ||
  "https://drive.google.com/drive/folders/1g44f4-hXo9Qmr8LXK6gZ0jWhxAO9skHW";

export async function GET() {
  const driveUrl = GOOGLE_DRIVE_PDF_LINK;

  if (driveUrl && driveUrl.trim() !== "") {
    const res = NextResponse.redirect(driveUrl);
    res.headers.set("Cache-Control", "no-store");
    res.headers.set("Referrer-Policy", "no-referrer");
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  return NextResponse.json(
    { error: "PDF link not configured. Please contact support@nokrimitra.in" },
    { status: 500 }
  );
}
