"use client";

import { useEffect, useState } from "react";
import styles from "./electric.module.css";

interface OfferTimerProps {
  durationMinutes?: number;
}

export default function OfferTimer({ durationMinutes = 20 }: OfferTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{ mm: string; ss: string } | null>(null);

  useEffect(() => {
    const STORAGE_KEY = `electric_offer_timer_${durationMinutes}`;
    let target = 0;

    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        target = parseInt(saved, 10);
      }
      if (!target || isNaN(target) || target <= Date.now()) {
        target = Date.now() + durationMinutes * 60 * 1000;
        sessionStorage.setItem(STORAGE_KEY, target.toString());
      }
    }

    const update = () => {
      const diff = Math.max(0, target - Date.now());
      const totalSec = Math.floor(diff / 1000);
      const mm = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
      const ss = String(totalSec % 60).padStart(2, "0");
      setTimeLeft({ mm, ss });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [durationMinutes]);

  return (
    <div className={styles.timerWrap}>
      <span className={styles.timerLabel}>⏰ Limited Time Special Offer Ends in:</span>
      <div className={styles.timerDigits}>
        <div className={styles.timerBox}>
          <span className={styles.timerNum}>{timeLeft ? timeLeft.mm : "19"}</span>
          <span className={styles.timerUnit}>MIN</span>
        </div>
        <span className={styles.timerColon}>:</span>
        <div className={styles.timerBox}>
          <span className={styles.timerNum}>{timeLeft ? timeLeft.ss : "59"}</span>
          <span className={styles.timerUnit}>SEC</span>
        </div>
      </div>
    </div>
  );
}
