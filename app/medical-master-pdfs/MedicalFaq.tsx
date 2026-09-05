"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./medical-master-pdfs.module.css";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is included in this combo pack?",
    answer:
      "This combo pack includes 31 Premium Medical PDFs covering Anatomy, Pharmacology, ECG Reading, Lab Test Interpretation, Emergency Medicine, Nursing Practice, Disease Guides, and more.",
  },
  {
    question: "How will I receive the PDFs?",
    answer:
      "After successful payment, you will get instant access to download all PDFs.",
  },
  {
    question: "Is this a physical product?",
    answer:
      "No. This is a digital PDF bundle. No physical books will be shipped.",
  },
  {
    question: "How many PDFs are included?",
    answer:
      "You will receive a total of 31 Medical PDFs in this combo pack.",
  },
  {
    question: "What if I face any download issues?",
    answer:
      "If you need any help, contact us at support@nokrimitra.in.",
  },
  {
    question: "Will I get lifetime access?",
    answer:
      "Yes, once downloaded, you can use the PDFs anytime with lifetime access. 📚🚀",
  },
];

export default function MedicalFaq() {
  // All closed by default
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className={styles.faqSection} aria-label="Frequently Asked Questions">
      <div className={styles.faqContainer}>
        <h2 className={styles.faqHeading}>
          Frequently Asked Questions (FAQs)
        </h2>

        <div className={styles.faqList}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div key={idx} className={styles.faqCard}>
                <button
                  type="button"
                  className={styles.faqQuestionBtn}
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.faqQuestionText}>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`${styles.faqChevron} ${
                      isOpen ? styles.faqChevronOpen : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className={styles.faqAnswer}>
                    <p>
                      {faq.question.includes("download issues") ? (
                        <>
                          If you need any help, contact us at{" "}
                          <a
                            href="mailto:support@nokrimitra.in"
                            className={styles.faqEmailLink}
                          >
                            support@nokrimitra.in
                          </a>
                          .
                        </>
                      ) : (
                        faq.answer
                      )}
                    </p>
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
