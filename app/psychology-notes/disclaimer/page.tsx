import type { Metadata } from "next";
import PsyLegal from "../PsyLegal";

export const metadata: Metadata = {
  title: "Disclaimer — Psychology Notes | NokriMitra",
  description: "Disclaimer for the Psychology Notes digital bundle by NokriMitra.",
};

export default function PsyDisclaimer() {
  return (
    <PsyLegal title="Disclaimer" updated="July 2026">
      <p>
        The <strong>Psychology Notes</strong> bundle is provided for{" "}
        <strong>educational and study purposes only</strong>.
      </p>

      <h2>About the Content</h2>
      <p>
        We make every effort to keep the content accurate and helpful, but we do
        not guarantee its completeness or accuracy. The notes are meant to
        support your learning, not to replace formal education or professional
        advice.
      </p>

      <h2>No Guarantee of Results</h2>
      <p>
        Using this material does not guarantee any specific exam result, score
        or career outcome. Success depends on the learner’s own effort and
        preparation.
      </p>

      <h2>Not Professional Advice</h2>
      <p>
        This content is not a substitute for professional psychological or
        medical advice, diagnosis or treatment.
      </p>

      <h2>Contact</h2>
      <p>
        Email: <a href="mailto:goexam777@gmail.com">goexam777@gmail.com</a>
      </p>
    </PsyLegal>
  );
}
