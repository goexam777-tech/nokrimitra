"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./ty.module.css";

type PsyDownload = { label: string; path: string };

function Content() {
  const sp = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloads, setDownloads] = useState<PsyDownload[]>([]);
  const done = useRef(false);

  const orderId =
    sp.get("orderId") || sp.get("razorpay_order_id") || "N/A";
  const paymentId = sp.get("razorpay_payment_id") || "";
  const productName = sp.get("productName") || "Psychology Notes";
  const amountPaid = sp.get("amountPaid") || "149";
  const email = sp.get("email") || "";
  const addons = sp.get("addons") || "";

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    const isMock = sp.get("mock") === "true" || orderId.startsWith("order_mock_");
    const signature = sp.get("razorpay_signature") || "";
    const cacheKey = orderId && orderId !== "N/A" ? `psy_order_${orderId}` : "";

    const track = (value: number, items: PsyDownload[]) => {
      const w = window as unknown as {
        fbq?: (...a: unknown[]) => void;
        gtag?: (...a: unknown[]) => void;
      };
      w.fbq?.("track", "Purchase", { value, currency: "INR" });
      w.gtag?.("event", "purchase", {
        transaction_id: orderId,
        value,
        currency: "INR",
        items: items.length
          ? items.map((item) => ({ item_name: item.label }))
          : [{ item_name: productName, price: value }],
      });
    };

    // A page refresh keeps the same query string. Without this guard the verify
    // call would run again, re-sending the delivery email and double-counting
    // the Purchase conversion. So we remember a verified order for this browser
    // and simply restore it instead of verifying a second time.
    if (cacheKey) {
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const saved = JSON.parse(cached) as { downloads?: PsyDownload[] };
          setDownloads(saved.downloads?.length ? saved.downloads : []);
          setLoading(false);
          return;
        }
      } catch {
        // Storage unavailable/blocked — fall through and verify normally.
      }
    }

    const remember = (dl: PsyDownload[]) => {
      if (!cacheKey) return;
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ downloads: dl }));
      } catch {
        // Storage is optional; verification already succeeded.
      }
    };

    if (isMock) {
      setDownloads([]);
      setLoading(false);
      track(Number(amountPaid), []);
      return;
    }
    if (!paymentId || !signature) {
      setError("Payment verification details are missing. Please use the link from your completed checkout or contact support.");
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
        // Only server-issued, signed links are shown. A token-less link would
        // now be rejected by the download route.
        const dl = Array.isArray(data.downloads)
          ? (data.downloads as PsyDownload[])
          : [];
        setDownloads(dl);
        setLoading(false);
        remember(dl);
        if (!data.alreadyFulfilled) {
          track(Number(data.amountPaid ?? amountPaid), dl);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Payment verification failed.");
        setLoading(false);
      }
    })();
  }, [sp, orderId, paymentId, amountPaid, email, productName, addons]);

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
                If money was deducted, please don&apos;t worry. Email us your
                Order ID (<b>{orderId}</b>) and we&apos;ll sort it out quickly.
              </p>
              <a
                className={styles.support}
                href={`mailto:goexam777@gmail.com?subject=Psychology%20Notes%20payment%20verification%20failed&body=Order%20ID:%20${orderId}`}
              >
                ✉️ Email Support
              </a>
            </>
          ) : (
            <>
              <div className={styles.tick}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h1 className={styles.title}>Payment Successful!</h1>
              <p className={styles.subtitle}>
                {downloads.length > 1
                  ? "Both of your downloads are ready below."
                  : "Your Psychology Notes are ready to download."}
              </p>

              {downloads.length ? (
                <div className={styles.downloadList}>
                  {downloads.map((item) => (
                    <a
                      key={item.path}
                      className={styles.downloadBtn}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ⬇ Download {downloads.length > 1 ? item.label : "Now"}
                    </a>
                  ))}
                </div>
              ) : (
                <p className={styles.emailNote}>
                  Your download link has been emailed to you. If you don&apos;t
                  see it, email us your Order ID and we&apos;ll send it again.
                </p>
              )}

              {email && (
                <p className={styles.emailNote}>
                  📩 We&apos;ve also emailed the download link to <strong>{email}</strong>.
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
                Can&apos;t find the email? Please check your Spam or Promotions
                folder. Still need help? We&apos;re here for you.
              </p>

              <a
                className={styles.support}
                href="mailto:goexam777@gmail.com?subject=Help%20with%20my%20Psychology%20Notes%20download"
              >
                ✉️ Email Support
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
