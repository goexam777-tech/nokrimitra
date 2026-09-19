import { buildAnatomyEmail, buildAnatomyEmailText } from "@/lib/anatomyEmailTemplate";
import { createStableDownloadToken } from "@/lib/downloadToken";

export const ANATOMY_PRICE = 149;
export const ANATOMY_PRODUCT_NAME =
  "500+ Human Anatomy Coloring Book Bundle";

export type AnatomyFulfillmentResult = {
  amountPaid: number;
  customerName: string;
  customerEmail: string;
  downloadPath: string;
  alreadyFulfilled: boolean;
  emailDelivered: boolean;
};

class AnatomyFulfillmentError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "AnatomyFulfillmentError";
    this.status = status;
  }
}

function razorpayAuth(keyId: string, keySecret: string): string {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}

export function getAnatomyFulfillmentErrorStatus(error: unknown): number {
  return error instanceof AnatomyFulfillmentError ? error.status : 500;
}

export async function fulfillAnatomyRazorpayOrder({
  orderId,
  paymentId,
  appUrl,
}: {
  orderId: string;
  paymentId?: string;
  appUrl: string;
}): Promise<AnatomyFulfillmentResult> {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret || keySecret.includes("your_key_secret")) {
    throw new AnatomyFulfillmentError(
      "Razorpay credentials are not configured on the server",
      500
    );
  }

  const authorization = razorpayAuth(keyId, keySecret);
  const orderResponse = await fetch(
    `https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`,
    {
      headers: { Authorization: authorization },
      cache: "no-store",
    }
  );
  const order = await orderResponse.json();

  if (!orderResponse.ok) {
    throw new AnatomyFulfillmentError("Could not verify Razorpay order", 400);
  }

  const notes = (order.notes || {}) as Record<string, string>;
  const expectedAmount = ANATOMY_PRICE * 100;
  if (
    notes.product !== "anatomy" ||
    order.currency !== "INR" ||
    Number(order.amount) !== expectedAmount ||
    Number(order.amount_paid) !== expectedAmount ||
    order.status !== "paid"
  ) {
    throw new AnatomyFulfillmentError(
      "Anatomy order details or payment status could not be verified",
      400
    );
  }

  if (paymentId) {
    const paymentResponse = await fetch(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`,
      {
        headers: { Authorization: authorization },
        cache: "no-store",
      }
    );
    const payment = await paymentResponse.json();

    if (
      !paymentResponse.ok ||
      payment.order_id !== orderId ||
      payment.currency !== "INR" ||
      Number(payment.amount) !== expectedAmount ||
      payment.status !== "captured"
    ) {
      throw new AnatomyFulfillmentError(
        "Razorpay payment capture could not be verified",
        400
      );
    }
  }

  const customerEmail = String(notes.customerEmail || "")
    .trim()
    .toLowerCase();
  const customerName = String(notes.customerName || "Student").trim() || "Student";

  if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    throw new AnatomyFulfillmentError(
      "The verified order does not contain a valid delivery email",
      400
    );
  }

  const tokenExpiry =
    Number(order.created_at) * 1000 + 365 * 24 * 60 * 60 * 1000;
  const token = createStableDownloadToken("anatomy", orderId, tokenExpiry);
  if (!token) {
    throw new AnatomyFulfillmentError(
      "Secure download link could not be generated",
      500
    );
  }

  const normalizedAppUrl = appUrl.replace(/\/$/, "");
  const downloadPath = `/anatomy-coloring-book/go?t=${token}`;
  const downloadUrl = `${normalizedAppUrl}${downloadPath}`;
  const alreadyFulfilled = Boolean(notes.fulfilledAt);
  let emailDelivered = alreadyFulfilled;

  if (!alreadyFulfilled) {
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom =
      process.env.EMAIL_FROM || "NokriMitra <download@pdf.nokrimitra.in>";

    if (resendApiKey && resendApiKey !== "your_resend_key_here") {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
          "Idempotency-Key": `anatomy-${orderId}`,
        },
        body: JSON.stringify({
          from: emailFrom,
          to: [customerEmail],
          reply_to: "support@nokrimitra.in",
          subject: "Your Anatomy Coloring Bundle is ready 🎨",
          html: buildAnatomyEmail({
            customerName,
            productName: ANATOMY_PRODUCT_NAME,
            orderId,
            amount: ANATOMY_PRICE,
            downloadUrl,
            coverUrl: `${normalizedAppUrl}/anatomy-coloring.webp`,
          }),
          text: buildAnatomyEmailText({
            customerName,
            productName: ANATOMY_PRODUCT_NAME,
            orderId,
            amount: ANATOMY_PRICE,
            downloadUrl,
          }),
        }),
      });

      if (emailResponse.ok) {
        const emailResult = await emailResponse.json().catch(() => ({}));
        const fulfilledAt = new Date().toISOString();
        const updatedNotes = {
          ...notes,
          product: "anatomy",
          catalogVersion: notes.catalogVersion || "1",
          fulfilledAt,
          emailId: String(emailResult.id || "").slice(0, 120),
        };

        const stampResponse = await fetch(
          `https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: authorization,
            },
            body: JSON.stringify({ notes: updatedNotes }),
          }
        );

        if (stampResponse.ok) {
          emailDelivered = true;
        } else {
          console.error(
            "[Anatomy Fulfillment] Could not mark order as fulfilled:",
            await stampResponse.text()
          );
        }
      } else {
        console.error(
          "[Anatomy Fulfillment] Resend rejected delivery:",
          await emailResponse.text()
        );
      }
    } else {
      console.error(
        "[Anatomy Fulfillment] RESEND_API_KEY is missing; email was not sent"
      );
    }
  }

  return {
    amountPaid: ANATOMY_PRICE,
    customerName,
    customerEmail,
    downloadPath,
    alreadyFulfilled,
    emailDelivered,
  };
}
