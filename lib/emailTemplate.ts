interface OrderEmailParams {
  customerName: string;
  productName: string;
  orderId: string;
  amount: number; // in rupees
  downloadUrl: string;
  brandName?: string;
  supportEmail?: string;
}

/**
 * Plain-text version of the order email.
 */
export function buildOrderEmailText({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  brandName = "NokriMitra.in",
  supportEmail = "support@nokrimitra.in",
}: OrderEmailParams): string {
  return `ચુકવણી સફળ રહી! (Payment Successful!)

પ્રિય ${customerName || "વિદ્યાર્થી"},

GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ ખરીદવા બદલ આપનો ખૂબ ખૂબ આભાર. આપનું પેમેન્ટ સફળ રહ્યું છે અને આપની PDF ફાઇલ્સ ડાઉનલોડ કરવા માટે તૈયાર છે.

અહીં ક્લિક કરીને આપનો કોર્સ ડાઉનલોડ કરો:
${downloadUrl}

ઓર્ડર વિગતો (Order Details):
- ઓર્ડર આઈડી: ${orderId}
- ચૂકવેલ રકમ: Rs.${amount}
- પ્રોડક્ટ: ${productName}

સૂચના: આપની ફાઇલ્સને આપના ફોન કે કોમ્પ્યુટરમાં સુરક્ષિત રીતે ડાઉનલોડ કરીને સાચવી લેવા વિનંતી છે.

કોઈપણ પ્રશ્ન કે મદદ માટે સીધા જ આ ઈમેલ પર રીપ્લાય કરો અથવા અમને ${supportEmail} પર સંપર્ક કરો અથવા WhatsApp કરો: +91 91048 26422.

તમારી સફળતા માટે શુભેચ્છાઓ! 🙏
${brandName} Team`;
}

/**
 * HTML version of the order email.
 */
export function buildOrderEmail({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  brandName = "NokriMitra.in",
  supportEmail = "support@nokrimitra.in",
}: OrderEmailParams): string {
  const accent = "#0b6b3a";
  const accentDark = "#084d2a";

  return `<!DOCTYPE html>
<html lang="gu">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${productName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati:wght@400;700&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background-color:#f4f6f3;font-family:'Noto Sans Gujarati', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;color:#1f2937;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">આપનો ઓર્ડર કન્ફર્મ થઈ ગયો છે — ડાઉનલોડ કરો ${productName}.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f3;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,${accent},${accentDark});padding:32px 24px;text-align:center;">
              <div style="font-size:40px;line-height:1;">🎉</div>
              <h1 style="margin:12px 0 4px 0;color:#ffffff;font-size:24px;font-weight:800;">પેમેન્ટ સફળ રહ્યું!</h1>
              <p style="margin:0;color:#e8f5e9;font-size:14px;">આપનો ઓર્ડર કન્ફર્મ થઈ ગયો છે અને ડાઉનલોડ માટે તૈયાર છે</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 28px 8px 28px;">
              <p style="margin:0 0 12px 0;font-size:16px;">પ્રિય <strong>${customerName || "વિદ્યાર્થી"}</strong>,</p>
              <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;color:#4b5563;">
                GSRTC કંડક્ટર સંપૂર્ણ PDF કોર્સ ખરીદવા બદલ આપનો આભાર. ચુકવણી સફળતાપૂર્વક પૂર્ણ થઈ ગઈ છે. નીચે આપેલા લિંક બટન પર ક્લિક કરીને આપની PDF ડાઉનલોડ કરી શકો છો.
              </p>

              <!-- Order box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#e8f5e9;border:1px solid #c8e6c9;border-radius:12px;margin:0 0 24px 0;">
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:${accentDark};text-transform:uppercase;letter-spacing:.4px;">ઓર્ડર વિગતો (Order Details)</p>
                    <p style="margin:0;font-size:14px;color:#374151;">ઓર્ડર આઈડી: <strong>${orderId}</strong></p>
                    <p style="margin:4px 0 0 0;font-size:14px;color:#374151;">ચૂકવેલ રકમ: <strong>₹${amount}</strong></p>
                    <p style="margin:4px 0 0 0;font-size:14px;color:#374151;">પ્રોડક્ટ: <strong>${productName}</strong></p>
                  </td>
                </tr>
              </table>

              <!-- CTA button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:10px 0 14px 0;">
                    <a href="${downloadUrl}" target="_blank"
                       style="background-color:#0b6b3a;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:6px;display:inline-block;">
                      PDF ડાઉનલોડ કરો (Download PDF)
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:16px 0 0 0;font-size:13px;color:#6b7280;text-align:center;">
                જો બટન કામ ન કરતું હોય તો આ લિંક કોપી કરીને બ્રાઉઝરમાં પેસ્ટ કરો:<br />
                <a href="${downloadUrl}" style="color:${accentDark};word-break:break-all;">${downloadUrl}</a>
              </p>

              <p style="margin:20px 0 0 0;font-size:12px;color:#757575;background-color:#f9fafb;border-radius:8px;padding:12px 14px;line-height:1.5;">
                આપની ફાઇલ્સને આપના ફોન કે કોમ્પ્યુટરમાં સુરક્ષિત જગ્યાએ સેવ કરી લેવા વિનંતી છે.
              </p>
            </td>
          </tr>

          <!-- Support -->
          <tr>
            <td style="padding:20px 28px 28px 28px;">
              <hr style="border:0;border-top:1px solid #eee;margin:0 0 16px 0;" />
              <p style="margin:0;font-size:14px;color:#4b5563;">
                કોઈપણ પ્રશ્ન કે મદદ માટે સીધા જ આ ઈમેલ પર રીપ્લાય કરો અથવા અમને
                <a href="mailto:${supportEmail}" style="color:${accentDark};">${supportEmail}</a> પર સંપર્ક કરો અથવા WhatsApp કરો: <strong>+91 91048 26422</strong>.
              </p>
              <p style="margin:12px 0 0 0;font-size:14px;color:#4b5563;">તમારી સફળતા માટે શુભેચ્છાઓ! 🙏<br /><strong>${brandName} Team</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#1f2933;padding:18px 24px;text-align:center;">
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
