"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import styles from "./checkout.module.css";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const PRICE = 29;
const OLD_PRICE = 299;
const SAVINGS = OLD_PRICE - PRICE;
const DISCOUNT = Math.round((SAVINGS / OLD_PRICE) * 100);
const PRODUCT_NAME = "GSRTC કંડક્ટર 2026 Model Papers & MCQ પેકેજ";

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
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
            <span>100% સુરક્ષિત</span>
          </div>
        </div>
      </header>

      {/* Timer Urgency Strip */}
      <div className={styles.timerStrip}>
        <div className={styles.timerContent}>
          <span className={styles.pulseDot} />
          <span>🔥 <strong>નવરાત્રી સ્પેશિયલ ઑફર!:</strong> આજે જ મેળવો માત્ર <strong>₹29</strong> માં - ઓફર પૂર્ણ થતાં કિંમત વધીને <strong>₹99</strong> થઈ જશે! સમય બાકી: <strong className={styles.countdown}>{formatTimer(timeLeft)}</strong></span>
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
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
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
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
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
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
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
                <div className={styles.prodSummaryMini}>
                  <span className={styles.prodSummaryTitle}>📦 {PRODUCT_NAME}</span>
                </div>
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
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
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

          {/* WhatsApp Concierge Card from /opd-mastery/checkout */}
          <div className={styles.bottomSupportWrap}>
            <a
              href={`https://wa.me/919104826422?text=${encodeURIComponent(
                "નમસ્તે, હું GSRTC કંડક્ટર Model Papers પેકેજના ચેકઆઉટ પર છું. મને ખરીદીમાં મદદ જોઈએ છે."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waConcierge}
              aria-label="WhatsApp પર સપોર્ટ મેળવો"
            >
              <div className={styles.waAvatar}>
                <WhatsAppIcon className={styles.waIconSvg} />
                <span className={styles.waStatusDot} aria-hidden="true" />
              </div>
              <div className={styles.waInfo}>
                <span className={styles.waHeading}>મદદ જોઈએ છે? WhatsApp પર ચેટ કરો</span>
                <span className={styles.waSub}>
                  +91 91048 26422 <span className={styles.waDot}>•</span> ઝડપી જવાબ મળશે
                </span>
              </div>
              <div className={styles.waArrowCircle} aria-hidden="true">
                <ArrowRight size={14} strokeWidth={2.5} />
              </div>
            </a>

            <nav className={styles.legal} aria-label="કાનૂની લિંક્સ">
              <a href="/privacy-policy">પ્રાઈવસી પોલિસી</a>
              <span>·</span>
              <a href="/refund-policy">રિફંડ પોલિસી</a>
              <span>·</span>
              <a href="/terms">નિયમો અને શરતો</a>
            </nav>
          </div>
        </div>
      </main>

      {/* Floating Circular WhatsApp Button (Bottom-Left on Checkout, from /opd-mastery/checkout) */}
      <a
        href={`https://wa.me/919104826422?text=${encodeURIComponent(
          "નમસ્તે, હું GSRTC કંડક્ટર Model Papers પેકેજના ચેકઆઉટ પર છું. મને ખરીદીમાં મદદ જોઈએ છે."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatWhatsAppLeft}
        aria-label="WhatsApp પર સપોર્ટ મેળવો"
      >
        <WhatsAppIcon className={styles.floatWaIcon} />
      </a>
    </div>
  );
}

