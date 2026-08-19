"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import heroImg from "@/public/166b7903-e5fb-4b19-8ac7-a530a7215d05.webp";
import waReview1 from "@/public/wa-review-1.jpg";
import waReview2 from "@/public/wa-review-2.png";
import waReview3 from "@/public/wa-review-3.png";
import styles from "./checkout.module.css";

const PRICE = 99;
const OLD_PRICE = 299;
const DISCOUNT = Math.round(((OLD_PRICE - PRICE) / OLD_PRICE) * 100);
const PRODUCT_NAME = "GSRTC કંડક્ટર MCQ પેકેજ";

// Keep this in sync with your real order count.
const BUYER_COUNT = "300+";

const checklist = [
  "2500+ MCQs (જવાબ સાથે)",
  "21 Model Practice Papers",
  "10 Content PDFs",
  "10 Computer Notes",
  "તરત ડાઉનલોડ + ઈમેલ પર લિંક",
  "લાઇફટાઇમ એક્સેસ",
];

const payMethods = [
  "UPI",
  "PhonePe",
  "Google Pay",
  "Paytm",
  "Visa",
  "Mastercard",
];

const waReviews = [
  { src: waReview1, alt: "ખરીદનાર ઉમેદવારનો WhatsApp પ્રતિભાવ 1" },
  { src: waReview2, alt: "ખરીદનાર ઉમેદવારનો WhatsApp પ્રતિભાવ 2" },
  { src: waReview3, alt: "ખરીદનાર ઉમેદવારનો WhatsApp પ્રતિભાવ 3" },
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

  useEffect(() => {
    if (typeof window !== "undefined" && (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq) {
      (window as unknown as { fbq: (...a: unknown[]) => void }).fbq(
        "track",
        "InitiateCheckout",
        { value: PRICE, currency: "INR" }
      );
    }
  }, []);

  const handleBack = () => {
    // Prefer the actual previous page (homepage, landing page, ads, etc.)
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/gsrtc-mcq-course");
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError("કૃપા કરીને બધી વિગતો ભરો.");
      return;
    }
    if (phone.length < 10) {
      setError("કૃપા કરીને સાચો વોટ્સએપ નંબર દાખલ કરો.");
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
      <header className={styles.bar}>
        <button type="button" className={styles.back} onClick={handleBack}>
          ← પાછા જાઓ
        </button>
        <div className={styles.brand}>
          Nokri<span>Mitra</span>
        </div>
        <span className={styles.secure}>સુરક્ષિત ચેકઆઉટ</span>
      </header>

      <main className={styles.wrap}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>સ્ટેપ 1 / 1 · ઓર્ડર પૂર્ણ કરો</p>
          <h1 className={styles.pageTitle}>ખરીદી પૂર્ણ કરો</h1>

          <ul className={styles.trustStrip}>
            <li>⭐ {BUYER_COUNT} ઉમેદવારોએ ખરીદી કરી</li>
            <li>⚡ તરત PDF ડિલિવરી</li>
            <li>🔒 100% સુરક્ષિત પેમેન્ટ</li>
          </ul>

          <div className={styles.headPrice}>
            <span className={styles.headPriceNow}>આજે માત્ર ₹{PRICE}</span>
            <span className={styles.headPriceOld}>₹{OLD_PRICE}</span>
            <span className={styles.headPriceOff}>{DISCOUNT}% OFF</span>
          </div>
        </div>

        <div className={styles.grid}>
          <section className={styles.formCard} aria-labelledby="form-title">
            <h2 className={styles.formTitle} id="form-title">
              તમારી વિગતો
            </h2>
            <p className={styles.formSub} id="delivery-note">
              ડાઉનલોડ લિંક સ્ક્રીન પર અને તમારા ઈમેલ પર મળશે.
            </p>

            <form onSubmit={handlePay} aria-describedby="delivery-note">
              {error && (
                <div className={styles.err} role="alert">
                  {error}
                </div>
              )}

              <div className={styles.field}>
                <label htmlFor="cust-name">આખું નામ</label>
                <input
                  id="cust-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="દા.ત. અશોકભાઈ પટેલ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="cust-email">ઈમેલ એડ્રેસ</label>
                <input
                  id="cust-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="દા.ત. ashok@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                <span className={styles.hint}>
                  આ ઈમેલ પર ડાઉનલોડ લિંક મોકલવામાં આવશે.
                </span>
              </div>
              <div className={styles.field}>
                <label htmlFor="cust-phone">વોટ્સએપ નંબર</label>
                <input
                  id="cust-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="દા.ત. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  disabled={loading}
                  required
                />
              </div>

              <div className={styles.totalRow}>
                <span>
                  કુલ રકમ
                  <small>એક વખતનું પેમેન્ટ</small>
                </span>
                <strong>₹99</strong>
              </div>

              <button type="submit" className={styles.payBtn} disabled={loading}>
                {loading ? (
                  "પ્રોસેસ થઈ રહ્યું છે..."
                ) : (
                  <>
                    <span className={styles.payBtnMain}>
                      📥 તરત PDF મેળવો – માત્ર ₹{PRICE}
                    </span>
                    <span className={styles.payBtnSub}>
                      ⚡ પેમેન્ટ પછી તરત Download Link મળશે
                    </span>
                  </>
                )}
              </button>

              <div className={styles.rzpRow}>
                <span className={styles.rzpLabel}>🔒 100% Secure Payment</span>
              </div>

              <ul className={styles.payMethods} aria-label="પેમેન્ટ વિકલ્પો">
                {payMethods.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>

              <p className={styles.note}>
                SSL એન્ક્રિપ્ટેડ પેમેન્ટ · પેમેન્ટ પછી તરત ડાઉનલોડ
              </p>
            </form>

            <div className={styles.reviews}>
              <p className={styles.reviewsTitle}>
                ખરીદનાર ઉમેદવારોના WhatsApp પ્રતિભાવ
              </p>
              <div className={styles.waMarquee}>
                <div className={styles.waTrack}>
                  {[...waReviews, ...waReviews].map((r, i) => (
                    <figure className={styles.waShot} key={`${r.alt}-${i}`}>
                      <Image
                        src={r.src}
                        alt={i < waReviews.length ? r.alt : ""}
                        aria-hidden={i >= waReviews.length}
                        className={styles.waShotImg}
                        sizes="(max-width: 600px) 82vw, 300px"
                        loading={i === 0 ? "eager" : "lazy"}
                      />
                    </figure>
                  ))}
                </div>
              </div>
              <p className={styles.reviewsNote}>
                ખરીદનારાઓ સાથેની અસલ WhatsApp વાતચીતના સ્ક્રીનશોટ.
              </p>
            </div>
          </section>

          <aside className={styles.summary} aria-labelledby="summary-title">
            <p className={styles.summaryLabel}>તમારો ઓર્ડર</p>

            <div className={styles.prodRow}>
              <Image src={heroImg} alt={PRODUCT_NAME} className={styles.prodImg} />
              <div>
                <h2 className={styles.prodTitle} id="summary-title">
                  {PRODUCT_NAME}
                </h2>
                <p className={styles.prodType}>ડિજિટલ PDF · લાઇફટાઇમ એક્સેસ</p>
              </div>
            </div>

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

            <div className={styles.priceRow}>
              <span>પેકેજ કિંમત</span>
              <span className={styles.priceVals}>
                <span className={styles.priceOld}>₹{OLD_PRICE}</span>
                <strong className={styles.priceNow}>₹{PRICE}</strong>
                <span className={styles.priceOff}>{DISCOUNT}% OFF</span>
              </span>
            </div>

            <a
              className={styles.waHelp}
              href={`https://wa.me/919104826422?text=${encodeURIComponent(
                "નમસ્તે, હું GSRTC કંડક્ટર MCQ પેકેજના ચેકઆઉટ પેજ પર છું. મને ખરીદી અને પેમેન્ટમાં મદદ જોઈએ છે."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.waHelpIcon} aria-hidden="true">
                <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor">
                  <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm5.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z" />
                </svg>
              </span>
              <span>ખરીદતા પહેલાં પ્રશ્ન છે? WhatsApp પર વાત કરો</span>
            </a>

            <nav className={styles.legal} aria-label="કાનૂની લિંક્સ">
              <a href="/privacy-policy">પ્રાઈવસી</a>
              <a href="/refund-policy">રિફંડ</a>
              <a href="/terms">શરતો</a>
            </nav>
          </aside>
        </div>
      </main>
    </div>
  );
}
