import { NextRequest, NextResponse } from 'next/server';

export function GET()    { return new NextResponse('Method Not Allowed', { status: 405 }); }
export function PUT()    { return new NextResponse('Method Not Allowed', { status: 405 }); }
export function DELETE() { return new NextResponse('Method Not Allowed', { status: 405 }); }
export function PATCH()  { return new NextResponse('Method Not Allowed', { status: 405 }); }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, company, phone, position, portfolio, formType = 'contact' } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const formId = formType === 'career'
      ? process.env.FORMSPREE_CAREER_ID
      : process.env.FORMSPREE_CONTACT_ID;

    if (!formId) {
      return NextResponse.json({ error: 'Form service not configured.' }, { status: 500 });
    }

    const payload: Record<string, string> = { name, email, message };
    if (company)   payload.company   = company;
    if (phone)     payload.phone     = phone;
    if (position)  payload.position  = position;
    if (portfolio) payload.portfolio = portfolio;

    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body:    JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.errors?.[0]?.message ?? 'Formspree rejected the submission.';
      return NextResponse.json({ error: msg }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[/api/send] Error:', err);
    return NextResponse.json(
      { error: 'Failed to send your message. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
