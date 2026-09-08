"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import cardioCover from "@/public/cardiovascular-system (1).jpg";
import payMarks from "@/public/pay-marks.png";
import trustBadge from "@/public/trust.webp";
import styles from "./checkout.module.css";

const BASE_PRICE = 199;
const PRODUCT_NAME = "Complete MBBS Notes (All 21 Subjects)";

function loadCashfree(): Promise<unknown> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as unknown as { Cashfree?: unknown }).Cashfree) {
      resolve((window as unknown as { Cashfree?: unknown }).Cashfree);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    s.onload = () => resolve((window as unknown as { Cashfree?: unknown }).Cashfree);
    s.onerror = () => resolve(null);
    document.body.appendChild(s);
  });
}

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

export default function MbbsCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
      fbq?: (...args: unknown[]) => void;
    };

    // 1. Google Analytics (begin_checkout)
    w.dataLayer = w.dataLayer || [];
    if (typeof w.gtag !== "function") {
      w.gtag = function () {
        w.dataLayer?.push(arguments);
      };
    }
    w.gtag("event", "begin_checkout", {
      currency: "INR",
      value: BASE_PRICE,
      items: [
        {
          item_name: PRODUCT_NAME,
          price: BASE_PRICE,
          quantity: 1,
        },
      ],
    });

    // 2. Facebook Pixel (InitiateCheckout)
    const fireFb = (attempts = 0) => {
      if (typeof w.fbq === "function") {
        w.fbq("track", "InitiateCheckout", {
          content_name: PRODUCT_NAME,
          content_category: "Medical Notes",
          value: BASE_PRICE,
          currency: "INR",
        });
      } else if (attempts < 10) {
        setTimeout(() => fireFb(attempts + 1), 300);
      }
    };
    fireFb();
  }, []);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/mbbs-notes");
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
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

    const goThankYou = (extra: Record<string, string>) => {
      const q = new URLSearchParams({
        name,
        email,
        amountPaid: String(BASE_PRICE),
        productName: PRODUCT_NAME,
        product: "mbbs",
        ...extra,
      });
      router.push(`/mbbs-notes/thank-you?${q.toString()}`);
    };

    // Primary: Razorpay Payment Gateway
    try {
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "mbbs",
          amount: BASE_PRICE,
          name,
          email,
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      if (data.mock) {
        setTimeout(() => goThankYou({ orderId: data.orderId, mock: "true" }), 800);
        return;
      }

      const ok = await loadRazorpay();
      if (!ok) throw new Error("Could not load secure Razorpay payment gateway. Please retry.");

      const rzp = new (window as unknown as { Razorpay: new (o: unknown) => { open: () => void } }).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || data.keyId,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "NokriMitra",
        description: PRODUCT_NAME,
        order_id: data.orderId,
        handler: (r: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) =>
          goThankYou({
            razorpay_payment_id: r.razorpay_payment_id,
            razorpay_order_id: r.razorpay_order_id,
            razorpay_signature: r.razorpay_signature,
          }),
        prefill: { name, email, contact: phone },
        theme: { color: "#0b6b3a" },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment gateway error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* 1. Top Bar */}
        <header className={styles.topNav}>
          <button type="button" className={styles.backBtn} onClick={handleBack}>
            <span className={styles.backChevron}>‹</span>
            <span>Back</span>
          </button>
          <div className={styles.secureTag}>
            <Lock size={13} strokeWidth={2.4} />
            <span>Secure checkout</span>
          </div>
        </header>

        {/* 2. Main Title & Subtitle */}
        <div className={styles.headerBlock}>
          <h1 className={styles.title}>Complete your order</h1>
          <p className={styles.subTitle}>
            Takes about 40 seconds. Files arrive by email straight after payment.
          </p>
        </div>

        <form onSubmit={handlePay} className={styles.checkoutForm}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          {/* 3. Card 1: WHERE SHOULD WE SEND IT */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>WHERE SHOULD WE SEND IT</div>
            <div className={styles.cardBody}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="cust-name">
                  Your name
                </label>
                <input
                  id="cust-name"
                  type="text"
                  required
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className={styles.textInput}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="cust-email">
                  Email address
                </label>
                <input
                  id="cust-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className={styles.textInput}
                />
                <span className={styles.fieldHint}>
                  Both delivery emails go here. Check this is spelt right.
                </span>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="cust-phone">
                  WhatsApp number
                </label>
                <div className={styles.phoneInputRow}>
                  <div className={styles.phonePrefix}>+91</div>
                  <input
                    id="cust-phone"
                    type="tel"
                    placeholder="10–digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                    className={styles.phoneInput}
                  />
                </div>
                <span className={styles.fieldHint}>
                  Backup delivery, and how you reach us if anything fails.
                </span>
              </div>
            </div>
          </section>

          {/* 4. Card 2: PAYMENT */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>PAYMENT</div>
            <div className={styles.cardBody}>
              {/* Payment Methods Badges Image */}
              <div className={styles.payMarksWrap}>
                <Image
                  src={payMarks}
                  alt="UPI, VISA, Mastercard, RuPay, Netbanking"
                  className={styles.payMarksImg}
                  priority
                />
              </div>

              <p className={styles.paymentInfoText}>
                Payment is handled by <strong>Razorpay</strong> on the next screen. We never see your card or UPI details. One-time payment, nothing auto-charges later.
              </p>
            </div>
          </section>

          {/* 5. Card 3: YOUR ORDER */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>YOUR ORDER</div>
            <div className={styles.orderRow}>
              <div className={styles.orderItem}>
                <Image
                  src={cardioCover}
                  alt="21 Medical Notes"
                  className={styles.orderCoverImg}
                  width={56}
                  height={56}
                />
                <div className={styles.orderMeta}>
                  <h3 className={styles.orderTitle}>21 Medical Notes</h3>
                  <p className={styles.orderSubtitle}>21 subjects · PDF · opens on any device</p>
                </div>
              </div>
              <div className={styles.orderPrice}>₹{BASE_PRICE}</div>
            </div>
          </section>

          {/* 6. Pay CTA Button */}
          <button type="submit" className={styles.payBtn} disabled={loading}>
            {loading ? (
              "Securing Your Order..."
            ) : (
              <>
                <Lock size={17} strokeWidth={2.4} />
                <span>Pay ₹{BASE_PRICE} &amp; Complete Order</span>
              </>
            )}
          </button>

          <div className={styles.payHint}>
            <span>🔒 256-Bit SSL Secured</span>
            <span>·</span>
            <span>⚡ Instant PDF Email Delivery</span>
          </div>

          <div className={styles.trustBadgeWrap}>
            <Image
              src={trustBadge}
              alt="Guaranteed safe and secure checkout"
              className={styles.trustBadgeImg}
            />
          </div>

          {/* 7. Footer Links */}
          <div className={styles.checkoutFooterLinks}>
            <Link href="/mbbs-notes/terms" className={styles.footerLink}>
              Terms
            </Link>
            <span className={styles.footerDot}>·</span>
            <Link href="/mbbs-notes/privacy-policy" className={styles.footerLink}>
              Privacy
            </Link>
            <span className={styles.footerDot}>·</span>
            <Link href="/mbbs-notes/refund-policy" className={styles.footerLink}>
              Refunds
            </Link>
            <span className={styles.footerDot}>·</span>
            <span className={styles.footerHelp}>Help? </span>
            <a
              href="https://wa.me/919104826422?text=Hi%20NokriMitra%20Support,%20I%20need%20help%20with%20my%20MBBS%20Notes%20Checkout"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              <strong className={styles.footerWhatsApp}>WhatsApp</strong>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
