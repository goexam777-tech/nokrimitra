"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import productCover from "@/public/31pdfs.jpg";
import trustBadges from "@/public/trust.webp";
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";
import styles from "./checkout.module.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
  variable: "--font-title",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-body",
});

const BASE_PRICE = 149;
const OLD_PRICE = 2199;
const PRODUCT_NAME = "31 Medical Master PDFs Bundle";

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

export default function MedicalCheckoutPage() {
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
      setError("Please enter your name and email address.");
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
          product: "medical",
          productName: PRODUCT_NAME,
          amount: BASE_PRICE,
          name,
          email,
          phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      // Mock Flow for Local Testing / Sandbox
      if (data.mock) {
        const q = new URLSearchParams({
          order_id: data.orderId,
          name,
          email,
          amountPaid: String(BASE_PRICE),
          productName: PRODUCT_NAME,
        });
        router.push(`/medical-master-pdfs/thank-you?${q.toString()}`);
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
    <div
      className={`${styles.checkoutPage} ${montserrat.variable} ${plusJakarta.variable}`}
    >
      <div className={styles.checkoutContainer}>
        {/* Top Navigation Bar */}
        <div className={styles.topBar}>
          <a href="/medical-master-pdfs" className={styles.backBtn}>
            <ArrowLeft size={15} />
            <span>Back</span>
          </a>
          <div className={styles.secureBadge}>
            <Lock size={12} />
            <span>SSL Secured Checkout</span>
          </div>
        </div>

        {/* Main Clean Card */}
        <div className={styles.checkoutCard}>
          {/* Product Summary Row */}
          <div className={styles.productRow}>
            <Image
              src={productCover}
              alt="31 Medical Master PDFs Bundle"
              className={styles.productThumb}
              priority
            />
            <div className={styles.productMeta}>
              <h1 className={styles.productTitle}>31 Medical Master PDFs</h1>
              <p className={styles.productSub}>
                20 Core Medical PDFs + 11 FREE Bonus Books
              </p>
              <div className={styles.priceRow}>
                <span className={styles.currentPrice}>₹{BASE_PRICE}</span>
                <span className={styles.oldPrice}>₹{OLD_PRICE}</span>
                <span className={styles.saveBadge}>92% OFF</span>
              </div>
            </div>
          </div>

          {/* Quick Feature Pills Strip */}
          <div className={styles.pillsStrip}>
            <span className={styles.pillItem}>
              <Zap size={13} color="#eab308" /> Instant Access
            </span>
            <span className={styles.pillItem}>
              <CheckCircle2 size={13} color="#16a34a" /> Lifetime Validity
            </span>
            <span className={styles.pillItem}>
              <ShieldCheck size={13} color="#2563eb" /> 100% Safe Download
            </span>
          </div>

          {/* Checkout Form */}
          <div className={styles.formSection}>
            <p className={styles.formHeading}>Buyer Information</p>

            {error && <div className={styles.errorMsg}>{error}</div>}

            <form onSubmit={handlePay} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <User size={13} className={styles.labelIcon} />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <Mail size={13} className={styles.labelIcon} />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className={styles.inputHint}>
                  Download link will be sent to this email instantly.
                </span>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <Phone size={13} className={styles.labelIcon} />
                  <span>WhatsApp / Mobile Number (Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  className={styles.input}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Professional Pay Button */}
              <button
                type="submit"
                disabled={loading}
                className={styles.payBtn}
                id="checkout-pay-btn"
              >
                <Lock size={17} />
                <span>
                  {loading ? "Processing..." : `Pay ₹${BASE_PRICE} & Download PDFs`}
                </span>
              </button>

              <div className={styles.guaranteeRow}>
                <ShieldCheck size={15} className={styles.shieldIcon} />
                <span>Guaranteed Safe Checkout via UPI, Cards &amp; NetBanking</span>
              </div>

              {/* Trust Badges */}
              <div className={styles.trustWrap}>
                <Image
                  src={trustBadges}
                  alt="Payment partners: Paytm, PhonePe, Google Pay, UPI, Cards"
                  className={styles.trustImage}
                  sizes="(max-width: 520px) 280px, 300px"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.checkoutFooter}>
          <p>&copy; {new Date().getFullYear()} NokriMitra. All rights reserved.</p>
          <p>
            Support: <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
