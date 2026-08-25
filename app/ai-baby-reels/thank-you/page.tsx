"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Poppins } from "next/font/google";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Gift,
  Mail,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";

import styles from "./ty.module.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-reels-ty",
});

const PRODUCT_NAME = "2000+ AI Baby Reels Bundle";

function ThankYouInner() {
  const params = useSearchParams();
  const verified = useRef(false);

  const [status, setStatus] = useState<"checking" | "ready" | "failed">(
    "checking"
  );
  const [downloadPath, setDownloadPath] = useState("/ai-baby-reels/go");

  const name = params.get("name") || "";
  const email = params.get("email") || "";
  const amountPaid = params.get("amountPaid") || "148";
  const orderId =
    params.get("razorpay_order_id") || params.get("orderId") || "";

  useEffect(() => {
    if (verified.current) return;
    verified.current = true;

    const paymentId = params.get("razorpay_payment_id");
    const signature = params.get("razorpay_signature");
    const cacheKey = orderId ? `nm_reels_order_${orderId}` : "";

    if (cacheKey) {
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const saved = JSON.parse(cached) as { downloadPath?: string };
          if (saved.downloadPath) setDownloadPath(saved.downloadPath);
          setStatus("ready");
          return;
        }
      } catch {
        // storage unavailable
      }
    }

    const run = async () => {
      try {
        const res = await fetch("/api/checkout/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: paymentId || `pay_mock_${Date.now()}`,
            razorpay_order_id: orderId || `order_mock_${Date.now()}`,
            razorpay_signature: signature || "mock_signature",
            name,
            email,
            amountPaid,
            product: "reels",
            productName: PRODUCT_NAME,
          }),
        });
        const data = await res.json();

        if (!res.ok || !data.verified) {
          setStatus("failed");
          return;
        }

        const url = data.downloadPath || "/ai-baby-reels/go";
        setDownloadPath(url);
        setStatus("ready");

        if (cacheKey) {
          try {
            sessionStorage.setItem(
              cacheKey,
              JSON.stringify({ downloadPath: url })
            );
          } catch {
            // ignore
          }
        }

        const w = window as unknown as {
          fbq?: (...a: unknown[]) => void;
          gtag?: (...a: unknown[]) => void;
        };
        w.fbq?.(
          "track",
          "Purchase",
          { value: Number(amountPaid), currency: "INR", content_name: PRODUCT_NAME },
          { eventID: orderId }
        );
        w.gtag?.("event", "purchase", {
          transaction_id: orderId || paymentId || `ord_${Date.now()}`,
          value: Number(amountPaid),
          currency: "INR",
          items: [{ item_name: PRODUCT_NAME, price: Number(amountPaid) }],
        });
      } catch {
        setStatus("failed");
      }
    };

    run();
  }, [params, name, email, amountPaid, orderId]);

  return (
    <main className={`${styles.page} ${poppins.variable}`}>
      <div className={styles.card}>
        {status === "failed" ? (
          <>
            <span className={`${styles.badge} ${styles.badgeWarn}`}>
              <ShieldAlert size={15} /> Payment unconfirmed
            </span>
            <h1 className={styles.title}>We could not confirm this payment</h1>
            <p className={styles.lead}>
              If money was debited, your order is safe. Send us your details and
              we will share your download link right away.
            </p>
            <a
              className={styles.btn}
              href="mailto:support@nokrimitra.in?subject=AI%20Baby%20Reels%20order%20help"
            >
              <Mail size={18} /> Contact Support
            </a>
          </>
        ) : (
          <>
            <span className={styles.iconCircle}>
              <CheckCircle2 size={52} />
            </span>
            <span className={styles.badge}>Payment Successful 🎉</span>
            <h1 className={styles.title}>
              Thank You{name ? `, ${name}` : ""}!
            </h1>
            <p className={styles.lead}>
              Your payment of <strong>₹{amountPaid}</strong> is confirmed. Your
              {" "}
              {PRODUCT_NAME} is ready to download below.
            </p>

            <div className={styles.receipt}>
              <div className={styles.receiptRow}>
                <span>Product</span>
                <strong>{PRODUCT_NAME}</strong>
              </div>
              <div className={styles.receiptRow}>
                <span>Amount Paid</span>
                <strong className={styles.accent}>₹{amountPaid}</strong>
              </div>
              {orderId && (
                <div className={styles.receiptRow}>
                  <span>Order ID</span>
                  <code>{orderId}</code>
                </div>
              )}
              {email && (
                <div className={styles.receiptRow}>
                  <span>Delivered To</span>
                  <strong>{email}</strong>
                </div>
              )}
            </div>

            {status === "checking" ? (
              <p className={styles.pending}>
                <RefreshCw size={17} className={styles.spin} /> Verifying payment
                &amp; preparing your download…
              </p>
            ) : (
              <>
                <a
                  className={styles.btn}
                  href={downloadPath}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={19} /> Download Your Reels Bundle
                </a>
                <a
                  className={styles.bonusBtn}
                  href="/10000-Bonus-free-khgxw3.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Gift size={18} /> Download FREE Bonus (10,000+ Resources)
                </a>
              </>
            )}

            {email && (
              <p className={styles.emailNote}>
                <Mail size={14} /> A backup link was also sent to{" "}
                <strong>{email}</strong>
              </p>
            )}
          </>
        )}

        <Link className={styles.back} href="/ai-baby-reels">
          <ArrowLeft size={15} /> Back to AI Baby Reels
        </Link>
      </div>
    </main>
  );
}

export default function AiReelsThankYou() {
  return (
    <Suspense
      fallback={
        <main className={`${styles.page} ${poppins.variable}`}>
          <div className={styles.card}>
            <p className={styles.pending}>Loading…</p>
          </div>
        </main>
      }
    >
      <ThankYouInner />
    </Suspense>
  );
}
