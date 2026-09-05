"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import {
  CheckCircle2,
  Download,
  Gift,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import styles from "./thank-you.module.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
  variable: "--font-title",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-body",
});

const PRODUCT_NAME = "31 Medical Master PDFs Bundle";
const PRICE = 149;
const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "2012096232739016";

function ThankYouContent() {
  const params = useSearchParams();
  const rawOrderId = params.get("order_id");
  const name = params.get("name") || "";
  const email = params.get("email") || "";
  const amountPaid = params.get("amountPaid") || String(PRICE);

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId, setOrderId] = useState(rawOrderId || "");
  const [downloadUrl, setDownloadUrl] = useState("/medical-master-pdfs/go");

  useEffect(() => {
    let cancelled = false;

    if (!rawOrderId) {
      setLoading(false);
      setVerified(false);
      setErrorMessage("No order details found. Please complete your checkout first.");
      return;
    }

    setOrderId(rawOrderId);

    const verifyOrder = async () => {
      try {
        const res = await fetch("/api/checkout/cashfree/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: rawOrderId,
            name,
            email,
            amountPaid,
            product: "medical",
            productName: PRODUCT_NAME,
          }),
        });

        const data = await res.json();

        if (cancelled) return;

        if (res.ok && data.verified === true) {
          setVerified(true);
          if (data.downloadPath) {
            setDownloadUrl(data.downloadPath);
          }

          // Fire conversion pixels ONLY after payment is strictly verified
          const w = window as unknown as {
            fbq?: (...args: unknown[]) => void;
            gtag?: (...args: unknown[]) => void;
          };

          const finalAmount = Number(data.amountPaid || amountPaid || PRICE);

          if (w.fbq) {
            w.fbq("track", "Purchase", {
              value: finalAmount,
              currency: "INR",
              content_name: PRODUCT_NAME,
              content_type: "product",
              order_id: rawOrderId,
            });
            w.fbq("trackSingle", PIXEL_ID, "Purchase", {
              value: finalAmount,
              currency: "INR",
              content_name: PRODUCT_NAME,
              content_type: "product",
              order_id: rawOrderId,
            });
          }

          if (w.gtag) {
            w.gtag("event", "purchase", {
              transaction_id: rawOrderId,
              value: finalAmount,
              currency: "INR",
              items: [
                {
                  item_name: PRODUCT_NAME,
                  price: finalAmount,
                  quantity: 1,
                },
              ],
            });
          }
        } else {
          setVerified(false);
          setErrorMessage(
            data.error || "Payment verification could not be confirmed. If amount was deducted, please contact support."
          );
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setVerified(false);
          setErrorMessage(
            err instanceof Error
              ? err.message
              : "Unable to verify payment status. Please check your connection."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    verifyOrder();

    return () => {
      cancelled = true;
    };
  }, [rawOrderId, name, email, amountPaid]);

  // 1. Loading / Verification In Progress State
  if (loading) {
    return (
      <div
        className={`${styles.container} ${montserrat.variable} ${plusJakarta.variable}`}
      >
        <div className={styles.card}>
          <div className={styles.loadingBox}>
            <div className={styles.spinner} />
            <h2 className={styles.loadingTitle}>Verifying Payment...</h2>
            <p className={styles.loadingSub}>
              Please wait while we verify your transaction status with Cashfree.
              Do not refresh or close this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Verification Failed / Payment Incomplete State
  if (!verified) {
    return (
      <div
        className={`${styles.container} ${montserrat.variable} ${plusJakarta.variable}`}
      >
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.errorIconCircle}>
              <AlertCircle size={40} className={styles.errorIcon} />
            </div>
            <h1 className={styles.title} style={{ color: "#dc2626" }}>
              Payment Not Verified
            </h1>
            <p className={styles.subtitle}>
              {errorMessage ||
                "Your payment could not be confirmed. If the payment was deducted from your account, please contact us."}
            </p>
          </div>

          <div className={styles.orderDetails}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Order ID:</span>
              <span className={styles.detailValue}>{orderId || "N/A"}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Status:</span>
              <span className={styles.detailValue} style={{ color: "#dc2626" }}>
                Unverified / Pending
              </span>
            </div>
          </div>

          <a href="/medical-master-pdfs/checkout" className={styles.retryBtn}>
            <RefreshCw size={17} />
            <span>Try Payment Again</span>
          </a>

          <div className={styles.supportBox}>
            <p style={{ margin: "0 0 4px" }}>
              <b>Need help or faced an issue?</b>
            </p>
            <p style={{ margin: 0 }}>
              Contact support at{" "}
              <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a> with your Order ID.
            </p>
          </div>

          <div className={styles.footerLink}>
            <a href="/medical-master-pdfs">&larr; Return to Home Page</a>
          </div>
        </div>
      </div>
    );
  }

  // 3. Payment Successfully Verified State
  return (
    <div
      className={`${styles.container} ${montserrat.variable} ${plusJakarta.variable}`}
    >
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconCircle}>
            <CheckCircle2 size={42} className={styles.checkIcon} />
          </div>
          <h1 className={styles.title}>Payment Successful!</h1>
          <p className={styles.subtitle}>
            Thank you {name ? <b>{name}</b> : "for your order"}! Your payment has
            been verified. Your 31 Medical Master PDFs bundle is ready to download.
          </p>
        </div>

        {/* Primary Download Box */}
        <div className={styles.downloadBox}>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mainDownloadBtn}
            id="thank-you-download-btn"
          >
            <Download size={22} />
            <span>DOWNLOAD ALL 31 PDFs NOW</span>
          </a>
          <p className={styles.instantNote}>
            ⚡ Instant Google Drive Access &bull; Lifetime Validity
          </p>
        </div>

        {/* Order Details */}
        <div className={styles.orderDetails}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Product:</span>
            <span className={styles.detailValue}>{PRODUCT_NAME}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Amount Paid:</span>
            <span className={`${styles.detailValue} ${styles.priceHighlight}`}>
              ₹{amountPaid}/-
            </span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Order ID:</span>
            <span className={styles.detailValue}>{orderId}</span>
          </div>
          {email && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Delivery Email:</span>
              <span className={styles.detailValue}>{email}</span>
            </div>
          )}
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Verification:</span>
            <span className={styles.detailValue} style={{ color: "#16a34a" }}>
              ✓ Verified via Cashfree Payments
            </span>
          </div>
        </div>

        {/* Included Bundle */}
        <div className={styles.includedBox}>
          <div className={styles.includedHeader}>
            <Gift size={16} />
            <span>What&apos;s Inside Your Download:</span>
          </div>
          <ul className={styles.includedList}>
            <li className={styles.includedItem}>
              <span className={styles.bulletDot} />
              <span>20 Core Medical PDFs (Clinical, Anatomy, Pharma, ECG, Lab)</span>
            </li>
            <li className={styles.includedItem}>
              <span className={styles.bulletDot} />
              <span>11 FREE Medical Master Bonus Books &amp; Summaries</span>
            </li>
            <li className={styles.includedItem}>
              <span className={styles.bulletDot} />
              <span>High-Yield Revision Notes &amp; Drug Dosage Guides</span>
            </li>
          </ul>
        </div>

        {/* Support Box */}
        <div className={styles.supportBox}>
          <p style={{ margin: "0 0 4px" }}>
            <b>Need any help with your download?</b>
          </p>
          <p style={{ margin: 0 }}>
            Contact our dedicated support team at{" "}
            <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a>
          </p>
        </div>

        <div className={styles.footerLink}>
          <a href="/medical-master-pdfs">&larr; Return to Home Page</a>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          Loading order details...
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
