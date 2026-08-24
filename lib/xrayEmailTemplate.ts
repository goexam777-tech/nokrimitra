interface XrayEmailParams {
  customerName: string;
  productName: string;
  orderId: string;
  amount: number;
  downloadUrl: string;
  downloads?: { label: string; url: string }[];
  brandName?: string;
  supportEmail?: string;
}

export function buildXrayEmailText({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  downloads,
  brandName = "X-Ray Diagnosis",
  supportEmail = "support@nokrimitra.in",
}: XrayEmailParams): string {
  const links =
    downloads && downloads.length
      ? downloads.map((d) => `- ${d.label}: ${d.url}`).join("\n")
      : downloadUrl;

  return `Payment Successful!

Hi ${customerName || "there"},

Thank you for purchasing ${productName}. Your payment was successful and your files are ready to download.

Download link(s):
${links}

Order Details:
- Product: ${productName}
- Order ID: ${orderId}
- Amount Paid: ₹${amount}

Keep this email safe. You can access and re-download your PDF anytime on any device.

If you have any questions or need assistance, contact our support team at ${supportEmail}.

Warm regards,
${brandName} Team`;
}

export function buildXrayEmail({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  downloads,
  brandName = "X-Ray Diagnosis",
  supportEmail = "support@nokrimitra.in",
}: XrayEmailParams): string {
  const greenHeader = "#15803d";
  const greenDark = "#0f5127";
  const greenBtn = "#16a34a";
  const greenBtnHover = "#15803d";

  const buttonList =
    downloads && downloads.length
      ? downloads
      : [{ label: "DOWNLOAD X-RAY DIAGNOSIS GUIDE", url: downloadUrl }];

  const buttonsHtml = buttonList
    .map(
      (d) => `
                <tr>
                  <td align="center" style="padding:0 0 12px 0;">
                    <a href="${d.url}" target="_blank"
                       style="display:block;width:100%;max-width:440px;padding:16px 24px;border-radius:14px;background:linear-gradient(180deg,${greenBtn} 0%,${greenBtnHover} 100%);color:#ffffff;font-size:15.5px;font-weight:600;text-decoration:none;text-align:center;box-shadow:0 8px 22px rgba(22,163,74,0.38);box-sizing:border-box;">
                      📥 ${d.label}
                    </a>
                  </td>
                </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${productName}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Roboto,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;color:#0f172a;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Order Confirmed! Access your X-Ray Diagnosis Guide PDF now.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 12px 36px rgba(15,23,42,0.08);border:1px solid #e2e8f0;">

          <tr>
            <td style="background:linear-gradient(135deg,${greenHeader} 0%,${greenDark} 100%);padding:36px 28px;text-align:center;">
              <div style="display:inline-block;width:64px;height:64px;line-height:64px;border-radius:50%;background:rgba(255,255,255,0.18);font-size:32px;margin-bottom:12px;">
                🩻
              </div>
              <h1 style="margin:0 0 6px 0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.01em;">Payment Successful!</h1>
              <p style="margin:0;color:#dcfce7;font-size:14.5px;font-weight:500;">Your X-Ray Diagnosis Guide PDF is confirmed</p>
            </td>
          </tr>

          <tr>
            <td style="padding:36px 32px 16px 32px;">
              <p style="margin:0 0 14px 0;font-size:17px;font-weight:600;color:#0f172a;">Hi <strong>${customerName || "Customer"}</strong> 👋,</p>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#334155;">
                Thank you for purchasing the <strong>${productName}</strong>! Your transaction was verified successfully. Click the button below to download your complete PDF guide immediately.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;margin:0 0 28px 0;overflow:hidden;">
                <tr>
                  <td style="padding:16px 20px;background:#f0fdf4;border-bottom:1px solid #dcfce7;">
                    <span style="font-size:12px;font-weight:700;color:${greenHeader};text-transform:uppercase;letter-spacing:0.8px;">OFFICIAL ORDER RECEIPT</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#64748b;font-weight:500;">Product:</td>
                        <td style="padding:4px 0;font-size:14px;color:#0f172a;font-weight:600;text-align:right;">${productName}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#64748b;font-weight:500;">Order ID:</td>
                        <td style="padding:4px 0;font-size:14px;color:#0f172a;font-weight:600;text-align:right;"><code style="background:#e2e8f0;padding:2px 7px;border-radius:5px;font-family:monospace;font-size:13px;">${orderId}</code></td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0 0 0;font-size:14px;color:#64748b;font-weight:500;">Total Paid:</td>
                        <td style="padding:8px 0 0 0;font-size:18px;color:${greenBtn};font-weight:700;text-align:right;">₹${amount}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${buttonsHtml}
              </table>

              <div style="background-color:#f1f5f9;border-radius:12px;padding:14px 18px;text-align:center;margin-bottom:24px;">
                <p style="margin:0;font-size:13px;color:#475569;font-weight:600;line-height:1.45;">
                  🔒 <strong>Lifetime &amp; Multi-Device Access:</strong> Save this email! This download link works anytime on Mobile, Tablet, Laptop, or PC.
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 32px 32px;background-color:#fafafa;border-top:1px solid #f1f5f9;">
              <p style="margin:0 0 10px 0;font-size:13.5px;color:#475569;line-height:1.5;">
                Need help with your download? Reply directly to this email or reach our dedicated support desk:
              </p>
              <p style="margin:0 0 16px 0;font-size:14.5px;font-weight:700;">
                ✉️ Support Email: <a href="mailto:${supportEmail}" style="color:${greenHeader};text-decoration:none;">${supportEmail}</a>
              </p>
              <p style="margin:0;font-size:11.5px;color:#94a3b8;line-height:1.5;">
                This guide is designed for education &amp; clinical revision. Always follow your institution&apos;s guidelines and professional judgment.
              </p>
            </td>
          </tr>

          <tr style="background-color:#0f172a;">
            <td style="padding:18px 24px;text-align:center;">
              <p style="margin:0;font-size:12.5px;color:#94a3b8;font-weight:500;">© ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
