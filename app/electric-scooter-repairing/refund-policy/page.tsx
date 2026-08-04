import type { Metadata } from "next";
import EvLegal from "../EvLegal";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title:
    "Refund Policy — Electric Scooter Repairing Guide (Hindi) | NokriMitra",
  description:
    "Refund Policy for the Electric Scooter Repairing Complete Practical Guide (Hindi) — digital PDF, no refunds after delivery.",
  robots: { index: true, follow: true },
};

export default function EvRefundPolicy() {
  return (
    <EvLegal title="Refund Policy" updated="August 2026">
      <div className={styles.callout}>
        The <strong>Electric Scooter Repairing Complete Practical Guide
        (Hindi)</strong> is a <strong>digital product (PDF)</strong>. Once the
        payment is completed and the download link is delivered,{" "}
        <strong>no refunds, returns or exchanges are provided</strong>.
      </div>

      <h2>Why Refunds Are Not Available</h2>
      <p>
        The guide is delivered instantly as a downloadable PDF. A digital file
        cannot be returned once it has been accessed, so all sales are final.
      </p>

      <h2>Please Check Before You Buy</h2>
      <ul>
        <li>
          Read the chapter list and the topics covered on the product page.
        </li>
        <li>
          Look at the sample page screenshots shown on the product page.
        </li>
        <li>
          Note that the guide is written in <strong>Hindi</strong>, with English
          used for technical terms.
        </li>
        <li>
          Note that this is a <strong>PDF guide</strong> — not a video course,
          printed book, or personal training programme.
        </li>
        <li>If anything is unclear, contact us before purchasing.</li>
      </ul>

      <h2>If You Paid But Did Not Receive the PDF</h2>
      <p>
        If your payment succeeded but you did not receive access, we will fix it
        or send your download link again. This is not a refund case — you get
        the product you paid for. Contact us with your{" "}
        <strong>Order ID</strong> or payment reference and we will resolve it.
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
        reversed automatically by your bank or by Razorpay, usually within 5 to
        7 working days. If it does not appear, contact us with the transaction
        details.
      </p>

      <h2>Chargebacks</h2>
      <p>
        Please contact us first if something is wrong with your order. Most
        delivery issues are resolved quickly, and that is faster for you than a
        bank dispute.
      </p>

      <h2>Contact</h2>
      <p>
        Email:{" "}
        <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a>
        <br />
        WhatsApp: <a href="https://wa.me/919104826422">+91 91048 26422</a>
      </p>

      <div className={styles.note}>
        Keep the confirmation email safe. It contains your Order ID and your
        download link, which makes support requests much faster.
      </div>
    </EvLegal>
  );
}
