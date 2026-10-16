export interface MedicalDownloadItem {
  label: string;
  url: string;
}

interface MedicalEmailParams {
  customerName: string;
  productName: string;
  orderId: string;
  amount: number;
  downloadUrl: string;
  downloads?: MedicalDownloadItem[];
  supportEmail?: string;
}

export const MEDICAL_SUPPORT_EMAIL = "support@nokrimitra.in";
/** Subject line + inbox preview text */
export const MEDICAL_EMAIL_SUBJECT = "Payment Successful - Your Medical Masterbook is Ready";
export const MEDICAL_EMAIL_PREHEADER =
  "Your order is confirmed. Click the button below to open your Medical Masterbook.";

const BRAND = "#7b55ab";
const BRAND_SOFT = "#F4EFFA";
const FONT = "Arial,Helvetica,sans-serif";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildMedicalEmailText({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  downloads,
  supportEmail = MEDICAL_SUPPORT_EMAIL,
}: MedicalEmailParams): string {
  const linksList =
    downloads && downloads.length > 0
      ? downloads.map((d, i) => `${i + 1}. ${d.label}: ${d.url}`).join("\n")
      : `Download Link: ${downloadUrl}`;

  return `Payment Successful

Hi ${customerName || "there"},

Your payment is confirmed and your order is ready.

${linksList}

Book: ${productName}
Order ID: ${orderId}
Amount paid: Rs ${amount}

This link is valid for 1 year on any device. Please do not share your private link.

Need help? Reply to this email or write to: ${supportEmail}`;
}

/**
 * Light card-style email matching the checkout / thank-you pages.
 */
export function buildMedicalEmail({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  downloads,
  supportEmail = MEDICAL_SUPPORT_EMAIL,
}: MedicalEmailParams): string {
  const name = escapeHtml(customerName || "there");
  const product = escapeHtml(productName);
  const order = escapeHtml(orderId);

  const row = (
    label: string,
    value: string,
    opts: { bold?: boolean; breakAll?: boolean; first?: boolean } = {}
  ) => `
                      <tr>
                        <td valign="top" style="padding:11px 0;${opts.first ? "" : "border-top:1px solid #E9E4F2;"}font-family:${FONT};font-size:14px;white-space:nowrap;color:${opts.bold ? "#111111" : "#6B6B6B"};${opts.bold ? "font-weight:bold;" : ""}">${label}</td>
                        <td align="right" style="padding:11px 0 11px 16px;${opts.first ? "" : "border-top:1px solid #E9E4F2;"}font-family:${FONT};font-size:14px;color:#111111;font-weight:bold;${opts.breakAll ? "word-break:break-all;" : ""}">${value}</td>
                      </tr>`;

  const buttonsHtml =
    downloads && downloads.length > 0
      ? downloads
          .map(
            (d, idx) => `
                <tr>
                  <td align="center" style="padding-bottom:${idx < downloads.length - 1 ? "10px" : "0"};">
                    <a href="${d.url}" target="_blank" style="display:block;padding:14px 20px;background-color:${idx === 0 ? BRAND : "#0f172a"};border-radius:10px;font-family:${FONT};font-size:15px;font-weight:bold;color:#FFFFFF;text-decoration:none;">Download ${escapeHtml(d.label)} &rarr;</a>
                  </td>
                </tr>`
          )
          .join("")
      : `
                <tr>
                  <td align="center" style="background-color:${BRAND};border-radius:10px;">
                    <a href="${downloadUrl}" target="_blank" style="display:block;padding:16px 20px;font-family:${FONT};font-size:16px;font-weight:bold;color:#FFFFFF;text-decoration:none;">Open Medical Masterbook PDF &rarr;</a>
                  </td>
                </tr>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>${MEDICAL_EMAIL_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F5F7;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${MEDICAL_EMAIL_PREHEADER}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5F5F7;">
    <tr>
      <td align="center" style="padding:28px 12px;">

        <!-- Brand line -->
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:520px;">
          <tr>
            <td style="padding:0 4px 12px;font-family:${FONT};font-size:13px;font-weight:bold;letter-spacing:.6px;color:${BRAND};">&#129658; MEDICAL MASTERBOOK</td>
          </tr>
        </table>

        <!-- Card -->
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:520px;background-color:#FFFFFF;border:1px solid #E6E6E6;border-radius:14px;">
          <tr>
            <td style="height:5px;line-height:5px;font-size:0;background-color:${BRAND};border-radius:14px 14px 0 0;">&nbsp;</td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="center" style="padding:28px 24px 0;font-family:${FONT};">
              <div style="display:inline-block;width:52px;height:52px;line-height:52px;border-radius:50%;background-color:#E8F8EF;color:#16A34A;font-size:28px;font-weight:bold;text-align:center;">&#10003;</div>
              <h1 style="margin:14px 0 6px;font-family:${FONT};font-size:22px;line-height:1.3;color:#111111;">Payment Successful</h1>
              <p style="margin:0;font-family:${FONT};font-size:15px;line-height:1.6;color:#52525B;">Hi ${name}, your order is confirmed and ready.<br>Click below to download your files.</p>
            </td>
          </tr>

          <!-- Buttons -->
          <tr>
            <td style="padding:22px 24px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${buttonsHtml}
              </table>
            </td>
          </tr>

          <!-- Order details -->
          <tr>
            <td style="padding:22px 24px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND_SOFT};border-radius:10px;">
                <tr>
                  <td style="padding:6px 16px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${row("Book", product, { first: true })}${row("Order ID", order, { breakAll: true })}${row("Amount paid", `&#8377;${amount}`, { bold: true })}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Fallback link + note -->
          <tr>
            <td style="padding:18px 24px 26px;font-family:${FONT};font-size:12px;line-height:1.7;color:#8A8A8A;">
              If the button does not work, copy and open this link in your browser:<br>
              <a href="${downloadUrl}" style="color:${BRAND};word-break:break-all;">${downloadUrl}</a><br><br>
              This link is valid for 1 year on any device. Please do not share it.
            </td>
          </tr>
        </table>

        <!-- Support -->
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:520px;">
          <tr>
            <td align="center" style="padding:18px 8px 0;font-family:${FONT};font-size:13px;line-height:1.7;color:#6B6B6B;">
              Need help? Reply to this email or contact us at<br>
              <a href="mailto:${supportEmail}" style="color:${BRAND};font-weight:bold;text-decoration:none;">${supportEmail}</a>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
