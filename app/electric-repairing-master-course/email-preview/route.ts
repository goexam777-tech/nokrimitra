import { NextResponse } from "next/server";
import { buildElectricEmail } from "@/lib/electricEmailTemplate";
import { ELECTRIC_CATALOG } from "@/lib/electricCatalog";

/**
 * Dev-only preview of the purchase email:
 * http://localhost:3000/electric-repairing-master-course/email-preview
 * Returns 404 in production so it is never public.
 */
export function GET() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }

  const html = buildElectricEmail({
    customerName: "there",
    productName: ELECTRIC_CATALOG.name,
    orderId: "order_1760512345678_ab12c",
    amount: ELECTRIC_CATALOG.price,
    downloadUrl: "https://nokrimitra.in/electric-repairing-master-course/go?t=SAMPLE_TOKEN",
  });

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
