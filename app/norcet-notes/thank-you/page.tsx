"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Gift,
  HelpCircle,
  Loader2,
  Mail,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import styles from "./thank-you.module.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-norcet",
});

const PRODUCT_NAME = "NORCET 11 Notes (700+ Pages PDF)";
const PRICE = 149;

function ThankYouContent() {
  const params = useSearchParams();
  const rawOrderId = params.get("order_id");
  const name = params.get("name") || "";
  const email = params.get("email") || "";
  const amountPaid = params.get("amountPaid") || String(PRICE);

  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const firedRef = useRef(false);

  useEffect(() => {
    // If no order_id is present at all, fail immediately
    if (!rawOrderId || rawOrderId.trim() === "") {
      setStatus("failed");
      setErrorMessage(
        "No order reference was found. Please complete checkout to obtain access to the NORCET 11 Notes."
      );
      return;
    }

    // Check session storage cache to prevent repeated verify calls on browser refresh
    const cacheKey = `nm_norcet_verified_${rawOrderId}`;
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as { downloadUrl?: string };
        if (parsed.downloadUrl) {
          setDownloadUrl(parsed.downloadUrl);
          setStatus("success");
          return;
        }
      }
    } catch {
      // Storage unavailable
    }

    const verifyOrder = async () => {
      try {
        const res = await fetch("/api/checkout/cashfree/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: rawOrderId,
            name,
            email,
            amountPaid,
            product: "norcet",
            productName: PRODUCT_NAME,
          }),
        });

        const data = await res.json();

        // If Cashfree verification failed or order is not PAID
        if (!res.ok || !data.verified) {
          setStatus("failed");
          setErrorMessage(
            data.error ||
              "Your transaction was not completed or payment was not received. If money was debited from your account, please wait a few minutes or contact support."
          );
          return;
        }

        // Verified successfully!
        const secureDownloadUrl = data.downloadPath || "/norcet-notes/go";
        setDownloadUrl(secureDownloadUrl);
        setStatus("success");

        try {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ downloadUrl: secureDownloadUrl })
          );
        } catch {
          // ignore
        }

        // Trigger FB Pixel and Google Analytics Purchase event ONLY upon verified payment
        if (!firedRef.current) {
          firedRef.current = true;
          const w = window as unknown as {
            fbq?: (...a: unknown[]) => void;
            gtag?: (...a: unknown[]) => void;
          };

          w.fbq?.(
            "track",
            "Purchase",
            {
              value: Number(amountPaid) || PRICE,
              currency: "INR",
              content_name: PRODUCT_NAME,
            },
            { eventID: rawOrderId }
          );

          w.gtag?.("event", "purchase", {
            transaction_id: rawOrderId,
            value: Number(amountPaid) || PRICE,
            currency: "INR",
            items: [{ item_name: PRODUCT_NAME, price: Number(amountPaid) || PRICE }],
          });
        }
      } catch (err: unknown) {
        console.error("Verification error:", err);
        setStatus("failed");
        setErrorMessage(
          "Network error while verifying payment status. Please reload the page or contact support."
        );
      }
    };

    verifyOrder();
  }, [rawOrderId, name, email, amountPaid]);

  return (
    <div className={`${styles.container} ${plusJakarta.variable}`}>
      <div className={styles.card}>
        {/* ================= VERIFYING STATE ================= */}
        {status === "verifying" && (
          <>
            <div className={styles.header}>
              <div className={styles.iconCircleVerifying}>
                <Loader2 size={40} className={styles.spinIcon} />
              </div>
              <h1 className={styles.title}>Verifying Payment...</h1>
              <p className={styles.subtitle}>
                Please wait a moment while we securely confirm your payment status with Cashfree Payments.
              </p>
            </div>

            <div className={styles.receipt}>
              <div className={styles.receiptHeader}>
                <span>TRANSACTION VERIFICATION</span>
                <span className={styles.paidBadge} style={{ background: "#2563eb" }}>
                  CHECKING
                </span>
              </div>
              <div className={styles.receiptBody}>
                <div className={styles.receiptRow}>
                  <span>Product</span>
                  <strong>{PRODUCT_NAME}</strong>
                </div>
                <div className={styles.receiptRow}>
                  <span>Order ID</span>
                  <code className={styles.orderCode}>{rawOrderId || "---"}</code>
                </div>
                <div className={styles.receiptRow}>
                  <span>Amount</span>
                  <span className={styles.priceGreen}>₹{amountPaid}</span>
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <div className={styles.secureLine}>
                <ShieldCheck size={16} className={styles.shieldIcon} />
                <span>Connecting securely to Cashfree Payments Gateway</span>
              </div>
            </div>
          </>
        )}

        {/* ================= FAILED / UNPAID STATE ================= */}
        {status === "failed" && (
          <>
            <div className={styles.header}>
              <div className={styles.iconCircleFailed}>
                <AlertTriangle size={38} className={styles.failedIcon} />
              </div>
              <h1 className={styles.title}>Payment Incomplete</h1>
              <p className={styles.subtitle}>
                We could not confirm a successful payment for this order. Download access has not been granted.
              </p>
            </div>

            <div className={styles.failedAlertBox}>
              <h4 className={styles.failedAlertTitle}>What happened?</h4>
              <p className={styles.failedAlertText}>
                {errorMessage ||
                  "The payment session was either cancelled, failed, or was not completed. If any amount was debited from your bank or UPI, it will be automatically refunded by your bank or updated shortly."}
              </p>
            </div>

            <div className={styles.receipt}>
              <div className={styles.receiptHeader}>
                <span>ORDER STATUS</span>
                <span className={styles.unpaidBadge}>UNPAID</span>
              </div>
              <div className={styles.receiptBody}>
                <div className={styles.receiptRow}>
                  <span>Product</span>
                  <strong>{PRODUCT_NAME}</strong>
                </div>
                {rawOrderId && (
                  <div className={styles.receiptRow}>
                    <span>Order ID</span>
                    <code className={styles.orderCode}>{rawOrderId}</code>
                  </div>
                )}
                {email && (
                  <div className={styles.receiptRow}>
                    <span>Email</span>
                    <span>{email}</span>
                  </div>
                )}
                <div className={styles.receiptRow}>
                  <span>Price</span>
                  <span>₹{amountPaid}</span>
                </div>
              </div>
            </div>

            <div className={styles.failedActions}>
              <a href="/norcet-notes/checkout" className={styles.retryBtn}>
                <RotateCcw size={18} />
                <span>Complete Payment Now (₹{PRICE})</span>
              </a>

              <a
                href={`mailto:support@nokrimitra.in?subject=NORCET%20Payment%20Inquiry%20Order%20${rawOrderId || "Issue"}`}
                className={styles.supportBtn}
              >
                <HelpCircle size={18} />
                <span>Need Help? Contact Support</span>
              </a>

              <a href="/norcet-notes" className={styles.returnHomeBtn}>
                <ArrowLeft size={15} />
                <span>Return to NORCET Notes Page</span>
              </a>
            </div>

            <div className={styles.footer}>
              <p className={styles.supportLine}>
                Support Email:{" "}
                <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a>
              </p>
            </div>
          </>
        )}

        {/* ================= VERIFIED SUCCESS STATE ================= */}
        {status === "success" && (
          <>
            {/* Success Header */}
            <div className={styles.header}>
              <div className={styles.iconCircle}>
                <CheckCircle2 size={44} className={styles.checkIcon} />
              </div>
              <h1 className={styles.title}>Payment Successful!</h1>
              <p className={styles.subtitle}>
                Thank you for purchasing <strong>NORCET 11 Notes</strong>. Your order is confirmed and ready to download.
              </p>
            </div>

            {/* Primary Download Button (Single Access Button) */}
            <div className={styles.downloadBox}>
              <a
                href={downloadUrl || "/norcet-notes/go"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mainDownloadBtn}
              >
                <Download size={22} />
                <span>ACCESS COMPLETE NOTES & BONUSES (GOOGLE DRIVE)</span>
              </a>

              <p className={styles.downloadNote}>
                Click the button above to access all 700+ Pages Notes + 3 Free Bonuses in Google Drive.
              </p>
            </div>

            {/* 3 Free Bonuses Included in this folder */}
            <div className={styles.bonusBox}>
              <div className={styles.bonusHeader}>
                <Gift size={18} className={styles.giftIcon} />
                <span>3 Free Bonuses Included (All available inside the same folder):</span>
              </div>

              <div className={styles.bonusList}>
                <div className={styles.bonusItem}>
                  <div className={styles.bonusInfo}>
                    <FileText size={16} className={styles.bonusDocIcon} />
                    <span className={styles.bonusTitle}>🥇 1,000+ Drug Notes & Nursing Mnemonics</span>
                  </div>
                  <span className={styles.includedBadge}>Included in Folder</span>
                </div>

                <div className={styles.bonusItem}>
                  <div className={styles.bonusInfo}>
                    <FileText size={16} className={styles.bonusDocIcon} />
                    <span className={styles.bonusTitle}>🥈 Nursing Clinical Skills Handbook</span>
                  </div>
                  <span className={styles.includedBadge}>Included in Folder</span>
                </div>

                <div className={styles.bonusItem}>
                  <div className={styles.bonusInfo}>
                    <FileText size={16} className={styles.bonusDocIcon} />
                    <span className={styles.bonusTitle}>🥉 Nursing Exam Master Bundle (10,000+ MCQs)</span>
                  </div>
                  <span className={styles.includedBadge}>Included in Folder</span>
                </div>
              </div>
            </div>

            {/* Email Delivery Note */}
            <div className={styles.emailNotice}>
              <Mail size={20} className={styles.mailIcon} />
              <div>
                <h4 className={styles.noticeTitle}>Check Your Email Inbox</h4>
                <p className={styles.noticeDesc}>
                  A copy of your download link and order receipt has been sent to{" "}
                  <strong>{email || "your registered email address"}</strong>. Please check your Spam or Promotions folder if you do not see it within 5 minutes.
                </p>
              </div>
            </div>

            {/* Order Details Receipt */}
            <div className={styles.receipt}>
              <div className={styles.receiptHeader}>
                <span>OFFICIAL ORDER RECEIPT</span>
                <span className={styles.paidBadge}>PAID</span>
              </div>

              <div className={styles.receiptBody}>
                <div className={styles.receiptRow}>
                  <span>Product</span>
                  <strong>{PRODUCT_NAME}</strong>
                </div>
                <div className={styles.receiptRow}>
                  <span>Order ID</span>
                  <code className={styles.orderCode} suppressHydrationWarning>
                    {rawOrderId}
                  </code>
                </div>
                {name && (
                  <div className={styles.receiptRow}>
                    <span>Customer</span>
                    <span>{name}</span>
                  </div>
                )}
                {email && (
                  <div className={styles.receiptRow}>
                    <span>Email</span>
                    <span>{email}</span>
                  </div>
                )}
                <div className={styles.receiptRow}>
                  <span>Amount Paid</span>
                  <span className={styles.priceGreen}>₹{amountPaid}</span>
                </div>
                <div className={styles.receiptRow}>
                  <span>Access</span>
                  <span className={styles.accessTag}>Lifetime Access</span>
                </div>
              </div>
            </div>

            {/* Security & Support Footer */}
            <div className={styles.footer}>
              <div className={styles.secureLine}>
                <ShieldCheck size={16} className={styles.shieldIcon} />
                <span>Verified 100% Secure Transaction via Cashfree Payments</span>
              </div>

              <p className={styles.supportLine}>
                Need assistance? Email our dedicated support team at{" "}
                <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a>
              </p>

              <p className={styles.copyright} suppressHydrationWarning>
                © {new Date().getFullYear()} NokriMitra.in. All rights reserved.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function NorcetThankYouPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
          <p style={{ fontWeight: 700, color: "#1f57e7" }}>Verifying your order...</p>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
