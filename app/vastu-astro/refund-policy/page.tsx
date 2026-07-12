import type { Metadata } from "next";
import VastuLegal from "../VastuLegal";

export const metadata: Metadata = {
  title: "Refund Policy | House Plans & Vastu Bundle | NokriMitra",
  description:
    "Refund Policy for the House Plans, AutoCAD Files & Vastu Designs bundle by NokriMitra.",
};

export default function RefundPolicyPage() {
  return (
    <VastuLegal title="Refund Policy" updated="July 2026">
      <p>
        This is a digital product delivered instantly. Because access to the
        files is granted immediately after payment, all sales are final and{" "}
        <strong>no refunds</strong> can be provided.
      </p>

      <h2>Why There Are No Refunds</h2>
      <p>
        Once payment is completed, you receive full access to download the
        entire bundle, including house plans, AutoCAD blocks, elevations, Vastu
        files and courses. As the product cannot be returned once downloaded,
        we are unable to offer refunds, exchanges or cancellations.
      </p>

      <h2>Before You Buy</h2>
      <ul>
        <li>Please review everything included in the bundle on the page.</li>
        <li>Read the description and file details carefully.</li>
        <li>If you have any doubt, contact us before purchasing.</li>
      </ul>

      <h2>Access Problems</h2>
      <p>
        If your payment succeeded but you did not receive access, this is not a
        refund matter. Simply contact us and we will make sure you get your
        download link.
      </p>

      <h2>Contact</h2>
      <p>
        For any purchase related help, email us at{" "}
        <a href="mailto:goexam777@gmail.com">goexam777@gmail.com</a>.
      </p>
    </VastuLegal>
  );
}
