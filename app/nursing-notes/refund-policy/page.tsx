import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Nursing Notes",
  description: "Refund and Return Policy for Nursing Notes digital E-Book.",
};

export default function NursingRefundPolicyPage() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", color: "#0f172a", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "20px" }}>Refund &amp; Return Policy - Nursing Notes</h1>
      <p style={{ color: "#64748b", marginBottom: "24px" }}>Last updated: August 16, 2026</p>

      <section style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "10px" }}>1. Digital Product Delivery</h2>
        <p>The <strong>Nursing Notes (ALL-In-One PDF E-Book)</strong> is a digital product delivered instantly via online download link and backup email after successful payment completion.</p>
      </section>

      <section style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "10px" }}>2. Refund Terms</h2>
        <p>Due to the digital nature of PDF files and instant access upon purchase, digital downloads are non-returnable once delivered.</p>
        <p style={{ marginTop: "10px" }}>However, we are committed to 100% customer satisfaction. You are eligible for a replacement or full refund under the following conditions:</p>
        <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
          <li>Duplicate payment made by mistake for the same transaction.</li>
          <li>Technical failure where the download link is broken and support is unable to deliver your PDF file within 24 hours.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "10px" }}>3. How to Request Assistance</h2>
        <p>If you faced any issue receiving your PDF or need help with your order, simply email us with your <strong>Order/Transaction ID</strong>:</p>
        <p style={{ fontWeight: "700", color: "#16a34a", marginTop: "8px" }}>📧 Support Email: goexam777@gmail.com</p>
        <p style={{ fontSize: "0.9rem", color: "#475569", marginTop: "6px" }}>Our support team responds within 24 hours to ensure you receive your complete Nursing Notes.</p>
      </section>

      <div style={{ marginTop: "32px", borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
        <a href="/nursing-notes" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>← Back to Nursing Notes Page</a>
      </div>
    </main>
  );
}
