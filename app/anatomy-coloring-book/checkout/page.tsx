"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  AlertCircle,
  ArrowRight,
  Lock,
  Mail,
  ShieldCheck,
  Zap,
} from "lucide-react";

import anatomyHero from "@/public/anatomy-coloring.webp";
import { trackAnatomyMetaEvent } from "@/lib/anatomyTracking";
import styles from "../../opd-mastery/checkout/checkout.module.css";

const PRICE = 149;
const OLD_PRICE = 299;
const PRODUCT_NAME = "500+ Human Anatomy Coloring Book Bundle";
const CHECKOUT_STORAGE_PREFIX = "anatomy_checkout";
const WHATSAPP_URL =
  "https://wa.me/919104826422?text=Hello!%20I%20have%20a%20question%20regarding%20the%20Human%20Anatomy%20Coloring%20Book%20checkout.";

const productFeatures = [
  "500+ Visual Anatomy Pages",
  "All Major Body Systems + MCQs",
  "Printable PDF with Lifetime Access",
];

const trustPoints = [
  { icon: Lock, text: "100% Secure Payment" },
  { icon: Zap, text: "Instant Download Access" },
  { icon: Mail, text: "PDF Link Sent by Email" },
  { icon: ShieldCheck, text: "Secured by Razorpay" },
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

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function AnatomyCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment_status");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isConciergeInView, setIsConciergeInView] = useState(false);

  const formStartedRef = useRef(false);
  const beginCheckoutFiredRef = useRef(false);
  const conciergeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const element = conciergeRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsConciergeInView(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    try {
      const savedName = sessionStorage.getItem(
        `${CHECKOUT_STORAGE_PREFIX}_name`
      );
      const savedEmail = sessionStorage.getItem(
        `${CHECKOUT_STORAGE_PREFIX}_email`
      );
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
    } catch {
      // Storage is optional.
    }
  }, []);

  useEffect(() => {
    if (beginCheckoutFiredRef.current) return;
    beginCheckoutFiredRef.current = true;

    const windowWithTracking = window as unknown as {
      gtag?: (...args: unknown[]) => void;
    };

    trackAnatomyMetaEvent("InitiateCheckout", {
      value: PRICE,
      currency: "INR",
      content_name: PRODUCT_NAME,
      content_type: "product",
    });
    windowWithTracking.gtag?.("event", "begin_checkout", {
      value: PRICE,
      currency: "INR",
      items: [{ item_name: PRODUCT_NAME, price: PRICE }],
    });
  }, []);

  const handleFormStart = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;

    const windowWithTracking = window as unknown as {
      gtag?: (...args: unknown[]) => void;
    };
    windowWithTracking.gtag?.("event", "form_start", {
      form_name: "anatomy_checkout_form",
    });
  };

  const handlePay = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email to proceed.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address (e.g. name@gmail.com).");
      return;
    }

    const windowWithTracking = window as unknown as {
      gtag?: (...args: unknown[]) => void;
    };
    windowWithTracking.gtag?.("event", "purchase_button_click", {
      product_name: PRODUCT_NAME,
      price: PRICE,
      currency: "INR",
    });
    windowWithTracking.gtag?.("event", "checkout_form_submit", {
      product_name: PRODUCT_NAME,
      value: PRICE,
      currency: "INR",
    });

    try {
      sessionStorage.setItem(
        `${CHECKOUT_STORAGE_PREFIX}_name`,
        name.trim()
      );
      sessionStorage.setItem(
        `${CHECKOUT_STORAGE_PREFIX}_email`,
        email.trim()
      );
    } catch {
      // Storage is optional.
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "anatomy",
          name: name.trim(),
          email: email.trim(),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Order creation failed");
      }

      const orderTotal = Number(data.total ?? PRICE);

      const goToThankYou = (
        paymentData: Record<string, string>,
        includeCustomer = false
      ) => {
        try {
          sessionStorage.setItem(
            `anatomy_payment_proof_${data.orderId}`,
            JSON.stringify({
              ...paymentData,
              ...(includeCustomer
                ? { name: name.trim(), email: email.trim() }
                : {}),
            })
          );
        } catch {
          // The webhook still provides email delivery if browser storage fails.
        }

        const query = new URLSearchParams({ order_id: data.orderId });
        router.push(`/anatomy-coloring-book/thank-you?${query.toString()}`);
      };

      if (data.mock) {
        window.setTimeout(
          () => goToThankYou({ mock: "true" }, true),
          600
        );
        return;
      }

      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        throw new Error(
          "Razorpay payment gateway failed to load. Please check your connection."
        );
      }

      const razorpay = new (
        window as unknown as {
          Razorpay: new (options: unknown) => { open: () => void };
        }
      ).Razorpay({
        key: data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "NokriMitra",
        description: PRODUCT_NAME,
        order_id: data.orderId,
        prefill: {
          name: name.trim(),
          email: email.trim(),
        },
        theme: { color: "#28A745" },
        handler: (payment: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          goToThankYou({
            razorpay_payment_id: payment.razorpay_payment_id,
            razorpay_order_id: payment.razorpay_order_id,
            razorpay_signature: payment.razorpay_signature,
          });
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });

      razorpay.open();
      windowWithTracking.gtag?.("event", "payment_gateway_opened", {
        order_id: data.orderId,
        value: orderTotal,
        currency: "INR",
        payment_gateway: "razorpay",
      });
    } catch (paymentError) {
      console.error("Anatomy payment initiation error:", paymentError);
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Something went wrong. Please try again or refresh."
      );
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.wrap}>
        <div className={styles.grid}>
          <div className={styles.productColumn}>
            <div className={styles.productHeader}>
              <div className={styles.coverContainer}>
                <Image
                  src={anatomyHero}
                  alt="500+ Human Anatomy Coloring Book Bundle cover"
                  fill
                  priority
                  className={styles.coverImg}
                />
              </div>
              <div className={styles.productInfo}>
                <strong className={styles.productName}>
                  Human Anatomy Coloring Book
                </strong>
                <p className={styles.productTagline}>
                  Learn anatomy visually through coloring.
                </p>
                <ul className={styles.productFeatures}>
                  {productFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

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
                      Your previous payment was not completed or was cancelled.
                      You can retry safely below.
                    </span>
                  </div>
                )}

                {error && (
                  <div className={styles.errorBanner} role="alert">
                    {error}
                  </div>
                )}

                <div className={styles.field}>
                  <label htmlFor="anatomy-name">Full Name</label>
                  <input
                    id="anatomy-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="anatomy-email">Email Address</label>
                  <input
                    id="anatomy-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={loading}
                    required
                  />
                  <span className={styles.fieldHelp}>
                    <Mail size={13} /> Your download link is sent here.
                  </span>
                </div>

                <div className={styles.summaryHead}>
                  <span>Item</span>
                  <span>Price</span>
                </div>

                <div className={styles.priceBreakdown}>
                  <div className={styles.priceRow}>
                    <span>500+ Human Anatomy Coloring Book Bundle</span>
                    <span>INR {PRICE}</span>
                  </div>
                </div>

                <div className={styles.orderTotal}>
                  <span>TOTAL</span>
                  <strong>
                    <i>INR</i> {PRICE}.00
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
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.waConcierge} ${
                    isConciergeInView ? styles.waConciergeDocked : ""
                  }`}
                  aria-label="Chat with WhatsApp Support"
                >
                  <div className={styles.waAvatar}>
                    <WhatsAppIcon className={styles.waIconSvg} />
                    <span className={styles.waStatusDot} aria-hidden="true" />
                  </div>
                  <div className={styles.waInfo}>
                    <span className={styles.waHeading}>
                      Need Help? Chat on WhatsApp
                    </span>
                    <span className={styles.waSub}>
                      +91 91048 26422 <span className={styles.waDot}>•</span>{" "}
                      Quick reply
                    </span>
                  </div>
                  <div className={styles.waArrowCircle} aria-hidden="true">
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </div>
                </a>
              </form>
            </div>
          </div>
        </div>
      </main>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.floatWhatsAppLeft} ${
          isConciergeInView ? styles.floatWhatsAppHidden : ""
        }`}
        aria-label="Chat on WhatsApp Support"
      >
        <WhatsAppIcon className={styles.floatWaIcon} />
      </a>
    </div>
  );
}

export default function AnatomyCheckoutPage() {
  return (
    <Suspense
      fallback={<div style={{ minHeight: "100vh", background: "#191D33" }} />}
    >
      <AnatomyCheckoutContent />
    </Suspense>
  );
}
