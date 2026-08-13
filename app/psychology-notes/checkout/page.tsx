"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Download,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import razorpayImg from "@/public/razorpay.png";
import clinicalCover from "@/public/clinical1.webp";
import styles from "./checkout.module.css";

const BASE_PRICE = 149;
const OLD_PRICE = 2499;
const ADDON_PRICE = 99;
const PRODUCT_NAME = "Psychology Notes (Basic to Advance)";

const benefits = [
  "Beginner to Advanced Learning",
  "Easy Notes + Visual Diagrams",
  "Updated & Practical Content",
  "Instant PDF + Email Delivery",
  "Lifetime Access",
];

const trustPoints = [
  { icon: Lock, text: "Secured by Razorpay" },
  { icon: Download, text: "Instant access after payment" },
  { icon: Mail, text: "Link emailed to you" },
  { icon: RefreshCw, text: "Support if any issue" },
];

const bumpList = [
  "CBT & Counseling Techniques",
  "Exposure & Mindfulness Methods",
  "Practical Clinical Interventions",
  "Easy-to-Understand Explanations",
];

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as unknown as { Razorpay?: unknown }).Razorpay) {
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

export default function PsyCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addon, setAddon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = BASE_PRICE + (addon ? ADDON_PRICE : 0);

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

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/psychology-notes");
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");

    const productName = addon
      ? "Psychology Notes + 800 Therapeutic Interventions"
      : "Psychology Notes";

    try {
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: "psychology",
          amount: total,
          addons: addon ? ["therapeutic-interventions"] : [],
          name,
          email,
          phone: "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const orderTotal = Number(data.total ?? total);
      const orderAddons: string[] = Array.isArray(data.addons)
        ? data.addons
        : addon
          ? ["therapeutic-interventions"]
          : [];
      const orderProductName = orderAddons.includes("therapeutic-interventions")
        ? "Psychology Notes + 800 Therapeutic Interventions"
        : "Psychology Notes";

      const goThankYou = (extra: Record<string, string>) => {
        const q = new URLSearchParams({
          name,
          email,
          amountPaid: String(orderTotal),
          productName: orderProductName,
          product: "psychology",
          addons: orderAddons.join(","),
          ...extra,
        });
        router.push(`/psychology-notes/thank-you?${q.toString()}`);
      };

      if (data.mock) {
        setTimeout(() => goThankYou({ orderId: data.orderId, mock: "true" }), 1200);
        return;
      }

      const ok = await loadRazorpay();
      if (!ok) throw new Error("Could not load the secure payment window. Please retry.");

      const rzp = new (window as unknown as { Razorpay: new (o: unknown) => { open: () => void } }).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || data.keyId,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "NokriMitra",
        description: orderProductName,
        order_id: data.orderId,
        handler: (r: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) =>
          goThankYou({
            razorpay_payment_id: r.razorpay_payment_id,
            razorpay_order_id: r.razorpay_order_id,
            razorpay_signature: r.razorpay_signature,
          }),
        prefill: { name, email },
        theme: { color: "#12213f" },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <div className={styles.barInner}>
          <button type="button" className={styles.backBtn} onClick={handleBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <span className={styles.brand}>Psychology Notes</span>
          <span className={styles.secureTag}>
            <Lock size={13} /> Secure
          </span>
        </div>
      </header>

      <main className={styles.wrap}>
        <div className={styles.intro}>
          <h1>
            You&apos;re one step away from your <span>Psychology Notes</span>
          </h1>
          <div className={styles.socialProof}>
            <span className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#ffb020" stroke="none" />
              ))}
              <b>4.9/5</b>
            </span>
            <span className={styles.proofDot} />
            <span className={styles.proofUsers}>
              <Users size={14} /> Trusted by 900+ students
            </span>
          </div>
        </div>

        <div className={styles.grid}>
          {/* LEFT: product + trust */}
          <div className={styles.leftCol}>
            <div className={styles.productCard}>
              <div className={styles.coverWrap}>
                <Image
                  src={clinicalCover}
                  alt="Clinical Psychology Notes cover"
                  className={styles.coverImg}
                  priority
                />
              </div>
              <div className={styles.productInfo}>
                <strong className={styles.productName}>Psychology Notes</strong>
                <span className={styles.productMeta}>
                  Basic to Advance · Digital PDF
                </span>
                <div className={styles.miniPrice}>
                  <s>₹{OLD_PRICE.toLocaleString("en-IN")}</s>
                  <b>₹{BASE_PRICE}</b>
                  <span className={styles.miniOff}>90% OFF</span>
                </div>
              </div>
            </div>

            <ul className={styles.benefits}>
              {benefits.map((b) => (
                <li key={b}>
                  <span className={styles.bTick}>
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: order form */}
          <div className={styles.formCol}>
            <div className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <span className={styles.discountBadge}>🔥 Limited-time 90% OFF</span>
                <div className={styles.pricePill}>
                  <span className={styles.priceOld}>₹{OLD_PRICE.toLocaleString("en-IN")}</span>
                  <span className={styles.priceNow}>₹{BASE_PRICE}</span>
                </div>
                <h2 className={styles.orderTitle}>Complete your order</h2>
                <p className={styles.orderSub}>
                  Instant download in seconds after checkout
                </p>
              </div>

              <form className={styles.form} onSubmit={handlePay} noValidate>
                {error && <div className={styles.err}>{error}</div>}

                <div className={styles.field}>
                  <label htmlFor="psy-name">Full name</label>
                  <input
                    id="psy-name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Aditi Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="psy-email">Email address</label>
                  <input
                    id="psy-email"
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

                {/* Order bump */}
                <div className={styles.bump}>
                  <div className={styles.bumpHead}>Special one-time offer — only ₹{ADDON_PRICE}!</div>
                  <div className={styles.bumpBody}>
                    <div className={styles.bumpTitle}>
                      🧠 Add 800 Therapeutic Interventions
                    </div>
                    <ul className={styles.bumpList}>
                      {bumpList.map((b) => (
                        <li key={b}>
                          <Check size={12} strokeWidth={3} /> {b}
                        </li>
                      ))}
                    </ul>
                    <label className={styles.bumpCheck}>
                      <input
                        type="checkbox"
                        checked={addon}
                        onChange={(e) => setAddon(e.target.checked)}
                        disabled={loading}
                      />
                      <span>
                        <strong>Yes!</strong> Add{" "}
                        <strong>800 Therapeutic Interventions</strong> for just ₹{ADDON_PRICE}.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Summary */}
                <div className={styles.sumHeadRow}>
                  <span>Item</span>
                  <span>Price</span>
                </div>

                <div className={styles.planCard}>
                  <span className={styles.radioDot} aria-hidden="true" />
                  <div className={styles.planText}>
                    <strong>One Time Fee Pricing</strong>
                    <span>One-time payment</span>
                  </div>
                  <div className={styles.planPrice}>
                    <span>
                      <span className={styles.inr}>INR</span> <b>{total}</b>
                    </span>
                    <span className={styles.planSub}>one-time</span>
                  </div>
                </div>

                <div className={styles.itemsCard}>
                  <div className={styles.itemRow}>
                    <span>Psychology Notes</span>
                    <b>INR {BASE_PRICE}</b>
                  </div>
                  {addon && (
                    <div className={styles.itemRow}>
                      <span>800 Therapeutic Interventions</span>
                      <b>+ INR {ADDON_PRICE}.00</b>
                    </div>
                  )}
                </div>

                <div className={styles.totalCard}>
                  <span className={styles.totalLabel}>TOTAL</span>
                  <span className={styles.totalVal}>
                    <span className={styles.inr}>INR</span> <b>{total}.00</b>
                  </span>
                </div>

                <button type="submit" className={styles.payBtn} disabled={loading}>
                  {loading ? (
                    "Processing…"
                  ) : (
                    <>
                      <Lock size={17} />
                      <span>Pay ₹{total} &nbsp;&amp;&nbsp; Download</span>
                    </>
                  )}
                </button>

                <p className={styles.payNote}>
                  <ShieldCheck size={14} /> Card, UPI &amp; net-banking details are
                  handled securely by Razorpay — never stored by us.
                </p>

                <div className={styles.razorpayWrap}>
                  <Image
                    src={razorpayImg}
                    alt="Secured by Razorpay"
                    className={styles.razorpayImg}
                    priority
                  />
                </div>
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
                  appears right after payment and is emailed to you.
                </p>
              </div>

              <nav className={styles.footerLinks} aria-label="Legal links">
                <a href="/psychology-notes/privacy-policy">Privacy</a>
                <a href="/psychology-notes/refund-policy">Refund</a>
                <a href="/psychology-notes/terms">Terms</a>
                <a href="/psychology-notes/disclaimer">Disclaimer</a>
              </nav>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
