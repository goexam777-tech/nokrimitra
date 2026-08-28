"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans, Montserrat } from "next/font/google";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  Mail,
  MessageSquare,
  Zap,
} from "lucide-react";

import trustBadges from "@/public/trust.webp";
import styles from "../../nursing-notes/checkout/checkout.module.css";
import up from "./upsell.module.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-nursing",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
  variable: "--font-xray-title",
});

const PRICE = 199;
const OLD_PRICE = 999;
const PRODUCT_NAME = "X-Ray Diagnosis Guide (PDF)";
const ADDON_ID = "lab-test-master-guide";
const ADDON_PRICE = 79;
const ADDON_NAME = "Clinical Lab Test Master Guide";

const trustPoints = [
  { icon: Lock, text: "100% Secure Payment" },
  { icon: Zap, text: "Instant Delivery After Payment" },
  { icon: Mail, text: "PDF Delivered to Your Email" },
  { icon: MessageSquare, text: "Support Available" },
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

export default function XrayCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addon, setAddon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = PRICE + (addon ? ADDON_PRICE : 0);

  const formStartedRef = useRef(false);

  const handleFormStart = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    if (typeof window !== "undefined") {
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      w.gtag?.("event", "form_start", { form_name: "xray_checkout_form" });
    }
  };

  const handleButtonClick = () => {
    if (typeof window !== "undefined") {
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      w.gtag?.("event", "purchase_button_click", {
        product_name: PRODUCT_NAME,
        price: total,
        currency: "INR",
      });
    }
  };

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
    router.push("/xray-diagnosis");
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

    if (typeof window !== "undefined") {
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      w.gtag?.("event", "checkout_form_submit", {
        product_name: PRODUCT_NAME,
        value: total,
        currency: "INR",
      });
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "xray",
          name,
          email,
          addons: addon ? [ADDON_ID] : [],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const goThankYou = (extra: Record<string, string>) => {
        const q = new URLSearchParams({
          name,
          email,
          amountPaid: String(total),
          productName: PRODUCT_NAME,
          product: "xray",
          addons: addon ? ADDON_ID : "",
          ...extra,
        });
        router.push(`/xray-diagnosis/thank-you?${q.toString()}`);
      };

      if (typeof window !== "undefined") {
        const w = window as unknown as { gtag?: (...a: unknown[]) => void };
        w.gtag?.("event", "payment_redirect", {
          order_id: data.orderId,
          value: total,
          currency: "INR",
        });
      }

      // Mock mode (local dev without Razorpay keys) → straight to thank-you.
      if (data.mock) {
        setTimeout(
          () => goThankYou({ orderId: data.orderId, mock: "true" }),
          900
        );
        return;
      }

      const ok = await loadRazorpay();
      if (!ok)
        throw new Error(
          "Could not load the secure payment window. Please retry."
        );

      const rzp = new (
        window as unknown as {
          Razorpay: new (o: unknown) => { open: () => void };
        }
      ).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || data.keyId,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "NokriMitra",
        description: addon
          ? `${PRODUCT_NAME} + ${ADDON_NAME}`
          : PRODUCT_NAME,
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
        theme: { color: "#ef4444" },
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
    <div
      className={`${styles.page} ${plusJakarta.variable} ${montserrat.variable}`}
      style={{
        background:
          "linear-gradient(150deg,#111827 0%,#1A1A2E 35%,#0F3460 100%)",
      }}
    >
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
          {/* Left: intro + note */}
          <div className={styles.productColumn}>
            <div className={up.orderIntro}>
              <h2 className={up.orderTitle}>
                <span className={up.gold}>Complete</span> Your Order
              </h2>
              <p className={up.orderNote}>
                <span className={up.noteLabel}>NOTE :</span> This product is in{" "}
                <span className={up.hlGold}>PDF Format</span>. After payment you
                will get <span className={up.hlRed}>download link</span> on your
                registered email.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className={styles.formColumn}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <span className={styles.discountBadge}>
                  🔥 Limited-Time Launch Price
                </span>
                <div className={styles.pricePill}>
                  <span className={styles.priceOriginal}>₹{OLD_PRICE}</span>
                  <span className={styles.priceCurrent}>₹{PRICE}</span>
                  <span className={styles.priceSave}>Save 80%</span>
                </div>
                <div className={styles.oneTimeAccessNote}>
                  <span>One-time payment</span>
                  <span className={styles.dotSeparator}>•</span>
                  <span>Lifetime access</span>
                </div>
                <h2 className={styles.formHeaderTitle}>
                  Complete Your Secure Order
                </h2>
                <p className={styles.formHeaderSub}>
                  Instant access in seconds after payment
                </p>
              </div>

              <form
                className={styles.form}
                onSubmit={handlePay}
                onFocus={handleFormStart}
                onChange={handleFormStart}
                noValidate
              >
                {error && (
                  <div className={styles.errorBanner} role="alert">
                    {error}
                  </div>
                )}

                <div className={styles.field}>
                  <label htmlFor="xray-name">Full Name</label>
                  <input
                    id="xray-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="xray-email">Email Address</label>
                  <input
                    id="xray-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <span className={styles.fieldHelp}>
                    <Mail size={13} /> Your download link is sent here.
                  </span>
                </div>

                <label className={up.upsell}>
                  <div className={up.head}>
                    <input
                      type="checkbox"
                      className={up.checkbox}
                      checked={addon}
                      onChange={(e) => setAddon(e.target.checked)}
                      disabled={loading}
                    />
                    <span className={up.yesTag}>Yes! I Want this!</span>
                  </div>

                  <p className={up.title}>
                    ⚡ Add Clinical Lab Test Master Guide – Just ₹79!
                  </p>
                  <p className={up.intro}>
                    Quick-reference guide for essential lab tests, normal ranges
                    &amp; diagnostic values.
                  </p>
                  <ul className={up.lines}>
                    <li>
                      🩺 <strong>Covers:</strong> Renal, Hepatic, Cardiac,
                      Glycemic, Lipid, Iron, Electrolytes &amp; ABG
                    </li>
                    <li>
                      📱 <strong>High-Resolution PDF</strong> – Perfect for quick
                      revision anywhere.
                    </li>
                    <li className={up.priceLine}>
                      🏷️ 92% OFF: <s>₹999</s> → Just <strong>₹79</strong>
                    </li>
                  </ul>
                  <p className={up.oneTime}>
                    One-time offer — available only with your X-Ray Diagnosis
                    PDF.
                  </p>
                </label>

                <div className={styles.summaryHead}>
                  <span>Item</span>
                  <span>Price</span>
                </div>

                <div className={styles.priceBreakdown}>
                  <div className={styles.priceRow}>
                    <span>X-Ray Diagnosis Guide PDF</span>
                    <span>INR {PRICE}</span>
                  </div>
                  {addon && (
                    <div className={styles.priceRow}>
                      <span>{ADDON_NAME}</span>
                      <span>INR {ADDON_PRICE}</span>
                    </div>
                  )}
                </div>

                <div className={styles.orderTotal}>
                  <span>TOTAL</span>
                  <strong>
                    <i>INR</i> {total}.00
                  </strong>
                </div>

                <button
                  type="submit"
                  className={`${styles.payBtn} ${up.payBtn}`}
                  disabled={loading}
                  onClick={handleButtonClick}
                >
                  {loading ? (
                    "Initiating payment…"
                  ) : (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      Complete Order <ArrowRight size={20} strokeWidth={2.6} />
                    </span>
                  )}
                </button>

                <ul className={styles.trustStrip}>
                  {trustPoints.map(({ icon: Icon, text }) => (
                    <li key={text}>
                      <Icon size={16} /> <span>{text}</span>
                    </li>
                  ))}
                </ul>

                <Image
                  src={trustBadges}
                  alt="Secure checkout, privacy protected and satisfaction guaranteed"
                  className={styles.razorpayLogo}
                  sizes="(max-width: 640px) 90vw, 380px"
                />
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
