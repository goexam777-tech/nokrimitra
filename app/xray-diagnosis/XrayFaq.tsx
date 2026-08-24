"use client";

import { useState } from "react";
import styles from "./xray-diagnosis.module.css";

const faqData = [
  {
    question: "What is the X-Ray Diagnosis Guide?",
    answer:
      "The X-Ray Diagnosis Guide is a practical study resource designed to help you understand and interpret common X-rays in a simple and structured way.",
  },
  {
    question: "Who is this ebook for?",
    answer:
      "This guide is useful for medical and healthcare students, interns, nursing students, radiography students, and anyone looking to improve their understanding of common X-ray interpretation.",
  },
  {
    question: "What topics are covered in the guide?",
    answer:
      "The guide covers important radiographic topics including C-spine X-rays, Chest X-rays, Hip & Pelvis X-rays, Knee X-rays, and Radiography & Fluoroscopic Procedures.",
  },
  {
    question: "Is this guide suitable for beginners?",
    answer:
      "Yes. The content is presented in a straightforward format, making it suitable for beginners as well as learners who want a quick revision resource.",
  },
  {
    question: "Will I receive the ebook instantly after purchase?",
    answer:
      "Yes. Once your payment is successfully completed, you can access the ebook through the delivery/download option provided after purchase.",
  },
  {
    question: "Can I read the ebook on my mobile phone?",
    answer:
      "Yes. The ebook is in PDF format and can be read on mobile phones, tablets, laptops and desktops.",
  },
  {
    question: "Is this ebook useful for exam preparation?",
    answer:
      "Yes. It can be used as a quick-reference and revision resource while preparing for medical and healthcare-related examinations.",
  },
  {
    question: "Is this a physical book?",
    answer: "No. This is a digital ebook. No physical copy will be shipped.",
  },
  {
    question: "Can I share the ebook with others?",
    answer:
      "No. The ebook is intended for individual use. Please do not redistribute, resell, upload, or share the file publicly.",
  },
  {
    question: "I haven't received my ebook. What should I do?",
    answer:
      "Please first check your email inbox, spam, promotions, or junk folder. If you still cannot find it, contact our support team.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team at support@nokrimitra.in and we'll be happy to help you.",
  },
  {
    question: "Is this guide a substitute for professional medical training?",
    answer:
      "No. This guide is intended for educational and revision purposes and should be used alongside appropriate textbooks, clinical teaching, and professional guidance.",
  },
];

export default function XrayFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqContainer}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>

        <div className={styles.faqList}>
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className={styles.faqQuestionBtn}
                  aria-expanded={isOpen}
                >
                  <span className={styles.faqSign} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                  <span className={styles.faqQuestionText}>
                    {idx + 1}. {faq.question}
                  </span>
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
    </section>
  );
}
