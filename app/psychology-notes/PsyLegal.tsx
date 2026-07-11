import type { ReactNode } from "react";
import PsyFooter from "./PsyFooter";
import styles from "./legal.module.css";

export default function PsyLegal({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.page}>
      <div className={styles.bar}>
        <a href="/psychology-notes">← Back to Psychology Notes</a>
        <h1>{title}</h1>
      </div>
      <div className={styles.content}>
        {updated ? <p className={styles.updated}>Last updated: {updated}</p> : null}
        {children}
      </div>
      <PsyFooter />
    </div>
  );
}
