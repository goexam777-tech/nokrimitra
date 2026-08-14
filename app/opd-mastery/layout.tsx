import type { ReactNode } from "react";
import ClarityAnalytics from "./ClarityAnalytics";

/**
 * Wraps every /opd-mastery route (landing, checkout, thank-you, legal) so
 * Microsoft Clarity runs for this funnel only.
 */
export default function OpdMasteryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ClarityAnalytics />
      {children}
    </>
  );
}
