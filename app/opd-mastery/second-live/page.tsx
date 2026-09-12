import type { Metadata } from "next";
import Image from "next/image";
import { Montserrat, Poppins } from "next/font/google";
import {
  ArrowRight,
  BookOpenText,
  Check,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  Infinity as InfinityIcon,
  Lock,
  Mail,
  Smartphone,
  Star,
  Stethoscope,
} from "lucide-react";

import opdHero from "@/public/opd99.webp";
import buySteps from "@/public/opd-last-banner.png";
import trustBadges from "@/public/trust.webp";
import reviewer1 from "@/public/scdr1.webp";
import reviewer2 from "@/public/scdr2.webp";
import reviewer3 from "@/public/scdr3.webp";
import OfferTimer from "../OfferTimer";
import ReviewCarousel, { type Review } from "../ReviewCarousel";
import FaqAccordion from "../FaqAccordion";
import OpdAnalytics from "../OpdAnalytics";
import LiveSocialProof from "../LiveSocialProof";
import styles from "./second-live.module.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-opd",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

const PRICE = 99;
const OLD_PRICE = 999;
const SAVE_PERCENT = Math.round((1 - PRICE / OLD_PRICE) * 100);
const CHECKOUT = "/opd-mastery/checkout";
const CONTACT_URL = "mailto:goexam777@gmail.com?subject=OPD%20Mastery%20support";
const WHATSAPP_URL = "https://wa.me/919104826422?text=Hello!%20I%20have%20a%20question%20regarding%20the%20OPD%20Mastery%20E-Book.";

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

const medicineCases = [
  "Dry & Productive Cough",
  "Acidity & Dyspepsia",
  "Headache & Neuropathic Pain",
  "Hypertension",
  "Diabetes",
  "Dengue, Malaria & Typhoid",
  "Urinary Tract Infection (UTI)",
  "COPD",
  "Arthritis & Sciatica",
  "IBS & Constipation",
  "Obesity",
  "Hair Fall",
  "Erectile Dysfunction",
  "Premature Ejaculation",
  "Low Sperm Count & Many More…",
];

const obsCases = [
  "White Discharge (Vaginal)",
  "PCOD",
  "Irregular Menstrual Cycle",
  "Painful Periods (Dysmenorrhoea)",
  "Pregnancy OPD Care",
  "Infertility & Many More…",
];

const caseFormat = [
  "Drug of Choice (DOC)",
  "Alternative Medicines",
  "Dosage & Duration",
  "Important Contraindications",
  "Lifestyle & Diet Advice",
  "Emergency Red Flags",
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

const perfectForList = [
  ["👨‍⚕️", "MBBS Students"],
  ["🩺", "Medical Interns"],
  ["🏥", "Junior Doctors"],
  ["👨‍⚕️", "General Practitioners"],
  ["📋", "Medical Officers"],
];

const opdFormatList = [
  "Drug of Choice (DOC)",
  "Alternative Medicines",
  "Dosage & Duration",
  "Important Contraindications",
  "Lifestyle & Diet Advice",
  "Emergency Red Flags",
  "Quick OPD Reference Format",
];

const readerReviews = [
  {
    avatar: reviewer1,
    initial: "M",
    role: "Medical Student",
    quote: "The explanations are clear, practical, and perfect for quick OPD reference. Highly recommended.",
  },
  {
    avatar: reviewer2,
    initial: "I",
    role: "Medical Intern",
    quote: "This eBook helped me revise common OPD cases much faster before my clinical postings.",
  },
  {
    avatar: reviewer3,
    initial: "J",
    role: "Junior Doctor",
    quote: "The diagnosis and treatment approach is easy to understand and apply in daily practice.",
  },
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
    emoji: "📘",
    q: "What is the Complete OPD Guide E-Book?",
    a: "The Complete OPD Guide is a practical medical reference designed to help medical students, interns, and doctors understand the diagnosis and management of common OPD cases in an easy-to-follow format.",
  },
  {
    emoji: "👨‍⚕️",
    q: "Who is this eBook for?",
    a: "This eBook is ideal for MBBS students, interns, junior doctors, medical graduates, and anyone looking to strengthen their clinical knowledge for OPD practice.",
  },
  {
    emoji: "📫",
    q: "How will I receive the eBook?",
    a: "Instantly. As soon as your payment succeeds, a download button appears on the thank-you page and the same link is emailed to you.",
  },
  {
    emoji: "📱",
    q: "Can I read it on my mobile or tablet?",
    a: "Yes. The PDF opens on any phone, tablet, laptop or desktop PDF reader.",
  },
  {
    emoji: "♾️",
    q: "Will I get lifetime access?",
    a: "Yes. ₹99 is a single one-time payment with lifetime access. There is no subscription or recurring charge.",
  },
  {
    emoji: "🔄",
    q: "Can I get a refund?",
    a: "Due to the digital nature of the e-book, all sales are final. If you face any issues with payment or download, contact our support team and we will resolve it immediately.",
  },
  {
    emoji: "📚",
    q: "Does this replace standard medical textbooks?",
    a: "No. This eBook is intended as a practical study and revision companion. It should be used alongside standard textbooks, institutional teaching, and clinical supervision—not as a replacement.",
  },
  {
    emoji: "🔐",
    q: "Can I share this PDF with others?",
    a: "No. Your purchase is for personal use only. Unauthorized sharing, redistribution, or resale is prohibited.",
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function OpdMasteryPage() {
  return (
    <main className={`${styles.page} ${montserrat.variable} ${poppins.variable}`}>
      <OpdAnalytics />
      <LiveSocialProof />
      <section className={styles.simpleHero}>
        <div className={styles.simpleContainer}>
          <span className={styles.heroBadge}>
            Complete OPD Guide E-Book
          </span>

          <h1 className={styles.simpleTitle}>
            Become More Confident
            <span className={styles.simpleTitleBlue}>in Daily OPD Practice</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Stop wasting time searching treatment protocols. Get ready-to-use, case-based management for the most common OPD cases in one practical eBook.
          </p>

          <div className={styles.simpleImageWrap}>
            <Image
              src={opdHero}
              alt="Complete OPD Guide E-Book"
              className={styles.simpleImage}
              priority
              sizes="(max-width: 599px) 92vw, 560px"
            />
          </div>

          <div className={styles.heroPerks}>
            <div className={styles.heroPerk}>
              <span className={styles.heroPerkIcon} aria-hidden="true">📄</span>
              <strong>Instant PDF</strong>
            </div>
            <div className={styles.heroPerk}>
              <span className={styles.heroPerkIcon} aria-hidden="true">
                <InfinityIcon size={24} color="#1689ef" strokeWidth={2.5} />
              </span>
              <strong>Lifetime Access</strong>
            </div>
            <div className={styles.heroPerk}>
              <span className={styles.heroPerkIcon} aria-hidden="true">📱</span>
              <strong>Mobile Friendly</strong>
            </div>
          </div>

          <a className={styles.heroCtaNew} href={CHECKOUT}>
            <span className={styles.heroCtaEmoji} aria-hidden="true">📘</span>
            <span>GET OPD MASTERY PDF NOW</span>
          </a>
        </div>
      </section>

      <section className={styles.wiSection} id="inside">
        <div className={styles.wiContainer}>
          <div className={styles.wiHeader}>
            <span className={styles.wiBadge}>
              <BookOpenText size={15} /> Complete OPD Coverage
            </span>
            <h2 className={styles.wiTitle}>
              <span aria-hidden="true">✅</span> What&apos;s Inside?
            </h2>
            <p className={styles.wiSubtitle}>
              Step-by-step management protocols for the most common OPD cases
            </p>
          </div>

          <div className={styles.wiGrid}>
            <div className={`${styles.wiCard} ${styles.wiCardBlue}`}>
              <div className={styles.wiCardHeader}>
                <div className={styles.wiLabelGroup}>
                  <span className={styles.wiIcon} aria-hidden="true">🩺</span>
                  <h3>Medicine Cases</h3>
                </div>
              </div>
              <ul className={styles.wiList}>
                {medicineCases.map((c) => (
                  <li key={c} className={c.includes("Many More") ? styles.wiMoreItem : ""}>
                    <span className={styles.wiCheck} aria-hidden="true">
                      <Check size={13} strokeWidth={3.5} />
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${styles.wiCard} ${styles.wiCardPink}`}>
              <div className={styles.wiCardHeader}>
                <div className={styles.wiLabelGroup}>
                  <span className={styles.wiIcon} aria-hidden="true">👩‍⚕️</span>
                  <h3>OBS &amp; GYNAE Cases</h3>
                </div>
              </div>
              <ul className={styles.wiList}>
                {obsCases.map((c) => (
                  <li key={c} className={c.includes("Many More") ? styles.wiMoreItem : ""}>
                    <span className={styles.wiCheckPink} aria-hidden="true">
                      <Check size={13} strokeWidth={3.5} />
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formatSection} style={{ backgroundColor: "#ffffff" }}>
        <div className={styles.formatContainer}>
          <h2 className={styles.formatTitle}>
            Simple Fast OPD-Ready
          </h2>
          <div className={styles.formatBox} style={{ backgroundColor: "#ffffff" }}>
            {opdFormatList.map((item) => (
              <div key={item} className={styles.formatItem}>
                <div className={styles.formatCheck} aria-hidden="true">
                  <Check size={15} strokeWidth={3.5} />
                </div>
                <span className={styles.formatText}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.pfSection}>
        <div className={styles.pfContainer}>
          <h2 className={styles.pfTitle}>
            <span aria-hidden="true">🎯</span> Perfect For
          </h2>
          <div className={styles.pfPillsWrap}>
            {perfectForList.map(([emoji, text]) => (
              <div key={text} className={styles.pfPill}>
                <span className={styles.pfEmoji} aria-hidden="true">{emoji}</span>
                <span className={styles.pfText}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.todayOfferSection}>
        <div className={styles.simpleContainer}>
          <div className={styles.todayOfferBox}>
            <p className={styles.actualPriceRow}>
              Actual Price = <span className={styles.strikePrice}>Rs.999/-</span>
            </p>
            <h2 className={styles.todayOfferTitle}>
              Today Offer =
            </h2>
            <p className={styles.offerPriceRow}>
              Rs.99/-
            </p>

            <a className={styles.simpleCta} href={CHECKOUT}>
              <CheckCircle2 size={22} /> Click Here to Get Access
            </a>

            <OfferTimer variant="boxes" durationMinutes={30} className={styles.boxesTimerWrap} />
          </div>
        </div>
      </section>

      <section className={styles.readersSection}>
        <div className={styles.readersContainer}>
          <div className={styles.readersHeader}>
            <h2 className={styles.readersTitle}>What Our Readers Say</h2>
            <p className={styles.readersSubtitle}>
              Trusted by Medical Students, Interns &amp; Doctors
            </p>
          </div>

          <div className={styles.readersGrid}>
            {readerReviews.map((rev) => (
              <div key={rev.role + rev.initial} className={styles.readerCard}>
                <div>
                  <div className={styles.readerStars}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>

                  <p className={styles.readerQuote}>&ldquo;{rev.quote}&rdquo;</p>
                </div>

                <div className={styles.readerMeta}>
                  {rev.avatar ? (
                    <Image
                      src={rev.avatar}
                      alt={rev.role}
                      className={styles.readerAvatarImage}
                      width={44}
                      height={44}
                    />
                  ) : (
                    <div className={styles.readerAvatar}>{rev.initial}</div>
                  )}
                  <div className={styles.readerInfo}>
                    <strong className={styles.readerRole}>{rev.role}</strong>
                    <span className={styles.readerVerified}>
                      <Check size={13} strokeWidth={3} /> Verified Reader
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faqSectionNew} id="faq">
        <div className={styles.faqContainerNew}>
          <div className={styles.faqHeaderNew}>
            <h2 className={styles.faqTitleNew}>Frequently Asked Questions</h2>
            <p className={styles.faqSubtitleNew}>
              Everything you need to know before purchasing the Complete OPD Guide E-Book.
            </p>
          </div>

          <FaqAccordion faqs={faqs} />
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

            <div className={styles.stepsBanner}>
              <Image
                src={buySteps}
                alt="Purchase, download, and read the OPD Guide E-Book"
                className={styles.stepsImage}
                sizes="(max-width: 599px) 90vw, 420px"
              />
            </div>

            <a className={styles.priceCta} href={CHECKOUT}>
              <Download size={20} /> GET YOUR COPY NOW
            </a>

            <div className={styles.priceMeta}>
              <span><Check size={15} /> Instant Download</span>
              <span><Check size={15} /> Works on Mobile</span>
            </div>
          </div>

          <div className={styles.trustBlock}>
            <Image
              src={trustBadges}
              alt="Accepted payment methods including Visa, Mastercard, Paytm, Google Pay, PhonePe and Amazon Pay"
              className={styles.trustImage}
              sizes="(max-width: 599px) 90vw, 430px"
            />
          </div>
        </div>
      </section>





      <footer className={styles.footer}>
        <div className={styles.narrowContainer}>
          <span className={styles.footerBrand}>
            <Stethoscope size={17} /> OPD Mastery
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
            © {new Date().getFullYear()} OPD Mastery. All rights reserved.
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

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatWhatsApp}
        aria-label="Chat on WhatsApp Support"
      >
        <WhatsAppIcon className={styles.floatWaIcon} />
      </a>
    </main>
  );
}
