"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Download,
  FileText,
  Infinity as InfinityIcon,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import coverImg from "@/public/evguide.webp";
import styles from "./checkout.module.css";

const PRICE = 128;
const PRODUCT_NAME =
  "Electric Scooter Repairing Complete Practical Guide (Hindi)";
// UPI apps (Google Pay, PhonePe) cut long payment notes, so the gateway gets a
// short label while emails and the thank-you page keep the full product name.
const PAYMENT_LABEL = "EV Scooter Repair Guide Hindi PDF";

const checklist = [
  "Complete Practical Guide (Hindi PDF)",
  "Battery, BMS और Charger Repair",
  "BLDC Motor, Controller और Throttle Testing",
  "Wiring Diagram और Hall Sensor Fault Finding",
  "Error Codes और Troubleshooting Steps",
  "Payment के बाद तुरंत Download + Email पर link",
  "Lifetime access",
];

const payMethods = [
  "UPI",
  "PhonePe",
  "Google Pay",
  "Paytm",
  "Visa",
  "Mastercard",
];

const trustPoints = [
  { icon: LockKeyhole, text: "Razorpay secure payment" },
  { icon: Download, text: "Payment के बाद तुरंत download" },
  { icon: Mail, text: "Email पर भी link" },
  { icon: InfinityIcon, text: "Lifetime access" },
];

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (
      typeof window !== "undefined" &&
      (window as unknown as { Razorpay?: unknown }).Razorpay
    ) {
      resolve(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function EscooterCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq
    ) {
      (window as unknown as { fbq: (...a: unknown[]) => void }).fbq(
        "track",
        "InitiateCheckout",
        { value: PRICE, currency: "INR" }
      );
    }
  }, []);

  const handleBack = () => {
    // Prefer the actual previous page (landing page, homepage, ads, etc.)
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/electric-scooter-repairing");
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError("कृपया सभी details भरें.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("कृपया सही email address डालें.");
      return;
    }
    if (phone.length < 10) {
      setError("कृपया सही WhatsApp number डालें.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: PRICE, name, email, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const goThankYou = (extra: Record<string, string>) => {
        const q = new URLSearchParams({
          name,
          email,
          amountPaid: String(PRICE),
          productName: PRODUCT_NAME,
          product: "escooter",
          ...extra,
        });
        router.push(`/electric-scooter-repairing/thank-you?${q.toString()}`);
      };

      if (data.mock) {
        setTimeout(
          () => goThankYou({ orderId: data.orderId, mock: "true" }),
          1200
        );
        return;
      }

      const ok = await loadRazorpay();
      if (!ok) throw new Error("Razorpay load नहीं हो सका.");

      const rzp = new (
        window as unknown as {
          Razorpay: new (o: unknown) => { open: () => void };
        }
      ).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || data.keyId,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "NokriMitra",
        description: PAYMENT_LABEL,
        order_id: data.orderId,
        handler: (r: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) =>
          goThankYou({
            razorpay_payment_id: r.razorpay_payment_id,
            razorpay_order_id: r.razorpay_order_id,
            razorpay_signature: r.razorpay_signature,
          }),
        prefill: { name, email, contact: phone },
        theme: { color: "#116437" },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.open();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "कुछ गड़बड़ हो गई. कृपया दोबारा प्रयास करें."
      );
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <div className={styles.barInner}>
          <button type="button" className={styles.back} onClick={handleBack}>
            <ArrowLeft size={17} />
            पीछे जाएँ
          </button>
          <span className={styles.brand}>
            Nokri<span>Mitra</span>
          </span>
          <span className={styles.secure}>
            <LockKeyhole size={14} />
            Secure Checkout
          </span>
        </div>
      </header>

      <main className={styles.wrap}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Step 1 / 1 · Order पूरा करें</p>
          <h1 className={styles.pageTitle}>खरीदी पूरी करें</h1>
          <p className={styles.pageSub}>
            Payment के बाद download link तुरंत screen पर और आपके email पर मिलेगा.
          </p>
        </div>

        <ul className={styles.trustStrip}>
          {trustPoints.map(({ icon: Icon, text }) => (
            <li key={text}>
              <Icon size={17} />
              {text}
            </li>
          ))}
        </ul>

        <div className={styles.grid}>
          <section className={styles.formCard} aria-labelledby="form-title">
            <p className={styles.cardIndex}>01 / आपकी details</p>
            <h2 className={styles.formTitle} id="form-title">
              कहाँ भेजें आपकी PDF?
            </h2>
            <p className={styles.formSub} id="delivery-note">
              सही email डालें — PDF का download link उसी पर भेजा जाएगा.
            </p>

            <form onSubmit={handlePay} aria-describedby="delivery-note">
              {error && (
                <div className={styles.err} role="alert">
                  {error}
                </div>
              )}

              <div className={styles.field}>
                <label htmlFor="cust-name">पूरा नाम</label>
                <input
                  id="cust-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="जैसे: राहुल शर्मा"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="cust-email">Email address</label>
                <input
                  id="cust-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="जैसे: rahul@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                <span className={styles.hint}>
                  इसी email पर download link भेजा जाएगा.
                </span>
              </div>

              <div className={styles.field}>
                <label htmlFor="cust-phone">WhatsApp number</label>
                <input
                  id="cust-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="जैसे: 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  disabled={loading}
                  required
                />
              </div>

              <div className={styles.totalRow}>
                <span>
                  कुल रकम
                  <small>One-time payment</small>
                </span>
                <strong>₹{PRICE}</strong>
              </div>

              <button
                type="submit"
                className={styles.payBtn}
                disabled={loading}
              >
                {loading ? (
                  "Process हो रहा है..."
                ) : (
                  <>
                    <Download size={19} />
                    <span className={styles.payBtnMain}>
                      अभी PDF Download करें — ₹{PRICE}
                    </span>
                  </>
                )}
              </button>

              <div className={styles.rzpRow}>
                <span className={styles.rzpLabel}>Secured by</span>
                <span className={styles.rzpBadge}>Razorpay</span>
              </div>

              <ul className={styles.payMethods} aria-label="Payment options">
                {payMethods.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>

              <p className={styles.note}>
                <ShieldCheck size={15} />
                SSL encrypted payment · Card/UPI details हमारे server पर save
                नहीं होती
              </p>
            </form>
          </section>

          <aside className={styles.summary} aria-labelledby="summary-title">
            <p className={styles.cardIndex}>02 / आपका order</p>

            <div className={styles.prodRow}>
              <div className={styles.prodCover}>
                <Image
                  src={coverImg}
                  alt="Electric Scooter Repairing Complete Practical Guide की Hindi PDF cover"
                  className={styles.prodCoverImg}
                  sizes="120px"
                  priority
                />
              </div>
              <div>
                <h2 className={styles.prodTitle} id="summary-title">
                  {PRODUCT_NAME}
                </h2>
                <p className={styles.prodType}>
                  <FileText size={14} />
                  Digital PDF · Lifetime access
                </p>
              </div>
            </div>

            <ul className={styles.check}>
              {checklist.map((c) => (
                <li key={c}>
                  <Check size={16} className={styles.tick} />
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <div className={styles.priceRow}>
              <span>
                कुल रकम
                <small>एक बार payment</small>
              </span>
              <strong className={styles.priceNow}>₹{PRICE}</strong>
            </div>

            <ul className={styles.assurance}>
              <li>
                <BadgeCheck size={16} />
                100% digital delivery, कोई shipping नहीं
              </li>
              <li>
                <Smartphone size={16} />
                Mobile, tablet और laptop — सब पर खुलेगी
              </li>
              <li>
                <LockKeyhole size={16} />
                UPI, Card, Net Banking और Wallet options
              </li>
            </ul>

            <nav className={styles.legal} aria-label="Legal links">
              <a href="/electric-scooter-repairing/privacy-policy">Privacy</a>
              <a href="/electric-scooter-repairing/refund-policy">Refund</a>
              <a href="/electric-scooter-repairing/terms">Terms</a>
              <a href="/electric-scooter-repairing/disclaimer">Disclaimer</a>
            </nav>
          </aside>
        </div>
      </main>
    </div>
  );
}
