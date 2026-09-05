import type { Metadata } from "next";
import Image from "next/image";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import {
  Check,
  CheckCircle2,
  Download,
  BookOpen,
  Sparkles,
  ShieldCheck,
  FileText,
  Zap,
  ArrowRight,
} from "lucide-react";

import productCover from "@/public/31pdfs.jpg";
import trustBadges from "@/public/trust.webp";
import MedicalSampleGallery from "./MedicalSampleGallery";
import MedicalFaq from "./MedicalFaq";
import MedicalAnalytics from "./MedicalAnalytics";
import styles from "./medical-master-pdfs.module.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
  variable: "--font-title",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "31 Medical Master PDFs Bundle | Instant Download - ₹149 Only",
  description:
    "Get 20 High-Yield Medical PDFs + 11 FREE Medical Master PDFs. Complete collection for Medical, Nursing, Pharmacy & Healthcare professionals. ₹2,199 value for just ₹149.",
};

const features = [
  {
    title: "20 Core Medical PDFs",
    detail: "Clinical, Anatomy, Pharma & Diagnostics",
  },
  {
    title: "11 FREE Bonus PDFs",
    detail: "Quick-revision charts & drug dose guides",
  },
  {
    title: "For Healthcare Pros",
    detail: "MBBS, Nursing, Pharmacy & Exam Aspirants",
  },
  {
    title: "Instant Access",
    detail: "Lifetime download on phone & laptop",
  },
  {
    title: "Easy To Read & Print",
    detail: "Crystal-clear HD PDF format",
  },
];

const comboList = [
  "सामान्य रोगों की सम्पूर्ण जानकारी",
  "महिलाओं की बीमारियों की जानकारी",
  "एलोपैथिक दवाओं की जानकारी",
  "त्वचा रोगों की जानकारी",
  "लीवर और पेट की बीमारियों की जानकारी",
  "Lab Test Report Guide",
  "ECG Report Guide",
  "Pharmacology Notes",
  "Emergency Medicine Handbook",
  "Medical Calculation & Drug Dose",
  "Anatomy Quick Revision Notes",
  "बच्चों की बीमारियों की जानकारी",
  "आयुर्वेदिक दवाओं की गाइड",
  "होम्योपैथिक दवाओं की गाइड",
  "और अन्य उपयोगी Medical PDFs (+ 11 FREE Bonus)",
];

const audienceList = [
  "Nursing Students",
  "Pharmacy Students",
  "Medical Students",
  "BAMS Students",
  "BHMS Students",
  "Healthcare Professionals",
  "Lab Technicians",
  "Competitive Exam Aspirants",
];

const reviewsList = [
  {
    name: "Dr. Rajesh Sharma",
    role: "MBBS, MD - General Medicine",
    rating: "5/5 stars",
    comment:
      "“This e-book is a fantastic quick reference guide for both medical professionals and interns. The information provided is extremely accurate and practical. Every medical should have this.”",
    badge: "VERIFIED DOCTOR",
  },
  {
    name: "Rahul Singh",
    role: "MBBS Student",
    rating: "5/5 stars",
    comment:
      "“20 मेडिकल मास्टर पीडीएफ कॉम्बो के साथ 11 पीडीएफ और फ्री मिलीं, जिसमें एकदम काम की और पूरी जानकारी है। एक स्टूडेंट के तौर पर मेरे लिए यह बहुत ही बढ़िया और यूज़फुल है! 👍”",
  },
  {
    name: "Sanha joshi",
    role: "",
    rating: "5/5 stars",
    comment:
      "“मैंने 20 मेडिकल मास्टर पीडीएफ कॉम्बो लिया था, जिसके साथ 11 पीडीएफ बिल्कुल फ्री मिल गईं। इसमें इतनी काम की और पूरी जानकारी है कि एक स्टूडेंट के रूप में पढ़ाई में बहुत मदद मिल रही है। सच में सच में बहुत ही बेहतरीन और यूज़फुल कॉम्बो है! 💯📚”",
  },
  {
    name: "Dr. Vikram Patel",
    role: "",
    rating: "5/5 stars",
    comment:
      "“Looking at the quality of the content, it doesn’t feel like a free e-book at all. The way medical concepts have been summarized here is truly commendable. Highly Recommended! 🌟”",
  },
  {
    name: "Anjali Gupta",
    role: "Medical Student",
    rating: "5/5 stars",
    comment:
      "“Received the 20 medical master PDF combo plus 11 additional PDFs for free. Every piece of information is clear and precise. Perfect material for students! 🌟”",
  },
];

const whatYouGetList = [
  { icon: "📄", text: "PDF Format" },
  { icon: "♾️", text: "Lifetime Access" },
  { icon: "📱", text: "Mobile Friendly" },
  { icon: "💻", text: "Laptop Friendly" },
  { icon: "⚡", text: "Instant Access" },
  { icon: "🔒", text: "Secure Download" },
];

const whyBuyList = [
  "एक ही Collection में Medical Knowledge",
  "Study, Revision और Practice के लिए उपयोगी",
  "Easy Language में समझने योग्य जानकारी",
  "Anytime, Anywhere Access",
  "Time और Money दोनों की बचत",
];

export default function MedicalMasterPdfsPage() {
  return (
    <main
      className={`medical-master-page-root ${styles.page} ${montserrat.variable} ${plusJakarta.variable}`}
      lang="hi"
    >
      <MedicalAnalytics />

      {/* 1. TOPBAR - Urgency Notice */}
      <div className={styles.offerBar}>
        🔥 Special Limited-Time Offer &ndash; Flat 92% OFF Today! 🔥
      </div>

      {/* 2. SUB-BAR - High Impact Highlight */}
      <div className={styles.subBar}>
        📚 20 Medical PDFs + 11 FREE Medical Master PDFs &bull; Instant Access &bull;{" "}
        <span className={styles.subBarHighlight}>Today Only ₹149/-</span>
      </div>

      {/* 3. HERO SECTION */}
      <section className={styles.hero} aria-labelledby="medical-hero-title">
        <div className={styles.heroInner}>
          {/* LEFT SIDE: Visual Mockup / Product Image */}
          <div className={styles.visual}>
            <Image
              src={productCover}
              alt="31 Medical Master PDFs Bundle - 20 + 11 Free Combo Pack"
              className={styles.productImage}
              priority
              sizes="(max-width: 899px) 92vw, 480px"
            />
          </div>

          {/* RIGHT SIDE: Hero Content */}
          <div className={styles.content}>
            {/* Rating Pill */}
            <div className={styles.rating}>
              <span className={styles.stars} aria-hidden="true">
                ★★★★★
              </span>
              <b>Excellent 4.9</b> | 12,450+ Medical & Nursing Students
            </div>

            {/* Main Headline */}
            <h1 id="medical-hero-title">
              <span className={styles.titleLine1}>31 Medical Master PDFs Bundle</span>
              <span className={styles.titleLine2}>
                Complete Clinical &amp; Study Pack
              </span>
            </h1>

            {/* Subhead with targeted audience */}
            <p className={styles.subhead}>
              🔥 <b>Medical Students, Nursing, Pharmacy &amp; Healthcare Professionals</b> Ke
              Liye Complete High-Yield Study &amp; Practice Collection
            </p>

            {/* Bullet Points with Checkmarks */}
            <ul className={styles.features}>
              {features.map((item) => (
                <li key={item.title}>
                  <span className={styles.check} aria-hidden="true">
                    <Check size={14} strokeWidth={3.5} />
                  </span>
                  <span>
                    <b>{item.title}</b> &ndash; {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. CENTERED OFFER & BUY SECTION (Below Hero) */}
      <section className={styles.offerSection} aria-label="Special Download Offer">
        <div className={styles.offerInner}>
          <h2 className={styles.offerHeadline}>
            ONLY ₹149/- TODAY Delivered Instantly. Start Reading Right Now!
          </h2>

          <a
            className={styles.buyBtn}
            href="/medical-master-pdfs/checkout"
            id="center-download-btn"
          >
            <span className={styles.buyIcon} aria-hidden="true">
              <Download size={22} strokeWidth={2.8} />
            </span>
            <span className={styles.buyText}>
              GET 31 MEDICAL MASTER PDFs NOW <b>₹149</b> <s>₹2,199</s>
            </span>
          </a>

          <p className={styles.buyNote}>
            ⚡ &quot;FOR FIRST 100 PEOPLE ONLY &bull; INSTANT SAVE ₹2,050&quot;
          </p>

          <div className={styles.trustWrap}>
            <Image
              src={trustBadges}
              alt="Secured payment via Paytm, UPI, BHIM, PhonePe, GPay, Visa, Mastercard, Maestro, RuPay"
              className={styles.trustImage}
              sizes="(max-width: 767px) 92vw, 480px"
            />
            <div className={styles.guaranteeText}>
              <ShieldCheck size={16} color="#16a34a" />
              <span>100% Safe &amp; Encrypted Payment &bull; Instant Access Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMBO PACK SIMPLE CHECKLIST SECTION */}
      <section className={styles.comboSection} aria-labelledby="combo-pack-title">
        <div className={styles.comboCardContainer}>
          <h2 id="combo-pack-title" className={styles.comboHeading}>
            📦 Combo Pack Mein Kya Milega?
          </h2>

          <ul className={styles.simpleList}>
            {comboList.map((item, idx) => (
              <li key={idx}>
                <span className={styles.simpleCheck} aria-hidden="true">
                  <Check size={16} strokeWidth={3.8} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. WHO IS THIS COMBO FOR SECTION */}
      <section className={styles.audienceSection} aria-labelledby="audience-title">
        <div className={styles.audienceCardContainer}>
          <h2 id="audience-title" className={styles.audienceHeading}>
            🎯 यह Combo किनके लिए है?
          </h2>

          <ul className={styles.audienceList}>
            {audienceList.map((item, idx) => (
              <li key={idx}>
                <span className={styles.audienceBullet} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. SAMPLES PREVIEW CAROUSEL SECTION */}
      <MedicalSampleGallery />

      {/* 8. CUSTOMER REVIEWS SECTION */}
      <section className={styles.reviewsSection} aria-labelledby="reviews-title">
        <div className={styles.reviewsCardContainer}>
          <h2 id="reviews-title" className={styles.reviewsHeading}>
            ⭐ Customer Reviews
          </h2>

          <div className={styles.reviewsList}>
            {reviewsList.map((rev, idx) => (
              <div key={idx} className={styles.reviewItem}>
                <div className={styles.reviewAuthor}>
                  <b>{rev.name}</b>
                  {rev.role && <span>({rev.role})</span>}
                </div>

                <div className={styles.reviewStarsWrap}>
                  <span className={styles.reviewStars} aria-hidden="true">
                    ★★★★★
                  </span>
                  <span className={styles.reviewRatingText}>({rev.rating})</span>
                </div>

                <p className={styles.reviewComment}>{rev.comment}</p>

                {rev.badge && (
                  <div className={styles.verifiedBadge}>
                    <CheckCircle2 size={15} color="#2563eb" />
                    <span>{rev.badge}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. WHAT YOU GET & WHY BUY SECTION */}
      <section className={styles.benefitsSection} aria-label="Benefits and Features">
        <div className={styles.benefitsContainer}>
          {/* Part 1: आपको क्या मिलेगा? */}
          <div className={styles.benefitBlock}>
            <h2 className={styles.benefitHeading}>
              ✅ आपको क्या मिलेगा?
            </h2>
            <ul className={styles.whatYouGetList}>
              {whatYouGetList.map((item, idx) => (
                <li key={idx}>
                  <span className={styles.whatYouGetIcon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Part 2: क्यों खरीदें? */}
          <div className={styles.benefitBlock}>
            <h2 className={styles.benefitHeading}>
              ⭐ क्यों खरीदें?
            </h2>
            <ul className={styles.whyBuyList}>
              {whyBuyList.map((item, idx) => (
                <li key={idx}>
                  <span className={styles.whyBuyCheck} aria-hidden="true">
                    <Check size={16} strokeWidth={3.8} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 10. FINAL HIGH-CONVERTING BOTTOM CTA SECTION */}
      <section className={styles.finalCtaSection} aria-label="Final Download Offer">
        <div className={styles.finalCtaContainer}>
          {/* Mini Mockup Visual */}
          <div className={styles.finalVisual}>
            <Image
              src={productCover}
              alt="31 Medical Master PDFs Bundle - Complete Clinical & Study Pack"
              className={styles.finalProductImage}
              sizes="(max-width: 767px) 240px, 280px"
            />
          </div>

          <div className={styles.finalCtaHeader}>
            <span className={styles.finalCtaTag}>🔥 LIMITED TIME SPECIAL OFFER &bull; FLAT 92% OFF</span>
            <h2 className={styles.finalCtaTitle}>
              Get 31 Medical Master PDFs Bundle
            </h2>
            <p className={styles.finalCtaSubtitle}>
              20 Core Medical Master PDFs + 11 FREE Bonus Books
            </p>
          </div>

          {/* Quick Feature Pills */}
          <div className={styles.finalPills}>
            <span className={styles.finalPillItem}>📄 Instant PDF Format</span>
            <span className={styles.finalPillItem}>♾️ Lifetime Access</span>
            <span className={styles.finalPillItem}>📱 Mobile &amp; Laptop</span>
            <span className={styles.finalPillItem}>🔒 100% Secure Download</span>
          </div>

          {/* Price Box */}
          <div className={styles.finalPriceBox}>
            <span className={styles.finalOldPrice}>Total Value: <s>₹2,199</s></span>
            <span className={styles.finalCurrentPrice}>Today Only ₹149</span>
            <span className={styles.finalSaveBadge}>Instant Save ₹2,050</span>
          </div>

          {/* Animated Sweeping Buy Button */}
          <a
            className={styles.buyBtn}
            href="/medical-master-pdfs/checkout"
            id="final-download-btn"
          >
            <span className={styles.buyIcon} aria-hidden="true">
              <Download size={22} strokeWidth={2.8} />
            </span>
            <span className={styles.buyText}>
              GET 31 MEDICAL MASTER PDFs NOW <b>₹149</b> <s>₹2,199</s>
            </span>
          </a>

          {/* Trust Badges */}
          <div className={styles.trustWrap}>
            <Image
              src={trustBadges}
              alt="Secured payment via Paytm, UPI, BHIM, PhonePe, GPay, Visa, Mastercard, Maestro, RuPay"
              className={styles.trustImage}
              sizes="(max-width: 767px) 92vw, 480px"
            />
          </div>
        </div>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS (FAQs) & CONTACT */}
      <MedicalFaq />

      {/* 12. FOOTER */}
      <footer className={styles.siteFooter}>
        <div className={styles.footerInner}>
          <p className={styles.footerBrand}>31 Medical Master PDFs Bundle</p>
          <p className={styles.footerContact}>
            Support &amp; Queries:{" "}
            <a href="mailto:support@nokrimitra.in" className={styles.footerEmail}>
              support@nokrimitra.in
            </a>
          </p>
          <p className={styles.footerCopy}>
            &copy; {new Date().getFullYear()} NokriMitra. All rights reserved.
          </p>
        </div>
      </footer>

      {/* 12. MOBILE STICKY BOTTOM BAR */}
      <div className={styles.mobileBar}>
        <div className={styles.mobileBarLeft}>
          <span className={styles.mobileBarSave}>SAVE 92%</span>
          <span className={styles.mobileBarPriceRow}>
            <b>₹149</b>
            <s>₹2,199</s>
          </span>
        </div>
        <a className={styles.mobileBarBtn} href="/medical-master-pdfs/checkout">
          <span className={styles.mobileBarBtnText}>DOWNLOAD NOW</span>
          <ArrowRight size={18} strokeWidth={2.8} />
        </a>
      </div>
    </main>
  );
}
