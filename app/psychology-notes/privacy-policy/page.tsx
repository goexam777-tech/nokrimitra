import type { Metadata } from "next";
import PsyLegal from "../PsyLegal";

export const metadata: Metadata = {
  title: "Privacy Policy — Psychology Notes | NokriMitra",
  description: "Privacy Policy for the Psychology Notes digital bundle by NokriMitra.",
};

export default function PsyPrivacyPolicy() {
  return (
    <PsyLegal title="Privacy Policy" updated="July 2026">
      <p>
        This Privacy Policy explains how we handle your information when you
        visit this page or purchase the <strong>Psychology Notes</strong>{" "}
        digital bundle. By using this page, you agree to this policy.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>Your name, email address and phone number — provided by you at checkout.</li>
        <li>
          Payment details are processed securely by our payment partner{" "}
          <strong>Razorpay</strong>. We do not store your card number, UPI PIN
          or bank password.
        </li>
        <li>Basic technical data such as browser type and usage analytics/cookies.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To deliver the purchased PDF/ebook and download access.</li>
        <li>To send order confirmation and support messages.</li>
        <li>To improve our content and service.</li>
      </ul>

      <h2>3. Sharing of Information</h2>
      <p>
        We do <strong>not</strong> sell your personal information. It is shared
        only with services required to run this business (such as the payment
        gateway) or when legally required.
      </p>

      <h2>4. Data Security</h2>
      <p>
        We take reasonable measures to keep your data safe. However, no online
        method is 100% secure, so we cannot guarantee absolute security.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal
        information by contacting us.
      </p>

      <h2>6. Contact</h2>
      <p>
        For any privacy-related questions, email us at{" "}
        <a href="mailto:goexam777@gmail.com">goexam777@gmail.com</a>.
      </p>
    </PsyLegal>
  );
}
