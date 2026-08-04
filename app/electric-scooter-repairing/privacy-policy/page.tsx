import type { Metadata } from "next";
import EvLegal from "../EvLegal";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title:
    "Privacy Policy — Electric Scooter Repairing Guide (Hindi) | NokriMitra",
  description:
    "Privacy Policy for the Electric Scooter Repairing Complete Practical Guide (Hindi) digital PDF — what data we collect and how it is used.",
  robots: { index: true, follow: true },
};

export default function EvPrivacyPolicy() {
  return (
    <EvLegal title="Privacy Policy" updated="August 2026">
      <p>
        This Privacy Policy explains what information we collect when you buy
        the <strong>Electric Scooter Repairing Complete Practical Guide
        (Hindi)</strong> from NokriMitra, and how that information is used.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>
          <strong>Name</strong> — used to address your order confirmation.
        </li>
        <li>
          <strong>Email address</strong> — used to send your PDF download link
          and order details.
        </li>
        <li>
          <strong>WhatsApp number</strong> — used only to contact you about your
          order or a delivery issue.
        </li>
        <li>
          <strong>Order information</strong> — order ID, payment ID and amount
          paid, so we can verify and support your purchase.
        </li>
      </ul>

      <h2>Payment Information</h2>
      <p>
        Payments are processed by <strong>Razorpay</strong>. Card numbers, UPI
        IDs, net banking credentials and similar payment details are entered on
        Razorpay&apos;s secure checkout and are{" "}
        <strong>never stored on our servers</strong>. We only receive the
        payment confirmation and identifiers needed to verify your order.
      </p>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To deliver your purchased PDF and download link.</li>
        <li>To verify your payment and prevent fraudulent orders.</li>
        <li>To provide support if you have a download or access problem.</li>
        <li>To keep basic records of completed transactions.</li>
      </ul>

      <h2>Analytics and Advertising</h2>
      <p>
        Our pages use Google Analytics and the Meta (Facebook) Pixel to measure
        page visits, checkout starts and completed purchases. These tools may
        set cookies and collect device and usage data such as browser type,
        approximate location and pages viewed. They help us understand which
        ads and pages work. You can block cookies in your browser settings.
      </p>

      <h2>Email Delivery</h2>
      <p>
        Order emails are sent through <strong>Resend</strong>, our email
        delivery provider. Your name and email address are shared with Resend
        only to deliver these messages.
      </p>

      <h2>Data Sharing</h2>
      <p>
        We do not sell or rent your personal information. Data is shared only
        with the service providers required to complete your order — Razorpay
        for payment, Resend for email, and Google Drive for hosting the PDF
        file — or where required by law.
      </p>

      <h2>Data Retention</h2>
      <p>
        Order records and contact details are kept as long as needed to provide
        support and meet legal or accounting requirements. You may ask us to
        delete your contact details, subject to those requirements.
      </p>

      <h2>Your Choices</h2>
      <ul>
        <li>Ask what personal data of yours we hold.</li>
        <li>Ask us to correct incorrect details.</li>
        <li>Ask us to delete your contact details.</li>
      </ul>

      <h2>Children</h2>
      <p>
        This product is intended for adults and for learners working under
        proper supervision. We do not knowingly collect data from children.
      </p>

      <h2>Contact</h2>
      <p>
        Email:{" "}
        <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a>
        <br />
        WhatsApp: <a href="https://wa.me/919104826422">+91 91048 26422</a>
      </p>

      <div className={styles.note}>
        We may update this policy if our tools or processes change. The
        &ldquo;Last updated&rdquo; date above always reflects the current
        version.
      </div>
    </EvLegal>
  );
}
