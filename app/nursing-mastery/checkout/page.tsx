"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Download,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import nursingCover from "@/public/nursing.jpg";
import razorpayLogo from "@/public/checkoutrazorpay.png";
import trustBadges from "@/public/trust.webp";
import reviewerNurse from "@/public/nurse_review_1.png";
import styles from "./checkout.module.css";

const PRICE = 199;
const OLD_PRICE = 499;
const SAVE_PERCENT = Math.round((1 - PRICE / OLD_PRICE) * 100);
const PRODUCT_NAME = "Nursing Protocol Reference Notebook";
const PAYMENT_LABEL = "Nursing Protocol Reference E-book";

const included = [
  "100 Practical Ward Situations",
  "First Response Actions, Step by Step",
  "Clear Red Flags & When to Call the Doctor",
  "Immediate Nursing Assessment Checks",
  "Documentation Points for Every Situation",
  "Instant PDF + Email Delivery · Lifetime Access",
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

export default function NursingCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    router.push("/nursing-mastery");
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
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "nursing", name, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const orderTotal = Number(data.total ?? PRICE);
      const goThankYou = (extra: Record<string, string>) => {
        const q = new URLSearchParams({
          name,
          email,
          amountPaid: String(orderTotal),
          productName: PRODUCT_NAME,
          product: "nursing",
          ...extra,
        });
        router.push(`/nursing-mastery/thank-you?${q.toString()}`);
      };

      if (data.mock) {
        setTimeout(() => goThankYou({ orderId: data.orderId, mock: "true" }), 1000);
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
        <div className={styles.intro}>
          <span className={styles.edition}>Nursing Protocol Reference · 2026</span>
          <h1>
            You&apos;re one step away from your <span>Nursing E-book</span>
          </h1>
          <p className={styles.introSub}>
            Enter your details, pay securely, and download instantly.
          </p>
          <div className={styles.socialProof}>
            <span className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#ffb020" stroke="none" />
              ))}
              <b>4.9/5</b>
            </span>
            <span className={styles.proofDot} />
            <span className={styles.proofUsers}>
              <Users size={14} /> Trusted by 1,200+ nurses &amp; students
            </span>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Left: product + trust */}
          <div className={styles.productColumn}>
            <div className={styles.productCard}>
              <div className={styles.coverContainer}>
                <Image
                  src={nursingCover}
                  alt="Nursing Protocol Reference Notebook cover"
                  fill
                  priority
                  className={styles.coverImg}
                />
              </div>
              <div className={styles.productInfo}>
                <strong className={styles.productName}>
                  Nursing Protocol Reference
                </strong>
                <span className={styles.productMeta}>
                  Digital PDF · 100 Ward Situations
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

            <figure className={styles.quoteCard}>
              <div className={styles.quoteStars} aria-label="Rated 5 out of 5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#ffb020" stroke="none" />
                ))}
              </div>
              <blockquote>
                When a patient deteriorates, I know exactly what to assess first
                and when to call the doctor. The red flags and documentation
                points make my ward duty so much easier.
              </blockquote>
              <figcaption>
                <Image
                  src={reviewerNurse}
                  alt="Priya Nair, Staff Nurse"
                  className={styles.quoteAvatar}
                  sizes="42px"
                />
                <span>
                  <strong>Priya Nair</strong>
                  <small>Staff Nurse</small>
                </span>
              </figcaption>
            </figure>
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
                  <span className={styles.priceSave}>Save {SAVE_PERCENT}%</span>
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
                  <label htmlFor="nursing-name">Full name</label>
                  <input
                    id="nursing-name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Priya Nair"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="nursing-email">Email address</label>
                  <input
                    id="nursing-email"
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

                <div className={styles.summaryHead}>
                  <span>Item</span>
                  <span>Price</span>
                </div>

                <div className={styles.pricingChoice}>
                  <span className={styles.radioDot} aria-hidden="true" />
                  <span className={styles.pricingChoiceCopy}>
                    <strong>One Time Fee Pricing</strong>
                    <small>One-time payment</small>
                  </span>
                  <span className={styles.pricingChoicePrice}>
                    <strong>
                      <i>INR</i> {PRICE}
                    </strong>
                    <small>one-time</small>
                  </span>
                </div>

                <div className={styles.priceBreakdown}>
                  <div className={styles.priceRow}>
                    <span>Nursing Protocol Reference Notebook</span>
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
                      <Lock size={17} />
                      <span>Pay ₹{PRICE} &nbsp;&amp;&nbsp; Download</span>
                    </>
                  )}
                </button>

                <p className={styles.payNote}>
                  <ShieldCheck size={14} /> Card, UPI &amp; net-banking details
                  are handled securely by Razorpay — never stored by us.
                </p>

                <Image
                  src={razorpayLogo}
                  alt="Secured by Razorpay"
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

              <Image
                src={trustBadges}
                alt="Secure checkout, privacy protected and satisfaction guaranteed"
                className={styles.trustBadges}
                sizes="(max-width: 640px) 90vw, 380px"
              />

              <div className={styles.guarantee}>
                <BadgeCheck size={20} />
                <p>
                  <strong>Instant delivery guarantee.</strong> Your download
                  appears right after payment and is emailed to you. Any problem?
                  Write to{" "}
                  <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a>.
                </p>
              </div>

              <nav className={styles.legalNav} aria-label="Legal links">
                <a href="/nursing-mastery/privacy-policy">Privacy</a>
                <a href="/nursing-mastery/refund-policy">Refund</a>
                <a href="/nursing-mastery/terms">Terms</a>
                <a href="/nursing-mastery/disclaimer">Disclaimer</a>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
