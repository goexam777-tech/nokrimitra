"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import nursingNotesHero from "@/public/Nursing-notes.webp";
import trustBadges from "@/public/trust.webp";
import styles from "./checkout.module.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-nursing",
});

const PRICE = 199;
const OLD_PRICE = 999;
const SAVE_PERCENT = 85;
const PRODUCT_NAME = "ALL-In-One Nursing Notes (600+ Pages PDF)";
const PAYMENT_LABEL = "ALL-In-One Nursing Notes PDF";

const included = [
  "600+ Pages Complete Syllabus",
  "Fundamentals, IV Fluids & Anatomy",
  "Medical-Surgical & Flashcards",
  "Pharmacology, EKGs & Lab Values",
  "Instant PDF + Email Delivery",
  "Lifetime Access on All Devices",
];

const trustPoints = [
  { icon: Lock, text: "Secured by Razorpay" },
  { icon: Download, text: "Instant access after payment" },
  { icon: Mail, text: "Link emailed to you" },
  { icon: RefreshCw, text: "Support if any issue" },
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

export default function NursingNotesCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const w = window as unknown as {
      fbq?: (...a: unknown[]) => void;
      gtag?: (...a: unknown[]) => void;
    };
    w.fbq?.("track", "InitiateCheckout", {
      value: PRICE,
      currency: "INR",
      content_name: PRODUCT_NAME,
    });
    w.gtag?.("event", "begin_checkout", {
      value: PRICE,
      currency: "INR",
      items: [{ item_name: PRODUCT_NAME, price: PRICE }],
    });
  }, []);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/nursing-notes");
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email to proceed.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address (e.g. name@gmail.com).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "nursing", name, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const goThankYou = (extra: Record<string, string>) => {
        const q = new URLSearchParams({
          name,
          email,
          amountPaid: String(PRICE),
          productName: PRODUCT_NAME,
          product: "nursing",
          ...extra,
        });
        router.push(`/nursing-notes/thank-you?${q.toString()}`);
      };

      if (data.mock) {
        setTimeout(() => goThankYou({ orderId: data.orderId, mock: "true" }), 1000);
        return;
      }

      const ok = await loadRazorpay();
      if (!ok)
        throw new Error("Could not load the secure payment window. Please retry.");

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
        prefill: { name, email },
        theme: { color: "#16a34a" },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.open();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or refresh."
      );
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.page} ${plusJakarta.variable}`}>
      <header className={styles.topBar}>
        <div className={styles.topBarInner}>
          <button type="button" className={styles.backBtn} onClick={handleBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <span className={styles.secureTag}>
            <Lock size={13} /> Secure checkout
          </span>
        </div>
      </header>

      <main className={styles.wrap}>
        <div className={styles.grid}>
          {/* Left Column: Product Info & Included Points */}
          <div className={styles.productColumn}>
            <div className={styles.productCard}>
              <div className={styles.coverContainer}>
                <Image
                  src={nursingNotesHero}
                  alt="Nursing Notes E-book cover"
                  fill
                  priority
                  className={styles.coverImg}
                />
              </div>
              <div className={styles.productInfo}>
                <strong className={styles.productName}>
                  ALL-In-One Nursing Notes
                </strong>
                <span className={styles.productMeta}>
                  Digital PDF · 600+ Pages
                </span>
                <div className={styles.miniPrice}>
                  <s>₹{OLD_PRICE}</s>
                  <b>₹{PRICE}</b>
                </div>
              </div>
            </div>

            <ul className={styles.includedGrid}>
              {included.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={17} /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Checkout Form */}
          <div className={styles.formColumn}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <span className={styles.discountBadge}>
                  🔥 Limited-time launch offer
                </span>
                <div className={styles.pricePill}>
                  <span className={styles.priceOriginal}>₹{OLD_PRICE}</span>
                  <span className={styles.priceCurrent}>₹{PRICE}</span>
                  <span className={styles.priceSave}>Save {SAVE_PERCENT}%</span>
                </div>
                <h2 className={styles.formHeaderTitle}>Complete your order</h2>
                <p className={styles.formHeaderSub}>
                  Instant PDF download immediately after payment
                </p>
              </div>

              <form className={styles.form} onSubmit={handlePay} noValidate>
                {error && (
                  <div className={styles.errorBanner} role="alert">
                    {error}
                  </div>
                )}

                <div className={styles.field}>
                  <label htmlFor="nursing-name">Full name</label>
                  <input
                    id="nursing-name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Anjali Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="nursing-email">Email address</label>
                  <input
                    id="nursing-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <span className={styles.fieldHelp}>
                    <Mail size={13} /> Your download link is sent here.
                  </span>
                </div>

                <div className={styles.orderTotal}>
                  <span>TOTAL AMOUNT</span>
                  <strong>₹{PRICE}</strong>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={styles.payBtn}
                >
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      <span>Pay ₹{PRICE} &amp; Download PDF</span>
                      <Lock size={18} />
                    </>
                  )}
                </button>

                <Image
                  src={trustBadges}
                  alt="Guaranteed Safe Checkout Trust Badges"
                  className={styles.trustBadgesImg}
                />

                <p className={styles.payNote}>
                  <ShieldCheck size={16} /> 256-Bit Encrypted Payment • Instant Access On Email
                </p>
              </form>

              <ul className={styles.trustStrip}>
                {trustPoints.map((tp, i) => {
                  const Icon = tp.icon;
                  return (
                    <li key={i}>
                      <Icon size={15} />
                      <span>{tp.text}</span>
                    </li>
                  );
                })}
              </ul>

              <div className={styles.guarantee}>
                <ShieldCheck size={20} />
                <p>
                  <strong>Instant Download Guarantee:</strong> You will get immediate access to download your Nursing Notes PDF on screen &amp; backup link on your email after successful payment.
                </p>
              </div>

              <div className={styles.legalNav}>
                <a href="/nursing-notes/privacy-policy">Privacy Policy</a>
                <a href="/nursing-notes/refund-policy">Refund Policy</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
