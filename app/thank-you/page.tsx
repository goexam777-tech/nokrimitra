"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./thank-you.module.css";

// Simple Inline SVG Icon Components to avoid package dependency issues
function CheckIcon() {
  return (
    <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg className={styles.loadingSpinner} style={{ color: "#c53030", animation: "none" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className={styles.downloadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className={styles.waIcon} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className={styles.loadingSpinner} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="30 30" strokeLinecap="round" />
    </svg>
  );
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const processedRef = useRef(false);

  // Keep state for order details to avoid losing them when URL query params are cleaned
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    paymentId?: string;
    productName: string;
    amountPaid: string;
    email: string;
  } | null>(null);

  // Read params with sessionStorage fallback
  const getInitialParams = () => {
    if (typeof window === "undefined") {
      return {
        orderId: "N/A",
        paymentId: "",
        signature: "",
        productName: "GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ",
        amountPaid: "149",
        email: "",
        isMock: false
      };
    }

    const cached = sessionStorage.getItem("gsrtc_last_order");
    const parsed = cached ? JSON.parse(cached) : null;

    return {
      orderId: searchParams.get("orderId") || searchParams.get("razorpay_order_id") || parsed?.orderId || "N/A",
      paymentId: searchParams.get("razorpay_payment_id") || parsed?.paymentId || "",
      signature: searchParams.get("razorpay_signature") || parsed?.signature || "",
      productName: searchParams.get("productName") || parsed?.productName || "GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ",
      amountPaid: searchParams.get("amountPaid") || parsed?.amountPaid || "149",
      email: searchParams.get("email") || parsed?.email || "",
      isMock: searchParams.get("mock") === "true" || parsed?.isMock || false,
    };
  };

  const params = getInitialParams();
  const orderId = orderDetails?.orderId || params.orderId;
  const paymentId = orderDetails?.paymentId || params.paymentId;
  const productName = orderDetails?.productName || params.productName;
  const amountPaid = orderDetails?.amountPaid || params.amountPaid;
  const email = orderDetails?.email || params.email;

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    // Cache the order details in state immediately
    setOrderDetails({
      orderId: params.orderId,
      paymentId: params.paymentId,
      productName: params.productName,
      amountPaid: params.amountPaid,
      email: params.email,
    });

    const verifyPayment = async () => {
      // Helper to clean URL from address bar without triggering re-navigation
      const cleanUrl = () => {
        if (typeof window !== "undefined") {
          window.history.replaceState({}, "", "/thank-you");
          // Store details in sessionStorage so they persist on refresh
          sessionStorage.setItem("gsrtc_last_order", JSON.stringify({
            orderId: params.orderId,
            paymentId: params.paymentId,
            productName: params.productName,
            amountPaid: params.amountPaid,
            email: params.email,
            isMock: params.isMock,
          }));
        }
      };

      // 1. If it's a simulated mock checkout, authorize immediately
      if (params.isMock || params.orderId.startsWith("order_mock_")) {
        setLoading(false);
        cleanUrl();
        // Track mock purchase event
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq("track", "Purchase", {
            value: Number(params.amountPaid || 149),
            currency: "INR",
          });
        }
        return;
      }

      // 2. If no payment details are in url, but we came here directly (and nothing in cache)
      if (!params.paymentId || !params.signature) {
        setLoading(false);
        return;
      }

      // 3. Make the API verification call
      try {
        const res = await fetch("/api/checkout/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: params.paymentId,
            razorpay_order_id: params.orderId,
            razorpay_signature: params.signature,
            name: searchParams.get("name") || "",
            email: params.email,
            amountPaid: params.amountPaid,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "વેરિફિકેશન નિષ્ફળ રહ્યું.");
        }

        setLoading(false);
        cleanUrl();
        // Track real purchase event
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq("track", "Purchase", {
            value: Number(params.amountPaid || 149),
            currency: "INR",
          });
        }
      } catch (err: any) {
        console.error("Verification error:", err);
        setError(err.message || "ચુકવણી ચકાસવામાં કંઈક ભૂલ આવી.");
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <SpinnerIcon />
        <h2 style={{ fontSize: "18px", color: "#52606d", marginTop: "12px" }}>પેમેન્ટ વેરિફાય થઈ રહ્યું છે...</h2>
        <p style={{ fontSize: "14px", color: "#829ab1", marginTop: "4px" }}>કૃપા કરીને આ પેજ બંધ કે રીફ્રેશ કરશો નહીં.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.thankYouPage}>
        <header className={styles.header}>
          <div className={styles.headerInner} style={{ justifyContent: "center" }}>
            <Link href="/" className="logo">
              <span className="logo-mark">NM</span>
              <span className="logo-name">
                <span className="logo-word">
                  Nokri<span className="logo-accent">Mitra</span>
                  <span className="logo-tld">.in</span>
                </span>
                <span className="logo-tag">GSRTC કંડક્ટર તૈયારી</span>
              </span>
            </Link>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.card}>
            <div className={styles.successIconWrapper} style={{ backgroundColor: "rgba(197, 48, 48, 0.08)", color: "#c53030" }}>
              <AlertIcon />
            </div>
            <h1 className={styles.title} style={{ color: "#c53030" }}>વેરિફિકેશન નિષ્ફળ!</h1>
            <p className={styles.message} style={{ marginTop: "16px" }}>
              {error}
            </p>
            <p className={styles.message}>
              જો તમારા ખાતામાંથી પૈસા કપાઈ ગયા હોય, તો ચિંતા કરશો નહીં. નીચે આપેલા વોટ્સએપ બટન પર ક્લિક કરીને તમારો ઓર્ડર આઈડી (<b>{orderId}</b>) અમને મોકલો.
            </p>
            <div style={{ marginBottom: "24px" }}>
              <a
                href={`https://wa.me/919104826422?text=નમસ્તે,%20મારે%20GSRTC%20કંડક્ટર%20પેમેન્ટ%20વેરિફિકેશન%20નિષ્ફળ%20ગયું%20છે.%20ઓર્ડર%20આઈડી:%20${orderId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waSupportBtn}
                style={{ marginTop: 0 }}
              >
                <WhatsAppIcon />
                <span>વોટ્સએપ સપોર્ટ (WhatsApp Support)</span>
              </a>
            </div>
            <hr className={styles.divider} />
            <Link href="/buy" className={styles.homeLink}>
              <span>ફરીથી પ્રયાસ કરો</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.thankYouPage}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner} style={{ justifyContent: "center" }}>
          <Link href="/" className="logo">
            <span className="logo-mark">NM</span>
            <span className="logo-name">
              <span className="logo-word">
                Nokri<span className="logo-accent">Mitra</span>
                <span className="logo-tld">.in</span>
              </span>
              <span className="logo-tag">GSRTC કંડક્ટર તૈયારી</span>
            </span>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.successIconWrapper}>
            <CheckIcon />
          </div>

          <h1 className={styles.title}>પેમેન્ટ સફળ રહ્યું!</h1>
          <p className={styles.subtitle}>ચુકવણી સફળતાપૂર્વક પૂર્ણ થઈ ગઈ છે</p>

          <p className={styles.message}>
            અમારા પર વિશ્વાસ મૂકવા બદલ આભાર. તમારો <strong>{productName}</strong> ડાઉનલોડ કરવા માટે તૈયાર છે. નીચે આપેલા ડાઉનલોડ બટન પર ક્લિક કરીને PDF મેળવો.
          </p>

          <div className={styles.downloadWrapper}>
            <a
              href="/go"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.downloadBtn}
            >
              <DownloadIcon />
              <span>પીડીએફ ડાઉનલોડ કરો (Download PDF)</span>
            </a>
          </div>

          {email && (
            <div style={{ marginBottom: "24px", fontSize: "14px", color: "#52606d" }}>
              📩 કોર્સની ડાઉનલોડ લિંક તમારા ઈમેલ <strong>{email}</strong> પર પણ મોકલી દેવામાં આવી છે.
            </div>
          )}

          <div className={styles.detailsBox}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>ઓર્ડર આઈડી (Order ID)</span>
              <span className={`${styles.detailValue} ${styles.detailValueMono}`}>{orderId}</span>
            </div>
            {paymentId && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>પેમેન્ટ આઈડી (Payment ID)</span>
                <span className={`${styles.detailValue} ${styles.detailValueMono}`}>{paymentId}</span>
              </div>
            )}
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>પ્રોડક્ટ (Product)</span>
              <span className={styles.detailValue}>{productName}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>ચૂકવેલ રકમ (Amount)</span>
              <span className={`${styles.detailValue} ${styles.detailValueGreen}`}>₹{amountPaid}/-</span>
            </div>
          </div>

          <div className={styles.tipBox}>
            <h4 className={styles.tipTitle}>મહત્વની સૂચના:</h4>
            <ul className={styles.tipList}>
              <li className={styles.tipListItem}>
                <span className={styles.tipDot}>•</span>
                <span>જો ઈમેલમાં ડાઉનલોડ લિંક ન મળી હોય, તો સ્પામ (Spam) અથવા પ્રમોશન (Promotions) ફોલ્ડર ચેક કરો.</span>
              </li>
            </ul>
          </div>

          <div style={{ marginTop: "24px", marginBottom: "20px" }}>
            <a
              href="https://wa.me/919104826422?text=નમસ્તે,%20મારે%20GSRTC%20કંડક્ટર%20PDF%20કોર્સ%20ડાઉનલોડ%20કરવામાં%20મદદ%20જોઈએ%20છે."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waSupportBtn}
              style={{ marginTop: 0 }}
            >
              <WhatsAppIcon />
              <span>વોટ્સએપ સપોર્ટ (WhatsApp Support)</span>
            </a>
          </div>

          <hr className={styles.divider} />

          <Link href="/" className={styles.homeLink}>
            <span>મુખ્ય પૃષ્ઠ પર જાઓ</span>
            <ArrowRightIcon />
          </Link>
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

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.loadingWrapper}>
          <SpinnerIcon />
          <h2 style={{ fontSize: "18px", color: "#52606d" }}>લોડ થઈ રહ્યું છે...</h2>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
