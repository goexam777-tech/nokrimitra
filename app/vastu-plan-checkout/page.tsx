"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./checkout.module.css";

const BASE_PRICE = 149;

type Upsell = {
  id: string;
  guide: string;
  hindi?: string;
  sub?: string;
  valued: string;
  price: number;
  itemLabel: string;
  img?: string;
};

const bonuses = [
  { name: "Vastu E-Book with Remedies", value: "₹999" },
  { name: "Material & Texture Library for Rendering", value: "₹799" },
  { name: "Construction Cost Estimation Sheet", value: "₹699" },
  { name: "AutoCAD Shortcuts & Speed Drafting Cheat Sheet", value: "₹299" },
  { name: "Site Supervision Checklist", value: "₹499" },
  { name: "Client Agreement & Quotation Format Templates", value: "₹599" },
];

const upsells: Upsell[] = [
  {
    id: "vedic",
    guide: "Vedic-Remedies-Mastery",
    sub: "(Shift Your Destiny)",
    valued: "₹697",
    price: 37,
    itemLabel: "Complete-Vedic-Remedies-Mastery",
    img: "https://img.flexifunnels.com/images/4376/ChatGPTImageJun212026122557PM_7ya0c_1254.png",
  },
  {
    id: "vastu-guide",
    guide: "Practical Vastu Shastra Guide",
    valued: "₹999",
    price: 47,
    itemLabel: "Practical Vastu Shastra Guide",
    img: "https://img.flexifunnels.com/images/4376/vastuguide_il6l4_900.webp",
  },
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

export default function VastuCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({
    vedic: true,
    "vastu-guide": true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addonsTotal = upsells.reduce(
    (sum, u) => sum + (checked[u.id] ? u.price : 0),
    0
  );
  const total = BASE_PRICE + addonsTotal;

  const toggle = (id: string) =>
    setChecked((c) => ({ ...c, [id]: !c[id] }));

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Please fill in your name and email.");
      return;
    }
    setLoading(true);
    setError("");

    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    if (typeof window !== "undefined" && w.fbq) {
      w.fbq("track", "InitiateCheckout", { value: total, currency: "INR" });
    }

    const purchasedAddons = upsells.filter((u) => checked[u.id]);
    const addonIds = purchasedAddons.map((u) => u.id).join(",");
    const addonLabels = purchasedAddons.map((u) => u.itemLabel);
    const productName =
      "10k Vastu Floor Plan Editable Bundle" +
      (addonLabels.length ? " + " + addonLabels.join(", ") : "");

    try {
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, name, email, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const goThankYou = (extra: Record<string, string>) => {
        const q = new URLSearchParams({
          name,
          email,
          amountPaid: String(total),
          productName,
          product: "vastu",
          addons: addonIds,
          ...extra,
        });
        router.push(`/vastu-plan-checkout/thank-you?${q.toString()}`);
      };

      if (data.mock) {
        setTimeout(
          () => goThankYou({ orderId: data.orderId, mock: "true" }),
          1200
        );
        return;
      }

      const ok = await loadRazorpay();
      if (!ok) throw new Error("Failed to load Razorpay.");

      const rzp = new (
        window as unknown as {
          Razorpay: new (o: unknown) => { open: () => void };
        }
      ).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || data.keyId,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "NokriMitra",
        description: productName,
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
        prefill: { name, email, contact: phone },
        theme: { color: "#3b8dfe" },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.open();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Top banner */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          <span className={styles.cyan}>You&apos;re Just One Step Away...</span>{" "}
          Complete your details below to get instant access!
        </h1>
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <span className={styles.progressPct}>75%</span>
          </div>
        </div>
        <h2 className={styles.heroSub}>
          <span aria-hidden="true">👇</span> Save Your Hundreds of Hours
          Instantly!
        </h2>
        <p className={styles.heroText}>
          More than <span className={styles.cyan}>16,400+</span> Architects,
          Engineers, and Designers using this ultimate resource.
        </p>
      </section>

      <div className={styles.wrap}>
        <form className={styles.card} onSubmit={handlePay}>
          {/* Price header */}
          <div className={styles.priceHead}>
            <div className={styles.regular}>
              Regular Price: <s>₹999</s>
            </div>
            <div className={styles.today}>
              Today Only <span className={styles.todayAmt}>₹149</span>
            </div>
          </div>

          {error && <div className={styles.err}>{error}</div>}

          {/* Fields */}
          <div className={styles.fields}>
            <input
              type="text"
              placeholder="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
            <div className={styles.phoneField}>
              <span className={styles.flag} aria-hidden="true">
                🇮🇳
              </span>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Upsells */}
          {upsells.map((u) => (
            <div className={styles.upsell} key={u.id}>
              <label className={styles.upsellTop}>
                <input
                  type="checkbox"
                  checked={!!checked[u.id]}
                  onChange={() => toggle(u.id)}
                  disabled={loading}
                />
                <span className={styles.upsellPill}>Yes! I Want this!</span>
              </label>

              <div className={styles.upsellGuide}>
                GUIDE: <mark>&quot;{u.guide}&quot;</mark>
                {u.hindi ? (
                  <span className={styles.upsellHindi}> {u.hindi}</span>
                ) : null}
              </div>
              {u.sub ? <div className={styles.upsellSub}>{u.sub}</div> : null}

              <div className={styles.bookImg}>
                {u.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={u.img} alt={u.guide} loading="lazy" />
                ) : (
                  <div className={styles.bookPlaceholder}>
                    <span className={styles.bookBrand}>ORBIT DIGITAL</span>
                    <span className={styles.bookName}>{u.guide}</span>
                  </div>
                )}
              </div>

              <div className={styles.upsellPrice}>
                Valued at {u.valued}, Today at{" "}
                <mark className={styles.priceMark}>₹{u.price}/- Only</mark>
              </div>
              <div className={styles.upsellHint}>
                Check the box and get access <span aria-hidden="true">👆</span>
              </div>
            </div>
          ))}

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
                <span className={styles.inr}>INR</span> <b>149</b>
              </span>
              <span className={styles.planSub}>one-time</span>
            </div>
          </div>

          <div className={styles.itemsCard}>
            <div className={styles.itemRow}>
              <span>10k Vastu Floor Plan Editable Bundle</span>
              <b>INR 149</b>
            </div>
            {upsells
              .filter((u) => checked[u.id])
              .map((u) => (
                <div className={styles.itemRow} key={u.id}>
                  <span>{u.itemLabel}</span>
                  <b>+ INR {u.price}.00</b>
                </div>
              ))}
          </div>

          <div className={styles.totalCard}>
            <span className={styles.totalLabel}>TOTAL</span>
            <span className={styles.totalVal}>
              <span className={styles.inr}>INR</span> <b>{total}.00</b>
            </span>
          </div>

          {/* Pay via */}
          <div className={styles.payViaLabel}>Pay via</div>
          <label className={styles.payOption}>
            <input type="radio" checked readOnly />
            <span>Razorpay</span>
          </label>

          <div className={styles.rzpBox}>
            <span className={styles.rzpBoxLabel}>Completing payment with</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://d6xcmfyh68wv8.cloudfront.net/newsroom-content/uploads/2024/05/Razorpay-Logo.jpg"
              alt="Razorpay"
              className={styles.rzpLogo}
            />
          </div>

          <button type="submit" className={styles.payBtn} disabled={loading}>
            {loading ? (
              "Processing..."
            ) : (
              <>
                Complete Order
                <svg
                  className={styles.payArrow}
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="11" fill="#fff" />
                  <path
                    d="M10 7l5 5-5 5"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>

          <div className={styles.badges}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://img.flexifunnels.io/images/163/yzmte_404_image.png"
              alt="Accepted payment methods, 100% safe and secure"
              className={styles.badgesImg}
            />
          </div>

          <div className={styles.footerLinks}>
            <a href="/vastu-astro/privacy-policy">Privacy</a>
            <a href="/vastu-astro/refund-policy">Refund</a>
            <a href="/vastu-astro/terms">Terms</a>
          </div>
        </form>

        {/* Special bonuses (after the buy card) */}
        <h3 className={styles.bonusHead}>
          GET SPECIAL <u>BONUSES</u> Worth: ₹3,894
        </h3>
        <div className={styles.bonusBox}>
          <ul className={styles.bonusList}>
            {bonuses.map((b) => (
              <li key={b.name}>
                <span className={styles.bonusTick} aria-hidden="true">
                  ✓
                </span>
                <span>
                  {b.name} — <strong>{b.value}</strong>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
