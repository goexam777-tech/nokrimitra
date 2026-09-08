"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Lock,
  Mail,
  MessageCircle,
  Zap,
} from "lucide-react";

import opdHero from "@/public/opd.jpg";
import styles from "./checkout.module.css";

const PRICE = 99;
const OLD_PRICE = 999;
const ADDON_ID = "emergency-handbook";
const ADDON_PRICE = 49;
const PRODUCT_NAME = "OPD Mastery E-book (2026 Edition)";

const trustPoints = [
  { icon: Lock, text: "100% Secure Payment" },
  { icon: Zap, text: "Instant Delivery After Payment" },
];

function loadCashfree(): Promise<unknown> {
  return new Promise((resolve) => {
    if (
      typeof window !== "undefined" &&
      (window as unknown as { Cashfree?: unknown }).Cashfree
    ) {
      resolve((window as unknown as { Cashfree: unknown }).Cashfree);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    s.onload = () => {
      const cf = (window as unknown as { Cashfree?: unknown }).Cashfree;
      resolve(cf || null);
    };
    s.onerror = () => resolve(null);
    document.body.appendChild(s);
  });
}

function OpdCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment_status");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Opt-in by choice: the buyer ticks the add-on when they want it.
  const [addonSelected, setAddonSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const total = PRICE + (addonSelected ? ADDON_PRICE : 0);

  const formStartedRef = useRef(false);

  // Restore saved name and email on load
  useEffect(() => {
    try {
      const savedName = sessionStorage.getItem("opd_name");
      const savedEmail = sessionStorage.getItem("opd_email");
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
    } catch {
      // Storage unavailable
    }
  }, []);

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

    try {
      sessionStorage.setItem("opd_name", name.trim());
      sessionStorage.setItem("opd_email", email.trim());
    } catch {
      // Storage unavailable
    }

    setLoading(true);
    setError("");

    try {
      const selectedAddons = addonSelected ? [ADDON_ID] : [];
      const res = await fetch("/api/checkout/cashfree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "opd",
          addons: selectedAddons,
          name: name.trim(),
          email: email.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const orderTotal = Number(data.amount ?? total);

      if (typeof window !== "undefined") {
        const w = window as unknown as { gtag?: (...a: unknown[]) => void };
        w.gtag?.("event", "payment_redirect", {
          order_id: data.orderId,
          value: orderTotal,
          currency: "INR",
        });
      }

      // Mock mode for local dev without Cashfree keys
      if (data.mock) {
        const q = new URLSearchParams({
          order_id: data.orderId,
          name: name.trim(),
          email: email.trim(),
          amountPaid: String(orderTotal),
          productName: PRODUCT_NAME,
          product: "opd",
          addons: selectedAddons.join(","),
          mock: "true",
        });
        setTimeout(() => {
          router.push(`/opd-mastery/thank-you?${q.toString()}`);
        }, 800);
        return;
      }

      const CashfreeSDK = await loadCashfree();
      if (!CashfreeSDK) {
        throw new Error(
          "Could not load the secure payment gateway. Please refresh and try again."
        );
      }

      const envMode =
        process.env.NEXT_PUBLIC_CASHFREE_ENV === "SANDBOX"
          ? "sandbox"
          : "production";

      const cashfree = (
        CashfreeSDK as (opts: { mode: string }) => {
          checkout: (opts: {
            paymentSessionId: string;
            redirectTarget: string;
          }) => Promise<unknown>;
        }
      )({ mode: envMode });

      await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });
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
                <p className={styles.productTagline}>
                  Master Common OPD Cases with Confidence.
                </p>
                <ul className={styles.productFeatures}>
                  <li>Comprehensive OPD Reference</li>
                  <li>Practical & Evidence-Based</li>
                  <li>Drug Dosages & Prescriptions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className={styles.formColumn}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <span className={styles.discountBadge}>
                  🔥 Limited Time Launch Offer
                </span>
                <div className={styles.pricePill}>
                  <span className={styles.priceOriginal}>₹{OLD_PRICE}</span>
                  <span className={styles.priceCurrent}>₹{PRICE}</span>
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
                {paymentStatus === "cancelled" && !error && (
                  <div className={styles.cancelBanner} role="alert">
                    <AlertCircle size={16} />
                    <span>
                      Your previous payment was not completed or cancelled. You can retry now below.
                    </span>
                  </div>
                )}

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
                      <span>Complete Order</span>
                      <span className={styles.btnIconCircle} aria-hidden="true">
                        <ArrowRight size={14} strokeWidth={3.5} />
                      </span>
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

export default function OpdCheckout() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", background: "#191D33" }} />
      }
    >
      <OpdCheckoutContent />
    </Suspense>
  );
}
