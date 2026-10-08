"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import heroImg from "@/public/5ef7d48c-9f0c-4388-8409-32dbd27d792a.webp";
import razorpayBadge from "@/public/razorpay-logo.webp";
import styles from "./checkout.module.css";

const PRICE = 49;
const OLD_PRICE = 299;
const SAVINGS = OLD_PRICE - PRICE;
const DISCOUNT = Math.round((SAVINGS / OLD_PRICE) * 100);
const PRODUCT_NAME = "GSRTC કંડક્ટર 2026 Model Papers & MCQ પેકેજ";

const checklist = [
  "15 Model Practice Papers (પરીક્ષા તૈયારી)",
  "2500+ MCQs પ્રશ્નો & જવાબો સાથે",
  "500 Computer One-Liners (ઝડપી રિવિઝન)",
  "10 Computer Notes (સરળ ભાષામાં)",
  "તાત્કાલિક ડાઉનલોડ + ઈમેલ પર PDF લિંક",
  "કાયમી લાઇફટાઇમ એક્સેસ",
];

function loadCashfree(): Promise<unknown> {
  return new Promise((resolve) => {
    if (
      typeof window !== "undefined" &&
      (window as unknown as { Cashfree?: unknown }).Cashfree
    ) {
      resolve((window as unknown as { Cashfree: (o: { mode: string }) => unknown }).Cashfree);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    s.onload = () => {
      resolve((window as unknown as { Cashfree: (o: { mode: string }) => unknown }).Cashfree);
    };
    s.onerror = () => resolve(null);
    document.body.appendChild(s);
  });
}

export default function McqCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Countdown timer for urgency (10 minutes)
  const [timeLeft, setTimeLeft] = useState(599);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (typeof window !== "undefined" && (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq) {
      const fbq = (window as unknown as { fbq: (...a: unknown[]) => void }).fbq;
      const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID_GSRTC || "1399128725611345";
      fbq("track", "InitiateCheckout", {
        value: PRICE,
        currency: "INR",
        content_name: PRODUCT_NAME,
      });
      fbq("trackSingle", pixelId, "InitiateCheckout", {
        value: PRICE,
        currency: "INR",
        content_name: PRODUCT_NAME,
      });
    }
  }, []);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("કૃપા કરીને બધી વિગતો ભરો.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("કૃપા કરીને સાચો 10 અંકનો મોબાઇલ / WhatsApp નંબર દાખલ કરો.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout/cashfree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: PRICE, name, email, phone, productName: PRODUCT_NAME }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const goThankYou = (extra: Record<string, string>) => {
        const q = new URLSearchParams({
          name,
          email,
          amountPaid: String(PRICE),
          productName: PRODUCT_NAME,
          product: "mcq",
          ...extra,
        });
        router.push(`/gsrtc-mcq-course/thank-you?${q.toString()}`);
      };

      if (data.mock) {
        setTimeout(
          () => goThankYou({ order_id: data.orderId, mock: "true" }),
          1200
        );
        return;
      }

      const CashfreeSDK = await loadCashfree();
      if (!CashfreeSDK) throw new Error("Cashfree લોડ થઈ શક્યું નહીં.");

      const envMode = process.env.NEXT_PUBLIC_CASHFREE_ENV === "SANDBOX" ? "sandbox" : "production";
      const cashfree = (CashfreeSDK as (opts: { mode: string }) => {
        checkout: (opts: { paymentSessionId: string; redirectTarget?: string }) => Promise<unknown>;
      })({ mode: envMode });

      await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "કંઈક ભૂલ આવી. ફરી પ્રયાસ કરો."
      );
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Top Header */}
      <header className={styles.bar}>
        <div className={styles.barInner}>
          <button type="button" className={styles.back} onClick={handleBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>પાછા જાઓ</span>
          </button>
          <div className={styles.brand}>
            Nokri<span>Mitra</span><span className={styles.brandTld}>.in</span>
          </div>
          <div className={styles.secureBadge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
            <span>100% સુરક્ષિત</span>
          </div>
        </div>
      </header>

      {/* Timer Urgency Strip */}
      <div className={styles.timerStrip}>
        <div className={styles.timerContent}>
          <span className={styles.pulseDot} />
          <span>🔥 <strong>સ્પેશિયલ લૉન્ચ ઓફર (Today Only):</strong> કિંમત ₹49 લૉક કરેલી છે! સમય બાકી: <strong className={styles.countdown}>{formatTimer(timeLeft)}</strong></span>
        </div>
      </div>

      <main className={styles.wrap}>
        <div className={styles.grid}>
          {/* Form Card (First on Mobile, Left on Desktop) */}
          <section className={styles.formCard} aria-labelledby="form-title">
            <div className={styles.formHeader}>
              <div className={styles.stepBadge}>ઝડપી 1-સ્ટેપ ચેકઆઉટ</div>
              <h1 className={styles.formTitle} id="form-title">
                ઓર્ડર વિગતો દાખલ કરો
              </h1>
              <p className={styles.formSub}>
                ⚡ પેમેન્ટ થતાં જ સ્ક્રીન પર અને ઈમેલ પર PDF ડાઉનલોડ લિંક મળશે.
              </p>
            </div>

            <form onSubmit={handlePay} className={styles.checkoutForm}>
              {error && (
                <div className={styles.err} role="alert">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label htmlFor="cust-name">
                    <span>પૂરું નામ</span>
                    <span className={styles.req}>*</span>
                  </label>
                  <div className={styles.inputWrap}>
                    <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input
                      id="cust-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="તમારું આખું નામ લખો"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="cust-email">
                    <span>ઈમેલ એડ્રેસ</span>
                    <span className={styles.req}>*</span>
                  </label>
                  <div className={styles.inputWrap}>
                    <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <input
                      id="cust-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                  <span className={styles.hint}>
                    ✉️ આ ઈમેલ પર PDF ની કાયમી ડાઉનલોડ લિંક મળશે.
                  </span>
                </div>

                <div className={styles.field}>
                  <label htmlFor="cust-phone">
                    <span>WhatsApp / મોબાઇલ નંબર</span>
                    <span className={styles.req}>*</span>
                  </label>
                  <div className={styles.inputWrap}>
                    <span className={styles.countryCode}>🇮🇳 +91</span>
                    <input
                      id="cust-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      disabled={loading}
                      required
                    />
                  </div>
                  <span className={styles.hint}>
                    📲 ઓર્ડર કન્ફર્મેશન અને ઇન્સ્ટન્ટ અપડેટ માટે.
                  </span>
                </div>
              </div>

              {/* Price Summary Box */}
              <div className={styles.priceSummaryBox}>
                <div className={styles.priceSummaryRow}>
                  <span>મૂળ કિંમત (MRP)</span>
                  <span className={styles.priceStrike}>₹{OLD_PRICE}</span>
                </div>
                <div className={styles.priceSummaryRow}>
                  <span>સ્પેશિયલ લૉન્ચ ડિસ્કાઉન્ટ</span>
                  <span className={styles.discountGreen}>- ₹{SAVINGS} ({DISCOUNT}% OFF)</span>
                </div>
                <div className={styles.priceSummaryDivider} />
                <div className={styles.totalRow}>
                  <div>
                    <span className={styles.totalLabel}>કુલ ચૂકવવાપાત્ર રકમ:</span>
                    <span className={styles.totalSub}>એક વખતનું પેમેન્ટ · કોઈ છુપો ચાર્જ નથી</span>
                  </div>
                  <div className={styles.totalPriceWrap}>
                    <span className={styles.totalAmount}>₹{PRICE}</span>
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button type="submit" className={styles.payBtn} disabled={loading}>
                {loading ? (
                  <span className={styles.loadingSpinner}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.spin}>
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                      <path d="M12 2a10 10 0 0 1 10 10"/>
                    </svg>
                    પેમેન્ટ વિન્ડો ખૂલી રહી છે...
                  </span>
                ) : (
                  <span className={styles.payBtnMain}>
                    🔒 પેમેન્ટ કરો અને તરત PDF મેળવો – ₹{PRICE}
                  </span>
                )}
              </button>

              {/* Trust Badges below button */}
              <div className={styles.trustGrid}>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}>🛡️</span>
                  <span>100% સુરક્ષિત પેમેન્ટ</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}>⚡</span>
                  <span>તરત ડાઉનલોડ લિંક</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}>📱</span>
                  <span>મોબાઈલ/ટેબ્લેટ સપોર્ટ</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}>♾️</span>
                  <span>લાઇફટાઇમ એક્સેસ</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className={styles.paymentMethodsRow}>
                <span className={styles.paymentMethodsLabel}>સ્વીકાર્ય પેમેન્ટ વિકલ્પો:</span>
                <div className={styles.upiBadges}>
                  <span className={styles.badgeGpay}>GPay</span>
                  <span className={styles.badgePhonepe}>PhonePe</span>
                  <span className={styles.badgePaytm}>Paytm</span>
                  <span className={styles.badgeUpi}>UPI</span>
                  <span className={styles.badgeCard}>Cards</span>
                  <span className={styles.badgeNet}>NetBanking</span>
                </div>
              </div>
            </form>
          </section>

          {/* Right Column / Below on Mobile: Order Summary */}
          <aside className={styles.summary} aria-labelledby="summary-title">
            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <span className={styles.summaryBadge}>તમારો ઓર્ડર</span>
                <span className={styles.ratingStars}>★★★★★ 4.9 (2000+ રિવ્યુ)</span>
              </div>

              <div className={styles.prodRow}>
                <div className={styles.prodImgWrap}>
                  <Image
                    src={heroImg}
                    alt={PRODUCT_NAME}
                    className={styles.prodImg}
                    priority
                  />
                </div>
                <div className={styles.prodInfo}>
                  <h2 className={styles.prodTitle} id="summary-title">
                    {PRODUCT_NAME}
                  </h2>
                  <p className={styles.prodTag}>સંપૂર્ણ અને અપડેટેડ 2026 સિલેબસ</p>
                  <div className={styles.prodPriceTag}>
                    <strong className={styles.prodPriceNow}>₹{PRICE}</strong>
                    <span className={styles.prodPriceOld}>₹{OLD_PRICE}</span>
                    <span className={styles.prodPriceOff}>{DISCOUNT}% OFF</span>
                  </div>
                </div>
              </div>

              <div className={styles.includedHeader}>📦 આ પેકેજમાં શું મળશે:</div>
              <ul className={styles.check}>
                {checklist.map((c) => (
                  <li key={c}>
                    <span className={styles.tick} aria-hidden="true">
                      ✓
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              {/* Trust Razorpay Badge */}
              <div className={styles.trustBanner}>
                <Image
                  src={razorpayBadge}
                  alt="Razorpay 100% સુરક્ષિત પેમેન્ટ"
                  className={styles.razorpayImg}
                />
              </div>

              {/* WhatsApp Support Box */}
              <a
                className={styles.waHelp}
                href={`https://wa.me/919104826422?text=${encodeURIComponent(
                  "નમસ્તે, હું GSRTC કંડક્ટર Model Papers પેકેજના ચેકઆઉટ પર છું. મને ખરીદીમાં મદદ જોઈએ છે."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.waHelpIconWrap}>
                  <svg viewBox="0 0 32 32" width="22" height="22" fill="#ffffff">
                    <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm5.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z" />
                  </svg>
                </div>
                <div className={styles.waHelpText}>
                  <strong>પેમેન્ટમાં કોઈ પ્રશ્ન કે સમસ્યા છે?</strong>
                  <span>WhatsApp પર સપોર્ટ મેળવો (9104826422)</span>
                </div>
              </a>

              {/* Legal Links */}
              <nav className={styles.legal} aria-label="કાનૂની લિંક્સ">
                <a href="/privacy-policy">પ્રાઈવસી પોલિસી</a>
                <span>·</span>
                <a href="/refund-policy">રિફંડ પોલિસી</a>
                <span>·</span>
                <a href="/terms">નિયમો અને શરતો</a>
              </nav>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

