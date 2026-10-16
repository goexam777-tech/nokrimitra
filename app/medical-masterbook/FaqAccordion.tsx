"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./medical.module.css";

interface FaqItem {
  q: string;
  a: string;
}

const NUMBER_EMOJIS = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

export default function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.faqList}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;

        return (
          <div key={item.q} className={styles.faqItem}>
            <button
              type="button"
              className={styles.faqBtn}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span>
                {NUMBER_EMOJIS[index] ?? `${index + 1}.`} {item.q}
              </span>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ""}`}
              />
            </button>

            {isOpen && (
              <div id={panelId} className={styles.faqBody}>
                <p>{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
