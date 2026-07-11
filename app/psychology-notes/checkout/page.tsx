"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import razorpayImg from "@/public/razorpay.png";
import styles from "./checkout.module.css";

const BASE_PRICE = 149;
const ADDON_PRICE = 99;

const benefits = [
  "Limited Time: 90% OFF",
  "Beginner to Advanced Learning",
  "Easy Notes + Visual Diagrams",
  "Updated & Practical Content",
  "Download Instantly After Purchase",
];

const bumpList = [
  "CBT & Counseling Techniques",
  "Exposure & Mindfulness Methods",
  "Practical Clinical Interventions",
  "Easy-to-Understand Explanations",
];

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as unknown as { Razorpay?: unknown }).Razorpay) {
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

export default function PsyCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addon, setAddon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = BASE_PRICE + (addon ? ADDON_PRICE : 0);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Please fill in your name and email.");
      return;
    }
    setLoading(true);
    setError("");

    const productName = addon
      ? "Psychology Notes + 800 Therapeutic Interventions"
      : "Psychology Notes";

    try {
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, name, email, phone: "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const goThankYou = (extra: Record<string, string>) => {
        const q = new URLSearchParams({
          name,
          email,
          amountPaid: String(total),
          productName,
          product: "psychology",
          ...extra,
        });
        router.push(`/psychology-notes/thank-you?${q.toString()}`);
      };

      if (data.mock) {
        setTimeout(() => goThankYou({ orderId: data.orderId, mock: "true" }), 1200);
        return;
      }

      const ok = await loadRazorpay();
      if (!ok) throw new Error("Failed to load Razorpay.");

      const rzp = new (window as unknown as { Razorpay: new (o: unknown) => { open: () => void } }).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || data.keyId,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "NokriMitra",
        description: productName,
        order_id: data.orderId,
        handler: (r: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) =>
          goThankYou({
            razorpay_payment_id: r.razorpay_payment_id,
            razorpay_order_id: r.razorpay_order_id,
            razorpay_signature: r.razorpay_signature,
          }),
        prefill: { name, email },
        theme: { color: "#12213f" },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bar}>
        <h1>Psychology Notes</h1>
      </div>

      <div className={styles.wrap}>
        <div className={styles.grid}>
          {/* LEFT: offer */}
          <div>
            <div className={styles.offerBanner}>
              ONE-TIME SPECIAL OFFER — Grab It Before Price Increases
            </div>
            <ul className={styles.benefits}>
              {benefits.map((b) => (
                <li key={b}>
                  <span className={styles.bTick}>✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: order form */}
          <div className={styles.orderCard}>
            <h2 className={styles.orderTitle}>Complete Your Secure Order</h2>
            <p className={styles.orderSub}>
              Instant access — download in seconds after checkout
            </p>

            <form onSubmit={handlePay}>
              {error && <div className={styles.err}>{error}</div>}

              <div className={styles.field}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Aditi Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. aditi@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              {/* Order bump */}
              <div className={styles.bump}>
                <div className={styles.bumpHead}>
                  Special One Time Offer, Only ₹99!
                </div>
                <div className={styles.bumpBody}>
                  <div className={styles.bumpTitle}>
                    🧠 Get 800 Therapeutic Interventions at a Huge Discount!
                  </div>
                  <ul className={styles.bumpList}>
                    {bumpList.map((b) => (
                      <li key={b}>✅ {b}</li>
                    ))}
                  </ul>
                  <div className={styles.bumpMeta}>
                    📚 Perfect for Psychology Students & Therapists · 🔥 One-Time
                    Offer · 📥 Instant Download Access
                  </div>
                  <label className={styles.bumpCheck}>
                    <input
                      type="checkbox"
                      checked={addon}
                      onChange={(e) => setAddon(e.target.checked)}
                      disabled={loading}
                    />
                    <span>
                      <strong>YES!</strong> Add{" "}
                      <strong>800 Therapeutic Interventions</strong> for just ₹99.
                    </span>
                  </label>
                </div>
              </div>

              {/* Summary */}
              <div className={styles.sumHeadRow}>
                <span>Item</span>
                <span>Price</span>
              </div>

              <div className={styles.planCard}>
                <span className={styles.radioDot} aria-hidden="true" />
                <div className={styles.planText}>
                  <strong>One Time Fee Pricing</strong>
                  <span>One-time payment</span>
                </div>
                <div className={styles.planPrice}>
                  <span>
                    <span className={styles.inr}>INR</span> <b>149</b>
                  </span>
                  <span className={styles.planSub}>one-time</span>
                </div>
              </div>

              <div className={styles.itemsCard}>
                <div className={styles.itemRow}>
                  <span>psychology</span>
                  <b>INR 149</b>
                </div>
                {addon && (
                  <div className={styles.itemRow}>
                    <span>800 Therapeutic Interventions</span>
                    <b>+ INR 99.00</b>
                  </div>
                )}
              </div>

              <div className={styles.totalCard}>
                <span className={styles.totalLabel}>TOTAL</span>
                <span className={styles.totalVal}>
                  <span className={styles.inr}>INR</span> <b>{total}.00</b>
                </span>
              </div>

              <div className={styles.payVia}>🔒 Pay securely via Razorpay</div>

              <button type="submit" className={styles.payBtn} disabled={loading}>
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    Complete Order
                    <svg
                      className={styles.payArrow}
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="11" fill="#fff" />
                      <path
                        d="M10 7l5 5-5 5"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>

              <div className={styles.razorpayWrap}>
                <Image
                  src={razorpayImg}
                  alt="Secured payments powered by Razorpay"
                  className={styles.razorpayImg}
                  priority
                />
              </div>

              <p className={styles.secureNote}>
                256-bit SSL secure payment · Instant access after checkout
              </p>
            </form>

            <div className={styles.footerLinks}>
              <a href="/psychology-notes/privacy-policy">Privacy</a>
              <a href="/psychology-notes/refund-policy">Refund</a>
              <a href="/psychology-notes/terms">Terms</a>
              <a href="/psychology-notes/disclaimer">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
