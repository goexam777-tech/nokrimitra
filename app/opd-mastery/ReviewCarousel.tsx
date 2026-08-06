"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Heart } from "lucide-react";
import styles from "./opd.module.css";

export type Review = {
  avatar: StaticImageData;
  name: string;
  role: string;
  text: string;
};

export default function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActive(Math.min(reviews.length - 1, Math.max(0, index)));
  }, [reviews.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div className={styles.reviewCarousel}>
      <div
        className={styles.reviewTrack}
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label="Reader reviews, scroll horizontally"
      >
        {reviews.map((review) => (
          <figure className={styles.reviewCard} key={review.name}>
            <div className={styles.reviewTop}>
              <Image
                src={review.avatar}
                alt={`${review.name}, ${review.role}`}
                className={styles.reviewAvatar}
                sizes="44px"
              />
              <figcaption>
                <strong>{review.name}</strong>
                <small>{review.role}</small>
              </figcaption>
              <Heart className={styles.reviewHeart} size={17} aria-hidden="true" />
            </div>
            <blockquote>{review.text}</blockquote>
          </figure>
        ))}
      </div>

      <div className={styles.reviewDots}>
        {reviews.map((review, index) => (
          <button
            type="button"
            key={review.name}
            className={index === active ? styles.dotActive : styles.dot}
            aria-label={`Show review ${index + 1} of ${reviews.length}`}
            aria-current={index === active}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
