import type { Metadata } from "next";
import Image from "next/image";
import astroImg from "@/public/astro8.webp";
import styles from "./vastu.module.css";
import VastuFooter from "./VastuFooter";
import StickyBuyBar from "./StickyBuyBar";

const faqs = [
  {
    q: "How and when will I get access to the bundle?",
    a: "Instantly! The moment your payment is successful, a \"Thank You\" page will open with a direct Google Drive link to download everything. We also send an automated backup access link to your email immediately, so you never lose access.",
  },
  {
    q: "Is payment safe?",
    a: "Yes, 100% safe. We use India's leading, highly secure payment gateways to process your transaction. Your payment is protected by SSL encryption also.",
  },
  {
    q: "What payment methods do you accept?",
    a: "You can pay securely using any UPI app (Google Pay, PhonePe, Paytm, BHIM), Net Banking (all major Indian banks), Credit Cards, and Debit Cards.",
  },
  {
    q: "Can I use these files for my client projects?",
    a: "Yes, 100%. The entire bundle comes with a Commercial Use License.",
  },
  {
    q: "Will I get lifetime access to these files?",
    a: "Yes, absolutely. Once you buy the bundle, the files are yours forever. You can download them to your computer, laptop, or phone, and use them whenever you have a client project — no expiry dates, no recurring fees.",
  },
  {
    q: "Do I need premium or expensive software to open these files?",
    a: "Not at all. The house plans and blocks work on any standard version of AutoCAD (or any free CAD viewer). The 3D elevations can be viewed as standard image files/PDFs.",
  },
  {
    q: "What if I am just a beginner or student? Will this be useful?",
    a: "It's actually perfect for beginners. Instead of starting with a blank screen and guessing dimensions, you can study 10,000+ real-world blueprints and use pre-made blocks. It cuts down your learning curve and helps you finish college or freelance projects 10x faster.",
  },
];

const steps = [
  {
    title: "Make Payment",
    desc: "Pay securely using UPI, Google Pay, PhonePe, Paytm or Card.",
  },
  {
    title: "Get Instant Access",
    desc: "A \"Thank You\" page opens immediately with your download link. Same link also sent on Email.",
  },
  {
    title: "Download & Start Using",
    desc: "Open your Google Drive folder and start using 10,000+ plans, 5,000+ blocks, and 3 premium courses today.",
  },
];

const bonuses = [
  {
    title: "Vastu E-Book with Remedies",
    desc: "A complete guide covering every Vastu dosha and its remedy — so you can advise clients confidently without opening AutoCAD.",
    value: "₹999",
  },
  {
    title: "Material & Texture Library",
    desc: "High resolution marble, wood, tile and fabric textures for SketchUp & 3Ds Max — for realistic, client-ready renders.",
    value: "₹799",
  },
  {
    title: "Construction Cost Estimation Sheet",
    desc: "A ready-made Excel sheet to quickly estimate material quantity and approximate cost for any house plan.",
    value: "₹699",
  },
  {
    title: "AutoCAD Shortcuts Cheat Sheet",
    desc: "A one-page quick reference of every AutoCAD shortcut you need to draft faster and work like a pro.",
    value: "₹299",
  },
  {
    title: "Site Supervision Checklist",
    desc: "A practical site-visit checklist covering foundation, plumbing, electrical and finishing stages of construction.",
    value: "₹499",
  },
  {
    title: "Client Agreement & Quotation Templates",
    desc: "Ready-made professional agreement and quotation formats — perfect for freelancers and small design studios.",
    value: "₹599",
  },
];

const reviews = [
  {
    initials: "RV",
    name: "Rohit Verma",
    role: "Civil Engineer, Lucknow",
    stars: 5,
    text: "Bahut acha bundle hai yaar. Maine already 2-3 plans use kar liye client ke liye. Itne kam price me itna sab milega socha nahi tha.",
  },
  {
    initials: "AM",
    name: "Anjali Mehta",
    role: "Interior Designer, Ahmedabad",
    stars: 5,
    text: "Main 2 din se Google pe CAD blocks dhund rahi thi, kuch achha free me nahi mil raha tha. Yaha ek hi jagah sab kuch mil gaya. Bahut time bach gaya.",
  },
  {
    initials: "SP",
    name: "Suresh Patil",
    role: "Contractor, Pune",
    stars: 5,
    text: "Site ke liye plan chahiye tha quickly, isme bahut variety mil gayi. Vastu wale plans bhi kaam aaye client ko samjhane me. Recommend karunga sabko.",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    role: "Architecture Student, Delhi",
    stars: 5,
    text: "College assignment ke liye perfect tha. Itne plans dekh ke samajh aa gaya design kaise hota hai. Itne sasta hai ki vishwas hi nahi hota.",
  },
  {
    initials: "VC",
    name: "Vikas Choudhary",
    role: "Vastu Consultant, Jaipur",
    stars: 5,
    text: "Mujhe Vastu wala part sabse zyada pasand aaya. Remedies bhi diye hain saath me, ab clients ko samjhana bahut easy ho gaya hai.",
  },
  {
    initials: "NK",
    name: "Neha Kulkarni",
    role: "Draftsman, Nagpur",
    stars: 4,
    text: "Pehle plan dhundne me hi bahut time chala jaata tha. Ab sab ek jagah mil jaata hai. Thodi aur variety hoti to aur badhiya hota, but is price me sahi hai.",
  },
];

const compare = [
  "10,000+ Ready House Plans",
  "3,000+ Editable 3D Elevations",
  "5,000+ AutoCAD Blocks",
  "Vastu / Shakti Chakra Files",
  "SketchUp & 3Ds Max Course",
  "Commercial Use License",
  "Multiple Formats (DWG, PDF, PSD)",
  "Email Support",
];

const results = [
  "\"Cut down their work hours significantly\"",
  "\"Boosted their productivity and workflow by 10x\"",
  "\"Access to a wide range of project options\"",
  "\"Editable AutoCAD files that save a ton of time\"",
  "\"Learned Vastu principles like seasoned professionals\"",
];

const bundles = [
  {
    title: "3,000+ 3D Elevation Designs",
    value: "₹799",
    img: "https://img.flexifunnels.com/images/4376/ChatGPTImageJun212026023224AM_vd7fq_1254.png",
    desc: "Fully detailed renders featuring furniture, realistic trees, cars, and premium lighting setups.",
  },
  {
    title: "10,000+ HOUSE PLANS",
    value: "₹2,999",
    img: "https://img.flexifunnels.com/images/4376/GeminiGeneratedImagelzq3b0lzq3b0lzq3_i2o78_1024.png",
    desc: "Ready-to-use AutoCAD & PDF layouts to kickstart any residential project instantly.",
  },
  {
    title: "5,000+ AUTOCAD BLOCKS",
    value: "₹999",
    img: "https://img.flexifunnels.com/images/4376/ChatGPTImageJun212026023204AM_jdpc9_1254.png",
    desc: "Pre-made blocks for homes, clinics, schools, and offices to slash your drafting time in half.",
  },
  {
    title: "2D Floor Plan Photoshop Course",
    value: "₹597",
    img: "https://img.flexifunnels.com/images/4376/ChatGPTImageJun212026023302AM_2fusl_1254.png",
    desc: "Transform raw CAD drawings into stunning, client-ready presentation plans.",
  },
  {
    title: "Working Drawings Pack (Electric, Plumbing, Structure & Permission)",
    value: "₹1,499",
    img: "https://img.flexifunnels.com/images/4376/ChatGPTImageJun212026023312AM_eiaoy_1254.png",
    desc: "Fully editable AutoCAD files covering crucial structural, plumbing, and electrical layouts.",
  },
  {
    title: "Premium SketchUp Course",
    value: "₹2,100",
    img: "https://img.flexifunnels.com/images/4376/ChatGPTImageJun212026023326AM_26r85_1254.png",
    desc: "Master 3D modeling and effortlessly bring your 2D plans to life.",
  },
];

const audience = [
  {
    img: "https://img.flexifunnels.com/images/4376/pngtreemeasurementengineerpngimage3265869_liaz3_1200.jpg",
    prefix: "🏠",
    title: "An Architect",
    desc: "Stop Designing From Scratch Every Time",
  },
  {
    img: "https://img.flexifunnels.com/images/4376/10293173_v9ilu_512.png",
    prefix: "📐",
    title: "A Civil Engineer",
    desc: "Get Ready CAD Files In Seconds",
  },
  {
    img: "https://img.flexifunnels.com/images/4376/pngclipartinteriordesignservicesbuildingcomputericonsdesignanglefurniturethumbnail_hs2ww_348.png",
    prefix: "🎨",
    title: "An Interior Designer",
    desc: "Impress Clients Faster",
  },
  {
    img: "https://img.flexifunnels.com/images/4376/5757029_l1vdy_512.png",
    prefix: "🛠️",
    title: "A Contractor Or Builder",
    desc: "Show Clients Real Plans Instantly",
  },
  {
    img: "https://img.flexifunnels.com/images/4376/pngtreevectormalestudenticonpngimage558751_2294c_360.png",
    prefix: "✏️",
    title: "A Drafting Student",
    desc: "Learn From 10,000+ Real Plans",
  },
  {
    img: "https://img.flexifunnels.com/images/4376/vastushastraarchitectureothers_4lzec_800.jpg",
    prefix: "🧭",
    title: "A Vastu Expert",
    desc: "Give Correct Vastu Advice With Proper Charts",
  },
];

export const metadata: Metadata = {
  title: "10,000+ Ready-Made House Plans, AutoCAD Files & Vastu Designs | NokriMitra",
  description:
    "Get 10,000+ ready-made house plans, AutoCAD files and Vastu designs in one bundle — just ₹149. Perfect for architects, civil engineers, interior designers and Vastu experts.",
};

export default function VastuAstroPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.attention}>
          🔥 ATTENTION: Architects, Civil Engineers, Interior Designers &amp; Vastu Experts
        </div>

        <h1 className={styles.headline}>
          Get <span className={styles.accent}>10,000+</span> Ready-Made House
          Plans, AutoCAD Files &amp; Vastu Designs Today, For{" "}
          <span className={styles.accent}>Just ₹149</span>
        </h1>

        <p className={styles.subtitle}>
          No more wasting hours searching the internet for CAD files. Everything
          you need is in ONE bundle.
        </p>

        <div className={styles.heroImageWrap}>
          <Image
            src={astroImg}
            alt="10,000+ House Plans, AutoCAD Files &amp; Vastu Designs Bundle"
            className={styles.heroImage}
            priority
          />
        </div>

        {/* Pricing + CTA */}
        <div className={styles.pricing}>
          <div className={styles.priceLine}>
            Regular Pricing - <strong>₹999</strong>
          </div>
          <div className={styles.priceLine}>
            Today&apos;s Pricing - <strong className={styles.accent}>₹149 Only</strong>
          </div>
          <div className={styles.delivery}>
            <strong>Delivered instantly</strong> on Email. No waiting!
          </div>

          <a className={styles.buyBtn} href="/vastu-plan-checkout">
            YES, I WANT THIS BUNDLE ₹149 ONLY
            <span className={styles.buySub}>85% OFF Limited Time Offer!</span>
          </a>

          <div className={styles.rating}>
            <span className={styles.star}>⭐</span>
            <strong>9.4/10 Rating</strong>
            <span className={styles.sep}>|</span>
            <strong>16,400+</strong> People Already Downloaded
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className={styles.whoSection}>
        <div className={styles.whoInner}>
          <h2 className={styles.whoTitle}>WHO IS THIS FOR</h2>
          <p className={styles.whoSub}>This Bundle Is Made For You If You Are:</p>

          <div className={styles.whoGrid}>
            {audience.map((a) => (
              <div className={styles.whoCard} key={a.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.img} alt={a.title} className={styles.whoImg} loading="lazy" />
                <h3 className={styles.whoName}>
                  <span className={styles.whoPrefix}>{a.prefix}</span> {a.title}
                </h3>
                <p className={styles.whoDesc}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className={styles.insideSection}>
        <div className={styles.insideInner}>
          <div className={styles.insideKicker}>
            EVERYTHING YOU&apos;LL NEED TO SUCCESSFULLY!
          </div>
          <h2 className={styles.insideTitle}>WHAT&apos;S INSIDE THE BUNDLE</h2>

          <div className={styles.bundleList}>
            {bundles.map((b) => (
              <div className={styles.bundleCard} key={b.title}>
                <div className={styles.bundleValue}>VALUE: {b.value}</div>
                <div className={styles.bundleHead}>{b.title}</div>

                <div className={styles.bundleBody}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.img}
                    alt={`${b.title} — Value ${b.value}`}
                    className={styles.bundleImg}
                    loading="lazy"
                  />
                  <p className={styles.bundleDesc}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.totalValue}>
            Total Real Value: <span className={styles.totalAccent}>₹8,993</span>
          </div>
          <div className={styles.todaysPricing}>Today At Special Pricing</div>

          <a
            className={styles.buyBtn}
            href="/vastu-plan-checkout"
            style={{ marginTop: 22 }}
          >
            YES, I WANT THIS BUNDLE ₹149 ONLY
            <span className={styles.buySub}>85% OFF Limited Time Offer!</span>
          </a>
        </div>
      </section>

      {/* REAL RESULTS (last) */}
      <section className={styles.resultsSection}>
        <div className={styles.resultsInner}>
          <div className={styles.resultsKicker}>REAL RESULTS</div>
          <h2 className={styles.resultsTitle}>
            What Users Are Experiencing
            <br /> With This Bundle <span aria-hidden="true">😍</span>
          </h2>

          <div className={styles.resultsList}>
            {results.map((r, i) => (
              <div className={styles.resultRow} key={r}>
                <span className={styles.resultNum}>{i + 1}</span>
                <div className={styles.resultBar}>
                  <span className={styles.resultText}>{r}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className={styles.whySection}>
        <div className={styles.whyInner}>
          <div className={styles.whyKicker}>WHY CHOOSE US</div>
          <h2 className={styles.whyMainTitle}>
            Stop Wasting Time Searching
            <br /> Scattered CAD Files on Google
          </h2>
          <p className={styles.whyMainSub}>
            See exactly what you get with us vs. random free downloads
          </p>

          <div className={styles.compareWrap}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th className={styles.thWhat}>What You Get</th>
                  <th className={styles.thUs}>
                    <span>US</span>
                    <span className={styles.bestValue}>BEST VALUE</span>
                  </th>
                  <th className={styles.thOthers}>Others</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((c) => (
                  <tr key={c}>
                    <td className={styles.tdWhat}>{c}</td>
                    <td className={styles.tdUs}>
                      <span className={styles.tickIcon} aria-hidden="true">
                        ✓
                      </span>
                    </td>
                    <td className={styles.tdOthers}>
                      <span className={styles.crossIcon} aria-hidden="true">
                        ✕
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={styles.whyOutro}>
            Stop wasting time searching scattered CAD files on Google.
            <br />
            <span className={styles.whyOutroAccent}>
              Get everything in one place — for just ₹149.
            </span>
          </p>
        </div>
      </section>

      {/* REAL BUYERS */}
      <section className={styles.buyersSection}>
        <div className={styles.buyersInner}>
          <div className={styles.buyersKicker}>REAL BUYERS</div>
          <h2 className={styles.buyersTitle}>What People Are Saying</h2>
          <p className={styles.buyersSub}>
            Genuine reviews from architects, engineers and designers like you
          </p>

          <div className={styles.reviewsGrid}>
            {reviews.map((r) => (
              <figure className={styles.reviewCard} key={r.name}>
                <div className={styles.reviewStars} aria-label={`${r.stars} stars`}>
                  {"★".repeat(r.stars)}
                  <span className={styles.starDim}>{"★".repeat(5 - r.stars)}</span>
                </div>
                <blockquote className={styles.reviewText}>{r.text}</blockquote>
                <figcaption className={styles.reviewer}>
                  <span className={styles.reviewerAvatar}>{r.initials}</span>
                  <span className={styles.reviewerInfo}>
                    <span className={styles.reviewerName}>{r.name}</span>
                    <span className={styles.reviewerRole}>{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL GIFTS / FREE BONUSES */}
      <section className={styles.bonusSection}>
        <div className={styles.bonusInner}>
          <h2 className={styles.bonusHead}>
            <span className={styles.giftIcon} aria-hidden="true">
              <svg viewBox="0 0 48 48" width="30" height="30">
                {/* ribbon top */}
                <path
                  className={styles.giftBow}
                  d="M24 16 C 22 8, 12 6, 12 12 C 12 16, 18 16, 24 16 M24 16 C 26 8, 36 6, 36 12 C 36 16, 30 16, 24 16"
                  fill="#ffffff"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* box body */}
                <rect
                  className={styles.giftBox}
                  x="8"
                  y="18"
                  width="32"
                  height="22"
                  rx="2"
                  fill="#f5c04b"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                {/* vertical ribbon */}
                <rect x="21" y="18" width="6" height="22" fill="#ffffff" />
                {/* horizontal ribbon */}
                <rect x="8" y="26" width="32" height="4" fill="#ffffff" />
              </svg>
            </span>
            Special Gifts!
          </h2>

          <div className={styles.bonusKicker}>FREE BONUSES</div>
          <h3 className={styles.bonusTitle}>
            Unlock <span className={styles.bonusRed}>6 Free Bonuses</span>
            <br />
            Worth <span className={styles.bonusRed}>₹4,295</span>
          </h3>
          <p className={styles.bonusSub}>
            These are not included anywhere else. Only with this bundle, only today.
          </p>

          <div className={styles.bonusGrid}>
            {bonuses.map((b, i) => (
              <div className={styles.bonusCard} key={b.title}>
                <span className={styles.bonusTag}>BONUS {i + 1}</span>
                <h4 className={styles.bonusName}>{b.title}</h4>
                <p className={styles.bonusDesc}>{b.desc}</p>
                <div className={styles.bonusFooter}>
                  <span className={styles.bonusValueLabel}>Value</span>
                  <span className={styles.bonusValueAmt}>{b.value}</span>
                  <span className={styles.bonusFree}>FREE</span>
                </div>
              </div>
            ))}
          </div>

          <a
            className={styles.buyBtn}
            href="/vastu-plan-checkout"
            style={{ marginTop: 40, maxWidth: 640 }}
          >
            YES, I WANT THIS BUNDLE ₹149 ONLY
            <span className={styles.buySub}>85% OFF Limited Time Offer!</span>
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.stepsSection}>
        <div className={styles.stepsInner}>
          <h2 className={styles.stepsTitle}>
            HOW IT WORKS?
            <br /> 3 SIMPLE STEPS
          </h2>

          <div className={styles.stepsGrid}>
            {steps.map((s, i) => (
              <div className={styles.stepCol} key={s.title}>
                <span className={styles.stepBadge}>{i + 1}</span>
                <h3 className={styles.stepName}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>

                {i < steps.length - 1 && (
                  <div className={styles.stepArrow} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
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

      {/* FINAL CTA */}
      <section className={styles.finalSection}>
        <div className={styles.finalInner}>
          <div className={styles.finalRating}>
            <span className={styles.star}>⭐</span>
            <strong>9.4/10 Rating</strong>
            <span className={styles.sep}>|</span>
            <strong>16,400+</strong> People Already Downloaded
          </div>

          <p className={styles.finalText}>
            Right now you can get the entire bundle: 10,000+ house plans, 5,000+
            AutoCAD blocks, 3,000+ elevations, Vastu files and 3 premium courses
          </p>

          <div className={styles.finalPrice}>
            For Just <span className={styles.accent}>₹149/-</span>
          </div>

          <div className={styles.finalImageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://img.flexifunnels.com/images/4376/ChatGPTImageJun212026072402AM_fa4fo_1149.png"
              alt="Complete House Plans, AutoCAD Files &amp; Vastu Designs Bundle"
              className={styles.finalImage}
              loading="lazy"
            />
          </div>

          <a
            className={styles.buyBtn}
            href="/vastu-plan-checkout"
            style={{ maxWidth: 640 }}
          >
            YES, I WANT THIS BUNDLE ₹149 ONLY
            <span className={styles.buySub}>85% OFF Limited Time Offer!</span>
          </a>
        </div>
      </section>

      <VastuFooter />

      <StickyBuyBar />
    </div>
  );
}
