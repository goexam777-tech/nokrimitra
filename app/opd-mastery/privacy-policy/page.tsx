import type { Metadata } from "next";
import OpdLegal from "../OpdLegal";

export const metadata: Metadata = {
  title: "Privacy Policy | OPD Mastery E-Book | NokriMitra",
  description: "Privacy Policy for the OPD Mastery E-Book by NokriMitra.",
  robots: { index: false, follow: true },
};

export default function OpdPrivacyPage() {
  return (
    <OpdLegal title="Privacy Policy" updated="August 2026">
      <p>
        Your privacy is important to us. This policy explains what information
        we collect when you purchase the OPD Mastery e-book or contact us, and
        how we use it.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Your name, email address and WhatsApp number, provided by you at checkout.</li>
        <li>
          Payment details are processed securely by our payment partner{" "}
          <strong>Razorpay</strong>. We do not store your card number, UPI PIN
          or bank password.
        </li>
        <li>Basic usage data may be collected to improve the website experience.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To deliver the e-book and its download link to your email.</li>
        <li>To provide customer support and respond to your queries.</li>
        <li>To send important updates related to your purchase.</li>
      </ul>

      <h2>Data Sharing</h2>
      <p>
        We do not sell or rent your personal information. Data is shared only
        with trusted service providers (such as our payment gateway and email
        service) strictly to complete your order.
      </p>

      <h2>Contact</h2>
      <p>
        For any privacy related questions, email us at{" "}
        <a href="mailto:goexam777@gmail.com">goexam777@gmail.com</a>.
      </p>
    </OpdLegal>
  );
}
