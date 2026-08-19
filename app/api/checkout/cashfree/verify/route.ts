import { NextResponse } from "next/server";
import { buildOrderEmail, buildOrderEmailText } from "@/lib/emailTemplate";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { order_id, name, email, amountPaid, productName } = body;

    if (!order_id) {
      return NextResponse.json(
        { error: "Missing order_id for verification" },
        { status: 400 }
      );
    }

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const env = (process.env.CASHFREE_ENV || "PRODUCTION").toUpperCase();

    const isMock =
      order_id.startsWith("order_mock_") ||
      !appId ||
      appId.includes("your_cashfree_app_id") ||
      !secretKey ||
      secretKey.includes("your_cashfree_secret");

    if (isMock) {
      return NextResponse.json({
        success: true,
        verified: true,
        mock: true,
        amountPaid: Number(amountPaid || 99),
      });
    }

    const baseUrl =
      env === "SANDBOX"
        ? `https://sandbox.cashfree.com/pg/orders/${encodeURIComponent(order_id)}`
        : `https://api.cashfree.com/pg/orders/${encodeURIComponent(order_id)}`;

    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "x-client-id": appId!,
        "x-client-secret": secretKey!,
        "x-api-version": "2023-08-01",
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cashfree verify error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to fetch order status from Cashfree" },
        { status: 400 }
      );
    }

    if (data.order_status !== "PAID") {
      return NextResponse.json(
        { error: `Payment not completed. Order status: ${data.order_status}` },
        { status: 400 }
      );
    }

    // Determine public origin for email links
    const configuredAppUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const appUrl = (
      configuredAppUrl ||
      (process.env.NODE_ENV === "production"
        ? "https://nokrimitra.in"
        : `${protocol}://${host}`)
    ).replace(/\/$/, "");

    const downloadUrl = `${appUrl}/gsrtc-mcq-course/go`;
    const customerEmail = String(email || data.customer_details?.customer_email || "").trim();
    const customerName = String(name || data.customer_details?.customer_name || "વિદ્યાર્થી").trim();

    // Trigger email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || "NokriMitra <download@pdf.nokrimitra.in>";
    const itemProductName = productName || "GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ";

    if (resendApiKey && resendApiKey !== "your_resend_key_here" && customerEmail) {
      try {
        const htmlContent = buildOrderEmail({
          customerName,
          productName: itemProductName,
          orderId: order_id,
          amount: Number(data.order_amount || amountPaid || 99),
          downloadUrl,
        });

        const textContent = buildOrderEmailText({
          customerName,
          productName: itemProductName,
          orderId: order_id,
          amount: Number(data.order_amount || amountPaid || 99),
          downloadUrl,
        });

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: emailFrom,
            to: [customerEmail],
            reply_to: "support@nokrimitra.in",
            subject: `${itemProductName}: આપનો ડાઉનલોડ લિંક તૈયાર છે! 📚🎉`,
            html: htmlContent,
            text: textContent,
          }),
        });

        if (!emailResponse.ok) {
          const errText = await emailResponse.text();
          console.error("Resend API failed for Cashfree verification:", errText);
        } else {
          console.log(`Cashfree order delivery email successfully sent to ${customerEmail}`);
        }
      } catch (emailErr) {
        console.error("Failed to send Cashfree email via Resend:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      verified: true,
      mock: false,
      amountPaid: data.order_amount,
    });
  } catch (error: unknown) {
    console.error("Cashfree verification error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Verification failed" },
      { status: 500 }
    );
  }
}
