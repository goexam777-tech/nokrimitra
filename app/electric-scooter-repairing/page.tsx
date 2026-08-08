import Image, { type StaticImageData } from "next/image";
import {
  ArrowRight,
  BatteryCharging,
  BookOpen,
  Bike,
  Check,
  ChevronRight,
  Download,
  Gauge,
  Image as ImageIcon,
  Languages,
  ListChecks,
  LockKeyhole,
  ShieldCheck,
  ScrollText,
  Stethoscope,
  Store,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

import ctaImg from "@/public/evcta.webp";
import everythingImg from "@/public/ev.jpg";
import heroImg from "@/public/evhero.jpg";
import acDiagnose from "@/public/ev_diagnose_multimeter.webp";
import acMotor from "@/public/ev_motor_repair.webp";
import acBms from "@/public/ev_bms_testing.webp";
import acCustomer from "@/public/ev_happy_customer.webp";
import acExpert from "@/public/ev_expert_standing.webp";
import reviewerRamesh from "@/public/rahul-patel.webp";
import reviewerRajesh from "@/public/manish.jpg";
import reviewerVikram from "@/public/jayesh.jpg";
import reviewerDeepak from "@/public/vipul.jpg";
import sample1 from "@/public/ev_sample_1.webp";
import sample2 from "@/public/ev_sample_2.webp";
import sample3 from "@/public/ev_sample_3.webp";
import sample4 from "@/public/ev_sample_4.webp";
import sample5 from "@/public/ev_sample_5.webp";
import sample6 from "@/public/ev_sample_6.webp";
import { ESCOOTER_CATALOG } from "@/lib/escooterCatalog";
import AudienceAccordion from "./AudienceAccordion";
import BundleTimer from "./BundleTimer";
import FaqAccordion from "./FaqAccordion";
import SampleHighlights from "./SampleHighlights";
import styles from "./scooter.module.css";

const CHECKOUT = "/electric-scooter-repairing/checkout";
const PRICE = ESCOOTER_CATALOG.price;
const MRP = 1999;
const SAVING = Math.round(((MRP - PRICE) / MRP) * 100);

const bundleCards = [
  { icon: BookOpen, title: ESCOOTER_CATALOG.books[0].title },
  { icon: Bike, title: ESCOOTER_CATALOG.books[1].title },
  { icon: Stethoscope, title: ESCOOTER_CATALOG.books[2].title },
  { icon: BatteryCharging, title: "Lithium Battery & BMS Repair" },
  { icon: Wrench, title: "100% Practical EV Skill Book" },
  { icon: Languages, title: "Hindi & English Both Included" },
];

const everything = [
  {
    title: "180+ Custom Diagnostic Recipes",
    text: "The ultimate lookup directory of 180+ step-by-step diagnostic recipes for dead, grinding, or range-drop issues.",
  },
  {
    title: "BLDC Motor & Hall Sensor Testing",
    text: "Learn the exact multimeter test values to locate faulty sensors in 5 minutes.",
  },
  {
    title: "Lithium Battery & BMS Repair",
    text: "Understand cell balancing, BMS wiring, and under-voltage protection troubleshooting.",
  },
  {
    title: "E-Bike Conversion Guide",
    text: "Step-by-step manual to convert any normal bicycle to electric and fix hub motors.",
  },
  {
    title: "EV Technician's Diagnostic Toolkit",
    text: "Printable multimeter checkpoints, throttle voltage cards, and sourcing directory.",
  },
  {
    title: "Error Code Lookup Directory",
    text: "Easily identify display error codes E-01 to E-06 and execute fixes fast.",
  },
  {
    title: "Available in Hindi & English",
    text: "All 3 guides in Hindi & English for easy understanding.",
  },
];

const audience = [
  {
    who: "EV Mechanics & Garage Technicians",
    text: "If electric scooters are coming into your workshop and you're unsure about BLDC motors, BMS cell balancing, or throttle diagnostics, this bundle gives you the exact step-by-step procedures to fix them confidently.",
  },
  {
    who: "Engineering Students & ITI Trainees",
    text: "Get ahead of your batch: learn real-world electric scooter repairs, battery pack balancing, and controller wiring that your college won't teach you. Available in Hindi & English so nothing gets lost in translation.",
  },
  {
    who: "Garage Owners & EV Workshop Managers",
    text: "Put your whole team on one standard process, the same test points, the same expected voltages, the same checklist. Fewer wrong part replacements and faster job turnaround.",
  },
  {
    who: "Mechanics Tired of Guessing on EV Faults",
    text: "Stop swapping parts to find a fault. Follow the symptom to the exact test point, confirm it with a multimeter reading, then repair with confidence.",
  },
];

const testimonials: {
  quote: string;
  name: string;
  role: string;
  photo?: StaticImageData;
}[] = [
  {
    quote:
      "Electric scooters were coming into my shop with dead batteries and motor grinding issues. After reading this guide I traced a BMS fault in 10 minutes. Extremely useful handbook.",
    name: "Ramesh Kumar",
    role: "EV Technician, Lucknow",
    photo: reviewerRamesh,
  },
  {
    quote:
      "The multimeter voltage charts for throttle and hall sensors saved me hours of debugging. Now I know exactly what readings to expect on the shop floor.",
    name: "Rajesh Sharma",
    role: "Workshop Owner, Jaipur",
    photo: reviewerRajesh,
  },
  {
    quote:
      "I'm an ITI student and this is the most practical EV resource I've found. The bilingual Hinglish explanations made controller wiring easy to follow.",
    name: "Anand Patel",
    role: "ITI Student, Surat",
  },
  {
    quote:
      "Earlier I sent electric bicycles to authorised dealerships for motor repairs. Now I handle them in-house, and the e-bike conversion guide has added a solid extra revenue stream.",
    name: "Sandeep Yadav",
    role: "Garage Owner, Indore",
  },
  {
    quote:
      "The battery cell balancing section is brilliant. Cell grouping and manual balancing are explained in very simple language. I fixed a range-drop fault on a local scooter within an hour.",
    name: "Vikram Singh",
    role: "Senior EV Technician, Delhi",
    photo: reviewerVikram,
  },
  {
    quote: `At just ₹${PRICE} this bundle is a no-brainer. The diagnostic multimeter checkpoint table is printed and stuck on my workbench wall. Troubleshooting is much faster now.`,
    name: "Deepak Rao",
    role: "Independent EV Mechanic, Chennai",
    photo: reviewerDeepak,
  },
];

const forYou = [
  "You are a technician or student struggling to diagnose electric scooter controller and BMS faults.",
  "You want step-by-step sensor testing values, battery balancing steps, and display error code fixes in one place.",
  `You want professional-grade EV repair knowledge in Hindi & English at just ₹${PRICE}, less than the cost of one wrong spare-part replacement.`,
];

const problems = [
  "Display showing Error 01 to Error 06 and no idea where to start diagnosing.",
  "Motor vibrates or locks up and makes a loud grinding noise.",
  "No idea what multimeter voltages are normal vs faulty on throttle and hall sensors.",
  "BMS shuts down the battery pack after a few kilometres of riding.",
  "Sending electric vehicles to dealership service centres and losing job revenue.",
  "Drowning in YouTube videos with no structured, printable reference.",
];

const solutions = [
  "180+ step-by-step diagnostic recipes: diagnose any fault in under 15 minutes.",
  "Step-by-step BLDC motor hall sensor and coil testing values.",
  "Exact expected multimeter voltages for throttle and battery BMS terminals.",
  "Complete e-bike conversion guide: convert any cycle to EV and repair hub motors.",
  "Handle EV repair jobs in-house and stop losing revenue to company service centres.",
  "3 structured handbooks in Hindi & English, always ready on your workbench.",
];

const achievements: { title: string; src?: StaticImageData }[] = [
  { title: "Faster EV Fault Diagnosis", src: acDiagnose },
  { title: "Confident Motor Repairs", src: acMotor },
  { title: "Master BMS Balancing", src: acBms },
  { title: "Stop Losing Revenue to Company Dealers", src: acCustomer },
  { title: "Become the EV Expert", src: acExpert },
];

const faqs = [
  {
    q: "What exactly is inside the Electric Scooter Repairing Masterclass bundle?",
    a: "This is a complete 3-book digital bundle containing 'The Ultimate Electric Scooter Repair Masterclass' (Main Guide containing 180+ diagnostic recipes), 'The E-Bike Conversion & Repair Guide' (Bonus 1), and 'The EV Technician's Quick Diagnostic Toolkit' (Bonus 2). All guides are available in both Hindi and English.",
  },
  {
    q: "Is this guide suitable for beginners?",
    a: "Yes. The topics start from the basics, power flow, tools and safety, and then move to component testing and fault finding. Prior electronics experience helps but is not required. Basic safety knowledge is essential because battery packs carry high current.",
  },
  {
    q: "How will I receive the books after payment?",
    a: "As soon as your Razorpay payment is verified, a protected download link appears on the thank-you screen, and the same link is sent to the email address you entered at checkout.",
  },
  {
    q: "What is covered under the battery balancing section?",
    a: "Cell grouping, measuring individual group voltages, spotting an unbalanced group, manual balancing steps, and how the BMS protection behaves during undervoltage and range-drop faults.",
  },
];

const bundleStats = [
  { icon: BookOpen, text: "3 Expert Handbooks" },
  { icon: Languages, text: "Hindi & English Versions Included" },
  { icon: ListChecks, text: "180+ Recipes" },
  { icon: Users, text: "2,000+ Technicians Trained" },
];

const samples = [
  { src: sample1, alt: "Sample page from the bundle: 1" },
  { src: sample2, alt: "Sample page from the bundle: 2" },
  { src: sample3, alt: "Sample page from the bundle: 3" },
  { src: sample4, alt: "Sample page from the bundle: 4" },
  { src: sample5, alt: "Sample page from the bundle: 5" },
  { src: sample6, alt: "Sample page from the bundle: 6" },
];

const included = [
  {
    icon: BookOpen,
    text: "Book 1: The Ultimate Electric Scooter Repair Masterclass (Main Guide, 180+ Recipes)",
  },
  {
    icon: Bike,
    text: "Book 2: The E-Bike Conversion & Repair Guide (Bonus Guide 1)",
  },
  {
    icon: Stethoscope,
    text: "Book 3: The EV Technician's Quick Diagnostic Toolkit (Bonus Guide 2)",
  },
  {
    icon: Gauge,
    text: "Multimeter Reference Checkpoints & Expected Voltages (Appendix)",
  },
  {
    icon: Store,
    text: "Wholesale EV Spare Parts Importers & Supplier Directory",
  },
  {
    icon: Languages,
    text: "All 3 handbooks available in both Hindi & English",
  },
  {
    icon: ScrollText,
    text: "Instant digital access after payment, on any device",
  },
];

export default function ElectricScooterRepairingPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.page}>
        <div className={styles.container}>
          <div className={styles.heroCopy}>
            <p className={styles.proof}>
              &quot; 2,000 + EV technicians &amp; students are already using
              this, now it&apos;s your turn to master Electric Scooter systems
              📍 &quot;
            </p>

            <h1 className={styles.title}>
              &quot;Fix Any <span className={styles.mark}>Electric Scooter</span>{" "}
              Fault in <em>15 Minutes</em>&quot;
            </h1>

            <p className={styles.subtitle}>
              Complete 3-Book Digital Bundle: Main Guide + E-Bike Conversion +
              Quick Diagnostic Toolkit
            </p>

            <p className={styles.lead}>
              Master electric scooter repairs with step-by-step diagnostic
              recipes, BLDC motor wiring diagrams, battery BMS testing, and a
              common error code lookup sheet, available in Hindi &amp; English
              at just ₹{PRICE}!
            </p>
          </div>
        </div>
      </section>

      <section className={styles.inside}>
        <div className={`${styles.container} ${styles.insideGrid}`}>
          <div className={styles.mediaCol}>
            <div className={styles.mediaCard}>
              <Image
                src={heroImg}
                alt="EV technician diagnosing an electric scooter fault"
                className={styles.bundleImg}
                sizes="(max-width: 900px) 88vw, 430px"
                priority
              />
            </div>

            <div className={styles.timerBox}>
              <p className={styles.timerLabel}>⚠️ Price Goes Up In</p>
              <BundleTimer />
            </div>
          </div>

          <div className={styles.infoCol}>
            <h2 className={styles.insideTitle}>
              What&apos;s Inside the Electric Scooter Repairing Masterclass
              Bundle?
            </h2>

            <p className={styles.rating}>
              <span className={styles.stars} aria-hidden="true">
                ★★★★★
              </span>
              2000+ EV Technicians &amp; Students (500+ Reviews)
            </p>

            <div className={styles.priceRow}>
              <s>₹{MRP.toLocaleString("en-IN")}</s>
              <strong>₹{PRICE}</strong>
              <span className={styles.saveBadge}>
                incl. GST · You save {SAVING}%
              </span>
            </div>

            <ul className={styles.itemList}>
              {included.map(({ icon: Icon, text }) => (
                <li key={text}>
                  <Icon size={19} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className={styles.priceFoot}>
              <strong>₹{PRICE}</strong>
              <s>₹{MRP.toLocaleString("en-IN")}</s>
            </div>

            <div className={styles.buyBtnWrap}>
              <a className={styles.buyBtn} href={CHECKOUT}>
                Get My Electric Scooter Repair Bundle Now
                <ArrowRight size={19} />
              </a>

              <p className={styles.secureLine}>
                <LockKeyhole size={15} />
                Secure Razorpay checkout · UPI, Card &amp; Net Banking
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sampleSection}>
        <div className={styles.container}>
          <h2 className={styles.sampleTitle}>Sample Highlights</h2>
        </div>
        <SampleHighlights samples={samples} />
      </section>

      <section className={styles.bundleSection}>
        <div className={styles.container}>
          <h2 className={styles.bundleTitle}>What&apos;s Inside Your Bundle</h2>
          <p className={styles.bundleSub}>
            The Electric Scooter Repairing Masterclass — 3 Expert Handbooks
          </p>

          <div className={styles.bookGrid}>
            {bundleCards.map(({ icon: Icon, title }) => (
              <article key={title}>
                <Icon size={20} aria-hidden="true" />
                <h3>{title}</h3>
              </article>
            ))}
          </div>

          <ul className={styles.statStrip}>
            {bundleStats.map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon size={17} aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.advSection}>
        <div className={styles.container}>
          <h2 className={styles.advTitle}>
            Give your workshop the <em>unfair advantage</em>{" "}
            with India&apos;s most complete Electric Scooter Repair resource.
          </h2>
          <p className={styles.advSub}>
            Don&apos;t lose customers to guesswork, become the{" "}
            <em>EV expert</em> in your area today!
          </p>

          <div className={styles.advGrid}>
            <div className={styles.advVisual}>
              <Image
                src={everythingImg}
                alt="Everything you'll get in the Electric Scooter Repair bundle"
                sizes="(max-width: 900px) 94vw, 500px"
              />
            </div>

            <ul className={styles.advList}>
              {everything.map((item) => (
                <li key={item.title}>
                  <span className={styles.advBullet}>
                    <ChevronRight size={13} aria-hidden="true" />
                  </span>
                  <p>
                    <strong>{item.title}</strong> {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.whoSection}>
        <div className={styles.container}>
          <h2 className={styles.whoTitle}>Who Should Buy This Bundle?</h2>

          <AudienceAccordion items={audience} />

          <div className={styles.ctaCard}>
            <p className={styles.ctaNormal}>
              Normal Price: <s>₹{MRP.toLocaleString("en-IN")}/-</s>
            </p>
            <p className={styles.ctaBuy}>Buy Today At Just ₹{PRICE}/-</p>

            <a className={styles.ctaBtn} href={CHECKOUT}>
              Get My Electric Scooter Masterclass Now
              <ArrowRight size={19} aria-hidden="true" />
            </a>

            <p className={styles.ctaFine}>
              Limited time offer · ₹{PRICE}/- incl. GST · Instant digital access
            </p>
          </div>
        </div>
      </section>

      <section className={styles.tSection}>
        <div className={styles.container}>
          <h2 className={styles.tTitle}>Testimonials</h2>
          <p className={styles.tSub}>
            What EV Technicians &amp; Students Say About This Bundle
          </p>

          <div className={styles.tGrid}>
            {testimonials.map((item) => (
              <figure key={item.name}>
                <span className={styles.tMark} aria-hidden="true">
                  &ldquo;
                </span>

                <figcaption>
                  {item.photo ? (
                    <Image
                      src={item.photo}
                      alt={item.name}
                      className={styles.tPhoto}
                      sizes="42px"
                    />
                  ) : (
                    <span className={styles.tAvatar} aria-hidden="true">
                      {item.name.charAt(0)}
                    </span>
                  )}
                  <span className={styles.tWho}>
                    <strong>{item.name}</strong>
                    <small>{item.role}</small>
                  </span>
                </figcaption>

                <span className={styles.tStars} aria-label="Rated 5 out of 5">
                  ★★★★★
                </span>
                <blockquote>{item.quote}</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.qSection}>
        <div className={styles.container}>
          <div className={styles.qHead}>
            <span className={styles.qBadge} aria-hidden="true">
              Q
            </span>
            <h2 className={styles.qTitle}>
              &quot;Is this Bundle for me?&quot;
            </h2>
          </div>

          <p className={styles.qAnswer}>
            <span>A</span> Yes, if any of these sound like you.
          </p>

          <ol className={styles.qGrid}>
            {forYou.map((point, index) => (
              <li key={point}>
                <span className={styles.qNum}>0{index + 1}</span>
                <p>{point}</p>
                <Check size={17} className={styles.qCheck} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.psSection}>
        <div className={styles.container}>
          <h2 className={styles.psTitle}>
            What&apos;s Blocking You, and the Way Out
          </h2>
          <p className={styles.psLead}>
            From guesswork on the workbench to a repeatable diagnostic process.
          </p>

          <div className={styles.psCols}>
            <div className={styles.psCol}>
              <h3 className={styles.psColHeadBad}>Problem</h3>
              <ul>
                {problems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.psCol}>
              <h3 className={styles.psColHeadGood}>Solution</h3>
              <ul>
                {solutions.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a className={styles.psBtn} href={CHECKOUT}>
            Solve These Problems Now · Get Bundle at ₹{PRICE}/-
          </a>
        </div>
      </section>

      <section className={styles.acSection}>
        <div className={styles.container}>
          <h2 className={styles.acTitle}>
            What You&apos;ll Achieve as an EV Expert
          </h2>

          <div className={styles.acGrid}>
            {achievements.map((item, index) => (
              <article key={item.title}>
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.title}
                    className={styles.acImg}
                    sizes="(max-width: 700px) 46vw, 220px"
                  />
                ) : (
                  <span className={styles.acPlaceholder} aria-hidden="true">
                    <ImageIcon size={26} />
                  </span>
                )}

                <span className={styles.acNum} aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gtSection}>
        <div className={styles.gtInner}>
          <span className={styles.gtIcon}>
            <ShieldCheck size={26} aria-hidden="true" />
          </span>

          <h2 className={styles.gtTitle}>100% Instant Delivery Guarantee!</h2>

          <p className={styles.gtText}>
            Receive your product directly to your email within moments of
            purchase. Enjoy immediate access, hassle-free! If any issues arise,
            email us on{" "}
            <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a> for
            swift resolution. Your satisfaction is our priority. Shop
            confidently with us!
          </p>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.finalPanel}>
          <span className={styles.finalBadge}>
            <Zap size={14} aria-hidden="true" />
            Limited time offer · Save {SAVING}%
          </span>

          <h2 className={styles.finalTitle}>
            Start fixing EV faults with <em>confidence</em> today.
          </h2>
          <p className={styles.finalLead}>
            All 3 handbooks, 180+ diagnostic procedures, BLDC wiring diagrams,
            BMS testing values and the error-code lookup sheet, in Hindi &amp;
            English.
          </p>

          <div className={styles.finalVisual}>
            <Image
              src={ctaImg}
              alt="Electric Scooter Repairing Masterclass 3-book bundle"
              sizes="(max-width: 900px) 92vw, 720px"
            />
          </div>

          <div className={styles.finalPrice}>
            <s>₹{MRP.toLocaleString("en-IN")}</s>
            <strong>₹{PRICE}</strong>
            <span>one-time payment</span>
          </div>

          <a className={styles.finalBtn} href={CHECKOUT}>
            Get My Electric Scooter Repair Bundle
            <ArrowRight size={19} aria-hidden="true" />
          </a>

          <ul className={styles.finalTrust}>
            <li>
              <Download size={17} aria-hidden="true" />
              Instant digital access
            </li>
            <li>
              <Languages size={17} aria-hidden="true" />
              Hindi &amp; English
            </li>
            <li>
              <LockKeyhole size={17} aria-hidden="true" />
              Secure Razorpay checkout
            </li>
          </ul>

          <p className={styles.finalNote}>
            The download link appears on screen once your payment is verified,
            and the same link is emailed to you.
          </p>
        </div>
      </section>

      <div className={styles.stickyBar}>
        <div className={styles.stickyPrice}>
          <s>₹{MRP.toLocaleString("en-IN")}</s>
          <strong>₹{PRICE}</strong>
        </div>
        <a className={styles.stickyBtn} href={CHECKOUT}>
          <span aria-hidden="true">🔋</span>
          Unlock the EV Bundle
          <span aria-hidden="true">👉</span>
        </a>
      </div>

      <footer className={styles.footer}>
        <nav aria-label="Legal">
          <a href="/electric-scooter-repairing/privacy-policy">Privacy Policy</a>
          <a href="/electric-scooter-repairing/refund-policy">Refund Policy</a>
          <a href="/electric-scooter-repairing/disclaimer">Disclaimer</a>
        </nav>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </main>
  );
}
