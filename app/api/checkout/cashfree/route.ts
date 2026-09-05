import { NextResponse } from "next/server";

const XRAY_PRICE = 199;
const XRAY_ADDON_ID = "lab-test-master-guide";
const XRAY_ADDON_PRICE = 79;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      name,
      email,
      phone,
      amount: reqAmount,
      productName,
      product,
      addons,
    } = body;

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const env = (process.env.CASHFREE_ENV || "PRODUCTION").toUpperCase();

    const isMock =
      !appId ||
      appId.includes("your_cashfree_app_id") ||
      !secretKey ||
      secretKey.includes("your_cashfree_secret");

    const isXray = product === "xray";
    const isNorcet = product === "norcet";
    const isMedical = product === "medical" || product === "medical-master-pdfs";

    // Amount is computed server-side for security
    const xrayHasAddon =
      isXray &&
      (Array.isArray(addons)
        ? addons.includes(XRAY_ADDON_ID)
        : String(addons || "").includes(XRAY_ADDON_ID));
    const amount = isXray
      ? XRAY_PRICE + (xrayHasAddon ? XRAY_ADDON_PRICE : 0)
      : isNorcet
      ? 149
      : isMedical
      ? 149
      : Number(reqAmount || 99);

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid order amount" }, { status: 400 });
    }

    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    if (isMock) {
      return NextResponse.json({
        orderId: `order_mock_${Math.random().toString(36).substring(2, 11)}`,
        paymentSessionId: `session_mock_${Math.random().toString(36).substring(2, 11)}`,
        amount,
        currency: "INR",
        mock: true,
      });
    }

    const configuredAppUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const appUrl = (
      configuredAppUrl ||
      (process.env.NODE_ENV === "production"
        ? "https://nokrimitra.in"
        : `${protocol}://${host}`)
    ).replace(/\/$/, "");

    const baseUrl =
      env === "SANDBOX"
        ? "https://sandbox.cashfree.com/pg/orders"
        : "https://api.cashfree.com/pg/orders";

    // Clean phone number format for Cashfree (must be 10 digits without leading 0 or +91)
    const cleanPhone = String(phone || "").replace(/\D/g, "").slice(-10) || "9999999999";
    const cleanEmail = String(email || "").trim() || "customer@example.com";
    const cleanName = String(name || "").trim() || "Candidate";

    // Build the correct post-payment return URL + order tags per product.
    let returnUrl: string;
    let orderTags: Record<string, string> | undefined;

    if (isXray) {
      const addonParam = xrayHasAddon ? XRAY_ADDON_ID : "";
      returnUrl =
        `${appUrl}/xray-diagnosis/thank-you?order_id={order_id}` +
        `&name=${encodeURIComponent(cleanName)}` +
        `&email=${encodeURIComponent(cleanEmail)}` +
        `&amountPaid=${amount}` +
        `&productName=${encodeURIComponent(productName || "X-Ray Diagnosis Guide (PDF)")}` +
        `&product=xray&addons=${encodeURIComponent(addonParam)}`;
      orderTags = { product: "xray", addons: addonParam };
    } else if (isNorcet) {
      returnUrl =
        `${appUrl}/norcet-notes/thank-you?order_id={order_id}` +
        `&name=${encodeURIComponent(cleanName)}` +
        `&email=${encodeURIComponent(cleanEmail)}` +
        `&amountPaid=${amount}` +
        `&productName=${encodeURIComponent(productName || "NORCET 11 Notes (700+ Pages PDF)")}` +
        `&product=norcet`;
      orderTags = { product: "norcet" };
    } else if (isMedical) {
      returnUrl =
        `${appUrl}/medical-master-pdfs/thank-you?order_id={order_id}` +
        `&name=${encodeURIComponent(cleanName)}` +
        `&email=${encodeURIComponent(cleanEmail)}` +
        `&amountPaid=${amount}` +
        `&productName=${encodeURIComponent(productName || "31 Medical Master PDFs Bundle")}` +
        `&product=medical`;
      orderTags = { product: "medical" };
    } else {
      returnUrl =
        `${appUrl}/gsrtc-mcq-course/thank-you?order_id={order_id}` +
        `&name=${encodeURIComponent(cleanName)}` +
        `&email=${encodeURIComponent(cleanEmail)}` +
        `&amountPaid=${amount}` +
        `&productName=${encodeURIComponent(productName || "GSRTC કંડક્ટર MCQ પેકેજ")}` +
        `&product=mcq`;
    }

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": appId!,
        "x-client-secret": secretKey!,
        "x-api-version": "2023-08-01",
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: `cust_${Date.now()}`,
          customer_name: cleanName,
          customer_email: cleanEmail,
          customer_phone: cleanPhone,
        },
        order_meta: {
          return_url: returnUrl,
        },
        ...(orderTags ? { order_tags: orderTags } : {}),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cashfree order creation error:", data);
      throw new Error(data.message || "Failed to create Cashfree order");
    }

    return NextResponse.json({
      orderId: data.order_id,
      paymentSessionId: data.payment_session_id,
      amount: data.order_amount,
      currency: data.order_currency,
      mock: false,
    });
  } catch (error: unknown) {
    console.error("Cashfree API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create order" },
      { status: 500 }
    );
  }
}
