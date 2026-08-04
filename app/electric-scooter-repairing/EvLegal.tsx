import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import styles from "./legal.module.css";

const LEGAL_LINKS = [
  { href: "/electric-scooter-repairing/privacy-policy", label: "Privacy Policy" },
  { href: "/electric-scooter-repairing/refund-policy", label: "Refund Policy" },
  { href: "/electric-scooter-repairing/terms", label: "Terms" },
  { href: "/electric-scooter-repairing/disclaimer", label: "Disclaimer" },
];

export default function EvLegal({
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
          <Link className={styles.back} href="/electric-scooter-repairing">
            <ArrowLeft size={17} />
            Back to product
          </Link>
          <span className={styles.brand}>
            <span className={styles.brandMark}>
              <Zap size={15} />
            </span>
            NokriMitra
          </span>
        </div>
      </header>

      <main className={styles.wrap}>
        <p className={styles.eyebrow}>
          Electric Scooter Repairing Guide (Hindi)
        </p>
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
          <Link href="/electric-scooter-repairing">
            Electric Scooter Repairing Guide
          </Link>
        </div>
      </footer>
    </div>
  );
}
