import { NextResponse } from "next/server";
import { buildOrderEmail, buildOrderEmailText } from "@/lib/emailTemplate";
import { buildXrayEmail, buildXrayEmailText } from "@/lib/xrayEmailTemplate";
import { buildNorcetEmail, buildNorcetEmailText } from "@/lib/norcetEmailTemplate";
import { buildMedicalEmail, buildMedicalEmailText } from "@/lib/medicalEmailTemplate";
import { buildOpdEmail, buildOpdEmailText } from "@/lib/opdEmailTemplate";
import { createDownloadToken } from "@/lib/downloadToken";

const XRAY_PRICE = 99;
const XRAY_PRODUCT_NAME = "X-Ray Diagnosis Guide (PDF)";
const XRAY_ADDON_ID = "lab-test-master-guide";
const XRAY_ADDON_PRICE = 49;
const XRAY_ADDON_NAME = "Clinical Lab Test Master Guide";

const OPD_BASE_PRICE = 99;
const OPD_EXIT_PRICE = 149;
const OPD_PRODUCT_NAME = "OPD Mastery E-book (2026 Edition)";
const OPD_ADDON_ID = "emergency-handbook";
const OPD_ADDON_PRICE = 49;
const OPD_ADDON_NAME = "Emergency Medicine Handbook";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { order_id, name, email, amountPaid, productName, product, addons, offer, isExitOffer } =
      body;

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

    const isOpd = product === "opd";
    const isXray = product === "xray";
    const isNorcet = product === "norcet";
    const isMedical = product === "medical" || product === "medical-master-pdfs";
    const isMbbs = product === "mbbs" || product === "mbbs-notes";

    // Public origin for links included in email + downloads.
    const configuredAppUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const appUrl = (
      configuredAppUrl ||
      (process.env.NODE_ENV === "production"
        ? "https://nokrimitra.in"
        : `${protocol}://${host}`)
    ).replace(/\/$/, "");

    if (isMock) {
      if (isOpd) {
        const isExit =
          String(amountPaid) === "149" ||
          String(addons || "").includes("exit149") ||
          offer === "exit149" ||
          isExitOffer === true;
        const hasAddon =
          String(addons || "").includes(OPD_ADDON_ID) || isExit;
        const opdToken = createDownloadToken("opd", order_id);
        const opdAddonToken = hasAddon
          ? createDownloadToken("opd-emergency-handbook", order_id)
          : null;
        const mockAmount = isExit
          ? OPD_EXIT_PRICE
          : OPD_BASE_PRICE + (hasAddon ? OPD_ADDON_PRICE : 0);

        return NextResponse.json({
          success: true,
          verified: true,
          mock: true,
          amountPaid: mockAmount,
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
        });
      }
      if (isMbbs) {
        return NextResponse.json({
          success: true,
          verified: true,
          mock: true,
          amountPaid: 199,
          downloadPath: "/mbbs-notes/go",
        });
      }
      if (isMedical) {
        return NextResponse.json({
          success: true,
          verified: true,
          mock: true,
          amountPaid: 149,
          downloadPath: "/medical-master-pdfs/go",
        });
      }
      if (isNorcet) {
        return NextResponse.json({
          success: true,
          verified: true,
          mock: true,
          amountPaid: 149,
          downloadPath: "/norcet-notes/go",
        });
      }
      if (isXray) {
        const hasAddon = String(addons || "").includes(XRAY_ADDON_ID);
        return NextResponse.json({
          success: true,
          verified: true,
          mock: true,
          amountPaid: XRAY_PRICE + (hasAddon ? XRAY_ADDON_PRICE : 0),
          downloadPath: "/xray-diagnosis/go",
          downloads: [
            { label: "X-Ray Diagnosis Guide", path: "/xray-diagnosis/go" },
            ...(hasAddon
              ? [
                  {
                    label: XRAY_ADDON_NAME,
                    path: `/xray-diagnosis/go?item=${XRAY_ADDON_ID}`,
                  },
                ]
              : []),
          ],
        });
      }
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

    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom =
      process.env.EMAIL_FROM || "NokriMitra <download@pdf.nokrimitra.in>";

    // The product + add-on are read back from Cashfree order tags, so the
    // browser can never inflate what was purchased.
    const tags = (data.order_tags || {}) as Record<string, string>;
    const verifiedProduct = tags.product || (isOpd ? "opd" : isXray ? "xray" : isNorcet ? "norcet" : isMedical ? "medical" : "mcq");

    if (verifiedProduct === "opd") {
      const isExitOffer =
        tags.offer === "exit149" ||
        Number(data.order_amount) === OPD_EXIT_PRICE;
      const verifiedAddon =
        isExitOffer ||
        String(tags.addons || "")
          .split(",")
          .map((id) => id.trim())
          .includes(OPD_ADDON_ID);
      const expectedAmount = isExitOffer
        ? OPD_EXIT_PRICE
        : OPD_BASE_PRICE + (verifiedAddon ? OPD_ADDON_PRICE : 0);

      if (Number(data.order_amount) !== expectedAmount) {
        return NextResponse.json(
          { error: "OPD order amount verification failed" },
          { status: 400 }
        );
      }

      const customerEmail = String(
        email || data.customer_details?.customer_email || ""
      ).trim();
      const customerName =
        String(name || data.customer_details?.customer_name || "Doctor/Student").trim() ||
        "Doctor/Student";

      const opdToken = createDownloadToken("opd", order_id);
      const opdAddonToken = verifiedAddon
        ? createDownloadToken("opd-emergency-handbook", order_id)
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

      if (resendApiKey && resendApiKey !== "your_resend_key_here" && customerEmail) {
        try {
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
              subject: `Your download is ready — OPD Mastery E-book (2026)`,
              html: buildOpdEmail({
                customerName,
                productName: verifiedAddon
                  ? `${OPD_PRODUCT_NAME} + ${OPD_ADDON_NAME}`
                  : OPD_PRODUCT_NAME,
                orderId: order_id,
                amount: expectedAmount,
                downloadUrl: opdDownloadUrl,
                downloads: opdDownloads,
              }),
              text: buildOpdEmailText({
                customerName,
                productName: verifiedAddon
                  ? `${OPD_PRODUCT_NAME} + ${OPD_ADDON_NAME}`
                  : OPD_PRODUCT_NAME,
                orderId: order_id,
                amount: expectedAmount,
                downloadUrl: opdDownloadUrl,
                downloads: opdDownloads,
              }),
            }),
          });
          if (!emailResponse.ok) {
            console.error(
              "Resend API failed for OPD Cashfree verification:",
              await emailResponse.text()
            );
          } else {
            console.log(`OPD order email sent to ${customerEmail}`);
          }
        } catch (emailErr) {
          console.error("Failed to send OPD Cashfree email:", emailErr);
        }
      }

      return NextResponse.json({
        success: true,
        verified: true,
        mock: false,
        amountPaid: expectedAmount,
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
      });
    }

    if (verifiedProduct === "medical") {
      const expectedAmount = 149;

      if (Number(data.order_amount) !== expectedAmount) {
        return NextResponse.json(
          { error: "Medical PDFs order amount verification failed" },
          { status: 400 }
        );
      }

      const customerEmail = String(
        email || data.customer_details?.customer_email || ""
      ).trim();
      const customerName =
        String(name || data.customer_details?.customer_name || "Doctor/Student").trim() ||
        "Doctor/Student";

      const downloadUrl = `${appUrl}/medical-master-pdfs/go`;
      const itemProductName = "31 Medical Master PDFs Bundle";

      if (resendApiKey && resendApiKey !== "your_resend_key_here" && customerEmail) {
        try {
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
              subject: `${itemProductName}: Your download link is ready! 🩺📚`,
              html: buildMedicalEmail({
                customerName,
                productName: itemProductName,
                orderId: order_id,
                amount: expectedAmount,
                downloadUrl,
                supportEmail: "support@nokrimitra.in",
              }),
              text: buildMedicalEmailText({
                customerName,
                productName: itemProductName,
                orderId: order_id,
                amount: expectedAmount,
                downloadUrl,
                supportEmail: "support@nokrimitra.in",
              }),
            }),
          });

          if (!emailResponse.ok) {
            console.error(
              "Resend API failed for Medical PDFs Cashfree verification:",
              await emailResponse.text()
            );
          } else {
            console.log(`Medical PDFs order email sent to ${customerEmail}`);
          }
        } catch (emailErr) {
          console.error("Failed to send Medical PDFs Cashfree email:", emailErr);
        }
      }

      return NextResponse.json({
        success: true,
        verified: true,
        mock: false,
        amountPaid: expectedAmount,
        downloadPath: "/medical-master-pdfs/go",
      });
    }

    if (verifiedProduct === "norcet") {
      const expectedAmount = 149;

      if (Number(data.order_amount) !== expectedAmount) {
        return NextResponse.json(
          { error: "NORCET order amount verification failed" },
          { status: 400 }
        );
      }

      const customerEmail = String(
        email || data.customer_details?.customer_email || ""
      ).trim();
      const customerName =
        String(name || data.customer_details?.customer_name || "Candidate").trim() ||
        "Candidate";

      const downloadUrl = `${appUrl}/norcet-notes/go`;
      const itemProductName = "NORCET 11 Notes (700+ Pages PDF)";

      if (resendApiKey && resendApiKey !== "your_resend_key_here" && customerEmail) {
        try {
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
              subject: `${itemProductName}: Your download link is ready! 📚🎓`,
              html: buildNorcetEmail({
                customerName,
                productName: itemProductName,
                orderId: order_id,
                amount: expectedAmount,
                downloadUrl,
              }),
              text: buildNorcetEmailText({
                customerName,
                productName: itemProductName,
                orderId: order_id,
                amount: expectedAmount,
                downloadUrl,
              }),
            }),
          });
          if (!emailResponse.ok) {
            console.error(
              "Resend API failed for NORCET Cashfree verification:",
              await emailResponse.text()
            );
          } else {
            console.log(`NORCET order email sent to ${customerEmail}`);
          }
        } catch (emailErr) {
          console.error("Failed to send NORCET Cashfree email:", emailErr);
        }
      }

      return NextResponse.json({
        success: true,
        verified: true,
        mock: false,
        amountPaid: expectedAmount,
        downloadPath: "/norcet-notes/go",
      });
    }

    if (verifiedProduct === "xray") {
      const verifiedAddon = String(tags.addons || "")
        .split(",")
        .map((id) => id.trim())
        .includes(XRAY_ADDON_ID);
      const expectedAmount = XRAY_PRICE + (verifiedAddon ? XRAY_ADDON_PRICE : 0);

      if (Number(data.order_amount) !== expectedAmount) {
        return NextResponse.json(
          { error: "X-Ray order amount verification failed" },
          { status: 400 }
        );
      }

      const customerEmail = String(
        email || data.customer_details?.customer_email || ""
      ).trim();
      const customerName =
        String(name || data.customer_details?.customer_name || "there").trim() ||
        "there";

      const token = createDownloadToken("xray", order_id);
      const addonToken = verifiedAddon
        ? createDownloadToken("xray-lab-test-master-guide", order_id)
        : null;
      const downloadUrl = `${appUrl}/xray-diagnosis/go?t=${token}`;
      const addonUrl = `${appUrl}/xray-diagnosis/go?item=${XRAY_ADDON_ID}${
        addonToken ? `&t=${addonToken}` : ""
      }`;
      const downloads = [
        { label: "DOWNLOAD X-RAY DIAGNOSIS GUIDE", url: downloadUrl },
        ...(addonToken
          ? [{ label: XRAY_ADDON_NAME, url: addonUrl }]
          : []),
      ];

      if (resendApiKey && resendApiKey !== "your_resend_key_here" && customerEmail) {
        try {
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
              subject: `${XRAY_PRODUCT_NAME}: Your download link is ready! 🩻`,
              html: buildXrayEmail({
                customerName,
                productName: verifiedAddon
                  ? `${XRAY_PRODUCT_NAME} + ${XRAY_ADDON_NAME}`
                  : XRAY_PRODUCT_NAME,
                orderId: order_id,
                amount: expectedAmount,
                downloadUrl,
                downloads,
              }),
              text: buildXrayEmailText({
                customerName,
                productName: verifiedAddon
                  ? `${XRAY_PRODUCT_NAME} + ${XRAY_ADDON_NAME}`
                  : XRAY_PRODUCT_NAME,
                orderId: order_id,
                amount: expectedAmount,
                downloadUrl,
                downloads,
              }),
            }),
          });
          if (!emailResponse.ok) {
            console.error(
              "Resend API failed for X-Ray Cashfree verification:",
              await emailResponse.text()
            );
          }
        } catch (emailErr) {
          console.error("Failed to send X-Ray Cashfree email:", emailErr);
        }
      }

      return NextResponse.json({
        success: true,
        verified: true,
        mock: false,
        amountPaid: expectedAmount,
        downloadPath: `/xray-diagnosis/go?t=${token}`,
        downloads: [
          {
            label: "X-Ray Diagnosis Guide",
            path: `/xray-diagnosis/go?t=${token}`,
          },
          ...(addonToken
            ? [
                {
                  label: XRAY_ADDON_NAME,
                  path: `/xray-diagnosis/go?item=${XRAY_ADDON_ID}&t=${addonToken}`,
                },
              ]
            : []),
        ],
      });
    }

    // Default: GSRTC MCQ course fulfilment
    const downloadUrl = `${appUrl}/gsrtc-mcq-course/go`;
    const customerEmail = String(
      email || data.customer_details?.customer_email || ""
    ).trim();
    const customerName = String(
      name || data.customer_details?.customer_name || "વિદ્યાર્થી"
    ).trim();
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
