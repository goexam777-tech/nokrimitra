import type { Metadata } from "next";
import AiReelsLegal from "../AiReelsLegal";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Refund Policy — 2000+ AI Baby Reels Bundle | NokriMitra",
  description:
    "Refund Policy for the 2000+ AI Baby Reels Bundle digital download.",
  robots: { index: true, follow: true },
};

export default function AiReelsRefundPolicy() {
  return (
    <AiReelsLegal title="Refund Policy" updated="August 2026">
      <div className={styles.callout}>
        The <strong>2000+ AI Baby Reels Bundle</strong> is a digital, instantly
        downloadable product. Once payment is completed and the download link is
        delivered, <strong>no refunds, returns or exchanges are provided</strong>.
      </div>

      <h2>Why Refunds Are Not Available</h2>
      <p>
        The bundle is delivered as downloadable digital files. Because digital
        files can be copied and kept the moment access is given, all sales are
        final once the download link is delivered.
      </p>

      <h2>Please Check Before You Buy</h2>
      <ul>
        <li>Watch the sample videos shown on the product page.</li>
        <li>
          Note that this is a <strong>digital reels bundle</strong> — not a
          physical product, course, or personal service.
        </li>
        <li>
          Confirm you can download and use video files on your device before
          purchasing.
        </li>
        <li>If anything is unclear, contact us before you pay.</li>
      </ul>

      <h2>If You Paid But Did Not Receive the Bundle</h2>
      <p>
        If your payment succeeded but you did not get the download link, we will
        resend it right away. This is not a refund case — you receive the bundle
        you paid for. Contact us with your <strong>Order ID</strong> or payment
        reference and we will fix it quickly.
      </p>

      <h2>Duplicate Payments</h2>
      <p>
        If you were charged twice for the same order due to a technical error,
        the extra amount will be refunded to your original payment method after
        verification. Share both payment references with us.
      </p>

      <h2>Failed Payments</h2>
      <p>
        If money left your account but the order failed, the amount is normally
        reversed automatically by your bank or the payment gateway, usually
        within 5 to 7 working days. If it does not appear, contact us with the
        transaction details.
      </p>

      <h2>Contact</h2>
      <p>
        Email:{" "}
        <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a>
      </p>

      <div className={styles.note}>
        Keep your confirmation email safe — it contains your Order ID and
        download link, which makes any support request much faster.
      </div>
    </AiReelsLegal>
  );
}
