import type { Metadata } from "next";
import AiReelsLegal from "../AiReelsLegal";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — 2000+ AI Baby Reels Bundle | NokriMitra",
  description:
    "Privacy Policy for the 2000+ AI Baby Reels Bundle digital download.",
  robots: { index: true, follow: true },
};

export default function AiReelsPrivacyPolicy() {
  return (
    <AiReelsLegal title="Privacy Policy" updated="August 2026">
      <div className={styles.callout}>
        We only collect the details needed to deliver your{" "}
        <strong>2000+ AI Baby Reels Bundle</strong> and to provide support. We
        never sell your personal information.
      </div>

      <h2>Information We Collect</h2>
      <ul>
        <li>
          <strong>Name and email address</strong> you provide at checkout, used
          to deliver your download link and order confirmation.
        </li>
        <li>
          <strong>Payment details</strong> are handled entirely by our payment
          provider. We do not see or store your card, UPI, or bank information.
        </li>
        <li>
          <strong>Basic usage data</strong> (such as pages viewed) may be
          collected through analytics to improve the product page.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To deliver the bundle download link to your email.</li>
        <li>To send order-related and support messages.</li>
        <li>To detect fraud and keep the checkout secure.</li>
      </ul>

      <h2>Payment Security</h2>
      <p>
        All payments are processed through a secure, PCI-compliant payment
        gateway. Sensitive payment data is encrypted and handled by the payment
        provider, not by us.
      </p>

      <h2>Cookies &amp; Analytics</h2>
      <p>
        We may use cookies and third-party analytics (such as Google Analytics
        and Meta Pixel) to understand traffic and improve the experience. You
        can disable cookies in your browser settings at any time.
      </p>

      <h2>Data Sharing</h2>
      <p>
        We share data only with the service providers required to run the store
        — for example the payment gateway and email delivery service. We do not
        sell or rent your personal data to anyone.
      </p>

      <h2>Your Rights</h2>
      <p>
        You can request access to, correction of, or deletion of your personal
        data by contacting us. We will respond within a reasonable time.
      </p>

      <h2>Contact</h2>
      <p>
        Email:{" "}
        <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a>
      </p>

      <div className={styles.note}>
        By purchasing, you agree to this Privacy Policy. We may update it from
        time to time; the latest version is always available on this page.
      </div>
    </AiReelsLegal>
  );
}
