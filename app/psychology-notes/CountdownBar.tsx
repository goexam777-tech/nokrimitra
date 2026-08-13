import { ArrowRight } from "lucide-react";
import styles from "./psy.module.css";

/**
 * Sticky mobile purchase bar (no countdown timer).
 * Named CountdownBar for backward-compatible imports.
 */
export default function CountdownBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.barInner}>
        <div className={styles.barPrice}>
          <span className={styles.barNow}>₹149</span>
          <span className={styles.barOld}>₹2,499</span>
          <span className={styles.barOff}>90% OFF</span>
        </div>

        <a className={styles.barBtn} href="/psychology-notes/checkout">
          Get Instant Access
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
