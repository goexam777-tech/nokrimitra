import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import SiteFooter from "@/app/components/SiteFooter";
import pdfHero from "@/public/pdfhero.webp";
import razorpayBadge from "@/public/razorpay-logo.webp";
import waReview1 from "@/public/wa-review-1.jpg";
import waReview2 from "@/public/wa-review-2.png";
import waReview3 from "@/public/wa-review-3.png";
import pdfPreview1 from "@/public/pdf-preview-1.png";
import pdfPreview2 from "@/public/pdf-preview-2.png";
import pdfPreview3 from "@/public/pdf-preview-3.png";
import pdfPreview4 from "@/public/pdf-preview-4.png";
import rahulPatel from "@/public/rahul-patel.webp";
import jayeshChaudhary from "@/public/jayesh.jpg";
import priyaDesai from "@/public/neha-verma.avif";

export const metadata: Metadata = {
  title: "GSRTC MCQ કોર્સ ₹99 | નોકરી મિત્ર",
  description:
    "GSRTC MCQ પેકેજમાં 10 Content PDFs, 2500+ MCQs, 21 Model Practice Papers અને 10 Computer Notes — ₹99 માં તાત્કાલિક ડિજિટલ એક્સેસ.",
};

type CheckItem = {
  bold: string;
  rest: string;
};

type Feature = {
  icon: string;
  title: string;
  desc: string;
};

type Stat = {
  num: string;
  label: string;
};

type Review = {
  name: string;
  place: string;
  initial: string;
  color: string;
  text: string;
  img?: StaticImageData;
};

type Faq = {
  q: string;
  a: string;
};

const heroChecklist: CheckItem[] = [
  { bold: "100% અભ્યાસક્રમ આધારિત", rest: "– GSRTC ના દરેક વિષય આવરી લેવાયા" },
  { bold: "તૈયાર નોંધ", rest: "– વાંચો અને યાદ રાખો, બીજી મહેનત નહીં" },
  { bold: "HD ગુણવત્તા", rest: "– સ્પષ્ટ અને વ્યવસ્થિત લેઆઉટ" },
  { bold: "21 Model Paper", rest: "– પેપર આધારિત પ્રેક્ટિસ માટે" },
  { bold: "2500+ MCQ પ્રેક્ટિસ", rest: "– જવાબ સાથે, ક્વિઝ ફોર્મેટમાં" },
  { bold: "તાત્કાલિક ડાઉનલોડ", rest: "– રાહ જોવાની જરૂર નહીં" },
  { bold: "લાઇફટાઇમ એક્સેસ", rest: "– એક વાર ખરીદો, કાયમ વાપરો" },
];

const stats: Stat[] = [
  { num: "10", label: "Content PDFs" },
  { num: "2500+", label: "MCQs" },
  { num: "21", label: "Model Practice Papers" },
  { num: "10", label: "Computer Notes" },
];

const included: Feature[] = [
  {
    icon: "📘",
    title: "10 Content PDFs",
    desc: "GSRTC MCQ અભ્યાસ માટે વિષયવાર ગોઠવેલી 10 Content PDFs.",
  },
  {
    icon: "✍️",
    title: "2500+ MCQs",
    desc: "જવાબ સાથે 2500+ બહુવિકલ્પ પ્રશ્નો, નિયમિત પ્રેક્ટિસ માટે.",
  },
  {
    icon: "📄",
    title: "21 Model Practice Papers",
    desc: "પેપર આધારિત તૈયારી અને સ્વ-મૂલ્યાંકન માટે 21 Model Practice Papers.",
  },
  {
    icon: "💻",
    title: "10 Computer Notes",
    desc: "કમ્પ્યુટર વિષયના અભ્યાસ માટે 10 ગોઠવેલી Computer Notes.",
  },
];

const pdfPreviews = [
  { src: pdfPreview1, alt: "GSRTC PDF પેકેજનો પ્રિવ્યૂ પાનું 1" },
  { src: pdfPreview2, alt: "GSRTC PDF પેકેજનો પ્રિવ્યૂ પાનું 2" },
  { src: pdfPreview3, alt: "GSRTC PDF પેકેજનો પ્રિવ્યૂ પાનું 3" },
  { src: pdfPreview4, alt: "GSRTC PDF પેકેજનો પ્રિવ્યૂ પાનું 4" },
];

const reviews: Review[] = [
  {
    name: "રાહુલ પટેલ",
    place: "અમદાવાદ",
    initial: "ર",
    color: "#0b6b3a",
    img: rahulPatel,
    text: "PDF ખરેખર સરસ છે. બધું ગુજરાતીમાં વિષયવાર મળી ગયું, અલગ પુસ્તકોની જરૂર જ ના પડી.",
  },
  {
    name: "પ્રિયા દેસાઈ",
    place: "સુરત",
    initial: "પ",
    color: "#b8720a",
    img: priyaDesai,
    text: "MCQ અને મોડલ પેપરથી પ્રેક્ટિસ બહુ મજબૂત થઈ. ₹99 માં આટલું બધું — સાચે જ કિંમતથી વધુ.",
  },
  {
    name: "જયેશ ચૌધરી",
    place: "મહેસાણા",
    initial: "જ",
    color: "#1d4ed8",
    img: jayeshChaudhary,
    text: "તરત ડાઉનલોડ થઈ ગયું અને મોબાઇલમાં સરળતાથી વંચાય છે. નોંધ મુદ્દાસર છે, સમય બચે છે.",
  },
];

const waReviews = [
  { src: waReview1, alt: "ખરીદનાર ઉમેદવારનો WhatsApp પ્રતિભાવ 1" },
  { src: waReview2, alt: "ખરીદનાર ઉમેદવારનો WhatsApp પ્રતિભાવ 2" },
  { src: waReview3, alt: "ખરીદનાર ઉમેદવારનો WhatsApp પ્રતિભાવ 3" },
];

const faqs: Faq[] = [
  {
    q: "PDF ખરીદ્યા પછી કેવી રીતે મળશે?",
    a: "પેમેન્ટ સફળ થયા પછી તમને તરત જ ડાઉનલોડ લિંક મળશે તથા તમારા ઈમેલ પર પણ મોકલવામાં આવશે.",
  },
  {
    q: "શું PDF ગુજરાતીમાં છે?",
    a: "હા, સંપૂર્ણ સામગ્રી સરળ ગુજરાતી ભાષામાં તૈયાર કરવામાં આવી છે.",
  },
  {
    q: "શું આ એક વખતનું પેમેન્ટ છે?",
    a: "હા, એક વખત ખરીદો અને કાયમ માટે એક્સેસ મેળવો — ભવિષ્યના અપડેટ પણ મફત.",
  },
  {
    q: "કયા ડિવાઇસ પર ખોલી શકાય?",
    a: "કોઈપણ મોબાઇલ, ટેબ્લેટ કે કમ્પ્યુટર પર PDF રીડર દ્વારા સરળતાથી ખોલી શકાય છે.",
  },
  {
    q: "કોઈ સમસ્યા હોય તો મદદ મળશે?",
    a: "હા. ડાઉનલોડ કે પેમેન્ટ સંબંધિત કોઈ પણ સમસ્યા હોય તો અમારી સપોર્ટ ટીમ WhatsApp/ઈમેલ પર તમને મદદ કરશે.",
  },
];

function CartIcon() {
  return (
    <svg
      className="btn-ico"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1.6" />
      <circle cx="18" cy="20" r="1.6" />
      <path d="M2 3h3l2.4 12.2a1.8 1.8 0 0 0 1.8 1.4h8.2a1.8 1.8 0 0 0 1.8-1.4L22 7H6.2" />
    </svg>
  );
}

export default function PdfCourse() {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a href="/" className="logo">
            <span className="logo-mark">NM</span>
            <span className="logo-name">
              <span className="logo-word">
                Nokri<span className="logo-accent">Mitra</span>
                <span className="logo-tld">.in</span>
              </span>
              <span className="logo-tag">GSRTC કંડક્ટર તૈયારી</span>
            </span>
          </a>
          <nav className="nav">
            <a className="nav-link" href="/">
              હોમ
            </a>
            <div className="nav-item">
              <span className="nav-link nav-drop" tabIndex={0} role="button">
                કોર્સ વિગત
                <svg
                  className="caret"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
              <div className="submenu">
                <a href="#included">📦 શું મળશે</a>
                <a href="#samples">📄 PDF પ્રિવ્યૂ</a>
                <a href="#reviews">⭐ રિવ્યુ</a>
                <a href="#faq">❓ FAQ</a>
              </div>
            </div>
            <Link className="header-buy" href="/gsrtc-mcq-course/checkout">
              <CartIcon /> ખરીદો ₹99
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Product hero */}
        <section className="product-hero">
          <div className="container">
            <div className="product-grid">
              {/* Product cover */}
              <div className="box-scene">
                <Image
                  src={pdfHero}
                  alt="GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ"
                  className="product-image"
                  sizes="(max-width: 900px) 90vw, 440px"
                  priority
                />
              </div>

              {/* Product info */}
              <div className="product-info" id="buy">
                <div className="updated-badge">
                  <span className="dot" /> Updated for 2026 syllabus
                </div>
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-score">4.9</span>
                  <span className="rating-sep" />
                  <span className="rating-count">
                    <strong>800+</strong> ઉમેદવારોના રિવ્યુ
                  </span>
                </div>

                <h1 className="product-headline">
                  GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ હમણાં જ મેળવો!! 📗
                </h1>

                <div className="product-tagline">
                  GSRTC કંડક્ટર સંપૂર્ણ તૈયારી PDF (તૈયાર — તરત ડાઉનલોડ)
                </div>

                <ul className="check-list">
                  {heroChecklist.map((item) => (
                    <li key={item.bold}>
                      <span className="check" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="14" height="14">
                          <path
                            d="M20 6L9 17l-5-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>
                        <strong>{item.bold}</strong> {item.rest}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Offer below hero (centered, full width) */}
            <div className="hero-offer">
              <h2 className="hero-offer-title">
                ફક્ત ₹99/- આજે — તરત ડાઉનલોડ, હમણાં જ અભ્યાસ શરૂ કરો!
              </h2>

              <Link
                className="btn btn-accent hero-buy"
                href="/gsrtc-mcq-course/checkout"
              >
                <CartIcon /> હમણાં ખરીદો ₹99{" "}
                <span className="final-old">₹299</span>
              </Link>

              <div className="final-badges">
                <span className="fb">⚡ તરત ડાઉનલોડ</span>
                <span className="fb">✅ 100% સુરક્ષિત પેમેન્ટ</span>
                <span className="fb">♾️ લાઇફટાઇમ એક્સેસ</span>
              </div>

              <div className="pay-trust">
                <Image
                  src={razorpayBadge}
                  alt="Razorpay દ્વારા 100% સુરક્ષિત પેમેન્ટ — GPay, PhonePe, UPI, Paytm"
                  className="pay-trust-img"
                  sizes="(max-width: 640px) 90vw, 420px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Included */}
        <section className="section included-section" id="included">
          <div className="container">
            <h2 className="section-title">આ GSRTC MCQ પેકેજમાં શું મળશે</h2>

            {/* Stats strip */}
            <div className="stats-strip">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="feature-grid">
              {included.map((item) => (
                <div className="fcard" key={item.title}>
                  <span className="fcard-ico">{item.icon}</span>
                  <div className="fcard-text">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PDF preview screenshots */}
        <section className="section samples-section" id="samples">
          <div className="container">
            <h2 className="section-title">PDF નો પ્રિવ્યૂ જુઓ</h2>
            <p className="section-subtitle">
              ખરીદતાં પહેલાં અમારી PDF ની ગુણવત્તા અને ગોઠવણી જાતે જુઓ.
            </p>

            <div className="wa-marquee">
              <div className="wa-track">
                {[...pdfPreviews, ...pdfPreviews].map((p, i) => (
                  <figure className="wa-shot" key={`${p.alt}-${i}`}>
                    <Image
                      src={p.src}
                      alt={i < pdfPreviews.length ? p.alt : ""}
                      aria-hidden={i >= pdfPreviews.length}
                      className="wa-shot-img"
                      sizes="(max-width: 600px) 82vw, 300px"
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
            </div>
            <p className="wa-proof-note">
              આ ફક્ત નમૂનારૂપ પાનાં છે — સંપૂર્ણ પેકેજમાં 10 Content PDFs, 2500+
              MCQs, 21 Model Practice Papers અને 10 Computer Notes મળશે.
            </p>
          </div>
        </section>

        {/* Reviews / Testimonials */}
        <section className="section reviews-section" id="reviews">
          <div className="container">
            <h2 className="section-title">ઉમેદવારો શું કહે છે</h2>
            <p className="section-subtitle">
              800+ ઉમેદવારોએ આ PDF કોર્સથી પોતાની તૈયારી મજબૂત બનાવી.
            </p>

            <div className="reviews-grid">
              {reviews.map((r) => (
                <figure className="review-card" key={r.name}>
                  <span className="quote-mark">“</span>
                  <div className="review-stars">★★★★★</div>
                  <blockquote>{r.text}</blockquote>
                  <figcaption className="review-author">
                    {r.img ? (
                      <Image
                        src={r.img}
                        alt={r.name}
                        className="avatar avatar-img"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <span
                        className="avatar"
                        style={{ background: r.color }}
                        aria-hidden="true"
                      >
                        {r.initial}
                      </span>
                    )}
                    <span className="author-info">
                      <span className="author-name">{r.name}</span>
                      <span className="author-place">{r.place}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="wa-proof-title">
              ખરીદનાર ઉમેદવારોના WhatsApp પ્રતિભાવ
            </p>
            <div className="wa-marquee">
              <div className="wa-track">
                {[...waReviews, ...waReviews].map((r, i) => (
                  <figure className="wa-shot" key={`${r.alt}-${i}`}>
                    <Image
                      src={r.src}
                      alt={i < waReviews.length ? r.alt : ""}
                      aria-hidden={i >= waReviews.length}
                      className="wa-shot-img"
                      sizes="(max-width: 600px) 82vw, 300px"
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
            </div>
            <p className="wa-proof-note">
              ખરીદનારાઓ સાથેની અસલ WhatsApp વાતચીતના સ્ક્રીનશોટ.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq" style={{ background: "#fff" }}>
          <div className="container" style={{ maxWidth: "760px" }}>
            <h2 className="section-title">વારંવાર પૂછાતા પ્રશ્નો</h2>
            <div className="faq-list">
              {faqs.map((f) => (
                <details className="faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Sticky buy bar */}
      <div className="buy-bar">
        <div className="container buy-bar-inner">
          <a
            className="wa-contact"
            href="https://wa.me/919104826422?text=નમસ્તે,%20મારે%20GSRTC%20MCQ%20પેકેજ%20વિશે%20પૂછવું%20છે."
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="wa-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor">
                <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.9 1 1-4.8-.2-.4c-1-1.6-1.5-3.4-1.5-5.3C5 9.5 9.9 4.9 16 4.9S27 9.5 27 15 22.1 24.8 16 24.8zm5.5-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z" />
              </svg>
            </span>
            <span className="wa-text">
              <span className="wa-line">WhatsApp પર પૂછો</span>
              <span className="wa-sub">કોઈ પ્રશ્ન હોય તો મેસેજ કરો</span>
            </span>
          </a>
          <Link
            className="btn buy-bar-btn"
            href="/gsrtc-mcq-course/checkout"
          >
            <CartIcon /> ખરીદો ₹99/-
          </Link>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
