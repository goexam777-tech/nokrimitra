"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  CheckCircle2,
  Download,
  FileText,
  Gift,
  Mail,
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

  const [orderId, setOrderId] = useState(rawOrderId || "ORD-NORCET-SUCCESS");
  const [downloadUrl, setDownloadUrl] = useState("/norcet-notes/go");

  useEffect(() => {
    if (!rawOrderId) {
      setOrderId("ORD-" + Math.floor(100000 + Math.random() * 900000));
    }
  }, [rawOrderId]);

  useEffect(() => {
    let fired = false;

    const verifyOrder = async () => {
      // If there's an actual Cashfree order ID, call verify
      if (rawOrderId && !rawOrderId.startsWith("order_mock_") && !rawOrderId.startsWith("ORD-")) {
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
          if (res.ok && data.downloadPath) {
            setDownloadUrl(data.downloadPath);
          }
        } catch (err) {
          console.error("Verification check error:", err);
        }
      }

      // Track Purchase events on FB Pixel & Google Analytics once
      if (!fired) {
        fired = true;
        const w = window as unknown as {
          fbq?: (...a: unknown[]) => void;
          gtag?: (...a: unknown[]) => void;
        };

        const finalOrderId = rawOrderId || orderId;

        w.fbq?.(
          "track",
          "Purchase",
          {
            value: Number(amountPaid) || PRICE,
            currency: "INR",
            content_name: PRODUCT_NAME,
          },
          { eventID: finalOrderId }
        );

        w.gtag?.("event", "purchase", {
          transaction_id: finalOrderId,
          value: Number(amountPaid) || PRICE,
          currency: "INR",
          items: [{ item_name: PRODUCT_NAME, price: Number(amountPaid) || PRICE }],
        });
      }
    };

    verifyOrder();
  }, [rawOrderId, orderId, name, email, amountPaid]);

  return (
    <div className={`${styles.container} ${plusJakarta.variable}`}>
      <div className={styles.card}>
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
            href={downloadUrl}
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
                {orderId}
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
      </div>
    </div>
  );
}

export default function NorcetThankYouPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontWeight: 700, color: "#1f57e7" }}>Verifying your order...</p>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
