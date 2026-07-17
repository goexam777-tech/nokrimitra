"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import heroImg from "@/public/gsrtcmcq.webp";
import razorpayBadge from "@/public/razorpay-logo.webp";
import styles from "./checkout.module.css";

const PRICE = 99;
const PRODUCT_NAME = "GSRTC કંડક્ટર MCQ પેકેજ";

const checklist = [
  "5000+ MCQ (જવાબ સાથે)",
  "20 મોડલ પ્રેક્ટિસ પેપર",
  "10 કમ્પ્યુટર નોટ્સ",
  "તરત ડાઉનલોડ + ઈમેલ પર લિંક",
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
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: PRICE, name, email, phone }),
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
          () => goThankYou({ orderId: data.orderId, mock: "true" }),
          1200
        );
        return;
      }

      const ok = await loadRazorpay();
      if (!ok) throw new Error("Razorpay લોડ થઈ શક્યું નહીં.");

      const rzp = new (
        window as unknown as {
          Razorpay: new (o: unknown) => { open: () => void };
        }
      ).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || data.keyId,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "NokriMitra",
        description: PRODUCT_NAME,
        image: "/gsrtc.avif",
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
        theme: { color: "#0b6b3a" },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.open();
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
        <a href="/gsrtc-mcq-course" className={styles.back}>
          ← પાછા જાઓ
        </a>
        <div className={styles.brand}>
          Nokri<span>Mitra</span>
        </div>
        <span className={styles.secure}>🔒 સુરક્ષિત</span>
      </header>

      <div className={styles.wrap}>
        <div className={styles.grid}>
          {/* LEFT: product summary */}
          <aside className={styles.summary}>
            <div className={styles.prodRow}>
              <Image src={heroImg} alt={PRODUCT_NAME} className={styles.prodImg} />
              <div>
                <h2 className={styles.prodTitle}>{PRODUCT_NAME}</h2>
                <div className={styles.stars}>★★★★★ <span>4.9</span></div>
              </div>
            </div>

            <ul className={styles.check}>
              {checklist.map((c) => (
                <li key={c}>
                  <span className={styles.tick}>✓</span> {c}
                </li>
              ))}
            </ul>

            <div className={styles.priceRow}>
              <span className={styles.priceOld}>₹299</span>
              <span className={styles.priceNow}>₹99</span>
              <span className={styles.off}>67% OFF</span>
            </div>
          </aside>

          {/* RIGHT: form */}
          <div className={styles.formCard}>
            <h1 className={styles.formTitle}>તમારી વિગતો ભરો</h1>
            <p className={styles.formSub}>
              ડાઉનલોડ લિંક તમારા ઈમેલ પર પણ મોકલવામાં આવશે.
            </p>

            <form onSubmit={handlePay}>
              {error && <div className={styles.err}>{error}</div>}

              <div className={styles.field}>
                <label>આખું નામ</label>
                <input
                  type="text"
                  placeholder="દા.ત. અશોકભાઈ પટેલ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>ઈમેલ એડ્રેસ</label>
                <input
                  type="email"
                  placeholder="દા.ત. ashok@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>વોટ્સએપ નંબર</label>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="દા.ત. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  disabled={loading}
                  required
                />
              </div>

              <div className={styles.totalRow}>
                <span>કુલ રકમ</span>
                <strong>₹99</strong>
              </div>

              <button type="submit" className={styles.payBtn} disabled={loading}>
                {loading ? "પ્રોસેસ થઈ રહ્યું છે..." : "🔒 હમણાં જ ચૂકવો – ₹99"}
              </button>

              <div className={styles.rzpRow}>
                <span>Secured by</span>
                <Image src={razorpayBadge} alt="Razorpay" className={styles.rzpImg} />
              </div>
              <p className={styles.note}>
                256-bit SSL સુરક્ષિત પેમેન્ટ · તરત ડાઉનલોડ
              </p>
            </form>

            <a
              className={styles.waHelp}
              href={`https://wa.me/919104826422?text=${encodeURIComponent(
                "નમસ્તે, હું GSRTC કંડક્ટર MCQ પેકેજના ચેકઆઉટ પેજ પર છું. મને ખરીદી અને પેમેન્ટમાં મદદ જોઈએ છે."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.waHelpIcon} aria-hidden="true">
                <svg viewBox="0 0 32 32" width="22" height="22" fill="#ffffff">
                  <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm5.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z" />
                </svg>
              </span>
              <span>કોઈ શંકા છે? WhatsApp પર પૂછો — તરત મદદ મળશે</span>
            </a>

            <div className={styles.legal}>
              <a href="/privacy-policy">પ્રાઈવસી</a>
              <a href="/refund-policy">રિફંડ</a>
              <a href="/terms">શરતો</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
