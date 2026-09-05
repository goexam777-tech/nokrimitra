import { NextResponse } from "next/server";

/**
 * Direct safe download redirect for 31 Medical Master PDFs Bundle.
 * e.g. https://nokrimitra.in/medical-master-pdfs/go
 */
const GOOGLE_DRIVE_PDF_LINK =
  process.env.MEDICAL_MASTER_PDFS_DRIVE_URL ||
  "https://drive.google.com/drive/folders/1wXiojGc4SqoOWnHRNLom-uHfudDWum_n";

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
