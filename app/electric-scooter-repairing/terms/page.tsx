import type { Metadata } from "next";
import EvLegal from "../EvLegal";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title:
    "Terms & Conditions — Electric Scooter Repairing Guide (Hindi) | NokriMitra",
  description:
    "Terms and Conditions for purchasing and using the Electric Scooter Repairing Complete Practical Guide (Hindi) digital PDF.",
  robots: { index: true, follow: true },
};

export default function EvTerms() {
  return (
    <EvLegal title="Terms & Conditions" updated="August 2026">
      <p>
        By purchasing or using the <strong>Electric Scooter Repairing Complete
        Practical Guide (Hindi)</strong> from NokriMitra, you agree to the terms
        below. Please read them before buying.
      </p>

      <h2>What You Are Buying</h2>
      <ul>
        <li>A digital guide delivered as a <strong>PDF file</strong>.</li>
        <li>
          Written in <strong>Hindi</strong>, with common technical terms kept in
          English.
        </li>
        <li>
          A one-time payment of <strong>₹149</strong>, with no recurring
          charges.
        </li>
        <li>
          Lifetime access to the file you download, for your own personal use.
        </li>
      </ul>

      <h2>What Is Not Included</h2>
      <ul>
        <li>No printed or physical book is shipped.</li>
        <li>No video course, live class or personal training.</li>
        <li>No certificate, diploma or professional qualification.</li>
        <li>No spare parts, tools or repair services.</li>
        <li>No promise of employment, income or business results.</li>
      </ul>

      <h2>Delivery</h2>
      <p>
        After a successful payment, the download link appears on the thank-you
        page and is also emailed to the address you provide. Please enter your
        email carefully — an incorrect address is the most common reason a
        buyer does not receive the email. If the email is missing, check your
        Spam or Promotions folder, then contact us.
      </p>

      <h2>Download Links</h2>
      <p>
        Your download link is personal to your order. Links are issued after
        payment verification and are valid for one year. Do not share your
        download link publicly. If your link stops working, contact us with your
        Order ID and we will issue a new one.
      </p>

      <h2>Licence and Permitted Use</h2>
      <p>You may:</p>
      <ul>
        <li>Read the guide on your own phone, tablet or computer.</li>
        <li>Print a copy for your own personal or workshop reference.</li>
      </ul>
      <p>You may not:</p>
      <ul>
        <li>Resell, rent or redistribute the PDF, in full or in part.</li>
        <li>Upload it to public groups, websites, cloud drives or file sharing platforms.</li>
        <li>
          Copy the content into your own course, book or paid material without
          written permission.
        </li>
        <li>Remove any branding or ownership notices from the file.</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        All content in the guide, including text, diagrams and layout, belongs to
        NokriMitra. Buying the guide gives you a personal licence to use it, not
        ownership of the content.
      </p>

      <h2>Educational Purpose and Safety</h2>
      <p>
        The guide is educational material. Electric scooters contain high-current
        battery systems that can be dangerous. You are responsible for working
        safely and for any work you carry out. See our{" "}
        <a href="/electric-scooter-repairing/disclaimer">Disclaimer</a> for full
        details.
      </p>

      <h2>Pricing and Payments</h2>
      <p>
        Prices are shown in Indian Rupees (INR) and may change at any time.
        Payments are processed by Razorpay. We do not store your card, UPI or
        banking credentials.
      </p>

      <h2>Refunds</h2>
      <p>
        As a digital product, the guide is non-refundable once delivered. Please
        see our{" "}
        <a href="/electric-scooter-repairing/refund-policy">Refund Policy</a>.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, NokriMitra is not liable for any
        damage, loss, injury or expense resulting from the use or misuse of the
        information in this guide. Our total liability for any claim is limited
        to the amount you paid for the product.
      </p>

      <h2>Content Updates</h2>
      <p>
        We may improve or update the guide over time. Technical details about
        specific scooter models can change with manufacturer revisions, so
        always confirm against the documentation for the vehicle you work on.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of India, and disputes are subject
        to the jurisdiction of courts in Gujarat, India.
      </p>

      <h2>Contact</h2>
      <p>
        Email:{" "}
        <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a>
        <br />
        WhatsApp: <a href="https://wa.me/919104826422">+91 91048 26422</a>
      </p>

      <div className={styles.note}>
        Completing a purchase means you accept these Terms, the Refund Policy,
        the Privacy Policy and the Disclaimer.
      </div>
    </EvLegal>
  );
}
