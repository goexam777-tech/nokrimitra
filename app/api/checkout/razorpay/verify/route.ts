import { NextResponse } from "next/server";
import crypto from "crypto";
import { buildOrderEmail, buildOrderEmailText } from "@/lib/emailTemplate";
import {
  buildPsychologyEmail,
  buildPsychologyEmailText,
} from "@/lib/psychologyEmailTemplate";
import {
  buildVastuEmail,
  buildVastuEmailText,
} from "@/lib/vastuEmailTemplate";
import {
  buildEscooterEmail,
  buildEscooterEmailText,
} from "@/lib/escooterEmailTemplate";
import { createDownloadToken } from "@/lib/downloadToken";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      name,
      email,
      amountPaid,
      product,
      productName,
      addons,
    } = body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required signature fields" },
        { status: 400 }
      );
    }

    // Check for mock order IDs
    if (
      razorpay_order_id.startsWith("order_mock_") ||
      razorpay_payment_id.startsWith("pay_mock_")
    ) {
      // Mock orders exist only while Razorpay keys are placeholders (local dev).
      // With real keys configured, a mock order can never unlock a download.
      const liveSecret = process.env.RAZORPAY_KEY_SECRET;
      const inMockMode =
        !liveSecret ||
        liveSecret.includes("your_key_secret") ||
        liveSecret.trim() === "";
      const mockToken =
        inMockMode && product === "escooter"
          ? createDownloadToken("escooter", razorpay_order_id)
          : null;

      return NextResponse.json({
        success: true,
        verified: true,
        mock: true,
        ...(mockToken
          ? { downloadPath: `/electric-scooter-repairing/go?t=${mockToken}` }
          : {}),
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret || keySecret.includes("your_key_secret")) {
      return NextResponse.json(
        { error: "Razorpay secret key not configured on server" },
        { status: 500 }
      );
    }

    // Verify signature: HMAC-SHA256 of "order_id|payment_id" using keySecret
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature verification failed" },
        { status: 400 }
      );
    }

    // Dynamic APP URL resolution based on request headers
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const appUrl = `${protocol}://${host}`;
    const isPsychology = product === "psychology";
    const isVastu = product === "vastu";
    const isMcq = product === "mcq";
    const isEscooter = product === "escooter";

    // Only buyers get a signed download link (issued after signature check).
    const escooterToken = isEscooter
      ? createDownloadToken("escooter", razorpay_order_id)
      : null;
    const escooterDownloadUrl = `${appUrl}/electric-scooter-repairing/go${
      escooterToken ? `?t=${escooterToken}` : ""
    }`;

    const downloadUrl = isPsychology
      ? `${appUrl}/psychology-notes/go`
      : isVastu
      ? `${appUrl}/vastu-plan-checkout/go`
      : isMcq
      ? `${appUrl}/gsrtc-mcq-course/go`
      : isEscooter
      ? escooterDownloadUrl
      : `${appUrl}/go`;

    // Build per-item download links for the Vastu bundle (main + purchased upsells)
    const vastuAddonLabels: Record<string, string> = {
      vedic: "Vedic Remedies Mastery",
      "vastu-guide": "Practical Vastu Shastra Guide",
    };
    const vastuDownloads = [
      {
        label: "Main Bundle (10k Vastu Floor Plans)",
        url: `${appUrl}/vastu-plan-checkout/go`,
      },
      ...String(addons || "")
        .split(",")
        .map((a: string) => a.trim())
        .filter((id: string) => vastuAddonLabels[id])
        .map((id: string) => ({
          label: vastuAddonLabels[id],
          url: `${appUrl}/vastu-plan-checkout/go?item=${id}`,
        })),
    ];

    // Trigger Email sending via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || "NokriMitra <onboarding@resend.dev>";

    if (resendApiKey && resendApiKey !== "your_resend_key_here" && email) {
      try {
        const psyProductName = productName || "Psychology Notes";
        const vastuProductName =
          productName || "10k Vastu Floor Plan Editable Bundle";
        const gsrtcProductName = "GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ";
        const escooterProductName =
          productName || "Electric Scooter Repairing Complete Practical Guide";

        const htmlContent = isPsychology
          ? buildPsychologyEmail({
              customerName: name || "there",
              productName: psyProductName,
              orderId: razorpay_order_id,
              amount: Number(amountPaid || 149),
              downloadUrl,
            })
          : isEscooter
          ? buildEscooterEmail({
              customerName: name || "there",
              productName: escooterProductName,
              orderId: razorpay_order_id,
              amount: Number(amountPaid || 149),
              downloadUrl,
            })
          : isVastu
          ? buildVastuEmail({
              customerName: name || "there",
              productName: vastuProductName,
              orderId: razorpay_order_id,
              amount: Number(amountPaid || 149),
              downloadUrl,
              downloads: vastuDownloads,
            })
          : buildOrderEmail({
              customerName: name || "વિદ્યાર્થી",
              productName: productName || gsrtcProductName,
              orderId: razorpay_order_id,
              amount: Number(amountPaid || 99),
              downloadUrl,
            });

        const textContent = isPsychology
          ? buildPsychologyEmailText({
              customerName: name || "there",
              productName: psyProductName,
              orderId: razorpay_order_id,
              amount: Number(amountPaid || 149),
              downloadUrl,
            })
          : isEscooter
          ? buildEscooterEmailText({
              customerName: name || "there",
              productName: escooterProductName,
              orderId: razorpay_order_id,
              amount: Number(amountPaid || 149),
              downloadUrl,
            })
          : isVastu
          ? buildVastuEmailText({
              customerName: name || "there",
              productName: vastuProductName,
              orderId: razorpay_order_id,
              amount: Number(amountPaid || 149),
              downloadUrl,
              downloads: vastuDownloads,
            })
          : buildOrderEmailText({
              customerName: name || "વિદ્યાર્થી",
              productName: productName || gsrtcProductName,
              orderId: razorpay_order_id,
              amount: Number(amountPaid || 99),
              downloadUrl,
            });

        const subject = isPsychology
          ? `${psyProductName}: Your download link is ready! 🎉`
          : isEscooter
          ? // Short, transactional subject: long subjects get truncated and
            // emoji/exclamation styling reads as promotional to spam filters.
            `आपकी PDF तैयार है — EV Scooter Repair Guide (Hindi)`
          : isVastu
          ? `${vastuProductName}: Your download link is ready! 🎉`
          : `${productName || gsrtcProductName}: આપનો ડાઉનલોડ લિંક તૈયાર છે! 📚🎉`;

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: emailFrom,
            to: [email],
            reply_to:
              isPsychology || isVastu
                ? "goexam777@gmail.com"
                : "support@nokrimitra.in",
            subject,
            html: htmlContent,
            text: textContent,
          }),
        });

        if (!emailResponse.ok) {
          const errText = await emailResponse.text();
          console.error("Resend API failed:", errText);
        } else {
          console.log(`Email successfully sent to ${email}`);
        }
      } catch (emailErr) {
        console.error("Failed to send email via Resend:", emailErr);
      }
    } else {
      console.log(
        "[RESEND SKIPPED] Resend key is missing or not configured. No email sent."
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      mock: false,
      ...(isEscooter ? { downloadPath: `/electric-scooter-repairing/go${escooterToken ? `?t=${escooterToken}` : ""}` } : {}),
    });
  } catch (error: any) {
    console.error("Signature verification error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal signature verification failed" },
      { status: 500 }
    );
  }
}

