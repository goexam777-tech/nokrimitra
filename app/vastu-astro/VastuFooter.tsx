import styles from "./legal.module.css";

const SUPPORT_EMAIL = "goexam777@gmail.com";

export default function VastuFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>NokriMitra</div>
      <nav className={styles.footerLinks}>
        <a href="/vastu-astro/privacy-policy">Privacy Policy</a>
        <a href="/vastu-astro/terms">Terms &amp; Conditions</a>
        <a href="/vastu-astro/refund-policy">Refund Policy</a>
        <a href={`mailto:${SUPPORT_EMAIL}`}>Contact</a>
      </nav>
      <div className={styles.footerBottom}>
        © {new Date().getFullYear()} NokriMitra. All rights reserved.
      </div>
    </footer>
  );
}
