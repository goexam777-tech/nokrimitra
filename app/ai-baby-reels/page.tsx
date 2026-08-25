import type { Metadata } from "next";
import Image from "next/image";
import { Poppins } from "next/font/google";
import {
  Check,
  Download,
  ArrowRight,
  PenTool,
  MonitorPlay,
  Users,
  TrendingUp,
  Camera,
  Briefcase,
} from "lucide-react";

import aiBabyReels from "@/public/ai-baby-reels.webp";
import trustBadges from "@/public/trust.webp";
import socialInstagram from "@/public/social-instagram.webp";
import socialFacebook from "@/public/social-facebook.webp";
import socialTwitter from "@/public/social-twitter.webp";
import socialWhatsapp from "@/public/social-whatsapp.webp";
import socialSnapchat from "@/public/social-snapchat.webp";
import moneyReels from "@/public/money-reels.webp";
import review1 from "@/public/review-1.png";
import review2 from "@/public/review-2.png";
import review3 from "@/public/review-3.png";
import review4 from "@/public/review-4.png";
import proofPage1 from "@/public/proof-page-1.jpeg";
import proofPage2 from "@/public/proof-page-2.jpeg";
import proofPage3 from "@/public/proof-page-3.jpeg";
import proofPage4 from "@/public/proof-page-4.jpeg";
import proofPage5 from "@/public/proof-page-5.jpeg";
import ProofCarousel from "./ProofCarousel";
import FaqAccordion from "./FaqAccordion";
import styles from "./ai-baby-reels.module.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-ai-reels",
});

export const metadata: Metadata = {
  title: "2000+ AI Baby Reels Bundle | Ready-to-Post",
  description:
    "Get the ultimate 2000+ AI Baby Reels bundle. 100% copyright-free, no editing, no watermarks, HD quality and instant download with lifetime access.",
};

const proofPages = [
  proofPage2,
  proofPage4,
  proofPage1,
  proofPage3,
  proofPage5,
];

const moneyLeft = [
  "Sponsored Posts",
  "Sell Your Own Products",
  "Promote Your Services",
];

const moneyRight = [
  "Exclusive Content",
  "Offer Consulting or Coaching",
  "Merchandise/Shoutouts",
];

const themeSteps = [
  "Get Our Viral AI Baby Reels Bundle Today!",
  "Download & Start Uploading These Reels",
  "Grow Your Theme Page And Start Earning $$$",
];

const platforms = [
  { src: socialInstagram, label: "Instagram" },
  { src: socialFacebook, label: "Facebook" },
  { src: socialTwitter, label: "Twitter / X" },
  { src: socialWhatsapp, label: "WhatsApp" },
  { src: socialSnapchat, label: "Snapchat" },
];

const sampleVideos: (string | null)[] = [
  "/video_2026-08-10_00-44-04.mp4",
  "/video_2026-08-10_00-42-30.mp4",
  "/video_2026-08-10_00-43-31.mp4",
  "/video_2026-08-10_00-43-06.mp4",
];

const audience = [
  {
    Icon: PenTool,
    title: "Content Creators",
    detail: "Running out of ideas? Post & go viral easily.",
  },
  {
    Icon: MonitorPlay,
    title: "YouTubers",
    detail: "Start your channel with ready viral content.",
  },
  {
    Icon: Users,
    title: "Influencers",
    detail: "Grow followers & monetize fast.",
  },
  {
    Icon: TrendingUp,
    title: "Managers",
    detail: "Boost engagement & viral reach.",
  },
  {
    Icon: Camera,
    title: "Instagramers",
    detail: "Gain daily followers easily.",
  },
  {
    Icon: Briefcase,
    title: "Freelancers",
    detail: "Attract clients & showcase work.",
  },
];

const reviewImages = [review1, review2, review3, review4];

const faqs = [
  {
    q: "What will I get in this bundle?",
    a: "You get 2000+ ready-to-post AI Baby Reels in HD quality — 100% copyright-free, no watermark. Just download and upload, no editing needed.",
  },
  {
    q: "Is this beginner friendly?",
    a: "Yes. No editing skills or experience required. Download the reels and start posting right away on any platform.",
  },
  {
    q: "Can I upload directly?",
    a: "Absolutely. Every reel is ready-to-post — upload directly to Instagram, YouTube, Facebook, WhatsApp and more.",
  },
  {
    q: "Will I get the free bonuses?",
    a: "Yes! The first 100 buyers get all 4 free bonuses: Instagram Growth Mastery Course, Youtube Growth Mastery Course, 2000+ Stickman Animation Reels Bundle and 5000+ Gym Workout Reels Bundle.",
  },
  {
    q: "How will I receive the files?",
    a: "You get instant access right after payment, and the download link is also sent to your email. You keep lifetime access.",
  },
  {
    q: "Need support?",
    a: "Our team is here to help. If you have any questions or trouble downloading, just reach out to support and we'll assist you quickly.",
  },
];

const bonuses = [
  { tab: "BONUS 1", caption: "Instagram Growth Mastery Course" },
  { tab: "BONUS 2", caption: "Youtube Growth Mastery Course" },
  { tab: "BONUS 3", caption: "2000+ Stickman Animation Reels Bundle" },
  { tab: "BONUS 4", caption: "5000+ Gym Workout Reels Bundle" },
];

const features = [
  {
    title: "100% Copyright-Free",
    detail: "Post anywhere without restrictions",
  },
  {
    title: "No editing needed",
    detail: "just download & upload",
  },
  {
    title: "No Watermarks",
    detail: "Clean, professional-quality videos",
  },
  {
    title: "HD quality",
    detail: "scroll-stopping reel visuals",
  },
  {
    title: "Perfect for",
    detail: "faceless creators, meme page, humor page, POV content, theme page",
  },
  {
    title: "Instant download",
    detail: "No need to wait",
  },
  {
    title: "Lifetime Access",
    detail: "Use forever, no extra costs",
  },
];

export default function AiBabyReelsPage() {
  return (
    <main
      className={`ai-reels-page-root ${styles.page} ${poppins.variable}`}
      lang="en"
    >
      <div className={styles.offerBar}>
        🔥 Limited Time Offer &ndash; Save Flat 75% Today! 🔥
      </div>
      <div className={styles.subBar}>
        * Ready to Post &bull; Instant Access &bull; Limited Time Price ₹148
      </div>

      <section className={styles.hero} aria-labelledby="ai-baby-reels-title">
        <div className={styles.heroInner}>
          <div className={styles.visual}>
            <Image
              src={aiBabyReels}
              alt="2000+ AI Baby Reels Bundle"
              className={styles.productImage}
              priority
              sizes="(max-width: 899px) 92vw, 460px"
            />
          </div>

          <div className={styles.content}>
            <p className={styles.rating}>
              <span className={styles.stars} aria-hidden="true">
                ★★★★★
              </span>
              <b>Excellent 4.9</b> | 9570+ Reviews
            </p>

            <h1 id="ai-baby-reels-title">
              <span>Get The Ultimate 2000+</span>
              <span>AI Baby Reels Bundle Now!!🎬</span>
            </h1>

            <p className={styles.subhead}>2000+ AI Baby Reels (Ready-to-Post)</p>

            <ul className={styles.features}>
              {features.map((f) => (
                <li key={f.title}>
                  <span className={styles.check} aria-hidden="true">
                    <Check size={14} strokeWidth={3.5} />
                  </span>
                  <span>
                    <b>{f.title}</b> &ndash; {f.detail}
                  </span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </section>

      <section className={styles.offerSection}>
        <div className={styles.offerInner}>
          <h2 className={styles.offerHeadline}>
            ONLY ₹148/- TODAY Delivered Instantly. Start Using Right Now!
          </h2>

          <a className={styles.buyBtn} href="/ai-baby-reels/checkout">
            <span className={styles.buyIcon} aria-hidden="true">
              <Download size={20} strokeWidth={2.6} />
            </span>
            <span className={styles.buyText}>
              BUY NOW <b>₹148</b> <s>₹1499</s>
            </span>
          </a>

          <p className={styles.buyNote}>&quot;FOR FIRST 100 PEOPLE ONLY&quot;</p>

          <div className={styles.trustWrap}>
            <Image
              src={trustBadges}
              alt="Secured payment options: Paytm, UPI, BHIM, PhonePe, GPay, Visa, Mastercard, Maestro, RuPay"
              className={styles.trustImage}
              sizes="(max-width: 767px) 92vw, 720px"
            />
          </div>
        </div>
      </section>

      <section className={styles.samplesSection}>
        <div className={styles.samplesInner}>
          <h2 className={styles.samplesHeading}>Sample Videos 👀</h2>

          <div className={styles.videoRow}>
            {sampleVideos.map((src, i) => (
              <div key={i} className={styles.videoCard}>
                {src ? (
                  <video src={src} controls playsInline preload="metadata" />
                ) : (
                  <div className={styles.videoPlaceholder}>
                    <span className={styles.playDot} aria-hidden="true">
                      ▶
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className={styles.bonusHeadline}>
            Click On This Button To BUY &amp; Get Rs.20,000 Bonuses FREE !
            <span className={styles.bonusPoint} aria-hidden="true">
              👇
            </span>
          </p>

          <a className={styles.buyBtn} href="/ai-baby-reels/checkout">
            <span className={styles.buyIcon} aria-hidden="true">
              <Download size={20} strokeWidth={2.6} />
            </span>
            <span className={styles.buyText}>
              BUY NOW <b>₹148</b> <s>₹1499</s>
            </span>
          </a>
        </div>
      </section>

      <section className={styles.audienceSection}>
        <div className={styles.audienceInner}>
          <h2 className={styles.audienceHeading}>Who Should Use These Reels?</h2>

          <div className={styles.audienceGrid}>
            {audience.map(({ Icon, title, detail }) => (
              <div key={title} className={styles.audienceCard}>
                <span className={styles.audienceIcon} aria-hidden="true">
                  <Icon size={26} strokeWidth={1.8} />
                </span>
                <h3 className={styles.audienceTitle}>{title}</h3>
                <p className={styles.audienceDetail}>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.postSection}>
        <div className={styles.postInner}>
          <h2 className={styles.postHeading}>Where Can I Post These Reels?</h2>

          <div className={styles.postGrid}>
            {platforms.map(({ src, label }) => (
              <div key={label} className={styles.postIcon}>
                <Image
                  src={src}
                  alt={label}
                  className={styles.postIconImg}
                  sizes="90px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.moneySection}>
        <div className={styles.moneyInner}>
          <h2 className={styles.moneyHeading}>
            How Can I Make Money By Posting These Reels?
          </h2>

          <div className={styles.moneyRow}>
            <ul className={styles.moneyList}>
              {moneyLeft.map((item) => (
                <li key={item}>
                  <span className={styles.moneyCheck} aria-hidden="true">
                    <Check size={13} strokeWidth={3.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className={styles.moneyImageWrap}>
              <Image
                src={moneyReels}
                alt="Earn money by posting AI baby reels"
                className={styles.moneyImage}
                unoptimized
                sizes="(max-width: 767px) 80vw, 300px"
              />
            </div>

            <ul className={styles.moneyList}>
              {moneyRight.map((item) => (
                <li key={item}>
                  <span className={styles.moneyCheck} aria-hidden="true">
                    <Check size={13} strokeWidth={3.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <h3 className={styles.themeHeading}>
            Create Your Theme Page in Simple Steps!
          </h3>

          <ol className={styles.themeSteps}>
            {themeSteps.map((step, i) => (
              <li key={step}>
                <span className={styles.themeNum} aria-hidden="true">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <a className={styles.buyBtn} href="/ai-baby-reels/checkout">
            <span className={styles.buyIcon} aria-hidden="true">
              <Download size={20} strokeWidth={2.6} />
            </span>
            <span className={styles.buyText}>
              BUY NOW <b>₹148</b> <s>₹1499</s>
            </span>
          </a>
        </div>
      </section>

      <section className={styles.proofSection}>
        <div className={styles.proofHead}>
          <h2 className={styles.proofHeading}>Pages Built With Our Content</h2>
          <p className={styles.proofSub}>
            These creators acquired our bundle, scaled to 100K+ followers, and
            monetize monthly.
          </p>
        </div>

        <ProofCarousel pages={proofPages} />
      </section>

      <section className={styles.bonusSection}>
        <div className={styles.bonusInner}>
          <p className={styles.bonusTopLine}>
            REGISTER SOON TO SECURE YOUR ACCESS
          </p>
          <h2 className={styles.bonusTitle}>
            Free Bonus resources are included for{" "}
            <span>FIRST 100 PEOPLE.</span>
          </h2>

          <div className={styles.bonusGrid}>
            {bonuses.map((b) => (
              <div key={b.tab} className={styles.bonusCard}>
                <div className={styles.bonusTab}>{b.tab}</div>
                <div className={styles.bonusCaption}>{b.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.reviewsSection}>
        <div className={styles.reviewsInner}>
          <h2 className={styles.reviewsHeading}>Real Customer Reviews 🔥</h2>

          <div className={styles.reviewsGrid}>
            {reviewImages.map((src, i) => (
              <div key={i} className={styles.reviewCard}>
                <Image
                  src={src}
                  alt={`Real customer review ${i + 1}`}
                  className={styles.reviewImg}
                  sizes="(max-width: 767px) 92vw, 480px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <footer className={styles.siteFooter}>
        <div className={styles.footerInner}>
          <p className={styles.footerBrand}>2000+ AI Baby Reels Bundle</p>
          <nav className={styles.footerNav} aria-label="Footer">
            <a href="/ai-baby-reels/privacy-policy">Privacy Policy</a>
            <a href="/ai-baby-reels/refund-policy">Refund Policy</a>
          </nav>
          <p className={styles.footerCopy}>
            © {new Date().getFullYear()} NokriMitra. All rights reserved.
          </p>
        </div>
      </footer>

      <div className={styles.mobileBar}>
        <div className={styles.mobileBarLeft}>
          <span className={styles.mobileBarSave}>SAVE 90%</span>
          <span className={styles.mobileBarPriceRow}>
            <b>₹148</b>
            <s>₹1499</s>
          </span>
        </div>
        <a className={styles.mobileBarBtn} href="/ai-baby-reels/checkout">
          <span className={styles.mobileBarBtnText}>BUY NOW</span>
          <span className={styles.mobileBarArrow} aria-hidden="true">
            <ArrowRight size={18} strokeWidth={2.8} />
          </span>
        </a>
      </div>
    </main>
  );
}
