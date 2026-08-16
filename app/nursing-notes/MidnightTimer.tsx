"use client";

import { useEffect, useState } from "react";
import styles from "./nursing-notes.module.css";

function getRemainingTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(23, 59, 59, 999);

  const diffMs = midnight.getTime() - now.getTime();
  if (diffMs <= 0) {
    return { hours: 23, minutes: 59, seconds: 59 };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}

export default function MidnightTimer() {
  const [time, setTime] = useState({ hours: 8, minutes: 4, seconds: 13 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getRemainingTimeUntilMidnight());

    const interval = setInterval(() => {
      setTime(getRemainingTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const format2Digits = (n: number) => String(n).padStart(2, "0");

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerBoxes}>
        <div className={styles.timerBox}>
          <span className={styles.timerNumber}>
            {mounted ? format2Digits(time.hours) : "08"}
          </span>
          <span className={styles.timerLabel}>Hours</span>
        </div>
        <div className={styles.timerBox}>
          <span className={styles.timerNumber}>
            {mounted ? format2Digits(time.minutes) : "04"}
          </span>
          <span className={styles.timerLabel}>Minutes</span>
        </div>
        <div className={styles.timerBox}>
          <span className={styles.timerNumber}>
            {mounted ? format2Digits(time.seconds) : "13"}
          </span>
          <span className={styles.timerLabel}>Seconds</span>
        </div>
      </div>
      <p className={styles.timerEndingText}>Offer Ends Soon...</p>
    </div>
  );
}
