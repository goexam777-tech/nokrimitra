"use client";

import { useEffect, useState } from "react";
import styles from "./opd.module.css";

interface OfferTimerProps {
  className?: string;
  variant?: "inline" | "boxes";
  durationMinutes?: number;
}

export default function OfferTimer({
  className,
  variant = "inline",
  durationMinutes = 30,
}: OfferTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{ hh: string; mm: string; ss: string } | null>(null);

  useEffect(() => {
    const STORAGE_KEY = `opd_timer_target_${durationMinutes}`;
    let targetTime = 0;

    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        targetTime = parseInt(stored, 10);
      }
      if (!targetTime || isNaN(targetTime) || targetTime <= Date.now()) {
        targetTime = Date.now() + durationMinutes * 60 * 1000;
        sessionStorage.setItem(STORAGE_KEY, targetTime.toString());
      }
    }

    function calculate() {
      const remainingMs = Math.max(0, targetTime - Date.now());
      const totalSeconds = Math.floor(remainingMs / 1000);
      const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
      const ss = String(totalSeconds % 60).padStart(2, "0");
      setTimeLeft({ hh, mm, ss });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [durationMinutes]);

  if (variant === "boxes") {
    return (
      <div className={className}>
        <div className={styles.timerBoxesContainer}>
          <div className={styles.timerBoxGroup}>
            <div className={styles.timerBox}>{timeLeft ? timeLeft.hh : "00"}</div>
            <span className={styles.timerLabel}>Hours</span>
          </div>
          <div className={styles.timerBoxGroup}>
            <div className={styles.timerBox}>{timeLeft ? timeLeft.mm : "30"}</div>
            <span className={styles.timerLabel}>Minutes</span>
          </div>
          <div className={styles.timerBoxGroup}>
            <div className={styles.timerBox}>{timeLeft ? timeLeft.ss : "00"}</div>
            <span className={styles.timerLabel}>Seconds</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <p className={className}>
      <span aria-hidden="true">⏳</span> Offer Ends in{" "}
      <time suppressHydrationWarning>
        {timeLeft ? `${timeLeft.hh}:${timeLeft.mm}:${timeLeft.ss}` : "00:30:00"}
      </time>
    </p>
  );
}
