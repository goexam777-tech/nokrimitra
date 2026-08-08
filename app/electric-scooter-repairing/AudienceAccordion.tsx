"use client";

import { useState } from "react";
import { ChevronDown, Minus } from "lucide-react";
import styles from "./scooter.module.css";

type Item = { who: string; text: string };

export default function AudienceAccordion({ items }: { items: Item[] }) {
  // The first two panels start open, matching the reference layout.
  const [open, setOpen] = useState<number[]>([0, 1]);

  const toggle = (index: number) =>
    setOpen((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index]
    );

  // Two independent columns: closing a panel lets the one below it move up
  // instead of leaving a gap, which a shared grid row would cause.
  const columns = [
    items.filter((_, index) => index % 2 === 0),
    items.filter((_, index) => index % 2 === 1),
  ];

  return (
    <div className={styles.whoGrid}>
      {columns.map((column, columnIndex) => (
        <div className={styles.whoCol} key={columnIndex}>
          {column.map((item) => {
            const index = items.indexOf(item);
            const isOpen = open.includes(index);
            return (
              <div
                className={styles.whoItem}
                key={item.who}
                style={{ order: index }}
              >
                <button
                  type="button"
                  className={styles.whoHead}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`who-panel-${index}`}
                  data-open={isOpen}
                >
                  {isOpen ? (
                    <Minus size={17} aria-hidden="true" />
                  ) : (
                    <ChevronDown size={17} aria-hidden="true" />
                  )}
                  {item.who}
                </button>

                <div
                  className={styles.whoPanel}
                  id={`who-panel-${index}`}
                  data-open={isOpen}
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <p>&quot;{item.text}&quot;</p>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
