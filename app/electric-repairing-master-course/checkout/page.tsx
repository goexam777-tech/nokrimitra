"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Nunito, Poppins } from "next/font/google";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Lock, Mail, Phone, X } from "lucide-react";

import { ELECTRIC_CATALOG } from "@/lib/electricCatalog";
import {
  ELECTRIC_GA_ITEM,
  trackElectricGaEvent,
  trackElectricMetaEvent,
} from "@/lib/electricTracking";
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

const formatInr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function ElectricCheckoutPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Show field-level errors only after the user leaves the box (or submits)
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const emailValid = EMAIL_RE.test(email.trim());
  const phoneValid = PHONE_RE.test(phone);
  const emailError = emailTouched && !emailValid;
  const phoneError = phoneTouched && !phoneValid;

  // Cashfree return route sends the user back here with ?payment_status=failed|cancelled
  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get("payment_status");
    if (status === "failed") {
      setError(
        "Payment fail ho gaya. Agar paise kat gaye hain to 5-7 din mein wapas aa jayenge. Aap dobara try kar sakte hain."
      );
    } else if (status === "cancelled") {
      setError("Payment complete nahi hua ya cancel ho gaya. Aap dobara try kar sakte hain.");
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

    trackElectricMetaEvent("InitiateCheckout", {
      value: ELECTRIC_CATALOG.price,
      currency: "INR",
      content_name: ELECTRIC_CATALOG.name,
      content_type: "product",
    });
    trackElectricGaEvent("begin_checkout", {
      value: ELECTRIC_CATALOG.price,
      currency: "INR",
      items: [{ ...ELECTRIC_GA_ITEM, price: ELECTRIC_CATALOG.price }],
    });
  }, []);

  const handleClose = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/electric-repairing-master-course");
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
      // Price is decided by the server from ELECTRIC_CATALOG, not by this request.
      const response = await fetch("/api/checkout/cashfree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: ELECTRIC_CATALOG.product,
          name: "Customer",
          email: cleanEmail,
          phone: cleanPhone,
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
          mock: "true",
        });
        router.push(`/electric-repairing-master-course/thank-you?${query.toString()}`);
        return;
      }

      const Cashfree = await loadCashfree();
      if (!Cashfree) {
        throw new Error("Payment gateway load nahi ho paya. Refresh karke try karein.");
      }

      const mode =
        process.env.NEXT_PUBLIC_CASHFREE_ENV === "SANDBOX" ? "sandbox" : "production";

      // User is about to leave for Cashfree: record the step (sent immediately,
      // gtag uses sendBeacon so it survives the redirect).
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(
        "event",
        "add_payment_info",
        {
          value: ELECTRIC_CATALOG.price,
          currency: "INR",
          payment_type: "cashfree",
          items: [{ ...ELECTRIC_GA_ITEM, price: ELECTRIC_CATALOG.price }],
        }
      );

      // Redirects to Cashfree; after payment Cashfree returns to
      // /api/checkout/cashfree/return -> electric thank-you page.
      const result = (await Cashfree({ mode }).checkout({
        paymentSessionId: order.paymentSessionId,
        redirectTarget: "_self",
      })) as { error?: { message?: string } } | undefined;

      // On success the page navigates away; we only get here with an SDK error.
      if (result?.error) {
        throw new Error(
          result.error.message || "Payment page khul nahi paya. Kripya dobara try karein."
        );
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Kuch gadbad ho gayi. Kripya punah koshish karein.");
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
            aria-label="Close checkout"
          >
            <X size={22} />
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <form id="checkout-form" onSubmit={handleSubmit} noValidate>
          <p className={styles.note}>
            Access to this purchase will be sent to this email
          </p>

          {/* EMAIL: floating label sits on the border line once focused / filled */}
          <div className={styles.field}>
            <div
              className={`${styles.box} ${emailError ? styles.boxError : ""} ${
                email ? styles.filled : ""
              }`}
            >
              <Mail size={18} className={styles.fieldIcon} aria-hidden="true" />
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                className={styles.input}
                disabled={loading}
                aria-invalid={emailError}
                aria-describedby="email-help"
              />
              <label htmlFor="email" className={styles.floatLabel}>
                Email Address *
              </label>
              {emailValid && (
                <CheckCircle2 size={18} className={styles.okIcon} aria-hidden="true" />
              )}
            </div>
            <p
              id="email-help"
              className={`${styles.help} ${emailError ? styles.helpError : ""}`}
            >
              {emailError
                ? "Sahi email likhein, jaise: name@gmail.com"
                : "Course link isi email par aayega"}
            </p>
          </div>

          {/* PHONE */}
          <div className={styles.field}>
            <div
              className={`${styles.box} ${styles.phoneBox} ${
                phoneError ? styles.boxError : ""
              } ${phone ? styles.filled : ""}`}
            >
              <Phone size={18} className={styles.fieldIcon} aria-hidden="true" />
              <span className={styles.countryCode}>+91</span>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                required
                maxLength={10}
                placeholder=" "
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                onBlur={() => setPhoneTouched(true)}
                className={styles.input}
                disabled={loading}
                aria-invalid={phoneError}
                aria-describedby="phone-help"
              />
              <label htmlFor="phone" className={styles.floatLabel}>
                Phone number *
              </label>
              {phoneValid && (
                <CheckCircle2 size={18} className={styles.okIcon} aria-hidden="true" />
              )}
            </div>
            <p
              id="phone-help"
              className={`${styles.help} ${phoneError ? styles.helpError : ""}`}
            >
              {phoneError
                ? `10 digit ka mobile number likhein (${phone.length}/10)`
                : "10 digit mobile number"}
            </p>
          </div>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <div className={styles.summary}>
            <div className={styles.row}>
              <span>Sub Total</span>
              <span>
                <s className={styles.mrp}>{formatInr(ELECTRIC_CATALOG.mrp)}</s>{" "}
                {formatInr(ELECTRIC_CATALOG.price)}
              </span>
            </div>
            <div className={`${styles.row} ${styles.totalRow}`}>
              <span>Total</span>
              <span>{formatInr(ELECTRIC_CATALOG.price)}</span>
            </div>
          </div>

          {/* TRUST: payment gateway badge */}
          <div className={styles.secureBox}>
            <div className={styles.secureRow}>
              <Lock size={15} className={styles.secureLock} aria-hidden="true" />
              <span>Secured by</span>
              <Image
                src={cashfreeLogo}
                alt="Cashfree Payments"
                className={styles.secureLogo}
                sizes="120px"
              />
            </div>
            <p className={styles.secureSub}>
              UPI · Debit / Credit Card · Net Banking · Wallets
            </p>
          </div>
        </form>
      </main>

      <div className={styles.sticky}>
        <div className={styles.stickyInner}>
          <button
            type="submit"
            form="checkout-form"
            className={styles.payBtn}
            disabled={loading}
          >
            <span>
              {loading
                ? "Processing..."
                : `Pay ${formatInr(ELECTRIC_CATALOG.price)} & Get Access`}
            </span>
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
