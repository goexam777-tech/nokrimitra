import { NextResponse } from "next/server";
import crypto from "crypto";
import { buildOpdEmail, buildOpdEmailText } from "@/lib/opdEmailTemplate";
import { buildNursingEmail, buildNursingEmailText } from "@/lib/nursingEmailTemplate";
import { buildMbbsEmail, buildMbbsEmailText } from "@/lib/mbbsEmailTemplate";
import { createDownloadToken } from "@/lib/downloadToken";

const OPD_BASE_PRICE = 99;
const OPD_EXIT_PRICE = 149;
const OPD_ADDON_ID = "emergency-handbook";
const OPD_ADDON_PRICE = 49;
const OPD_ADDON_NAME = "Emergency Medicine Handbook";

const NURSING_PRICE = 199;
const NURSING_PRODUCT_NAME = "Nursing Protocol Reference Notebook";

const MBBS_PRICE = 199;
const MBBS_PRODUCT_NAME = "Complete MBBS Notes (All 21 Subjects)";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    const webhookSecret =
      process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;

    if (!webhookSecret) {
      console.error("[Webhook] No secret key configured");
      return NextResponse.json({ error: "Secret not configured" }, { status: 500 });
    }

    if (signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        // Also test with RAZORPAY_KEY_SECRET if webhookSecret was different
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        const altSignature = keySecret
          ? crypto.createHmac("sha256", keySecret).update(rawBody).digest("hex")
          : null;

        if (altSignature !== signature) {
          console.error("[Webhook] Invalid signature received");
          return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }
      }
    }

    const event = JSON.parse(rawBody || "{}");
    const eventType = event.event;

    // Handle payment.captured or order.paid
    if (eventType !== "payment.captured" && eventType !== "order.paid") {
      return NextResponse.json({ received: true, ignored: eventType });
    }

    const payload = event.payload;
    const payment = payload?.payment?.entity;
    const orderEntity = payload?.order?.entity;

    const orderId = payment?.order_id || orderEntity?.id;
    if (!orderId) {
      return NextResponse.json({ error: "No order_id in webhook" }, { status: 400 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return NextResponse.json({ error: "Razorpay keys missing" }, { status: 500 });
    }

    // Fetch latest order state from Razorpay
    const orderRes = await fetch(
      `https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`,
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
        },
        cache: "no-store",
      }
    );
    if (!orderRes.ok) {
      console.error("[Webhook] Could not fetch order:", orderId);
      return NextResponse.json({ error: "Could not fetch order" }, { status: 400 });
    }

    const order = await orderRes.json();
    const notes: Record<string, string> = (order.notes || {}) as Record<string, string>;

    // Check if already fulfilled
    if (notes.fulfilledAt) {
      console.log(`[Webhook] Order ${orderId} already fulfilled at ${notes.fulfilledAt}`);
      return NextResponse.json({ success: true, message: "Already fulfilled" });
    }

    const product = notes.product;
    const customerEmail = String(
      notes.customerEmail || payment?.email || orderEntity?.email || ""
    ).trim().toLowerCase();
    const customerName = String(
      notes.customerName || payment?.notes?.customerName || "Customer"
    ).trim();

    if (!customerEmail) {
      console.warn(`[Webhook] No customer email found for order ${orderId}`);
      return NextResponse.json({ error: "No customer email" }, { status: 400 });
    }

    const configuredAppUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "https://nokrimitra.in";
    const appUrl = configuredAppUrl.replace(/\/$/, "");

    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || "NokriMitra <download@pdf.nokrimitra.in>";

    if (product === "opd" || product === "opd-ebook" || product === "opd_ebook") {
      const isExitOffer =
        notes.offer === "exit149" || Number(order.amount) === OPD_EXIT_PRICE * 100;
      const isOpdEbook = product === "opd-ebook" || product === "opd_ebook" || notes.product === "opd-ebook";
      const opdAddons = isExitOffer
        ? [OPD_ADDON_ID]
        : String(notes.addons || "")
            .split(",")
            .map((id: string) => id.trim())
            .filter((id: string) => id === OPD_ADDON_ID);

      const verifiedAmount = isExitOffer
        ? OPD_EXIT_PRICE
        : (isOpdEbook ? 149 : OPD_BASE_PRICE) + (opdAddons.includes(OPD_ADDON_ID) ? OPD_ADDON_PRICE : 0);

      const opdToken = createDownloadToken("opd", orderId);
      const opdAddonToken = opdAddons.includes(OPD_ADDON_ID)
        ? createDownloadToken("opd-emergency-handbook", orderId)
        : null;

      const opdDownloadUrl = `${appUrl}/opd-mastery/go${opdToken ? `?t=${opdToken}` : ""}`;
      const opdAddonDownloadUrl = `${appUrl}/opd-mastery/go?item=${OPD_ADDON_ID}${
        opdAddonToken ? `&t=${opdAddonToken}` : ""
      }`;

      const opdDownloads = [
        { label: "OPD Mastery E-book", url: opdDownloadUrl },
        ...(opdAddonToken
          ? [{ label: OPD_ADDON_NAME, url: opdAddonDownloadUrl }]
          : []),
      ];

      const htmlContent = buildOpdEmail({
        customerName: customerName || "Doctor",
        productName: "OPD Mastery E-book (2026 Edition)",
        orderId,
        amount: verifiedAmount,
        downloadUrl: opdDownloadUrl,
        downloads: opdDownloads,
      });

      const textContent = buildOpdEmailText({
        customerName: customerName || "Doctor",
        productName: "OPD Mastery E-book (2026 Edition)",
        orderId,
        amount: verifiedAmount,
        downloadUrl: opdDownloadUrl,
        downloads: opdDownloads,
      });

      if (resendApiKey) {
        const sendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: emailFrom,
            to: [customerEmail],
            reply_to: "support@nokrimitra.in",
            subject: "Your download is ready — OPD Mastery E-book (2026)",
            html: htmlContent,
            text: textContent,
          }),
        });

        if (sendRes.ok) {
          console.log(`[Webhook] OPD email sent to ${customerEmail} for order ${orderId}`);
        } else {
          console.error(`[Webhook] Resend error:`, await sendRes.text());
        }
      }

      // Mark order fulfilled
      try {
        await fetch(
          `https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
            },
            body: JSON.stringify({
              notes: {
                ...notes,
                product: "opd",
                fulfilledAt: new Date().toISOString(),
              },
            }),
          }
        );
      } catch (patchErr) {
        console.warn("[Webhook] Failed to mark order fulfilled in Razorpay:", patchErr);
      }

      return NextResponse.json({ success: true, orderId, product: "opd" });
    }

    if (product === "nursing") {
      const nursingToken = createDownloadToken("nursing", orderId);
      const nursingDownloadUrl = `${appUrl}/nursing-notes/go${nursingToken ? `?t=${nursingToken}` : ""}`;

      const htmlContent = buildNursingEmail({
        customerName: customerName || "there",
        productName: NURSING_PRODUCT_NAME,
        orderId,
        amount: NURSING_PRICE,
        downloadUrl: nursingDownloadUrl,
      });
      const textContent = buildNursingEmailText({
        customerName: customerName || "there",
        productName: NURSING_PRODUCT_NAME,
        orderId,
        amount: NURSING_PRICE,
        downloadUrl: nursingDownloadUrl,
      });

      if (resendApiKey) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: emailFrom,
            to: [customerEmail],
            reply_to: "support@nokrimitra.in",
            subject: `${NURSING_PRODUCT_NAME}: Your download link is ready! 🩺`,
            html: htmlContent,
            text: textContent,
          }),
        });
      }

      return NextResponse.json({ success: true, orderId, product: "nursing" });
    }

    if (product === "mbbs") {
      const mbbsToken = createDownloadToken("mbbs", orderId);
      const mbbsDownloadUrl = `${appUrl}/mbbs-notes/go${mbbsToken ? `?t=${mbbsToken}` : ""}`;

      const htmlContent = buildMbbsEmail({
        customerName: customerName || "Doctor",
        productName: MBBS_PRODUCT_NAME,
        orderId,
        amount: MBBS_PRICE,
        downloadUrl: mbbsDownloadUrl,
        supportEmail: "support@nokrimitra.in",
      });
      const textContent = buildMbbsEmailText({
        customerName: customerName || "Doctor",
        productName: MBBS_PRODUCT_NAME,
        orderId,
        amount: MBBS_PRICE,
        downloadUrl: mbbsDownloadUrl,
        supportEmail: "support@nokrimitra.in",
      });

      if (resendApiKey) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: emailFrom,
            to: [customerEmail],
            reply_to: "support@nokrimitra.in",
            subject: `Complete MBBS Notes (All 21 Subjects): Your download link is ready! 🩺📚`,
            html: htmlContent,
            text: textContent,
          }),
        });
      }

      return NextResponse.json({ success: true, orderId, product: "mbbs" });
    }

    return NextResponse.json({ success: true, message: "Unhandled product " + product });
  } catch (error: unknown) {
    console.error("[Webhook Error]:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook handler failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "Razorpay Webhook endpoint active" });
}
