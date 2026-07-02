"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsrtcCover from "@/public/pdfhero.webp";
import razorpayBadge from "@/public/razorpay-logo.webp";
import styles from "./buy.module.css";

// Simple Inline SVG Icon Components to avoid package dependency issues
function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="m9 11 2 2 4-4"></path>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
}

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout");
    }
  }, []);

  const checklistItems = [
    "100% અભ્યાસક્રમ આધારિત — GSRTC ના દરેક વિષય",
    "તૈયાર નોંધ — વાંચો અને યાદ રાખો",
    "3000+ MCQ પ્રેક્ટિસ સેટ જવાબ સાથે",
    "4 વર્ષના જૂના પ્રશ્નપત્રો ઉકેલ સહિત",
    "મોબાઇલ ફ્રેન્ડલી PDF + લાઇફટાઇમ એક્સેસ",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
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
      // 1. Call our API to create the order
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1,
          name,
          email,
          phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Order creation failed");
      }

      // 2. Handle mock mode fallback (if keys aren't set yet)
      if (data.mock) {
        setTimeout(() => {
          const queryParams = new URLSearchParams({
            orderId: data.mock ? data.orderId : data.orderId,
            name: name,
            email: email,
            phone: phone,
            amountPaid: "1",
            productName: "GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ",
            mock: "true",
          });
          router.push(`/thank-you?${queryParams.toString()}`);
        }, 1500);
        return;
      }

      // 3. Load Razorpay Script dynamically on client
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay SDK fail to load");
      }

      // 4. Configure Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || data.keyId,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "NokriMitra",
        description: "GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ",
        image: "/gsrtc.avif",
        order_id: data.orderId,
        handler: function (response: any) {
          const queryParams = new URLSearchParams({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            name: name,
            email: email,
            phone: phone,
            amountPaid: "1",
          });
          router.push(`/thank-you?${queryParams.toString()}`);
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#0b6b3a",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "પેમેન્ટ ચાલુ કરવામાં કંઈક ભૂલ આવી. કૃપા કરીને ફરી પ્રયાસ કરો.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.checkoutPage}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.backBtn}>
            <ArrowLeftIcon />
            <span>પાછા જાઓ</span>
          </Link>
          <div className={styles.brandName}>
            Nokri<span className={styles.brandNameAccent}>Mitra</span>
          </div>
          <div className={styles.secureBadge}>
            <ShieldCheckIcon />
            <span>સુરક્ષિત</span>
          </div>
        </div>
      </header>

      {/* TRUST STRIP */}
      <div className={styles.trustStrip}>
        <div className={styles.trustStripInner}>
          <span className={styles.trustItem}>⚡ તાત્કાલિક ડાઉનલોડ</span>
          <span className={styles.trustItem}>🛡️ 100% સુરક્ષિત પેમેન્ટ</span>
          <span className={styles.trustItem}>♾️ લાઇફટાઇમ એક્સેસ</span>
        </div>
      </div>

      <main className={styles.main}>
        {/* Mobile Product Summary Card */}
        <div className={styles.mobileSummary}>
          <div className={styles.productRow}>
            <div className={styles.coverWrapper}>
              <Image
                src={gsrtcCover}
                alt="GSRTC PDF Course Cover"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className={styles.productMeta}>
              <h3 className={styles.productTitle}>GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ</h3>
              <div className={styles.ratingRow}>
                <span className={styles.stars}>★★★★★</span>
                <span className={styles.ratingText}>4.9 (250+ રિવ્યુ)</span>
              </div>
              <div style={{ marginTop: "6px", fontWeight: "800", color: "#0b6b3a", fontSize: "18px" }}>
                ₹1 <span style={{ textDecoration: "line-through", color: "#829ab1", fontSize: "14px", fontWeight: "normal" }}>₹499</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {/* LEFT: Checkout Form */}
          <div className={styles.formCard}>
            <h2 className={styles.title}>તમારી વિગતો ભરો</h2>
            <p className={styles.subtitle}>
              તમારો કોર્સ તરત મેળવવા માટે નીચેની વિગતો સાચી ભરો. ડાઉનલોડ લિંક તમારા ઈમેલ પર પણ મોકલવામાં આવશે.
            </p>

            {error && <div className={styles.errorBox}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>આખું નામ (Full Name)</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <UserIcon />
                  </span>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="દા.ત. અશોકભાઈ પટેલ"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>ઈમેલ એડ્રેસ (Email Address)</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <MailIcon />
                  </span>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder="દા.ત. ashok@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <p className={styles.helperText}>તમારો ડાઉનલોડ લિંક આ ઈમેલ એડ્રેસ પર મોકલવામાં આવશે.</p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>વોટ્સએપ નંબર (WhatsApp Number)</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <PhoneIcon />
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    className={styles.input}
                    placeholder="દા.ત. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className={styles.paymentMethods}>
                <label className={styles.label}>ચુકવણી પદ્ધતિ (Payment Method)</label>
                <div className={styles.gatewaySelector}>
                  <div className={styles.gatewayOption}>
                    <span>UPI / Cards / NetBanking (Razorpay)</span>
                  </div>
                </div>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? (
                  <>
                    <svg className={styles.spinner} viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="30 30" strokeLinecap="round" />
                    </svg>
                    <span>પેમેન્ટ ગેટવે ખુલી રહ્યું છે...</span>
                  </>
                ) : (
                  <>
                    <LockIcon />
                    <span>સુરક્ષિત પેમેન્ટ કરો · ₹1</span>
                  </>
                )}
              </button>

              <div className={styles.secureFooter}>
                <span>🔒 256-bit SSL Secure encryption</span>
                <span>•</span>
                <span>⚡ Instant access</span>
              </div>

              <div className={styles.mobileOnlySecureNotice} style={{ background: "#f8faf8", padding: "12px", borderRadius: "10px", marginBottom: "15px" }}>
                <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.5", color: "#2e3a47", textAlign: "left" }}>
                  🛡️ <strong>સુરક્ષિત પેમેન્ટ ગેરેંટી.</strong> તમારી ચુકવણી સુરક્ષિત ગેટવે દ્વારા પ્રોસેસ થાય છે. પેમેન્ટ પૂર્ણ થયા પછી ફાઇલ્સ તરત જ તમારા સ્ક્રીન પર અને ઈમેલ પર મળશે.
                </p>
              </div>

              <div className={styles.razorpayInfo}>
                <span className={styles.razorpayText}>Secured by</span>
                <Image
                  src={razorpayBadge}
                  alt="Razorpay"
                  className={styles.razorpayLogo}
                  priority
                />
              </div>
            </form>
          </div>

          {/* RIGHT: Order Summary Column (Desktop only) */}
          <div className={styles.summaryColumn}>
            <div className={styles.summaryCard}>
              <div className={styles.productRow}>
                <div className={styles.coverWrapper}>
                  <Image
                    src={gsrtcCover}
                    alt="GSRTC PDF Course Cover"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div className={styles.productMeta}>
                  <h3 className={styles.productTitle}>GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ</h3>
                  <div className={styles.ratingRow}>
                    <span className={styles.stars}>★★★★★</span>
                    <span className={styles.ratingText}>4.9 (250+ રિવ્યુ)</span>
                  </div>
                </div>
              </div>

              <div className={styles.pricingDetails}>
                <div className={styles.priceRow}>
                  <span>મૂળ કિંમત</span>
                  <span className={styles.originalPrice}>₹499</span>
                </div>
                <div className={styles.priceRow}>
                  <span>ખાસ ઓફર ડિસ્કાઉન્ટ</span>
                  <span className={styles.discountValue}>-₹350</span>
                </div>
              </div>

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>કુલ રકમ</span>
                <span className={styles.totalValue}>₹1</span>
              </div>
            </div>

            <div className={styles.checklistCard}>
              <h4 className={styles.checklistTitle}>આ કોર્સમાં શું મળશે:</h4>
              <ul className={styles.checklist}>
                {checklistItems.map((item, idx) => (
                  <li key={idx} className={styles.checklistItem}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.guaranteeBox}>
              <span className={styles.guaranteeIcon}>🛡️</span>
              <div className={styles.guaranteeText}>
                <strong>સુરક્ષિત પેમેન્ટ ગેરેંટી.</strong> તમારી ચુકવણી સુરક્ષિત ગેટવે દ્વારા પ્રોસેસ થાય છે. પેમેન્ટ પૂર્ણ થયા પછી ફાઇલ્સ તરત જ તમારા સ્ક્રીન પર અને ઈમેલ પર મળશે.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>© {new Date().getFullYear()} NokriMitra.in — All rights reserved.</p>
          <div className={styles.footerLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span>•</span>
            <Link href="/refund-policy">Refund Policy</Link>
            <span>•</span>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <span>•</span>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
