"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";

import styles from "./ai-baby-reels.module.css";

export default function ProofCarousel({
  pages,
}: {
  pages: StaticImageData[];
}) {
  const n = pages.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = (dir: number) => setActive((prev) => (prev + dir + n) % n);
  const jumpTo = (i: number) => setActive(((i % n) + n) % n);

  useEffect(() => {
    if (paused || n <= 1) return;
    const id = setInterval(() => setActive((prev) => (prev + 1) % n), 2600);
    return () => clearInterval(id);
  }, [paused, n]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 35) go(delta < 0 ? 1 : -1);
    touchX.current = null;
    setPaused(false);
  };

  return (
    <div
      className={styles.fanStage}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {pages.map((src, i) => {
        // wrapped offset so cards flow circularly through the center
        let offset = i - active;
        if (offset > n / 2) offset -= n;
        if (offset < -n / 2) offset += n;

        const abs = Math.abs(offset);
        const x = -50 + offset * 54;
        const scale = Math.max(0.7, 1 - abs * 0.13);
        const brightness = Math.max(0.5, 1 - abs * 0.24);
        const visible = abs <= 2;

        return (
          <button
            key={i}
            type="button"
            className={styles.fanCard}
            style={{
              zIndex: 10 - abs,
              opacity: visible ? 1 : 0,
              pointerEvents: visible ? "auto" : "none",
              cursor: offset === 0 ? "default" : "pointer",
              filter: `brightness(${brightness})`,
              transform: `translate(${x}%, -50%) rotate(${offset * 7}deg) scale(${scale})`,
            }}
            aria-label={
              offset === 0
                ? "Current creator page"
                : "Show this creator page"
            }
            onClick={() => (offset === 0 ? undefined : jumpTo(i))}
          >
            <Image
              src={src}
              alt="Instagram page built with AI baby reels"
              className={styles.proofImg}
              sizes="(max-width: 767px) 60vw, 240px"
            />
          </button>
        );
      })}
    </div>
  );
}
