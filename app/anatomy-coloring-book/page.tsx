import type { Metadata } from "next";
import Image from "next/image";
import { Montserrat, Poppins } from "next/font/google";
import {
  ArrowRight,
  BookOpenText,
  Check,
  CheckCircle2,
  Download,
  FileText,
  Infinity as InfinityIcon,
  Palette,
  Star,
} from "lucide-react";

import anatomyHero from "@/public/anatomy-coloring.webp";
import trustBadges from "@/public/trust.webp";
import OfferTimer from "../opd-mastery/OfferTimer";
import FaqAccordion from "../opd-mastery/FaqAccordion";
import AnatomyAnalytics from "./AnatomyAnalytics";
import styles from "../opd-mastery-ebook/opd-mastery-ebook.module.css";
import sample from "./sample.module.css";

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

const PRICE = 149;
const OLD_PRICE = 299;
const SAVE_PERCENT = Math.round((1 - PRICE / OLD_PRICE) * 100);
const CHECKOUT = "/anatomy-coloring-book/checkout";
const CONTACT_URL =
  "mailto:goexam777@gmail.com?subject=Anatomy%20Coloring%20Book%20support";
const WHATSAPP_URL =
  "https://wa.me/919104826422?text=Hello!%20I%20have%20a%20question%20regarding%20the%20Human%20Anatomy%20Coloring%20Book%20Bundle.";

export const metadata: Metadata = {
  title: "500+ Human Anatomy Coloring Book Bundle | Anatomy Study Guide PDF",
  description:
    "500+ page Human Anatomy Coloring Book Bundle covering every major body system with MCQ practice. Digital PDF bundle for nursing, medical and paramedical students.",
};

const included = [
  {
    no: "1",
    title: "Human Body Overview",
    detail: "Basic structure and organization of the human body.",
  },
  {
    no: "2",
    title: "Muscular System",
    detail: "Muscles and their arrangement through coloring activities.",
  },
  {
    no: "3",
    title: "Nervous System",
    detail: "Brain, spinal cord, nerves and major structures.",
  },
  {
    no: "4",
    title: "Skeletal System",
    detail: "Bones, joints and the framework of the body.",
  },
  {
    no: "5",
    title: "Circulatory System",
    detail: "Heart, blood vessels and circulation.",
  },
  {
    no: "6",
    title: "Digestive System",
    detail: "Major digestive organs and their functions.",
  },
  {
    no: "7",
    title: "Reproductive System",
    detail: "Major male and female reproductive structures.",
  },
  {
    no: "8",
    title: "Respiratory System",
    detail: "Lungs, airways and the process of breathing.",
  },
  {
    no: "9",
    title: "Endocrine System",
    detail: "Important endocrine glands and their structures.",
  },
  {
    no: "10",
    title: "Lymphatic & Immune System",
    detail: "Lymphatic organs and immune-related structures.",
  },
  {
    no: "11",
    title: "Integumentary System",
    detail: "Skin, hair, nails and related structures.",
  },
  {
    no: "12",
    title: "Multiple Choice Questions",
    detail: "Practice MCQs and revision questions.",
  },
];

const whyLove = [
  "Explore anatomy through visual learning",
  "Color and review important anatomical structures",
  "Revise major body systems in one organized collection",
  "Practice anatomy-related multiple-choice questions",
  "Useful for study sessions, revision and self-learning",
  "Digital PDF format for convenient access",
];

const whoFor = [
  ["👩‍⚕️", "Nursing Students"],
  ["👨‍⚕️", "Medical Students"],
  ["🩺", "Paramedical Students"],
  ["🏥", "Allied Health Students"],
  ["🧠", "Anatomy Learners"],
  ["📚", "Healthcare Education Enthusiasts"],
  ["📝", "Students Preparing for Anatomy Revision"],
];

const readerReviews = [
  {
    initial: "N",
    role: "Nursing Student",
    quote:
      "Colouring each system helped me remember anatomy much faster than plain reading. The diagrams are very clear and well labelled.",
  },
  {
    initial: "M",
    role: "MBBS Student",
    quote:
      "All body systems in one place with clean diagrams. Perfect for quick revision before my practicals and viva.",
  },
  {
    initial: "P",
    role: "Paramedical Student",
    quote:
      "The MCQs at the end let me test myself. Great value and super easy to print the pages I need.",
  },
];

const samplePages = [
  "/anatomy-sample-1.jpg",
  "/anatomy-sample-2.jpg",
  "/anatomy-sample-3.jpg",
  "/anatomy-sample-4.jpg",
  "/anatomy-sample-5.jpg",
  "/anatomy-sample-6.jpg",
  "/anatomy-sample-7.jpg",
];

const faqs = [
  {
    emoji: "🎁",
    q: "What is included in this bundle?",
    a: "The bundle includes anatomy coloring resources covering major body systems, a human body overview, and multiple-choice questions.",
  },
  {
    emoji: "📚",
    q: "How many pages are included?",
    a: "The bundle contains 500+ pages, as specified in the product offering.",
  },
  {
    emoji: "📦",
    q: "Is this a physical book?",
    a: "No. This is a digital PDF bundle. No physical book will be shipped.",
  },
  {
    emoji: "👩‍⚕️",
    q: "Who can use this bundle?",
    a: "It is suitable for nursing students, medical students, paramedical students, and anyone interested in learning human anatomy.",
  },
  {
    emoji: "🖨️",
    q: "Can I print the pages?",
    a: "Yes. You can print suitable pages for personal study and coloring, subject to your device and printer settings.",
  },
  {
    emoji: "📖",
    q: "Will this replace my anatomy textbook?",
    a: "No. This bundle is a supplementary visual learning and revision resource. It should be used alongside your regular textbooks and study materials.",
  },
  {
    emoji: "📫",
    q: "How will I receive the bundle?",
    a: "You will receive digital PDF access after completing your purchase, according to the delivery method provided on the checkout page.",
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function AnatomyColoringBookPage() {
  return (
    <main
      className={`${styles.page} ${montserrat.variable} ${poppins.variable}`}
    >
      <AnatomyAnalytics />

      <section className={styles.simpleHero}>
        <div className={styles.simpleContainer}>
          <span className={styles.heroBadge}>
            500+ Human Anatomy Coloring Book Bundle
          </span>

          <h1 className={styles.simpleTitle}>
            Learn Anatomy. Color It.
            <span className={styles.simpleTitleBlue}>Remember It.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Make Human Anatomy Easier, More Visual &amp; More Engaging!
          </p>

          <div className={styles.simpleImageWrap}>
            <Image
              src={anatomyHero}
              alt="500+ Human Anatomy Coloring Book Bundle"
              className={styles.simpleImage}
              priority
              sizes="(max-width: 599px) 92vw, 560px"
            />
          </div>

          <p className={styles.simpleLead}>
            Explore the human body, understand major body systems, and revise
            important anatomy concepts with our comprehensive 500+ page Human
            Anatomy Coloring Book Bundle. Perfect for nursing students, medical
            students, healthcare learners, and anyone who wants to study anatomy
            in a simple, visual way.
          </p>

          <div className={styles.heroPerks}>
            <div className={styles.heroPerk}>
              <span className={styles.heroPerkIcon} aria-hidden="true">
                📚
              </span>
              <strong>500+ Pages</strong>
            </div>
            <div className={styles.heroPerk}>
              <span className={styles.heroPerkIcon} aria-hidden="true">
                🧠
              </span>
              <strong>Multiple Body Systems</strong>
            </div>
            <div className={styles.heroPerk}>
              <span className={styles.heroPerkIcon} aria-hidden="true">
                📄
              </span>
              <strong>Digital PDF Bundle</strong>
            </div>
          </div>

          <a className={styles.heroCtaNew} href={CHECKOUT}>
            <span>Click Here to Get Access</span>
            <ArrowRight size={20} strokeWidth={2.5} />
          </a>
        </div>
      </section>

      <section className={styles.wiSection} id="inside">
        <div className={styles.wiContainer}>
          <div className={styles.wiHeader}>
            <span className={styles.wiBadge}>
              <BookOpenText size={15} /> Complete Anatomy Collection
            </span>
            <h2 className={styles.wiTitle}>
              <span aria-hidden="true">🎁</span> What&apos;s Included In This
              Bundle?
            </h2>
            <p className={styles.wiSubtitle}>
              A complete collection of anatomy coloring and study resources
              covering the major systems of the human body
            </p>
          </div>

          <div className={styles.accessGrid}>
            {included.map((item) => (
              <article key={item.title}>
                <span aria-hidden="true">{item.no}</span>
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.formatSection}
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className={styles.formatContainer}>
          <h2 className={styles.formatTitle}>Why You&apos;ll Love It</h2>
          <div
            className={styles.formatBox}
            style={{ backgroundColor: "#ffffff" }}
          >
            {whyLove.map((item) => (
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
            <span aria-hidden="true">👩‍⚕️</span> Who Is This Bundle For?
          </h2>
          <div className={styles.pfPillsWrap}>
            {whoFor.map(([emoji, text]) => (
              <div key={text} className={styles.pfPill}>
                <span className={styles.pfEmoji} aria-hidden="true">
                  {emoji}
                </span>
                <span className={styles.pfText}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.readersSection}>
        <div className={styles.readersContainer}>
          <div className={styles.readersHeader}>
            <h2 className={styles.readersTitle}>What Our Readers Say</h2>
            <p className={styles.readersSubtitle}>
              Trusted by Nursing, MBBS &amp; Paramedical Students
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
                  <div className={styles.readerAvatar}>{rev.initial}</div>
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

      <section className={sample.sampleSection} id="samples">
        <div className={sample.sampleContainer}>
          <div className={sample.sampleHeader}>
            <span className={sample.sampleBadge}>
              <FileText size={15} /> Sample Pages
            </span>
            <h2 className={sample.sampleTitle}>
              Take A Look <span>Inside The Bundle</span>
            </h2>
            <p className={sample.sampleSubtitle}>
              A quick preview of the anatomy coloring &amp; study pages you will
              get inside the bundle.
            </p>
          </div>

          <div className={sample.sampleTrack}>
            {samplePages.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={`Anatomy coloring book sample page ${i + 1}`}
                className={sample.sampleImg}
                loading="lazy"
              />
            ))}
          </div>

          <p className={sample.sampleHint}>← Swipe to see more sample pages →</p>
        </div>
      </section>

      <section className={styles.todayOfferSection}>
        <div className={styles.simpleContainer}>
          <div className={styles.todayOfferBox}>
            <p className={styles.actualPriceRow}>
              Regular Price ={" "}
              <span className={styles.strikePrice}>Rs.{OLD_PRICE}/-</span>
            </p>
            <h2 className={styles.todayOfferTitle}>Special Price =</h2>
            <p className={styles.offerPriceRow}>Rs.{PRICE}/-</p>

            <a className={styles.simpleCta} href={CHECKOUT}>
              <CheckCircle2 size={22} /> Get Your Anatomy Bundle Now
            </a>

            <OfferTimer
              variant="boxes"
              durationMinutes={30}
              className={styles.boxesTimerWrap}
            />
          </div>
        </div>
      </section>

      <section className={styles.faqSectionNew} id="faq">
        <div className={styles.faqContainerNew}>
          <div className={styles.faqHeaderNew}>
            <h2 className={styles.faqTitleNew}>
              Frequently Asked Questions
            </h2>
            <p className={styles.faqSubtitleNew}>
              Everything you need to know before getting the Human Anatomy
              Coloring Book Bundle.
            </p>
          </div>

          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <section className={styles.pricingSection} id="pricing">
        <div className={styles.container}>
          <div className={styles.priceCard}>
            <span className={styles.priceBadge}>🔥 LIMITED TIME</span>

            <h2>Learn Anatomy In A More Visual Way!</h2>

            <p className={styles.priceRow}>
              <span className={styles.priceValue}>₹{PRICE}</span>
              <s className={styles.priceOld}>₹{OLD_PRICE}</s>
            </p>

            <p className={styles.priceHighlight}>
              You save {SAVE_PERCENT}% • 500+ pages of anatomy learning &amp;
              coloring resources
            </p>

            <OfferTimer className={styles.priceTimer} />

            <p className={styles.priceTag}>
              One digital bundle • Instant access • Study at your convenience
            </p>

            <a className={styles.priceCta} href={CHECKOUT}>
              <Download size={20} /> GET YOUR ANATOMY BUNDLE NOW – ₹{PRICE}
            </a>

            <div className={styles.priceMeta}>
              <span>
                <Check size={15} /> Instant Digital Access
              </span>
              <span>
                <InfinityIcon size={15} /> Study Anytime
              </span>
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
            <Palette size={17} /> Anatomy Coloring Book
          </span>
          <p className={styles.footerTagline}>
            500+ Human Anatomy Coloring Book Bundle · Digital PDF
          </p>

          <nav
            className={styles.footerNav}
            aria-label="Anatomy Coloring Book legal links"
          >
            <a href="/anatomy-coloring-book/privacy-policy">Privacy Policy</a>
            <a href="/anatomy-coloring-book/refund-policy">Refund Policy</a>
            <a href={CONTACT_URL}>Contact</a>
          </nav>

          <div className={styles.footerNotes}>
            <p>
              This bundle is a supplementary visual learning and revision
              resource for education and self-study only. It should be used
              alongside your regular textbooks and study materials.
            </p>
            <p>
              This site is not part of Facebook or Meta Platforms, Inc., and is
              not endorsed by Meta. FACEBOOK and INSTAGRAM are trademarks of
              Meta Platforms, Inc.
            </p>
          </div>

          <p className={styles.footerCopy}>
            © {new Date().getFullYear()} Anatomy Coloring Book. All rights
            reserved.
          </p>
        </div>
      </footer>

      <div className={styles.mobileBar}>
        <a href={CHECKOUT}>
          <Download size={19} />
          <span>GET YOUR BUNDLE NOW!</span>
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
