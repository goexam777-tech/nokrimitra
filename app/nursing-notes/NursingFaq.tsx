"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./nursing-notes.module.css";

const faqData = [
  {
    question: "When will I receive my notes?",
    answer:
      "Instant download right after payment! You will be automatically redirected to download the PDF. A backup download link is also sent to your email within 5-10 minutes (check Spam/Promotions folder if delayed).",
  },
  {
    question: "What if I don't receive my product after purchase?",
    answer:
      "First check your Spam & Promotions folder. If you still don't see it, email us at goexam777@gmail.com with your order details for an instant resend.",
  },
  {
    question: "What if I lose my product?",
    answer:
      "We recommend saving the downloaded PDF file on your device. If you lose it later, email us with your purchase details and we will resend your download link.",
  },
  {
    question: "Can I access the notes on multiple devices?",
    answer:
      "Yes, absolutely! Once downloaded, you can read and access the notes on any device – smartphone, tablet, laptop, or PC.",
  },
  {
    question: "What is the language of your content?",
    answer: "Basic Simple English.",
  },
  {
    question: "How long can I access the material?",
    answer: "Lifetime access! Download once and use it forever.",
  },
  {
    question: "Is it a monthly subscription or a one-time purchase?",
    answer: "It is a one-time payment of RS 199/- only. No recurring fees or hidden charges.",
  },
  {
    question: "What if I entered an incorrect email address?",
    answer:
      "Don't worry! Email us at goexam777@gmail.com with your Transaction ID, and we will send the download link to your correct email address.",
  },
  {
    question: "Is my payment safe and secured?",
    answer: "Yes, 100% safe & secured with 256-bit end-to-end encrypted payment gateway.",
  },
  {
    question: "Which payment modes are accepted?",
    answer: "We accept UPI, Google Pay, PhonePe, Paytm, Credit/Debit Cards, and Net Banking.",
  },
];

export default function NursingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.faqSection}>
      <h2 className={styles.faqTitleSmall}>Frequently Asked Questions ❓</h2>

      <div className={styles.faqList}>
        {faqData.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}>
              <button
                onClick={() => toggleFaq(idx)}
                className={styles.faqQuestionBtn}
                aria-expanded={isOpen}
              >
                <span className={styles.faqQuestionText}>{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`${styles.faqChevron} ${isOpen ? styles.faqChevronRotate : ""}`}
                />
              </button>

              {isOpen && (
                <div className={styles.faqAnswerWrap}>
                  <p className={styles.faqAnswerText}>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
