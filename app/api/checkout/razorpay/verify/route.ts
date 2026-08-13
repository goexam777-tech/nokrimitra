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
import { buildOpdEmail, buildOpdEmailText } from "@/lib/opdEmailTemplate";
import { createDownloadToken } from "@/lib/downloadToken";
import { ESCOOTER_CATALOG } from "@/lib/escooterCatalog";

const OPD_BASE_PRICE = 199;
const OPD_ADDON_ID = "emergency-handbook";
const OPD_ADDON_PRICE = 49;
const OPD_ADDON_NAME = "Emergency Medicine Handbook";

const PSY_BASE_PRICE = 149;
const PSY_ADDON_ID = "therapeutic-interventions";
const PSY_ADDON_PRICE = 99;
const PSY_ADDON_NAME = "800 Therapeutic Interventions";

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
      const mockHasOpdAddon =
        product === "opd" &&
        String(addons || "").split(",").includes(OPD_ADDON_ID);
      const mockHasPsyAddon =
        product === "psychology" &&
        String(addons || "").split(",").includes(PSY_ADDON_ID);
      const mockAddonToken =
        inMockMode && mockHasOpdAddon
          ? createDownloadToken("opd-emergency-handbook", razorpay_order_id)
          : null;
      const mockAmount =
        product === "opd"
          ? OPD_BASE_PRICE + (mockHasOpdAddon ? OPD_ADDON_PRICE : 0)
          : product === "psychology"
            ? PSY_BASE_PRICE + (mockHasPsyAddon ? PSY_ADDON_PRICE : 0)
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
        ...(product === "psychology"
          ? [
              { label: "Psychology Notes", path: "/psychology-notes/go" },
              ...(mockHasPsyAddon
                ? [{ label: PSY_ADDON_NAME, path: `/psychology-notes/go?item=${PSY_ADDON_ID}` }]
                : []),
            ]
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
    if (product === "opd") {
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
      if (!orderResponse.ok || order.notes?.product !== "opd") {
        return NextResponse.json(
          { error: "Could not verify OPD order details" },
          { status: 400 }
        );
      }

      verifiedOpdAddons = String(order.notes?.addons || "")
        .split(",")
        .map((id: string) => id.trim())
        .filter((id: string) => id === OPD_ADDON_ID);
      verifiedOpdAmount =
        OPD_BASE_PRICE +
        (verifiedOpdAddons.includes(OPD_ADDON_ID) ? OPD_ADDON_PRICE : 0);
      if (
        order.currency !== "INR" ||
        Number(order.amount) !== verifiedOpdAmount * 100
      ) {
        return NextResponse.json(
          { error: "OPD order amount verification failed" },
          { status: 400 }
        );
      }
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
    // product name, and query string are never trusted for fulfilment.
    let verifiedPsyAddon = false;
    let verifiedPsyAmount = PSY_BASE_PRICE;
    let verifiedPsyEmail = String(email || "").trim().toLowerCase();
    let verifiedPsyName = String(name || "there").trim() || "there";
    let psyNotes: Record<string, string> = {};
    let psyAlreadyFulfilled = false;
    if (product === "psychology") {
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
          { error: "Could not verify Psychology order details" },
          { status: 400 }
        );
      }

      psyNotes = (order.notes || {}) as Record<string, string>;
      verifiedPsyEmail = String(
        psyNotes.customerEmail || verifiedPsyEmail
      ).trim().toLowerCase();
      verifiedPsyName = String(
        psyNotes.customerName || verifiedPsyName
      ).trim() || "there";
      const paidAmount = Number(order.amount) / 100;
      if (psyNotes.product === "psychology") {
        verifiedPsyAddon = String(psyNotes.addons || "")
          .split(",")
          .map((id: string) => id.trim())
          .includes(PSY_ADDON_ID);
        verifiedPsyAmount =
          PSY_BASE_PRICE + (verifiedPsyAddon ? PSY_ADDON_PRICE : 0);
      } else if (
        !psyNotes.product &&
        (paidAmount === PSY_BASE_PRICE ||
          paidAmount === PSY_BASE_PRICE + PSY_ADDON_PRICE)
      ) {
        // Compatibility for orders created just before Psychology order notes
        // were introduced. The paid Razorpay amount is still server-verified.
        verifiedPsyAddon = paidAmount === PSY_BASE_PRICE + PSY_ADDON_PRICE;
        verifiedPsyAmount = paidAmount;
      } else {
        return NextResponse.json(
          { error: "Could not verify Psychology product details" },
          { status: 400 }
        );
      }

      if (Number(order.amount) !== verifiedPsyAmount * 100) {
        return NextResponse.json(
          { error: "Psychology order amount verification failed" },
          { status: 400 }
        );
      }
      psyAlreadyFulfilled = Boolean(psyNotes.fulfilledAt);
    }

    // Prefer an explicitly configured public origin for links included in email.
    const configuredAppUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const appUrl = (configuredAppUrl ||
      (process.env.NODE_ENV === "production"
        ? "https://nokrimitra.in"
        : `${protocol}://${host}`)).replace(/\/$/, "");
    const isPsychology = product === "psychology";
    const isVastu = product === "vastu";
    const isMcq = product === "mcq";
    const isEscooter = product === "escooter";
    const isOpd = product === "opd";
    const deliveryEmail = isPsychology ? verifiedPsyEmail : email;
    const deliveryName = isPsychology ? verifiedPsyName : name;

    // Only buyers get a signed download link (issued after signature check).
    const escooterToken = isEscooter
      ? createDownloadToken("escooter", razorpay_order_id)
      : null;
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
    const psyToken = isPsychology
      ? createDownloadToken("psychology", razorpay_order_id)
      : null;
    const psyAddonToken =
      isPsychology && verifiedPsyAddon
        ? createDownloadToken(
            "psychology-therapeutic-interventions",
            razorpay_order_id
          )
        : null;
    const psyDownloadUrl = `${appUrl}/psychology-notes/go${
      psyToken ? `?t=${psyToken}` : ""
    }`;
    const psyAddonDownloadUrl = `${appUrl}/psychology-notes/go?item=${PSY_ADDON_ID}${
      psyAddonToken ? `&t=${psyAddonToken}` : ""
    }`;

    // Main notes are always included. The signed add-on URL is created only
    // when Razorpay confirms the buyer paid the extra ₹99.
    const psyDownloads = [
      { label: "Psychology Notes", url: psyDownloadUrl },
      ...(psyAddonToken
        ? [{ label: PSY_ADDON_NAME, url: psyAddonDownloadUrl }]
        : []),
    ];

    const downloadUrl = isPsychology
      ? psyDownloadUrl
      : isVastu
      ? `${appUrl}/vastu-plan-checkout/go`
      : isMcq
      ? `${appUrl}/gsrtc-mcq-course/go`
      : isEscooter
      ? escooterDownloadUrl
      : isOpd
      ? opdDownloadUrl
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

    let emailDelivered = false;
    const skipDuplicateDelivery =
      (isEscooter && escooterAlreadyFulfilled) ||
      (isPsychology && psyAlreadyFulfilled);

    if (
      resendApiKey &&
      resendApiKey !== "your_resend_key_here" &&
      deliveryEmail &&
      !skipDuplicateDelivery
    ) {
      try {
        const psyProductName = verifiedPsyAddon
          ? "Psychology Notes + 800 Therapeutic Interventions"
          : "Psychology Notes";
        const vastuProductName =
          productName || "10k Vastu Floor Plan Editable Bundle";
        const gsrtcProductName = "GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ";
        const escooterProductName = ESCOOTER_CATALOG.name;
        const opdProductName = productName || "OPD Mastery E-book (2026 Edition)";

        const htmlContent = isOpd
          ? buildOpdEmail({
              customerName: name || "there",
              productName: opdProductName,
              orderId: razorpay_order_id,
              amount: verifiedOpdAmount,
              downloadUrl,
              downloads: opdDownloads,
            })
          : isPsychology
          ? buildPsychologyEmail({
              customerName: deliveryName || "there",
              productName: psyProductName,
              orderId: razorpay_order_id,
              amount: verifiedPsyAmount,
              downloadUrl,
              downloads: psyDownloads,
            })
          : isEscooter
          ? buildEscooterEmail({
              customerName: name || "there",
              productName: escooterProductName,
              orderId: razorpay_order_id,
              amount: verifiedEscooterAmount,
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

        const textContent = isOpd
          ? buildOpdEmailText({
              customerName: name || "there",
              productName: opdProductName,
              orderId: razorpay_order_id,
              amount: verifiedOpdAmount,
              downloadUrl,
              downloads: opdDownloads,
            })
          : isPsychology
          ? buildPsychologyEmailText({
              customerName: deliveryName || "there",
              productName: psyProductName,
              orderId: razorpay_order_id,
              amount: verifiedPsyAmount,
              downloadUrl,
              downloads: psyDownloads,
            })
          : isEscooter
          ? buildEscooterEmailText({
              customerName: name || "there",
              productName: escooterProductName,
              orderId: razorpay_order_id,
              amount: verifiedEscooterAmount,
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

        const subject = isOpd
          ? `Your download is ready — OPD Mastery E-book (2026)`
          : isPsychology
          ? `${psyProductName}: Your download link is ready! 🎉`
          : isEscooter
          ? `Your EV Repair 3-Book Bundle is ready`
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
            to: [deliveryEmail],
            reply_to:
              isVastu
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

    if (isPsychology && !psyAlreadyFulfilled && emailDelivered) {
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
                ...psyNotes,
                product: "psychology",
                addons: verifiedPsyAddon ? PSY_ADDON_ID : "",
                catalogVersion: psyNotes.catalogVersion || "1",
                fulfilledAt: new Date().toISOString(),
              },
            }),
          }
        );
        if (!stampResponse.ok) {
          console.error(
            "Could not mark Psychology order as fulfilled:",
            await stampResponse.text()
          );
        }
      } catch (stampErr) {
        console.error("Could not mark Psychology order as fulfilled:", stampErr);
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
          }
        : {}),
      ...(isPsychology
        ? {
            amountPaid: verifiedPsyAmount,
            downloadPath: `/psychology-notes/go${
              psyToken ? `?t=${psyToken}` : ""
            }`,
            downloads: [
              {
                label: "Psychology Notes",
                path: `/psychology-notes/go${
                  psyToken ? `?t=${psyToken}` : ""
                }`,
              },
              ...(psyAddonToken
                ? [
                    {
                      label: PSY_ADDON_NAME,
                      path: `/psychology-notes/go?item=${PSY_ADDON_ID}&t=${psyAddonToken}`,
                    },
                  ]
                : []),
            ],
            alreadyFulfilled: psyAlreadyFulfilled,
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

