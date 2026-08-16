"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import opdHero from "@/public/opd.jpg";
import trustBadges from "@/public/trust.webp";
import styles from "./checkout.module.css";

const PRICE = 199;
const OLD_PRICE = 999;
const ADDON_ID = "emergency-handbook";
const ADDON_PRICE = 49;
const PRODUCT_NAME = "OPD Mastery E-book (2026 Edition)";
const PAYMENT_LABEL = "OPD Mastery E-book 2026";

const included = [
  "60+ Common OPD Cases",
  "Ready-to-Use Prescriptions",
  "Drug Choice, Dosage & Duration",
  "Red Flags & Referral Criteria",
  "Instant PDF + Email Delivery",
  "Lifetime Access",
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

export default function OpdCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Opt-in by choice: the buyer ticks the add-on when they want it.
  const [addonSelected, setAddonSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const total = PRICE + (addonSelected ? ADDON_PRICE : 0);

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
        setTimeout(
          () => goThankYou({ orderId: data.orderId, mock: "true" }),
          1000
        );
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
          {/* Left: product + trust */}
          <div className={styles.productColumn}>
            <div className={styles.productCard}>
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
                  Digital PDF · 2026 Edition
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

          {/* Right: form */}
          <div className={styles.formColumn}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <span className={styles.discountBadge}>
                  🔥 Limited-time launch price
                </span>
                <div className={styles.pricePill}>
                  <span className={styles.priceOriginal}>₹{OLD_PRICE}</span>
                  <span className={styles.priceCurrent}>₹{PRICE}</span>
                  <span className={styles.priceSave}>Save 80%</span>
                </div>
                <h2 className={styles.formHeaderTitle}>Complete your order</h2>
                <p className={styles.formHeaderSub}>
                  Instant download in seconds after checkout
                </p>
              </div>

              <form className={styles.form} onSubmit={handlePay} noValidate>
                {error && (
                  <div className={styles.errorBanner} role="alert">
                    {error}
                  </div>
                )}

                <div className={styles.field}>
                  <label htmlFor="opd-name">Full name</label>
                  <input
                    id="opd-name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Dr. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="opd-email">Email address</label>
                  <input
                    id="opd-email"
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
                >
                  {loading ? (
                    "Initiating payment…"
                  ) : (
                    <>
                      <Lock size={17} />
                      <span>Pay ₹{total} &nbsp;&amp;&nbsp; Download</span>
                    </>
                  )}
                </button>

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

              <ul className={styles.trustStrip}>
                {trustPoints.map(({ icon: Icon, text }) => (
                  <li key={text}>
                    <Icon size={15} /> {text}
                  </li>
                ))}
              </ul>

              <div className={styles.guarantee}>
                <BadgeCheck size={20} />
                <p>
                  <strong>Instant delivery guarantee.</strong> Your download
                  appears right after payment and is emailed to you. Any problem?
                  Write to{" "}
                  <a href="mailto:support@nokrimitra.in">
                    support@nokrimitra.in
                  </a>
                  .
                </p>
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
    </div>
  );
}
