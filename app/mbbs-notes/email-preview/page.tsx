import { buildMbbsEmail, buildMbbsEmailText } from "@/lib/mbbsEmailTemplate";

export default function MbbsEmailPreviewPage() {
  const sampleData = {
    customerName: "Dr. Aarav Mehta",
    productName: "Complete MBBS Notes (All 21 Subjects)",
    orderId: "order_MBBS_9104826422_DEMO",
    amount: 199,
    downloadUrl: "https://drive.google.com/drive/folders/1b1aOjTrXiKqu_LXOHcqA58zPgxQEbkZh",
    brandName: "NokriMitra",
    supportEmail: "support@nokrimitra.in",
  };

  const htmlContent = buildMbbsEmail(sampleData);
  const textContent = buildMbbsEmailText(sampleData);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#f8fafc",
        padding: "32px 16px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        <div style={{ marginBottom: "24px", textAlign: "center" }}>
          <span
            style={{
              background: "rgba(11, 107, 58, 0.2)",
              color: "#4ade80",
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Live Email Delivery Preview
          </span>
          <h1 style={{ fontSize: "24px", marginTop: "12px", marginBottom: "6px" }}>
            MBBS Notes Order Confirmation & Delivery Email
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>
            Subject:{" "}
            <strong style={{ color: "#fff" }}>
              Complete MBBS Notes (All 21 Subjects): Your download link is ready! 🩺📚
            </strong>
          </p>
          <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "4px" }}>
            Sender: <strong style={{ color: "#fff" }}>NokriMitra &lt;download@pdf.nokrimitra.in&gt;</strong>
          </p>
        </div>

        {/* Rendered HTML Email Frame */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            marginBottom: "32px",
          }}
        >
          <iframe
            srcDoc={htmlContent}
            style={{
              width: "100%",
              minHeight: "720px",
              border: "none",
              display: "block",
            }}
            title="MBBS Email Preview"
          />
        </div>

        {/* Raw Plain Text Email Version */}
        <div
          style={{
            background: "#1e293b",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #334155",
          }}
        >
          <h2 style={{ fontSize: "15px", color: "#cbd5e1", marginTop: 0, marginBottom: "12px" }}>
            📄 Plain Text Version (Fallback for spam-protection & older inboxes)
          </h2>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: "13px",
              color: "#94a3b8",
              fontFamily: "monospace",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {textContent}
          </pre>
        </div>
      </div>
    </div>
  );
}
