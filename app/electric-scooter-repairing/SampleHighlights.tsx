"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./scooter.module.css";

type Sample = { src: StaticImageData; alt: string };

export default function SampleHighlights({ samples }: { samples: Sample[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    setEdges({
      start: track.scrollLeft <= 1,
      end: track.scrollLeft >= max - 1,
    });

    const inset = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const edge = track.scrollLeft + inset;
    const slides = Array.from(track.children) as HTMLElement[];
    let closest = 0;
    let smallestGap = Number.POSITIVE_INFINITY;
    slides.forEach((slide, index) => {
      const gap = Math.abs(slide.offsetLeft - edge);
      if (gap < smallestGap) {
        smallestGap = gap;
        closest = index;
      }
    });
    setActive(closest);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  // A vertical mouse wheel is mapped onto this row and eased with rAF so it
  // glides. At either edge the gesture is handed back to the page.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let target = track.scrollLeft;
    let frame = 0;

    const step = () => {
      const gap = target - track.scrollLeft;
      if (Math.abs(gap) < 0.5) {
        track.scrollLeft = target;
        frame = 0;
        return;
      }
      track.scrollLeft += gap * 0.2;
      frame = requestAnimationFrame(step);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;
      if (
        (track.scrollLeft <= 0.5 && event.deltaY < 0) ||
        (track.scrollLeft >= max - 0.5 && event.deltaY > 0)
      ) {
        return;
      }

      event.preventDefault();
      if (!frame) target = track.scrollLeft;
      target = Math.min(Math.max(target + event.deltaY * 1.15, 0), max);
      if (!frame) frame = requestAnimationFrame(step);
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      track.removeEventListener("wheel", onWheel);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return; // native touch scrolling is better
    const track = trackRef.current;
    if (!track) return;
    drag.current = {
      active: true,
      startX: event.clientX,
      startLeft: track.scrollLeft,
    };
    track.classList.add(styles.dragging);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    event.preventDefault();
    track.scrollLeft = drag.current.startLeft - (event.clientX - drag.current.startX);
  };

  const endDrag = () => {
    drag.current.active = false;
    trackRef.current?.classList.remove(styles.dragging);
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    const inset = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0;
    track.scrollTo({ left: slide.offsetLeft - inset, behavior: "smooth" });
  };

  /** Moves the row by exactly one page, so the first card slides out of view. */
  const nudge = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const stride = slide ? slide.offsetWidth + gap : track.clientWidth;
    track.scrollBy({ left: stride * direction, behavior: "smooth" });
  };

  return (
    <div className={styles.samples}>
      <div className={styles.sampleViewport}>
        <div
          ref={trackRef}
          className={styles.sampleTrack}
          onScroll={sync}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          tabIndex={0}
          role="region"
          aria-label={`Sample pages from the bundle, ${samples.length} in total, scrollable`}
        >
          {samples.map((sample) => (
            <figure key={sample.alt}>
              <Image
                src={sample.src}
                alt={sample.alt}
                sizes="(max-width: 900px) 80vw, 330px"
                draggable={false}
              />
            </figure>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.navBtn} ${styles.navPrev}`}
          onClick={() => nudge(-1)}
          disabled={edges.start}
          aria-label="Previous sample pages"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navNext}`}
          onClick={() => nudge(1)}
          disabled={edges.end}
          aria-label="Next sample pages"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className={styles.dots}>
        {samples.map((sample, index) => (
          <button
            key={sample.alt}
            type="button"
            className={index === active ? styles.dotOn : styles.dot}
            aria-label={`Show sample page ${index + 1}`}
            aria-current={index === active}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
