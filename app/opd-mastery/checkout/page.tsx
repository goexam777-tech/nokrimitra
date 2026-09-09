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
  { icon: Lock, text: "Secured by Razorpay (UPI, Cards, NetBanking)" },
  { icon: Zap, text: "Instant PDF Download After Payment" },
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
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
  const conciergeRef = useRef<HTMLAnchorElement>(null);
  const [isConciergeInView, setIsConciergeInView] = useState(false);

  useEffect(() => {
    const el = conciergeRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsConciergeInView(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      const res = await fetch("/api/checkout/razorpay", {
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

      const orderTotal = Number(data.total ?? total);

      if (typeof window !== "undefined") {
        const w = window as unknown as { gtag?: (...a: unknown[]) => void };
        w.gtag?.("event", "payment_redirect", {
          order_id: data.orderId,
          value: orderTotal,
          currency: "INR",
        });
      }

      const goThankYou = (extra: Record<string, string>) => {
        const q = new URLSearchParams({
          order_id: data.orderId,
          razorpay_order_id: data.orderId,
          name: name.trim(),
          email: email.trim(),
          amountPaid: String(orderTotal),
          productName: PRODUCT_NAME,
          product: "opd",
          addons: selectedAddons.join(","),
          ...extra,
        });
        router.push(`/opd-mastery/thank-you?${q.toString()}`);
      };

      // Mock mode for local dev without live Razorpay keys
      if (data.mock) {
        setTimeout(() => {
          goThankYou({ mock: "true" });
        }, 800);
        return;
      }

      const ok = await loadRazorpay();
      if (!ok) {
        throw new Error(
          "Could not load the secure payment gateway. Please refresh and try again."
        );
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
        description: PRODUCT_NAME,
        order_id: data.orderId,
        handler: (r: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          goThankYou({
            razorpay_payment_id: r.razorpay_payment_id,
            razorpay_order_id: r.razorpay_order_id,
            razorpay_signature: r.razorpay_signature,
          });
        },
        prefill: {
          name: name.trim(),
          email: email.trim(),
        },
        theme: { color: "#059669" },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
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
                  ref={conciergeRef}
                  href="https://wa.me/919104826422?text=Hello!%20I%20have%20a%20question%20regarding%20the%20OPD%20Mastery%20checkout."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.waConcierge} ${isConciergeInView ? styles.waConciergeDocked : ""}`}
                  aria-label="Chat with WhatsApp Support"
                >
                  <div className={styles.waAvatar}>
                    <WhatsAppIcon className={styles.waIconSvg} />
                    <span className={styles.waStatusDot} aria-hidden="true" />
                  </div>
                  <div className={styles.waInfo}>
                    <span className={styles.waHeading}>Need Help? Chat on WhatsApp</span>
                    <span className={styles.waSub}>
                      +91 91048 26422 <span className={styles.waDot}>•</span> Quick reply
                    </span>
                  </div>
                  <div className={styles.waArrowCircle} aria-hidden="true">
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </div>
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

      {/* Floating WhatsApp button at bottom-left, smoothly docks into form on scroll */}
      <a
        href="https://wa.me/919104826422?text=Hello!%20I%20have%20a%20question%20regarding%20the%20OPD%20Mastery%20checkout."
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.floatWhatsAppLeft} ${isConciergeInView ? styles.floatWhatsAppHidden : ""}`}
        aria-label="Chat on WhatsApp Support"
      >
        <WhatsAppIcon className={styles.floatWaIcon} />
      </a>
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
