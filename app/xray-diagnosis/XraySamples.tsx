"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./xray-diagnosis.module.css";

const samples: { src: string; alt: string }[] = [
  { src: "/xray-sample-1.jpg", alt: "Chest X-ray sample page 1" },
  { src: "/xray-sample-2.jpg", alt: "Chest X-ray sample page 2" },
  { src: "/xray-sample-3.jpg", alt: "C-spine X-ray sample page 1" },
  { src: "/xray-sample-4.jpg", alt: "C-spine X-ray sample page 2" },
  { src: "/xray-sample-5.jpg", alt: "Hip and Pelvis X-ray sample page 1" },
  { src: "/xray-sample-6.jpg", alt: "Hip and Pelvis X-ray sample page 2" },
];

export default function XraySamples() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const hasSamples = samples.length > 0;

  useEffect(() => {
    if (paused || samples.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === samples.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [paused]);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? samples.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === samples.length - 1 ? 0 : prev + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) nextSlide();
    else if (diff < -40) prevSlide();
    touchStartX.current = null;
    setTimeout(() => setPaused(false), 4000);
  };

  return (
    <section className={styles.samplesSection}>
      <h2 className={styles.samplesTitle}>Some Samples</h2>

      <div
        className={styles.samplesFrame}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {hasSamples && (
          <button
            type="button"
            onClick={() => {
              prevSlide();
              setPaused(true);
              setTimeout(() => setPaused(false), 4000);
            }}
            className={`${styles.samplesArrow} ${styles.samplesArrowLeft}`}
            aria-label="Previous sample"
          >
            <ChevronLeft size={26} />
          </button>
        )}

        <div className={styles.samplesCard}>
          {hasSamples ? (
            <Image
              src={samples[current].src}
              alt={samples[current].alt}
              width={640}
              height={820}
              className={styles.samplesImage}
              priority={current === 0}
            />
          ) : (
            <div className={styles.samplesPlaceholder}>
              Sample previews coming soon
            </div>
          )}
        </div>

        {hasSamples && (
          <button
            type="button"
            onClick={() => {
              nextSlide();
              setPaused(true);
              setTimeout(() => setPaused(false), 4000);
            }}
            className={`${styles.samplesArrow} ${styles.samplesArrowRight}`}
            aria-label="Next sample"
          >
            <ChevronRight size={26} />
          </button>
        )}
      </div>

      {samples.length > 1 && (
        <div className={styles.samplesDots}>
          {samples.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCurrent(idx);
                setPaused(true);
                setTimeout(() => setPaused(false), 4000);
              }}
              className={`${styles.samplesDot} ${
                idx === current ? styles.samplesDotActive : ""
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
