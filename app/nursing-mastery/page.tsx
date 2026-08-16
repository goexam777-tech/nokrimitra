import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import {
  ArrowRight,
  BookOpenText,
  Check,
  ChevronRight,
  Download,
  FileText,
  HeartPulse,
  Infinity as InfinityIcon,
  Lock,
  Smartphone,
} from "lucide-react";

import trustBadges from "@/public/trust.webp";
import nursingHero from "@/public/nursing.jpg";
import buySteps from "@/public/buyy.webp";
import reviewer1 from "@/public/nurse_review_1.png";
import reviewer2 from "@/public/nurse_review_2.png";
import reviewer3 from "@/public/nurse_review_3.png";
import NursingTimer from "./NursingTimer";
import styles from "./nursing.module.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-nursing",
});

const PRICE = 199;
const OLD_PRICE = 499;
const SAVE_PERCENT = Math.round((1 - PRICE / OLD_PRICE) * 100);
const CHECKOUT = "/nursing-mastery/checkout";
const CONTACT_URL = "mailto:goexam777@gmail.com?subject=Nursing%20Notebook%20support";

export const metadata: Metadata = {
  title: "Nursing Protocol Reference Notebook | 100 Ward Situations",
  description:
    "A practical bedside reference notebook with 100 essential ward situations across 7 clinical sections — emergency response, red flags, assessment, medication guidance and documentation protocols for nurses and nursing students.",
};

const insideItems: [string, string, string][] = [
  [
    "🧩",
    "100 Practical Nursing Situations",
    "Emergency, ward, ICU, pediatric, neonatal, obstetric, geriatric & safety situations.",
  ],
  [
    "⚡",
    "First Response Actions",
    "Step-by-step guidance on what the nurse should do first.",
  ],
  [
    "🚨",
    "Clear Red Flags",
    "Specific signs & thresholds — when to inform the doctor immediately.",
  ],
  [
    "🩺",
    "Immediate Nursing Assessment",
    "Vitals, consciousness, physical assessment & bedside checks.",
  ],
  [
    "💊",
    "Medication & Order Guidance",
    "Commonly administered medications with safety checks and physician-order context.",
  ],
  [
    "📝",
    "Documentation Points",
    "Exactly what to chart and document for every situation.",
  ],
  [
    "⚠️",
    "Complications to Watch",
    "What can develop if the condition worsens, so you stay one step ahead.",
  ],
];

const clinicalSections: [string, string, string][] = [
  ["01", "Emergency / Critical", "Shock • Sepsis • Chest Pain • Seizure • Cardiac Arrest"],
  ["02", "Common Daily Ward Care", "IV • Blood Transfusion • Wounds • Catheter • Pressure Injury"],
  ["03", "Specialized Nursing", "Chemotherapy • Central Line • Dialysis • ICU / HDU"],
  ["04", "Pediatric & Neonatal", "Newborn Care • Fever • Seizure • Dehydration"],
  ["05", "Obstetric & Gynae", "Labour • PPH • Pre-eclampsia • Maternal Emergencies"],
  ["06", "Geriatric & Chronic Care", "Falls • Delirium • Chronic Care • Palliative Care"],
  ["07", "Procedures & Safety", "Hand Hygiene • SBAR / ISBAR • Medication Safety • Waste Management"],
];

const audience = [
  "GNM Students",
  "ANM Students",
  "B.Sc. Nursing Students",
  "Staff Nurses",
  "Junior Nurses",
  "Clinical Posting Students",
  "Ward & ICU Nursing Staff",
];

const whyFlow = [
  "What should I assess first?",
  "What should I do immediately?",
  "Which signs are dangerous?",
  "When should I call the doctor?",
  "What should I document?",
];

const reviews = [
  {
    avatar: reviewer1,
    name: "Priya Nair",
    role: "Staff Nurse",
    text: "This is exactly what I needed on the ward. When a patient deteriorates, I know what to assess first and when to call the doctor. The red flags section is a lifesaver.",
  },
  {
    avatar: reviewer2,
    name: "Anjali Verma",
    role: "GNM Student",
    text: "Perfect for clinical postings. The same 7-part format for every situation makes it so easy to remember and revise before duty.",
  },
  {
    avatar: reviewer3,
    name: "Ritu Singh",
    role: "ICU Nurse",
    text: "The documentation points and complication warnings are very practical. It feels like a senior nurse guiding you at the bedside.",
  },
];

const faqs = [
  {
    q: "How will I receive the notebook?",
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
    q: "Who is this notebook best for?",
    a: "Staff nurses, GNM/ANM/B.Sc. nursing students, junior nurses and clinical posting students who want quick, practical bedside answers.",
  },
  {
    q: "What if I face an issue with payment or download?",
    a: "Contact support with your Order ID and we will resend your download link right away.",
  },
];

export default function NursingMasteryPage() {
  return (
    <main className={`${styles.page} ${montserrat.variable}`}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <p className={styles.edition}>Nursing Protocol Reference · 2026</p>
            <h1>
              Don&apos;t Just Know the Condition. <span>Know What To Do Next.</span>
            </h1>
            <div className={styles.heroDetails}>
              <p><span>📘</span> 100 Ward Situations <i /> <span>🏥</span> 7 Clinical Sections</p>
              <p><span>⚡</span> Practical Bedside Response Guide</p>
              <p className={styles.trusted}><span>✅</span> For Staff Nurses • GNM • ANM • B.Sc. Nursing Students</p>
            </div>
          </div>

          <div className={styles.heroImageWrap}>
            <Image
              src={nursingHero}
              alt="Nursing Protocol Reference Notebook — 100 Ward Situations"
              className={styles.heroImage}
              priority
              sizes="(max-width: 767px) 96vw, 940px"
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
              <BookOpenText size={20} /> GET THE E-BOOK — ₹{PRICE}
              <ArrowRight size={19} />
            </a>
            <p>One-time price · No subscription · Instant download</p>
          </div>
        </div>
      </section>

      <section className={styles.insideSection} id="inside">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>WHAT&apos;S INSIDE</p>
            <h2>Everything You Need <span>at the Bedside</span></h2>
            <p>Every situation follows the same clear, practical structure.</p>
          </div>

          <div className={styles.insideGrid}>
            {insideItems.map(([emoji, title, desc]) => (
              <article className={styles.insideCard} key={title}>
                <span className={styles.insideIcon} aria-hidden="true">{emoji}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>7 CLINICAL SECTIONS</p>
            <h2>Organised the Way <span>You Work</span></h2>
          </div>

          <div className={styles.sectionsGrid}>
            {clinicalSections.map(([num, title, items]) => (
              <article className={styles.sectionCard} key={num}>
                <span className={styles.sectionNum}>{num}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{items}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.audienceSection}>
        <div className={styles.container}>
          <div className={styles.stepsBanner}>
            <Image
              src={buySteps}
              alt="Purchase, download and start using the Nursing Protocol Reference Notebook"
              className={styles.stepsImage}
              sizes="(max-width: 599px) 88vw, 420px"
            />
          </div>

          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>WHO IS THIS FOR</p>
            <h2>Made for <span>Every Nurse</span></h2>
          </div>
          <div className={styles.audienceCloud}>
            {audience.map((a) => (
              <span className={styles.audienceTag} key={a}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={styles.container}>
          <div className={styles.whyCard}>
            <h2>Why This E-book? <span>🔥</span></h2>
            <p className={styles.whyLead}>
              At the bedside, nurses need quick answers. This notebook keeps all
              of them in a consistent 7-part quick-reference format.
            </p>
            <ol className={styles.whyFlow}>
              {whyFlow.map((step, i) => (
                <li key={step}>
                  <span className={styles.whyStepNum}>{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.pricingSection} id="pricing">
        <div className={styles.container}>
          <div className={styles.priceCard}>
            <span className={styles.priceBadge}>🔥 TODAY ONLY</span>

            <h2>Nursing Protocol Reference Notebook</h2>
            <p className={styles.priceMetaTop}>
              100 Ward Situations · 7 Clinical Sections · Practical Response Guide
            </p>

            <p className={styles.priceRow}>
              <span className={styles.priceValue}>₹{PRICE}</span>
              <s className={styles.priceOld}>₹{OLD_PRICE}</s>
            </p>

            <p className={styles.priceHighlight}>
              You save {SAVE_PERCENT}% • One-time payment • Lifetime Access
            </p>

            <NursingTimer className={styles.priceTimer} />

            <p className={styles.priceTag}>Limited Time OFFER!</p>

            <a className={styles.priceCta} href={CHECKOUT}>
              <Download size={20} /> YES! I WANT THE E-BOOK
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
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>LOVED BY NURSES</p>
            <h2>What Nurses <span>Are Saying</span></h2>
          </div>
          <div className={styles.reviewsGrid}>
            {reviews.map((r) => (
              <figure className={styles.reviewCard} key={r.name}>
                <div className={styles.reviewStars}>★★★★★</div>
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <Image
                    src={r.avatar}
                    alt={`${r.name}, ${r.role}`}
                    className={styles.reviewAvatar}
                    sizes="44px"
                  />
                  <span>
                    <strong>{r.name}</strong>
                    <small>{r.role}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>QUESTIONS</p>
            <h2>Frequently Asked <span>Questions</span></h2>
          </div>
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
            <HeartPulse size={17} /> NokriMitra
          </span>
          <p className={styles.footerTagline}>Nursing Protocol Reference Notebook · 2026</p>

          <nav className={styles.footerNav} aria-label="Nursing notebook legal links">
            <a href="/nursing-mastery/privacy-policy">Privacy Policy</a>
            <a href="/nursing-mastery/refund-policy">Refund Policy</a>
            <a href="/nursing-mastery/terms">Terms &amp; Conditions</a>
            <a href="/nursing-mastery/disclaimer">Disclaimer</a>
            <a href={CONTACT_URL}>Contact</a>
          </nav>

          <div className={styles.footerNotes}>
            <p>
              For education and quick reference only, not medical advice. Always
              follow your institution&apos;s protocols, current guidelines and
              qualified clinical judgement.
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
          <span>Get My Nursing E-book</span>
          <b>₹{PRICE}</b>
        </a>
      </div>
    </main>
  );
}
