import type { Metadata } from "next";
import MbbsLegal from "../MbbsLegal";

export const metadata: Metadata = {
  title: "Terms & Conditions — Complete MBBS Notes (All 21 Subjects) | NokriMitra",
  description:
    "Terms & Conditions for Complete MBBS Notes (All 21 Subjects, 3,826 Pages) digital bundle by NokriMitra.",
};

export default function MbbsTermsPage() {
  return (
    <MbbsLegal title="Terms & Conditions" updated="September 2026">
      <p>
        By purchasing or using the <strong>Complete MBBS Notes (All 21 Subjects)</strong> digital
        bundle from NokriMitra, you agree to the following terms and conditions.
      </p>

      <h2>1. Digital Product Description</h2>
      <p>
        The product consists of <strong>21 high-yield subject PDF notes totaling 3,826 pages</strong>,
        covering Pre-Clinical, Para-Clinical, and Clinical subjects, designed specifically for MBBS,
        BDS, BSc Nursing, and NEET-PG students.
      </p>

      <h2>2. Single-User Personal Study License</h2>
      <p>
        Your purchase grants you a single-user, non-exclusive, non-transferable personal license to
        download, read, annotate, and print the materials for your <strong>personal study only</strong>.
      </p>
      <p>
        Sharing access links, redistributing files in WhatsApp/Telegram groups, reselling,
        re-uploading to file-sharing networks, or any commercial exploitation is strictly prohibited
        and violates Indian Copyright Law.
      </p>

      <h2>3. Payment &amp; Instant Delivery</h2>
      <p>
        Payment is a <strong>one-time payment of ₹199</strong> (no recurring subscription and no
        hidden charges). Payments are processed through secure 256-bit encrypted gateways.
      </p>
      <p>
        Upon successful payment:
      </p>
      <ul>
        <li>You will be redirected immediately to a confirmation screen with the direct download link.</li>
        <li>A duplicate copy of the download link is automatically sent to the email address provided at checkout.</li>
      </ul>

      <h2>4. Non-Refundable Policy</h2>
      <p>
        Because this is an instantly downloadable digital PDF collection, all sales are final and
        non-refundable once payment is completed. Please see our full{" "}
        <a href="/mbbs-notes/refund-policy" style={{ color: "#58111a", fontWeight: 700 }}>
          Refund Policy
        </a>{" "}
        for details.
      </p>

      <h2>5. Educational Disclaimer</h2>
      <p>
        These notes are study and revision companions curated to assist in medical examinations. They
        do not substitute formal medical university curriculum, hospital clinical postings, or
        statutory licensing credentials. Clinical decisions in real patient management should always
        follow verified institutional protocols and senior guidance.
      </p>

      <h2>6. Delivery Support &amp; Customer Assistance</h2>
      <p>
        If your payment succeeds but you do not receive the email or any file fails to open on your
        phone or tablet, contact our dedicated WhatsApp support at{" "}
        <strong>+91 9104826422</strong> with your order ID. We guarantee to get it working for you on the
        same day.
      </p>
    </MbbsLegal>
  );
}
