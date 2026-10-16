"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Nunito, Poppins } from "next/font/google";
import Image from "next/image";
import { ArrowRight, Check, CheckCircle2, Lock, Mail, Phone, X } from "lucide-react";

import { MEDICAL_CATALOG } from "@/lib/medicalMasterbookCatalog";
import {
  MEDICAL_GA_ITEM,
  trackMedicalGaEvent,
  trackMedicalMetaEvent,
} from "@/lib/medicalMasterbookTracking";
import cashfreeLogo from "@/public/cashfree-logo.png";
import styles from "./checkout.module.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

// Same heading font as the landing page title
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  variable: "--font-title",
});

type CashfreeFactory = (opts: { mode: string }) => {
  checkout: (opts: { paymentSessionId: string; redirectTarget?: string }) => Promise<unknown>;
};

function loadCashfree(): Promise<CashfreeFactory | null> {
  return new Promise((resolve) => {
    const w = window as unknown as { Cashfree?: CashfreeFactory };
    if (w.Cashfree) {
      resolve(w.Cashfree);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = () => resolve((window as unknown as { Cashfree?: CashfreeFactory }).Cashfree || null);
    script.onerror = () => resolve(null);
    document.body.appendChild(script);
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[6-9]\d{9}$/;
const ADDON_PRICE = 99;
const ADDON_MRP = 499;

const formatInr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function MedicalCheckoutPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addonSelected, setAddonSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Show field-level errors only after the user leaves the box (or submits)
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const total = MEDICAL_CATALOG.price + (addonSelected ? ADDON_PRICE : 0);
  const totalMrp = MEDICAL_CATALOG.mrp + (addonSelected ? ADDON_MRP : 0);

  const emailValid = EMAIL_RE.test(email.trim());
  const phoneValid = PHONE_RE.test(phone);
  const emailError = emailTouched && !emailValid;
  const phoneError = phoneTouched && !phoneValid;

  // Cashfree return route sends the user back here with ?payment_status=failed|cancelled
  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get("payment_status");
    if (status === "failed") {
      setError(
        "Payment failed. If your money was deducted, it will be refunded within 5-7 working days. You can try again."
      );
    } else if (status === "cancelled") {
      setError("Payment was cancelled or could not be completed. Please try again.");
    }
    if (status) {
      // Remove the flag so a refresh doesn't show the message again
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // Browser "Back" from Cashfree can restore this page from cache with the
  // button still on "Processing...": reset it.
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setLoading(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  // Fire checkout events once (guard against React StrictMode double-run)
  const checkoutTracked = useRef(false);
  useEffect(() => {
    if (checkoutTracked.current) return;
    checkoutTracked.current = true;

    trackMedicalGaEvent("begin_checkout", {
      value: MEDICAL_CATALOG.price,
      currency: "INR",
      items: [{ ...MEDICAL_GA_ITEM, price: MEDICAL_CATALOG.price }],
    });
    trackMedicalMetaEvent("InitiateCheckout", {
      value: MEDICAL_CATALOG.price,
      currency: "INR",
      content_name: MEDICAL_CATALOG.name,
      content_type: "product",
    });
  }, []);

  const handleClose = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/medical-masterbook");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanPhone = phone.replace(/\D/g, "");

    setEmailTouched(true);
    setPhoneTouched(true);
    if (!EMAIL_RE.test(cleanEmail)) {
      document.getElementById("email")?.focus();
      return;
    }
    if (!PHONE_RE.test(cleanPhone)) {
      document.getElementById("phone")?.focus();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout/cashfree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: MEDICAL_CATALOG.product,
          name: "Customer",
          email: cleanEmail,
          phone: cleanPhone,
          addons: addonSelected ? ["opd-bundle"] : [],
          amount: total,
        }),
      });

      const order = await response.json();
      if (!response.ok) {
        throw new Error(order.error || "Order creation failed");
      }

      // Local testing without Cashfree keys: go straight to thank-you
      if (order.mock) {
        const query = new URLSearchParams({
          order_id: order.orderId,
          email: cleanEmail,
          amountPaid: String(order.amount || total),
          addons: addonSelected ? "opd-bundle" : "",
          mock: "true",
        });
        router.push(`/medical-masterbook/thank-you?${query.toString()}`);
        return;
      }

      const Cashfree = await loadCashfree();
      if (!Cashfree) {
        throw new Error("Payment gateway load nahi ho paya. Refresh karke try karein.");
      }

      const mode =
        process.env.NEXT_PUBLIC_CASHFREE_ENV === "SANDBOX" ? "sandbox" : "production";

      const checkoutItems = [
        { ...MEDICAL_GA_ITEM, price: MEDICAL_CATALOG.price },
        ...(addonSelected
          ? [
              {
                item_id: "opd-bundle",
                item_name: "OPD Mastery + Emergency Medicine Handbook",
                item_category: "Addon",
                price: ADDON_PRICE,
                quantity: 1,
              },
            ]
          : []),
      ];

      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(
        "event",
        "add_payment_info",
        {
          value: total,
          currency: "INR",
          payment_type: "cashfree",
          items: checkoutItems,
        }
      );

      trackMedicalMetaEvent("AddPaymentInfo", {
        value: total,
        currency: "INR",
        content_name: addonSelected
          ? "Medical Masterbook + OPD Bundle"
          : MEDICAL_CATALOG.name,
        content_type: "product",
      });

      const result = (await Cashfree({ mode }).checkout({
        paymentSessionId: order.paymentSessionId,
        redirectTarget: "_self",
      })) as { error?: { message?: string } } | undefined;

      if (result?.error) {
        throw new Error(
          result.error.message || "Failed to open payment page. Please try again."
        );
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.page} ${nunito.className} ${poppins.variable}`}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.headerTitle}>CHECKOUT</h1>
          <button
            type="button"
            onClick={handleClose}
            className={styles.closeBtn}
            aria-label="Back to Medical Masterbook"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSubmit} noValidate>
          <p className={styles.note}>
            Access link and order details will be delivered to your email.
          </p>

          {/* EMAIL */}
          <div className={styles.field}>
            <div
              className={`${styles.box} ${emailError ? styles.boxError : ""} ${
                email.length > 0 ? styles.filled : ""
              }`}
            >
              <Mail size={18} className={styles.fieldIcon} aria-hidden="true" />
              <label htmlFor="email" className={styles.floatLabel}>
                Email ID
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                disabled={loading}
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                required
                className={styles.input}
                aria-invalid={emailError}
                aria-describedby="email-help"
              />
              {emailValid && (
                <CheckCircle2 size={18} className={styles.okIcon} aria-label="Valid email" />
              )}
            </div>
            <p
              id="email-help"
              className={`${styles.help} ${emailError ? styles.helpError : ""}`}
            >
              {emailError
                ? "Please enter a valid email address (e.g. name@gmail.com)"
                : "Medical Masterbook will be delivered to this email"}
            </p>
          </div>

          {/* PHONE */}
          <div className={styles.field}>
            <div
              className={`${styles.box} ${styles.phoneBox} ${
                phoneError ? styles.boxError : ""
              } ${phone.length > 0 ? styles.filled : ""}`}
            >
              <Phone size={18} className={styles.fieldIcon} aria-hidden="true" />
              <span className={styles.countryCode}>+91</span>
              <label htmlFor="phone" className={styles.floatLabel}>
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                onBlur={() => setPhoneTouched(true)}
                disabled={loading}
                autoComplete="tel-national"
                required
                className={styles.input}
                aria-invalid={phoneError}
                aria-describedby="phone-help"
              />
              {phoneValid && (
                <CheckCircle2 size={18} className={styles.okIcon} aria-label="Valid phone" />
              )}
            </div>
            <p
              id="phone-help"
              className={`${styles.help} ${phoneError ? styles.helpError : ""}`}
            >
              {phoneError
                ? "Please enter a valid 10-digit mobile number"
                : "For payment confirmation & order updates"}
            </p>
          </div>

          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}

          {/* ORDER BUMP / UPSELL */}
          <div
            className={`${styles.bumpCard} ${addonSelected ? styles.bumpCardActive : ""}`}
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
            <div className={styles.bumpTop}>
              <Image
                src="/opd-bump-thumb.png"
                alt="OPD Mastery + Emergency Medicine Handbook"
                width={96}
                height={54}
                className={styles.bumpThumb}
                priority
              />
              <div className={styles.bumpTitle}>
                OPD Mastery E-Book + Emergency Medicine Handbook
              </div>
            </div>

            <div className={styles.bumpSubtitle}>
              2 Powerful Medical E-Books. Your Complete Medical Guide Offer — Just ₹99!
            </div>

            <div className={styles.bumpDesc}>
              For medical students, interns, and doctors.
            </div>

            <div className={styles.bumpPricing}>
              <span className={styles.bumpCurrentPrice}>₹99</span>
              <span className={styles.bumpOldPrice}>₹499</span>
            </div>

            <div
              className={styles.bumpPillBtn}
              onClick={(e) => {
                e.stopPropagation();
                setAddonSelected(!addonSelected);
              }}
            >
              <div
                className={`${styles.customCheckbox} ${
                  addonSelected ? styles.customCheckboxChecked : ""
                }`}
              >
                {addonSelected && <Check size={13} strokeWidth={3} />}
              </div>
              <span className={styles.bumpPillText}>
                YES GET BOTH E-BOOKS FOR ₹99
              </span>
            </div>
          </div>

          {/* SUMMARY */}
          <section className={styles.summary} aria-label="Order summary">
            <div className={styles.row}>
              <span>Medical Masterbook</span>
              <span>{formatInr(MEDICAL_CATALOG.price)}</span>
            </div>
            {addonSelected && (
              <div className={styles.row}>
                <span>OPD Mastery + Emergency Handbook</span>
                <span>{formatInr(ADDON_PRICE)}</span>
              </div>
            )}
            <div className={styles.row}>
              <span className={styles.mrp}>Total MRP</span>
              <span className={styles.mrp}>
                <s>{formatInr(totalMrp)}</s>
              </span>
            </div>
            <div className={`${styles.row} ${styles.totalRow}`}>
              <span>Amount to pay</span>
              <span>{formatInr(total)}</span>
            </div>
          </section>

          {/* SECURED BY CASHFREE */}
          <div className={styles.secureBox}>
            <div className={styles.secureRow}>
              <Lock size={15} className={styles.secureLock} aria-hidden="true" />
              <span>100% Safe &amp; Secure Payments by</span>
            </div>
            <Image
              src={cashfreeLogo}
              alt="Cashfree Payments"
              className={styles.secureLogo}
              priority
            />
            <p className={styles.secureSub}>UPI • Google Pay • PhonePe • Paytm • Cards</p>
          </div>

          {/* STICKY PAY BUTTON */}
          <aside className={styles.sticky} aria-label="Submit payment">
            <div className={styles.stickyInner}>
              <button
                type="submit"
                disabled={loading}
                className={styles.payBtn}
              >
                <span>
                  {loading
                    ? "Processing..."
                    : `Pay ${formatInr(total)} & Get Access`}
                </span>
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
}
