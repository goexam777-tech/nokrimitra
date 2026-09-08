"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  Lock,
  Mail,
  MessageCircle,
  Zap,
} from "lucide-react";

import opdHero from "@/public/opd.jpg";
import trustBadges from "@/public/trust.webp";
import styles from "./checkout.module.css";

const PRICE = 99;
const OLD_PRICE = 999;
const ADDON_ID = "emergency-handbook";
const ADDON_PRICE = 49;
const PRODUCT_NAME = "OPD Mastery E-book (2026 Edition)";
const PAYMENT_LABEL = "OPD Mastery E-book 2026";


const trustPoints = [
  { icon: Lock, text: "100% Secure Payment" },
  { icon: Zap, text: "Instant Delivery After Payment" },
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

export default function OpdCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Opt-in by choice: the buyer ticks the add-on when they want it.
  const [addonSelected, setAddonSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const total = PRICE + (addonSelected ? ADDON_PRICE : 0);

  const formStartedRef = useRef(false);

  const handleFormStart = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    if (typeof window !== "undefined") {
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      w.gtag?.("event", "form_start", {
        form_name: "opd_checkout_form",
      });
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
    router.push("/opd-mastery");
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
      const selectedAddons = addonSelected ? [ADDON_ID] : [];
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "opd",
          addons: selectedAddons,
          name,
          email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const orderTotal = Number(data.total ?? total);
      const orderAddons: string[] = Array.isArray(data.addons)
        ? data.addons
        : selectedAddons;
      const goThankYou = (extra: Record<string, string>) => {
        const q = new URLSearchParams({
          name,
          email,
          amountPaid: String(orderTotal),
          productName: PRODUCT_NAME,
          product: "opd",
          addons: orderAddons.join(","),
          ...extra,
        });
        router.push(`/opd-mastery/thank-you?${q.toString()}`);
      };

      if (data.mock) {
        if (typeof window !== "undefined") {
          const w = window as unknown as { gtag?: (...a: unknown[]) => void };
          w.gtag?.("event", "payment_redirect", {
            order_id: data.orderId,
            value: orderTotal,
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
        throw new Error("Could not load the secure payment window. Please retry.");

      if (typeof window !== "undefined") {
        const w = window as unknown as { gtag?: (...a: unknown[]) => void };
        w.gtag?.("event", "payment_redirect", {
          order_id: data.orderId,
          value: orderTotal,
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
        description: orderAddons.length
          ? `${PAYMENT_LABEL} + Emergency Medicine Handbook`
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
    <div className={styles.page}>
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
          {/* Left: product (unboxed) */}
          <div className={styles.productColumn}>
            <div className={styles.productHeader}>
              <div className={styles.coverContainer}>
                <Image
                  src={opdHero}
                  alt="OPD Mastery e-book cover"
                  fill
                  priority
                  className={styles.coverImg}
                />
              </div>
              <div className={styles.productInfo}>
                <strong className={styles.productName}>
                  OPD Mastery E-book
                </strong>
                <span className={styles.productMeta}>
                  60+ Common OPD Cases • Practical Reference • 2026 Edition
                </span>
              </div>
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
                  <span className={styles.priceSave}>Save 90%</span>
                </div>
                <div className={styles.oneTimeAccessNote}>
                  <span>One-time payment</span>
                  <span className={styles.dotSeparator}>•</span>
                  <span>Lifetime access</span>
                </div>
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
                  <label htmlFor="opd-name">Full Name</label>
                  <input
                    id="opd-name"
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
                  <label htmlFor="opd-email">Email Address</label>
                  <input
                    id="opd-email"
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

                <div className={styles.upsell}>
                  <label
                    className={styles.upsellToggle}
                    htmlFor="emergency-handbook-addon"
                  >
                    <input
                      id="emergency-handbook-addon"
                      type="checkbox"
                      checked={addonSelected}
                      onChange={(e) => setAddonSelected(e.target.checked)}
                      disabled={loading}
                    />
                    <span className={styles.upsellCheck} aria-hidden="true">
                      <Check size={15} strokeWidth={3} />
                    </span>
                    <span className={styles.upsellYes}>Yes! I Want this!</span>
                  </label>
                  <div className={styles.upsellBody}>
                    <strong>🚑 Emergency Medicine Handbook — ₹{ADDON_PRICE}</strong>
                    <ul className={styles.upsellList}>
                      <li>60+ Emergency Protocols</li>
                      <li>Medicine • Trauma • Obstetrics • Paediatrics</li>
                      <li>6-Step Management + Critical Red Flags</li>
                      <li>Essential Treatment & Admission Criteria</li>
                      <li>📥 Instant PDF Access</li>
                    </ul>
                  </div>
                </div>

                <div className={styles.summaryHead}>
                  <span>Item</span>
                  <span>Price</span>
                </div>

                <div className={styles.priceBreakdown}>
                  <div className={styles.priceRow}>
                    <span>OPD Mastery E-book</span>
                    <span>INR {PRICE}</span>
                  </div>
                  {addonSelected && (
                    <div className={styles.priceRow}>
                      <span>Emergency Medicine Handbook</span>
                      <span>+ INR {ADDON_PRICE}.00</span>
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
                      <Lock size={17} strokeWidth={2.2} />
                      <span>Pay ₹ {total} & Get Instant Access</span>
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

                <Image
                  src={trustBadges}
                  alt="Secure checkout, privacy protected and satisfaction guaranteed"
                  className={styles.razorpayLogo}
                  sizes="(max-width: 640px) 90vw, 380px"
                />

                <a
                  href="https://wa.me/919104826422?text=Hi%20NokriMitra%20Support,%20I%20have%20a%20query%20regarding%20OPD%20Mastery%20E-Book"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappSupportBtn}
                >
                  <MessageCircle size={17} className={styles.whatsappIcon} />
                  <span>WhatsApp Support: <strong>+91 9104826422</strong></span>
                </a>
              </form>

              <nav className={styles.legalNav} aria-label="Legal links">
                <a href="/opd-mastery/privacy-policy">Privacy</a>
                <a href="/opd-mastery/refund-policy">Refund</a>
                <a href="/opd-mastery/terms">Terms</a>
                <a href="/opd-mastery/disclaimer">Disclaimer</a>
              </nav>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
