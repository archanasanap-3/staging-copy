import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Only POST is accepted — all other verbs return 405
export function GET()    { return new NextResponse('Method Not Allowed', { status: 405 }); }
export function PUT()    { return new NextResponse('Method Not Allowed', { status: 405 }); }
export function DELETE() { return new NextResponse('Method Not Allowed', { status: 405 }); }
export function PATCH()  { return new NextResponse('Method Not Allowed', { status: 405 }); }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, company, phone, position, portfolio, formType = 'contact' } = body;

    // Input validation — guard against missing required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Sanitize user input before injecting into HTML — prevent XSS
    const sanitize = (str: string) =>
      String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const safeFields = {
      name:      sanitize(name),
      email:     sanitize(email),
      message:   sanitize(message),
      company:   company   ? sanitize(company)   : null,
      phone:     phone     ? sanitize(phone)      : null,
      position:  position  ? sanitize(position)  : null,
      portfolio: portfolio ? sanitize(portfolio) : null,
    };

    // SMTP transport — credentials injected via env vars, never hardcoded
    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT) || 587,
      // port 465 uses TLS from the start; 587 uses STARTTLS
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const isCareer    = formType === 'career';
    const subjectLine = isCareer
      ? `[Careers] New Application — ${safeFields.position ?? 'Open Application'} · ${safeFields.name}`
      : `[Contact] New message from ${safeFields.name}${safeFields.company ? ` · ${safeFields.company}` : ''}`;

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Row helper keeps HTML template clean
    const row = (label: string, value: string | null, link = false) => {
      if (!value) return '';
      const cell = link
        ? `<a href="${value}" style="color:#FF4800;text-decoration:none;">${value}</a>`
        : value;
      return `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;">
            <p style="margin:0;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;">${label}</p>
            <p style="margin:5px 0 0;font-size:15px;color:#1a1a2e;line-height:1.5;">${cell}</p>
          </td>
        </tr>`;
    };

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${subjectLine}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#FF4800 0%,#cc3900 100%);padding:32px 36px;">
            <p style="margin:0;color:rgba(255,255,255,0.65);font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">Straveda Tech</p>
            <h1 style="margin:10px 0 0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
              ${isCareer ? '🚀 New Career Application' : '📩 New Contact Message'}
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row('From', safeFields.name)}
              ${row('Email', `<a href="mailto:${safeFields.email}" style="color:#FF4800;text-decoration:none;">${safeFields.email}</a>`)}
              ${row('Company', safeFields.company)}
              ${row('Phone', safeFields.phone)}
              ${row('Applying For', safeFields.position)}
              ${row('Portfolio / LinkedIn', safeFields.portfolio, true)}
              <tr>
                <td style="padding:16px 0 0;vertical-align:top;">
                  <p style="margin:0;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;">${isCareer ? 'Why Straveda / What They Build' : 'Message'}</p>
                  <div style="margin:10px 0 0;font-size:15px;color:#374151;line-height:1.75;white-space:pre-wrap;">${safeFields.message}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 36px;background:#f9fafb;border-top:1px solid #f0f0f0;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              Received via Straveda website &nbsp;·&nbsp; ${timestamp} IST
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await transporter.sendMail({
      from:    process.env.SMTP_FROM ?? `"Straveda Website" <${process.env.SMTP_USER}>`,
      to:      isCareer ? process.env.CAREERS_EMAIL : process.env.CONTACT_EMAIL,
      replyTo: email,          // clicking Reply in inbox goes back to the visitor
      subject: subjectLine,
      html,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('[/api/send] Mail error:', err);
    return NextResponse.json(
      { error: 'Failed to send your message. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
