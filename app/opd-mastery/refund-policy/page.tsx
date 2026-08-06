import type { Metadata } from "next";
import OpdLegal from "../OpdLegal";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Refund Policy | OPD Mastery E-Book | NokriMitra",
  description: "Refund Policy for the OPD Mastery E-Book by NokriMitra.",
  robots: { index: false, follow: true },
};

export default function OpdRefundPage() {
  return (
    <OpdLegal title="Refund Policy" updated="August 2026">
      <p className={styles.callout}>
        This is a digital product delivered instantly. Because the download is
        provided immediately after payment, all sales are final and{" "}
        <strong>no refunds</strong> can be provided.
      </p>

      <h2>Why There Are No Refunds</h2>
      <p>
        Once your payment succeeds, you get full access to download the OPD
        Mastery e-book. As the file cannot be returned once downloaded, we are
        unable to offer refunds, exchanges or cancellations.
      </p>

      <h2>Before You Buy</h2>
      <ul>
        <li>Review the listed topics, format and educational disclaimer.</li>
        <li>Check that the price and inclusions match what you expect.</li>
        <li>Contact us before paying if any product detail is unclear.</li>
      </ul>

      <h2>Access Problems</h2>
      <p>
        If your payment succeeded but you did not receive access, this is not a
        refund matter. Contact us with your Order ID and we will make sure you
        get your download link.
      </p>

      <h2>Contact</h2>
      <p>
        For purchase-related help, email us at{" "}
        <a href="mailto:goexam777@gmail.com">goexam777@gmail.com</a>.
      </p>
    </OpdLegal>
  );
}
