import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "X-Ray Diagnosis | Practical Guide to Reading X-Rays",
  description:
    "A practical guide to reading, interpreting and understanding common X-rays. The only X-ray guide you need to simplify X-ray diagnosis.",
};

export default function XrayDiagnosisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
