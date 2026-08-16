import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Nursing Notes",
  description: "Privacy Policy for Nursing Notes digital E-Book purchases.",
};

export default function NursingPrivacyPolicyPage() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", color: "#0f172a", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "20px" }}>Privacy Policy - Nursing Notes</h1>
      <p style={{ color: "#64748b", marginBottom: "24px" }}>Last updated: August 16, 2026</p>

      <section style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "10px" }}>1. Information We Collect</h2>
        <p>When you purchase the <strong>Nursing Notes E-Book (PDF)</strong>, we collect basic details required to deliver your digital product, including:</p>
        <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
          <li>Your Full Name</li>
          <li>Your Email Address (for instant digital PDF link delivery)</li>
          <li>Your Phone / Mobile Number</li>
          <li>Payment transaction status (processed securely via encrypted payment gateways)</li>
        </ul>
      </section>

      <section style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "10px" }}>2. How We Use Your Information</h2>
        <p>Your information is used strictly to:</p>
        <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
          <li>Instantly deliver your purchased Nursing Notes PDF to your email.</li>
          <li>Provide customer support if you face any issues downloading your file.</li>
          <li>Send payment confirmations and invoice receipts.</li>
        </ul>
        <p style={{ marginTop: "10px" }}>We <strong>NEVER</strong> sell, rent, or trade your personal information to third parties.</p>
      </section>

      <section style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "10px" }}>3. Data Security</h2>
        <p>All payments are processed using 256-bit SSL encrypted payment gateways (UPI, Credit/Debit Cards, NetBanking). We do not store your financial or credit card credentials on our servers.</p>
      </section>

      <section style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "10px" }}>4. Contact Us</h2>
        <p>If you have any questions regarding this Privacy Policy or your order data, please contact us at:</p>
        <p style={{ fontWeight: "700", color: "#16a34a", marginTop: "8px" }}>📧 Email: goexam777@gmail.com</p>
      </section>

      <div style={{ marginTop: "32px", borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
        <a href="/nursing-notes" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>← Back to Nursing Notes Page</a>
      </div>
    </main>
  );
}
