"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  Download,
  FileText,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import coverImg from "@/public/evguide.webp";
import razorpayImg from "@/public/razorpay-logo.webp";
import { ESCOOTER_CATALOG } from "@/lib/escooterCatalog";
import styles from "./checkout.module.css";

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as unknown as { Razorpay?: unknown }).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function EscooterCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const analytics = window as unknown as {
      fbq?: (...args: unknown[]) => void;
      gtag?: (...args: unknown[]) => void;
    };
    analytics.fbq?.("track", "InitiateCheckout", {
      value: ESCOOTER_CATALOG.price,
      currency: "INR",
      content_name: ESCOOTER_CATALOG.name,
    });
    analytics.gtag?.("event", "begin_checkout", {
      value: ESCOOTER_CATALOG.price,
      currency: "INR",
      items: [{ item_name: ESCOOTER_CATALOG.name, price: ESCOOTER_CATALOG.price }],
    });
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/electric-scooter-repairing");
  };

  const handlePay = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: ESCOOTER_CATALOG.product, name, email }),
      });
      const order = await response.json();
      if (!response.ok) throw new Error(order.error || "Order creation failed");

      const orderTotal = Number(order.total ?? ESCOOTER_CATALOG.price);
      const goToThankYou = (extra: Record<string, string>) => {
        const query = new URLSearchParams({
          name: name.trim(),
          email: email.trim(),
          amountPaid: String(orderTotal),
          product: ESCOOTER_CATALOG.product,
          ...extra,
        });
        router.push(`/electric-scooter-repairing/thank-you?${query}`);
      };

      if (order.mock) {
        setTimeout(() => goToThankYou({ orderId: order.orderId, mock: "true" }), 900);
        return;
      }

      if (!(await loadRazorpay())) {
        throw new Error("Could not load the secure payment window. Please retry.");
      }
      const razorpay = new (window as unknown as {
        Razorpay: new (options: unknown) => { open: () => void };
      }).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || order.keyId,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "NokriMitra",
        description: ESCOOTER_CATALOG.paymentLabel,
        order_id: order.orderId,
        prefill: { name: name.trim(), email: email.trim() },
        theme: { color: "#17192B" },
        modal: { ondismiss: () => setLoading(false) },
        handler: (result: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => goToThankYou(result),
      });
      razorpay.open();
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Payment could not be started. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <div className={styles.barInner}>
          <button className={styles.back} type="button" onClick={handleBack}><ArrowLeft size={17} /> Back</button>
          <span className={styles.brand}>Nokri<span>Mitra</span></span>
          <span className={styles.secure}><LockKeyhole size={14} /> Secure checkout</span>
        </div>
      </header>

      <main className={styles.wrap}>
        <div className={styles.grid}>
          <section className={styles.product}>
            <p className={styles.eyebrow}>Your digital bundle</p>
            <h1>Master EV Scooter Repairing - All in One Bundle</h1>
            <p className={styles.productLead}>
              3 Practical Digital Books - Hindi &amp; English - Instant Download
            </p>
            <div className={styles.productRow}>
              <Image className={styles.cover} src={coverImg} alt="Electric Scooter Repairing bundle" priority />
              <div>
                <strong>{ESCOOTER_CATALOG.name}</strong>
                <p><FileText size={14} /> 3 digital PDF books</p>
              </div>
            </div>
            <ul className={styles.included}>
              {ESCOOTER_CATALOG.books.map((book) => <li key={book.title}><Check size={16} />{book.title}</li>)}
            </ul>
          </section>

          <section className={styles.checkoutCard} aria-labelledby="checkout-title">
            <p className={styles.step}>Complete your order</p>
            <h2 id="checkout-title">Delivery details</h2>
            <p className={styles.cardLead}>
              Your bundle link will be sent to this email after payment.
            </p>
            <form onSubmit={handlePay}>
              {error && <div className={styles.error} role="alert">{error}</div>}
              <label className={styles.field}>
                <span>Full name</span>
                <input type="text" autoComplete="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} required />
              </label>
              <label className={styles.field}>
                <span>Email address</span>
                <input type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} required />
              </label>

              <div className={styles.orderLine}><span>3-Book Digital Bundle</span><strong>₹{ESCOOTER_CATALOG.price}</strong></div>
              <div className={styles.total}><span>Total <small>One-time payment</small></span><strong>₹{ESCOOTER_CATALOG.price}</strong></div>

              <button className={styles.payButton} type="submit" disabled={loading}>
                {loading ? (
                  "Please wait..."
                ) : (
                  <>
                    <LockKeyhole size={18} /> Get 3 eBooks - ₹
                    {ESCOOTER_CATALOG.price}
                  </>
                )}
              </button>
              <Image
                className={styles.razorpay}
                src={razorpayImg}
                alt="Secured by Razorpay"
                sizes="330px"
              />
              <p className={styles.note}><ShieldCheck size={14} /> Payment details are handled securely by Razorpay.</p>
            </form>
            <p className={styles.deliveryNote}>
              <Mail size={15} /> The download button appears on screen once your
              payment is verified.
            </p>
            <nav className={styles.legal} aria-label="Legal links">
              <a href="/electric-scooter-repairing/privacy-policy">Privacy</a>
              <a href="/electric-scooter-repairing/refund-policy">Refund</a>
              <a href="/electric-scooter-repairing/terms">Terms</a>
              <a href="/electric-scooter-repairing/disclaimer">Disclaimer</a>
            </nav>
          </section>
        </div>
      </main>
    </div>
  );
}
