import type { Metadata } from "next";
import PsyLegal from "../PsyLegal";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Refund Policy — Psychology Notes | NokriMitra",
  description: "Refund Policy for the Psychology Notes digital bundle — no refunds on digital products.",
};

export default function PsyRefundPolicy() {
  return (
    <PsyLegal title="Refund Policy" updated="July 2026">
      <div className={styles.callout}>
        ⚠️ The Psychology Notes bundle is a <strong>digital product (PDF/ebook)</strong>.
        Once the purchase is completed and access/download is delivered,{" "}
        <strong>no refunds, returns or exchanges are provided</strong> under any circumstances.
      </div>

      <h2>Why No Refunds?</h2>
      <p>
        Because this is a digital product that can be downloaded and accessed
        instantly, it cannot be returned. Therefore all sales are final and
        non-refundable.
      </p>

      <h2>Before You Buy</h2>
      <ul>
        <li>Please review the product details and sample pages shown on the page.</li>
        <li>Read “What you get” and the topics list carefully.</li>
        <li>If you have any doubt, contact us before purchasing.</li>
      </ul>

      <h2>Exception</h2>
      <p>
        If your payment was successful but you did <strong>not</strong> receive
        access due to a technical issue, contact us with your transaction ID and
        we will resend your access or resolve it promptly.
      </p>

      <h2>Contact</h2>
      <p>
        Email:{" "}
        <a href="mailto:goexam777@gmail.com">goexam777@gmail.com</a>
      </p>
    </PsyLegal>
  );
}
