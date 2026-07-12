import type { ReactNode } from "react";
import VastuFooter from "./VastuFooter";
import styles from "./legal.module.css";

export default function VastuLegal({
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
        <a href="/vastu-astro">← Back to Home</a>
        <h1>{title}</h1>
      </div>
      <div className={styles.content}>
        {updated ? <p className={styles.updated}>Last updated: {updated}</p> : null}
        {children}
      </div>
      <VastuFooter />
    </div>
  );
}
