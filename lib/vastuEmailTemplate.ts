interface VastuDownload {
  label: string;
  url: string;
}

interface VastuEmailParams {
  customerName: string;
  productName: string;
  orderId: string;
  amount: number;
  downloadUrl: string;
  downloads?: VastuDownload[];
  brandName?: string;
  supportEmail?: string;
}

export function buildVastuEmailText({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  downloads,
  brandName = "NokriMitra",
  supportEmail = "goexam777@gmail.com",
}: VastuEmailParams): string {
  const list =
    downloads && downloads.length
      ? downloads.map((d) => `- ${d.label}: ${d.url}`).join("\n")
      : `- Your bundle: ${downloadUrl}`;

  return `Payment Successful!

Hi ${customerName || "there"},

Thank you for purchasing ${productName}. Your payment was successful and your files are ready to download.

Your download links:
${list}

Order details:
- Order ID: ${orderId}
- Amount paid: Rs.${amount}
- Product: ${productName}

Tip: Please download and save your files safely on your computer or laptop. The bundle includes house plans, AutoCAD blocks, 3D elevations, Vastu files and courses.

For any help, reply to this email or contact ${supportEmail} / WhatsApp +91 91048 26422.

Thank you,
${brandName} Team`;
}

export function buildVastuEmail({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  downloads,
  brandName = "NokriMitra",
  supportEmail = "goexam777@gmail.com",
}: VastuEmailParams): string {
  const navy = "#0a1024";
  const blue = "#1e63d3";
  const green = "#16a34a";

  const items =
    downloads && downloads.length
      ? downloads
      : [{ label: "Download Now", url: downloadUrl }];

  const buttonsHtml = items
    .map(
      (d) => `
                <tr>
                  <td align="center" style="padding:6px 0;">
                    <a href="${d.url}" target="_blank"
                       style="background-color:${green};color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:13px 30px;border-radius:8px;display:inline-block;min-width:240px;">
                      ⬇ ${d.label}
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
<body style="margin:0;padding:0;background-color:#eef1f6;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#1f2937;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your order is confirmed — download ${productName}.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef1f6;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <tr>
            <td style="background:linear-gradient(135deg,${navy},#14224a);padding:32px 24px;text-align:center;">
              <div style="font-size:40px;line-height:1;">🎉</div>
              <h1 style="margin:12px 0 4px 0;color:#ffffff;font-size:24px;font-weight:800;">Payment Successful!</h1>
              <p style="margin:0;color:#a9c4f5;font-size:14px;">Your order is confirmed and ready to download</p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 28px 8px 28px;">
              <p style="margin:0 0 12px 0;font-size:16px;">Hi <strong>${customerName || "there"}</strong>,</p>
              <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;color:#4b5563;">
                Thank you for purchasing <strong>${productName}</strong>. Your payment was successful. Click the button below to download your bundle.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef4ff;border:1px solid #c3d8fb;border-radius:12px;margin:0 0 24px 0;">
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:${blue};text-transform:uppercase;letter-spacing:.4px;">Order Details</p>
                    <p style="margin:0;font-size:14px;color:#374151;">Order ID: <strong>${orderId}</strong></p>
                    <p style="margin:4px 0 0 0;font-size:14px;color:#374151;">Amount paid: <strong>₹${amount}</strong></p>
                    <p style="margin:4px 0 0 0;font-size:14px;color:#374151;">Product: <strong>${productName}</strong></p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 8px 0;">
                ${buttonsHtml}
              </table>

              <p style="margin:16px 0 0 0;font-size:13px;color:#6b7280;text-align:center;">
                If a button doesn't work, copy and paste the link into your browser.
              </p>

              <p style="margin:20px 0 0 0;font-size:12px;color:#757575;background-color:#f9fafb;border-radius:8px;padding:12px 14px;line-height:1.5;">
                Please save your files safely on your computer or laptop. The bundle includes house plans, AutoCAD blocks, 3D elevations, Vastu files and courses.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 28px 28px 28px;">
              <hr style="border:0;border-top:1px solid #eee;margin:0 0 16px 0;" />
              <p style="margin:0;font-size:14px;color:#4b5563;">
                For any help, reply to this email or contact
                <a href="mailto:${supportEmail}" style="color:${blue};">${supportEmail}</a> / WhatsApp <strong>+91 91048 26422</strong>.
              </p>
              <p style="margin:12px 0 0 0;font-size:14px;color:#4b5563;">Thank you! 🙏<br /><strong>${brandName} Team</strong></p>
            </td>
          </tr>

          <tr>
            <td style="background-color:${navy};padding:18px 24px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
