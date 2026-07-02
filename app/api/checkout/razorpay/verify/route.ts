import { NextResponse } from "next/server";
import crypto from "crypto";
import { buildOrderEmail, buildOrderEmailText } from "@/lib/emailTemplate";

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
      return NextResponse.json({ success: true, verified: true, mock: true });
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
    const downloadUrl = `${appUrl}/go`;

    // Trigger Email sending via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || "NokriMitra <onboarding@resend.dev>";

    if (resendApiKey && resendApiKey !== "your_resend_key_here" && email) {
      try {
        const htmlContent = buildOrderEmail({
          customerName: name || "વિદ્યાર્થી",
          productName: "GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ",
          orderId: razorpay_order_id,
          amount: Number(amountPaid || 1),
          downloadUrl: downloadUrl,
        });

        const textContent = buildOrderEmailText({
          customerName: name || "વિદ્યાર્થી",
          productName: "GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ",
          orderId: razorpay_order_id,
          amount: Number(amountPaid || 1),
          downloadUrl: downloadUrl,
        });

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: emailFrom,
            to: [email],
            reply_to: "support@nokrimitra.in",
            subject: "GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ: આપનો ડાઉનલોડ લિંક તૈયાર છે! 📚🎉",
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

    return NextResponse.json({ success: true, verified: true, mock: false });
  } catch (error: any) {
    console.error("Signature verification error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal signature verification failed" },
      { status: 500 }
    );
  }
}

