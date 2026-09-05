"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import styles from "./medical-master-pdfs.module.css";

const samples = [
  { src: "/medical-samples/sample-1.jpg", width: 2500, height: 1400, alt: "Medical PDF Sample 1" },
  { src: "/medical-samples/sample-2.png", width: 1536, height: 1024, alt: "Medical PDF Sample 2" },
  { src: "/medical-samples/sample-3.png", width: 1254, height: 1254, alt: "Medical PDF Sample 3" },
  { src: "/medical-samples/sample-4.png", width: 1536, height: 1024, alt: "Medical PDF Sample 4" },
  { src: "/medical-samples/sample-5.png", width: 1212, height: 1297, alt: "Medical PDF Sample 5" },
  { src: "/medical-samples/sample-6.png", width: 1536, height: 1024, alt: "Medical PDF Sample 6" },
  { src: "/medical-samples/sample-7.png", width: 1536, height: 1024, alt: "Medical PDF Sample 7" },
  { src: "/medical-samples/sample-8.png", width: 1369, height: 1149, alt: "Medical PDF Sample 8" },
  { src: "/medical-samples/sample-9.png", width: 1254, height: 1254, alt: "Medical PDF Sample 9" },
  { src: "/medical-samples/sample-10.png", width: 1254, height: 1254, alt: "Medical PDF Sample 10" },
  { src: "/medical-samples/sample-11.png", width: 1254, height: 1254, alt: "Medical PDF Sample 11" },
];

export default function MedicalSampleGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const userHasInteracted = useRef(false);

  const scrollToSlide = (index: number) => {
    userHasInteracted.current = true;
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
    }, 400);
  };

  const prevSlide = () => {
    const target = currentIndex === 0 ? samples.length - 1 : currentIndex - 1;
    scrollToSlide(target);
  };

  const nextSlide = () => {
    const target = currentIndex === samples.length - 1 ? 0 : currentIndex + 1;
    scrollToSlide(target);
  };

  // Only scroll the thumbnail strip container itself horizontally.
  // NEVER use scrollIntoView() as it causes the whole page/window to scroll down!
  useEffect(() => {
    if (!userHasInteracted.current) return;
    const strip = thumbStripRef.current;
    if (!strip) return;
    const activeBtn = strip.children[currentIndex] as HTMLElement | undefined;
    if (activeBtn) {
      const targetLeft =
        activeBtn.offsetLeft - strip.clientWidth / 2 + activeBtn.clientWidth / 2;
      strip.scrollTo({ left: targetLeft, behavior: "smooth" });
    }
  }, [currentIndex]);

  // Handle native swipe/scroll on the track
  const handleScroll = () => {
    if (isProgrammaticScroll.current) return;
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth;
    if (width <= 0) return;
    const newIndex = Math.round(track.scrollLeft / width);
    if (newIndex >= 0 && newIndex < samples.length && newIndex !== currentIndex) {
      userHasInteracted.current = true;
      setCurrentIndex(newIndex);
    }
  };

  return (
    <section
      className={styles.samplesSection}
      aria-labelledby="sample-preview-title"
    >
      <div className={styles.samplesInner}>
        <div className={styles.samplesHeader}>
          <h2 id="sample-preview-title" className={styles.samplesHeading}>
            📑 Sample PDFs
          </h2>
          <div className={styles.samplePillRow}>
            <span className={styles.samplePill}>Sample {currentIndex + 1} of {samples.length}</span>
            <span className={styles.sampleHint}>👈 Swipe left / right 👉</span>
          </div>
        </div>

        {/* Main Carousel Wrapper (Clean, No Box) */}
        <div className={styles.carouselWrapper}>
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
            aria-label="Previous sample"
          >
            <ChevronLeft size={26} />
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
                    width={item.width}
                    height={item.height}
                    className={styles.carouselImage}
                    priority={index === 0}
                    sizes="(max-width: 768px) 92vw, 500px"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
            aria-label="Next sample"
          >
            <ChevronRight size={26} />
          </button>
        </div>

        {/* Thumbnail Navigation Strip */}
        <div ref={thumbStripRef} className={styles.thumbnailStrip}>
          {samples.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToSlide(index)}
              className={`${styles.thumbnailBtn} ${
                currentIndex === index ? styles.thumbnailActive : ""
              }`}
              aria-label={`View sample ${index + 1}`}
            >
              <Image
                src={item.src}
                alt={`Thumb ${index + 1}`}
                width={58}
                height={58}
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
