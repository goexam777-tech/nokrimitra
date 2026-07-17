import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "@/public/gsrtcmcq.webp";

import styles from "./mcq-course.module.css";

export const metadata: Metadata = {
  title:
    "GSRTC કંડક્ટર MCQ કોર્સ | 5000+ MCQ, 20 મોડલ પેપર, 10 કમ્પ્યુટર નોટ્સ | નોકરી મિત્ર",
  description:
    "GSRTC કંડક્ટર પરીક્ષાની તૈયારી માટે 5000+ MCQ, 20 મોડલ પ્રેક્ટિસ પેપર અને 10 કમ્પ્યુટર નોટ્સ. તરત ડાઉનલોડ, આજે જ અભ્યાસ શરૂ કરો.",
};

const includes = [
  {
    tag: "5000+",
    title: "MCQ પ્રશ્નબેંક",
    desc: "તમામ વિષયોના 5000થી વધુ MCQ — જવાબ સાથે, પરીક્ષાના પેટર્ન પ્રમાણે તૈયાર.",
  },
  {
    tag: "20",
    title: "મોડલ પ્રેક્ટિસ પેપર",
    desc: "પરીક્ષા જેવા 20 ફુલ મોડલ પેપર, જેથી તમે સમય પ્રમાણે પ્રેક્ટિસ કરી શકો.",
  },
  {
    tag: "10",
    title: "કમ્પ્યુટર નોટ્સ",
    desc: "કમ્પ્યુટર વિષયની 10 સરળ નોટ્સ — ટૂંકમાં અને સમજાય એવી ભાષામાં.",
  },
];

const trust = [
  {
    icon: "⚡",
    title: "તરત ડાઉનલોડ",
    desc: "પેમેન્ટ પછી તરત જ ડાઉનલોડ લિંક મળે — ઈમેલ પર પણ મોકલવામાં આવે છે.",
  },
  {
    icon: "📱",
    title: "કોઈપણ ડિવાઈસ પર",
    desc: "મોબાઈલ, લેપટોપ કે ટેબલેટ — ગમે ત્યાં, ગમે ત્યારે અભ્યાસ કરો.",
  },
  {
    icon: "🎯",
    title: "પરીક્ષા-કેન્દ્રિત",
    desc: "GSRTC કંડક્ટર સિલેબસ પ્રમાણે ખાસ તૈયાર કરેલી સામગ્રી.",
  },
  {
    icon: "🔒",
    title: "સુરક્ષિત પેમેન્ટ",
    desc: "Razorpay દ્વારા 100% સુરક્ષિત પેમેન્ટ — UPI, કાર્ડ, નેટ બેન્કિંગ.",
  },
];

const reviews = [
  {
    initials: "જ",
    name: "જયેશ પરમાર",
    role: "અમદાવાદ",
    text: "5000+ MCQ થી પ્રેક્ટિસ બહુ મજબૂત થઈ. મોડલ પેપરથી પરીક્ષાનો ડર નીકળી ગયો.",
  },
  {
    initials: "મ",
    name: "મનીષ ઠાકોર",
    role: "રાજકોટ",
    text: "કમ્પ્યુટર નોટ્સ બહુ સરળ ભાષામાં છે. આટલી કિંમતમાં આટલું બધું મળે એ સાચે જ સારું.",
  },
  {
    initials: "વ",
    name: "વિપુલ ચૌધરી",
    role: "મહેસાણા",
    text: "એક જ જગ્યાએ બધું મળી ગયું. મોબાઈલ પર જ પ્રેક્ટિસ કરી શકું છું, બહુ અનુકૂળ છે.",
  },
];

const faqs = [
  {
    q: "ડાઉનલોડ ક્યારે અને કેવી રીતે મળશે?",
    a: "પેમેન્ટ સફળ થતાં જ ડાઉનલોડ લિંક તમને સ્ક્રીન પર અને ઈમેલ પર મળી જશે. તમે તરત જ અભ્યાસ શરૂ કરી શકો છો.",
  },
  {
    q: "શું આ સામગ્રી મોબાઈલ પર ખૂલશે?",
    a: "હા. MCQ, મોડલ પેપર અને નોટ્સ PDF સ્વરૂપે છે, જે મોબાઈલ, લેપટોપ કે ટેબલેટ — કોઈપણ ડિવાઈસ પર ખૂલે છે.",
  },
  {
    q: "શું આ GSRTC કંડક્ટર પરીક્ષા માટે જ છે?",
    a: "હા, આ સામગ્રી ખાસ GSRTC કંડક્ટર પરીક્ષાના સિલેબસ પ્રમાણે તૈયાર કરવામાં આવી છે.",
  },
  {
    q: "પેમેન્ટ સુરક્ષિત છે?",
    a: "હા, 100% સુરક્ષિત. પેમેન્ટ Razorpay દ્વારા થાય છે — UPI, કાર્ડ કે નેટ બેન્કિંગથી ચૂકવી શકો છો.",
  },
];

export default function GsrtcMcqCoursePage() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.heroGrid}>
            <span className={styles.badgeMobile}>🚌 GSRTC કંડક્ટર તૈયારી</span>
            <div className={styles.heroText}>
              <span className={styles.badge}>🚌 GSRTC કંડક્ટર તૈયારી</span>
              <h1 className={styles.headline}>
                GSRTC કંડક્ટર ભરતી <span className={styles.accent}>2026</span>{" "}
                માટે Complete PDF Bundle
              </h1>
              <div className={styles.featureCards}>
                <div className={styles.featureCard}>
                  <span className={styles.featureIcon}>📝</span>
                  <span className={styles.featureText}>5000+ MCQs</span>
                </div>
                <div className={styles.featureCard}>
                  <span className={styles.featureIcon}>📄</span>
                  <span className={styles.featureText}>20 Practice Papers</span>
                </div>
                <div className={styles.featureCard}>
                  <span className={styles.featureIcon}>💻</span>
                  <span className={styles.featureText}>10 Computer Notes</span>
                </div>
              </div>
              <p className={styles.sub}>
                GSRTC કંડક્ટર પરીક્ષાની સંપૂર્ણ તૈયારી માટે જરૂરી બધું જ. તરત
                ડાઉનલોડ કરો અને આજે જ અભ્યાસ શરૂ કરો.
              </p>

              <div className={styles.priceRow}>
                <span className={styles.priceNow}>₹99</span>
                <span className={styles.priceOld}>₹299</span>
                <span className={styles.priceOff}>67% OFF</span>
              </div>

              <a className={styles.cta} href="#buy">
                📥 હમણાં જ ડાઉનલોડ કરો – માત્ર ₹99
              </a>
              <p className={styles.microTrust}>
                ⭐ 4.9/5 રેટિંગ · 1000+ ઉમેદવારોએ ડાઉનલોડ કર્યું
              </p>
            </div>

            <div className={styles.heroImageWrap}>
              <div className={styles.imageFrame}>
                <span className={styles.bestSeller}>🔥 BEST SELLER</span>
                <Image
                  src={heroImg}
                  alt="GSRTC કંડક્ટર MCQ કોર્સ — 5000+ MCQ, 20 મોડલ પેપર અને કમ્પ્યુટર નોટ્સ"
                  className={styles.heroImage}
                  priority
                />
              </div>
              <span className={styles.syllabusBadge}>🟢 Latest 2026 Syllabus</span>
            </div>
          </div>

        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.h2}>આ પેકેજમાં શું મળશે?</h2>
          <div className={styles.includeGrid}>
            {includes.map((it) => (
              <div className={styles.includeCard} key={it.title}>
                <span className={styles.includeTag}>{it.tag}</span>
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF PREVIEW */}
      <section className={styles.previewSection}>
        <div className={styles.inner}>
          <h2 className={styles.h2}>PDF નો પ્રિવ્યૂ જુઓ</h2>
          <p className={styles.previewSub}>
            ખરીદતા પહેલા સામગ્રીની ઝલક જુઓ — આ એક નમૂનારૂપ પ્રિવ્યૂ છે.
          </p>

          <div className={styles.previewFrame}>
            <iframe
              src="/gujarat_history_mcqs.pdf#toolbar=0&navpanes=0&view=FitH"
              title="PDF preview"
              className={styles.previewPdf}
            />
          </div>

          <p className={styles.previewNote}>
            📄 આ ફક્ત નમૂનો છે. સંપૂર્ણ પેકેજમાં 5000+ MCQ, 20 મોડલ પેપર અને 10
            કમ્પ્યુટર નોટ્સ મળશે.
          </p>
        </div>
      </section>

      {/* TRUST / WHY */}
      <section className={styles.sectionAlt}>
        <div className={styles.inner}>
          <h2 className={styles.h2}>શા માટે નોકરી મિત્ર?</h2>
          <div className={styles.trustGrid}>
            {trust.map((t) => (
              <div className={styles.trustCard} key={t.title}>
                <span className={styles.trustIcon} aria-hidden="true">
                  {t.icon}
                </span>
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.h2}>ઉમેદવારો શું કહે છે</h2>
          <div className={styles.reviewGrid}>
            {reviews.map((r) => (
              <figure className={styles.reviewCard} key={r.name}>
                <div className={styles.stars}>★★★★★</div>
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <span className={styles.avatar}>{r.initials}</span>
                  <span>
                    <strong>{r.name}</strong>
                    <span className={styles.reviewRole}>{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE / BUY */}
      <section className={styles.buySection} id="buy">
        <div className={styles.inner}>
          <div className={styles.buyCard}>
            <span className={styles.buyRibbon}>🔥 BEST SELLER</span>
            <div className={styles.buyImageWrap}>
              <Image
                src={heroImg}
                alt="GSRTC કંડક્ટર MCQ કોર્સ પેકેજ"
                className={styles.buyImage}
              />
            </div>
            <h2 className={styles.buyTitle}>સંપૂર્ણ MCQ પેકેજ</h2>
            <ul className={styles.buyList}>
              <li>
                <span className={styles.buyTick}>✓</span> 5000+ MCQ (જવાબ સાથે)
              </li>
              <li>
                <span className={styles.buyTick}>✓</span> 20 મોડલ પ્રેક્ટિસ પેપર
              </li>
              <li>
                <span className={styles.buyTick}>✓</span> 10 કમ્પ્યુટર નોટ્સ
              </li>
              <li>
                <span className={styles.buyTick}>✓</span> તરત ડાઉનલોડ + ઈમેલ પર
                લિંક
              </li>
            </ul>
            <div className={styles.buyPrice}>
              <span className={styles.priceNow}>₹99</span>
              <span className={styles.priceOld}>₹299</span>
              <span className={styles.priceOff}>67% OFF</span>
            </div>
            <a className={styles.cta} href="/gsrtc-mcq-course/checkout">
              📥 હમણાં જ ડાઉનલોડ કરો – માત્ર ₹99
            </a>
            <p className={styles.microTrust}>🔒 100% સુરક્ષિત પેમેન્ટ · Razorpay</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.sectionAlt}>
        <div className={styles.inner}>
          <h2 className={styles.h2}>વારંવાર પૂછાતા પ્રશ્નો</h2>
          <div className={styles.faqList}>
            {faqs.map((f) => (
              <details className={styles.faqItem} key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerBrand}>નોકરી મિત્ર</div>
        <nav className={styles.footerLinks}>
          <a href="/privacy-policy">પ્રાઈવસી પોલિસી</a>
          <a href="/refund-policy">રિફંડ પોલિસી</a>
          <a href="/terms">નિયમો અને શરતો</a>
          <a href="/disclaimer">ડિસ્ક્લેમર</a>
        </nav>
        <div className={styles.footerBottom}>
          © {new Date().getFullYear()} નોકરી મિત્ર. બધા હક્ક સુરક્ષિત.
        </div>
      </footer>

      {/* Sticky bottom bar */}
      <div className={styles.bottomBar}>
        <a
          className={styles.waLink}
          href={`https://wa.me/919104826422?text=${encodeURIComponent(
            "નમસ્તે, મારે GSRTC કંડક્ટર MCQ પેકેજ વિશે પૂછવું છે."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.waIcon} aria-hidden="true">
            <svg viewBox="0 0 32 32" width="26" height="26" fill="#ffffff">
              <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm5.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z" />
            </svg>
          </span>
          <span className={styles.waText}>WhatsApp પર પૂછો</span>
        </a>

        <a className={styles.barBuyBtn} href="/gsrtc-mcq-course/checkout">
          <span className={styles.cartIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </span>
          ખરીદો ₹99/-
        </a>
      </div>
    </div>
  );
}
