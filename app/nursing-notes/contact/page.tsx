import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Nursing Notes",
  description: "Contact and support for Nursing Notes E-Book.",
};

export default function NursingContactPage() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", color: "#0f172a", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "20px" }}>Contact Us - Nursing Notes</h1>
      <p style={{ color: "#475569", marginBottom: "24px" }}>
        Have questions about your Nursing Notes purchase or need help downloading your PDF? We are here to assist you!
      </p>

      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px" }}>📧 Official Support Email</h2>
        <p style={{ fontSize: "1.1rem", fontWeight: "800", color: "#16a34a", margin: "0 0 8px" }}>
          goexam777@gmail.com
        </p>
        <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>
          Response Time: Within 24 Hours (Monday to Saturday)
        </p>
      </div>

      <section style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "10px" }}>How to get fast support:</h2>
        <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
          <li>Include your <strong>Payment/Transaction ID</strong> or registered email address in your message.</li>
          <li>If you haven’t received the email link, please check your <strong>Spam / Promotions folder</strong> first.</li>
        </ul>
      </section>

      <div style={{ marginTop: "32px", borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
        <a href="/nursing-notes" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>← Back to Nursing Notes Page</a>
      </div>
    </main>
  );
}
