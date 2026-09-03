"use client";

import { useState } from "react";
import { buildNorcetEmail, buildNorcetEmailText } from "@/lib/norcetEmailTemplate";

export default function NorcetEmailPreviewPage() {
  const [customerName, setCustomerName] = useState("Priya Sharma");
  const [viewMode, setViewMode] = useState<"html" | "text">("html");

  const sampleEmailHtml = buildNorcetEmail({
    customerName,
    productName: "NORCET 11 Notes (700+ Pages PDF)",
    orderId: "ORD_NORCET_88492",
    amount: 149,
    downloadUrl: "https://nokrimitra.in/norcet-notes/go",
    brandName: "NokriMitra",
    supportEmail: "support@nokrimitra.in",
  });

  const sampleEmailText = buildNorcetEmailText({
    customerName,
    productName: "NORCET 11 Notes (700+ Pages PDF)",
    orderId: "ORD_NORCET_88492",
    amount: 149,
    downloadUrl: "https://nokrimitra.in/norcet-notes/go",
    brandName: "NokriMitra",
    supportEmail: "support@nokrimitra.in",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", padding: "24px 16px" }}>
      {/* Controls Bar */}
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto 20px",
          background: "#ffffff",
          padding: "16px 20px",
          borderRadius: "14px",
          border: "1px solid #cbd5e1",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: "17px", fontWeight: 800, color: "#0f172a" }}>
            📧 NORCET 11 Automatic Email Preview
          </h2>
          <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
            This exact email is automatically sent to the customer upon payment.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontSize: "13px", fontWeight: 600, color: "#334155" }}>
            Name:
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{
                marginLeft: "6px",
                padding: "4px 8px",
                fontSize: "13px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
              }}
            />
          </label>

          <button
            onClick={() => setViewMode(viewMode === "html" ? "text" : "html")}
            style={{
              background: "#1f57e7",
              color: "#ffffff",
              border: "none",
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Switch to {viewMode === "html" ? "Plain Text" : "HTML View"}
          </button>
        </div>
      </div>

      {/* Render Email */}
      {viewMode === "html" ? (
        <div style={{ maxWidth: "660px", margin: "0 auto" }}>
          <iframe
            srcDoc={sampleEmailHtml}
            title="Email Preview"
            style={{
              width: "100%",
              height: "760px",
              border: "none",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              background: "#ffffff",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            background: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid #cbd5e1",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          {sampleEmailText}
        </div>
      )}
    </div>
  );
}
