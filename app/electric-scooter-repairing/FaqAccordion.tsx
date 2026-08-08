"use client";

import { useState } from "react";
import styles from "./scooter.module.css";

type Faq = { q: string; a: string };

export default function FaqAccordion({ items }: { items: Faq[] }) {
  // One answer stays open at a time, like the reference layout.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={styles.faqList}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div className={styles.faqItem} key={item.q} data-open={isOpen}>
            <button
              type="button"
              className={styles.faqQ}
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
            >
              {item.q}
              <span className={styles.faqSign} aria-hidden="true">
                {isOpen ? "×" : "+"}
              </span>
            </button>

            <div
              className={styles.faqPanel}
              id={`faq-panel-${index}`}
              data-open={isOpen}
              role="region"
              aria-hidden={!isOpen}
            >
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
