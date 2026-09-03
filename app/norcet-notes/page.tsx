import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import norcetHero from "@/public/norcet.webp";
import trustImg from "@/public/trust.webp";
import SampleCarousel from "./SampleCarousel";
import NorcetFaq from "./NorcetFaq";
import styles from "./norcet-notes.module.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-norcet",
});

const audienceList = [
  "B.Sc Nursing",
  "GNM",
  "AIIMS Hospitals",
  "ESIC",
  "NITRD",
  "Safdarjung",
  "CAPFIMS",
  "Govt Hospitals",
];

const highlights = [
  "700+ Pages",
  "All Topics Covered",
  "Instant PDF Download",
];

const whatYouGetInside = [
  { title: "Fundamentals of Nursing", pages: "1-33" },
  { title: "IV Fluids", pages: "34-41" },
  { title: "Anatomy and Physiology", pages: "42-53" },
  { title: "Respiratory Disorders", pages: "54-64" },
  { title: "Cardiac Disorders", pages: "65-75" },
  { title: "GI Disorders", pages: "76-86" },
  { title: "Renal Disorders", pages: "87-95" },
  { title: "Endocrine Disorders", pages: "96-104" },
  { title: "Neurological Disorders", pages: "105-115" },
  { title: "Musculoskeletal Disorders", pages: "116-124" },
  { title: "Hematology, Onco and Infectious", pages: "125-135" },
  { title: "Emergencies and Diagnostics", pages: "136-152" },
  { title: "Pharmacology (Drug Classes)", pages: "153-186" },
  { title: "Drug Calculations", pages: "187-199" },
  { title: "Insulin", pages: "200-208" },
  { title: "Maternal Health", pages: "209-229" },
  { title: "Pediatric Health", pages: "230-250" },
  { title: "Physical Assessment", pages: "251-289" },
  { title: "Cranial Nerve Assessment", pages: "290-295" },
  { title: "Clinical Documentation and Practice", pages: "296-319" },
  { title: "Community Health Nursing", pages: "320-346" },
  { title: "Ethics and Legal Aspects (Advanced)", pages: "347-371" },
  { title: "Nutrition and Diet Therapy", pages: "372-396" },
];

const bonuses = [
  {
    num: "1",
    medal: "🥇",
    title: "1,000+ Drug Notes & Nursing Mnemonics",
    theme: "blue",
    color: "#2563eb",
    points: [
      "Top 1,000 Drugs",
      "Side Effects",
      "Contraindications",
      "Nursing Responsibilities",
      "Dosage Tips",
      "High-Yield Mnemonics",
      "Emergency Drugs",
    ],
  },
  {
    num: "2",
    medal: "🥈",
    title: "Nursing Clinical Skills Handbook",
    theme: "orange",
    color: "#ea580c",
    points: [
      "IV Cannulation",
      "Catheterization",
      "CPR & BLS",
      "ECG Basics",
      "Injection Techniques",
      "Wound Dressing",
      "Oxygen Therapy",
      "NG Tube",
      "Clinical Procedures",
      "OSCE Checklists",
    ],
  },
  {
    num: "3",
    medal: "🥉",
    title: "Nursing Exam Master Bundle",
    theme: "green",
    color: "#16a34a",
    points: [
      "10,000+ MCQs",
      "Previous Year Questions",
      "NCLEX Practice",
      "AIIMS/NORCET/ESIC Preparation",
      "Mock Tests",
      "Quick Revision Notes",
      "Important One-Liners",
      "PDF + Practice Papers",
    ],
  },
];

const studentReviews = [
  {
    name: "Priya Sharma",
    role: "B.Sc Nursing | NORCET Aspirant",
    quote:
      "These notes saved me a lot of time before my exams. Everything is explained in simple language with neat diagrams and important points highlighted. Highly recommended for every NORCET aspirant.",
    initials: "PS",
  },
  {
    name: "Rahul Verma",
    role: "GNM | NORCET Aspirant",
    quote:
      "I was struggling with Pharmacology and Medical Surgical Nursing, but these notes made revision much easier. The format is very easy to remember during NORCET exam.",
    initials: "RV",
  },
  {
    name: "Neha Patel",
    role: "Nursing Officer | AIIMS",
    quote:
      "Best NORCET 11 NOTES I have purchased online. The topics are well organized, the diagrams are clear, and I received the PDF instantly after payment.",
    initials: "NP",
  },
];

function BlueCheck({ size = 14, strokeWidth = 3.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1d58eb"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.svgCheck}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CircleCheck({ color }: { color: string }) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      className={styles.circleCheckSvg}
    >
      <circle cx="12" cy="12" r="10" fill={color} />
      <path
        d="M8 12.2l2.6 2.6L16.2 9.2"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NorcetNotesPage() {
  return (
    <main className={`${styles.wrapper} ${plusJakarta.variable}`}>
      {/* 1. TOP YELLOW BANNER */}
      <div className={styles.topBanner}>
        <span>Offer Valid Only For Today</span>
        <span>
          <span className={styles.strikePrice}>₹1,990/-</span>{" "}
          <span className={styles.currentPrice}>₹149/- Only</span>
        </span>
      </div>

      {/* 2. HERO CONTENT SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          {/* Main Title (2 Lines) */}
          <h1 className={styles.title}>
            <span className={styles.titleLine}>India’s Most Trusted</span>
            <span className={styles.titleLine}>
              <span className={styles.highlightBlue}>NORCET 11 NOTES</span>{" "}
              Platform
            </span>
          </h1>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            Crack NORCET with high-yield, exam-focused notes covering all
            nursing topics — simple explanations, high-yield points, and content
            organized for Nursing Officer exam preparation.
          </p>

          {/* 3. BLUE ASPIRANTS CARD (MOBILE-FIRST) */}
          <div className={styles.aspirantsCard}>
            {/* Card Header Badge */}
            <div className={styles.cardHeaderBadge}>
              <span className={styles.capEmoji}>🎓</span>
              <span className={styles.headerText}>
                MUST HAVE FOR ALL NORCET ASPIRANTS
              </span>
            </div>

            {/* Row 1: Target Audiences Grid (Chips) */}
            <div className={styles.audienceGrid}>
              {audienceList.map((item) => (
                <div key={item} className={styles.audienceItem}>
                  <BlueCheck size={14} strokeWidth={3.5} />
                  <span className={styles.audienceLabel}>{item}</span>
                </div>
              ))}
            </div>

            {/* Row 2: Core Highlights Box */}
            <div className={styles.highlightsBox}>
              {highlights.map((item) => (
                <div key={item} className={styles.highlightItem}>
                  <BlueCheck size={16} strokeWidth={3.8} />
                  <span className={styles.highlightLabel}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. PRODUCT BUNDLE IMAGE */}
          <div className={styles.productImageWrap}>
            <Image
              src={norcetHero}
              alt="Complete NORCET 11 Notes Bundle"
              className={styles.productImage}
              priority
              sizes="(max-width: 640px) 100vw, 760px"
            />
          </div>

          {/* 5. BUY NOW CTA BUTTON */}
          <div className={styles.ctaSection}>
            <a href="/norcet-notes/checkout" className={styles.buyBtn}>
              <span className={styles.buyMain}>BUY NOW</span>
              <span className={styles.buySub}>
                (Access Complete NORCET 11 NOTES)
              </span>
            </a>

            <div className={styles.trustImageWrap}>
              <Image
                src={trustImg}
                alt="100% Safe & Secure Payment"
                className={styles.trustImage}
                sizes="(max-width: 640px) 90vw, 340px"
              />
            </div>

            <p className={styles.ctaSubtext}>
              Buy with confidence, <strong>Instant Access On Email</strong>
            </p>
          </div>

          {/* 6. WHAT YOU GET INSIDE SECTION */}
          <div className={styles.insideSection}>
            <h2 className={styles.insideTitle}>What you get inside.</h2>

            <ul className={styles.insideList}>
              {whatYouGetInside.map((item) => (
                <li key={item.title} className={styles.insideItem}>
                  <BlueCheck size={18} strokeWidth={3.8} />
                  <span className={styles.insideItemText}>
                    {item.title}{" "}
                    <span className={styles.insidePages}>{item.pages}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 7. BONUS SECTION */}
          <div className={styles.bonusSection}>
            <div className={styles.bonusHeader}>
              <h2 className={styles.bonusTitle}>Bonus 🎁</h2>
              <p className={styles.bonusSubtitle}>
                No extra cost. These come free when you buy today.
              </p>
            </div>

            <div className={styles.bonusGrid}>
              {bonuses.map((b) => (
                <div key={b.num} className={styles.bonusCard}>
                  <div className={styles.bonusMedalRow}>
                    <span className={styles.bonusMedal}>{b.medal}</span>
                  </div>

                  <h3 className={styles.bonusCardTitle}>{b.title}</h3>

                  <span
                    className={`${styles.bonusBadge} ${
                      b.theme === "blue"
                        ? styles.bonusBadgeBlue
                        : b.theme === "orange"
                        ? styles.bonusBadgeOrange
                        : styles.bonusBadgeGreen
                    }`}
                  >
                    Included FREE
                  </span>

                  <ul className={styles.bonusPointsList}>
                    {b.points.map((p) => (
                      <li key={p} className={styles.bonusPointItem}>
                        <CircleCheck color={b.color} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Dark Navy Bottom CTA Card (matching user screenshot) */}
            <div className={styles.navyCtaCard}>
              <a href="/norcet-notes/checkout" className={styles.navyCtaBtn}>
                <span className={styles.navyCtaBtnMain}>BUY NOW</span>
                <span className={styles.navyCtaBtnSub}>
                  Access Complete NORCET 11 NOTES
                </span>
              </a>

              <div className={styles.navyPriceRow}>
                <span className={styles.navyOldPrice}>Rs 1,990</span>
                <span className={styles.navyPricePill}>Rs 149 Only</span>
                <span className={styles.navyValidText}>Valid for Today</span>
              </div>

              <p className={styles.navyFooterText}>
                Buy with Confidence • Instant PDF Delivery • Lifetime Access
              </p>
            </div>
          </div>

          {/* 8. SOME SAMPLES CAROUSEL */}
          <SampleCarousel />

          {/* 9. REAL STUDENTS, REAL RESULTS REVIEWS */}
          <div className={styles.reviewsSection}>
            <div className={styles.reviewsHeader}>
              <h2 className={styles.reviewsTitle}>Real Students, Real Results</h2>
            </div>

            <div className={styles.reviewsGrid}>
              {studentReviews.map((r) => (
                <div key={r.name} className={styles.reviewCard}>
                  <div className={styles.reviewRatingRow}>
                    <div className={styles.reviewStars}>★★★★★</div>
                    <span className={styles.reviewRatingText}>
                      Rated 5 out of 5
                    </span>
                  </div>

                  <p className={styles.reviewQuote}>“{r.quote}”</p>

                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>{r.initials}</div>
                    <div className={styles.reviewerDetails}>
                      <h4 className={styles.reviewerName}>{r.name}</h4>
                      <p className={styles.reviewerRole}>{r.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 10. FREQUENTLY ASKED QUESTIONS */}
          <NorcetFaq />
        </div>
      </section>

      {/* 11. FOOTER DISCLAIMER & COPYRIGHT */}
      <footer className={styles.footerSection}>
        <div className={styles.footerContainer}>
          <p className={styles.footerCopyright}>
            © {new Date().getFullYear()} NokriMitra.in. All rights reserved.
          </p>
          <p className={styles.footerDisclaimer}>
            NokriMitra.in is an independent study resource and is not affiliated
            with, endorsed by, or connected to any nursing council, university,
            or educational board. This material supports your learning and is
            not a substitute for your official curriculum or clinical training.
          </p>
        </div>
      </footer>

      {/* 12. STICKY BOTTOM BUY BAR FOR MOBILE */}
      <div className={styles.mobileStickyBar}>
        <div className={styles.mobileStickyInner}>
          <div className={styles.mobileStickyPriceWrap}>
            <div className={styles.mobileStickyPriceRow}>
              <span className={styles.mobileStickyOldPrice}>₹1,990</span>
              <span className={styles.mobileStickyPrice}>₹149</span>
            </div>
            <span className={styles.mobileStickyOfferTag}>
              ⚡ Valid for Today
            </span>
          </div>

          <a href="/norcet-notes/checkout" className={styles.mobileStickyBtn}>
            <span className={styles.mobileStickyBtnText}>BUY NOW</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}
