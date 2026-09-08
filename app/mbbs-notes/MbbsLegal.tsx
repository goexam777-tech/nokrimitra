import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./legal.module.css";

const WHATSAPP_NUMBER = "9104826422";
const WHATSAPP_INTL = "919104826422";

export default function MbbsLegal({
  title,
  updated = "September 2026",
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.backRow}>
          <Link href="/mbbs-notes" className={styles.backLink}>
            ‹ Back to MBBS Notes
          </Link>
          <span className={styles.productTag}>MBBS Notes Bundle</span>
        </div>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>Last updated: {updated}</p>

        <div className={styles.card}>{children}</div>

        {/* Dedicated WhatsApp Support Banner */}
        <div className={styles.whatsAppBanner}>
          <div className={styles.whatsAppInfo}>
            <span className={styles.whatsAppTitle}>Have questions or need help?</span>
            <span className={styles.whatsAppSub}>WhatsApp: +91 {WHATSAPP_NUMBER}</span>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_INTL}?text=Hi%20NokriMitra%20Support,%20I%20have%20a%20question%20regarding%20MBBS%20Notes`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsAppBtn}
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Footer Navigation */}
        <div className={styles.footerLinksRow}>
          <Link href="/mbbs-notes/terms" className={styles.footerLink}>
            Terms
          </Link>
          <span className={styles.footerDot}>·</span>
          <Link href="/mbbs-notes/privacy-policy" className={styles.footerLink}>
            Privacy
          </Link>
          <span className={styles.footerDot}>·</span>
          <Link href="/mbbs-notes/refund-policy" className={styles.footerLink}>
            Refunds
          </Link>
          <span className={styles.footerDot}>·</span>
          <a
            href={`https://wa.me/${WHATSAPP_INTL}?text=Hi%20NokriMitra%20Support,%20I%20need%20assistance%20with%20MBBS%20Notes`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            <strong>WhatsApp</strong>
          </a>
        </div>
      </div>
    </div>
  );
}
