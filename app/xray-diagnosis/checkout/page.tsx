"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Lock,
  Mail,
  MessageSquare,
  ShieldCheck,
  Zap,
} from "lucide-react";

import xrayHero from "@/public/xray.webp";
import trustBadges from "@/public/trust.webp";
import styles from "../../nursing-notes/checkout/checkout.module.css";
import up from "./upsell.module.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-nursing",
});

const PRICE = 199;
const OLD_PRICE = 999;
const PRODUCT_NAME = "X-Ray Diagnosis Guide (PDF)";
const PAYMENT_LABEL = "X-Ray Diagnosis Guide PDF";
const ADDON_ID = "lab-test-master-guide";
const ADDON_PRICE = 99;
const ADDON_NAME = "Clinical Lab Test Master Guide";

const included = [
  "C-spine, Chest, Hip & Pelvis X-rays",
  "Knee X-rays + Bonus Content",
  "Practical Reading & Interpretation",
  "Beginner-Friendly, Simple Format",
  "Instant PDF + Email Delivery",
  "Lifetime Access on All Devices",
];

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

      if (data.mock) {
        if (typeof window !== "undefined") {
          const w = window as unknown as { gtag?: (...a: unknown[]) => void };
          w.gtag?.("event", "payment_redirect", {
            order_id: data.orderId,
            value: total,
            currency: "INR",
          });
        }
        setTimeout(
          () => goThankYou({ orderId: data.orderId, mock: "true" }),
          1000
        );
        return;
      }

      const ok = await loadRazorpay();
      if (!ok)
        throw new Error(
          "Could not load the secure payment window. Please retry."
        );

      if (typeof window !== "undefined") {
        const w = window as unknown as { gtag?: (...a: unknown[]) => void };
        w.gtag?.("event", "payment_redirect", {
          order_id: data.orderId,
          value: total,
          currency: "INR",
        });
      }

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
          ? `${PAYMENT_LABEL} + ${ADDON_NAME}`
          : PAYMENT_LABEL,
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
        theme: { color: "#1689ef" },
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
          {/* Left: product + trust */}
          <div className={styles.productColumn}>
            <div className={styles.productCard}>
              <div className={styles.productCardTop}>
                <div className={styles.coverContainer}>
                  <Image
                    src={xrayHero}
                    alt="X-Ray Diagnosis Guide cover"
                    fill
                    priority
                    className={styles.coverImg}
                  />
                </div>
                <div className={styles.productInfo}>
                  <strong className={styles.productName}>
                    X-Ray Diagnosis Guide
                  </strong>
                  <span className={styles.productMeta}>
                    Practical Guide • Digital PDF • 2026 Edition
                  </span>
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
          </div>

          {/* Right: form */}
          <div className={styles.formColumn}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <span className={styles.discountBadge}>
                  🔥 Launch Price — ₹{PRICE} Only
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
                <h2 className={styles.formHeaderTitle}>Complete your order</h2>
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
                    ⚡ Add Clinical Lab Test Master Guide – Just ₹99!
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
                      🏷️ 90% OFF: <s>₹999</s> → Just <strong>₹99</strong>
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
                  className={styles.payBtn}
                  disabled={loading}
                  onClick={handleButtonClick}
                >
                  {loading ? (
                    "Initiating payment…"
                  ) : (
                    <>
                      <span>🔒 Pay ₹{total} &amp; Get Instant Access</span>
                    </>
                  )}
                </button>

                <ul className={styles.trustStrip}>
                  {trustPoints.map(({ icon: Icon, text }) => (
                    <li key={text}>
                      <Icon size={16} /> <span>{text}</span>
                    </li>
                  ))}
                </ul>

                <p className={styles.payNote}>
                  <ShieldCheck size={14} /> Card, UPI &amp; net-banking details
                  are handled securely by Razorpay — never stored by us.
                </p>

                <Image
                  src={trustBadges}
                  alt="Secure checkout, privacy protected and satisfaction guaranteed"
                  className={styles.razorpayLogo}
                  sizes="(max-width: 640px) 90vw, 380px"
                />
              </form>

              <div className={styles.guarantee}>
                <BadgeCheck size={20} />
                <div>
                  <strong>✓ Instant Delivery</strong>
                  <p>
                    Your PDF is delivered immediately after payment and emailed
                    to you.
                  </p>
                  <p className={styles.guaranteeHelp}>
                    Need help? Contact{" "}
                    <a href="mailto:support@nokrimitra.in">
                      support@nokrimitra.in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
