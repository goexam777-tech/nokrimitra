import Image from "next/image";
import { Nunito, Poppins } from "next/font/google";
import { ArrowRight, Mail, Phone, Quote, Smile, Star } from "lucide-react";
import FaqAccordion from "./FaqAccordion";
import MedicalViewItem from "./MedicalViewItem";
import styles from "./medical.module.css";
import bannerImg from "@/public/Gemini_Generated_Image_u8awxxu8awxxu8aw.webp";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

// Heading font: applied to title, section headings and labels via CSS variable
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-title",
});

const CHECKOUT_LINK = "/medical-masterbook/checkout";
const PRICE = "₹149";

const WHATS_INSIDE = [
  { emoji: "💊", title: "5,000+ Medicines", desc: "Essential medicine information" },
  { emoji: "🩺", title: "200+ Diseases", desc: "Organized disease references" },
  { emoji: "📋", title: "Dosage, Uses & Side Effects", desc: "Quick reference guide" },
  { emoji: "🌐", title: "Simple English", desc: "Easy-to-understand content" },
  { emoji: "📖", title: "500+ Pages", desc: "All-in-one medical reference" },
  { emoji: "📥", title: "Offline Access", desc: "Read anytime, anywhere" },
  { emoji: "⚡", title: "Instant PDF Access", desc: "Get it after purchase" },
  { emoji: "♾️", title: "Lifetime Access", desc: "Pay once, access anytime" },
];

const WHO_IS_FOR = [
  { emoji: "🎓", role: "Medical Students", desc: "Quick revision & reference" },
  { emoji: "👩‍⚕️", role: "Nursing Students & Nurses", desc: "Medicine & disease information" },
  { emoji: "💊", role: "Pharmacy Students & Pharmacists", desc: "Convenient medicine reference" },
  { emoji: "🩺", role: "Doctors & Clinical Learners", desc: "Everyday medical reference" },
];

const ANYTIME_REFERENCE = [
  "📚 Study & Exam Preparation",
  "💊 Medicine Revision",
  "🩺 Clinical Reference",
  "📖 Quick Learning",
];

const WHAT_YOU_GET = [
  { label: "Access", value: "Instant" },
  { label: "Resource content", value: "PDF / File" },
  { label: "Validity", value: "Lifetime" },
];

const TESTIMONIALS = [
  {
    name: "Dr. Amit Verma",
    quote:
      "An essential reference for OPD duties and clinical rotations. Looking up 5,000+ medicines, exact dosages, and 200+ diseases is fast, accurate, and extremely well structured.",
  },
  {
    name: "Pooja Sharma",
    quote:
      "The best digital handbook for nursing studies and clinical practice. Every drug's dosage, indications, and side effects are presented in a crystal-clear format.",
  },
];

const FAQS_DATA = [
  {
    q: "What is included in the Medical Masterbook?",
    a: "This comprehensive digital handbook covers 5,000+ essential medicines with dosages, uses, and side effects, along with structured references for 200+ diseases across 500+ pages of high-yield medical content.",
  },
  {
    q: "Who is this book suitable for?",
    a: "It is specifically designed for medical students (MBBS, BDS, BAMS, BHMS), nursing students & nurses, pharmacy students & pharmacists, as well as doctors and clinical practitioners seeking a reliable, quick reference.",
  },
  {
    q: "How do I access the PDF after purchase?",
    a: "Immediately upon completing payment, you will receive an instant download link on your screen, and an access link will also be sent to your email. You can download and save it offline on your smartphone, laptop, or tablet with lifetime access.",
  },
  {
    q: "What payment methods are supported and is it secure?",
    a: "Payment is 100% secure and encrypted. You can pay seamlessly via UPI (Google Pay, PhonePe, Paytm, BHIM), Debit/Credit Cards, or Net Banking.",
  },
];

function Divider() {
  return <hr className={styles.divider} />;
}

export default function MedicalMasterbookLandingPage() {
  return (
    <div className={`${styles.page} ${nunito.className} ${poppins.variable}`}>
      <main className={styles.column}>
        <h1 className={styles.title}>
          Medical Masterbook — 5,000+ Medicines. 200+ Diseases. 500+ Pages. All in One PDF.
        </h1>

        <div className={styles.banner}>
          <Image
            src={bannerImg}
            alt="Medical Masterbook — 5,000+ Medicines, 200+ Diseases, 500+ Pages"
            priority
            className={styles.bannerImg}
            sizes="(max-width: 640px) 100vw, 600px"
          />
        </div>

        {/* DESCRIPTION */}
        <section className={styles.section}>
          <h2 className={styles.label}>Description</h2>
          <p>
            <strong>The Only Medical Reference You&apos;ll Ever Need.</strong>
          </p>
          <p>
            5,000+ medicines. 200 diseases. 500+ pages. Dosage. Uses. Side effects. All in one PDF.
          </p>
          <p>
            Built for medical students, nurses, pharmacists &amp; doctors - in Simple English so you actually understand it.
          </p>
        </section>

        <Divider />

        {/* WHAT'S INSIDE? */}
        <section className={styles.section}>
          <h2 className={styles.heading}>🔥 WHAT&apos;S INSIDE?</h2>
          {WHATS_INSIDE.map((item) => (
            <p key={item.title}>
              {item.emoji} <strong>{item.title}</strong> – {item.desc}
            </p>
          ))}
        </section>

        <Divider />

        {/* WHO IS IT FOR? */}
        <section className={styles.section}>
          <h2 className={styles.heading}>👨‍⚕️ WHO IS IT FOR?</h2>
          <ul className={styles.plainList}>
            {WHO_IS_FOR.map((item) => (
              <li key={item.role}>
                {item.emoji} <strong>{item.role}</strong> – {item.desc}
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* YOUR MEDICAL REFERENCE. ANYTIME. */}
        <section className={styles.section}>
          <h2 className={styles.heading}>⚡ YOUR MEDICAL REFERENCE. ANYTIME.</h2>
          <ul className={styles.plainList}>
            {ANYTIME_REFERENCE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p style={{ marginTop: "14px" }}>
            <strong>Medical Masterbook</strong> – Your all-in-one digital medical reference.
          </p>
        </section>

        <Divider />

        {/* MOBILE-FRIENDLY PDF */}
        <section className={styles.section}>
          <h2 className={styles.heading}>📱 MOBILE-FRIENDLY PDF</h2>
          <p>📱 Smartphone | 💻 Laptop | 📲 Tablet</p>
          <p><strong>Download once and access anytime!</strong></p>
        </section>

        <Divider />

        {/* SPECIAL LAUNCH PRICE - PLAIN SECTION WITHOUT BOX DESIGN */}
        <section className={styles.section}>
          <h2 className={styles.heading}>💰 SPECIAL LAUNCH PRICE</h2>
          <p>
            🩺 <strong>MEDICAL MASTERBOOK</strong>
          </p>
          <p>
            Regular Price: <s>₹1,999</s>
          </p>
          <p>
            <strong>Today Only ₹149</strong>
          </p>
          <p>📥 Instant PDF Access • Lifetime Access</p>
        </section>

        <Divider />

        {/* STOP SEARCHING */}
        <section className={styles.section}>
          <h2 className={styles.heading}>
            🩺 STOP SEARCHING.
            <br />
            START YOUR MEDICAL REFERENCE LIBRARY.
          </h2>
          <p>👉 GET INSTANT ACCESS NOW</p>
        </section>

        <Divider />

        {/* WHAT YOU'LL GET */}
        <section className={styles.section}>
          <h2 className={styles.label}>What you&apos;ll get</h2>
          <dl className={styles.infoTable}>
            {WHAT_YOU_GET.map((row) => (
              <div key={row.label} className={styles.infoRow}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* TESTIMONIALS */}
        <section className={styles.section}>
          <h2 className={styles.label}>Testimonials</h2>
          <div className={styles.reviews}>
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className={styles.review}>
                <Quote className={styles.quoteMark} size={26} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                <div className={styles.stars} aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className={styles.reviewText}>{t.quote}</blockquote>
                <figcaption className={styles.reviewAuthor}>
                  <Smile size={22} className={styles.avatarIcon} aria-hidden="true" />
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.section}>
          <h2 className={styles.label}>Frequently Asked Questions (FAQs)</h2>
          <FaqAccordion items={FAQS_DATA} />
        </section>

        {/* CONTACT */}
        <section className={styles.section}>
          <h2 className={styles.label}>Contact</h2>
          <p className={styles.contactRow}>
            <Mail size={18} className={styles.contactIcon} aria-label="Email" />
            <a href="mailto:vadaviyarohit785@gmail.com" className={styles.contactLink}>
              vadaviyarohit785@gmail.com
            </a>
          </p>
          <p className={styles.contactRow}>
            <Phone size={18} className={styles.contactIcon} aria-label="Phone" />
            <a href="tel:+919998191490" className={styles.contactLink}>
              +91 9998191490
            </a>
          </p>
        </section>

        <MedicalViewItem />

        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Medical Masterbook</p>
        </footer>
      </main>

      {/* STICKY BOTTOM BAR */}
      <aside className={styles.sticky} aria-label="Buy Medical Masterbook">
        <div className={styles.stickyInner}>
          <a href={CHECKOUT_LINK} className={styles.stickyBtn}>
            <span>Get it now</span>
            <span className={styles.stickyBtnPrice}>
              {PRICE}
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </a>
        </div>
      </aside>
    </div>
  );
}
