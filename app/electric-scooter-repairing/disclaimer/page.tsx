import type { Metadata } from "next";
import EvLegal from "../EvLegal";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title:
    "Disclaimer — Electric Scooter Repairing Guide (Hindi) | NokriMitra",
  description:
    "Safety and educational disclaimer for the Electric Scooter Repairing Complete Practical Guide (Hindi) digital PDF.",
  robots: { index: true, follow: true },
};

export default function EvDisclaimer() {
  return (
    <EvLegal title="Disclaimer" updated="August 2026">
      <div className={styles.callout}>
        This guide is provided for <strong>educational purposes only</strong>.
        Electric scooters contain high-voltage, high-current battery systems that
        can cause electric shock, burns, fire or serious injury if handled
        incorrectly. Work at your own risk.
      </div>

      <h2>Educational Material Only</h2>
      <p>
        The <strong>Electric Scooter Repairing Complete Practical Guide
        (Hindi)</strong> explains how electric scooter systems work and how
        faults are commonly diagnosed. It is not a substitute for formal
        training, manufacturer service documentation, or the judgement of a
        qualified technician.
      </p>

      <h2>Safety Responsibilities</h2>
      <ul>
        <li>Disconnect the battery before working on wiring or components.</li>
        <li>Use insulated tools and appropriate protective equipment.</li>
        <li>Never work on a battery pack that is swollen, leaking, wet or damaged.</li>
        <li>
          Stop immediately if you notice sparks, heat, smoke or an unusual smell,
          and move to a safe distance.
        </li>
        <li>Keep flammable material away from your working area.</li>
        <li>Do not attempt a repair you are not confident about.</li>
      </ul>

      <h2>When to Call a Professional</h2>
      <p>
        For battery pack replacement or cell-level work, controller replacement,
        motor rewinding, accident damage, or any fault you cannot identify with
        confidence, use a qualified technician or an authorised service centre.
      </p>

      <h2>No Guarantee of Results</h2>
      <p>
        Every scooter model, controller and battery management system is
        different. We do not guarantee that the information will resolve a
        specific fault on a specific vehicle, or that following the guide will
        produce any particular outcome.
      </p>

      <h2>Warranty and Legal Compliance</h2>
      <p>
        Opening or repairing your scooter yourself may void the manufacturer or
        dealer warranty. You are responsible for checking your warranty terms and
        for complying with local rules on vehicle repair, electrical work and
        battery disposal.
      </p>

      <h2>No Professional Advice</h2>
      <p>
        Nothing in the guide is professional engineering, safety certification,
        legal or business advice. Any modification of a vehicle is done entirely
        at your own risk and responsibility.
      </p>

      <h2>Not Affiliated With Any Manufacturer</h2>
      <p>
        NokriMitra is not affiliated with, endorsed by, or authorised by any
        electric scooter brand or manufacturer. Brand names, if mentioned, are
        used only to describe or identify products and belong to their respective
        owners.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, NokriMitra and its authors accept
        no liability for injury, death, property damage, vehicle damage,
        financial loss or any other harm arising from the use or misuse of this
        material. By using the guide, you accept full responsibility for your own
        work and safety.
      </p>

      <h2>Contact</h2>
      <p>
        Email:{" "}
        <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a>
        <br />
        WhatsApp: <a href="https://wa.me/919104826422">+91 91048 26422</a>
      </p>

      <div className={styles.note}>
        If you are a beginner, start with the safety chapter and practise
        diagnosis steps before attempting any repair. Safety first, repair
        second.
      </div>
    </EvLegal>
  );
}
