interface EscooterEmailParams {
  customerName: string;
  productName: string;
  orderId: string;
  amount: number;
  downloadUrl: string;
  supportEmail?: string;
}

const INCLUDED_BOOKS = [
  {
    title: "The Ultimate Electric Scooter Repair Masterclass",
    note: "Main guide · 180+ diagnostic recipes",
  },
  {
    title: "The E-Bike Conversion & Repair Guide",
    note: "Bonus 1 · conversion and hub motor repair",
  },
  {
    title: "The EV Technician's Quick Toolkit",
    note: "Bonus 2 · multimeter checkpoints and error codes",
  },
];

const SUPPORT_WHATSAPP = "+91 91048 26422";

export function buildEscooterEmailText({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  supportEmail = "support@nokrimitra.in",
}: EscooterEmailParams): string {
  return `Payment confirmed - your EV repair bundle is ready

Hi ${customerName || "there"},

Your payment is confirmed and ${productName} is ready to download.

Download all 3 books: ${downloadUrl}

Included in your order:
${INCLUDED_BOOKS.map((book) => `- ${book.title} (${book.note})`).join("\n")}

Order ID: ${orderId}
Amount paid: Rs ${amount}
Language: Hindi & English

Keep this link private and save the files on your own device. The link stays
valid for one year and works on any device; contact support any time if you
need it reissued.

Need help? ${supportEmail} / WhatsApp ${SUPPORT_WHATSAPP}`;
}

export function buildEscooterEmail({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  supportEmail = "support@nokrimitra.in",
}: EscooterEmailParams): string {
  const bookRows = INCLUDED_BOOKS.map(
    (book, index) => `
              <tr>
                <td width="30" valign="top" style="padding:12px 0 12px 0;border-top:1px solid #EDEDF0;color:#E5142B;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;">0${
                  index + 1
                }</td>
                <td valign="top" style="padding:12px 0;border-top:1px solid #EDEDF0;">
                  <div style="color:#1B1F2A;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;line-height:1.4;">${
                    book.title
                  }</div>
                  <div style="margin-top:3px;color:#7B818D;font-family:Arial,Helvetica,sans-serif;font-size:12px;">${
                    book.note
                  }</div>
                </td>
                <td width="70" valign="top" align="right" style="padding:12px 0;border-top:1px solid #EDEDF0;color:#00A152;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;">Included</td>
              </tr>`
  ).join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${productName}</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F4F6;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Payment confirmed - all 3 EV repair books are ready to download.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F4F6;">
    <tr>
      <td align="center" style="padding:26px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#FFFFFF;border-radius:16px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:26px 28px;background-color:#14161C;">
              <div style="color:#FFFFFF;font-family:Arial,Helvetica,sans-serif;font-size:19px;font-weight:bold;letter-spacing:.4px;">EV Scooter Repairing &middot; 3-Book Bundle</div>
            </td>
          </tr>
          <tr><td style="height:4px;background-color:#E5142B;"></td></tr>

          <!-- Intro -->
          <tr>
            <td style="padding:30px 28px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:7px 12px;background-color:#E8F8EF;border-radius:999px;color:#00A152;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:.8px;text-transform:uppercase;">Payment confirmed</td>
                </tr>
              </table>

              <h1 style="margin:18px 0 10px;color:#14161C;font-family:Arial,Helvetica,sans-serif;font-size:26px;font-weight:bold;line-height:1.25;letter-spacing:-.5px;">Your 3-book bundle is ready</h1>
              <p style="margin:0;color:#5C6270;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;">Hi <strong style="color:#14161C;">${
                customerName || "there"
              }</strong>, thanks for your order. Tap the button below to download all three books in one go.</p>
            </td>
          </tr>

          <!-- Download CTA -->
          <tr>
            <td style="padding:24px 28px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color:#E5142B;border-radius:10px;">
                    <a href="${downloadUrl}" target="_blank" style="display:block;padding:17px 24px;color:#FFFFFF;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;text-align:center;text-decoration:none;">Download all 3 books</a>
                  </td>
                </tr>
              </table>
              <p style="margin:12px 0 0;color:#8A909C;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;text-align:center;">Button not working? Paste this link in your browser:<br>
                <a href="${downloadUrl}" style="color:#3F4756;word-break:break-all;">${downloadUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Included books -->
          <tr>
            <td style="padding:28px 28px 0;">
              <div style="color:#9AA0AC;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.4px;text-transform:uppercase;">Included in your order</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:6px;">${bookRows}
              </table>
            </td>
          </tr>

          <!-- Order summary -->
          <tr>
            <td style="padding:24px 28px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F7F7F9;border-radius:10px;">
                <tr>
                  <td style="padding:16px 18px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;color:#5C6270;">
                    <strong style="color:#14161C;">Order ID:</strong> ${orderId}<br>
                    <strong style="color:#14161C;">Amount paid:</strong> &#8377;${amount}<br>
                    <strong style="color:#14161C;">Language:</strong> Hindi &amp; English
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 28px 0;">
              <p style="margin:0;color:#8A909C;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.65;">Save the files on your own device and keep this link private. It stays valid for one year and works on any device.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #EDEDF0;">
                <tr>
                  <td style="padding:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;color:#5C6270;">
                    Need help? Reply to this email or write to
                    <a href="mailto:${supportEmail}" style="color:#14161C;font-weight:bold;">${supportEmail}</a><br>
                    WhatsApp: <strong style="color:#14161C;">${SUPPORT_WHATSAPP}</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
