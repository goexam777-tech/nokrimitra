"use client";

import { useEffect, useState } from "react";
import styles from "./scooter.module.css";

const WINDOW_MS = 15 * 60 * 1000;
const STORAGE_KEY = "nm_escooter_offer_deadline";

const pad = (value: number) => String(Math.max(value, 0)).padStart(2, "0");

/** Countdown for the current offer window, kept stable across page navigation. */
export default function BundleTimer() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    let deadline = Number(sessionStorage.getItem(STORAGE_KEY));
    if (!Number.isFinite(deadline) || deadline <= Date.now()) {
      deadline = Date.now() + WINDOW_MS;
      try {
        sessionStorage.setItem(STORAGE_KEY, String(deadline));
      } catch {
        // Private mode: the timer simply restarts on the next page load.
      }
    }

    const tick = () => setRemaining(Math.max(deadline - Date.now(), 0));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Server render and first paint show the full window, so hydration matches.
  const ms = remaining ?? WINDOW_MS;
  const totalSeconds = Math.floor(ms / 1000);
  const units = [
    { value: Math.floor(totalSeconds / 3600), label: "Hours" },
    { value: Math.floor((totalSeconds % 3600) / 60), label: "Minutes" },
    { value: totalSeconds % 60, label: "Seconds" },
  ];

  return (
    <div className={styles.timer} role="timer" aria-live="off">
      {units.map((unit) => (
        <div key={unit.label}>
          <strong>{pad(unit.value)}</strong>
          <span>{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
