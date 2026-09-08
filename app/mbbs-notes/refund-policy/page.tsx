import type { Metadata } from "next";
import MbbsLegal from "../MbbsLegal";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Refund Policy — Complete MBBS Notes | NokriMitra",
  description:
    "Refund Policy for Complete MBBS Notes (All 21 Subjects, 3,826 Pages) — Digital products are non-refundable with a same-day delivery support guarantee.",
};

export default function MbbsRefundPolicyPage() {
  return (
    <MbbsLegal title="Refund Policy" updated="September 2026">
      <div className={styles.calloutBox}>
        ⚠️ <strong>Digital Product Policy:</strong> The Complete MBBS Notes bundle consists of downloadable
        digital PDF files. Because access and download links are delivered immediately upon payment,{" "}
        <strong>all sales are final and non-refundable</strong> under any circumstances.
      </div>

      <h2>1. Why All Sales Are Final</h2>
      <p>
        Unlike physical products, digital PDF notes cannot be physically returned or recalled once
        downloaded or stored on your phone, tablet, or laptop. Therefore, we do not offer refunds or
        chargebacks once the download link is provided.
      </p>

      <h2>2. Full Transparency Before You Buy</h2>
      <p>
        To ensure you make an informed decision before purchasing at ₹199, our website provides complete
        transparency:
      </p>
      <ul>
        <li><strong>Full Subject List:</strong> All 21 subjects with exact individual page counts (totaling 3,826 pages).</li>
        <li><strong>Authentic Sample Pages:</strong> A live interactive slider showcasing actual pages with anatomical diagrams, pharmacological charts, and clinical summaries.</li>
        <li><strong>Transparent FAQs:</strong> Detailed answers to all common questions regarding printability, delivery, and device compatibility.</li>
      </ul>

      <h2>3. Delivery Guarantee ("You Will Not Be Left Stuck")</h2>
      <div className={styles.guaranteeCallout}>
        ✅ <strong>Same-Day Support Guarantee:</strong> If an email does not arrive in your inbox or spam
        folder, or a file does not open on your device, message us directly on WhatsApp at{" "}
        <strong>+91 9104826422</strong> with your order number. We will manually verify your payment,
        resend the download files directly, and stay on it until you have full access the same day.
      </div>

      <h2>4. Duplicate Payment Resolution</h2>
      <p>
        If your account was charged twice due to a network glitch or banking timeout for a single order,
        please send screenshots of both transaction IDs to our WhatsApp support at{" "}
        <strong>+91 9104826422</strong>. Upon banking verification, the accidental duplicate charge will
        be refunded within 5–7 business days to your original payment method.
      </p>

      <h2>5. Contact Support</h2>
      <p>
        For any order-related queries or assistance, reach us on:
      </p>
      <ul>
        <li><strong>WhatsApp:</strong> +91 9104826422</li>
        <li><strong>Email:</strong> support@nokrimitra.in</li>
      </ul>
    </MbbsLegal>
  );
}
