import { buildNursingEmail } from "@/lib/nursingEmailTemplate";

export default function NursingEmailPreviewPage() {
  const sampleEmailHtml = buildNursingEmail({
    customerName: "Anjali Sharma",
    productName: "ALL-In-One Nursing Notes (600+ Pages PDF)",
    orderId: "order_NUR_874921",
    amount: 199,
    downloadUrl: "https://drive.google.com/",
    brandName: "Nursing Notes",
    supportEmail: "support@nokrimitra.in",
  });

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#0f172a", padding: "20px", color: "#fff", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "1.2rem", margin: 0 }}>📧 Nursing Notes Auto-Email Template Preview</h1>
        <a href="/nursing-notes" style={{ color: "#38bdf8", textDecoration: "none", fontWeight: "600" }}>← Back to Nursing Notes</a>
      </div>

      <div style={{ width: "100%", maxWidth: "680px", margin: "0 auto", background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
        <iframe
          srcDoc={sampleEmailHtml}
          title="Nursing Notes Auto Email Template Preview"
          style={{ width: "100%", height: "960px", border: "none" }}
        />
      </div>
    </div>
  );
}
