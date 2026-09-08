interface MbbsDownload {
  label: string;
  url: string;
}

interface MbbsEmailParams {
  customerName: string;
  productName: string;
  orderId: string;
  amount: number;
  downloadUrl?: string;
  downloads?: MbbsDownload[];
  brandName?: string;
  supportEmail?: string;
}

export function buildMbbsEmailText({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl = "https://drive.google.com/drive/folders/1b1aOjTrXiKqu_LXOHcqA58zPgxQEbkZh",
  downloads,
  brandName = "NokriMitra",
  supportEmail = "support@nokrimitra.in",
}: MbbsEmailParams): string {
  const links = downloads?.length
    ? downloads
    : [{ label: productName, url: downloadUrl }];
  const downloadLines = links
    .map((item) => `${item.label}: ${item.url}`)
    .join("\n");

  return `Payment Successful!

Hi ${customerName || "Doctor"},

Thank you for purchasing ${productName}. Your payment was successful and your complete MBBS study collection (All 21 Subjects, 3,826 pages) is ready to download.

Download here:
${downloadLines}

Order Details:
- Order ID: ${orderId}
- Amount Paid: Rs.${amount}
- Product: ${productName} (All 21 Subjects Included)

Study Tip: Please download and save all PDFs on your device or Google Drive for offline, lifetime revision during clinical rotations and exam prep.

For any queries or support, reply directly to this email, message us on WhatsApp at +91 9104826422, or write to ${supportEmail}.

Wishing you great success in your medical journey!
${brandName} Medical Team`;
}

export function buildMbbsEmail({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl = "https://drive.google.com/drive/folders/1b1aOjTrXiKqu_LXOHcqA58zPgxQEbkZh",
  downloads,
  brandName = "NokriMitra",
  supportEmail = "support@nokrimitra.in",
}: MbbsEmailParams): string {
  const links = downloads?.length
    ? downloads
    : [{ label: productName, url: downloadUrl }];

  const downloadHtml = links
    .map(
      (item) => `
      <div style="margin: 12px 0; text-align: center;">
        <a href="${item.url}" style="background: #0b6b3a; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(11, 107, 58, 0.25);">
          📥 Download ${item.label}
        </a>
      </div>`
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your MBBS Notes Access</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f6f8f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2933;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f6f8f5; padding: 30px 10px;">
      <tr>
        <td align="center">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8e0; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            
            <!-- Header Banner -->
            <tr>
              <td style="background: linear-gradient(135deg, #084d2a 0%, #0b6b3a 100%); padding: 32px 24px; text-align: center;">
                <span style="display: inline-block; background: rgba(255,255,255,0.18); color: #ffffff; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 14px; border-radius: 999px; margin-bottom: 12px;">
                  Access Confirmed
                </span>
                <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">
                  Complete MBBS Notes
                </h1>
                <p style="color: #e2f0d9; margin: 8px 0 0; font-size: 15px;">
                  All 21 Subjects · 3,826 Pages Ready to Study
                </p>
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td style="padding: 28px 24px;">
                <p style="font-size: 16px; margin: 0 0 16px; line-height: 1.6;">
                  Hello <strong>${customerName || "Doctor"}</strong>,
                </p>
                <p style="font-size: 15px; margin: 0 0 20px; line-height: 1.6; color: #52606d;">
                  Thank you for your order! Your complete study bundle covering Anatomy, Physiology, Pathology, Pharmacology, OSCE, and all 21 MBBS subjects is now unlocked.
                </p>

                <!-- Action Download Box -->
                <div style="background: #f0fdf4; border: 1px dashed #0b6b3a; border-radius: 12px; padding: 22px; margin: 24px 0; text-align: center;">
                  <p style="margin: 0 0 12px; font-size: 15px; font-weight: 600; color: #084d2a;">
                    Click below to open and save your study materials:
                  </p>
                  ${downloadHtml}
                  <p style="margin: 12px 0 0; font-size: 12px; color: #64748b;">
                    Instant access link · Lifetime access · Print friendly
                  </p>
                </div>

                <!-- Order Details Box -->
                <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background: #f8fafc; border-radius: 10px; font-size: 14px; margin: 20px 0;">
                  <tr>
                    <td style="color: #64748b;">Order ID:</td>
                    <td align="right" style="font-weight: 600; color: #1e293b;">${orderId}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b;">Amount Paid:</td>
                    <td align="right" style="font-weight: 700; color: #0b6b3a;">₹${amount}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b;">Status:</td>
                    <td align="right" style="font-weight: 600; color: #16a34a;">Paid & Delivered</td>
                  </tr>
                </table>

                <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin: 20px 0 0;">
                  Need help? Simply reply to this email, message on WhatsApp at <a href="https://wa.me/919104826422?text=Hi%20NokriMitra%20Support,%20I%20need%20help%20with%20my%20MBBS%20Notes%20Order" style="color: #0b6b3a; font-weight: 700; text-decoration: none;">+91 9104826422</a>, or write to <a href="mailto:${supportEmail}" style="color: #0b6b3a; font-weight: 600;">${supportEmail}</a>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background: #f8fafc; padding: 18px 24px; text-align: center; border-top: 1px solid #e2e8e0;">
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                  © ${new Date().getFullYear()} ${brandName}. Empowering Healthcare Students Across India.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}
