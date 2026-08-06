import type { Metadata } from "next";
import OpdLegal from "../OpdLegal";

export const metadata: Metadata = {
  title: "Terms & Conditions | OPD Mastery E-Book | NokriMitra",
  description: "Terms & Conditions for the OPD Mastery E-Book by NokriMitra.",
  robots: { index: false, follow: true },
};

export default function OpdTermsPage() {
  return (
    <OpdLegal title="Terms & Conditions" updated="August 2026">
      <p>
        By purchasing and using the OPD Mastery e-book, you agree to the
        following terms.
      </p>

      <h2>The Product</h2>
      <p>
        OPD Mastery is a digital educational reference e-book (PDF) covering
        selected common OPD topics, priced at ₹199 as a one-time payment.
        Access is provided through a download link shown after payment and also
        sent to your email.
      </p>

      <h2>License &amp; Usage</h2>
      <ul>
        <li>The e-book is licensed for your personal use only.</li>
        <li>You may not resell, redistribute, or share the file with others.</li>
        <li>You may not reproduce or republish the content as your own.</li>
      </ul>

      <h2>Educational Use Only</h2>
      <p>
        The content is intended as a study and reference aid. It does not
        replace clinical judgement, institutional protocols, or the guidance of
        a qualified supervising physician. Always follow current guidelines and
        your local standards of care.
      </p>

      <h2>Delivery</h2>
      <p>
        Delivery is automatic and instant. If you do not receive access after a
        successful payment, contact us with your Order ID and we will resend
        your link.
      </p>

      <h2>Contact</h2>
      <p>
        For any questions, email us at{" "}
        <a href="mailto:goexam777@gmail.com">goexam777@gmail.com</a>.
      </p>
    </OpdLegal>
  );
}
