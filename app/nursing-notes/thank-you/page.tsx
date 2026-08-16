"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { CheckCircle2, Download, Mail, ArrowLeft, RefreshCw } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import styles from "./thank-you.module.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-nursing",
});

const PRODUCT_NAME = "ALL-In-One Nursing Notes (600+ Pages PDF)";

function ThankYouContent() {
  const params = useSearchParams();
  const verified = useRef(false);

  const [status, setStatus] = useState<"checking" | "ready" | "failed">("checking");
  const [downloadUrl, setDownloadUrl] = useState("/nursing-notes/go");

  const name = params.get("name") || "";
  const email = params.get("email") || "";
  const orderId = params.get("razorpay_order_id") || params.get("orderId") || "";
  const paymentId = params.get("razorpay_payment_id") || "";
  const signature = params.get("razorpay_signature") || "";
  const amountPaid = params.get("amountPaid") || "199";

  useEffect(() => {
    if (verified.current) return;
    verified.current = true;

    const cacheKey = orderId ? `nm_nursing_order_${orderId}` : "";

    if (cacheKey) {
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const saved = JSON.parse(cached) as { downloadUrl?: string };
          if (saved.downloadUrl) setDownloadUrl(saved.downloadUrl);
          setStatus("ready");
          return;
        }
      } catch {
        // Storage unavailable
      }
    }

    const runVerify = async () => {
      try {
        const res = await fetch("/api/checkout/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: paymentId || `pay_mock_${orderId || Date.now()}`,
            razorpay_order_id: orderId || `order_mock_${Date.now()}`,
            razorpay_signature: signature || "mock_signature",
            name,
            email,
            amountPaid,
            product: "nursing",
            productName: PRODUCT_NAME,
          }),
        });
        const data = await res.json();

        if (!res.ok || !data.verified) {
          setStatus("failed");
          return;
        }

        const url = data.downloadPath || data.downloadUrl || "/nursing-notes/go";
        setDownloadUrl(url);
        setStatus("ready");

        if (cacheKey) {
          try {
            sessionStorage.setItem(cacheKey, JSON.stringify({ downloadUrl: url }));
          } catch {
            // Ignore
          }
        }

        // Fire analytics once upon verified purchase
        const w = window as unknown as {
          fbq?: (...a: unknown[]) => void;
          gtag?: (...a: unknown[]) => void;
        };
        w.fbq?.(
          "track",
          "Purchase",
          {
            value: Number(amountPaid),
            currency: "INR",
            content_name: PRODUCT_NAME,
          },
          { eventID: orderId }
        );
        w.gtag?.("event", "purchase", {
          transaction_id: orderId,
          value: Number(amountPaid),
          currency: "INR",
          items: [{ item_name: PRODUCT_NAME, price: Number(amountPaid) }],
        });
      } catch (err) {
        console.error("Payment verification failed:", err);
        setStatus("failed");
      }
    };

    runVerify();
  }, [amountPaid, email, name, orderId, paymentId, signature]);

  return (
    <div className={`${styles.thankYouContainer} ${plusJakarta.variable}`}>
      <div className={styles.thankYouCard}>
        {/* Success Icon */}
        <div className={styles.iconCircle}>
          <CheckCircle2 size={56} color="#16a34a" />
        </div>

        <span className={styles.successBadge}>Payment Successful 🎉</span>
        <h1 className={styles.thankYouTitle}>
          Thank You For Your Purchase{name ? `, ${name}` : ""}!
        </h1>
        <p className={styles.subTitle}>
          Your order has been completed successfully. You can download your 600+ pages Nursing Notes PDF below.
        </p>

        {/* Order Details Receipt Box */}
        <div className={styles.receiptBox}>
          <div className={styles.receiptRow}>
            <span>Product Name:</span>
            <strong>ALL-In-One Nursing Notes (PDF)</strong>
          </div>
          <div className={styles.receiptRow}>
            <span>Amount Paid:</span>
            <strong className={styles.greenText}>₹{amountPaid}</strong>
          </div>
          {orderId && (
            <div className={styles.receiptRow}>
              <span>Order ID:</span>
              <code>{orderId}</code>
            </div>
          )}
          {email && (
            <div className={styles.receiptRow}>
              <span>Delivered To:</span>
              <strong>{email}</strong>
            </div>
          )}
        </div>

        {/* Download Button Section */}
        <div className={styles.downloadWrap}>
          {status === "checking" ? (
            <div style={{ padding: "16px", color: "#64748b", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
              <RefreshCw size={18} className={styles.spinIcon} />
              <span>Verifying payment &amp; generating secure download link...</span>
            </div>
          ) : status === "failed" ? (
            <div style={{ padding: "14px", background: "#fef2f2", color: "#991b1b", borderRadius: "10px", fontWeight: 600 }}>
              Payment verification pending. If money was deducted, please check your email for the download link or contact support.
            </div>
          ) : (
            <>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.downloadBtn}
              >
                <Download size={20} />
                <span>DOWNLOAD NURSING NOTES PDF</span>
              </a>
              <p className={styles.downloadHint}>
                (Click above to open &amp; download your file via Google Drive)
              </p>
            </>
          )}
        </div>

        {/* Info & Support Notice */}
        <div className={styles.noticeBox}>
          <div className={styles.noticeHeader}>
            <Mail size={18} color="#15803d" />
            <strong>Email Backup Notice</strong>
          </div>
          <p className={styles.noticeText}>
            A backup download link has also been sent to <strong>{email || "your email address"}</strong>. If you don't see it in your inbox within 5-10 minutes, please check your <strong>Spam or Promotions</strong> folder.
          </p>
        </div>

        {/* Customer Support */}
        <div className={styles.supportBox}>
          <p>
            Have any questions or need download assistance? Contact support at:
          </p>
          <a href="mailto:support@nokrimitra.in" className={styles.supportEmail}>
            📧 support@nokrimitra.in
          </a>
        </div>

        {/* Return Home Link */}
        <div className={styles.homeLinkWrap}>
          <a href="/nursing-notes" className={styles.homeLink}>
            <ArrowLeft size={16} /> Return to Nursing Notes Page
          </a>
        </div>
      </div>
    </div>
  );
}

export default function NursingNotesThankYouPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: "50px" }}>Loading receipt...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
