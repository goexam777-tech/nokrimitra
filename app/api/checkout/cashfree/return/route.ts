import { NextResponse } from "next/server";

const ELECTRIC_PRODUCT = "electric-repairing";
const MEDICAL_PRODUCT = "medical-masterbook";

/**
 * Returns the status of the most recent payment attempt on an order:
 * "SUCCESS" | "PENDING" | "FAILED" | "USER_DROPPED" | ... or "NONE" if the
 * buyer never attempted a payment / the lookup failed.
 */
async function getLatestPaymentStatus(
  orderId: string,
  env: string,
  appId: string,
  secretKey: string
): Promise<string> {
  try {
    const url =
      env === "SANDBOX"
        ? `https://sandbox.cashfree.com/pg/orders/${encodeURIComponent(orderId)}/payments`
        : `https://api.cashfree.com/pg/orders/${encodeURIComponent(orderId)}/payments`;
    const res = await fetch(url, {
      headers: {
        "x-client-id": appId,
        "x-client-secret": secretKey,
        "x-api-version": "2023-08-01",
      },
      cache: "no-store",
    });
    if (!res.ok) return "NONE";
    const payments = (await res.json()) as Array<{
      payment_status?: string;
      payment_time?: string;
    }>;
    if (!Array.isArray(payments) || payments.length === 0) return "NONE";
    const latest = [...payments].sort(
      (a, b) =>
        new Date(b.payment_time || 0).getTime() -
        new Date(a.payment_time || 0).getTime()
    )[0];
    return String(latest.payment_status || "NONE").toUpperCase();
  } catch {
    return "NONE";
  }
}

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
    const isElectricReturn = requestedProduct === ELECTRIC_PRODUCT;
    const isMedicalReturn = requestedProduct === MEDICAL_PRODUCT;
    const electricCheckout = (status: string) =>
      `${appUrl}/electric-repairing-master-course/checkout?payment_status=${status}`;
    const medicalCheckout = (status: string) =>
      `${appUrl}/medical-masterbook/checkout?payment_status=${status}`;

    // If no order ID, return to checkout
    if (!order_id) {
      const fallbackCheckout = isElectricReturn
        ? electricCheckout("cancelled")
        : isMedicalReturn
        ? medicalCheckout("cancelled")
        : `${appUrl}/opd-mastery/checkout?payment_status=cancelled`;
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
      if (prod === MEDICAL_PRODUCT) {
        return NextResponse.redirect(`${appUrl}/medical-masterbook/thank-you?${q.toString()}`);
      }
      return NextResponse.redirect(`${appUrl}/opd-mastery/thank-you?${q.toString()}`);
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
      // Electric: we can't confirm status, so let the thank-you page retry
      // verification instead of telling a possibly-paid buyer it failed.
      if (isElectricReturn) {
        const q = new URLSearchParams({ order_id, pending: "1" });
        return NextResponse.redirect(
          `${appUrl}/electric-repairing-master-course/thank-you?${q.toString()}`
        );
      }
      return NextResponse.redirect(
        `${appUrl}/opd-mastery/checkout?payment_status=cancelled`
      );
    }

    const data = await response.json();
    const tags = (data.order_tags || {}) as Record<string, string>;
    const product = tags.product || "opd";

    const getCheckoutUrl = (prod: string, status = "cancelled") => {
      switch (prod) {
        case "opd-ebook":
        case "opd_ebook":
          return `${appUrl}/opd-mastery-ebook/checkout?payment_status=${status}`;
        case "anatomy":
          return `${appUrl}/anatomy-coloring-book/checkout?payment_status=${status}`;
        case "norcet":
          return `${appUrl}/norcet-notes/checkout?payment_status=${status}`;
        case "mcq":
          return `${appUrl}/gsrtc-mcq-course/checkout?payment_status=${status}`;
        case "electric-repairing":
          return `${appUrl}/electric-repairing-master-course/checkout?payment_status=${status}`;
        case "medical-masterbook":
          return `${appUrl}/medical-masterbook/checkout?payment_status=${status}`;
        case "opd":
        default:
          return `${appUrl}/opd-mastery/checkout?payment_status=${status}`;
      }
    };

    const getThankYouUrl = (prod: string, q: URLSearchParams) => {
      switch (prod) {
        case "opd-ebook":
        case "opd_ebook":
          return `${appUrl}/opd-mastery-ebook/thank-you?${q.toString()}`;
        case "anatomy":
          return `${appUrl}/anatomy-coloring-book/thank-you?${q.toString()}`;
        case "norcet":
          return `${appUrl}/norcet-notes/thank-you?${q.toString()}`;
        case "mcq":
          return `${appUrl}/gsrtc-mcq-course/thank-you?${q.toString()}`;
        case "electric-repairing":
          return `${appUrl}/electric-repairing-master-course/thank-you?${q.toString()}`;
        case "medical-masterbook":
          return `${appUrl}/medical-masterbook/thank-you?${q.toString()}`;
        case "opd":
        default:
          return `${appUrl}/opd-mastery/thank-you?${q.toString()}`;
      }
    };

    // Electric & Medical: tell apart "still processing" (e.g. UPI pending) from
    // "failed" / "cancelled", so a buyer whose money is in flight isn't asked to pay again.
    if (product === ELECTRIC_PRODUCT && data.order_status !== "PAID") {
      const paymentStatus = await getLatestPaymentStatus(
        order_id,
        env,
        appId || "",
        secretKey || ""
      );

      if (paymentStatus === "PENDING") {
        const q = new URLSearchParams({ order_id, pending: "1" });
        return NextResponse.redirect(
          `${appUrl}/electric-repairing-master-course/thank-you?${q.toString()}`
        );
      }

      return NextResponse.redirect(
        electricCheckout(paymentStatus === "FAILED" ? "failed" : "cancelled")
      );
    }

    if (product === MEDICAL_PRODUCT && data.order_status !== "PAID") {
      const paymentStatus = await getLatestPaymentStatus(
        order_id,
        env,
        appId || "",
        secretKey || ""
      );

      if (paymentStatus === "PENDING") {
        const q = new URLSearchParams({ order_id, pending: "1" });
        return NextResponse.redirect(
          `${appUrl}/medical-masterbook/thank-you?${q.toString()}`
        );
      }

      return NextResponse.redirect(
        medicalCheckout(paymentStatus === "FAILED" ? "failed" : "cancelled")
      );
    }

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
    const amountPaid = String(data.order_amount || 149);

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
    // Electric & Medical: status unknown, let thank-you page re-verify (it falls back to checkout if unpaid)
    const failedUrl = new URL(req.url);
    const failedOrderId = failedUrl.searchParams.get("order_id");
    const failedProduct = failedUrl.searchParams.get("product");
    if (failedProduct === ELECTRIC_PRODUCT && failedOrderId) {
      const q = new URLSearchParams({ order_id: failedOrderId, pending: "1" });
      return NextResponse.redirect(
        `${configuredAppUrl || failedUrl.origin}/electric-repairing-master-course/thank-you?${q.toString()}`
      );
    }
    if (failedProduct === MEDICAL_PRODUCT && failedOrderId) {
      const q = new URLSearchParams({ order_id: failedOrderId, pending: "1" });
      return NextResponse.redirect(
        `${configuredAppUrl || failedUrl.origin}/medical-masterbook/thank-you?${q.toString()}`
      );
    }
    return NextResponse.redirect(
      `${configuredAppUrl}/opd-mastery/checkout?payment_status=cancelled`
    );
  }
}

export async function POST(req: Request) {
  return GET(req);
}
