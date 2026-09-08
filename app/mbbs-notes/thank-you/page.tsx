"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Download, AlertTriangle, ArrowRight, MessageCircle } from "lucide-react";
import styles from "./thank-you.module.css";

const PRODUCT_NAME = "Complete MBBS Notes (All 21 Subjects)";

function ThankYouContent() {
  const sp = useSearchParams();
  const verifiedRef = useRef(false);

  const paymentId = sp.get("razorpay_payment_id") || "";
  const orderId = sp.get("razorpay_order_id") || sp.get("orderId") || "N/A";
  const signature = sp.get("razorpay_signature") || "";
  const name = sp.get("name") || "Doctor";
  const email = sp.get("email") || "";
  const initialAmount = sp.get("amountPaid") || "199";
  const isMock = sp.get("mock") === "true";

  const [status, setStatus] = useState<"checking" | "ready" | "failed">(
    orderId !== "N/A" || paymentId ? "checking" : "ready"
  );
  const [downloadUrl, setDownloadUrl] = useState("/mbbs-notes/go");
  const [amountPaid, setAmountPaid] = useState(initialAmount);

  useEffect(() => {
    if (verifiedRef.current) return;
    verifiedRef.current = true;

    const cacheKey = orderId && orderId !== "N/A" ? `mbbs_order_${orderId}` : "";

    // 1. Avoid re-firing or re-emailing on page reload
    if (cacheKey) {
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const saved = JSON.parse(cached);
          if (saved.downloadUrl) setDownloadUrl(saved.downloadUrl);
          if (saved.amountPaid) setAmountPaid(saved.amountPaid);
          setStatus("ready");
          return;
        }
      } catch {
        // Ignore storage errors
      }
    }

    // 2. Mock mode handling
    if (isMock) {
      setStatus("ready");
      const w = window as unknown as {
        fbq?: (...a: unknown[]) => void;
        gtag?: (...a: unknown[]) => void;
      };
      w.fbq?.("track", "Purchase", { value: Number(initialAmount), currency: "INR" });
      w.gtag?.("event", "purchase", {
        transaction_id: orderId,
        value: Number(initialAmount),
        currency: "INR",
        items: [{ item_name: PRODUCT_NAME, price: Number(initialAmount) }],
      });
      return;
    }

    // 3. Real Verification & Automatic Email Trigger
    const verifyOrder = async () => {
      try {
        const res = await fetch("/api/checkout/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: paymentId,
            razorpay_order_id: orderId,
            razorpay_signature: signature,
            name,
            email,
            amountPaid: initialAmount,
            product: "mbbs",
            productName: PRODUCT_NAME,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.verified) {
          // If signature check failed but customer was charged, show helpful screen
          setStatus("failed");
          return;
        }

        const resolvedDownload = data.downloadPath || "/mbbs-notes/go";
        const finalAmount = String(data.amountPaid || initialAmount);

        setDownloadUrl(resolvedDownload);
        setAmountPaid(finalAmount);
        setStatus("ready");

        if (cacheKey) {
          try {
            sessionStorage.setItem(
              cacheKey,
              JSON.stringify({
                downloadUrl: resolvedDownload,
                amountPaid: finalAmount,
              })
            );
          } catch {
            // Storage failure non-fatal
          }
        }

        // Fire Purchase Conversion Events
        if (typeof window !== "undefined") {
          const w = window as unknown as {
            dataLayer?: unknown[];
            gtag?: (...args: unknown[]) => void;
            fbq?: (...args: unknown[]) => void;
          };

          // 1. Google Analytics Purchase
          w.dataLayer = w.dataLayer || [];
          if (typeof w.gtag !== "function") {
            w.gtag = function () {
              w.dataLayer?.push(arguments);
            };
          }
          w.gtag("event", "purchase", {
            transaction_id: orderId || paymentId || `ord_${Date.now()}`,
            value: Number(finalAmount),
            currency: "INR",
            tax: 0,
            shipping: 0,
            items: [
              {
                item_id: "mbbs-notes-21-subjects",
                item_name: PRODUCT_NAME,
                price: Number(finalAmount),
                quantity: 1,
              },
            ],
          });

          // 2. Facebook Pixel Purchase
          const fireFb = (attempts = 0) => {
            if (typeof w.fbq === "function") {
              w.fbq("track", "Purchase", {
                value: Number(finalAmount),
                currency: "INR",
              });
            } else if (attempts < 10) {
              setTimeout(() => fireFb(attempts + 1), 300);
            }
          };
          fireFb();
        }
      } catch {
        // Network fallback: still let user access the link if they arrived from checkout
        setStatus("ready");
      }
    };

    if (paymentId && signature) {
      verifyOrder();
    } else {
      setStatus("ready");
    }
  }, [orderId, paymentId, signature, name, email, initialAmount, isMock]);

  if (status === "checking") {
    return (
      <div className={styles.card} style={{ textAlign: "center", padding: "48px 24px" }}>
        <div style={{ fontSize: "28px", marginBottom: "14px" }}>⏳</div>
        <h2 style={{ fontSize: "20px", color: "#58111a", marginBottom: "8px" }}>
          Confirming Your Order...
        </h2>
        <p style={{ fontSize: "14px", color: "#64748b" }}>
          Please wait while we verify your payment and prepare your PDF access link.
        </p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className={styles.card} style={{ textAlign: "center", padding: "36px 20px" }}>
        <div style={{ color: "#dc2626", marginBottom: "14px" }}>
          <AlertTriangle size={44} style={{ margin: "0 auto" }} />
        </div>
        <h2 style={{ fontSize: "20px", color: "#991b1b", marginBottom: "8px" }}>
          Payment Verification Needs Attention
        </h2>
        <p style={{ fontSize: "14px", color: "#52606d", lineHeight: 1.55, marginBottom: "20px" }}>
          If money was debited from your bank/UPI, do not worry. Send your Order ID{" "}
          <strong>{orderId}</strong> to our WhatsApp support team and we will activate your access
          instantly.
        </p>
        <a
          href={`https://wa.me/919104826422?text=Hi%20Support,%20I%20paid%20for%20MBBS%20Notes.%20My%20Order%20ID%20is%20${encodeURIComponent(
            orderId
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#25D366",
            color: "#fff",
            fontWeight: 700,
            padding: "12px 24px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "15px",
          }}
        >
          <MessageCircle size={18} />
          <span>Connect on WhatsApp Support</span>
        </a>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.successIcon}>
        <CheckCircle2 size={36} />
      </div>

      <h1 className={styles.title}>Payment Successful!</h1>
      <p className={styles.subTitle}>
        Thank you, <strong>{name}</strong>! Your order has been processed. Access to all 21 MBBS subjects (3,826 pages) is now ready.
      </p>

      <div className={styles.orderBox}>
        <div className={styles.orderRow}>
          <span className={styles.orderLabel}>Order ID:</span>
          <span className={styles.orderVal}>{orderId}</span>
        </div>
        <div className={styles.orderRow}>
          <span className={styles.orderLabel}>Product:</span>
          <span className={styles.orderVal}>{PRODUCT_NAME}</span>
        </div>
        <div className={styles.orderRow}>
          <span className={styles.orderLabel}>Amount Paid:</span>
          <span className={styles.orderVal} style={{ color: "#0b6b3a" }}>
            ₹{amountPaid}
          </span>
        </div>
        {email && (
          <div className={styles.orderRow}>
            <span className={styles.orderLabel}>Delivered To:</span>
            <span className={styles.orderVal}>{email}</span>
          </div>
        )}
      </div>

      <div className={styles.downloadSection}>
        <h2 className={styles.downloadTitle}>📥 Download Your Study Collection</h2>
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.downloadBtn}
        >
          <Download size={18} />
          <span>Download All 21 Subjects (Google Drive)</span>
        </a>
        <p className={styles.hint}>
          A copy of the download link has also been sent to your email <strong>{email}</strong>.
        </p>
      </div>

      <p className={styles.footerNote}>
        Need any assistance? Email us at{" "}
        <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a> or message us on WhatsApp at{" "}
        <a
          href="https://wa.me/919104826422?text=Hi%20NokriMitra%20Support,%20I%20just%20placed%20my%20MBBS%20Notes%20order%20and%20need%20assistance"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0b6b3a", fontWeight: 700 }}
        >
          +91 91048 26422
        </a>
      </p>

      <div style={{ marginTop: "20px" }}>
        <Link
          href="/mbbs-notes"
          style={{
            fontSize: "13px",
            color: "#64748b",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          Return to MBBS Notes Overview <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

export default function MbbsThankYouPage() {
  return (
    <div className={styles.page}>
      <Suspense fallback={<div className={styles.card}>Loading order details...</div>}>
        <ThankYouContent />
      </Suspense>
    </div>
  );
}
