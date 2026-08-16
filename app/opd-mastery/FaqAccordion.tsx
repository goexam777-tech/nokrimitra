"use client";

import { useState } from "react";
import styles from "./opd.module.css";

export interface FaqItem {
  emoji: string;
  q: string;
  a: string;
}

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  // Only the first FAQ (index 0) is open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.faqListNew}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            className={`${styles.faqItemNew} ${isOpen ? styles.faqItemOpen : ""}`}
            key={faq.q}
          >
            <button
              className={styles.faqSummaryNew}
              onClick={() => toggle(index)}
              type="button"
              aria-expanded={isOpen}
            >
              <div className={styles.faqQuestionWrap}>
                <span className={styles.faqEmoji} aria-hidden="true">
                  {faq.emoji}
                </span>
                <span className={styles.faqQuestionText}>{faq.q}</span>
              </div>
              <span className={styles.faqToggleIcon} aria-hidden="true" />
            </button>

            {isOpen && (
              <div className={styles.faqBodyNew}>
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
