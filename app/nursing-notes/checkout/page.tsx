"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  Lock,
  Mail,
  MessageSquare,
  ShieldCheck,
  Zap,
} from "lucide-react";

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

import nursingNotesHero from "@/public/e30d6b36-d9d9-468c-b218-0bd78f9e1408.webp";
import anatomyAddonImg from "@/public/f88e82b6-2f72-4d47-89fb-3efb135ed031.webp";
import trustBadges from "@/public/trust.webp";
import styles from "./checkout.module.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-nursing",
});

const PRICE = 99;
const OLD_PRICE = 499;
const ADDON_ID = "anatomy-revision";
const ADDON_PRICE = 29;
const PRODUCT_NAME = "Complete Nursing Study Guide (600+ Pages PDF)";
const PAYMENT_LABEL = "Complete Nursing Study Guide PDF";

const trustPoints = [
  { icon: Lock, text: "100% Secure Payment" },
  { icon: Zap, text: "Instant Delivery" },
  { icon: Mail, text: "Delivered to Email" },
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

export default function NursingNotesCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addonSelected, setAddonSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = PRICE + (addonSelected ? ADDON_PRICE : 0);

  const formStartedRef = useRef(false);

  const handleFormStart = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    if (typeof window !== "undefined") {
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      w.gtag?.("event", "form_start", {
        form_name: "nursing_checkout_form",
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
    const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID_NURSING || "1399128725611345";
    w.fbq?.("track", "InitiateCheckout", {
      value: PRICE,
      currency: "INR",
      content_name: PRODUCT_NAME,
    });
    w.fbq?.("trackSingle", pixelId, "InitiateCheckout", {
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
    router.push("/nursing-notes");
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
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "nursing",
          name,
          email,
          addons: addonSelected ? [ADDON_ID] : [],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const goThankYou = (extra: Record<string, string>) => {
        const q = new URLSearchParams({
          name,
          email,
          amountPaid: String(total),
          productName: PRODUCT_NAME,
          product: "nursing",
          ...(addonSelected ? { addons: ADDON_ID } : {}),
          ...extra,
        });
        router.push(`/nursing-notes/thank-you?${q.toString()}`);
      };

      if (data.mock) {
        if (typeof window !== "undefined") {
          const w = window as unknown as { gtag?: (...a: unknown[]) => void };
          w.gtag?.("event", "payment_redirect", {
            order_id: data.orderId,
            value: total,
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
          value: total,
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
        description: PAYMENT_LABEL,
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
    <div className={`${styles.page} ${plusJakarta.variable}`}>
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
                    src={nursingNotesHero}
                    alt="Nursing Notes E-book cover"
                    fill
                    priority
                    className={styles.coverImg}
                  />
                </div>
                <div className={styles.productInfo}>
                  <strong className={styles.productName}>
                    Complete Nursing Study Guide
                  </strong>
                  <span className={styles.productMeta}>
                    600+ Pages • Digital PDF • 2026 Edition
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className={styles.formColumn}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
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
                  <label htmlFor="nursing-name">Full Name</label>
                  <input
                    id="nursing-name"
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
                  <label htmlFor="nursing-email">Email Address</label>
                  <input
                    id="nursing-email"
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

                {/* Order Bump Offer Box */}
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
                  <div className={styles.bumpHeader}>
                    <label
                      htmlFor="bump-checkbox"
                      className={styles.bumpCheckboxLabel}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        id="bump-checkbox"
                        checked={addonSelected}
                        onChange={(e) => setAddonSelected(e.target.checked)}
                        className={styles.bumpCheckbox}
                      />
                      <span className={styles.bumpCustomCheck}>
                        {addonSelected && <Check size={12} strokeWidth={3.5} />}
                      </span>
                      <span className={styles.bumpCheckboxText}>
                        Yes! Add This Bonus for Just ₹{ADDON_PRICE}
                      </span>
                    </label>
                  </div>

                  <div className={styles.bumpBody}>
                    <div className={styles.bumpTopRow}>
                      <div className={styles.bumpImageWrap}>
                        <Image
                          src={anatomyAddonImg}
                          alt="Human Anatomy Coloring E-book"
                          width={56}
                          height={74}
                          className={styles.bumpImage}
                        />
                      </div>
                      <div className={styles.bumpInfo}>
                        <h4 className={styles.bumpTitle}>
                          Make Your Anatomy Revision Easier!
                        </h4>
                        <p className={styles.bumpText}>
                          <strong>
                            Human Anatomy Coloring E-book <em>500+ Pages</em>
                          </strong>
                        </p>
                      </div>
                    </div>

                    <ul className={styles.bumpList}>
                      <li>
                        <span className={styles.bumpCheckMark}>✓</span>
                        <span>Major body systems &amp; key structures</span>
                      </li>
                      <li>
                        <span className={styles.bumpCheckMark}>✓</span>
                        <span>Important concepts for quick revision</span>
                      </li>
                      <li>
                        <span className={styles.bumpCheckMark}>✓</span>
                        <span>Digital PDF - study anytime, anywhere</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={styles.summaryHead}>
                  <span>Item</span>
                  <span>Price</span>
                </div>

                <div className={styles.priceBreakdown}>
                  <div className={styles.priceRow}>
                    <span>Complete Nursing Study Guide PDF</span>
                    <span>INR {PRICE}</span>
                  </div>
                  {addonSelected && (
                    <div className={styles.priceRow}>
                      <span>Human Anatomy Coloring E-book (500+ Pages)</span>
                      <span>INR {ADDON_PRICE}</span>
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
                      <span>🔒 Pay ₹{total} &amp; Get Instant Access</span>
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

              <div className={styles.waWrapper}>
                <a
                  href="https://wa.me/919104826422?text=Hello!%20I%20have%20a%20question%20regarding%20the%20Nursing%20Study%20Guide%20checkout."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.waConcierge}
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
              </div>

              <nav className={styles.legalNav} aria-label="Legal links">
                <a href="/nursing-notes/privacy-policy">Privacy</a>
                <a href="/nursing-notes/refund-policy">Refund</a>
                <a href="/nursing-notes/terms">Terms</a>
                <a href="/nursing-notes/disclaimer">Disclaimer</a>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
