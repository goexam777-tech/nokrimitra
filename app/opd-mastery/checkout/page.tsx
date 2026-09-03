"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Gift,
  Lock,
  Mail,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";

import opdHero from "@/public/opd.jpg";
import trustBadges from "@/public/trust.webp";
import styles from "./checkout.module.css";

const PRICE = 199;
const EXIT_PRICE = 149;
const OLD_PRICE = 999;
const ADDON_ID = "emergency-handbook";
const ADDON_PRICE = 49;
const PRODUCT_NAME = "OPD Mastery E-book (2026 Edition)";
const PAYMENT_LABEL = "OPD Mastery E-book 2026";

const included = [
  "60+ Common OPD Cases",
  "Ready-to-Use Prescription References",
  "Drug Choice, Dosage & Duration",
  "Red Flags + Referral Criteria",
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

export default function OpdCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Opt-in by choice: the buyer ticks the add-on when they want it.
  const [addonSelected, setAddonSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const total = PRICE + (addonSelected ? ADDON_PRICE : 0);

  // Exit-Intent Recovery Offer State (₹149 bundle)
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitTimer, setExitTimer] = useState(600); // 10 minutes urgency
  const [exitLoading, setExitLoading] = useState(false);
  const [exitError, setExitError] = useState("");
  const hasTriggeredExitOfferRef = useRef(false);

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

    // Browser back button trap for Exit-Intent
    if (typeof window !== "undefined") {
      window.history.pushState({ page: "opd-checkout" }, "", window.location.href);
    }

    const onPopState = () => {
      if (!hasTriggeredExitOfferRef.current) {
        hasTriggeredExitOfferRef.current = true;
        if (typeof window !== "undefined") {
          window.history.pushState({ page: "opd-checkout" }, "", window.location.href);
        }
        setShowExitModal(true);
        if (typeof window !== "undefined") {
          const gw = window as unknown as { gtag?: (...a: unknown[]) => void };
          gw.gtag?.("event", "exit_offer_shown", {
            product_name: PRODUCT_NAME,
            offer_price: EXIT_PRICE,
          });
        }
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Countdown timer for exit offer modal
  useEffect(() => {
    if (!showExitModal) return;
    const t = setInterval(() => {
      setExitTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [showExitModal]);

  const handleBack = () => {
    if (!hasTriggeredExitOfferRef.current) {
      hasTriggeredExitOfferRef.current = true;
      setShowExitModal(true);
      if (typeof window !== "undefined") {
        const w = window as unknown as { gtag?: (...a: unknown[]) => void };
        w.gtag?.("event", "exit_offer_shown", {
          product_name: PRODUCT_NAME,
          offer_price: EXIT_PRICE,
        });
      }
      return;
    }
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/opd-mastery");
  };

  const handleExitDecline = () => {
    setShowExitModal(false);
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

  const handleExitPay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setExitError("Please enter your name and email to proceed.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setExitError("Please enter a valid email address (e.g. name@gmail.com).");
      return;
    }

    if (typeof window !== "undefined") {
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      w.gtag?.("event", "exit_offer_submit", {
        product_name: PRODUCT_NAME,
        value: EXIT_PRICE,
        currency: "INR",
      });
    }

    setExitLoading(true);
    setExitError("");

    try {
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "opd",
          offer: "exit149",
          addons: [ADDON_ID],
          name: name.trim(),
          email: email.trim().toLowerCase(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const goExitThankYou = (extra: Record<string, string>) => {
        const q = new URLSearchParams({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          amountPaid: String(EXIT_PRICE),
          productName: PRODUCT_NAME,
          product: "opd",
          addons: ADDON_ID,
          ...extra,
        });
        router.push(`/opd-mastery/thank-you?${q.toString()}`);
      };

      if (data.mock) {
        if (typeof window !== "undefined") {
          const w = window as unknown as { gtag?: (...a: unknown[]) => void };
          w.gtag?.("event", "payment_redirect", {
            order_id: data.orderId,
            value: EXIT_PRICE,
            currency: "INR",
          });
        }
        setTimeout(
          () => goExitThankYou({ orderId: data.orderId, mock: "true" }),
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
          value: EXIT_PRICE,
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
        description: "OPD Mastery + Free Emergency Handbook (Special Offer)",
        order_id: data.orderId,
        handler: (r: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) =>
          goExitThankYou({
            razorpay_payment_id: r.razorpay_payment_id,
            razorpay_order_id: r.razorpay_order_id,
            razorpay_signature: r.razorpay_signature,
          }),
        prefill: { name: name.trim(), email: email.trim() },
        theme: { color: "#28A745" },
        modal: { ondismiss: () => setExitLoading(false) },
      });
      rzp.open();
    } catch (err) {
      setExitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or refresh."
      );
      setExitLoading(false);
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
          {/* Left: product + trust */}
          <div className={styles.productColumn}>
            <div className={styles.productCard}>
              <div className={styles.productCardTop}>
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
                      <li>Essential Treatment &amp; Admission Criteria</li>
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
                      <span>🔒 Get Instant Access - ₹{total}</span>
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
                    Your PDF is delivered immediately after payment and emailed to you.
                  </p>
                  <p className={styles.guaranteeHelp}>
                    Need help? Contact{" "}
                    <a href="mailto:support@nokrimitra.in">
                      support@nokrimitra.in
                    </a>
                  </p>
                </div>
              </div>

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

      {showExitModal && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowExitModal(false);
          }}
        >
          <div className={styles.modalCard}>
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setShowExitModal(false)}
              aria-label="Close special offer"
            >
              <X size={16} />
            </button>

            <div className={styles.modalBody}>
              <div className={styles.modalHeader}>
                <div className={styles.exitBadge}>
                  <Gift size={13} /> Exclusive One-Time Offer
                </div>
                <h3 id="exit-modal-title" className={styles.exitHeading}>
                  Wait! Don&apos;t Leave Empty Handed
                </h3>
                <p className={styles.exitSub}>
                  Get the complete <strong>OPD Mastery Guide</strong> plus the{" "}
                  <strong>Emergency Medicine Handbook</strong> at our lowest price ever.
                </p>

                <div className={styles.exitTimerBar}>
                  <Clock size={14} />
                  <span>
                    Special offer expires in:{" "}
                    <strong>
                      {Math.floor(exitTimer / 60)}:
                      {String(exitTimer % 60).padStart(2, "0")}
                    </strong>
                  </span>
                </div>
              </div>

              <div className={styles.exitBundleCard}>
                <div className={styles.exitBundleItem}>
                  <div className={styles.exitItemTitle}>
                    <CheckCircle2 size={16} />
                    <span>OPD Mastery E-Book</span>
                  </div>
                  <span className={styles.exitItemPrice}>Worth ₹199</span>
                </div>
                <div className={styles.exitBundleItem}>
                  <div className={styles.exitItemTitle}>
                    <CheckCircle2 size={16} />
                    <span>🚑 Emergency Medicine Handbook</span>
                  </div>
                  <span className={styles.freePill}>FREE GIFT 🎁</span>
                </div>
              </div>

              <div className={styles.exitDealBar}>
                <div className={styles.exitOldPriceGroup}>
                  <span className={styles.exitOldLabel}>Total Value</span>
                  <span className={styles.exitOldValue}>₹248</span>
                </div>
                <div className={styles.exitNewPriceGroup}>
                  <span className={styles.exitNewLabel}>Today Only</span>
                  <div className={styles.exitNewValue}>₹{EXIT_PRICE}</div>
                </div>
              </div>

              <form onSubmit={handleExitPay} noValidate>
                {exitError && (
                  <div className={styles.errorBanner} role="alert">
                    {exitError}
                  </div>
                )}

                <div className={styles.exitFields}>
                  <input
                    type="text"
                    className={styles.exitInput}
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={exitLoading}
                    required
                  />
                  <input
                    type="email"
                    className={styles.exitInput}
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={exitLoading}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={styles.exitPayBtn}
                  disabled={exitLoading}
                >
                  {exitLoading ? (
                    "Initiating payment…"
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>Claim Complete Bundle - ₹{EXIT_PRICE}</span>
                    </>
                  )}
                </button>

                <div className={styles.exitTrustRow}>
                  <span>
                    <CheckCircle2 size={13} /> Instant PDF Access
                  </span>
                  <span>
                    <ShieldCheck size={13} /> 100% Secure Checkout
                  </span>
                </div>

                <div className={styles.exitDeclineWrap}>
                  <button
                    type="button"
                    className={styles.exitDeclineBtn}
                    onClick={handleExitDecline}
                  >
                    No thanks, I&apos;ll pass on this ₹149 deal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
