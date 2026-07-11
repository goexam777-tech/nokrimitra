import type { Metadata } from "next";
import PsyLegal from "../PsyLegal";

export const metadata: Metadata = {
  title: "Terms & Conditions — Psychology Notes | NokriMitra",
  description: "Terms & Conditions for the Psychology Notes digital bundle by NokriMitra.",
};

export default function PsyTerms() {
  return (
    <PsyLegal title="Terms & Conditions" updated="July 2026">
      <p>
        By purchasing or using the <strong>Psychology Notes</strong> bundle, you
        agree to the following terms.
      </p>

      <h2>1. Use of Content</h2>
      <p>
        The notes and materials are for your <strong>personal study only</strong>.
        Sharing, reselling, redistributing or any commercial use is strictly
        prohibited.
      </p>

      <h2>2. Copyright</h2>
      <p>
        All content is owned by NokriMitra and protected by copyright.
        Unauthorized copying or distribution may lead to legal action.
      </p>

      <h2>3. Payment & Delivery</h2>
      <p>
        Payments are processed securely via Razorpay. After successful payment,
        access/download is provided instantly and also sent to your email.
      </p>

      <h2>4. Refunds</h2>
      <p>
        As this is a digital product, all sales are final. Please see our{" "}
        <a href="/psychology-notes/refund-policy">Refund Policy</a>.
      </p>

      <h2>5. Disclaimer</h2>
      <p>
        This material is for learning and preparation. We do not guarantee any
        specific exam result or outcome.
      </p>

      <h2>6. Contact</h2>
      <p>
        Email: <a href="mailto:goexam777@gmail.com">goexam777@gmail.com</a>
      </p>
    </PsyLegal>
  );
}
