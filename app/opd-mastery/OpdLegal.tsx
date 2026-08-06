import type { ReactNode } from "react";
import styles from "./legal.module.css";

const SUPPORT_EMAIL = "goexam777@gmail.com";

export default function OpdLegal({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.page}>
      <div className={styles.bar}>
        <a href="/opd-mastery">← Back to OPD Mastery</a>
        <h1>{title}</h1>
      </div>
      <div className={styles.content}>
        {updated ? <p className={styles.updated}>Last updated: {updated}</p> : null}
        {children}
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>NokriMitra</div>
        <nav className={styles.footerLinks}>
          <a href="/opd-mastery/privacy-policy">Privacy Policy</a>
          <a href="/opd-mastery/refund-policy">Refund Policy</a>
          <a href="/opd-mastery/terms">Terms &amp; Conditions</a>
          <a href="/opd-mastery/disclaimer">Disclaimer</a>
          <a href={`mailto:${SUPPORT_EMAIL}`}>Contact</a>
        </nav>
        <div className={styles.footerBottom}>
          © {new Date().getFullYear()} NokriMitra. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
