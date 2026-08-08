"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { ESCOOTER_CATALOG } from "@/lib/escooterCatalog";
import styles from "./ty.module.css";

type CachedOrder = {
  amountPaid: string;
  downloadPath: string;
};

function Content() {
  const params = useSearchParams();
  const verified = useRef(false);
  const [status, setStatus] = useState<"checking" | "ready" | "failed">("checking");
  const [downloadPath, setDownloadPath] = useState("");
  const [confirmedAmount, setConfirmedAmount] = useState(String(ESCOOTER_CATALOG.price));

  const name = params.get("name") || "";
  const email = params.get("email") || "";
  const orderId = params.get("razorpay_order_id") || params.get("orderId") || "";
  const paymentId = params.get("razorpay_payment_id") || "";

  useEffect(() => {
    if (verified.current) return;
    verified.current = true;

    const signature = params.get("razorpay_signature") || "";
    const isMock = params.get("mock") === "true" || orderId.startsWith("order_mock_");
    const storageKey = orderId ? `nm_escooter_purchase_${orderId}` : "";

    if (storageKey) {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          try {
            const cached = JSON.parse(stored) as CachedOrder;
            setDownloadPath(cached.downloadPath || "");
            setConfirmedAmount(cached.amountPaid || String(ESCOOTER_CATALOG.price));
          } catch {
            setDownloadPath(stored === "done" ? "" : stored);
          }
          setStatus("ready");
          return;
        }
      } catch {
        // Storage can be unavailable in private browsing; verify normally.
      }
    }

    if (!isMock && (!paymentId || !signature || !orderId)) {
      setStatus("failed");
      return;
    }

    (async () => {
      try {
        const response = await fetch("/api/checkout/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: paymentId || `pay_mock_${orderId}`,
            razorpay_order_id: orderId,
            razorpay_signature: signature || "mock",
            name,
            email,
            product: ESCOOTER_CATALOG.product,
          }),
        });
        const data = await response.json();
        if (!response.ok || !data.verified || typeof data.downloadPath !== "string") {
          throw new Error(data.error || "Payment verification failed");
        }

        const paidAmount = String(data.amountPaid ?? ESCOOTER_CATALOG.price);
        setDownloadPath(data.downloadPath);
        setConfirmedAmount(paidAmount);
        setStatus("ready");
        if (storageKey) {
          try {
            localStorage.setItem(storageKey, JSON.stringify({ amountPaid: paidAmount, downloadPath: data.downloadPath }));
          } catch {
            // The verified state still works for this page load.
          }
        }

        // The server tells us when this order was already fulfilled, so a
        // repeat visit on another device does not count a second Purchase.
        if (data.alreadyFulfilled) return;

        const analytics = window as unknown as {
          fbq?: (...args: unknown[]) => void;
          gtag?: (...args: unknown[]) => void;
        };
        analytics.fbq?.(
          "track",
          "Purchase",
          {
            value: Number(paidAmount),
            currency: "INR",
            content_name: ESCOOTER_CATALOG.name,
          },
          { eventID: `escooter_${orderId}` }
        );
        analytics.gtag?.("event", "purchase", {
          transaction_id: orderId,
          value: Number(paidAmount),
          currency: "INR",
          items: [{ item_name: ESCOOTER_CATALOG.name, price: Number(paidAmount) }],
        });
      } catch {
        setStatus("failed");
      }
    })();
  }, [email, name, orderId, params, paymentId]);

  if (status === "checking") {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Verifying your payment…</p>
      </div>
    );
  }

  const supportMessage = encodeURIComponent(`Electric Scooter bundle payment help. Order ID: ${orderId || "not available"}`);

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        {status === "failed" ? (
          <>
            <div className={styles.failTop}>
              <ShieldCheck size={28} />
              <h1>We could not verify your payment</h1>
              <p>
                If money was deducted, send your Order ID to support and we will
                sort it out. Downloads are only released after the payment is
                verified.
              </p>
            </div>
            <div className={styles.body}>
              <div className={styles.orderId}>Order ID <strong>{orderId || "Not available"}</strong></div>
              <a className={styles.primary} href={`https://wa.me/919104826422?text=${supportMessage}`} target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
              <a className={styles.back} href="/electric-scooter-repairing"><ArrowLeft size={16} /> Back to product page</a>
            </div>
          </>
        ) : (
          <>
            <div className={styles.top}>
              <span className={styles.icon}><CheckCircle2 size={28} /></span>
              <p className={styles.status}>Payment confirmed</p>
              <h1>{name ? `Thank you, ${name}!` : "Thank you!"}</h1>
              <p>Your complete 3-book EV repair bundle is ready.</p>
            </div>
            <div className={styles.body}>
              <p className={styles.lead}>
                Verified amount: <strong>₹{confirmedAmount}</strong>. The button
                below was released only after your payment was confirmed.
              </p>
              <a className={styles.primary} href={downloadPath} target="_blank" rel="noopener noreferrer"><Download size={18} /> Download complete 3-book bundle</a>

              <div className={styles.included}>
                <p>Included in your bundle</p>
                {ESCOOTER_CATALOG.books.map((book) => <div key={book.title}><CheckCircle2 size={16} />{book.title}</div>)}
              </div>

              {email && <p className={styles.email}><Mail size={15} /> Delivery email will also be sent to <strong>{email}</strong> when email delivery succeeds.</p>}
              <div className={styles.details}>
                <span>Order ID</span><strong>{orderId}</strong>
                {paymentId && <><span>Payment ID</span><strong>{paymentId}</strong></>}
              </div>
              <div className={styles.actions}>
                <a href={`https://wa.me/919104826422?text=${supportMessage}`} target="_blank" rel="noopener noreferrer">Need download help?</a>
                <a className={styles.back} href="/electric-scooter-repairing"><ArrowLeft size={16} /> Back to product page</a>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default function EscooterThankYou() {
  return <Suspense fallback={<div className={styles.loading}><div className={styles.spinner} /></div>}><Content /></Suspense>;
}
