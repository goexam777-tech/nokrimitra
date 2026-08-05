import Image from "next/image";
import {
  ArrowRight,
  BatteryCharging,
  BookOpenText,
  Check,
  ChevronRight,
  Download,
  FileText,
  Gauge,
  GraduationCap,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  WalletCards,
  Wrench,
  Zap,
} from "lucide-react";

import coverImg from "@/public/evguide.webp";
import shot1 from "@/public/Screenshot1.webp";
import shot2 from "@/public/Screenshot2.webp";
import shot3 from "@/public/Screenshot3.webp";
import shot4 from "@/public/Screenshot4.webp";
import shot5 from "@/public/Screenshot5.webp";
import styles from "./scooter.module.css";

const pdfShots = [
  { src: shot1, alt: "Guide के अंदर का page — 1" },
  { src: shot2, alt: "Guide के अंदर का page — 2" },
  { src: shot3, alt: "Guide के अंदर का page — 3" },
  { src: shot4, alt: "Guide के अंदर का page — 4" },
  { src: shot5, alt: "Guide के अंदर का page — 5" },
];

const CHECKOUT = "/electric-scooter-repairing/checkout";
const PRICE = 128;

const heroPoints = [
  "Battery, BMS, BLDC Motor और Controller की साफ़ समझ",
  "Wiring और multimeter testing का practical तरीका",
  "Fault finding, error codes और maintenance guidance",
];

const problems = [
  "Scooter start नहीं हो रही",
  "Battery charge नहीं हो रही",
  "Range पहले से कम हो गई",
  "Motor में आवाज़ या jerking है",
  "Charger काम नहीं कर रहा",
  "Display पर error code आ रहा है",
];

const chapters = [
  {
    no: "01",
    title: "EV System और Safety की शुरुआत",
    desc: "Scooter का power flow, ज़रूरी tools और काम शुरू करने से पहले की safety समझें।",
    topics: "Power flow · Tool list · Safety basics",
  },
  {
    no: "02",
    title: "Battery Pack और BMS",
    desc: "Cell voltage, charging fault, balancing और BMS की basic checking सीखें।",
    topics: "Cell voltage · Balancing · Charging faults",
  },
  {
    no: "03",
    title: "BLDC Motor और Hall Sensor",
    desc: "Phase wires, hall signals, motor noise और common motor faults को समझें।",
    topics: "Phase wires · Hall test · Motor faults",
  },
  {
    no: "04",
    title: "Controller और Wiring",
    desc: "Controller के input-output, connectors और wiring path को क्रम से जाँचें।",
    topics: "Controller signals · Connectors · Wiring diagram",
  },
  {
    no: "05",
    title: "Throttle, Brake और Charger",
    desc: "Throttle voltage, brake cut-off sensor और charger की working व testing समझें।",
    topics: "Throttle test · Brake sensor · Charger check",
  },
  {
    no: "06",
    title: "Fault Finding और Maintenance",
    desc: "लक्षण देखकर अंदाज़ा लगाने की जगह step-by-step diagnosis और care routine अपनाएँ।",
    topics: "Error codes · Diagnosis flow · Maintenance",
  },
];

const process = [
  { title: "लक्षण पहचानें", text: "समस्या कब और कैसे आती है, पहले उसे ठीक से note करें।" },
  { title: "सही point जाँचें", text: "Wiring, voltage और signal को practical क्रम में test करें।" },
  { title: "Fault अलग करें", text: "बिना वजह part बदलने से पहले possible cause को isolate करें।" },
  { title: "सुरक्षित action लें", text: "अपनी skill के अनुसार repair करें या technician की मदद लें।" },
];

const audience = [
  "Electric Scooter Owners",
  "Garage Owners",
  "ITI Students",
  "Repairing Beginners",
  "Home Mechanics",
  "EV Enthusiasts",
];

const faqs = [
  {
    q: "क्या यह guide बिल्कुल beginner भी समझ सकता है?",
    a: "हाँ। विषय basics से शुरू किए गए हैं और हिंदी में practical क्रम से समझाए गए हैं। फिर भी battery pack और high-current circuit पर काम करते समय safety knowledge ज़रूरी है।",
  },
  {
    q: "Payment के बाद PDF कैसे मिलेगी?",
    a: "Successful payment के बाद download button स्क्रीन पर मिलता है। Download link आपके दिए गए email address पर भी भेजा जाता है।",
  },
  {
    q: "क्या PDF मोबाइल पर पढ़ सकते हैं?",
    a: "हाँ। PDF को mobile, tablet या computer पर पढ़ सकते हैं। ज़रूरत हो तो उपयोगी pages print भी किए जा सकते हैं।",
  },
  {
    q: "इसमें कौन-कौन से topics शामिल हैं?",
    a: "Battery और BMS से लेकर BLDC motor, controller, wiring, throttle, hall sensor, brake sensor, charger, error codes, fault finding और maintenance तक के मुख्य topics शामिल हैं।",
  },
  {
    q: "Payment के कौन-से options मिलेंगे?",
    a: "Razorpay checkout पर उपलब्ध UPI, debit/credit card और net banking options से ₹128 का one-time payment किया जा सकता है।",
  },
  {
    q: "Download में परेशानी आए तो क्या करें?",
    a: "अपने payment/order details के साथ WhatsApp पर +91 91048 26422 पर message करें।",
  },
];

export default function ElectricScooterRepairingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <a className={styles.brand} href="#top" aria-label="NokriMitra home">
            <span className={styles.brandMark}><Zap size={17} /></span>
            <span>NokriMitra</span>
          </a>
          <a className={styles.headerBuy} href={CHECKOUT}>
            Guide खरीदें <span>₹{PRICE}</span>
            <ArrowRight size={17} />
          </a>
        </div>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroVisual}>
                <div className={styles.coverFrame}>
                  <span className={styles.manualTab}>HINDI PDF GUIDE</span>
                  <Image
                    src={coverImg}
                    alt="Electric Scooter Repairing Complete Practical Guide की Hindi PDF cover"
                    className={styles.coverImage}
                    priority
                    sizes="(max-width: 767px) 88vw, 430px"
                  />
                </div>
                <div className={styles.coverNote}>
                  <FileText size={18} />
                  <span>
                    <strong>EV Scooter Repair Guide (Hindi)</strong>
                  </span>
                </div>
              </div>

              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>इलेक्ट्रिक स्कूटर की practical handbook</p>
                <h1>
                  खराबी का अंदाज़ा नहीं,
                  <span>सही जाँच करना सीखें।</span>
                </h1>
                <p className={styles.heroLead}>
                  <strong>Electric Scooter Repairing Complete Practical Guide</strong> — Battery से
                  Controller तक, ज़रूरी concepts और fault finding आसान हिंदी में।
                </p>

                <ul className={styles.heroPoints}>
                  {heroPoints.map((point) => (
                    <li key={point}><Check size={18} /><span>{point}</span></li>
                  ))}
                </ul>

                <div className={styles.offerBox}>
                  <div className={styles.offerTop}>
                    <div>
                      <span className={styles.offerLabel}>पूरी Hindi PDF Guide</span>
                      <div className={styles.price}>₹{PRICE}</div>
                    </div>
                    <span className={styles.oneTime}>एक बार payment</span>
                  </div>
                  <a className={styles.primaryCta} href={CHECKOUT}>
                    <Download size={20} />
                    अभी PDF Download करें
                    <ArrowRight size={20} />
                  </a>
                  <p className={styles.paymentLine}>
                    <LockKeyhole size={15} /> Razorpay secure checkout · UPI · Cards · Net Banking
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.quickFacts} aria-label="Product delivery details">
              <div><Download size={19} /><span><strong>तुरंत access</strong>Payment के बाद</span></div>
              <div><Mail size={19} /><span><strong>Email delivery</strong>Link email पर भी</span></div>
              <div><Smartphone size={19} /><span><strong>किसी भी device पर</strong>Mobile, tablet, laptop</span></div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.narrowContainer}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionIndex}>01 / आम समस्याएँ</p>
              <h2>Problem दिखती है, पर fault कहाँ है?</h2>
              <p>
                Electric scooter में एक ही symptom के पीछे कई कारण हो सकते हैं। Guide आपको
                parts को समझकर जाँच का सही क्रम बनाने में मदद करती है।
              </p>
            </div>

            <ul className={styles.problemList}>
              {problems.map((problem, index) => (
                <li key={problem}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{problem}</p>
                  <ChevronRight size={18} aria-hidden="true" />
                </li>
              ))}
            </ul>

            <div className={styles.diagnosisNote}>
              <Gauge size={25} />
              <div>
                <strong>इस Guide का focus “part बदलो” नहीं, “fault समझो” है।</strong>
                <p>System की working समझें, फिर symptom के अनुसार testing point चुनें।</p>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.manualSection}`}>
          <div className={styles.container}>
            <div className={styles.manualGrid}>
              <div className={styles.manualIntro}>
                <p className={styles.sectionIndex}>02 / Guide के अंदर</p>
                <h2>एक reference manual, जिसे काम करते समय खोल सकें।</h2>
                <p>
                  Topics को practical sequence में रखा गया है—पहले system की समझ, फिर
                  component testing और आखिर में fault finding।
                </p>
                <div className={styles.manualSummary}>
                  <BookOpenText size={22} />
                  <span>Basics से troubleshooting तक एक ही Hindi PDF में</span>
                </div>
              </div>

              <div className={styles.chapterList}>
                {chapters.map((chapter) => (
                  <article className={styles.chapter} key={chapter.no}>
                    <span className={styles.chapterNo}>{chapter.no}</span>
                    <div>
                      <h3>{chapter.title}</h3>
                      <p>{chapter.desc}</p>
                      <small>{chapter.topics}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.shotSection} aria-label="Guide के pages के screenshots">
          <div className={styles.shotMarquee}>
            <div className={styles.shotTrack}>
              {[...pdfShots, ...pdfShots].map((shot, i) => (
                <figure className={styles.shot} key={`${shot.alt}-${i}`}>
                  <Image
                    src={shot.src}
                    alt={i < pdfShots.length ? shot.alt : ""}
                    aria-hidden={i >= pdfShots.length}
                    className={styles.shotImg}
                    sizes="(max-width: 600px) 72vw, 260px"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionIndex}>03 / Practical approach</p>
              <h2>Repairing सीखने का सही क्रम</h2>
              <p>बिना planning के wire खोलने या part बदलने की जगह एक repeatable process अपनाएँ।</p>
            </div>

            <ol className={styles.processList}>
              {process.map((item, index) => (
                <li key={item.title}>
                  <span className={styles.processNo}>{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${styles.section} ${styles.audienceSection}`}>
          <div className={styles.container}>
            <div className={styles.audienceGrid}>
              <div>
                <p className={styles.sectionIndex}>04 / किसके लिए उपयोगी</p>
                <h2>सीखना शुरू कर रहे हों या workshop में काम करते हों।</h2>
                <p>
                  यह कोई advanced engineering textbook नहीं है। यह उन लोगों के लिए practical
                  Hindi guide है जो scooter के systems को व्यवस्थित तरीके से समझना चाहते हैं।
                </p>
              </div>
              <ul className={styles.audienceList}>
                {audience.map((item) => <li key={item}><Check size={17} />{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.deliverySection}>
          <div className={styles.container}>
            <div className={styles.deliveryHeading}>
              <p>खरीदने के बाद क्या होगा?</p>
              <h2>Simple payment. सीधी delivery.</h2>
            </div>
            <div className={styles.deliverySteps}>
              <article>
                <span><WalletCards size={21} /></span>
                <div><small>STEP 01</small><h3>Secure payment</h3><p>Razorpay पर ₹{PRICE} का one-time payment करें।</p></div>
              </article>
              <article>
                <span><Download size={21} /></span>
                <div><small>STEP 02</small><h3>तुरंत download</h3><p>Successful payment के बाद download button मिलेगा।</p></div>
              </article>
              <article>
                <span><Mail size={21} /></span>
                <div><small>STEP 03</small><h3>Email पर link</h3><p>Guide का link आपके दिए गए email पर भी भेजा जाएगा।</p></div>
              </article>
            </div>
            <div className={styles.deliveryTrust}>
              <ShieldCheck size={18} /> Secure payment
              <span>•</span> Digital PDF
              <span>•</span> Lifetime access
              <span>•</span> WhatsApp support
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.faqGrid}>
              <aside className={styles.faqIntro}>
                <p className={styles.sectionIndex}>05 / सवाल-जवाब</p>
                <h2>खरीदने से पहले जान लें</h2>
                <p>
                  नीचे guide, payment और delivery से जुड़े सामान्य सवालों के जवाब दिए गए हैं।
                </p>
              </aside>
              <div className={styles.faqList}>
                {faqs.map((faq, index) => (
                  <details key={faq.q} className={styles.faq} open={index === 0}>
                    <summary>{faq.q}<span aria-hidden="true">+</span></summary>
                    <p>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.safetySection}>
          <div className={styles.narrowContainer}>
            <div className={styles.safetyBox}>
              <TriangleAlert size={25} />
              <div>
                <h2>Safety पहले, repairing बाद में</h2>
                <p>
                  यह guide educational purpose के लिए है। Battery pack और high-current circuits
                  खतरनाक हो सकते हैं। Battery swelling, spark, unusual smell या uncertain fault की
                  स्थिति में काम रोकें और qualified technician अथवा authorised service centre की मदद लें।
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.finalSection}>
          <div className={styles.container}>
            <div className={styles.finalPanel}>
              <div>
                <p className={styles.finalEyebrow}>Electric Scooter Repairing — Hindi PDF</p>
                <h2>अपनी learning को सही direction से शुरू करें।</h2>
                <p>पूरी practical guide अभी पाएँ—एक बार payment, तुरंत digital access।</p>
              </div>
              <div className={styles.finalOffer}>
                <span>आज की कीमत</span>
                <strong>₹{PRICE}</strong>
                <a href={CHECKOUT}>Guide खरीदें <ArrowRight size={19} /></a>
                <small><LockKeyhole size={13} /> Secure Razorpay payment</small>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <div>
            <span className={styles.footerBrand}><Zap size={16} /> NokriMitra</span>
            <p>Digital learning resources</p>
          </div>
          <nav aria-label="Legal links">
            <a href="/electric-scooter-repairing/privacy-policy">Privacy</a>
            <a href="/electric-scooter-repairing/refund-policy">Refund</a>
            <a href="/electric-scooter-repairing/terms">Terms</a>
            <a href="/electric-scooter-repairing/disclaimer">Disclaimer</a>
          </nav>
          <p>© {new Date().getFullYear()} NokriMitra</p>
        </div>
      </footer>

      <div className={styles.stickyBar}>
        <a className={styles.stickyBuy} href={CHECKOUT}>
          <Download size={19} />
          अभी Download करें — सिर्फ ₹{PRICE}
        </a>
      </div>
    </div>
  );
}
