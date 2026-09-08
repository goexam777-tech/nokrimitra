import type { Metadata } from "next";
import MbbsLegal from "../MbbsLegal";

export const metadata: Metadata = {
  title: "Privacy Policy — Complete MBBS Notes | NokriMitra",
  description:
    "Privacy Policy for Complete MBBS Notes (All 21 Subjects) digital bundle by NokriMitra.",
};

export default function MbbsPrivacyPolicyPage() {
  return (
    <MbbsLegal title="Privacy Policy" updated="September 2026">
      <p>
        This Privacy Policy explains how NokriMitra collects, uses, and safeguards your personal
        information when you visit or purchase the <strong>Complete MBBS Notes (All 21 Subjects)</strong>.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Name:</strong> To personalize your purchase confirmation and order receipt.
        </li>
        <li>
          <strong>Email Address:</strong> Strictly required to deliver the PDF access links and download updates.
        </li>
        <li>
          <strong>WhatsApp / Mobile Number:</strong> Used solely for backup delivery if your email bounces or has a typo, and for direct order support.
        </li>
        <li>
          <strong>Payment Information:</strong> Handled entirely by our secure, RBI-authorized payment partner (Razorpay). <strong>We never see or store your credit/debit card numbers, CVV, UPI PINs, or netbanking passwords.</strong>
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To send you the download link and order confirmation.</li>
        <li>To provide same-day customer assistance on WhatsApp if you report any download issue.</li>
        <li>To prevent fraudulent transactions and unauthorized mass distribution.</li>
      </ul>

      <h2>3. Zero Spam &amp; No Selling of Personal Data</h2>
      <p>
        We value your privacy as a student and healthcare professional. We do <strong>not</strong> sell,
        rent, or trade your contact details with any third-party marketing agencies. Your information is
        only shared with necessary infrastructure providers (such as payment processing and transactional
        email services) required to complete your order.
      </p>

      <h2>4. Data Security</h2>
      <p>
        Our checkout and delivery system uses industry-standard <strong>256-bit SSL encryption</strong> to
        ensure all communications between your browser and our servers remain confidential and protected.
      </p>

      <h2>5. Your Rights &amp; Inquiries</h2>
      <p>
        If you wish to update your email address or request data deletion, you can reach out anytime
        via WhatsApp at <strong>+91 9104826422</strong> or email us at{" "}
        <a href="mailto:support@nokrimitra.in" style={{ color: "#58111a", fontWeight: 700 }}>
          support@nokrimitra.in
        </a>
        .
      </p>
    </MbbsLegal>
  );
}
