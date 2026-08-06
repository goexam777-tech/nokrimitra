import type { Metadata } from "next";
import OpdLegal from "../OpdLegal";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Disclaimer | OPD Mastery E-Book | NokriMitra",
  description: "Medical and educational disclaimer for the OPD Mastery E-Book by NokriMitra.",
  robots: { index: false, follow: true },
};

export default function OpdDisclaimerPage() {
  return (
    <OpdLegal title="Disclaimer" updated="August 2026">
      <p className={styles.callout}>
        The OPD Mastery E-Book is an educational reference guide. It is{" "}
        <strong>not</strong> a substitute for professional medical advice,
        diagnosis, treatment, clinical judgement or qualified supervision.
      </p>

      <h2>Educational Purpose</h2>
      <p>
        Content is provided for learning and quick-reference purposes. Students,
        interns and other learners must not use it to diagnose or prescribe
        independently. Clinical decisions must be made by a qualified practitioner
        based on the individual patient, current guidance and local protocols.
      </p>

      <h2>No Guarantee of Outcomes</h2>
      <p>
        Medicine evolves and errors can occur. We do not guarantee that the
        information is complete, current or error-free. Verify medicines,
        dosages, investigations and protocols against authoritative sources
        before applying information in a clinical setting.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        NokriMitra and the authors are not liable for any outcome, loss or
        damage arising from use or misuse of this material. Use of the e-book is
        subject to the reader&apos;s professional role and responsibilities.
      </p>

      <h2>Contact</h2>
      <p>
        For any questions, email us at{" "}
        <a href="mailto:goexam777@gmail.com">goexam777@gmail.com</a>.
      </p>
    </OpdLegal>
  );
}
