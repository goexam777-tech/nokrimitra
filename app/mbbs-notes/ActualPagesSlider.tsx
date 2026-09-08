"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./mbbs-notes.module.css";

export interface ActualPageItem {
  subject: string;
  topic: string;
  image: string;
}

export const actualPagesList: ActualPageItem[] = [
  {
    subject: "Cardiovascular",
    topic: "Heart anatomy, labelled diagram",
    image: "/s1-cardio.png",
  },
  {
    subject: "Pharmacology",
    topic: "Anticoagulants, mechanism chart",
    image: "/s2-pharma.png",
  },
  {
    subject: "Endocrine",
    topic: "Diabetes, whole-body effects",
    image: "/s6-endocrine.png",
  },
  {
    subject: "Emergency Medicine",
    topic: "Abdominal quadrants and contents",
    image: "/s9-emergency.png",
  },
  {
    subject: "Respiratory",
    topic: "Altitude physiology, real graphs",
    image: "/s5-respiratory.png",
  },
  {
    subject: "Immunology",
    topic: "Transplant rejection pathway",
    image: "/s8-immuno.png",
  },
  {
    subject: "Nervous System",
    topic: "Cholinergic receptor tables",
    image: "/s4-nervous.png",
  },
  {
    subject: "Dermatology",
    topic: "Fungal skin infections, clinical photos",
    image: "/s7-derm.png",
  },
  {
    subject: "OSCE",
    topic: "Lower limb neuro examination",
    image: "/s3-osce.png",
  },
];

export default function ActualPagesSlider() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Update active dot based on scroll position
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll<HTMLDivElement>("[data-page-card]");
    if (!cards.length) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(trackCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
  }, []);

  const scrollToIndex = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLDivElement>("[data-page-card]");
    if (!cards[idx]) return;

    const card = cards[idx];
    const targetLeft = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
    setActiveIndex(idx);
  };

  // Mouse Drag to Scroll on Desktop
  const onMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    setStartX(e.pageX - track.offsetLeft);
    setScrollLeft(track.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const track = trackRef.current;
    if (!track) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className={styles.actualPagesSection}>
      {/* Section Header matching user reference */}
      <div className={styles.actualPagesHeader}>
        <h2 className={styles.actualPagesTitle}>See the actual pages</h2>
        <p className={styles.actualPagesSub}>
          Not a preview. These are nine real pages from the files you receive.
        </p>
      </div>

      {/* Carousel Container with side arrows */}
      <div className={styles.sliderRelativeWrap}>
        {/* Previous Button */}
        {activeIndex > 0 && (
          <button
            type="button"
            className={`${styles.sliderNavBtn} ${styles.sliderNavPrev}`}
            onClick={() => scrollToIndex(activeIndex - 1)}
            aria-label="Previous Page"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
        )}

        {/* Next Button */}
        {activeIndex < actualPagesList.length - 1 && (
          <button
            type="button"
            className={`${styles.sliderNavBtn} ${styles.sliderNavNext}`}
            onClick={() => scrollToIndex(activeIndex + 1)}
            aria-label="Next Page"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        )}

        {/* Scrollable Track */}
        <div
          ref={trackRef}
          className={`${styles.actualPagesTrack} ${isDragging ? styles.isDragging : ""}`}
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
        >
          {actualPagesList.map((item, idx) => (
            <div
              key={idx}
              data-page-card
              className={styles.actualPageCard}
              onClick={() => {
                if (idx !== activeIndex) scrollToIndex(idx);
              }}
            >
              <div className={styles.actualPageImgWrap}>
                <Image
                  src={item.image}
                  alt={`${item.subject} - ${item.topic}`}
                  width={340}
                  height={480}
                  className={styles.actualPageImg}
                  priority={idx < 2}
                  sizes="(max-width: 500px) 80vw, 360px"
                  draggable={false}
                />
              </div>
              <div className={styles.actualPageFooter}>
                <h3 className={styles.actualPageSubject}>{item.subject}</h3>
                <p className={styles.actualPageTopic}>{item.topic}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className={styles.sliderDotsRow} role="tablist" aria-label="Page slides">
        {actualPagesList.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`${styles.sliderDot} ${idx === activeIndex ? styles.sliderDotActive : ""}`}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            aria-selected={idx === activeIndex}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
}
