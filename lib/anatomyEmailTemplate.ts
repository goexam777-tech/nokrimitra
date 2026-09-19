interface AnatomyEmailParams {
  customerName: string;
  productName: string;
  orderId: string;
  amount: number;
  downloadUrl: string;
  coverUrl?: string;
  brandName?: string;
  supportEmail?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeHttpUrl(value: string): string {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? escapeHtml(url.toString())
      : "#";
  } catch {
    return "#";
  }
}

export function buildAnatomyEmailText({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  brandName = "Anatomy Coloring Book",
  supportEmail = "support@nokrimitra.in",
}: AnatomyEmailParams): string {
  return `YOUR ANATOMY COLORING BUNDLE IS READY

Hi ${customerName || "Student"},

Thank you for purchasing ${productName}. Your payment has been verified and your digital PDF bundle is ready.

DOWNLOAD YOUR BUNDLE:
${downloadUrl}

WHAT IS INCLUDED:
- 500+ printable anatomy learning and coloring pages
- Major human body systems
- Multiple-choice questions for revision
- Personal study access on compatible devices

ORDER SUMMARY:
Product: ${productName}
Order ID: ${orderId}
Amount Paid: ₹${amount} INR

Your secure link is valid for 12 months. Save this email. If you ever need a refreshed link, contact ${supportEmail} with your Order ID.

Warm regards,
${brandName} Team`;
}

export function buildAnatomyEmail({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  coverUrl,
  brandName = "Anatomy Coloring Book",
  supportEmail = "support@nokrimitra.in",
}: AnatomyEmailParams): string {
  const safeName = escapeHtml(customerName || "Student");
  const safeProduct = escapeHtml(productName);
  const safeOrderId = escapeHtml(orderId);
  const safeDownloadUrl = safeHttpUrl(downloadUrl);
  const safeCoverUrl = coverUrl ? safeHttpUrl(coverUrl) : "";
  const safeBrand = escapeHtml(brandName);
  const safeSupportEmail = escapeHtml(supportEmail);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>${safeProduct}</title>
</head>
<body style="margin:0;padding:0;background:#edf4fb;color:#172033;font-family:Arial,'Helvetica Neue',sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">Your verified Anatomy Coloring Book download is ready.</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#edf4fb" style="width:100%;background:#edf4fb;">
    <tr>
      <td align="center" style="padding:28px 12px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #dce7f3;border-radius:18px;overflow:hidden;">
          <tr>
            <td bgcolor="#102a43" style="padding:10px 24px;background:#102a43;color:#d8f3dc;font-size:12px;font-weight:700;text-align:center;letter-spacing:.08em;text-transform:uppercase;">
              Payment verified • Secure digital delivery
            </td>
          </tr>
          <tr>
            <td bgcolor="#1769aa" style="padding:30px 26px;background:#1769aa;text-align:center;">
              <div style="margin:0 0 10px;color:#bfe3ff;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">500+ Human Anatomy Coloring Book Bundle</div>
              <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.18;font-weight:800;">Learn it. Color it. Remember it.</h1>
              <p style="margin:10px 0 0;color:#e8f5ff;font-size:15px;line-height:1.55;">Your complete anatomy study bundle is ready to download.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 26px 8px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  ${safeCoverUrl ? `<td width="104" valign="top" style="width:104px;padding:0 20px 0 0;"><img src="${safeCoverUrl}" width="104" alt="Human Anatomy Coloring Book Bundle cover" style="display:block;width:104px;height:auto;border:0;border-radius:10px;"></td>` : ""}
                  <td valign="top">
                    <p style="margin:0 0 8px;color:#172033;font-size:17px;font-weight:700;">Hi ${safeName},</p>
                    <p style="margin:0;color:#506176;font-size:15px;line-height:1.65;">Thank you for your purchase. Your Razorpay payment has been verified and your digital PDF bundle is available now.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 26px 8px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f9fd" style="background:#f5f9fd;border:1px solid #dce7f3;border-radius:12px;">
                <tr>
                  <td style="padding:18px 18px 8px;color:#1769aa;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;">Inside your bundle</td>
                </tr>
                <tr>
                  <td style="padding:0 18px 18px;color:#334e68;font-size:14px;line-height:1.8;">
                    <strong style="color:#1f7a4d;">✓</strong>&nbsp; 500+ printable anatomy coloring pages<br>
                    <strong style="color:#1f7a4d;">✓</strong>&nbsp; All major human body systems<br>
                    <strong style="color:#1f7a4d;">✓</strong>&nbsp; Multiple-choice revision questions<br>
                    <strong style="color:#1f7a4d;">✓</strong>&nbsp; Digital PDF for personal study
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:20px 26px 10px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td align="center" bgcolor="#28a745" style="border-radius:8px;background:#28a745;">
                    <a href="${safeDownloadUrl}" target="_blank" style="display:inline-block;padding:16px 30px;color:#ffffff;font-size:16px;font-weight:800;text-decoration:none;line-height:1.2;">DOWNLOAD YOUR ANATOMY BUNDLE</a>
                  </td>
                </tr>
              </table>
              <p style="margin:13px 0 0;color:#718096;font-size:12px;line-height:1.5;">Button not working? Copy this secure link:</p>
              <p style="margin:4px auto 0;max-width:500px;word-break:break-all;color:#1769aa;font-size:12px;line-height:1.5;"><a href="${safeDownloadUrl}" style="color:#1769aa;text-decoration:underline;">${safeDownloadUrl}</a></p>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 26px 8px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #e6edf5;border-bottom:1px solid #e6edf5;">
                <tr>
                  <td style="padding:15px 0;color:#6b7c93;font-size:13px;">Product</td>
                  <td align="right" style="padding:15px 0;color:#172033;font-size:13px;font-weight:700;">${safeProduct}</td>
                </tr>
                <tr>
                  <td style="padding:0 0 15px;color:#6b7c93;font-size:13px;">Order ID</td>
                  <td align="right" style="padding:0 0 15px;color:#172033;font-family:monospace;font-size:12px;font-weight:700;">${safeOrderId}</td>
                </tr>
                <tr>
                  <td style="padding:0 0 15px;color:#6b7c93;font-size:13px;">Amount paid</td>
                  <td align="right" style="padding:0 0 15px;color:#1f7a4d;font-size:16px;font-weight:800;">₹${amount} INR</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 26px 26px;color:#62748a;font-size:13px;line-height:1.65;">
              <p style="margin:0 0 10px;"><strong style="color:#334e68;">Keep this email safe.</strong> Your secure link is valid for 12 months. If you need a refreshed link later, send your Order ID to support.</p>
              <p style="margin:0;">Need help? Reply to this email or contact <a href="mailto:${safeSupportEmail}" style="color:#1769aa;font-weight:700;text-decoration:none;">${safeSupportEmail}</a>.</p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#102a43" style="padding:18px 24px;background:#102a43;text-align:center;color:#9fb3c8;font-size:12px;line-height:1.5;">
              © ${new Date().getFullYear()} ${safeBrand} • Digital study resource for personal use
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
