"use client";

import { useEffect, useState } from "react";
import styles from "./vastu.module.css";

const WINDOW_MS = 30 * 60 * 1000; // 30 minutes

export default function StickyBuyBar() {
  const [ms, setMs] = useState(WINDOW_MS);

  useEffect(() => {
    const key = "vastuOfferDeadline";
    let deadline = Number(localStorage.getItem(key));
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + WINDOW_MS;
      localStorage.setItem(key, String(deadline));
    }

    const tick = () => {
      let diff = deadline - Date.now();
      if (diff <= 0) {
        deadline = Date.now() + WINDOW_MS;
        localStorage.setItem(key, String(deadline));
        diff = WINDOW_MS;
      }
      setMs(diff);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const totalSec = Math.floor(ms / 1000);
  const hh = String(Math.floor(totalSec / 3600)).padStart(2, "0");
  const mm = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const ss = String(totalSec % 60).padStart(2, "0");

  return (
    <div className={styles.stickyBar}>
      <div className={styles.stickyInfo}>
        <span className={styles.stickyLabel}>Offer ends in</span>
        <div className={styles.stickyTimer}>
          <span className={styles.timerBox}>{hh}</span>
          <span className={styles.timerColon}>:</span>
          <span className={styles.timerBox}>{mm}</span>
          <span className={styles.timerColon}>:</span>
          <span className={styles.timerBox}>{ss}</span>
        </div>
      </div>
      <a href="/vastu-plan-checkout" className={styles.stickyBtn}>
        Get Instant Access
      </a>
    </div>
  );
}
