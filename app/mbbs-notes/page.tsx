import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Smartphone,
  Printer,
  Download,
  Star,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";
import mbbsHeroCover from "@/public/mbnote.webp";
import nervousBook from "@/public/nervous-system (1).jpg";
import cardioBook from "@/public/cardiovascular-system (1).jpg";
import respBook from "@/public/respiratory-system (1).jpg";
import gastroBook from "@/public/gastrointestinal-system.jpg";
import musculoBook from "@/public/musculoskeletal-system.jpg";
import pharmaBook from "@/public/pharmacology-and-toxicology (1).jpg";
import publicHealthBook from "@/public/public-health-and-microbiology.jpg";
import sexualHealthBook from "@/public/sexual-and-reproductive-health.jpg";
import clinicalInvestBook from "@/public/clinical-investigations.jpg";
import osceBook from "@/public/preparing-for-osce-exams (1).jpg";
import urinaryBook from "@/public/urinary-and-renal-system.jpg";
import emergencyBook from "@/public/emergency-room-medicine (1).jpg";
import haematologyBook from "@/public/clinical-haematology.jpg";
import immunologyBook from "@/public/immunology-and-rheumatology.jpg";
import endocrineBook from "@/public/endocrine-system.jpg";
import geneticsBook from "@/public/genetics-and-cancer.jpg";
import dermatologyBook from "@/public/clinical-dermatology (1).jpg";
import mentalHealthBook from "@/public/mental-health-and-psychiatry.jpg";
import clinicalSkillsBook from "@/public/clinical-skills-and-examinations.jpg";
import cellBioBook from "@/public/cell-biology-and-biochemistry.jpg";
import obstetricsBook from "@/public/clinical-obstetrics.jpg";
import ActualPagesSlider from "./ActualPagesSlider";
import MbbsAnalytics from "./MbbsAnalytics";
import styles from "./mbbs-notes.module.css";

export const metadata: Metadata = {
  title: "Complete MBBS Notes — All 21 Subjects (3,826 Pages) | ₹199 Only",
  description:
    "Complete MBBS Notes covering All 21 Subjects (3,826 pages). Anatomy, Pharmacology, Pathology, OSCE, Medicine, Surgery & more. Instant PDF download on Email at ₹199.",
};

const exactSubjectSizes = [
  { name: "Nervous System", pages: 296 },
  { name: "Emergency Room Medicine", pages: 288 },
  { name: "Pharmacology & Toxicology", pages: 222 },
  { name: "Musculoskeletal System", pages: 210 },
  { name: "Gastrointestinal System", pages: 208 },
  { name: "Genetics & Cancer", pages: 206 },
  { name: "Preparing for OSCE Exams", pages: 203 },
  { name: "Cardiovascular System", pages: 199 },
  { name: "Public Health & Microbiology", pages: 198 },
  { name: "Clinical Investigations", pages: 195 },
  { name: "Respiratory System", pages: 190 },
  { name: "Clinical Dermatology", pages: 168 },
  { name: "Clinical Skills & Examinations", pages: 166 },
  { name: "Sexual & Reproductive Health", pages: 162 },
  { name: "Cell Biology & Biochemistry", pages: 150 },
  { name: "Immunology & Rheumatology", pages: 147 },
  { name: "Endocrine System", pages: 139 },
  { name: "Urinary & Renal System", pages: 131 },
  { name: "Clinical Obstetrics", pages: 121 },
  { name: "Mental Health & Psychiatry", pages: 120 },
  { name: "Clinical Haematology", pages: 107 },
];

const whatYouGetItems = [
  {
    icon: BookOpen,
    bg: "#eff6ff",
    color: "#2563eb",
    text: "21 subjects, 3,826 pages",
  },
  {
    icon: FileText,
    bg: "#f0fdf4",
    color: "#16a34a",
    text: "Typed notes, colour diagrams",
  },
  {
    icon: Smartphone,
    bg: "#fff1f2",
    color: "#be123c",
    text: "Opens on phone and laptop",
  },
  {
    icon: Printer,
    bg: "#fef9c3",
    color: "#b45309",
    text: "Print and highlight ready",
  },
  {
    icon: Download,
    bg: "#f0fdfa",
    color: "#0d9488",
    text: "Download starts in minutes",
  },
  {
    icon: Star,
    bg: "#faf5ff",
    color: "#7c3aed",
    text: "Lifetime access, no expiry",
  },
  {
    icon: PlusCircle,
    bg: "#fff7ed",
    color: "#ea580c",
    text: "One payment, no subscription",
  },
];

const bundleBooks = [
  {
    title: "Nervous System",
    pages: "296 pages",
    image: nervousBook,
  },
  {
    title: "Cardiovascular System",
    pages: "199 pages",
    image: cardioBook,
  },
  {
    title: "Respiratory System",
    pages: "190 pages",
    image: respBook,
  },
  {
    title: "Gastrointestinal System",
    pages: "208 pages",
    image: gastroBook,
  },
  {
    title: "Musculoskeletal System",
    pages: "210 pages",
    image: musculoBook,
  },
  {
    title: "Pharmacology & Toxicology",
    pages: "222 pages",
    image: pharmaBook,
  },
  {
    title: "Public Health & Microbiology",
    pages: "198 pages",
    image: publicHealthBook,
  },
  {
    title: "Sexual & Reproductive Health",
    pages: "162 pages",
    image: sexualHealthBook,
  },
  {
    title: "Clinical Investigations",
    pages: "195 pages",
    image: clinicalInvestBook,
  },
  {
    title: "Preparing for OSCE Exams",
    pages: "203 pages",
    image: osceBook,
  },
  {
    title: "Urinary & Renal System",
    pages: "131 pages",
    image: urinaryBook,
  },
  {
    title: "Emergency Room Medicine",
    pages: "288 pages",
    image: emergencyBook,
  },
  {
    title: "Clinical Haematology",
    pages: "107 pages",
    image: haematologyBook,
  },
  {
    title: "Immunology & Rheumatology",
    pages: "147 pages",
    image: immunologyBook,
  },
  {
    title: "Endocrine System",
    pages: "139 pages",
    image: endocrineBook,
  },
  {
    title: "Genetics & Cancer",
    pages: "206 pages",
    image: geneticsBook,
  },
  {
    title: "Clinical Dermatology",
    pages: "168 pages",
    image: dermatologyBook,
  },
  {
    title: "Mental Health & Psychiatry",
    pages: "120 pages",
    image: mentalHealthBook,
  },
  {
    title: "Clinical Skills & Examinations",
    pages: "166 pages",
    image: clinicalSkillsBook,
  },
  {
    title: "Cell Biology & Biochemistry",
    pages: "150 pages",
    image: cellBioBook,
  },
  {
    title: "Clinical Obstetrics",
    pages: "121 pages",
    image: obstetricsBook,
  },
];

const reviews = [
  {
    name: "Dr. Aarav Mehta",
    college: "AIIMS New Delhi (Intern)",
    image: "/scdr1.webp",
    text: "The cardiovascular, pharmacology and clinical OSCE notes saved me during my final year postings. Everything is condensed logically without losing high-yield depth.",
  },
  {
    name: "Sneha Kulkarni",
    college: "Grant Medical College, Mumbai",
    image: "/scdr2.webp",
    text: "Bulky textbooks are impossible to revise in the last 20 days. These notes gave me crisp revision charts, flowcharts and drug doses in one clean place. Must have for every medico!",
  },
  {
    name: "Rohan Nambiar",
    college: "KMC Manipal (3rd Prof)",
    image: "/scdr3.webp",
    text: "At ₹199, getting 21 organized subjects with 3,800+ pages is unbeatable value. Anatomy diagrams and surgery steps are illustrated very clearly.",
  },
];

const faqs = [
  {
    q: "Who are these notes for?",
    a: "MBBS students first. BDS, BSc Nursing and NEET-PG candidates use the same subjects, so the files work for them too. If you are not studying medicine, these will not help you.",
  },
  {
    q: "How do the files reach me?",
    a: "Instant download link is sent to your email immediately after payment, plus you get direct access on the confirmation screen. You can download and save all PDFs to your phone, tablet, or laptop.",
  },
  {
    q: "Are these printable?",
    a: "Yes. They are standard PDFs. Print a full subject or a single page, and highlight on paper or in any PDF app.",
  },
  {
    q: "Do I lose access later?",
    a: "No. One payment, files are yours, no renewal and no expiry date.",
  },
  {
    q: "Are these handwritten or typed?",
    a: "Typed and formatted, with colour diagrams and tables. Nothing is a scan of someone's handwriting.",
  },
  {
    q: "What if a file does not open?",
    a: "Message us on WhatsApp with your order number. We resend the file and stay on it until it opens on your device.",
  },
];

export default function MbbsNotesPage() {
  const checkoutUrl = "/mbbs-notes/checkout";

  return (
    <div className={styles.pageWrapper}>
      <MbbsAnalytics />
      <main className={styles.container}>
        {/* 1. Top Pill Badge (Exact match to user reference image) */}
        <div className={styles.topBadgeWrap}>
          <div className={styles.topBadge}>
            <span>📚</span>
            <span>
              <strong className={styles.badgeHighlight}>21 subjects</strong> · 3,826 pages
            </span>
          </div>
        </div>

        {/* 2. Headline & Subtitle (Exact structure from image) */}
        <header className={styles.heroHeader}>
          <h1 className={styles.mainTitle}>
            Complete MBBS Notes.<br />
            <span className={styles.mainTitleAccent}>All 21 Subjects.</span>
          </h1>
          <p className={styles.subTitle}>
            Anatomy, Pharmacology, Pathology, OSCE &amp; More - Everything you need to master your medical exams.
          </p>
        </header>

        {/* 3. Showcase Container Card with Book Fan Mockup (Exact layout) */}
        <section className={styles.showcaseCard}>
          <div className={styles.mockupWrapper}>
            <Image
              src={mbbsHeroCover}
              alt="Complete MBBS Notes 3D Mockup - All 21 Subjects with Cardiovascular System"
              className={styles.mockupImage}
              priority
              sizes="(max-width: 500px) 100vw, 460px"
            />
          </div>

          {/* Badge under mockup inside showcase card */}
          <div className={styles.includedBadge}>
            ALL 21 BOOKS INCLUDED
          </div>
        </section>

        {/* 4. Redesigned Premium Price & Offer Card */}
        <section className={styles.pricingCard}>
          <div className={styles.pricingBadgeRow}>
            <span className={styles.limitedOfferBadge}>🔥 SPECIAL MEDICO OFFER</span>
            <span className={styles.urgencyBadge}>
              <span className={styles.livePulseDot} /> 95% OFF Today
            </span>
          </div>

          <div className={styles.ratingBox}>
            <div className={styles.stars}>★★★★★</div>
            <div className={styles.ratingScore}>4.9/5</div>
            <div className={styles.ratingDivider} />
            <div className={styles.ratingCount}>2,800+ Medicos &amp; Interns</div>
          </div>

          <div className={styles.mainPriceBlock}>
            <div className={styles.priceLeft}>
              <div className={styles.priceLabel}>Limited Time Offer:</div>
              <div className={styles.priceFigures}>
                <span className={styles.priceCurrency}>₹</span>
                <span className={styles.priceValue}>199</span>
                <span className={styles.priceOriginal}>₹3,999</span>
              </div>
            </div>
            <div className={styles.saveBadge}>
              <span>SAVE</span>
              <strong>₹3,800</strong>
            </div>
          </div>


          {/* Primary CTA Button */}
          <Link href={checkoutUrl} className={styles.primaryCtaBtn}>
            <svg
              className={styles.downloadIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Get All 21 Subjects · ₹199</span>
          </Link>
          <div className={styles.ctaSubHint}>
            <span>🔒 256-Bit SSL Secured</span>
            <span>•</span>
            <span>⚡ Instant PDF Download</span>
          </div>
        </section>

        {/* 6. "What you get" Card Section */}
        <section className={styles.whatYouGetSection}>
          <h2 className={styles.whatYouGetTitle}>What you get</h2>
          <div className={styles.whatYouGetCard}>
            {whatYouGetItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={styles.whatYouGetItem}>
                  <div
                    className={styles.whatYouGetIconWrap}
                    style={{ backgroundColor: item.bg, color: item.color }}
                  >
                    <Icon size={21} strokeWidth={2.3} />
                  </div>
                  <span className={styles.whatYouGetText}>{item.text}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. "All 21 books in the bundle" 3-column Grid Section */}
        <section className={styles.bundleBooksSection}>
          <div className={styles.bundleBooksHeader}>
            <h2 className={styles.bundleBooksTitle}>All 21 books in the bundle</h2>
            <p className={styles.bundleBooksSub}>
              One file per subject. The page count on each is the real count.
            </p>
          </div>

          <div className={styles.bundleBooksGrid}>
            {bundleBooks.map((book, idx) => (
              <div key={idx} className={styles.bundleBookCard}>
                <Image
                  src={book.image}
                  alt={`${book.title} - ${book.pages}`}
                  className={styles.bundleBookImg}
                  width={240}
                  height={340}
                  sizes="(max-width: 500px) 31vw, 150px"
                />
              </div>
            ))}
          </div>
        </section>

        {/* 8. "See the actual pages" Carousel Section (Exact match to screenshot) */}
        <ActualPagesSlider />

        {/* 9. "Every subject, and its size" Section (Exact match to screenshots) */}
        <section className={styles.subjectSizesSection}>
          <div className={styles.subjectSizesHeader}>
            <h2 className={styles.subjectSizesTitle}>Every subject, and its size</h2>
            <p className={styles.subjectSizesSub}>
              Exact page count of each file. Nothing is padded.
            </p>
          </div>

          <div className={styles.subjectSizesCard}>
            {exactSubjectSizes.map((item, idx) => (
              <div key={idx} className={styles.subjectSizeRow}>
                <span className={styles.subjectSizeName}>{item.name}</span>
                <span className={styles.subjectSizeCount}>{item.pages}</span>
              </div>
            ))}
            <div className={styles.subjectSizesFooter}>
              <span className={styles.subjectSizesTotalLabel}>21 subjects</span>
              <span className={styles.subjectSizesTotalCount}>3,826 pages</span>
            </div>
          </div>
        </section>

        {/* 10. "Why ₹199" Comparison Card Section (Exact match to screenshot) */}
        <section className={styles.whyPriceSection}>
          <h2 className={styles.whyPriceTitle}>Why ₹199</h2>
          <div className={styles.whyPriceCard}>
            <div className={styles.whyPriceRow}>
              <span className={styles.whyPriceLabel}>
                Buying one subject at a time, 21 times
              </span>
              <span className={styles.whyPriceOld}>₹4,179</span>
            </div>
            <div className={styles.whyPriceRow}>
              <span className={styles.whyPriceLabel}>
                A single printed reference book
              </span>
              <span className={styles.whyPriceOld}>₹800</span>
            </div>
            <div className={styles.whyPriceHighlightRow}>
              <span className={styles.whyPriceHighlightLabel}>
                All 21 subjects here, one payment
              </span>
              <span className={styles.whyPriceActiveVal}>₹199</span>
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <div style={{ marginTop: "14px" }}>
          <Link href={checkoutUrl} className={styles.primaryCtaBtn}>
            <svg
              className={styles.downloadIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download All 21 Books — ₹199</span>
          </Link>
        </div>

        {/* 9. Verified Reviews */}
        <section className={styles.reviewsSection}>
          <h2 className={styles.reviewsTitle}>From Medical Students &amp; Interns</h2>
          <div className={styles.reviewsList}>
            {reviews.map((rev, idx) => (
              <div key={idx} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewUserGroup}>
                    <div className={styles.avatarWrap}>
                      <Image
                        src={rev.image}
                        alt={rev.name}
                        width={42}
                        height={42}
                        className={styles.avatarImg}
                      />
                    </div>
                    <div className={styles.reviewerInfo}>
                      <div className={styles.reviewerName}>{rev.name}</div>
                      <div className={styles.reviewerCollege}>{rev.college}</div>
                    </div>
                  </div>
                  <div className={styles.reviewRatingGroup}>
                    <div className={styles.reviewStars}>★★★★★</div>
                    <span className={styles.reviewVerifiedBadge}>✓ Verified</span>
                  </div>
                </div>
                <p className={styles.reviewComment}>&ldquo;{rev.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>

        {/* Before you buy (FAQ Section) matching user screenshot */}
        <section className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Before you buy</h2>
          <div className={styles.faqCard}>
            {faqs.map((faq, idx) => (
              <details key={idx} className={styles.faqItem} open={idx === 0}>
                <summary className={styles.faqSummary}>
                  <span className={styles.faqQuestion}>{faq.q}</span>
                  <span className={styles.faqToggleIcon} />
                </summary>
                <div className={styles.faqAnswerWrap}>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 11. "You will not be left stuck" Guarantee Box */}
        <section className={styles.supportGuaranteeCard}>
          <div className={styles.supportIconWrap}>
            <ShieldCheck size={36} strokeWidth={2.4} className={styles.supportShieldIcon} />
          </div>
          <div className={styles.supportContent}>
            <h3 className={styles.supportTitle}>You will not be left stuck</h3>
            <p className={styles.supportText}>
              If an email does not arrive, or a file will not open on your device, message us on WhatsApp with your order number. We get it working for you the same day.
            </p>
          </div>
        </section>

        {/* 12. "How it works" 3-Step Section */}
        <section className={styles.howItWorksSection}>
          <h2 className={styles.howItWorksTitle}>How it works</h2>
          <div className={styles.howItWorksGrid}>
            <div className={styles.howItWorksCard}>
              <div className={styles.stepNumberBadge}>1</div>
              <span className={styles.stepLabel}>Pay ₹199</span>
            </div>
            <div className={styles.howItWorksCard}>
              <div className={styles.stepNumberBadge}>2</div>
              <span className={styles.stepLabel}>Check your email</span>
            </div>
            <div className={styles.howItWorksCard}>
              <div className={styles.stepNumberBadge}>3</div>
              <span className={styles.stepLabel}>Download all 21</span>
            </div>
          </div>

          <p className={styles.howItWorksSubtext}>
            One-time payment. No subscription, no auto-charge.
          </p>

          <div className={styles.referenceFooterLinks}>
            <Link href="/mbbs-notes/terms" className={styles.refFooterLink}>Terms</Link>
            <span className={styles.refFooterDot}>·</span>
            <Link href="/mbbs-notes/privacy-policy" className={styles.refFooterLink}>Privacy</Link>
            <span className={styles.refFooterDot}>·</span>
            <Link href="/mbbs-notes/refund-policy" className={styles.refFooterLink}>Refunds</Link>
            <span className={styles.refFooterDot}>·</span>
            <span className={styles.refHelpPrefix}>Help? </span>
            <a
              href="https://wa.me/919104826422?text=Hi%20NokriMitra%20Support,%20I%20need%20help%20with%20my%20MBBS%20Notes%20Order"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.refFooterLink}
            >
              <span className={styles.refWhatsAppBold}>WhatsApp</span>
            </a>
          </div>
        </section>

        {/* 12. Persistent Sticky Bottom Bar (Exact match to reference image CTA) */}
        <div className={styles.stickyBottomBar}>
          <Link href={checkoutUrl} className={styles.stickyCtaBtn}>
            <svg
              className={styles.downloadIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Get All 21 Subjects · ₹199</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
