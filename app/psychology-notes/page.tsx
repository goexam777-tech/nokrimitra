import type { Metadata } from "next";
import Image from "next/image";
import clinicalCover from "@/public/clinical1.webp";
import styles from "./psy.module.css";
import PsyFooter from "./PsyFooter";
import CountdownBar from "./CountdownBar";

export const metadata: Metadata = {
  title: "Psychology Notes PDF — Basic to Advance | NokriMitra",
  description:
    "Complete Psychology Notes PDF (Basic to Advance) with easy notes, visual diagrams and 17+ topics — from Science of Psychology to Personality & Disorders. Instant download after purchase. Limited-time 90% OFF at just ₹149.",
  keywords: [
    "Psychology Notes",
    "Psychology PDF",
    "Psychology study material",
    "Basic to Advance Psychology",
    "Psychology notes for students",
    "NokriMitra",
  ],
  alternates: { canonical: "/psychology-notes" },
  openGraph: {
    title: "Psychology Notes PDF — Basic to Advance | NokriMitra",
    description:
      "Complete Psychology Notes (Basic to Advance) with easy notes & diagrams. Instant download. Limited-time 90% OFF — only ₹149.",
    url: "/psychology-notes",
    type: "website",
    images: [{ url: "/clinical1.webp" }],
  },
};

function Check() {
  return (
    <span className={styles.tick} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

const included = [
  "Complete Psychology — Basic to Advance",
  "Important theories, key points & definitions",
  "Exam-oriented, easy-to-revise notes",
  "Instant download & lifetime access",
];

const SUPPORT_EMAIL = "goexam777@gmail.com";

const faqs = [
  {
    q: "What if I enter the wrong email ID or do not get access after payment?",
    a: `Relax! Simply mail us at ${SUPPORT_EMAIL} with your transaction ID, and we will resend your access as soon as possible.`,
  },
  {
    q: "What is the language of the content?",
    a: "The content is written in simple and easy-to-understand Basic English for beginners and students.",
  },
  {
    q: "Is this bundle suitable for beginners?",
    a: "Yes! This bundle is specially designed for beginners as well as advanced learners.",
  },
  {
    q: "Will I get instant access after purchase?",
    a: "Yes, you will receive instant access to all ebooks and materials immediately after successful payment.",
  },
  {
    q: "Can I access the content on mobile and laptop?",
    a: "Absolutely! You can easily access the ebooks on mobile phones, tablets, laptops, and desktops.",
  },
  {
    q: "Are the notes easy to understand?",
    a: "Yes, the notes are simplified with easy explanations, diagrams, and structured learning.",
  },
  {
    q: "Is this useful for psychology students?",
    a: "Definitely! This bundle is highly useful for psychology students, self-learners, and competitive exam preparation.",
  },
  {
    q: "Do I need prior psychology knowledge?",
    a: "No prior knowledge is required. The bundle starts from basic concepts and gradually moves to advanced topics.",
  },
];

const reviews = [
  {
    name: "Aditi Sharma",
    city: "New Delhi",
    initial: "A",
    color: "#12213f",
    text: "This psychology bundle exceeded my expectations. The concepts are explained in such a simple way that even difficult topics became easy to understand. The diagrams and organized notes are a huge plus.",
  },
  {
    name: "Rohan Mehta",
    city: "Pune",
    initial: "R",
    color: "#b8501f",
    text: "The best study material for psychology learners. Everything is arranged in a logical order, making revision quick and stress-free. I found it much easier than reading bulky textbooks.",
  },
  {
    name: "Nisha Gupta",
    city: "Indore",
    initial: "N",
    color: "#0e7a3a",
    text: "I was completely new to psychology, but this bundle made learning enjoyable. The explanations are clear, practical, and easy to remember. Definitely worth buying.",
  },
  {
    name: "Vivek Sinha",
    city: "Ranchi",
    initial: "V",
    color: "#7c3aed",
    text: "The quality of the notes is outstanding. Every chapter is presented in a clean and structured format, which helped me prepare with confidence and save a lot of time.",
  },
  {
    name: "Kavya Iyer",
    city: "Chennai",
    initial: "K",
    color: "#0891b2",
    text: "I really liked the visual learning approach. The illustrations and summaries made complex psychological theories much easier to grasp. It's one of the best digital study resources I've used.",
  },
  {
    name: "Mohit Arora",
    city: "Chandigarh",
    initial: "M",
    color: "#be123c",
    text: "Excellent value for money. The content is well-researched, beginner-friendly, and detailed enough for serious students. I would confidently recommend this bundle to anyone interested in psychology.",
  },
];

const sampleImages = [
  "https://img.flexifunnels.com/images/27068/Screenshot20250725at6.17.02PM768x1096_oyqtu_768.webp",
  "https://img.flexifunnels.com/images/27068/Screenshot20250725at6.17.37PM768x1092_6njhm_768.webp",
  "https://img.flexifunnels.com/images/27068/Screenshot20250725at6.18.08PM768x1090_g5e2v_768.webp",
  "https://img.flexifunnels.com/images/27068/Screenshot20250725at6.16.31PM768x1097_iy6yq_768.webp",
];

const topics = [
  { icon: "🧠", text: "Science of Psychology" },
  { icon: "📚", text: "Modern Approaches" },
  { icon: "🎯", text: "Fields of Psychology" },
  { icon: "👨‍⚕️", text: "Psychological Profession" },
  { icon: "🤝", text: "Social Psychology" },
  { icon: "🧩", text: "Memory" },
  { icon: "👁️", text: "Perception" },
  { icon: "🧬", text: "Biology and Behavior" },
  { icon: "📖", text: "Learning" },
  { icon: "🌱", text: "Development" },
  { icon: "🔥", text: "Motivation" },
  { icon: "😰", text: "Stress and Emotions" },
  { icon: "💡", text: "Personality" },
  { icon: "⚠️", text: "Psychological Disorders" },
  { icon: "💊", text: "Treatment of Psychological Disorders" },
  { icon: "🧬", text: "Biological Basis of Behaviour" },
  { icon: "⏳", text: "Development Across Lifespan" },
];

const careerPoints = [
  { icon: "📚", text: "Learn from Beginner to Advanced Level" },
  { icon: "🧠", text: "Complete Psychology Knowledge in One Place" },
  { icon: "🎯", text: "Build Strong Subject Clarity" },
  { icon: "🚀", text: "Career & Job Opportunities Worldwide" },
  { icon: "⚡", text: "Study Smarter, Not Harder" },
  { icon: "📖", text: "Everything You Need in One Bundle" },
];

const whyPoints = [
  { lead: "Beginner to advanced", rest: " — everything in one place" },
  { lead: "Easy notes with visual diagrams", rest: "" },
  { lead: "Updated & practical", rest: " exam-oriented content" },
  { lead: "Instant download", rest: " right after purchase" },
  { lead: "Lifetime access", rest: " — study on any device" },
  { lead: "Clear, simple language", rest: " that's easy to revise" },
];

export default function PsychologyNotesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.titleBar}>
        <span className={styles.kicker}>PREMIUM STUDY MATERIAL</span>
        <h1>
          Psychology <span className={styles.titleAccent}>Notes</span>
        </h1>
        <p className={styles.titleSub}>Complete Basic to Advance — in one PDF</p>
      </div>

      <div className={styles.wrap}>
        <div className={styles.grid}>
          <div className={styles.imageWrap}>
            <Image
              src={clinicalCover}
              alt="Psychology Notes — Basic to Advance"
              className={styles.image}
              priority
            />
          </div>

          <div className={styles.card}>
            <span className={styles.badge}>Basic to Advance</span>

            <div className={styles.rating}>
              <span className={styles.stars}>★★★★★</span>
              <span className={styles.ratingText}>4.9 · Trusted by students</span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.priceNow}>₹149</span>
              <span className={styles.priceOld}>₹2,499</span>
              <span className={styles.offBadge}>90% OFF</span>
            </div>
            <div className={styles.limited}>⏳ Limited Time Offer</div>

            <ul className={styles.included}>
              {included.map((item) => (
                <li key={item}>
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a className={styles.buyBtn} href="/psychology-notes/checkout">
              BUY NOW <span className={styles.arrow}>→</span>
            </a>
            <span className={styles.buyHint}>Click here to get instant access</span>

            <div className={styles.infoRow}>
              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>📄 Format</div>
                <div className={styles.infoValue}>PDF</div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>📧 Delivery</div>
                <div className={styles.infoValue}>Through Email</div>
              </div>
            </div>

            <p className={styles.note}>
              Note: You will receive a digital copy only, not a hard copy.
            </p>
          </div>
        </div>

        {/* Why Buy Now */}
        <section className={styles.why}>
          <h2 className={styles.whyTitle}>Why Buy Now?</h2>

          <div className={styles.whyGrid}>
            {whyPoints.map((w) => (
              <div className={styles.whyItem} key={w.lead}>
                <Check />
                <span>
                  <strong>{w.lead}</strong>
                  {w.rest}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.offerLine}>
            🔥 Limited time — flat <strong>90% OFF</strong>, price goes up soon
          </div>
        </section>

        {/* What you get */}
        <section className={styles.topics}>
          <h2 className={styles.topicsTitle}>What Exactly Do I Get In This?</h2>
          <div className={styles.topicsGrid}>
            {topics.map((t) => (
              <div className={styles.topicItem} key={t.text}>
                <span className={styles.topicIcon}>{t.icon}</span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Career help */}
        <section className={styles.career}>
          <h2 className={styles.careerTitle}>
            How Will This Psychology Bundle Help Your Career?
          </h2>
          <div className={styles.careerGrid}>
            {careerPoints.map((c) => (
              <div className={styles.careerItem} key={c.text}>
                <span className={styles.careerIcon}>{c.icon}</span>
                <span className={styles.careerText}>{c.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sample carousel */}
        <section className={styles.sample}>
          <h2 className={styles.sampleTitle}>Sample Pages</h2>
          <div className={styles.marquee}>
            <div className={styles.track}>
              {[...sampleImages, ...sampleImages].map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt={`Psychology Notes sample page ${(i % sampleImages.length) + 1}`}
                  className={styles.slide}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className={styles.reviews}>
          <h2 className={styles.reviewsTitle}>What Students Are Saying</h2>
          <div className={styles.reviewsGrid}>
            {reviews.map((r) => (
              <figure className={styles.reviewCard} key={r.name}>
                <span className={styles.quoteMark}>&ldquo;</span>
                <div className={styles.reviewStars}>★★★★★</div>
                <blockquote>{r.text}</blockquote>
                <figcaption className={styles.reviewer}>
                  <span
                    className={styles.avatar}
                    style={{ background: r.color }}
                    aria-hidden="true"
                  >
                    {r.initial}
                  </span>
                  <span className={styles.reviewerInfo}>
                    <span className={styles.reviewerName}>{r.name}</span>
                    <span className={styles.reviewerCity}>{r.city}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqs.map((f) => (
              <details className={styles.faqItem} key={f.q}>
                <summary>{f.q}</summary>
                <p>
                  {f.a.includes(SUPPORT_EMAIL) ? (
                    <>
                      {f.a.split(SUPPORT_EMAIL)[0]}
                      <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                      {f.a.split(SUPPORT_EMAIL)[1]}
                    </>
                  ) : (
                    f.a
                  )}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <PsyFooter />
      <CountdownBar />
    </div>
  );
}
