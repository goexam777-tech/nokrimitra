"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./ty.module.css";

function Content() {
  const sp = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const done = useRef(false);

  const orderId =
    sp.get("orderId") || sp.get("razorpay_order_id") || "N/A";
  const paymentId = sp.get("razorpay_payment_id") || "";
  const productName = sp.get("productName") || "Psychology Notes";
  const amountPaid = sp.get("amountPaid") || "149";
  const email = sp.get("email") || "";

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    const isMock = sp.get("mock") === "true" || orderId.startsWith("order_mock_");
    const signature = sp.get("razorpay_signature") || "";

    const track = () => {
      if (typeof window !== "undefined" && (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq) {
        (window as unknown as { fbq: (...a: unknown[]) => void }).fbq("track", "Purchase", {
          value: Number(amountPaid),
          currency: "INR",
        });
      }
    };

    if (isMock) {
      setLoading(false);
      track();
      return;
    }
    if (!paymentId || !signature) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/checkout/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: paymentId,
            razorpay_order_id: orderId,
            razorpay_signature: signature,
            name: sp.get("name") || "",
            email,
            amountPaid,
            product: "psychology",
            productName,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Verification failed.");
        setLoading(false);
        track();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Payment verification failed.");
        setLoading(false);
      }
    })();
  }, [sp, orderId, paymentId, amountPaid, email, productName]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Verifying your payment…</p>
        <p style={{ fontSize: 13, color: "#829ab1" }}>Please do not close or refresh this page.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.bar}>
        <h1>Psychology Notes</h1>
      </div>

      <div className={styles.main}>
        <div className={styles.card}>
          {error ? (
            <>
              <div className={styles.tick} style={{ background: "rgba(197,48,48,0.1)", color: "#c53030" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              </div>
              <h1 className={styles.title} style={{ color: "#c53030" }}>Verification Failed</h1>
              <p className={styles.subtitle}>{error}</p>
              <p className={styles.emailNote}>
                If money was deducted, don&apos;t worry — send us your Order ID
                (<b>{orderId}</b>) on WhatsApp and we&apos;ll sort it out.
              </p>
              <a
                className={styles.wa}
                href={`https://wa.me/919104826422?text=Psychology%20Notes%20payment%20verification%20failed.%20Order%20ID:%20${orderId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp Support
              </a>
            </>
          ) : (
            <>
              <div className={styles.tick}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h1 className={styles.title}>Payment Successful!</h1>
              <p className={styles.subtitle}>Thank you for your purchase</p>

              <a
                className={styles.downloadBtn}
                href="/psychology-notes/go"
                target="_blank"
                rel="noopener noreferrer"
              >
                ⬇ Download Now
              </a>

              {email && (
                <p className={styles.emailNote}>
                  📩 The download link has also been sent to your email <strong>{email}</strong>.
                </p>
              )}

              <div className={styles.details}>
                <div className={styles.row}>
                  <span className={styles.label}>Order ID</span>
                  <span className={styles.val}>{orderId}</span>
                </div>
                {paymentId && (
                  <div className={styles.row}>
                    <span className={styles.label}>Payment ID</span>
                    <span className={styles.val}>{paymentId}</span>
                  </div>
                )}
                <div className={styles.row}>
                  <span className={styles.label}>Product</span>
                  <span className={styles.val}>{productName}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Amount Paid</span>
                  <span className={styles.val} style={{ color: "#16a34a" }}>₹{amountPaid}/-</span>
                </div>
              </div>

              <p className={styles.emailNote}>
                Tip: If you don&apos;t see the email, check your Spam or Promotions folder.
              </p>

              <a
                className={styles.wa}
                href="https://wa.me/919104826422?text=I%20need%20help%20with%20my%20Psychology%20Notes%20download."
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp Support
              </a>
            </>
          )}
        </div>
      </div>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} NokriMitra</span>
        <div style={{ marginTop: 6 }}>
          <a href="/psychology-notes/privacy-policy">Privacy</a>
          <a href="/psychology-notes/refund-policy">Refund</a>
          <a href="/psychology-notes/terms">Terms</a>
        </div>
      </footer>
    </div>
  );
}

export default function PsyThankYou() {
  return (
    <Suspense fallback={<div className={styles.loading}><div className={styles.spinner} /></div>}>
      <Content />
    </Suspense>
  );
}
