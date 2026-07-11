import styles from "./psy.module.css";

const SUPPORT_EMAIL = "goexam777@gmail.com";

export default function PsyFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>NokriMitra</div>
      <nav className={styles.footerLinks}>
        <a href="/psychology-notes/privacy-policy">Privacy Policy</a>
        <a href="/psychology-notes/refund-policy">Refund Policy</a>
        <a href="/psychology-notes/terms">Terms &amp; Conditions</a>
        <a href="/psychology-notes/disclaimer">Disclaimer</a>
        <a href={`mailto:${SUPPORT_EMAIL}`}>Contact</a>
      </nav>
      <div className={styles.footerBottom}>
        © {new Date().getFullYear()} NokriMitra — All rights reserved.
      </div>
    </footer>
  );
}
