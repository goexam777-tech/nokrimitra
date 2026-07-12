import type { Metadata } from "next";
import VastuLegal from "../VastuLegal";

export const metadata: Metadata = {
  title: "Terms & Conditions | House Plans & Vastu Bundle | NokriMitra",
  description:
    "Terms & Conditions for the House Plans, AutoCAD Files & Vastu Designs bundle by NokriMitra.",
};

export default function TermsPage() {
  return (
    <VastuLegal title="Terms & Conditions" updated="July 2026">
      <p>
        By purchasing and using the House Plans, AutoCAD Files &amp; Vastu
        Designs bundle, you agree to the following terms.
      </p>

      <h2>The Product</h2>
      <p>
        This is a digital product delivered instantly online. It includes
        ready-made house plans, AutoCAD blocks, 3D elevations, Vastu files and
        video courses. Access is provided through a download link shown after
        payment and also sent to your email.
      </p>

      <h2>License &amp; Usage</h2>
      <ul>
        <li>
          The bundle comes with a Commercial Use License, so you may use the
          files for your own client projects.
        </li>
        <li>
          You may not resell, redistribute, or share the files as your own
          product or bundle.
        </li>
        <li>
          Access is provided for your personal or professional use and should
          not be publicly published for free download.
        </li>
      </ul>

      <h2>Delivery</h2>
      <p>
        Delivery is automatic and instant. If you do not receive access after a
        successful payment, contact us and we will resend your link.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        The files are provided as reference and design resources. You are
        responsible for verifying dimensions, local building codes and site
        conditions before using any plan for actual construction.
      </p>

      <h2>Contact</h2>
      <p>
        For any questions, email us at{" "}
        <a href="mailto:goexam777@gmail.com">goexam777@gmail.com</a>.
      </p>
    </VastuLegal>
  );
}
