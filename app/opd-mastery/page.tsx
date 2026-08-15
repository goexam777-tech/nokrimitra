import type { Metadata } from "next";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Check,
  ChevronRight,
  Download,
  FileText,
  Infinity as InfinityIcon,
  Lock,
  Mail,
  Smartphone,
  Stethoscope,
} from "lucide-react";

import opdHero from "@/public/opd1.webp";
import buySteps from "@/public/buyy.webp";
import creatorImg from "@/public/aaravmehta.jpg";
import trustBadges from "@/public/trust.webp";
import reviewer1 from "@/public/scdr1.webp";
import reviewer2 from "@/public/scdr2.webp";
import reviewer3 from "@/public/scdr3.webp";
import OfferTimer from "./OfferTimer";
import ReviewCarousel, { type Review } from "./ReviewCarousel";
import styles from "./opd.module.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-opd",
});

const PRICE = 199;
const OLD_PRICE = 1399;
const SAVE_PERCENT = Math.round((1 - PRICE / OLD_PRICE) * 100);
const CHECKOUT = "/opd-mastery/checkout";
const CONTACT_URL = "mailto:goexam777@gmail.com?subject=OPD%20Mastery%20support";

export const metadata: Metadata = {
  title: "OPD Mastery E-Book 2026 | Clinical Reference Guide",
  description:
    "OPD Mastery 2026 clinical reference e-book with 60+ common OPD cases, ready-reference formats and an OBS & GYNAE section.",
};

const caseTopics = [
  ["😮‍💨", "Dry Cough"],
  ["🤒", "Fever"],
  ["🔥", "Acidity / GERD"],
  ["🤕", "Headache"],
  ["🩸", "Hypertension"],
  ["💉", "Diabetes"],
  ["🦟", "Dengue"],
  ["🚻", "UTI"],
  ["🦴", "Arthritis"],
  ["💫", "Vertigo"],
  ["🤧", "Sore Throat"],
  ["🫁", "Bronchitis"],
  ["🦠", "Typhoid"],
  ["🦟", "Malaria"],
  ["🤢", "Gastritis"],
  ["💬", "IBS"],
  ["🦵", "Sciatica"],
  ["👁️", "Conjunctivitis"],
  ["🧴", "Skin Allergy"],
  ["😴", "Insomnia"],
];

const obsTopics = [
  "PCOD",
  "Irregular Cycles",
  "Dysmenorrhea",
  "Pregnancy OPD Care",
  "Infertility",
  "Fibroid Uterus",
  "Gestational Diabetes",
];

const caseFormat = [
  "Drug of Choice (DOC)",
  "Alternative Medicines",
  "Dosage & Duration",
  "Important Contraindications",
  "Lifestyle & Diet Advice",
  "Emergency Red Flag Signs",
  "Quick OPD Reference Format",
];

const useCases = [
  ["🏥", "Hospital OPDs"],
  ["🏡", "Clinic & Private Practice"],
  ["📋", "Daily OPD Case Management"],
  ["📚", "Study & Quick Revision"],
  ["🎯", "Exam & Viva Preparation"],
  ["💪", "Improve Clinical Confidence"],
];

const reviews: Review[] = [
  {
    avatar: reviewer1,
    name: "Dr. Rohan Mehta",
    role: "General Physician",
    text: "Cuts down my OPD decision time a lot. The prescription format is exactly what I needed on busy days.",
  },
  {
    avatar: reviewer2,
    name: "Dr. Sneha Kulkarni",
    role: "Medical Officer",
    text: "Simple layout, no unnecessary theory. Good quick-reference for common cases.",
  },
  {
    avatar: reviewer3,
    name: "Dr. Pranav Deshmukh",
    role: "MBBS",
    text: "Loved the OBS & GYNAE section, not many OPD guides cover that in this much detail.",
  },
];

const faqs = [
  {
    q: "How will I receive the e-book?",
    a: "Instantly. As soon as your payment succeeds, a download button appears on the thank-you page and the same link is emailed to you.",
  },
  {
    q: "Is this a one-time payment?",
    a: "Yes. ₹199 is a single one-time payment with lifetime access. There is no subscription or recurring charge.",
  },
  {
    q: "Can I read it on my phone?",
    a: "Yes. The PDF opens on any phone, tablet, laptop or desktop PDF reader.",
  },
  {
    q: "What if I face an issue with payment or download?",
    a: "Contact support with your Order ID and we will resend your download link.",
  },
  {
    q: "Do I need to sign up before buying?",
    a: "No account is needed. Just enter your name and email at checkout and pay.",
  },
  {
    q: "Will there be future updates?",
    a: "This is the 2026 Edition. Contact support for the latest information about any future update policy.",
  },
];

export default function OpdMasteryPage() {
  return (
    <main className={`${styles.page} ${montserrat.variable}`}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <p className={styles.edition}>2026 Edition · Clinical Reference Guide</p>
            <h1>
              Stop Guessing. <span>Start Prescribing Right.</span>
            </h1>
            <div className={styles.heroDetails}>
              <p><span>🧠</span> 60+ real OPD cases <i /> <span>💊</span> Ready Prescriptions <i /></p>
              <p><span>⏱️</span> Save Time Every Consultation</p>
              <p className={styles.trusted}><span>✅</span> 100% Trusted Website</p>
            </div>
          </div>

          <div className={styles.heroImageWrap}>
            <Image
              src={opdHero}
              alt="OPD Mastery E-Book 2026 clinical reference guide"
              className={styles.heroImage}
              priority
              sizes="(max-width: 767px) 96vw, 960px"
            />
          </div>

          <div className={styles.accessGrid}>
            <article>
              <span><FileText size={21} /></span>
              <div><strong>Instant PDF</strong><small>Digital format</small></div>
            </article>
            <article>
              <span><InfinityIcon size={22} /></span>
              <div><strong>Lifetime Access</strong><small>Keep your copy</small></div>
            </article>
            <article>
              <span><Smartphone size={21} /></span>
              <div><strong>Mobile Friendly</strong><small>Any device</small></div>
            </article>
          </div>

          <div className={styles.heroCtaWrap}>
            <a className={styles.primaryCta} href={CHECKOUT}>
              <BookOpenText size={20} /> GET YOUR E-BOOK — ₹{PRICE}
              <ArrowRight size={19} />
            </a>
            <p>One-time listed price · No subscription</p>
          </div>
        </div>
      </section>

      <section className={styles.topicSection} id="inside">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>WHAT&apos;S INSIDE</p>
            <h2><span>60+</span> Common OPD Cases</h2>
            <p>Frequently encountered cases, organised for fast reference and revision.</p>
          </div>

          <div className={styles.topicCloud}>
            {caseTopics.map(([emoji, topic]) => (
              <span className={styles.topicTag} key={topic}>
                <b aria-hidden="true">{emoji}</b>{topic}
              </span>
            ))}
            <span className={`${styles.topicTag} ${styles.moreTag}`}>+40 More</span>
          </div>

          <div className={styles.obsPanel}>
            <div className={styles.obsHeading}>
              <span>👩‍⚕️</span>
              <h3>Special Section: OBS &amp; GYNAE</h3>
            </div>
            <div className={styles.obsTags}>
              {obsTopics.map((topic) => <span key={topic}>{topic}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formatSection}>
        <div className={styles.container}>
          <div className={styles.formatHeading}>
            <p className={styles.eyebrow}>EVERY CASE, SAME FORMAT</p>
            <h2>Simple. Fast. OPD-Ready. <span>⚡</span></h2>
          </div>

          <div className={styles.formatCard}>
            <ul className={styles.formatList}>
              {caseFormat.map((item) => (
                <li key={item}><span><Check size={15} strokeWidth={3.5} /></span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.useSection}>
        <div className={styles.container}>
          <div className={styles.topBanner}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://d1yei2z3i6k35z.cloudfront.net/5670878/6a7ee781d58857.69029360_85586.jpg"
              alt="OPD Mastery e-book preview"
              className={styles.topBannerImage}
              loading="lazy"
            />
          </div>

          <div className={styles.stepsBanner}>
            <Image
              src={buySteps}
              alt="Purchase, download and read the OPD Mastery e-book"
              className={styles.stepsImage}
              sizes="(max-width: 599px) 88vw, 420px"
            />
          </div>

          <div className={styles.useHeading}>
            <h2>Built For Doctors Like You <span>🩺</span></h2>
          </div>

          <div className={styles.useGrid}>
            {useCases.map(([emoji, label]) => (
              <article key={label}>
                <span className={styles.useIcon} aria-hidden="true">{emoji}</span>
                <h3>{label}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.pricingSection} id="pricing">
        <div className={styles.container}>
          <div className={styles.priceCard}>
            <span className={styles.priceBadge}>🔥 TODAY ONLY</span>

            <h2>OPD Mastery E-book · 2026 Edition</h2>

            <p className={styles.priceRow}>
              <span className={styles.priceValue}>₹{PRICE}</span>
              <s className={styles.priceOld}>₹{OLD_PRICE}</s>
            </p>

            <p className={styles.priceHighlight}>
              You save {SAVE_PERCENT}% • One-time payment • Lifetime Access
            </p>

            <OfferTimer className={styles.priceTimer} />

            <p className={styles.priceTag}>Limited Time OFFER!</p>

            <a className={styles.priceCta} href={CHECKOUT}>
              <Download size={20} /> GET YOUR COPY NOW
            </a>

            <div className={styles.priceMeta}>
              <span><Check size={15} /> Instant Download</span>
              <span><Check size={15} /> Works on Mobile</span>
            </div>
          </div>

          <div className={styles.trustBlock}>
            <p><Lock size={15} /> Guaranteed <b>safe &amp; secure</b> checkout</p>
            <Image
              src={trustBadges}
              alt="Accepted payment methods including Visa, Mastercard, Paytm, Google Pay, PhonePe and Amazon Pay"
              className={styles.trustImage}
              sizes="(max-width: 599px) 90vw, 430px"
            />
          </div>
        </div>
      </section>

      <section className={styles.reviewSection}>
        <div className={styles.container}>
          <ReviewCarousel reviews={reviews} />
        </div>
      </section>

      <section className={styles.creatorSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>TRUSTED SELLER</p>
            <h2>Meet The Creator <span>👋</span></h2>
          </div>

          <div className={styles.creatorCard}>
            <Image
              src={creatorImg}
              alt="Aarav Mehta"
              className={styles.creatorAvatar}
              sizes="96px"
            />
            <p className={styles.creatorName}>
              Aarav Mehta <BadgeCheck size={18} />
            </p>
            <p className={styles.creatorBio}>
              We create practical, exam-ready and clinical quick-reference PDFs
              designed to save you time, trusted by doctors and students across
              India.
            </p>
            <div className={styles.creatorBadges}>
              <span>✅ Verified Seller</span>
              <span>📚 Multiple E-books Published</span>
              <span>🩺 Trusted by Doctors &amp; Students</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details className={styles.faq} key={faq.q}>
                <summary>
                  <span className={styles.faqPlus} aria-hidden="true" />
                  <span className={styles.faqQ}>{faq.q}</span>
                  <ChevronRight className={styles.faqChevron} size={16} aria-hidden="true" />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.narrowContainer}>
          <span className={styles.footerBrand}>
            <Stethoscope size={17} /> NokriMitra
          </span>
          <p className={styles.footerTagline}>OPD Mastery E-book · 2026 Edition</p>

          <nav className={styles.footerNav} aria-label="OPD Mastery legal links">
            <a href="/opd-mastery/privacy-policy">Privacy Policy</a>
            <a href="/opd-mastery/refund-policy">Refund Policy</a>
            <a href="/opd-mastery/terms">Terms &amp; Conditions</a>
            <a href="/opd-mastery/disclaimer">Disclaimer</a>
            <a href={CONTACT_URL}>Contact</a>
          </nav>

          <div className={styles.footerNotes}>
            <p>
              For education and quick reference only, not medical advice. Follow current
              guidelines and qualified clinical judgement.
            </p>
            <p>
              This site is not part of Facebook or Meta Platforms, Inc., and is not endorsed
              by Meta. FACEBOOK and INSTAGRAM are trademarks of Meta Platforms, Inc.
            </p>
          </div>

          <p className={styles.footerCopy}>
            © {new Date().getFullYear()} NokriMitra. All rights reserved.
          </p>
        </div>
      </footer>

      <div className={styles.mobileBar}>
        <a href={CHECKOUT}>
          <Download size={19} />
          <span>GET YOUR E-BOOK NOW!</span>
          <b>₹{PRICE}</b>
        </a>
      </div>
    </main>
  );
}
