type OpdDownload = {
  label: string;
  url: string;
};

type OpdEmailInput = {
  customerName: string;
  productName: string;
  orderId: string;
  amount: number;
  downloadUrl: string;
  downloads?: OpdDownload[];
};

const SUPPORT_EMAIL = "support@nokrimitra.in";

/** Transactional delivery email for the OPD Mastery e-book. */
export function buildOpdEmail({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  downloads,
}: OpdEmailInput): string {
  const downloadLinks = downloads?.length
    ? downloads
    : [{ label: "OPD Mastery E-book", url: downloadUrl }];

  const downloadButtons = downloadLinks
    .map((item, index) => {
      const gold = index === 0;
      const background = gold ? "#C9A84C" : "#1A1A2E";
      const border = gold ? "#B08C3A" : "#0F3460";
      return `<a href="${item.url}" style="display:block;margin:0 0 10px;padding:16px 20px;border:1px solid ${border};border-radius:10px;background:${background};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;text-align:center;text-decoration:none;">Download ${item.label}</a>`;
    })
    .join("");

  const itemRows = downloadLinks
    .map(
      (item) =>
        `<tr>
            <td style="padding:9px 0;font-size:13px;color:#5f6672;border-top:1px solid #EFEFEF;">${item.label}</td>
            <td style="padding:9px 0;font-size:13px;color:#17192B;text-align:right;border-top:1px solid #EFEFEF;">Included</td>
          </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${productName}</title>
</head>
<body style="margin:0;padding:26px 12px;background:#17192B;font-family:Arial,Helvetica,sans-serif;color:#2D3142;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;">
    <tr>
      <td style="padding:24px;background:#17192B;color:#ffffff;">
        <div style="font-size:18px;font-weight:bold;letter-spacing:-0.4px;">NokriMitra</div>
        <div style="margin-top:5px;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;">
          OPD Mastery &middot; 2026 Edition
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:6px 24px 0;background:#C9A84C;">
        <div style="height:0;line-height:0;font-size:0;">&nbsp;</div>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 24px 6px;">
        <div style="font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#28A745;">
          Payment confirmed
        </div>
        <h1 style="margin:10px 0 12px;font-size:24px;line-height:1.25;color:#17192B;">
          Your download is ready
        </h1>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#5f6672;">
          Hi ${customerName}, thank you for your purchase. Your copy of
          <strong style="color:#17192B;">${productName}</strong> is ready to download below.
        </p>
        ${downloadButtons}
        <p style="margin:14px 0 0;font-size:12.5px;line-height:1.6;color:#8a9098;">
          Keep this email safe. The same link works later on any device.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 24px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#FAFAF8;border-radius:10px;">
          <tr>
            <td style="padding:14px 16px 0;font-size:10px;font-weight:bold;letter-spacing:1.6px;text-transform:uppercase;color:#9a9fa8;">
              Order summary
            </td>
          </tr>
          <tr>
            <td style="padding:6px 16px 14px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:9px 0;font-size:13px;color:#5f6672;">Order ID</td>
                  <td style="padding:9px 0;font-size:13px;color:#17192B;text-align:right;">${orderId}</td>
                </tr>
                ${itemRows}
                <tr>
                  <td style="padding:11px 0 2px;font-size:13px;font-weight:bold;color:#17192B;border-top:1px solid #E4E4E6;">Amount paid</td>
                  <td style="padding:11px 0 2px;font-size:17px;font-weight:bold;color:#17192B;text-align:right;border-top:1px solid #E4E4E6;">&#8377;${amount}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 24px 24px;">
        <p style="margin:0 0 12px;font-size:13px;line-height:1.6;color:#5f6672;">
          Need help? Reply to this email or write to
          <a href="mailto:${SUPPORT_EMAIL}" style="color:#B08C3A;font-weight:bold;">${SUPPORT_EMAIL}</a>.
        </p>
        <p style="margin:0;padding-top:14px;border-top:1px solid #EFEFEF;font-size:11.5px;line-height:1.6;color:#9a9fa8;">
          For education and quick reference only, not medical advice. Follow current
          guidelines and qualified clinical judgement.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Plain-text fallback, used for better deliverability. */
export function buildOpdEmailText({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  downloads,
}: OpdEmailInput): string {
  const downloadLines = (downloads?.length
    ? downloads
    : [{ label: "OPD Mastery E-book", url: downloadUrl }]
  )
    .map((item) => `${item.label}: ${item.url}`)
    .join("\n");

  return `Hi ${customerName},

Thank you for your purchase. Your copy of ${productName} is ready.

${downloadLines}

Order ID: ${orderId}
Amount paid: Rs ${amount}

Keep this email safe. The same link works later on any device.
Need help? Write to ${SUPPORT_EMAIL}.

For education and quick reference only, not medical advice. Follow current
guidelines and qualified clinical judgement.

NokriMitra`;
}