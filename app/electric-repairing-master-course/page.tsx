import Image from "next/image";
import { Nunito, Poppins } from "next/font/google";
import { ArrowRight, Mail, Phone, Quote, Smile, Star } from "lucide-react";
import FaqAccordion from "./FaqAccordion";
import ElectricViewItem from "./ElectricViewItem";
import styles from "./electric.module.css";
import bannerImg from "@/public/basic-repairing-ebook.webp";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

// Heading font: applied to title, section headings and labels via CSS variable
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-title",
});

const CHECKOUT_LINK = "/electric-repairing-master-course/checkout";
const PRICE = "₹99";

const KYA_SEEKHENGE = [
  { emoji: "❄️", title: "AC & Refrigerator Repairing", desc: "Servicing, common faults aur troubleshooting." },
  { emoji: "💨", title: "Cooler & Fan Repairing", desc: "Motor, wiring aur repair basics." },
  { emoji: "⚙️", title: "Motor & Pump Repairing", desc: "Connections, faults aur maintenance." },
  { emoji: "💡", title: "House Electrical Wiring", desc: "Switches, sockets, MCB aur wiring basics." },
  { emoji: "📱", title: "Mobile Repairing", desc: "Components, hardware aur common problems." },
  { emoji: "🔌", title: "Electrical Appliance Repairing", desc: "Daily-use appliances ki repairing aur troubleshooting." },
];

const KIS_KE_LIYE = [
  "Beginners jo zero se start karna chahte hain",
  "Electrician skills seekhne wale",
  "AC/Fridge/Cooler repairing seekhne wale",
  "Motor & Pump repairing mein interest rakhne wale",
  "House wiring seekhne wale",
  "Mobile repairing seekhne wale",
  "Apni repairing skills improve karna chahne wale",
  "Self-learning karne wale",
];

const EK_HI_JAGAH = [
  "⚡ Electrical Basics",
  "🏠 House Wiring",
  "❄️ AC Repairing",
  "🧊 Fridge Repairing",
  "💨 Cooler Repairing",
  "🌀 Fan Repairing",
  "⚙️ Motor Repairing",
  "💧 Pump Repairing",
  "📱 Mobile Repairing",
  "🔌 Electrical Appliance Repairing",
  "🛠️ Troubleshooting & Practical Concepts",
];

const WHAT_YOU_GET = [
  { label: "Access", value: "Instant" },
  { label: "Resource content", value: "PDF / File" },
  { label: "Validity", value: "Lifetime" },
];

const TESTIMONIALS = [
  {
    name: "Manoj Sharma",
    quote:
      "AC repairing ka basic knowledge bhi nahi tha. Course ke modules ko step-by-step follow karke concepts samajhne mein kaafi help mili.",
  },
  {
    name: "Vimal Jat",
    quote:
      "Fridge aur cooler repairing ke sections kaafi useful lage. Common problems ko samajhne mein help milti hai",
  },
];

const FAQS_DATA = [
  {
    q: "Is course mein exactly kya-kya sikhaya jayega?",
    a: "⚡ Is complete course mein AC, Fridge, Cooler, Fan, Motor, Pump, Electrical Repairing, House Wiring aur A-to-Z Mobile Repairing jaise multiple topics cover kiye gaye hain. Beginner level se step-by-step learning ke liye designed hai.",
  },
  {
    q: "Kya beginner bhi ye course kar sakta hai?",
    a: "Haan, bilkul! Ye course zero se start hota hai. Agar aapko pehle se koi experience nahi hai, tab bhi basic electrical concepts, tools ka use (jaise Multimeter, tester) aur safety guidelines simple Hinglish bhasha mein samjhaye gaye hain.",
  },
  {
    q: "Course lene ke baad mujhe kya-kya milega aur access kaise milega?",
    a: "Payment confirm hote hi instant screen par download/access link mil jayega, aur aapke email par bhi details bhej di jaayengi. Aapko Complete Course Modules, PDF Notes, Circuit Diagrams, Troubleshooting Flowcharts aur Lifetime Access milega jise aap Mobile, Tablet ya Laptop par kabhi bhi dekh aur padh sakte hain.",
  },
];

function Divider() {
  return <hr className={styles.divider} />;
}

export default function ElectricLandingPage() {
  return (
    <div className={`${styles.page} ${nunito.className} ${poppins.variable}`}>
      <ElectricViewItem />
      <main className={styles.column}>
        <h1 className={styles.title}>Complete Electric &amp; Repairing Master Course</h1>

        <div className={styles.banner}>
          <Image
            src={bannerImg}
            alt="Basic Repairing eBook Bundle - Complete Electric & Repairing Master Course"
            priority
            className={styles.bannerImg}
            sizes="(max-width: 640px) 100vw, 600px"
          />
        </div>

        {/* DESCRIPTION */}
        <section className={styles.section}>
          <h2 className={styles.label}>Description</h2>
          <p>
            AC, Fridge, Cooler, Fan, Motor, Pump, House Wiring &amp; Mobile
            Repairing, Sab Kuch Ek Hi Complete Course Mein!
          </p>
          <p>Beginner se practical repair skills tak, step-by-step learning ke saath.</p>
          <p>🔥 ONE COMPLETE COURSE • MULTIPLE REPAIR SKILLS • A-Z LEARNING</p>
        </section>

        {/* KYA SEEKHENGE */}
        <section className={styles.section}>
          <h2 className={styles.heading}>🛠️ Is Complete Course Mein Kya Seekhenge?</h2>
          {KYA_SEEKHENGE.map((item) => (
            <p key={item.title}>
              {item.emoji} <strong>{item.title}</strong> – {item.desc}
            </p>
          ))}
        </section>

        <Divider />

        {/* KIS KE LIYE */}
        <section className={styles.section}>
          <h2 className={styles.heading}>🎯 Ye Course Kis Ke Liye Hai?</h2>
          <ul className={styles.plainList}>
            {KIS_KE_LIYE.map((item) => (
              <li key={item}>✅ {item}</li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* EK HI JAGAH */}
        <section className={styles.section}>
          <h2 className={styles.heading}>📚 Aapko Ek Hi Jagah Kya Milega?</h2>
          <ul className={styles.plainList}>
            {EK_HI_JAGAH.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* WHY CHOOSE */}
        <section className={styles.section}>
          <h2 className={styles.heading}>💥 Why Choose This Course?</h2>
          <p>
            Alag-alag repairing courses ke liye multiple jagah search karne ki
            zarurat nahi. Electricity + Appliances + Mobile Repairing ke
            important learning areas ko ek hi organized course mein cover kiya
            gaya hai.
          </p>
          <p>
            <strong>Learn → Practice → Understand → Troubleshoot</strong>
          </p>
          <p>
            🎁 <strong>Complete Repairing Skill Bundle</strong>
            <br />
            One Purchase • Multiple Courses • Complete Learning
          </p>
        </section>

        <Divider />

        {/* CTA */}
        <section className={styles.section}>
          <h2 className={styles.label}>🚀 Start Your Repairing Journey Today</h2>
          <p className={styles.tight}>
            Ek Course Mein Itni Repairing Skills!
            <br />
            Agar aap Electrician, Appliance Repairing ya Mobile Repairing ki
            skills seekhna chahte hain, to complete course se apni learning
            start karein.
          </p>
          <p className={styles.tight}>Learn More. Practice More. Build More Repairing Skills.</p>
        </section>

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

        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Complete Electric &amp; Repairing Master Course</p>
        </footer>
      </main>

      {/* STICKY BOTTOM BAR */}
      <aside className={styles.sticky} aria-label="Buy course">
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
