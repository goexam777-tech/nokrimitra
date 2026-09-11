"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./buyerProof.module.css";

import sc1 from "@/public/Screenshot 2026-09-11 144051.webp";
import sc2 from "@/public/Screenshot 2026-09-11 143213.webp";
import sc3 from "@/public/Screenshot 2026-09-11 144202.webp";
import sc4 from "@/public/Screenshot 2026-09-11 144248.webp";
import sc5 from "@/public/Screenshot 2026-09-11 144348.webp";
import sc6 from "@/public/Screenshot 2026-09-11 144458.webp";
import sc7 from "@/public/Screenshot 2026-09-11 144857.webp";

const samples = [
  { src: sc1, alt: "WhatsApp Buyer Review 1" },
  { src: sc2, alt: "WhatsApp Buyer Review 2" },
  { src: sc3, alt: "WhatsApp Buyer Review 3" },
  { src: sc4, alt: "WhatsApp Buyer Review 4" },
  { src: sc5, alt: "WhatsApp Buyer Review 5" },
  { src: sc6, alt: "WhatsApp Buyer Review 6" },
  { src: sc7, alt: "WhatsApp Buyer Review 7" },
];

export default function WhatsAppBuyerProofs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-scroll every 3 seconds if not paused (exact match to nursing-notes)
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
      <div
        className={styles.carouselWrapper}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={() => {
            prevSlide();
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 4000);
          }}
          className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
          aria-label="Previous sample"
        >
          <ChevronLeft size={22} />
        </button>

        <div className={styles.carouselMainCard}>
          <Image
            src={samples[currentIndex].src}
            alt={samples[currentIndex].alt}
            width={603}
            height={892}
            className={styles.carouselImage}
            priority={currentIndex === 0}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            nextSlide();
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 4000);
          }}
          className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
          aria-label="Next sample"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className={styles.carouselDots}>
        {samples.map((_, idx) => (
          <button
            key={idx}
            type="button"
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
