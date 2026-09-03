"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import trustImg from "@/public/trust.webp";
import {
  ArrowLeft,
  CheckCircle2,
  Gift,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import styles from "./checkout.module.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-norcet",
});

const BASE_PRICE = 149;
const OLD_PRICE = 1990;
const PRODUCT_NAME = "NORCET 11 Notes (700+ Pages PDF)";

const highlights = [
  "700+ Pages Complete NORCET 11 Notes PDF",
  "All 23 Core Topics (Med-Surg, Pharma, OBG, Peds, CHN, Fundamentals)",
  "Instant PDF Download sent to your Email",
  "Lifetime Access · Mobile & Print Friendly",
];

const includedBonuses = [
  "🥇 1,000+ Drug Notes & Nursing Mnemonics",
  "🥈 Nursing Clinical Skills Handbook",
  "🥉 Nursing Exam Master Bundle (10,000+ MCQs)",
];

function loadCashfree(): Promise<unknown> {
  return new Promise((resolve) => {
    if (
      typeof window !== "undefined" &&
      (window as unknown as { Cashfree?: unknown }).Cashfree
    ) {
      resolve(
        (window as unknown as { Cashfree: (o: { mode: string }) => unknown })
          .Cashfree
      );
      return;
    }
    const s = document.createElement("script");
    s.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    s.onload = () =>
      resolve(
        (window as unknown as { Cashfree: (o: { mode: string }) => unknown })
          .Cashfree
      );
    s.onerror = () => resolve(null);
    document.body.appendChild(s);
  });
}

export default function NorcetCheckoutPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
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
      const res = await fetch("/api/checkout/cashfree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "norcet",
          productName: PRODUCT_NAME,
          amount: BASE_PRICE,
          name,
          email,
          phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      // Handle Mock Flow for Local Testing / Sandbox
      if (data.mock) {
        const q = new URLSearchParams({
          order_id: data.orderId,
          name,
          email,
          amountPaid: String(BASE_PRICE),
          productName: PRODUCT_NAME,
        });
        router.push(`/norcet-notes/thank-you?${q.toString()}`);
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
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.checkoutPage} ${plusJakarta.variable}`}>
      {/* Top Urgency Banner (Matching Landing Page) */}
      <div className={styles.topYellowBanner}>
        <span>Offer Valid Only For Today</span>
        <span>
          <span className={styles.strikePrice}>₹{OLD_PRICE}/-</span>{" "}
          <span className={styles.currentPriceHeader}>₹{BASE_PRICE}/- Only</span>
        </span>
      </div>

      <div className={styles.checkoutContainer}>
        {/* Navigation Bar */}
        <div className={styles.topBar}>
          <a href="/norcet-notes" className={styles.backBtn}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </a>
          <div className={styles.secureBadge}>
            <Lock size={13} />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        <div className={styles.mainGrid}>
          {/* Left Column: Product Summary Card (Matching Landing Design) */}
          <div className={styles.productCard}>
            <h1 className={styles.productTitle}>
              Complete <span className={styles.highlightBlue}>NORCET 11 NOTES</span>
            </h1>

            {/* Price Box */}
            <div className={styles.priceBox}>
              <div className={styles.priceLeft}>
                <span className={styles.originalPrice}>₹{OLD_PRICE}</span>
                <span className={styles.currentPrice}>₹{BASE_PRICE}</span>
              </div>
              <span className={styles.discountTag}>92% OFF</span>
            </div>

            {/* Included Highlights */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.blockTitle}>What you receive:</h3>
              <ul className={styles.featuresList}>
                {highlights.map((feat) => (
                  <li key={feat} className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.blueCheckIcon} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Free Bonuses Included Block */}
            <div className={styles.bonusBox}>
              <div className={styles.bonusBoxHeader}>
                <Gift size={16} className={styles.bonusIcon} />
                <span>All 3 Bonuses Included FREE Today:</span>
              </div>
              <ul className={styles.bonusList}>
                {includedBonuses.map((b) => (
                  <li key={b} className={styles.bonusItem}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Checkout Form (Matching Landing Design) */}
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Enter Your Details</h2>
              <p className={styles.formSub}>
                Instant PDF download link will be sent to your email.
              </p>
            </div>

            {error && <div className={styles.errorMsg}>{error}</div>}

            <form onSubmit={handlePay} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <User size={14} className={styles.labelIcon} />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <Mail size={14} className={styles.labelIcon} />
                  <span>Email Address (For PDF Delivery)</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. yourname@gmail.com"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className={styles.inputHint}>
                  Download link will be delivered here instantly.
                </span>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <Phone size={14} className={styles.labelIcon} />
                  <span>WhatsApp / Phone Number (Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  className={styles.input}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Royal Blue Pay Button matching landing page */}
              <button
                type="submit"
                disabled={loading}
                className={styles.submitBtn}
              >
                <span className={styles.btnMainText}>
                  {loading ? "Processing..." : `PAY ₹${BASE_PRICE} & DOWNLOAD NOW`}
                </span>
                <span className={styles.btnSubText}>
                  Access Complete NORCET 11 Notes + 3 Free Bonuses
                </span>
              </button>

              <div className={styles.guaranteeNote}>
                <ShieldCheck size={17} className={styles.shieldIcon} />
                <span>
                  100% Safe & 256-Bit Encrypted via Cashfree Payments · Instant Access
                </span>
              </div>

              {/* Supported Payment Methods Badges */}
              <div className={styles.trustImageWrap}>
                <Image
                  src={trustImg}
                  alt="Verified Secure Checkout with UPI, Cards, Net Banking"
                  className={styles.trustImage}
                  sizes="(max-width: 640px) 90vw, 290px"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Mini Footer */}
        <div className={styles.checkoutFooter}>
          <p>© {new Date().getFullYear()} NokriMitra.in. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
