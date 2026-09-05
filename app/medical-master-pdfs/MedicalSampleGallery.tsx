"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
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
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  const scrollToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.max(0, Math.min(samples.length - 1, index));
    isProgrammaticScroll.current = true;
    track.scrollTo({
      left: target * track.clientWidth,
      behavior: "smooth",
    });
    setCurrentIndex(target);
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 450);
  };

  const prevSlide = () => {
    const target = currentIndex === 0 ? samples.length - 1 : currentIndex - 1;
    scrollToSlide(target);
  };

  const nextSlide = () => {
    const target = currentIndex === samples.length - 1 ? 0 : currentIndex + 1;
    scrollToSlide(target);
  };

  // Keep active thumbnail scrolled into view
  useEffect(() => {
    const strip = thumbStripRef.current;
    if (!strip) return;
    const activeBtn = strip.children[currentIndex] as HTMLElement | undefined;
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  // Handle native scroll / swipe on the track
  const handleScroll = () => {
    if (isProgrammaticScroll.current) return;
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth;
    if (width <= 0) return;
    const newIndex = Math.round(track.scrollLeft / width);
    if (newIndex >= 0 && newIndex < samples.length && newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  // Auto slide when not interacting
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      const target = currentIndex === samples.length - 1 ? 0 : currentIndex + 1;
      scrollToSlide(target);
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  return (
    <section
      className={styles.samplesSection}
      aria-labelledby="sample-preview-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
    >
      <div className={styles.samplesInner}>
        <div className={styles.samplesHeader}>
          <h2 id="sample-preview-title" className={styles.samplesHeading}>
            📑 Sample PDFs
          </h2>
          <p className={styles.samplesSubtitle}>
            Swipe left/right to inspect actual sample pages from the 31 bundle
          </p>
        </div>

        {/* Main Carousel Wrapper */}
        <div className={styles.carouselWrapper}>
          {/* Floating Counter Badge */}
          <div className={styles.carouselCounter}>
            Sample {currentIndex + 1} of {samples.length}
          </div>

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

          {/* Native Smooth Horizontal Swipe Track */}
          <div
            ref={trackRef}
            className={styles.carouselTrack}
            onScroll={handleScroll}
          >
            {samples.map((item, index) => (
              <div key={index} className={styles.carouselSlide}>
                <div className={styles.carouselImageContainer}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={650}
                    height={920}
                    className={styles.carouselImage}
                    priority={index < 2}
                    sizes="(max-width: 768px) 94vw, 560px"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
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
        <div ref={thumbStripRef} className={styles.thumbnailStrip}>
          {samples.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                scrollToSlide(index);
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
                draggable={false}
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
