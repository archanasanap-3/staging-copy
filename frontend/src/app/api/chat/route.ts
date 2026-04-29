import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are Straveda AI — a knowledgeable, concise assistant for Straveda, a premier technology consulting firm.

ABOUT STRAVEDA:
- Specializations: AI & Business Automation, Custom Software & Systems, AI Strategy & Integration, Web Design & Experiences
- Core stats: 55% average work reduction for clients, 3–5x efficiency gains, 100% code ownership (clients own everything), 14+ years experience, 200+ projects delivered
- Operating principles: Strategy → Build → Deploy (we plan first, build second, deploy with precision)
- Key capabilities:
  • AI automation: WhatsApp flows, email sequences, AI support agents, 30–60% ops reduction in 90 days
  • Custom software: AI-powered CRMs, real-time dashboards, internal systems, customer portals
  • AI strategy: GPT-class model deployment, LLM fine-tuning, RAG systems, AI architecture roadmaps
  • Web: Next.js, 3D interactive experiences, conversion-focused landing pages, edge-deployed architecture
- Location: Pune, Maharashtra 411001, India
- Contact: hello@stravedatech.com | hello@straveda.com
- Response time: within 1 business day
- Hours: Mon–Fri, 9 AM – 6 PM IST
- Offerings: Free initial consultation, no lock-in contracts, guaranteed satisfaction

TONE & BEHAVIOR:
- Be concise, confident, and helpful
- Answer questions about services, pricing approach, timelines, and technology directly
- When someone wants to start a project, encourage them to use the contact form or book a discovery call
- Never make up specific pricing — say pricing is tailored and available via consultation
- Keep responses under 200 words unless a detailed answer is required
- Use plain text, no markdown headers in responses (keep it conversational)`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'GROQ_API_KEY is not configured' }, { status: 500 });
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'messages array is required' }, { status: 400 });
  }

  const payload = {
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ],
    max_tokens: 512,
    temperature: 0.7,
    stream: false,
  };

  try {
    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('[Groq API error]', groqRes.status, errText);
      return NextResponse.json(
        { error: 'Upstream AI error. Please try again.' },
        { status: 502 },
      );
    }

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content ?? '';
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[chat route error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
