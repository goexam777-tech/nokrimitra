"use client";

import { useState } from "react";
import styles from "./norcet-notes.module.css";

const faqData = [
  {
    q: "How do I get the notes after paying?",
    a: "Immediately after your payment is confirmed, an instant download link appears on your screen. A copy with the download link is also sent directly to your registered email address.",
  },
  {
    q: "What format are the notes in?",
    a: "The notes are in high-resolution, printable PDF format. You can read them digitally or print them out with clear margins.",
  },
  {
    q: "Can I read them on my phone?",
    a: "Yes! The PDF works seamlessly on all devices including Android, iPhone, iPad, tablets, laptops, and desktop computers.",
  },
  {
    q: "Is this a one time payment?",
    a: "Yes, it is a strictly one-time payment of ₹149 only. There are no recurring fees, subscriptions, or hidden charges. You get lifetime access.",
  },
  {
    q: "What language are the notes in?",
    a: "The notes are in simple, lucid English with high-yield points, flowcharts, tables, and mnemonics designed for easy memorization.",
  },
  {
    q: "The email has not arrived. What should I do?",
    a: "First check your Spam or Promotions folder. If you still cannot find it, email us with your payment receipt at goexam777@gmail.com and we will immediately resend your download link.",
  },
  {
    q: "Can I get a refund?",
    a: "Since this is an instantly delivered digital PDF product, all purchases are final. Please review our Refund Policy for complete details.",
  },
];

export default function NorcetFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className={styles.faqSection}>
      <div className={styles.faqList}>
        {faqData.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={item.q}
              className={`${styles.faqCard} ${isOpen ? styles.faqCardOpen : ""}`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className={styles.faqQuestionBtn}
                aria-expanded={isOpen}
              >
                <span
                  className={`${styles.faqIconCircle} ${
                    isOpen ? styles.faqIconCircleActive : ""
                  }`}
                >
                  {isOpen ? "−" : "+"}
                </span>
                <span className={styles.faqQuestionText}>{item.q}</span>
              </button>

              {isOpen && (
                <div className={styles.faqAnswerWrap}>
                  <p className={styles.faqAnswerText}>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
