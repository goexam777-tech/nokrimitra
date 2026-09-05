interface MedicalEmailParams {
  customerName: string;
  productName: string;
  orderId: string;
  amount: number;
  downloadUrl: string;
  brandName?: string;
  supportEmail?: string;
}

export function buildMedicalEmailText({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  brandName = "NokriMitra",
  supportEmail = "support@nokrimitra.in",
}: MedicalEmailParams): string {
  return `Payment Successful!

Hi ${customerName || "there"},

Thank you for purchasing ${productName}! Your payment of ₹${amount} was verified successfully, and your complete 31 Medical Master PDFs Bundle (20 Core PDFs + 11 Free Bonuses) is ready to download.

Download link:
${downloadUrl}

Order Summary:
- Product: ${productName}
- Order ID: ${orderId}
- Amount Paid: ₹${amount}
- Included: 20 Core Medical PDFs + 11 FREE Medical Master Bonus Guides
- Access: Lifetime Validity · Mobile & Laptop Friendly

Keep this email safe. You can re-download your PDF bundle anytime.

If you have any questions or need help, reach out to our team at ${supportEmail}.

Best regards,
${brandName} Team`;
}

export function buildMedicalEmail({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  brandName = "NokriMitra",
  supportEmail = "support@nokrimitra.in",
}: MedicalEmailParams): string {
  const brandPink = "#db2777";
  const navyDark = "#0f172a";
  const greenBtn = "#16a34a";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${productName}</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;color:#0f172a;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Order Confirmed! Your 31 Medical Master PDFs Bundle (20 Core + 11 Free Bonuses) is ready to download.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 12px 36px rgba(15,23,42,0.08);border:1px solid #e2e8f0;">

          <!-- Top Brand Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg,${brandPink} 0%,${navyDark} 100%);padding:36px 28px;text-align:center;">
              <div style="display:inline-block;width:64px;height:64px;line-height:64px;border-radius:50%;background:rgba(255,255,255,0.18);font-size:32px;margin-bottom:12px;">
                🩺
              </div>
              <h1 style="margin:0 0 6px 0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.01em;">Payment Successful!</h1>
              <p style="margin:0;color:#fce7f3;font-size:14.5px;font-weight:500;">Your 31 Medical Master PDFs Bundle is ready</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:36px 32px 20px 32px;">
              <p style="margin:0 0 14px 0;font-size:17px;font-weight:600;color:#0f172a;">Hi <strong>${customerName || "there"}</strong> 👋,</p>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#334155;">
                Thank you for purchasing <strong>${productName}</strong>! Your payment was verified successfully. Click the button below to download your complete 31 PDFs bundle immediately.
              </p>

              <!-- Order Receipt Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;margin:0 0 28px 0;overflow:hidden;">
                <tr>
                  <td style="padding:14px 20px;background:#fdf2f8;border-bottom:1px solid #fbcfe8;">
                    <span style="font-size:12px;font-weight:800;color:#db2777;text-transform:uppercase;letter-spacing:0.8px;">OFFICIAL ORDER RECEIPT</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#64748b;">Product:</td>
                        <td align="right" style="padding:6px 0;font-size:14px;font-weight:700;color:#0f172a;">${productName}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#64748b;">Order ID:</td>
                        <td align="right" style="padding:6px 0;font-size:13.5px;font-family:monospace;font-weight:600;color:#475569;">${orderId}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#64748b;">Amount Paid:</td>
                        <td align="right" style="padding:6px 0;font-size:16px;font-weight:800;color:#16a34a;">₹${amount}/-</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#64748b;">Access:</td>
                        <td align="right" style="padding:6px 0;font-size:13.5px;font-weight:600;color:#059669;">✓ Instant &bull; Lifetime Validity</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Big Primary CTA Download Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px 0;">
                <tr>
                  <td align="center">
                    <a href="${downloadUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:100%;max-width:420px;background:linear-gradient(135deg,#22c55e 0%,${greenBtn} 100%);color:#ffffff;text-decoration:none;font-size:16.5px;font-weight:800;letter-spacing:0.02em;padding:17px 28px;border-radius:12px;text-align:center;box-shadow:0 8px 22px rgba(22,163,74,0.38);box-sizing:border-box;">
                      📥 DOWNLOAD ALL 31 MEDICAL PDFs NOW
                    </a>
                    <p style="margin:10px 0 0 0;font-size:12.5px;color:#16a34a;font-weight:700;">⚡ Instant Google Drive Access &bull; Lifetime Access</p>
                  </td>
                </tr>
              </table>

              <!-- What's Included Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fdf2f8;border:1px solid #fbcfe8;border-radius:12px;padding:16px;margin:0 0 24px 0;">
                <tr>
                  <td>
                    <p style="margin:0 0 10px 0;font-size:13.5px;font-weight:800;color:#db2777;">📚 What is Included in Your Bundle:</p>
                    <ul style="margin:0;padding-left:20px;font-size:13px;line-height:1.6;color:#334155;">
                      <li>20 Core Medical PDFs (Clinical Cases, Anatomy, Pharma, ECG, Lab)</li>
                      <li>11 FREE Medical Master Bonus Books & Revision Summaries</li>
                      <li>Drug Dose Guide & Emergency Medicine Quick Handbooks</li>
                      <li>Print-ready crystal-clear HD PDF format</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Support Note -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;border-radius:10px;padding:14px 18px;margin:0 0 12px 0;">
                <tr>
                  <td style="font-size:13px;line-height:1.5;color:#475569;text-align:center;">
                    💬 Need any assistance with your download? Reply to this email or contact us at <a href="mailto:${supportEmail}" style="color:#db2777;font-weight:700;text-decoration:underline;">${supportEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#0f172a;padding:22px 24px;text-align:center;border-top:1px solid #1e293b;">
              <p style="margin:0 0 4px 0;color:#f8fafc;font-size:13.5px;font-weight:700;">${brandName}</p>
              <p style="margin:0;color:#94a3b8;font-size:12px;">&copy; ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
