import type { Metadata } from "next";
import Link from "next/link";
import styles from "./model-paper.module.css";

export const metadata: Metadata = {
  title: "GSRTC કંડક્ટર મોડલ પેપર | નોકરી મિત્ર",
  description: "GSRTC કંડક્ટર પરીક્ષા માટે વિશેષ મોડલ પેપર અને પ્રેક્ટિસ ટેસ્ટ. નોકરી મિત્ર સાથે શ્રેષ્ઠ તૈયારી કરો.",
};

export default function GsrtcConductorModelPaperPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <span>🚌</span>
          <span>નોકરી મિત્ર</span>
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.heroCard}>
          <div className={styles.badge}>
            <span>📝</span>
            <span>GSRTC Conductor Preparation</span>
          </div>

          <h1 className={styles.title}>
            GSRTC કંડક્ટર મોડલ પેપર
          </h1>

          <p className={styles.subtitle}>
            કંડક્ટર ભરતી પરીક્ષાની શ્રેષ્ઠ પ્રેક્ટિસ માટે મોડલ પેપર લેન્ડિંગ પેજ તૈયાર છે.
          </p>

          <div className={styles.statusCard}>
            <p>
              ⚙️ <strong>પેજ સેટઅપ થઈ ગયું છે.</strong> હવે તમે જે વિગતો, સેક્શન્સ અથવા સામગ્રી ઉમેરવા માંગો છો તે કહો, આપણે એ મુજબ ડિઝાઇન અને કન્ટેન્ટ તૈયાર કરીશું.
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} નોકરી મિત્ર. All rights reserved.</p>
      </footer>
    </div>
  );
}
