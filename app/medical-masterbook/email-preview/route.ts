import { NextResponse } from "next/server";
import {
  buildMedicalEmail,
  buildMedicalEmailText,
  MEDICAL_EMAIL_SUBJECT,
  MEDICAL_SUPPORT_EMAIL,
} from "@/lib/medicalMasterbookEmailTemplate";
import { MEDICAL_CATALOG } from "@/lib/medicalMasterbookCatalog";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const isBundle = searchParams.get("bundle") === "1" || searchParams.get("upsell") === "1";

  const appUrl = (
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://nokrimitra.in"
  ).replace(/\/$/, "");

  const sampleOrderId = `order_${Date.now()}`;
  const singleUrl = `${appUrl}/medical-masterbook/go?t=preview_token&dl=1`;

  const downloads = isBundle
    ? [
        {
          label: "Medical Masterbook PDF",
          url: singleUrl,
        },
        {
          label: "OPD Mastery + Emergency Handbook",
          url: `${appUrl}/medical-masterbook/go?item=opd-bundle&t=preview_token&dl=1`,
        },
      ]
    : undefined;

  const html = buildMedicalEmail({
    customerName: "Dr. Rahul Sharma",
    productName: isBundle
      ? `${MEDICAL_CATALOG.name} + OPD & Emergency Bundle`
      : MEDICAL_CATALOG.name,
    orderId: sampleOrderId,
    amount: isBundle ? MEDICAL_CATALOG.price + 99 : MEDICAL_CATALOG.price,
    downloadUrl: singleUrl,
    downloads,
  });

  // Inject a small preview banner toolbar at the very top of the email
  const toolbar = `
  <div style="background:#111827;color:#fff;padding:12px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:13px;position:sticky;top:0;z-index:9999;box-shadow:0 2px 10px rgba(0,0,0,0.25);">
    <div style="max-width:720px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="background:#7b55ab;color:#fff;font-weight:700;font-size:11px;padding:3px 8px;border-radius:4px;letter-spacing:0.5px;">EMAIL PREVIEW</span>
        <span style="color:#9ca3af;">Showing: <strong style="color:#fff;">${isBundle ? "Bundle with Upsell (₹248)" : "Single Book (₹149)"}</strong></span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <a href="/medical-masterbook/email-preview" style="background:${!isBundle ? "#7b55ab" : "#374151"};color:#fff;text-decoration:none;padding:6px 12px;border-radius:6px;font-weight:600;font-size:12px;">Single (₹149)</a>
        <a href="/medical-masterbook/email-preview?bundle=1" style="background:${isBundle ? "#7b55ab" : "#374151"};color:#fff;text-decoration:none;padding:6px 12px;border-radius:6px;font-weight:600;font-size:12px;">With Upsell (₹248)</a>
      </div>
    </div>
    <div style="max-width:720px;margin:10px auto 0;padding-top:8px;border-top:1px solid #374151;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;">
      <span style="color:#d1d5db;font-size:12px;">Want to test real delivery in your Gmail inbox?</span>
      <form id="test-form" onsubmit="sendTestEmail(event)" style="display:flex;gap:6px;margin:0;">
        <input type="email" id="test-email" placeholder="Enter your email" required style="padding:6px 10px;border-radius:6px;border:1px solid #4b5563;background:#1f2937;color:#fff;font-size:12px;outline:none;" />
        <button type="submit" id="send-btn" style="background:#16a34a;color:#fff;border:none;padding:6px 14px;border-radius:6px;font-weight:600;font-size:12px;cursor:pointer;">Send Test Email</button>
      </form>
    </div>
    <div id="test-msg" style="max-width:720px;margin:6px auto 0;font-size:12px;display:none;"></div>
    <script>
      async function sendTestEmail(e) {
        e.preventDefault();
        var email = document.getElementById('test-email').value;
        var btn = document.getElementById('send-btn');
        var msg = document.getElementById('test-msg');
        btn.disabled = true;
        btn.innerText = 'Sending...';
        msg.style.display = 'block';
        msg.style.color = '#fbbf24';
        msg.innerText = 'Sending test email to ' + email + '...';
        try {
          var res = await fetch('/medical-masterbook/email-preview', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: email, bundle: ${isBundle ? "true" : "false"} })
          });
          var data = await res.json();
          if (res.ok && data.success) {
            msg.style.color = '#34d399';
            msg.innerText = '✓ Email successfully delivered to ' + email + '! Check your inbox.';
          } else {
            msg.style.color = '#f87171';
            msg.innerText = 'Failed to send: ' + (data.error || 'Unknown error');
          }
        } catch (err) {
          msg.style.color = '#f87171';
          msg.innerText = 'Network error: ' + err.message;
        } finally {
          btn.disabled = false;
          btn.innerText = 'Send Test Email';
        }
      }
    </script>
  </div>
  `;

  const finalHtml = html.replace("<body style=\"margin:0;padding:0;background-color:#F5F5F7;\">", `<body style="margin:0;padding:0;background-color:#F5F5F7;">${toolbar}`);

  return new NextResponse(finalHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

export async function POST(req: Request) {
  try {
    const { email, bundle } = (await req.json().catch(() => ({}))) as {
      email?: string;
      bundle?: boolean;
    };

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || "NokriMitra <download@pdf.nokrimitra.in>";

    if (!resendApiKey || resendApiKey.includes("your_resend_key")) {
      return NextResponse.json({ error: "Resend API key is not configured" }, { status: 500 });
    }

    const appUrl = (
      process.env.APP_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "https://nokrimitra.in"
    ).replace(/\/$/, "");

    const orderId = `test_order_${Date.now().toString(36)}`;
    const singleUrl = `${appUrl}/medical-masterbook/go?t=sample_test_token&dl=1`;

    const downloads = bundle
      ? [
          {
            label: "Medical Masterbook PDF",
            url: singleUrl,
          },
          {
            label: "OPD Mastery + Emergency Handbook",
            url: `${appUrl}/medical-masterbook/go?item=opd-bundle&t=sample_test_token&dl=1`,
          },
        ]
      : undefined;

    const emailHtml = buildMedicalEmail({
      customerName: "Doctor",
      productName: bundle
        ? `${MEDICAL_CATALOG.name} + OPD & Emergency Bundle`
        : MEDICAL_CATALOG.name,
      orderId,
      amount: bundle ? MEDICAL_CATALOG.price + 99 : MEDICAL_CATALOG.price,
      downloadUrl: singleUrl,
      downloads,
    });

    const emailText = buildMedicalEmailText({
      customerName: "Doctor",
      productName: bundle
        ? `${MEDICAL_CATALOG.name} + OPD & Emergency Bundle`
        : MEDICAL_CATALOG.name,
      orderId,
      amount: bundle ? MEDICAL_CATALOG.price + 99 : MEDICAL_CATALOG.price,
      downloadUrl: singleUrl,
      downloads,
    });

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [email.trim()],
        reply_to: MEDICAL_SUPPORT_EMAIL,
        subject: `[TEST] ${MEDICAL_EMAIL_SUBJECT}`,
        html: emailHtml,
        text: emailText,
      }),
    });

    const resendData = await resendRes.json();
    if (!resendRes.ok) {
      return NextResponse.json(
        { error: resendData.message || "Failed to send email via Resend" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, id: resendData.id });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to process request" },
      { status: 500 }
    );
  }
}
