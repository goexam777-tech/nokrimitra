import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import { BookOpen, Clock, FileText, Mail } from "lucide-react";
import nursingNotesHero from "@/public/Nursing-notes.webp";
import MidnightTimer from "./MidnightTimer";
import SampleCarousel from "./SampleCarousel";
import NursingReviews from "./NursingReviews";
import NursingFaq from "./NursingFaq";
import styles from "./nursing-notes.module.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-nursing",
});

export const metadata: Metadata = {
  title: "ALL-In-One Nursing Notes at your Fingertips 📚",
  description:
    "The Only Nursing Notebook You Need | Simplify Your Nursing Journey. Master every aspect of nursing with ease and confidence.",
};

const insideItems = [
  "Fundamentals of Nursing [5-41 pages]",
  "IV Fluids [42-51 pages]",
  "Anatomy and Physiology [52-82 pages]",
  "Medical-Surgical Nursing [83-233 pages]",
  "Med-Surg Flashcards [234-280 pages]",
  "Shock [281-299 pages]",
  "Hepatitis [300-302 pages]",
  "Burns [303-308 pages]",
  "Chest Tube Management [309-312 pages]",
  "Electrolyte Imbalance [313-318 pages]",
  "EKGs/ECGs [319-344 pages]",
  "Lab Values [345-349 pages]",
  "ABGs [350 page]",
  "Pharmacology [351-426 pages]",
  "Drug Calculation [427-431 pages]",
  "Insulin [432-433 pages]",
  "Maternal and Child Health [434-467 pages]",
  "Pediatric Disorders [468-500 pages]",
  "Nursing Health Assessment [501-508 pages]",
  "Cranial Nerves [509-524 pages]",
  "Patient Assessment Template [525-529 pages]",
  "Nurse Report Template [530 page]",
  "Nursing Process [531-600 pages]",
];

export default function NursingNotesPage() {
  return (
    <main className={`${styles.page} ${plusJakarta.variable}`}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>
            The Only Nursing Notebook You Need | Simplify Your Nursing Journey
          </p>

          <h1 className={styles.mainTitle}>
            ALL-In-One Nursing Notes at your Fingertips
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://s.w.org/images/core/emoji/17.0.2/svg/1f4da.svg"
              alt="books"
              className={styles.titleEmojiSvg}
            />
          </h1>

          <div className={styles.discountBadge}>
            85% Discount : Limited time offer
          </div>

          <p className={styles.description}>
            Feel difficulties in your nursing preparation? Don’t worry our crafted nursing notebook is your ultimate study companion, designed to help you master every aspect of nursing with ease and confidence.
          </p>

          <div className={styles.heroImageWrap}>
            <Image
              src={nursingNotesHero}
              alt="ALL-In-One Nursing Notes"
              className={styles.heroImage}
              priority
              sizes="(max-width: 768px) 92vw, 780px"
            />
          </div>

          <div className={styles.ctaSection}>
            <a href="/nursing-notes/checkout" className={styles.greenBuyBtn}>
              <span className={styles.greenBuyMain}>BUY NOW</span>
              <span className={styles.greenBuySub}>(Get complete Nursing Notes)</span>
            </a>

            <p className={styles.ctaSubtext}>
              Buy with confidence, <strong>Instant Access On Email</strong>
            </p>

            <MidnightTimer />
          </div>

          <div className={styles.featureGridSection}>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <svg
                  className={styles.featureIconSvg}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                >
                  <path
                    d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.featureText}>Nursing E-Book</span>
              </div>

              <div className={styles.featureCard}>
                <svg
                  className={styles.featureIconSvg}
                  viewBox="0 0 550.801 550.801"
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                >
                  <g>
                    <g>
                      <path d="M267.342,414.698c-6.613,0-10.884,0.585-13.413,1.165v85.72c2.534,0.586,6.616,0.586,10.304,0.586 c26.818,0.189,44.315-14.576,44.315-45.874C308.738,429.079,292.803,414.698,267.342,414.698z"></path>
                      <path d="M152.837,414.313c-6.022,0-10.104,0.58-12.248,1.16v38.686c2.531,0.58,5.643,0.78,9.903,0.78 c15.757,0,25.471-7.973,25.471-21.384C175.964,421.506,167.601,414.313,152.837,414.313z"></path>
                      <path d="M475.095,131.992c-0.032-2.526-0.833-5.021-2.568-6.993L366.324,3.694c-0.021-0.034-0.062-0.045-0.084-0.076 c-0.633-0.707-1.36-1.29-2.141-1.804c-0.232-0.15-0.475-0.285-0.718-0.422c-0.675-0.366-1.382-0.67-2.13-0.892 c-0.19-0.058-0.38-0.14-0.58-0.192C359.87,0.114,359.037,0,358.203,0H97.2C85.292,0,75.6,9.693,75.6,21.601v507.6 c0,11.913,9.692,21.601,21.6,21.601H453.6c11.908,0,21.601-9.688,21.601-21.601V133.202 C475.2,132.796,475.137,132.398,475.095,131.992z M193.261,463.873c-10.104,9.523-25.072,13.806-42.569,13.806 c-3.882,0-7.391-0.2-10.102-0.58v46.839h-29.35V394.675c9.131-1.55,21.967-2.721,40.047-2.721 c18.267,0,31.292,3.501,40.036,10.494c8.363,6.612,13.985,17.497,13.985,30.322C205.308,445.605,201.042,456.49,193.261,463.873z M318.252,508.392c-13.785,11.464-34.778,16.906-60.428,16.906c-15.359,0-26.238-0.97-33.637-1.94V394.675 c10.887-1.74,25.083-2.721,40.046-2.721c24.867,0,41.004,4.472,53.645,13.995c13.61,10.109,22.164,26.241,22.164,49.37 C340.031,480.4,330.897,497.697,318.252,508.392z M439.572,417.225h-50.351v29.932h47.039v24.11h-47.039v52.671H359.49V392.935 h80.082V417.225z M97.2,366.752V21.601h250.203v110.515c0,5.961,4.831,10.8,10.8,10.8H453.6l0.011,223.836H97.2z"></path>
                      <path d="M386.205,232.135c-0.633-0.059-15.852-1.448-39.213-1.448c-7.319,0-14.691,0.143-21.969,0.417 c-46.133-34.62-83.919-69.267-104.148-88.684c0.369-2.138,0.623-3.828,0.741-5.126c2.668-28.165-0.298-47.179-8.786-56.515 c-5.558-6.101-13.721-8.131-22.233-5.806c-5.286,1.385-15.071,6.513-18.204,16.952c-3.459,11.536,2.101,25.537,16.708,41.773 c0.232,0.246,5.189,5.44,14.196,14.241c-5.854,27.913-21.178,88.148-28.613,117.073c-17.463,9.331-32.013,20.571-43.277,33.465 l-0.738,0.844l-0.477,1.013c-1.16,2.437-6.705,15.087-2.542,25.249c1.901,4.62,5.463,7.995,10.302,9.767l1.297,0.349 c0,0,1.17,0.253,3.227,0.253c9.01,0,31.25-4.735,43.179-48.695l2.89-11.138c41.639-20.239,93.688-26.768,131.415-28.587 c19.406,14.391,38.717,27.611,57.428,39.318l0.611,0.354c0.907,0.464,9.112,4.515,18.721,4.524l0,0 c13.732,0,23.762-8.427,27.496-23.113l0.189-1.004c1.044-8.393-1.065-15.958-6.096-21.872 C407.711,233.281,387.978,232.195,386.205,232.135z M142.812,319.744c-0.084-0.1-0.124-0.194-0.166-0.3 c-0.896-2.157,0.179-7.389,1.761-11.222c6.792-7.594,14.945-14.565,24.353-20.841 C159.598,317.039,146.274,319.603,142.812,319.744z M200.984,122.695L200.984,122.695c-14.07-15.662-13.859-23.427-13.102-26.041 c1.242-4.369,6.848-6.02,6.896-6.035c2.824-0.768,4.538-0.617,6.064,1.058c3.451,3.791,6.415,15.232,5.244,36.218 C202.764,124.557,200.984,122.695,200.984,122.695z M193.714,256.068l0.243-0.928l-0.032,0.011 c7.045-27.593,17.205-67.996,23.047-93.949l0.211,0.201l0.021-0.124c18.9,17.798,47.88,43.831,82.579,70.907l-0.39,0.016 l0.574,0.433C267.279,235.396,228.237,241.84,193.714,256.068z M408.386,265.12c-2.489,9.146-7.277,10.396-11.665,10.396l0,0 c-5.094,0-9.998-2.12-11.116-2.632c-12.741-7.986-25.776-16.688-38.929-25.998c0.105,0,0.2,0,0.316,0 c22.549,0,37.568,1.369,38.158,1.411c3.766,0.14,15.684,1.9,20.82,7.938C407.984,258.602,408.755,261.431,408.386,265.12z"></path>
                    </g>
                  </g>
                </svg>
                <span className={styles.featureText}>Format: PDF</span>
              </div>

              <div className={styles.featureCard}>
                <svg
                  className={styles.featureIconSvg}
                  viewBox="0 0 508.025 508.025"
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                >
                  <g>
                    <g>
                      <path d="M502.513,187.025l-81.4-62.4v-39.4c0-7.8-6.3-14.1-14.1-14.1h-55.6l-88.8-68.2c-5.1-3.9-12.1-3.9-17.2,0l-88.8,68.2h-55.6 c-7.8,0-14.1,6.3-14.1,14.1v39.4l-81.4,62.4c-3.5,2.7-5.5,6.8-5.5,11.2c0,0.2,0,295.7,0,295.7c0,7.8,6.3,14.1,14.1,14.1h479.8 c7.8,0,14.1-6.3,14.1-14.1c0,0,0-295.2,0-295.7C508.013,193.825,506.013,189.725,502.513,187.025z M421.113,160.225l49.6,38.1 l-49.6,38.1V160.225z M254.012,31.925l51.1,39.2h-102.2L254.012,31.925z M115.112,99.325h277.8v158.7l-138.9,106.6l-138.9-106.6 V99.325z M86.913,160.225v76.1l-49.6-38.1L86.913,160.225z M28.213,226.925l155.3,119.2l-155.3,119.2V226.925z M55.713,479.825 l151-115.9l38.8,29.8c5.1,3.9,12.1,3.9,17.2,0l38.8-29.8l151,115.9H55.713z M479.813,465.325l-155.3-119.2l155.3-119.2V465.325z"></path>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M336.513,207.925h-164.9c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1h164.9c7.7,0,14.1-6.3,14.1-14.1 S344.313,207.925,336.513,207.925z"></path>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M336.513,141.725h-164.9c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1h164.9c7.8,0,14.1-6.3,14.1-14.1 S344.313,141.725,336.513,141.725z"></path>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M297.913,274.125h-87.7c-7.8,0-14.1,6.3-14.1,14.1c0,7.8,6.3,14.1,14.1,14.1h87.7c7.7,0,14.1-6.3,14.1-14.1 S305.713,274.125,297.913,274.125z"></path>
                    </g>
                  </g>
                </svg>
                <span className={styles.featureText}>
                  Delivery : Email
                </span>
              </div>

              <div className={styles.featureCard}>
                <svg
                  className={styles.featureIconSvg}
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                >
                  <rect x="20" y="3" width="8" height="3.5" rx="1" fill="#000000" />
                  <rect x="22" y="6.5" width="4" height="3" fill="#000000" />
                  <circle cx="24" cy="26" r="17" fill="#000000" />
                  <rect x="22" y="18" width="4" height="15" rx="1.5" fill="#ffffff" />
                </svg>
                <span className={styles.featureText}>Validity : Lifetime</span>
              </div>
            </div>
          </div>

          <div className={styles.insideSection}>
            <h2 className={styles.insideTitle}>What You Get Inside</h2>

            <div className={styles.insideListWrap}>
              <ul className={styles.insideList}>
                {insideItems.map((item, index) => (
                  <li key={index} className={styles.insideItem}>
                    <svg
                      className={styles.checkIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="10" fill="#22c55e" />
                      <path
                        d="M8.5 12.5L10.8 14.8L15.5 9.5"
                        stroke="#ffffff"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.ctaSection}>
              <a href="/nursing-notes/checkout" className={styles.greenBuyBtn}>
                <span className={styles.greenBuyMain}>BUY NOW</span>
                <span className={styles.greenBuySub}>(Get complete Nursing Notes)</span>
              </a>

              <p className={styles.priceValidSubtext}>
                RS 199/- Only [ Valid for Today ]
              </p>

              <p className={styles.ctaSubtext}>
                Buy with confidence, <strong>Instant Access On Email</strong>
              </p>
            </div>
          </div>

          <SampleCarousel />

          <NursingReviews />

          {/* Clean Premium Light-Theme Bottom CTA */}
          <div className={styles.premiumCleanCtaCard}>
            <div className={styles.cleanCtaBadge}>
              ⚡ Special Discounted Offer
            </div>

            <h2 className={styles.cleanCtaTitle}>
              Ready To Master Nursing &amp; Ace Your Exams? 📚
            </h2>

            <p className={styles.cleanCtaDesc}>
              Get complete 600+ pages Nursing Notes PDF with instant access on Email.
            </p>

            <div className={styles.cleanPriceWrap}>
              <span className={styles.cleanOldPrice}>₹999</span>
              <span className={styles.cleanNewPrice}>RS 199/- Only</span>
              <span className={styles.cleanSaveBadge}>Save 85% Today</span>
            </div>

            <a href="/nursing-notes/checkout" className={styles.cleanGreenCtaBtn}>
              <span className={styles.cleanBtnMain}>GET INSTANT ACCESS NOW 🚀</span>
              <span className={styles.cleanBtnSub}>Buy Once • Lifetime Access</span>
            </a>

            <div className={styles.cleanTrustPoints}>
              <span>✓ Instant Email Access</span>
              <span>✓ Printable PDF</span>
            </div>
          </div>

          <NursingFaq />

          {/* Simple Clean Footer */}
          <footer className={styles.footerSection}>
            <p className={styles.footerBrand}>Nursing Notes</p>
            <div className={styles.footerLinks}>
              <a href="/nursing-notes/privacy-policy">Privacy Policy</a>
              <span className={styles.footerDivider}>|</span>
              <a href="mailto:goexam777@gmail.com">Contact</a>
              <span className={styles.footerDivider}>|</span>
              <a href="/nursing-notes/refund-policy">Refund Policy</a>
            </div>
            <p className={styles.footerCopyright}>
              © {new Date().getFullYear()} Nursing Notes. All rights reserved.
            </p>
          </footer>
        </div>
      </section>

      {/* Sticky Bottom CTA Bar for Mobile */}
      <div className={styles.stickyMobileCtaBar}>
        <a href="/nursing-notes/checkout" className={styles.stickyMobileCtaBtn}>
          <span className={styles.stickyMobileBtnMain}>Click Here to Get Access</span>
        </a>
      </div>
    </main>
  );
}
