"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Infinity as InfinityIcon,
  Lock,
  Mail,
  Smartphone,
  Sparkles,
  Star,
  User,
} from "lucide-react";

import opdHero from "@/public/opd.jpg";
import razorpayLogo from "@/public/checkoutrazorpay.png";
import styles from "./checkout.module.css";

const PRICE = 199;
const OLD_PRICE = 1399;
const ADDON_ID = "emergency-handbook";
const ADDON_PRICE = 49;
const PRODUCT_NAME = "OPD Mastery E-book (2026 Edition)";
const PAYMENT_LABEL = "OPD Mastery E-book 2026";

const included = [
  "Comprehensive OPD Reference",
  "Practical & Evidence-Based",
  "Drug Dosages & Prescriptions",
  "Lifetime Access",
];

const highlights = [
  { title: "60+ OPD Cases", desc: "Quick reference for frequently seen clinical cases" },
  { title: "Ready Prescriptions", desc: "Drug choice, dosage and duration in one practical guide" },
  { title: "Instant Access", desc: "Download immediately after successful payment" },
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
  const [addonSelected, setAddonSelected] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const total = PRICE + (addonSelected ? ADDON_PRICE : 0);

  useEffect(() => {
    const w = window as unknown as {
      fbq?: (...a: unknown[]) => void;
      gtag?: (...a: unknown[]) => void;
    };
    w.fbq?.("track", "InitiateCheckout", {
      value: PRICE + ADDON_PRICE,
      currency: "INR",
      content_name: PRODUCT_NAME,
    });
    w.gtag?.("event", "begin_checkout", {
      value: PRICE + ADDON_PRICE,
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
      if (!ok) throw new Error("Could not load the secure payment window. Please retry.");

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
        theme: { color: "#136fd1" },
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
      {/* Top Header */}
      <header className={styles.topBar}>
        <div className={styles.topBarInner}>
          <button type="button" className={styles.backBtn} onClick={handleBack}>
            <ArrowLeft size={16} /> Back to Overview
          </button>

          <div className={styles.brandWrap}>
            <span className={styles.brand}>
              Nokri<span>Mitra</span>
            </span>
            <span className={styles.medicalBadge}>
              <Award size={12} /> Clinical Guide
            </span>
          </div>

          <div className={styles.secureTag}>
            <Lock size={13} /> Secure checkout
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={styles.wrap}>
        <div className={styles.grid}>
          {/* Left Column: Product Info & Social Proof */}
          <div className={styles.productColumn}>
            <div className={styles.productCard}>
              <div className={styles.editionPill}>
                <Sparkles size={13} /> OPD Mastery · 2026 Edition
              </div>
              <h1 className={styles.productTitle}>Complete OPD Guide E-Book</h1>
              <p className={styles.productSub}>
                Master Common OPD Cases with Confidence.
              </p>

              <div className={styles.ratingBar}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" stroke="none" />
                  ))}
                </div>
                <span className={styles.ratingText}>4.9/5.0</span>
                <span className={styles.ratingSub}>
                  (Trusted by 4,520+ Doctors & Practitioners)
                </span>
              </div>

              {/* Book Cover + High-level highlights */}
              <div className={styles.visualRow}>
                <div className={styles.coverContainer}>
                  <Image
                    src={opdHero}
                    alt="OPD Mastery Book Cover"
                    fill
                    priority
                    className={styles.coverImg}
                  />
                </div>
                <div className={styles.highlightsList}>
                  <strong className={styles.mobileProductTitle}>
                    OPD Mastery E-book
                  </strong>
                  {highlights.map((h, idx) => (
                    <div key={idx} className={styles.highlightItem}>
                      <CheckCircle2 size={18} className={styles.highlightIcon} />
                      <div>
                        <strong>{h.title}:</strong> {h.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.divider} />

              <h2 className={styles.includedHeader}>What You Get Instantly</h2>
              <ul className={styles.includedGrid}>
                {included.map((item) => (
                  <li key={item}>
                    <Check size={16} strokeWidth={3} /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial Quote */}
            <div className={styles.quoteCard}>
              <p className={styles.quoteText}>
                &ldquo;Downloaded this e-book right before my first emergency OPD duty. Prescriptions, drug dosages, and red flags are explained so clearly. A must-have for every RMO!&rdquo;
              </p>
              <div className={styles.quoteAuthor}>
                <div className={styles.avatar}>DR</div>
                <div className={styles.authorDetails}>
                  <span className={styles.authorName}>Dr. Rohit Sharma, MBBS</span>
                  <span className={styles.authorMeta}>Resident Medical Officer · Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High Converting Form */}
          <div className={styles.formColumn}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <span className={styles.discountBadge}>
                  🔥 Limited-Time Launch Price
                </span>
                <div className={styles.pricePill}>
                  <span className={styles.priceOriginal}>₹{OLD_PRICE}</span>
                  <span className={styles.priceCurrent}>₹{PRICE}</span>
                </div>
                <h2 className={styles.formHeaderTitle}>Complete Your Secure Order</h2>
                <p className={styles.formHeaderSub}>
                  Instant access — download in seconds after checkout
                </p>
              </div>

              <form className={styles.form} onSubmit={handlePay} noValidate>
                {error && (
                  <div className={styles.errorBanner} role="alert">
                    {error}
                  </div>
                )}

                <div className={styles.field}>
                  <label htmlFor="opd-name">Full Name (Dr. / Mr. / Ms.)</label>
                  <div className={styles.inputWrap}>
                    <User size={18} className={styles.inputIcon} />
                    <input
                      id="opd-name"
                      type="text"
                      autoComplete="name"
                      placeholder="First Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="opd-email">Email Address</label>
                  <div className={styles.inputWrap}>
                    <Mail size={18} className={styles.inputIcon} />
                    <input
                      id="opd-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="Email ID"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                  <span className={styles.fieldHelp}>
                    PDF download link will be sent directly to this email.
                  </span>
                </div>

                <div className={styles.upsell}>
                  <div className={styles.upsellTop}>
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
                    <span className={styles.upsellPrice}>
                      <s>₹499</s><b>₹{ADDON_PRICE}</b>
                    </span>
                  </div>

                  <div className={styles.upsellBody}>
                    <span className={styles.upsellKicker}>
                      Special One Time Offer, Regularly ₹499!
                    </span>
                    <strong>🚑 Emergency Medicine Handbook — Only ₹{ADDON_PRICE}</strong>
                    <p>Be prepared for every emergency with this practical clinical handbook.</p>
                    <ul>
                      <li><Check size={13} /> <b>60+ emergency protocols</b> in one PDF</li>
                      <li><Check size={13} /> Covers medicine, trauma, obstetrics &amp; paediatrics</li>
                      <li><Check size={13} /> <b>6-step management format</b> for quick decisions</li>
                      <li><Check size={13} /> First 30 seconds &amp; first 5 minutes management</li>
                      <li><Check size={13} /> Exact medicines, treatment &amp; admission criteria</li>
                      <li><Check size={13} /> Critical red flags you should never miss</li>
                      <li><Check size={13} /> For MBBS students, interns, doctors &amp; nurses</li>
                    </ul>
                    <small>📥 <b>Instant PDF access after payment</b></small>
                    <p className={styles.upsellGift}>
                      🎁 Add this exclusive handbook today for just ₹{ADDON_PRICE}!
                    </p>
                    <p className={styles.upsellLimit}>
                      <b>LIMITED OFFER:</b> Available only with this order.
                    </p>
                  </div>
                </div>

                <div className={styles.summaryHead}>
                  <span>Item</span><span>Price</span>
                </div>
                <div className={styles.pricingChoice}>
                  <span className={styles.radioDot} aria-hidden="true" />
                  <span className={styles.pricingChoiceCopy}>
                    <strong>One Time Fee Pricing</strong>
                    <small>One-time payment</small>
                  </span>
                  <span className={styles.pricingChoicePrice}>
                    <strong><i>INR</i> {PRICE}</strong>
                    <small>one-time</small>
                  </span>
                </div>

                <div className={styles.priceBreakdown}>
                  <div className={styles.priceRow}>
                    <span>OPD Guide</span>
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
                  <strong><i>INR</i> {total}.00</strong>
                </div>

                <div className={styles.paymentMethods}>
                  <span className={styles.paymentLabel}>Pay via</span>
                  <span className={styles.payVia}>
                    <i aria-hidden="true" /> Razorpay
                  </span>
                  <div className={styles.paymentIcons}>
                    <Image
                      src={razorpayLogo}
                      alt="Razorpay secure payments"
                      className={styles.razorpayLogo}
                      sizes="(max-width: 640px) 90vw, 410px"
                    />
                  </div>
                </div>

                <button type="submit" className={styles.payBtn} disabled={loading}>
                  {loading ? (
                    "Initiating Payment..."
                  ) : (
                    <>
                      Complete Order <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className={styles.assuranceGrid}>
                <div className={styles.assuranceItem}>
                  <Download size={16} /> Instant PDF Access
                </div>
                <div className={styles.assuranceItem}>
                  <Mail size={16} /> Download Link by Email
                </div>
                <div className={styles.assuranceItem}>
                  <Smartphone size={16} /> Mobile & Tablet Ready
                </div>
                <div className={styles.assuranceItem}>
                  <InfinityIcon size={16} /> Lifetime Download
                </div>
              </div>

              <nav className={styles.legalNav} aria-label="Legal links">
                <a href="/opd-mastery/privacy-policy">Privacy Policy</a>
                <a href="/opd-mastery/refund-policy">Refund Policy</a>
                <a href="/opd-mastery/terms">Terms & Conditions</a>
                <a href="/opd-mastery/disclaimer">Disclaimer</a>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
