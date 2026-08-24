import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Montserrat } from "next/font/google";
import Image from "next/image";

import {
  BookOpen,
  FileText,
  Mail,
  Infinity as InfinityIcon,
  CheckCircle2,
  GraduationCap,
  BookOpen as BookOpenIcon,
  BadgeCheck,
  Globe,
} from "lucide-react";

import xrayHero from "@/public/xray.webp";
import XraySamples from "./XraySamples";
import XrayFaq from "./XrayFaq";
import styles from "./xray-diagnosis.module.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-xray",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-xray-title",
});

export const metadata: Metadata = {
  title: "X-Ray Diagnosis | Practical Guide to Reading X-Rays",
  description:
    "A practical guide to reading, interpreting and understanding common X-rays. The only X-ray guide you need to simplify X-ray diagnosis.",
};

const insideItems = [
  "C-spine X-rays",
  "Chest X-rays",
  "Hip and Pelvis X-rays",
  "Knee X-rays",
  "Some More Bonus",
];

const ratingBars = [
  { label: "Excellent", percent: 100 },
  { label: "Very good", percent: 0 },
  { label: "Average", percent: 0 },
  { label: "Poor", percent: 0 },
  { label: "Terrible", percent: 0 },
];

const careerPoints = [
  {
    Icon: GraduationCap,
    title: "Basic to Advance",
    detail:
      "No matter what you know, this guide teaches you from basic terms to advance level.",
  },
  {
    Icon: BookOpenIcon,
    title: "All Concepts Covered",
    detail: "With this guide you learn each and every aspect of x-rays.",
  },
  {
    Icon: BadgeCheck,
    title: "Self Sufficient",
    detail: "After this guide, you'll have complete clarity on subject.",
  },
  {
    Icon: Globe,
    title: "Global Opportunity",
    detail:
      "With global rise in demand, opportunities are endless in terms of jobs.",
  },
];

const reviews = [
  {
    name: "Rahul Mehta",
    text: "This ebook made X-ray interpretation much easier for me. The explanations are clear and the important points are presented in a very simple way.",
  },
  {
    name: "Priya Sharma",
    text: "I was looking for a concise guide to revise common X-rays and this was exactly what I needed. Very useful for quick revision.",
  },
  {
    name: "Ankit Verma",
    text: "The content is well organized and easy to follow. It helped me understand what to look for when studying common radiographs.",
  },
  {
    name: "Sneha Patel",
    text: "A very practical study resource. I especially liked the straightforward approach to chest, knee, hip and pelvis X-rays.",
  },
  {
    name: "Arjun Kumar",
    text: "Simple language, useful concepts and easy revision. This guide saved me a lot of time while preparing for my studies.",
  },
  {
    name: "Neha Singh",
    text: "One of the most convenient X-ray references I have used for quick study. The topics are focused and not unnecessarily complicated.",
  },
  {
    name: "Pooja Yadav",
    text: "Very helpful for last-minute revision. I can quickly find the important information without going through a large textbook.",
  },
  {
    name: "Aditya Raj",
    text: "I liked the practical focus of this guide. It gives a clear starting point for understanding and interpreting common X-rays.",
  },
  {
    name: "Simran Kapoor",
    text: "Very concise and useful. The structure makes it easy to revise important radiographic concepts whenever needed.",
  },
];

export default function XrayDiagnosisPage() {
  return (
    <main
      className={`${styles.page} ${plusJakarta.variable} ${montserrat.variable}`}
    >
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>
            The Only X-Ray Guide You Need | Simplify X-Ray Diagnosis
          </p>

          <h1 className={styles.mainTitle}>X-Ray Diagnosis</h1>

          <p className={styles.mainSubtitle}>
            A Practical Guide to Reading, Interpreting &amp; Understanding
            Common X-Rays
          </p>

          <div className={styles.heroImageWrap}>
            <Image
              src={xrayHero}
              alt="X-Ray Diagnosis practical guide"
              className={styles.heroImage}
              priority
              sizes="(max-width: 768px) 92vw, 780px"
            />
          </div>

          <div className={styles.ctaSection}>
            <a href="/xray-diagnosis/checkout" className={styles.greenBuyBtn}>
              <span className={styles.greenBuyMain}>BUY NOW</span>
              <span className={styles.greenBuySub}>
                (Get Complete X-Ray Diagnosis Notes)
              </span>
            </a>

            <p className={styles.ctaSubtext}>
              Buy with confidence, <strong>Instant Access On Email</strong>
            </p>
          </div>

          <h2 className={styles.keyPointHeading}>Key Point :</h2>

          <div className={styles.featureGridSection}>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <BookOpen className={styles.featureIcon} size={44} strokeWidth={2} />
                <span className={styles.featureText}>Total Page : 500+</span>
              </div>
              <div className={styles.featureCard}>
                <FileText className={styles.featureIcon} size={44} strokeWidth={2} />
                <span className={styles.featureText}>Format : PDF</span>
              </div>
              <div className={styles.featureCard}>
                <Mail className={styles.featureIcon} size={44} strokeWidth={2} />
                <span className={styles.featureText}>
                  Delivery : Through Email
                </span>
              </div>
              <div className={styles.featureCard}>
                <InfinityIcon
                  className={styles.featureIcon}
                  size={44}
                  strokeWidth={2}
                />
                <span className={styles.featureText}>Validity : Life Time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.insideSection}>
        <div className={styles.container}>
          <h2 className={styles.insideHeading}>What You Get Inside?</h2>

          <ul className={styles.insideList}>
            {insideItems.map((item) => (
              <li key={item}>
                <CheckCircle2
                  className={styles.insideCheck}
                  size={22}
                  strokeWidth={2.5}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className={styles.ctaSection}>
            <a href="/xray-diagnosis/checkout" className={styles.greenBuyBtn}>
              <span className={styles.greenBuyMain}>BUY NOW</span>
              <span className={styles.greenBuySub}>
                (Get Complete X-Ray Diagnosis Notes)
              </span>
            </a>
          </div>
        </div>
      </section>

      <XraySamples />

      <section className={styles.reviewsSection}>
        <div className={styles.reviewsContainer}>
          <h2 className={styles.reviewsHeading}>Reviews &amp; Ratings</h2>

          <div className={styles.ratingSummary}>
            <div className={styles.ratingScoreRow}>
              <span className={styles.ratingScore}>5.0</span>
              <span className={styles.ratingStars}>★★★★★</span>
            </div>
            <p className={styles.ratingBasedOn}>
              5.0 out of 5 stars (based on 250+ ratings)
            </p>

            <div className={styles.ratingBars}>
              {ratingBars.map(({ label, percent }) => (
                <div key={label} className={styles.ratingBarRow}>
                  <span className={styles.ratingBarLabel}>{label}</span>
                  <span className={styles.ratingBarTrack}>
                    <span
                      className={styles.ratingBarFill}
                      style={{ width: `${percent}%` }}
                    />
                  </span>
                  <span className={styles.ratingBarPercent}>{percent}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.reviewList}>
            {reviews.map((r) => (
              <div key={r.name} className={styles.reviewItem}>
                <span className={styles.reviewStars}>★★★★★</span>
                <p className={styles.reviewText}>{r.text}</p>
                <p className={styles.reviewAuthor}>- {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.careerSection}>
        <div className={styles.careerContainer}>
          <h2 className={styles.careerHeading}>How is it helpful in my career?</h2>

          <div className={styles.careerGrid}>
            {careerPoints.map(({ Icon, title, detail }) => (
              <div key={title} className={styles.careerCard}>
                <span className={styles.careerIcon} aria-hidden="true">
                  <Icon size={26} strokeWidth={2} />
                </span>
                <h3 className={styles.careerTitle}>{title}</h3>
                <p className={styles.careerText}>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <XrayFaq />

      <section className={styles.finalCtaSection}>
        <div className={styles.finalCtaCard}>
          <h2 className={styles.finalCtaTitle}>
            Ready to Simplify X-Ray Diagnosis?
          </h2>
          <p className={styles.finalCtaText}>
            Get the complete X-Ray Diagnosis Guide and start reading common
            X-rays with clarity and confidence.
          </p>

          <a href="/xray-diagnosis/checkout" className={styles.greenBuyBtn}>
            <span className={styles.greenBuyMain}>BUY NOW</span>
            <span className={styles.greenBuySub}>
              (Get Complete X-Ray Diagnosis Notes)
            </span>
          </a>

          <p className={styles.finalCtaTrust}>
            Instant Access on Email &nbsp;•&nbsp; PDF Format &nbsp;•&nbsp;
            Lifetime Validity
          </p>
        </div>
      </section>

      <div className={styles.mobileBar}>
        <a href="/xray-diagnosis/checkout" className={styles.mobileBarBtn}>
          BUY NOW &nbsp;—&nbsp; Get Complete X-Ray Notes
        </a>
      </div>
    </main>
  );
}
