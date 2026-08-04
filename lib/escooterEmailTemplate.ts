interface EscooterEmailParams {
  customerName: string;
  productName: string;
  orderId: string;
  amount: number;
  downloadUrl: string;
  brandName?: string;
  supportEmail?: string;
}

const INK = "#17201c";
const PAPER = "#f4f0e7";
const GREEN_DARK = "#116437";
const LIME = "#d0eb63";
const ORANGE = "#df642e";
const MUTED = "#657068";

const chapters = [
  "EV system, tools और safety basics",
  "Battery pack, BMS और charging faults",
  "BLDC motor, hall sensor और motor noise",
  "Controller, wiring diagram और connectors",
  "Throttle, brake sensor और charger testing",
  "Error codes, fault finding और maintenance",
];

export function buildEscooterEmailText({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  brandName = "NokriMitra",
  supportEmail = "support@nokrimitra.in",
}: EscooterEmailParams): string {
  return `Payment successful - aapki PDF taiyar hai

Namaste ${customerName || "dost"},

${productName} ke liye aapka payment successful raha. Guide download ke liye taiyar hai.

Download link:
${downloadUrl}

Order details:
- Order ID: ${orderId}
- Amount paid: Rs.${amount}
- Product: ${productName}

Guide me kya milega:
${chapters.map((c) => `- ${c}`).join("\n")}

Suggestion: PDF ko phone ya computer me save kar lein, taki baad me bhi kaam aaye.

Safety: Battery pack aur high-current circuits khatarnak ho sakte hain. Kaam se pehle battery disconnect karein, insulated tools use karein, aur uncertain fault ke liye qualified technician ki madad lein.

Kisi bhi madad ke liye is email ka reply karein ya ${supportEmail} / WhatsApp +91 91048 26422 par sampark karein.

${brandName} Team`;
}

export function buildEscooterEmail({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  brandName = "NokriMitra",
  supportEmail = "support@nokrimitra.in",
}: EscooterEmailParams): string {
  const chapterRows = chapters
    .map(
      (c, i) => `
                <tr>
                  <td width="34" valign="top" style="padding:9px 0;border-bottom:1px solid #ded8cc;color:${GREEN_DARK};font-size:12px;font-weight:bold;letter-spacing:1px;">${String(
        i + 1
      ).padStart(2, "0")}</td>
                  <td valign="top" style="padding:9px 0;border-bottom:1px solid #ded8cc;color:#3f4a43;font-size:14px;">${c}</td>
                </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${productName}</title>
</head>
<body style="margin:0;padding:0;background-color:${PAPER};font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:${INK};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Payment successful — ${productName} download ke liye taiyar hai.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${PAPER};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#fffefa;border:1px solid #d8d2c6;">

          <tr>
            <td style="background-color:${INK};padding:26px 26px;">
              <p style="margin:0 0 10px 0;color:${LIME};font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">Payment successful</p>
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;line-height:1.25;">आपकी Hindi PDF Guide तैयार है</h1>
              <p style="margin:10px 0 0 0;color:#b6c0b9;font-size:14px;">${productName}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:26px 26px 0 26px;">
              <p style="margin:0 0 12px 0;font-size:16px;">नमस्ते <strong>${
                customerName || "दोस्त"
              }</strong>,</p>
              <p style="margin:0 0 22px 0;font-size:15px;line-height:1.65;color:#3f4a43;">
                आपका payment successful रहा। नीचे दिए button से guide अभी download करें।
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:${GREEN_DARK};padding:0;">
                    <a href="${downloadUrl}" target="_blank"
                       style="display:block;padding:17px 24px;color:#ffffff;font-size:17px;font-weight:800;text-decoration:none;text-align:center;">
                      अभी PDF Download करें
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:14px 0 24px 0;font-size:12px;color:${MUTED};text-align:center;line-height:1.6;">
                Button काम न करे तो यह link browser में खोलें:<br />
                <a href="${downloadUrl}" style="color:${GREEN_DARK};word-break:break-all;">${downloadUrl}</a>
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${PAPER};border:1px solid #d8d2c6;border-left:5px solid ${ORANGE};margin:0 0 26px 0;">
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0 0 10px 0;font-size:11px;font-weight:bold;color:${GREEN_DARK};letter-spacing:1.6px;text-transform:uppercase;">Order details</p>
                    <p style="margin:0;font-size:14px;color:#3f4a43;">Order ID: <strong style="color:${INK};">${orderId}</strong></p>
                    <p style="margin:5px 0 0 0;font-size:14px;color:#3f4a43;">चुकाई गई रकम: <strong style="color:${INK};">₹${amount}</strong></p>
                    <p style="margin:5px 0 0 0;font-size:14px;color:#3f4a43;">Product: <strong style="color:${INK};">${productName}</strong></p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 4px 0;font-size:11px;font-weight:bold;color:${GREEN_DARK};letter-spacing:1.6px;text-transform:uppercase;">Guide में क्या मिलेगा</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:2px solid ${INK};margin:8px 0 24px 0;">
                ${chapterRows}
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff5ee;border:1px solid #e6b294;border-left:5px solid ${ORANGE};margin:0 0 22px 0;">
                <tr>
                  <td style="padding:15px 18px;">
                    <p style="margin:0 0 5px 0;font-size:14px;font-weight:bold;color:${INK};">Safety पहले</p>
                    <p style="margin:0;font-size:13px;line-height:1.6;color:#6f5648;">
                      Battery pack और high-current circuits खतरनाक हो सकते हैं। काम से पहले battery disconnect करें, insulated tools इस्तेमाल करें और uncertain fault के लिए qualified technician की मदद लें।
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 22px 0;font-size:13px;color:${MUTED};line-height:1.6;">
                सुझाव: PDF को अपने phone या computer में save कर लें, ताकि बाद में भी काम आए।
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 26px 26px 26px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #d8d2c6;">
                <tr>
                  <td style="padding:16px 0 0 0;">
                    <p style="margin:0;font-size:14px;color:#3f4a43;line-height:1.6;">
                      किसी भी मदद के लिए इस email का reply करें या
                      <a href="mailto:${supportEmail}" style="color:${GREEN_DARK};">${supportEmail}</a> / WhatsApp <strong>+91 91048 26422</strong> पर संपर्क करें।
                    </p>
                    <p style="margin:12px 0 0 0;font-size:14px;color:#3f4a43;"><strong>${brandName} Team</strong></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color:${INK};padding:16px 26px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#8f9a92;">© ${new Date().getFullYear()} ${brandName}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
