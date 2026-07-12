"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./ty.module.css";

function Content() {
  const sp = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const done = useRef(false);

  const orderId = sp.get("orderId") || sp.get("razorpay_order_id") || "N/A";
  const paymentId = sp.get("razorpay_payment_id") || "";
  const productName =
    sp.get("productName") || "10k Vastu Floor Plan Editable Bundle";
  const amountPaid = sp.get("amountPaid") || "149";
  const email = sp.get("email") || "";
  const name = sp.get("name") || "";
  const addons = (sp.get("addons") || "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  const ADDON_LABELS: Record<string, string> = {
    vedic: "Vedic Remedies Mastery",
    "vastu-guide": "Practical Vastu Shastra Guide",
  };

  const downloads = [
    { label: "Main Bundle (10k Vastu Floor Plans)", url: "/vastu-plan-checkout/go" },
    ...addons
      .filter((id) => ADDON_LABELS[id])
      .map((id) => ({
        label: ADDON_LABELS[id],
        url: `/vastu-plan-checkout/go?item=${id}`,
      })),
  ];

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    const isMock =
      sp.get("mock") === "true" || orderId.startsWith("order_mock_");
    const signature = sp.get("razorpay_signature") || "";

    const track = () => {
      const w = window as unknown as {
        fbq?: (...a: unknown[]) => void;
        gtag?: (...a: unknown[]) => void;
      };
      if (typeof window !== "undefined" && w.fbq) {
        w.fbq("track", "Purchase", {
          value: Number(amountPaid),
          currency: "INR",
          content_name: productName,
        });
      }
      if (typeof window !== "undefined" && w.gtag) {
        w.gtag("event", "purchase", {
          transaction_id: orderId,
          value: Number(amountPaid),
          currency: "INR",
          items: [{ item_name: productName }],
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
            name,
            email,
            amountPaid,
            product: "vastu",
            productName,
            addons: addons.join(","),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Verification failed.");
        setLoading(false);
        track();
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Payment verification failed."
        );
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Verifying your payment…</p>
        <p style={{ fontSize: 13, color: "#7b869c" }}>
          Please do not close or refresh this page.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.hero}>
          <span
            className={styles.confirmPill}
            style={{ background: "rgba(197,48,48,0.18)", color: "#ff8f8f" }}
          >
            Payment Verification Failed
          </span>
          <h1 className={styles.title}>Something Went Wrong</h1>
          <p className={styles.sub}>{error}</p>
        </div>
        <div className={styles.card}>
          <p className={styles.support}>
            If money was deducted, don&apos;t worry. Send us your Order ID (
            <strong>{orderId}</strong>) and we&apos;ll sort it out right away.
          </p>
          <div className={styles.downloads}>
            <a
              className={`${styles.downloadBtn} ${styles.primaryBtn}`}
              href={`https://wa.me/919104826422?text=Vastu%20bundle%20payment%20issue.%20Order%20ID:%20${orderId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.confirmPill}>
          <span className={styles.pillTick} aria-hidden="true">
            ✓
          </span>
          Submission Confirmed Successfully
        </span>
        <h1 className={styles.title}>
          Thank You For Your Purchase! <span aria-hidden="true">🎉</span>
        </h1>
        <p className={styles.sub}>
          Your Vastu-Astro House Plan Bundle is Delivered.
          <br />
          We&apos;ve sent it <strong>directly to your email</strong>, but you
          can grab it right now below.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.check} aria-hidden="true">
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p className={styles.support}>
          Need help or have questions? For instant customer support, feel free
          to reach out to our team at{" "}
          <a href="mailto:goexam777@gmail.com">goexam777@gmail.com</a>. We are
          always here to help you!
        </p>

        <div className={styles.features}>
          <span>
            <span className={styles.fIcon}>📅</span> Response within 24 hours
          </span>
          <span>
            <span className={styles.fIcon}>✉️</span> Check your inbox for details
          </span>
          <span>
            <span className={styles.fIcon}>🛡️</span> Your data is 100% secure
          </span>
        </div>

        <div className={styles.downloads}>
          {downloads.map((d, i) => (
            <a
              key={d.url}
              className={`${styles.downloadBtn} ${styles.primaryBtn}`}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              👉 {i === 0 ? "Download Your Bundle Now" : `Download ${d.label}`}
            </a>
          ))}
        </div>

        {email ? (
          <p className={styles.emailNote}>
            📩 Sent to <strong>{email}</strong> · Order ID: {orderId} · Paid INR{" "}
            {amountPaid}.00
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function VastuThankYou() {
  return (
    <Suspense
      fallback={
        <div className={styles.loading}>
          <div className={styles.spinner} />
        </div>
      }
    >
      <Content />
    </Suspense>
  );
}
