"use client";

import { useEffect, useState } from "react";
import styles from "./psy.module.css";

const START = 10 * 60; // 10 minutes in seconds
const pad = (n: number) => String(n).padStart(2, "0");

export default function CountdownBar() {
  const [left, setLeft] = useState(START);

  useEffect(() => {
    const id = setInterval(() => {
      setLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const hh = Math.floor(left / 3600);
  const mm = Math.floor((left % 3600) / 60);
  const ss = left % 60;

  return (
    <div className={styles.bar}>
      <div className={styles.barInner}>
        <div className={styles.barLeft}>
          <span className={styles.barLabel}>Limited Time Offer</span>
          <div className={styles.timer} aria-label="Offer countdown">
            <span className={styles.timeBox}>{pad(hh)}</span>
            <span className={styles.colon}>:</span>
            <span className={styles.timeBox}>{pad(mm)}</span>
            <span className={styles.colon}>:</span>
            <span className={styles.timeBox}>{pad(ss)}</span>
          </div>
        </div>

        <a className={styles.barBtn} href="/psychology-notes/checkout">
          BUY NOW
        </a>
      </div>
    </div>
  );
}
