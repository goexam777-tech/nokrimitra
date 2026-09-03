"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./norcet-notes.module.css";

const samples = [
  { src: "/sample_new-1.jpg", alt: "NORCET Sample - Nervous System" },
  { src: "/sample_new-2.jpg", alt: "NORCET Sample - Respiratory Disorders" },
  { src: "/sample_new-3.jpg", alt: "NORCET Sample - Cardiac Notes" },
  { src: "/sample_new-4.jpg", alt: "NORCET Sample - Pharmacology" },
  { src: "/sample_new-5.jpg", alt: "NORCET Sample - Nursing Procedures" },
];

export default function SampleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance every 3.5s
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === samples.length - 1 ? 0 : prev + 1));
    }, 3500);

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
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselTitle}>👇 Some samples 👇</h2>
        <p className={styles.carouselSubtitle}>
          A look at how every topic is laid out inside the notebook.
        </p>
      </div>

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
          <ChevronLeft size={24} />
        </button>

        <div className={styles.carouselMainCard}>
          <div className={styles.carouselImageContainer}>
            <Image
              src={samples[currentIndex].src}
              alt={samples[currentIndex].alt}
              width={700}
              height={980}
              className={styles.carouselImage}
              priority={currentIndex === 0}
              sizes="(max-width: 640px) 94vw, 540px"
            />
          </div>
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
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className={styles.carouselDots}>
        {samples.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 4000);
            }}
            className={`${styles.carouselDot} ${
              currentIndex === index ? styles.carouselDotActive : ""
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
