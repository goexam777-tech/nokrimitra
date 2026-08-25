import Link from "next/link";
import { ArrowLeft, Clapperboard } from "lucide-react";
import styles from "./legal.module.css";

const LEGAL_LINKS = [
  { href: "/ai-baby-reels/privacy-policy", label: "Privacy Policy" },
  { href: "/ai-baby-reels/refund-policy", label: "Refund Policy" },
];

export default function AiReelsLegal({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <div className={styles.barInner}>
          <Link className={styles.back} href="/ai-baby-reels">
            <ArrowLeft size={17} />
            Back to product
          </Link>
          <span className={styles.brand}>
            <span className={styles.brandMark}>
              <Clapperboard size={15} />
            </span>
            AI Baby Reels
          </span>
        </div>
      </header>

      <main className={styles.wrap}>
        <p className={styles.eyebrow}>2000+ AI Baby Reels Bundle</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>Last updated: {updated}</p>

        <article className={styles.content}>{children}</article>

        <nav className={styles.legalNav} aria-label="Legal pages">
          {LEGAL_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <footer className={styles.footer}>
        <div className={styles.barInner}>
          <span>© {new Date().getFullYear()} NokriMitra</span>
          <Link href="/ai-baby-reels">2000+ AI Baby Reels Bundle</Link>
        </div>
      </footer>
    </div>
  );
}
