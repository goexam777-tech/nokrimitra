interface NorcetEmailParams {
  customerName: string;
  productName: string;
  orderId: string;
  amount: number;
  downloadUrl: string;
  brandName?: string;
  supportEmail?: string;
}

export function buildNorcetEmailText({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  brandName = "NokriMitra",
  supportEmail = "support@nokrimitra.in",
}: NorcetEmailParams): string {
  return `Payment Successful!

Hi ${customerName || "there"},

Thank you for purchasing ${productName}. Your payment of ₹${amount} was successful, and your complete 700+ Pages NORCET 11 Notes PDF bundle is ready to download.

Download link:
${downloadUrl}

Order Summary:
- Product: ${productName}
- Order ID: ${orderId}
- Amount Paid: ₹${amount}
- Included Bonuses: 1,000+ Drug Notes, Clinical Skills Handbook & Nursing Exam Master Bundle (10,000+ MCQs)

Keep this email safe. You have lifetime access and can re-download your PDF anytime on your phone, tablet, or laptop.

If you have any questions, reach out to our team at ${supportEmail}.

Best regards,
${brandName} Team`;
}

export function buildNorcetEmail({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  brandName = "NokriMitra",
  supportEmail = "support@nokrimitra.in",
}: NorcetEmailParams): string {
  const blueHeader = "#1f57e7";
  const navyDark = "#111a3b";
  const btnBlue = "#1f57e7";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${productName}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;color:#0f172a;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Order Confirmed! Your 700+ Pages NORCET 11 Notes PDF + 3 Free Bonuses are ready.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 12px 36px rgba(15,23,42,0.08);border:1px solid #e2e8f0;">

          <!-- Top Brand Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg,${blueHeader} 0%,${navyDark} 100%);padding:36px 28px;text-align:center;">
              <div style="display:inline-block;width:64px;height:64px;line-height:64px;border-radius:50%;background:rgba(255,255,255,0.18);font-size:32px;margin-bottom:12px;">
                🎓
              </div>
              <h1 style="margin:0 0 6px 0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.01em;">Payment Successful!</h1>
              <p style="margin:0;color:#dbeafe;font-size:14.5px;font-weight:500;">Your 700+ Pages NORCET 11 Notes PDF is ready</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:36px 32px 20px 32px;">
              <p style="margin:0 0 14px 0;font-size:17px;font-weight:600;color:#0f172a;">Hi <strong>${customerName || "Candidate"}</strong> 👋,</p>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#334155;">
                Thank you for purchasing <strong>${productName}</strong>! Your payment was verified successfully. Click the button below to download your complete study notes immediately.
              </p>

              <!-- Order Summary Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;margin:0 0 28px 0;overflow:hidden;">
                <tr>
                  <td style="padding:14px 20px;background:#edf5ff;border-bottom:1px solid #bfdbfe;">
                    <span style="font-size:12px;font-weight:800;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.8px;">OFFICIAL ORDER RECEIPT</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;font-size:13.5px;color:#64748b;">Product</td>
                        <td align="right" style="padding:6px 0;font-size:13.5px;font-weight:700;color:#0f172a;">${productName}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13.5px;color:#64748b;">Order ID</td>
                        <td align="right" style="padding:6px 0;font-size:13.5px;font-family:monospace;font-weight:600;color:#334155;">${orderId}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13.5px;color:#64748b;">Amount Paid</td>
                        <td align="right" style="padding:6px 0;font-size:16px;font-weight:800;color:#16a34a;">₹${amount}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13.5px;color:#64748b;">Access</td>
                        <td align="right" style="padding:6px 0;font-size:13.5px;font-weight:700;color:#1d4ed8;">Lifetime Access (PDF)</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Big Download CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px 0;">
                <tr>
                  <td align="center">
                    <a href="${downloadUrl}" target="_blank" style="display:inline-block;width:100%;max-width:400px;background:linear-gradient(180deg,${btnBlue} 0%,#1742b8 100%);color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;letter-spacing:0.02em;padding:16px 24px;border-radius:12px;text-align:center;box-shadow:0 6px 20px rgba(31,87,231,0.35);box-sizing:border-box;">
                      📥 ACCESS COMPLETE NOTES & BONUSES (GOOGLE DRIVE)
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Free Bonuses Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fef08a;border-radius:12px;margin:0 0 28px 0;padding:16px 20px;">
                <tr>
                  <td>
                    <p style="margin:0 0 10px 0;font-size:13px;font-weight:800;color:#b45309;">🎁 3 FREE BONUSES INCLUDED (All inside the same Google Drive folder):</p>
                    <ul style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.7;color:#92400e;font-weight:600;">
                      <li>🥇 1,000+ Drug Notes & Nursing Mnemonics</li>
                      <li>🥈 Nursing Clinical Skills Handbook</li>
                      <li>🥉 Nursing Exam Master Bundle (10,000+ MCQs)</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Safe Storage Advice -->
              <div style="background:#f8fafc;border-left:4px solid #3b82f6;padding:14px 18px;border-radius:0 10px 10px 0;margin:0 0 24px 0;">
                <p style="margin:0;font-size:13px;color:#334155;line-height:1.5;">
                  💡 <strong>Quick Tip:</strong> Please save the PDF file to your Google Drive or device downloads folder so you can study offline anytime without an internet connection.
                </p>
              </div>

              <!-- Support Note -->
              <p style="margin:0 0 8px 0;font-size:13px;color:#64748b;line-height:1.5;">
                Need help or didn't receive your download? Reply directly to this email or contact our support team at <a href="mailto:${supportEmail}" style="color:#1d4ed8;text-decoration:underline;">${supportEmail}</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 32px;text-align:center;">
              <p style="margin:0 0 4px 0;font-size:12px;font-weight:600;color:#475569;">${brandName} · NORCET 11 Notes Platform</p>
              <p style="margin:0;font-size:11px;color:#94a3b8;">© ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
