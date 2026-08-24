import { buildXrayEmail } from "@/lib/xrayEmailTemplate";

export default function XrayEmailPreviewPage() {
  const sampleEmailHtml = buildXrayEmail({
    customerName: "Rahul Mehta",
    productName: "X-Ray Diagnosis Guide (PDF)",
    orderId: "order_XR_874921",
    amount: 199,
    downloadUrl: "https://drive.google.com/",
    brandName: "X-Ray Diagnosis",
    supportEmail: "support@nokrimitra.in",
  });

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#0f172a",
        padding: "20px",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "1.2rem", margin: 0 }}>
          📧 X-Ray Diagnosis Auto-Email Preview
        </h1>
        <a
          href="/xray-diagnosis"
          style={{ color: "#38bdf8", textDecoration: "none", fontWeight: 600 }}
        >
          ← Back to X-Ray Diagnosis
        </a>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        }}
      >
        <iframe
          srcDoc={sampleEmailHtml}
          title="X-Ray Diagnosis Auto Email Template Preview"
          style={{ width: "100%", height: "960px", border: "none" }}
        />
      </div>
    </div>
  );
}
