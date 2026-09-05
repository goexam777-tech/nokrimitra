"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download, Sparkles, ZoomIn } from "lucide-react";
import styles from "./medical-master-pdfs.module.css";

const samples = [
  { src: "/medical-samples/sample-1.jpg", alt: "Medical PDF Sample 1" },
  { src: "/medical-samples/sample-2.png", alt: "Medical PDF Sample 2" },
  { src: "/medical-samples/sample-3.png", alt: "Medical PDF Sample 3" },
  { src: "/medical-samples/sample-4.png", alt: "Medical PDF Sample 4" },
  { src: "/medical-samples/sample-5.png", alt: "Medical PDF Sample 5" },
  { src: "/medical-samples/sample-6.png", alt: "Medical PDF Sample 6" },
  { src: "/medical-samples/sample-7.png", alt: "Medical PDF Sample 7" },
  { src: "/medical-samples/sample-8.png", alt: "Medical PDF Sample 8" },
  { src: "/medical-samples/sample-9.png", alt: "Medical PDF Sample 9" },
  { src: "/medical-samples/sample-10.png", alt: "Medical PDF Sample 10" },
  { src: "/medical-samples/sample-11.png", alt: "Medical PDF Sample 11" },
];

export default function MedicalSampleGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === samples.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? samples.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === samples.length - 1 ? 0 : prev + 1));
  };

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
    <section
      className={styles.samplesSection}
      aria-labelledby="sample-preview-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.samplesInner}>
        <div className={styles.samplesHeader}>
          <h2 id="sample-preview-title" className={styles.samplesHeading}>
            📑 Sample PDFs
          </h2>
        </div>

        {/* Main Carousel Wrapper */}
        <div
          className={styles.carouselWrapper}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Button */}
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
            <ChevronLeft size={28} />
          </button>

          {/* Active Card */}
          <div className={styles.carouselMainCard}>
            <div className={styles.carouselCounter}>
              Sample {currentIndex + 1} of {samples.length}
            </div>

            <div className={styles.carouselImageContainer}>
              <Image
                src={samples[currentIndex].src}
                alt={samples[currentIndex].alt}
                width={650}
                height={920}
                className={styles.carouselImage}
                priority={currentIndex < 2}
                sizes="(max-width: 768px) 94vw, 560px"
              />
            </div>
          </div>

          {/* Right Arrow Button */}
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
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Thumbnail Navigation Strip */}
        <div className={styles.thumbnailStrip}>
          {samples.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setCurrentIndex(index);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 4000);
              }}
              className={`${styles.thumbnailBtn} ${
                currentIndex === index ? styles.thumbnailActive : ""
              }`}
              aria-label={`View sample ${index + 1}`}
            >
              <Image
                src={item.src}
                alt={`Thumb ${index + 1}`}
                width={54}
                height={72}
                className={styles.thumbnailImg}
              />
            </button>
          ))}
        </div>

        {/* Quick CTA below samples */}
        <div className={styles.samplesCtaWrap}>
          <a
            href="/medical-master-pdfs/checkout"
            className={styles.samplesCtaBtn}
            id="sample-buy-btn"
          >
            <Download size={20} strokeWidth={2.6} />
            <span>DOWNLOAD COMPLETE 31 PDFs BUNDLE NOW (₹149)</span>
          </a>
          <p className={styles.samplesCtaNote}>
            ⚡ Instant Download Link Screen &amp; Email Par Turant Milega
          </p>
        </div>
      </div>
    </section>
  );
}
