"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./nursing-notes.module.css";

const samples = [
  {
    src: "https://img.flexifunnels.com/images/27068/2pageofnursingpage0001_ixmty_1241.jpg",
    alt: "Nursing Note Sample Page 1",
  },
  {
    src: "https://img.flexifunnels.com/images/27068/10pagespage0008_e4ntc_2482.jpg",
    alt: "Nursing Note Sample Page 2",
  },
  {
    src: "https://img.flexifunnels.com/images/27068/2pageofnursingpage0002_a5mju_1241.jpg",
    alt: "Nursing Note Sample Page 3",
  },
  { src: "/nursing1.webp", alt: "Nursing Note Sample - IV Catheter Gauge" },
  { src: "/nursing2.webp", alt: "Nursing Note Sample" },
  { src: "/nursing3.webp", alt: "Nursing Note Sample" },
  { src: "/nursing4.webp", alt: "Nursing Note Sample" },
  { src: "/nursing5.webp", alt: "Nursing Note Sample" },
  { src: "/nursing6.webp", alt: "Nursing Note Sample" },
  { src: "/nursing7.webp", alt: "Nursing Note Sample" },
  { src: "/nursing8.webp", alt: "Nursing Note Sample" },
  { src: "/nursing9.webp", alt: "Nursing Note Sample" },
];

export default function SampleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-scroll every 3 seconds if not paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === samples.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? samples.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === samples.length - 1 ? 0 : prev + 1));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Minimum swipe threshold 40px
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }

    touchStartX.current = null;
    setTimeout(() => setIsPaused(false), 4000);
  };

  return (
    <div
      className={styles.carouselSection}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className={styles.carouselTitle}>
        👇 Some samples 👇
      </h2>

      <div
        className={styles.carouselWrapper}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={() => {
            prevSlide();
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 4000);
          }}
          className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
          aria-label="Previous sample"
        >
          <ChevronLeft size={26} />
        </button>

        <div className={styles.carouselMainCard}>
          <Image
            src={samples[currentIndex].src}
            alt={samples[currentIndex].alt}
            width={600}
            height={800}
            className={styles.carouselImage}
            priority={currentIndex === 0}
          />
        </div>

        <button
          onClick={() => {
            nextSlide();
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 4000);
          }}
          className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
          aria-label="Next sample"
        >
          <ChevronRight size={26} />
        </button>
      </div>

      <div className={styles.carouselDots}>
        {samples.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 4000);
            }}
            className={`${styles.carouselDot} ${
              idx === currentIndex ? styles.carouselDotActive : ""
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
