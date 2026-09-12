import { NextResponse } from "next/server";
import crypto from "crypto";
import { buildOrderEmail, buildOrderEmailText } from "@/lib/emailTemplate";
import {
  buildEscooterEmail,
  buildEscooterEmailText,
} from "@/lib/escooterEmailTemplate";
import { buildOpdEmail, buildOpdEmailText } from "@/lib/opdEmailTemplate";
import {
  buildNursingEmail,
  buildNursingEmailText,
} from "@/lib/nursingEmailTemplate";
import {
  buildMbbsEmail,
  buildMbbsEmailText,
} from "@/lib/mbbsEmailTemplate";
import { createDownloadToken } from "@/lib/downloadToken";
import { ESCOOTER_CATALOG } from "@/lib/escooterCatalog";

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
      const mockTokenProduct =
        inMockMode && (product === "escooter" || product === "opd")
          ? (product as "escooter" | "opd")
          : null;
      const mockToken = mockTokenProduct
        ? createDownloadToken(mockTokenProduct, razorpay_order_id)
        : null;
      const mockBase =
        mockTokenProduct === "opd"
          ? "/opd-mastery/go"
          : "/electric-scooter-repairing/go";
      const isExitOfferMock =
        product === "opd" &&
        (String(amountPaid) === "149" || String(addons || "").includes("exit149") || (body as { offer?: string }).offer === "exit149");
      const mockHasOpdAddon =
        product === "opd" &&
        (String(addons || "").split(",").includes(OPD_ADDON_ID) || isExitOfferMock);
      const mockAddonToken =
        inMockMode && mockHasOpdAddon
          ? createDownloadToken("opd-emergency-handbook", razorpay_order_id)
          : null;
      const mockAmount =
        product === "opd"
          ? isExitOfferMock
            ? OPD_EXIT_PRICE
            : OPD_BASE_PRICE + (mockHasOpdAddon ? OPD_ADDON_PRICE : 0)
          : product === "nursing"
            ? NURSING_PRICE
            : product === ESCOOTER_CATALOG.product
              ? ESCOOTER_CATALOG.price
              : Number(amountPaid || 0);
      const mockDownloads = [
        ...(mockTokenProduct === "opd" && mockToken
          ? [{ label: "OPD Mastery E-book", path: `${mockBase}?t=${mockToken}` }]
          : []),
        ...(mockAddonToken
          ? [{ label: OPD_ADDON_NAME, path: `/opd-mastery/go?item=${OPD_ADDON_ID}&t=${mockAddonToken}` }]
          : []),
        ...(product === "nursing"
          ? [{ label: NURSING_PRODUCT_NAME, path: "/nursing-notes/go" }]
          : []),
      ];

      return NextResponse.json({
        success: true,
        verified: true,
        mock: true,
        amountPaid: mockAmount,
        downloads: mockDownloads,
        ...(mockToken ? { downloadPath: `${mockBase}?t=${mockToken}` } : {}),
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

    let verifiedOpdAddons: string[] = [];
    let verifiedOpdAmount = Number(amountPaid || OPD_BASE_PRICE);
    let opdNotes: Record<string, string> = {};
    let opdAlreadyFulfilled = false;
    let verifiedOpdEmail = String(email || "").trim().toLowerCase();
    let verifiedOpdName = String(name || "Doctor").trim() || "Doctor";
    if (product === "opd" || product === "opd-ebook" || product === "opd_ebook") {
      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!keyId) {
        return NextResponse.json(
          { error: "Razorpay key ID not configured on server" },
          { status: 500 }
        );
      }

      const orderResponse = await fetch(
        `https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpay_order_id)}`,
        {
          headers: {
            Authorization:
              "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
          },
          cache: "no-store",
        }
      );
      const order = await orderResponse.json();
      const isOrderOpd = order.notes?.product === "opd" || order.notes?.product === "opd-ebook" || order.notes?.product === "opd_ebook";
      if (!orderResponse.ok || !isOrderOpd) {
        return NextResponse.json(
          { error: "Could not verify OPD order details" },
          { status: 400 }
        );
      }

      opdNotes = (order.notes || {}) as Record<string, string>;
      const isExitOffer =
        order.notes?.offer === "exit149" ||
        Number(order.amount) === OPD_EXIT_PRICE * 100;
      const isOpdEbook = product === "opd-ebook" || product === "opd_ebook" || order.notes?.product === "opd-ebook" || order.notes?.product === "opd_ebook";

      if (isExitOffer) {
        verifiedOpdAddons = [OPD_ADDON_ID];
        verifiedOpdAmount = OPD_EXIT_PRICE;
      } else {
        verifiedOpdAddons = String(order.notes?.addons || "")
          .split(",")
          .map((id: string) => id.trim())
          .filter((id: string) => id === OPD_ADDON_ID);
        verifiedOpdAmount =
          (isOpdEbook ? 149 : OPD_BASE_PRICE) +
          (verifiedOpdAddons.includes(OPD_ADDON_ID) ? OPD_ADDON_PRICE : 0);
      }

      if (
        order.currency !== "INR" ||
        Number(order.amount) !== verifiedOpdAmount * 100
      ) {
        return NextResponse.json(
          { error: "OPD order amount verification failed" },
          { status: 400 }
        );
      }

      verifiedOpdEmail = String(
        opdNotes.customerEmail || verifiedOpdEmail
      ).trim().toLowerCase();
      verifiedOpdName = String(
        opdNotes.customerName || verifiedOpdName
      ).trim() || "Doctor";
      opdAlreadyFulfilled = Boolean(opdNotes.fulfilledAt);
    }

    let verifiedEscooterAmount: number = ESCOOTER_CATALOG.price;
    // Razorpay order notes double as the fulfilment record, so a repeat visit
    // (new browser, cleared storage) cannot trigger a second delivery email or
    // a second Purchase conversion.
    let escooterNotes: Record<string, string> = {};
    let escooterAlreadyFulfilled = false;
    if (product === ESCOOTER_CATALOG.product) {
      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!keyId) {
        return NextResponse.json(
          { error: "Razorpay key ID not configured on server" },
          { status: 500 }
        );
      }

      const orderResponse = await fetch(
        `https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpay_order_id)}`,
        {
          headers: {
            Authorization:
              "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
          },
          cache: "no-store",
        }
      );
      const order = await orderResponse.json();
      const notesMatch =
        order.notes?.product === ESCOOTER_CATALOG.product &&
        order.notes?.bundle === ESCOOTER_CATALOG.bundleId;

      if (!orderResponse.ok || !notesMatch) {
        return NextResponse.json(
          { error: "Could not verify Electric Scooter bundle order details" },
          { status: 400 }
        );
      }

      // The price the server charged is read back from the order, so a later
      // catalogue price change cannot invalidate an already-paid order.
      const notedPrice = Number(order.notes?.price);
      const expectedPrice = Number.isFinite(notedPrice) && notedPrice > 0
        ? notedPrice
        : ESCOOTER_CATALOG.price;

      if (
        order.currency !== "INR" ||
        Number(order.amount) !== expectedPrice * 100
      ) {
        return NextResponse.json(
          { error: "Electric Scooter bundle amount verification failed" },
          { status: 400 }
        );
      }
      verifiedEscooterAmount = expectedPrice;
      escooterNotes = (order.notes || {}) as Record<string, string>;
      escooterAlreadyFulfilled = Boolean(escooterNotes.fulfilledAt);
    }

    // Read the Psychology add-on from Razorpay itself. The browser's amount,
    // Nursing e-book: single product, verified server-side against Razorpay.
    let verifiedNursingAmount = NURSING_PRICE;
    let verifiedNursingEmail = String(email || "").trim().toLowerCase();
    let verifiedNursingName = String(name || "there").trim() || "there";
    let nursingNotes: Record<string, string> = {};
    let nursingAlreadyFulfilled = false;
    if (product === "nursing") {
      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!keyId) {
        return NextResponse.json(
          { error: "Razorpay key ID not configured on server" },
          { status: 500 }
        );
      }

      const orderResponse = await fetch(
        `https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpay_order_id)}`,
        {
          headers: {
            Authorization:
              "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
          },
          cache: "no-store",
        }
      );
      const order = await orderResponse.json();
      if (!orderResponse.ok || order.currency !== "INR") {
        return NextResponse.json(
          { error: "Could not verify Nursing order details" },
          { status: 400 }
        );
      }

      nursingNotes = (order.notes || {}) as Record<string, string>;
      const paidAmount = Number(order.amount) / 100;
      if (nursingNotes.product === "nursing" || paidAmount === NURSING_PRICE) {
        verifiedNursingAmount = NURSING_PRICE;
      } else {
        return NextResponse.json(
          { error: "Could not verify Nursing product details" },
          { status: 400 }
        );
      }

      if (Number(order.amount) !== verifiedNursingAmount * 100) {
        return NextResponse.json(
          { error: "Nursing order amount verification failed" },
          { status: 400 }
        );
      }
      verifiedNursingEmail = String(
        nursingNotes.customerEmail || verifiedNursingEmail
      ).trim().toLowerCase();
      verifiedNursingName = String(
        nursingNotes.customerName || verifiedNursingName
      ).trim() || "there";
      nursingAlreadyFulfilled = Boolean(nursingNotes.fulfilledAt);
    }

    // Prefer an explicitly configured public origin for links included in email.
    const configuredAppUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const appUrl = (configuredAppUrl ||
      (process.env.NODE_ENV === "production"
        ? "https://nokrimitra.in"
        : `${protocol}://${host}`)).replace(/\/$/, "");
    const isMcq = product === "mcq";
    const isEscooter = product === "escooter";
    const isOpd = product === "opd" || product === "opd-ebook" || product === "opd_ebook";
    const isNursing = product === "nursing";
    const isMbbs = product === "mbbs" || product === "mbbs-notes";
    const deliveryEmail = isNursing
      ? verifiedNursingEmail
      : isOpd
      ? verifiedOpdEmail
      : email;
    const deliveryName = isNursing
      ? verifiedNursingName
      : isOpd
      ? verifiedOpdName
      : name;

    // Only buyers get a signed download link (issued after signature check).
    const escooterToken = isEscooter
      ? createDownloadToken("escooter", razorpay_order_id)
      : null;
    const mbbsToken = isMbbs
      ? createDownloadToken("mbbs", razorpay_order_id)
      : null;
    const mbbsDownloadUrl = `${appUrl}/mbbs-notes/go${
      mbbsToken ? `?t=${mbbsToken}` : ""
    }`;
    const opdToken = isOpd
      ? createDownloadToken("opd", razorpay_order_id)
      : null;
    const opdAddonToken =
      isOpd && verifiedOpdAddons.includes(OPD_ADDON_ID)
        ? createDownloadToken("opd-emergency-handbook", razorpay_order_id)
        : null;
    const opdDownloadUrl = `${appUrl}/opd-mastery/go${
      opdToken ? `?t=${opdToken}` : ""
    }`;
    const opdAddonDownloadUrl = `${appUrl}/opd-mastery/go?item=${OPD_ADDON_ID}${
      opdAddonToken ? `&t=${opdAddonToken}` : ""
    }`;
    const opdDownloads = [
      { label: "OPD Mastery E-book", url: opdDownloadUrl },
      ...(opdAddonToken
        ? [{ label: OPD_ADDON_NAME, url: opdAddonDownloadUrl }]
        : []),
    ];
    const escooterDownloadUrl = `${appUrl}/electric-scooter-repairing/go${
      escooterToken ? `?t=${escooterToken}` : ""
    }`;
    const nursingToken = isNursing
      ? createDownloadToken("nursing", razorpay_order_id)
      : null;
    const nursingDownloadUrl = `${appUrl}/nursing-notes/go${
      nursingToken ? `?t=${nursingToken}` : ""
    }`;

    const downloadUrl = isNursing
      ? nursingDownloadUrl
      : isMbbs
      ? mbbsDownloadUrl
      : isMcq
      ? `${appUrl}/gsrtc-mcq-course/go`
      : isEscooter
      ? escooterDownloadUrl
      : isOpd
      ? opdDownloadUrl
      : `${appUrl}/go`;

    // Trigger Email sending via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || "NokriMitra <onboarding@resend.dev>";

    let emailDelivered = false;
    const skipDuplicateDelivery =
      (isEscooter && escooterAlreadyFulfilled) ||
      (isNursing && nursingAlreadyFulfilled) ||
      (isOpd && opdAlreadyFulfilled);

    if (
      resendApiKey &&
      resendApiKey !== "your_resend_key_here" &&
      deliveryEmail &&
      !skipDuplicateDelivery
    ) {
      try {
        const gsrtcProductName = "GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ";
        const escooterProductName = ESCOOTER_CATALOG.name;
        const opdProductName = productName || "OPD Mastery E-book (2026 Edition)";

        const htmlContent = isOpd
          ? buildOpdEmail({
              customerName: deliveryName || "Doctor",
              productName: opdProductName,
              orderId: razorpay_order_id,
              amount: verifiedOpdAmount,
              downloadUrl,
              downloads: opdDownloads,
            })
          : isNursing
          ? buildNursingEmail({
              customerName: deliveryName || "there",
              productName: NURSING_PRODUCT_NAME,
              orderId: razorpay_order_id,
              amount: verifiedNursingAmount,
              downloadUrl,
            })
          : isMbbs
          ? buildMbbsEmail({
              customerName: deliveryName || "Doctor",
              productName: MBBS_PRODUCT_NAME,
              orderId: razorpay_order_id,
              amount: MBBS_PRICE,
              downloadUrl: mbbsDownloadUrl,
              supportEmail: "support@nokrimitra.in",
            })
          : isEscooter
          ? buildEscooterEmail({
              customerName: name || "there",
              productName: escooterProductName,
              orderId: razorpay_order_id,
              amount: verifiedEscooterAmount,
              downloadUrl,
            })
          : buildOrderEmail({
              customerName: name || "વિદ્યાર્થી",
              productName: productName || gsrtcProductName,
              orderId: razorpay_order_id,
              amount: Number(amountPaid || 99),
              downloadUrl,
            });

        const textContent = isOpd
          ? buildOpdEmailText({
              customerName: deliveryName || "Doctor",
              productName: opdProductName,
              orderId: razorpay_order_id,
              amount: verifiedOpdAmount,
              downloadUrl,
              downloads: opdDownloads,
            })
          : isNursing
          ? buildNursingEmailText({
              customerName: deliveryName || "there",
              productName: NURSING_PRODUCT_NAME,
              orderId: razorpay_order_id,
              amount: verifiedNursingAmount,
              downloadUrl,
            })
          : isMbbs
          ? buildMbbsEmailText({
              customerName: deliveryName || "Doctor",
              productName: MBBS_PRODUCT_NAME,
              orderId: razorpay_order_id,
              amount: MBBS_PRICE,
              downloadUrl: mbbsDownloadUrl,
              supportEmail: "support@nokrimitra.in",
            })
          : isEscooter
          ? buildEscooterEmailText({
              customerName: name || "there",
              productName: escooterProductName,
              orderId: razorpay_order_id,
              amount: verifiedEscooterAmount,
              downloadUrl,
            })
          : buildOrderEmailText({
              customerName: name || "વિદ્યાર્થી",
              productName: productName || gsrtcProductName,
              orderId: razorpay_order_id,
              amount: Number(amountPaid || 99),
              downloadUrl,
            });

        const subject = isMbbs
          ? `Complete MBBS Notes (All 21 Subjects): Your download link is ready! 🩺📚`
          : isOpd
          ? `Your download is ready — OPD Mastery E-book (2026)`
          : isNursing
          ? `${NURSING_PRODUCT_NAME}: Your download link is ready! 🩺`
          : isEscooter
          ? `Your EV Repair 3-Book Bundle is ready`
          : `${productName || gsrtcProductName}: આપનો ડાઉનલોડ લિંક તૈયાર છે! 📚🎉`;

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: emailFrom,
            to: [deliveryEmail],
            reply_to: "support@nokrimitra.in",
            subject,
            html: htmlContent,
            text: textContent,
          }),
        });

        if (!emailResponse.ok) {
          const errText = await emailResponse.text();
          console.error("Resend API failed:", errText);
        } else {
          emailDelivered = true;
          console.log(`Email successfully sent to ${email}`);
        }
      } catch (emailErr) {
        console.error("Failed to send email via Resend:", emailErr);
      }
    } else if (skipDuplicateDelivery) {
      console.log(
        `[DELIVERY SKIPPED] Order ${razorpay_order_id} was already fulfilled.`
      );
    } else {
      console.log(
        "[RESEND SKIPPED] Resend key is missing or not configured. No email sent."
      );
    }

    // Stamp the order once delivery succeeded. A failed send stays unmarked so
    // the buyer can retry and still receive the email.
    if (isEscooter && !escooterAlreadyFulfilled && emailDelivered) {
      try {
        const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        const stampResponse = await fetch(
          `https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpay_order_id)}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
            },
            // Notes are replaced wholesale, so the catalogue keys are re-sent.
            body: JSON.stringify({
              notes: { ...escooterNotes, fulfilledAt: new Date().toISOString() },
            }),
          }
        );
        if (!stampResponse.ok) {
          console.error(
            "Could not mark order as fulfilled:",
            await stampResponse.text()
          );
        }
      } catch (stampErr) {
        console.error("Could not mark order as fulfilled:", stampErr);
      }
    }

    if (isNursing && !nursingAlreadyFulfilled && emailDelivered) {
      try {
        const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        const stampResponse = await fetch(
          `https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpay_order_id)}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
            },
            body: JSON.stringify({
              notes: {
                ...nursingNotes,
                product: "nursing",
                catalogVersion: nursingNotes.catalogVersion || "1",
                fulfilledAt: new Date().toISOString(),
              },
            }),
          }
        );
        if (!stampResponse.ok) {
          console.error(
            "Could not mark Nursing order as fulfilled:",
            await stampResponse.text()
          );
        }
      } catch (stampErr) {
        console.error("Could not mark Nursing order as fulfilled:", stampErr);
      }
    }

    if (isOpd && !opdAlreadyFulfilled && emailDelivered) {
      try {
        const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        const stampResponse = await fetch(
          `https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpay_order_id)}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
            },
            body: JSON.stringify({
              notes: {
                ...opdNotes,
                product: "opd",
                catalogVersion: opdNotes.catalogVersion || "1",
                fulfilledAt: new Date().toISOString(),
              },
            }),
          }
        );
        if (!stampResponse.ok) {
          console.error(
            "Could not mark OPD order as fulfilled:",
            await stampResponse.text()
          );
        }
      } catch (stampErr) {
        console.error("Could not mark OPD order as fulfilled:", stampErr);
      }
    }

    return NextResponse.json({
      success: true,
      verified: true,
      mock: false,
      ...(isEscooter
        ? {
            amountPaid: verifiedEscooterAmount,
            downloadPath: `/electric-scooter-repairing/go${escooterToken ? `?t=${escooterToken}` : ""}`,
            // Lets the client skip re-firing Purchase for an order that was
            // already counted, even on a different device.
            alreadyFulfilled: escooterAlreadyFulfilled,
          }
        : {}),
      ...(isOpd
        ? {
            amountPaid: verifiedOpdAmount,
            downloadPath: `/opd-mastery/go${opdToken ? `?t=${opdToken}` : ""}`,
            downloads: [
              {
                label: "OPD Mastery E-book",
                path: `/opd-mastery/go${opdToken ? `?t=${opdToken}` : ""}`,
              },
              ...(opdAddonToken
                ? [
                    {
                      label: OPD_ADDON_NAME,
                      path: `/opd-mastery/go?item=${OPD_ADDON_ID}&t=${opdAddonToken}`,
                    },
                  ]
                : []),
            ],
            alreadyFulfilled: opdAlreadyFulfilled,
          }
        : {}),
      ...(isNursing
        ? {
            amountPaid: verifiedNursingAmount,
            downloadPath: `/nursing-notes/go${
              nursingToken ? `?t=${nursingToken}` : ""
            }`,
            downloads: [
              {
                label: NURSING_PRODUCT_NAME,
                path: `/nursing-notes/go${
                  nursingToken ? `?t=${nursingToken}` : ""
                }`,
              },
            ],
            alreadyFulfilled: nursingAlreadyFulfilled,
          }
        : {}),
      ...(isMbbs
        ? {
            amountPaid: MBBS_PRICE,
            downloadPath: `/mbbs-notes/go${
              mbbsToken ? `?t=${mbbsToken}` : ""
            }`,
            downloads: [
              {
                label: "Complete MBBS Notes (All 21 Subjects)",
                path: `/mbbs-notes/go${
                  mbbsToken ? `?t=${mbbsToken}` : ""
                }`,
              },
            ],
          }
        : {}),
    });
  } catch (error: any) {
    console.error("Signature verification error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal signature verification failed" },
      { status: 500 }
    );
  }
}

