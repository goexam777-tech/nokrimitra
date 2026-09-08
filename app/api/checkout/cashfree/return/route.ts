import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const order_id =
      searchParams.get("order_id") ||
      searchParams.get("orderId") ||
      searchParams.get("cf_order_id");

    const configuredAppUrl =
      process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const appUrl = (
      configuredAppUrl ||
      (process.env.NODE_ENV === "production"
        ? "https://nokrimitra.in"
        : `${protocol}://${host}`)
    ).replace(/\/$/, "");

    const requestedProduct = searchParams.get("product") || "";

    // If no order ID, return to checkout
    if (!order_id) {
      const fallbackCheckout = requestedProduct === "opd"
        ? `${appUrl}/opd-mastery/checkout?payment_status=cancelled`
        : `${appUrl}/xray-diagnosis/checkout?payment_status=cancelled`;
      return NextResponse.redirect(fallbackCheckout);
    }

    // Mock handling for local testing
    if (order_id.startsWith("order_mock_")) {
      const prod = requestedProduct || "opd";
      const q = new URLSearchParams({
        order_id,
        mock: "true",
        name: searchParams.get("name") || "",
        email: searchParams.get("email") || "",
        amountPaid: searchParams.get("amountPaid") || "99",
        product: prod,
        addons: searchParams.get("addons") || "",
      });
      if (prod === "opd") {
        return NextResponse.redirect(`${appUrl}/opd-mastery/thank-you?${q.toString()}`);
      }
      return NextResponse.redirect(
        `${appUrl}/xray-diagnosis/thank-you?${q.toString()}`
      );
    }

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const env = (process.env.CASHFREE_ENV || "PRODUCTION").toUpperCase();

    const baseUrl =
      env === "SANDBOX"
        ? `https://sandbox.cashfree.com/pg/orders/${encodeURIComponent(order_id)}`
        : `https://api.cashfree.com/pg/orders/${encodeURIComponent(order_id)}`;

    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "x-client-id": appId || "",
        "x-client-secret": secretKey || "",
        "x-api-version": "2023-08-01",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "Cashfree order fetch failed on return:",
        await response.text().catch(() => "")
      );
      return NextResponse.redirect(
        `${appUrl}/xray-diagnosis/checkout?payment_status=cancelled`
      );
    }

    const data = await response.json();
    const tags = (data.order_tags || {}) as Record<string, string>;
    const product = tags.product || "xray";

    const getCheckoutUrl = (prod: string, status = "cancelled") => {
      switch (prod) {
        case "opd":
          return `${appUrl}/opd-mastery/checkout?payment_status=${status}`;
        case "norcet":
          return `${appUrl}/norcet-notes/checkout?payment_status=${status}`;
        case "medical":
          return `${appUrl}/medical-master-pdfs/checkout?payment_status=${status}`;
        case "mcq":
          return `${appUrl}/gsrtc-mcq-course/checkout?payment_status=${status}`;
        case "xray":
        default:
          return `${appUrl}/xray-diagnosis/checkout?payment_status=${status}`;
      }
    };

    const getThankYouUrl = (prod: string, q: URLSearchParams) => {
      switch (prod) {
        case "opd":
          return `${appUrl}/opd-mastery/thank-you?${q.toString()}`;
        case "norcet":
          return `${appUrl}/norcet-notes/thank-you?${q.toString()}`;
        case "medical":
          return `${appUrl}/medical-master-pdfs/thank-you?${q.toString()}`;
        case "mcq":
          return `${appUrl}/gsrtc-mcq-course/thank-you?${q.toString()}`;
        case "xray":
        default:
          return `${appUrl}/xray-diagnosis/thank-you?${q.toString()}`;
      }
    };

    // CRITICAL: If payment was cancelled, failed, user dropped or pending -> REDIRECT TO CHECKOUT!
    if (data.order_status !== "PAID") {
      console.log(
        `Order ${order_id} returned with status: ${data.order_status}. Redirecting to checkout.`
      );
      return NextResponse.redirect(getCheckoutUrl(product, "cancelled"));
    }

    // If PAID -> Redirect to Thank You page with details
    const customerName =
      tags.name || data.customer_details?.customer_name || "there";
    const customerEmail =
      tags.email || data.customer_details?.customer_email || "";
    const addons = tags.addons || "";
    const amountPaid = String(data.order_amount || 99);

    const q = new URLSearchParams({
      order_id,
      name: customerName,
      email: customerEmail,
      amountPaid,
      product,
      addons,
    });

    return NextResponse.redirect(getThankYouUrl(product, q));
  } catch (error) {
    console.error("Cashfree return route error:", error);
    const configuredAppUrl =
      process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "";
    return NextResponse.redirect(
      `${configuredAppUrl}/xray-diagnosis/checkout?payment_status=cancelled`
    );
  }
}

export async function POST(req: Request) {
  return GET(req);
}
