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
  const productName = sp.get("productName") || "GSRTC કંડક્ટર MCQ પેકેજ";
  const amountPaid = sp.get("amountPaid") || "99";
  const email = sp.get("email") || "";
  const name = sp.get("name") || "";

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
            product: "mcq",
            productName,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "વેરિફિકેશન નિષ્ફળ રહ્યું.");
        setLoading(false);
        track();
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "ચુકવણી ચકાસવામાં ભૂલ આવી."
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
        <p>પેમેન્ટ વેરિફાય થઈ રહ્યું છે…</p>
        <p style={{ fontSize: 13, color: "#7a8a7e" }}>
          કૃપા કરીને આ પેજ બંધ કે રીફ્રેશ કરશો નહીં.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {error ? (
          <>
            <div className={styles.check} style={{ background: "#c0392b" }}>
              !
            </div>
            <h1 className={styles.title} style={{ color: "#c0392b" }}>
              વેરિફિકેશન નિષ્ફળ
            </h1>
            <p className={styles.sub}>{error}</p>
            <p className={styles.note}>
              જો પૈસા કપાઈ ગયા હોય તો ચિંતા કરશો નહીં. તમારો ઓર્ડર આઈડી (
              <b>{orderId}</b>) WhatsApp પર મોકલો, અમે તરત મદદ કરીશું.
            </p>
            <a
              className={styles.downloadBtn}
              href={`https://wa.me/919104826422?text=${encodeURIComponent(
                `નમસ્તે, મારું GSRTC MCQ પેકેજ પેમેન્ટ વેરિફિકેશન નિષ્ફળ ગયું છે. ઓર્ડર આઈડી: ${orderId}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp સપોર્ટ
            </a>
          </>
        ) : (
          <>
            <div className={styles.check} aria-hidden="true">
              ✓
            </div>
            <h1 className={styles.title}>
              આભાર{name ? `, ${name}` : ""}! પેમેન્ટ સફળ રહ્યું
            </h1>
            <p className={styles.sub}>
              તમારું <strong>{productName}</strong> ડાઉનલોડ કરવા માટે તૈયાર છે.
            </p>

            <a
              className={styles.downloadBtn}
              href="/gsrtc-mcq-course/go"
              target="_blank"
              rel="noopener noreferrer"
            >
              ⬇ હમણાં જ ડાઉનલોડ કરો
            </a>

            {email ? (
              <p className={styles.emailNote}>
                📩 ડાઉનલોડ લિંક તમારા ઈમેલ <strong>{email}</strong> પર પણ મોકલી
                દેવામાં આવી છે.
              </p>
            ) : null}

            <div className={styles.details}>
              <div className={styles.row}>
                <span>ઓર્ડર આઈડી</span>
                <span className={styles.val}>{orderId}</span>
              </div>
              {paymentId ? (
                <div className={styles.row}>
                  <span>પેમેન્ટ આઈડી</span>
                  <span className={styles.val}>{paymentId}</span>
                </div>
              ) : null}
              <div className={styles.row}>
                <span>પ્રોડક્ટ</span>
                <span className={styles.val}>{productName}</span>
              </div>
              <div className={styles.row}>
                <span>ચૂકવેલ રકમ</span>
                <span className={styles.val} style={{ color: "#0b6b3a" }}>
                  ₹{amountPaid}/-
                </span>
              </div>
            </div>

            <p className={styles.note}>
              સૂચના: જો ઈમેલ ન દેખાય તો Spam કે Promotions ફોલ્ડર ચેક કરો.
            </p>

            <a
              className={styles.waBtn}
              href={`https://wa.me/919104826422?text=${encodeURIComponent(
                "નમસ્તે, મને GSRTC કંડક્ટર MCQ પેકેજ ડાઉનલોડમાં મદદ જોઈએ છે."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp સપોર્ટ
            </a>

            <a href="/gsrtc-mcq-course" className={styles.back}>
              મુખ્ય પૃષ્ઠ પર જાઓ
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function McqThankYou() {
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
