"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";

import opdHero from "@/public/opdmastery.webp";
import styles from "./checkout.module.css";

const BASE_PRICE = 149;
const OLD_PRICE = 999;
const ADDON_ID = "emergency-handbook";
const ADDON_PRICE = 49;
const PRODUCT_NAME = "OPD Mastery E-Book (2026 Edition)";

function loadCashfree(): Promise<unknown> {
  return new Promise((resolve) => {
    if (
      typeof window !== "undefined" &&
      (window as unknown as { Cashfree?: unknown }).Cashfree
    ) {
      resolve((window as unknown as { Cashfree?: unknown }).Cashfree);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    s.onload = () =>
      resolve((window as unknown as { Cashfree?: unknown }).Cashfree);
    s.onerror = () => resolve(null);
    document.body.appendChild(s);
  });
}

function OpdEbookCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment_status");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addonSelected, setAddonSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    paymentStatus === "cancelled"
      ? "Payment was cancelled or incomplete. You can retry safely below."
      : ""
  );

  const total = BASE_PRICE + (addonSelected ? ADDON_PRICE : 0);
  const beginCheckoutFiredRef = useRef(false);

  // Restore saved name and email on load
  useEffect(() => {
    try {
      const savedName = sessionStorage.getItem("opd_name");
      const savedEmail = sessionStorage.getItem("opd_email");
      const savedPhone = sessionStorage.getItem("opd_phone");
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
      if (savedPhone) setPhone(savedPhone);
    } catch {
      // Storage unavailable
    }
  }, []);

  // GA4 / Meta Pixel begin checkout tracking
  useEffect(() => {
    if (beginCheckoutFiredRef.current) return;
    beginCheckoutFiredRef.current = true;

    const w = window as unknown as {
      fbq?: (...a: unknown[]) => void;
      gtag?: (...a: unknown[]) => void;
    };
    w.fbq?.("track", "InitiateCheckout", {
      value: BASE_PRICE,
      currency: "INR",
      content_name: PRODUCT_NAME,
    });
    w.gtag?.("event", "begin_checkout", {
      value: BASE_PRICE,
      currency: "INR",
      items: [{ item_name: PRODUCT_NAME, price: BASE_PRICE }],
    });
  }, []);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (phone.trim() && !/^[6-9]\d{9}$/.test(phone.trim())) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      sessionStorage.setItem("opd_name", name.trim());
      sessionStorage.setItem("opd_email", email.trim());
      if (phone.trim()) sessionStorage.setItem("opd_phone", phone.trim());
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
          product: "opd-ebook",
          productName: PRODUCT_NAME,
          addons: selectedAddons,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const orderTotal = Number(data.amount ?? total);

      // Mock mode for local testing without live Cashfree keys
      if (data.mock) {
        const q = new URLSearchParams({
          order_id: data.orderId,
          name: name.trim(),
          email: email.trim(),
          amountPaid: String(orderTotal),
          productName: PRODUCT_NAME,
          product: "opd-ebook",
          addons: selectedAddons.join(","),
          mock: "true",
        });
        setTimeout(() => {
          router.push(`/opd-mastery-ebook/thank-you?${q.toString()}`);
        }, 600);
        return;
      }

      const CashfreeSDK = await loadCashfree();
      if (!CashfreeSDK) {
        throw new Error(
          "Cashfree payment gateway failed to load. Please check your connection."
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
          }) => Promise<void>;
        }
      )({ mode: envMode });

      await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (err: unknown) {
      console.error("Payment initiation error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Minimal Header */}
      <header className={styles.header}>
        <Link href="/opd-mastery-ebook" className={styles.brand} title="Back to OPD Mastery">
          <ShieldCheck size={22} className={styles.brandIcon} />
          <span>OPD Mastery</span>
        </Link>
        <div className={styles.secureBadge}>
          <span className={styles.secureDot}></span>
          <Lock size={12} />
          <span>100% Secure Checkout</span>
        </div>
      </header>

      {/* Main Single Centered Card */}
      <div className={styles.checkoutCard}>
        {/* Top Guarantee Strip */}
        <div className={styles.topGuarantyBar}>
          <span className={styles.topGuarantyText}>⚡ Instant PDF Delivery on Email &amp; WhatsApp</span>
        </div>

        {/* Product Summary Bar */}
        <div className={styles.productBar}>
          <div className={styles.thumbWrapper}>
            <Image
              src={opdHero}
              alt="OPD Mastery E-Book Cover"
              className={styles.productThumb}
              width={64}
              height={82}
              priority
            />
          </div>
          <div className={styles.productInfo}>
            <div className={styles.badgeRow}>
              <span className={styles.editionPill}>2026 Edition</span>
              <span className={styles.savePill}>85% OFF</span>
            </div>
            <h1 className={styles.productTitle}>OPD Mastery E-Book</h1>
            <p className={styles.productSubtitle}>Clinical Practice Guide • Instant PDF</p>
          </div>
          <div className={styles.priceCol}>
            <div className={styles.currentPrice}>₹{BASE_PRICE}</div>
            <div className={styles.oldPrice}>₹{OLD_PRICE}</div>
          </div>
        </div>

        {error && (
          <div className={styles.errorBanner} role="alert">
            <AlertCircle size={16} className={styles.errorIcon} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handlePay} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              <span>Full Name</span>
              <span className={styles.requiredMark}>*</span>
            </label>
            <div className={styles.inputWrap}>
              <User size={17} className={styles.inputIcon} />
              <input
                id="name"
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                disabled={loading}
                autoComplete="name"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>
              <span>Mobile Number</span>
              <span className={styles.fieldHint}>For WhatsApp PDF &amp; updates</span>
            </label>
            <div className={styles.inputWrap}>
              <Phone size={17} className={styles.inputIcon} />
              <input
                id="phone"
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className={styles.input}
                disabled={loading}
                autoComplete="tel"
                maxLength={10}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              <span>Email Address</span>
              <span className={styles.fieldHint}>Instant PDF delivery</span>
            </label>
            <div className={styles.inputWrap}>
              <Mail size={17} className={styles.inputIcon} />
              <input
                id="email"
                type="email"
                required
                placeholder="yourname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                disabled={loading}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Exact Reference Order Bump Box */}
          <div
            className={`${styles.bumpBox} ${
              addonSelected ? styles.bumpBoxActive : ""
            }`}
            onClick={() => setAddonSelected(!addonSelected)}
            role="checkbox"
            aria-checked={addonSelected}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                setAddonSelected(!addonSelected);
              }
            }}
          >
            <div className={styles.bumpTopRow}>
              <input
                type="checkbox"
                checked={addonSelected}
                onChange={(e) => setAddonSelected(e.target.checked)}
                className={styles.bumpCheckbox}
                onClick={(e) => e.stopPropagation()}
                id="upsell-checkbox"
              />
              <label htmlFor="upsell-checkbox" className={styles.bumpYellowPill} onClick={(e) => e.stopPropagation()}>
                Yes! I Want this!
              </label>
            </div>

            <div className={styles.bumpTitleRow}>
              <span className={styles.bumpTitle}>
                🚑 Emergency Medicine Handbook — <span className={styles.bumpPrice}>₹49</span>
              </span>
            </div>

            <ul className={styles.bumpList}>
              <li>
                <span className={styles.bumpCheck}>✓</span>
                <span><strong>60+ Emergency Protocols</strong></span>
              </li>
              <li>
                <span className={styles.bumpCheck}>✓</span>
                <span>Medicine • Trauma • Obstetrics • Paediatrics</span>
              </li>
              <li>
                <span className={styles.bumpCheck}>✓</span>
                <span><strong>6-Step Management</strong> + Critical Red Flags</span>
              </li>
              <li>
                <span className={styles.bumpCheck}>✓</span>
                <span>Essential Treatment &amp; Admission Criteria</span>
              </li>
            </ul>

            <div className={styles.bumpFooter}>
              <span className={styles.bumpPdfIcon}>📥</span>
              <span className={styles.bumpPdfText}>Instant PDF Access</span>
            </div>
          </div>

          {/* Exact Reference Price Table */}
          <div className={styles.priceTableSection}>
            <div className={styles.priceTableHeader}>
              <span className={styles.priceHeaderItem}>Item</span>
              <span className={styles.priceHeaderPrice}>Price</span>
            </div>

            <div className={styles.priceItemCard}>
              <span className={styles.priceItemName}>OPD Mastery E-book</span>
              <span className={styles.priceItemVal}>INR {BASE_PRICE}</span>
            </div>

            {addonSelected && (
              <div className={`${styles.priceItemCard} ${styles.priceItemAddon}`}>
                <span className={styles.priceItemName}>Emergency Medicine Handbook</span>
                <span className={styles.priceItemVal}>INR {ADDON_PRICE}</span>
              </div>
            )}

            <div className={styles.priceTotalCard}>
              <span className={styles.priceTotalLabel}>TOTAL</span>
              <div className={styles.priceTotalValWrap}>
                <span className={styles.priceTotalCurrency}>INR</span>
                <span className={styles.priceTotalNum}>{total}.00</span>
              </div>
            </div>
          </div>

          {/* Big Green Pay Button */}
          <button type="submit" className={styles.payBtn} disabled={loading}>
            {loading ? (
              <span className={styles.loadingText}>
                <span className={styles.spinner}></span>
                Connecting to Secure Gateway...
              </span>
            ) : (
              <>
                <Lock size={18} className={styles.btnLockIcon} />
                <span className={styles.payBtnText}>Pay ₹{total} &amp; Download Instantly</span>
                <ArrowRight size={18} className={styles.btnArrowIcon} />
              </>
            )}
          </button>
        </form>

        {/* Minimal Guarantees */}
        <div className={styles.trustGuarantees}>
          <div className={styles.trustItem}>
            <Zap size={14} className={styles.trustIcon} />
            <span>Instant Download</span>
          </div>
          <div className={styles.trustItem}>
            <CheckCircle2 size={14} className={styles.trustIcon} />
            <span>Lifetime Access</span>
          </div>
          <div className={styles.trustItem}>
            <ShieldCheck size={14} className={styles.trustIcon} />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className={styles.payLogos}>
          <span className={styles.logoPill}>Google Pay</span>
          <span className={styles.logoPill}>PhonePe</span>
          <span className={styles.logoPill}>Paytm</span>
          <span className={styles.logoPill}>UPI</span>
          <span className={styles.logoPill}>Cards</span>
          <span className={styles.logoPill}>NetBanking</span>
        </div>
      </div>

      {/* WhatsApp Help */}
      <div className={styles.helpLink}>
        Need help with your order?{" "}
        <a
          href="https://wa.me/919104826422?text=Hello%20Support,%20I%20need%20help%20with%20my%20OPD%20Mastery%20E-Book%20checkout."
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat on WhatsApp Support →
        </a>
      </div>
    </div>
  );
}

export default function OpdEbookCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            background: "#f8fafc",
            color: "#64748b",
          }}
        >
          <p>Loading secure checkout...</p>
        </div>
      }
    >
      <OpdEbookCheckoutContent />
    </Suspense>
  );
}
