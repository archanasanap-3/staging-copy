/**
 * Straveda Website — Master PDF Generator
 * Run: node generate-pdf.js
 * Output: straveda-master.pdf
 */

const PDFDocument = require('pdfkit');
const fs          = require('fs');
const path        = require('path');

// ── Brand colours ─────────────────────────────────────────────────────────────
const ORANGE = '#FF4800';
const DARK   = '#0f172a';
const GREY   = '#64748b';
const LIGHT  = '#f8fafc';
const WHITE  = '#ffffff';
const DIVIDER= '#e2e8f0';

// ── Page dimensions (A4) ──────────────────────────────────────────────────────
const W = 595.28;
const H = 841.89;
const ML = 56, MR = 56, MT = 48, MB = 48;
const TW = W - ML - MR; // text width

const doc = new PDFDocument({ size: 'A4', margin: 0, autoFirstPage: false });
const out = fs.createWriteStream(path.join(__dirname, 'straveda-master.pdf'));
doc.pipe(out);

// ── Helpers ───────────────────────────────────────────────────────────────────
let pageNum = 0;

function newPage(bg = WHITE) {
  pageNum++;
  doc.addPage({ size: 'A4', margin: 0 });
  doc.rect(0, 0, W, H).fill(bg);
  return MT; // return starting Y
}

function hex(color) { return color; }

function drawRect(x, y, w, h, color, radius = 0) {
  if (radius) doc.roundedRect(x, y, w, h, radius).fill(color);
  else        doc.rect(x, y, w, h).fill(color);
}

function sectionTag(y, text) {
  const tw = doc.font('Helvetica-Bold').fontSize(8).widthOfString(text.toUpperCase()) + 20;
  drawRect(ML, y, tw, 20, '#fff4f0', 4);
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(8)
     .text(text.toUpperCase(), ML + 10, y + 6, { lineBreak: false });
  return y + 32;
}

function h1(y, text, color = DARK, size = 28) {
  doc.fillColor(color).font('Helvetica-Bold').fontSize(size)
     .text(text, ML, y, { width: TW, lineBreak: true });
  return y + doc.heightOfString(text, { width: TW, fontSize: size }) + 8;
}

function h2(y, text, color = DARK, size = 18) {
  doc.fillColor(color).font('Helvetica-Bold').fontSize(size)
     .text(text, ML, y, { width: TW });
  return y + doc.heightOfString(text, { width: TW, fontSize: size }) + 6;
}

function h3(y, text, color = DARK) {
  doc.fillColor(color).font('Helvetica-Bold').fontSize(13)
     .text(text, ML, y, { width: TW });
  return y + 20;
}

function body(y, text, color = GREY, size = 10.5, indent = 0) {
  doc.fillColor(color).font('Helvetica').fontSize(size)
     .text(text, ML + indent, y, { width: TW - indent, lineBreak: true });
  return y + doc.heightOfString(text, { width: TW - indent, fontSize: size }) + 4;
}

function bullet(y, text, color = GREY) {
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(10).text('•', ML, y, { lineBreak: false });
  doc.fillColor(color).font('Helvetica').fontSize(10)
     .text(text, ML + 14, y, { width: TW - 14, lineBreak: true });
  return y + doc.heightOfString(text, { width: TW - 14, fontSize: 10 }) + 3;
}

function divider(y, color = DIVIDER) {
  doc.moveTo(ML, y).lineTo(W - MR, y).lineWidth(0.5).strokeColor(color).stroke();
  return y + 16;
}

function badge(x, y, text, bg = '#fff4f0', fg = ORANGE) {
  const tw = doc.font('Helvetica-Bold').fontSize(8).widthOfString(text) + 16;
  drawRect(x, y, tw, 18, bg, 9);
  doc.fillColor(fg).font('Helvetica-Bold').fontSize(8).text(text, x + 8, y + 5, { lineBreak: false });
  return tw;
}

function statBox(x, y, value, label, w = 110) {
  drawRect(x, y, w, 56, LIGHT, 6);
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(20)
     .text(value, x, y + 10, { width: w, align: 'center', lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(8)
     .text(label, x, y + 34, { width: w, align: 'center', lineBreak: false });
}

function serviceCard(y, num, title, desc, bullets, metric = '') {
  if (y > H - 180) { y = newPage(); y = MT; }
  const startY = y;
  drawRect(ML, y, TW, metric ? 145 : 125, LIGHT, 6);
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(9)
     .text(num, ML + 14, y + 14, { lineBreak: false });
  doc.fillColor(DARK).font('Helvetica-Bold').fontSize(13)
     .text(title, ML + 38, y + 11, { lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(9.5)
     .text(desc, ML + 14, y + 32, { width: TW - 28 });
  let by = y + 32 + doc.heightOfString(desc, { width: TW - 28, fontSize: 9.5 }) + 6;
  for (const b of bullets) {
    doc.fillColor(ORANGE).fontSize(9).text('›', ML + 14, by, { lineBreak: false });
    doc.fillColor(GREY).font('Helvetica').fontSize(9)
       .text(b, ML + 26, by, { width: TW - 40, lineBreak: false });
    by += 13;
  }
  if (metric) {
    doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(8.5)
       .text('★  ' + metric, ML + 14, by + 4, { lineBreak: false });
  }
  return startY + (metric ? 153 : 133);
}

function pageHeader(title, subtitle, bg = DARK) {
  doc.rect(0, 0, W, 130).fill(bg);
  // Orange accent bar
  doc.rect(0, 0, 4, 130).fill(ORANGE);
  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(22)
     .text(title, ML, 44, { width: TW });
  if (subtitle) {
    doc.fillColor('rgba(255,255,255,0.7)').font('Helvetica').fontSize(10)
       .text(subtitle, ML, 76, { width: TW });
  }
  // Page name pill
  badge(W - MR - 80, 14, 'STRAVEDA.COM', '#ffffff20', '#ffffff');
  return 150;
}

function footer(pageLabel) {
  doc.rect(0, H - 36, W, 36).fill('#f8fafc');
  doc.moveTo(0, H - 36).lineTo(W, H - 36).lineWidth(0.5).strokeColor(DIVIDER).stroke();
  doc.fillColor(GREY).font('Helvetica').fontSize(8)
     .text('© 2024 Straveda Tech · Pune, India · hello@stravedatech.com', ML, H - 22, { lineBreak: false });
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(8)
     .text(pageLabel, W - MR - 60, H - 22, { width: 60, align: 'right', lineBreak: false });
}

// ══════════════════════════════════════════════════════════════════════════════
//  COVER PAGE
// ══════════════════════════════════════════════════════════════════════════════
newPage(DARK);

// Big orange gradient block at top
doc.rect(0, 0, W, 340).fill(DARK);
doc.rect(0, 0, W, 3).fill(ORANGE);

// Large S watermark
doc.fillColor('rgba(255,72,0,0.07)').font('Helvetica-Bold').fontSize(420)
   .text('S', -60, -60, { lineBreak: false });

// Logo area
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(32)
   .text('STRAVEDA', ML, 80, { lineBreak: false });
doc.fillColor(WHITE).font('Helvetica').fontSize(32)
   .text(' TECH', ML + doc.widthOfString('STRAVEDA') + 2, 80, { lineBreak: false });

doc.fillColor('rgba(255,255,255,0.45)').font('Helvetica').fontSize(11)
   .text('AI-Powered Business Systems & Custom Software', ML, 122, { lineBreak: false });

// Headline block
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(38)
   .text('Master Website\nReference Guide', ML, 190, { width: TW, lineBreak: true, lineGap: 4 });

doc.fillColor('rgba(255,255,255,0.5)').font('Helvetica').fontSize(11)
   .text('Complete documentation covering all pages, services,\npricing, process, and company information.', ML, 282, { width: TW });

// Bottom info strip
doc.rect(0, H - 130, W, 130).fill('#0a0a14');
doc.moveTo(0, H - 130).lineTo(W, H - 130).lineWidth(1).strokeColor(ORANGE).stroke();

const cols = [
  ['Pune, Maharashtra', 'India'],
  ['hello@stravedatech.com', 'Contact'],
  ['Mon–Fri 9AM–6PM IST', 'Hours'],
  ['2024', 'Edition'],
];
cols.forEach(([val, lab], i) => {
  const cx = ML + i * (TW / 4);
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(9).text(lab.toUpperCase(), cx, H - 110, { lineBreak: false });
  doc.fillColor(WHITE).font('Helvetica').fontSize(10).text(val, cx, H - 94, { lineBreak: false });
});

// TOC preview
const tocItems = ['01  Home', '02  Services', '03  About Us', '04  Testimonials', '05  Careers', '06  Contact'];
let tocX = ML;
tocItems.forEach((item, i) => {
  if (i === 3) { tocX = ML; }
  const row = i < 3 ? H - 52 : H - 32;
  if (i === 3) tocX = ML;
  doc.fillColor('rgba(255,255,255,0.35)').font('Helvetica').fontSize(8.5)
     .text(item, ML + (i % 3) * (TW / 3), row, { lineBreak: false });
});

// ══════════════════════════════════════════════════════════════════════════════
//  PAGE 1 — HOME
// ══════════════════════════════════════════════════════════════════════════════
let y = newPage();
y = pageHeader('Home Page', 'Pune, Maharashtra · Serving clients across India');
footer('01 — Home');

y = sectionTag(y, 'Hero');
y = h1(y, 'AI that eliminates work.\nSoftware that runs your operations.', DARK, 24);
y = body(y, 'AI Powered Business Systems and Custom Software for Mid Market Companies in India. We build the Automation, CRMs, and Workflows that cut manual work by 50%.', GREY);
y += 8;

// Trust signals row
['Fixed price quote', 'Weekly delivery', 'Full code ownership'].forEach((t, i) => {
  badge(ML + i * (TW / 3), y, '✓  ' + t, '#fff4f0', ORANGE);
});
y += 30;
y = divider(y);

// Stats
y = sectionTag(y, 'Key Statistics');
const stats = [['55%', 'Manual Work\nReduced'], ['3–5×', 'Operational\nEfficiency'], ['100%', 'Code\nOwnership'], ['90 days', 'ROI\nTimeline']];
stats.forEach(([v, l], i) => statBox(ML + i * (TW / 4 + 1), y, v, l, TW / 4 - 2));
y += 72;
y = divider(y);

// Services overview
y = sectionTag(y, 'Services Overview');
y = h2(y, 'One Goal: Systems That Run Without You');
y = serviceCard(y, '01', 'AI & Business Automation',
  'WhatsApp flows, email sequences, AI support agents, and workflow automation.',
  ['WhatsApp lead qualification & instant booking', 'Behaviour-triggered email sequences', 'AI agents for tier-1 customer support'],
  '30–60% reduction in manual operations within 90 days');

y = serviceCard(y, '02', 'Custom Software & Systems',
  'AI-powered CRMs, real-time dashboards, and internal tools built for your workflow.',
  ['AI-powered CRMs for real team adoption', 'Real-time dashboards replacing fragmented tools', 'Centralised data for better decisions']);

// ── Page 1b ───────────────────────────────────────────────────────────────────
y = newPage();
y = MT;
footer('01 — Home (cont.)');

y = serviceCard(y, '03', 'AI Strategy & Integration',
  'Deploy GPT-class models, custom LLMs, and RAG systems into your existing stack.',
  ['GPT-class model deployment & advanced AI APIs', 'Custom LLM integration for business workflows', 'RAG systems using your private, secure data']);

y = serviceCard(y, '04', 'Web Development & 3D Experiences',
  'High-performance websites, 3D experiences, and conversion-focused landing pages.',
  ['Next.js — sub-second loads, global edge deployment', '3D interactive experiences for brand differentiation', 'A/B testing & analytics built into the core'],
  '2–4× improvement in conversion rates vs template sites');

y = divider(y);
y = sectionTag(y, 'Why Straveda');
y = h2(y, 'Enterprise-Grade Execution, Without the Complexity');

const whys = [
  ['Weekly Shipping', 'One-week sprints. Builds every Friday, approve Monday, ship Tuesday. No black-box discovery phases.'],
  ['Automation First', 'Before we build feature one, we audit what can be removed, integrated, or automated. We prune scope then automate what\'s left.'],
  ['You Own Everything', 'Full code ownership. Complete documentation. Zero vendor lock-in. If we disappear tomorrow, you can run every system we built.'],
  ['Priced for ROI in 60 Days', 'Every proposal includes projected time savings, cost reduction, or revenue lift. If it doesn\'t pay back in one quarter, we don\'t recommend building it.'],
  ['One Team, End-to-End', 'Strategy, AI engineering, design, and deployment under one roof. One Slack channel. One point of accountability.'],
  ['Senior Execution', 'We cap engagements each quarter so you get senior attention on every build.'],
];
whys.forEach(([title, desc]) => {
  if (y > H - 80) { y = newPage(); footer('01 — Home (cont.)'); y = MT; }
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(10).text('→ ' + title + ':', ML, y, { lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(10)
     .text('  ' + desc, ML, y + 13, { width: TW });
  y += 13 + doc.heightOfString(desc, { width: TW, fontSize: 10 }) + 10;
});

// ── Page 1c — Process & Pricing ────────────────────────────────────────────────
y = newPage();
y = MT;
footer('01 — Home (cont.)');

y = sectionTag(y, 'Process');
y = h2(y, 'From Strategy Call to Live System');

const steps = [
  ['01  Discovery', '30-min strategy call. Analyse workflows, identify bottlenecks, define high-impact automation opportunities. You leave with a clear action plan — not a sales pitch.'],
  ['02  Architecture', 'Design your custom solution, define the tech stack, scope the build. Fixed price proposal within 24 hours — no hidden costs.'],
  ['03  Build', 'Develop in weekly sprints with full visibility. Review progress, give feedback, stay in control.'],
  ['04  Automate', 'Wire in the automation layer — triggers, workflows, AI agents. System runs without human intervention before handover.'],
  ['05  Scale', 'Full handover with documentation. Your team owns it. Retainer support available but not required.'],
];
steps.forEach(([step, desc]) => {
  if (y > H - 90) { y = newPage(); footer('01 — Home (cont.)'); y = MT; }
  drawRect(ML, y, 4, 44, ORANGE);
  doc.fillColor(DARK).font('Helvetica-Bold').fontSize(11).text(step, ML + 14, y + 2, { lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(9.5).text(desc, ML + 14, y + 18, { width: TW - 14 });
  y += 18 + doc.heightOfString(desc, { width: TW - 14, fontSize: 9.5 }) + 12;
});

y = divider(y);
y = sectionTag(y, 'Pricing');
y = h2(y, 'Flexible Engagement Models');
y = body(y, 'All engagements include full source code ownership and zero vendor lock-in. Fixed price quote after a 30-min discovery call.');

const plans = [
  ['Focused Automation Builds', '2–3 weeks', 'From ₹5L', ['One custom automation workflow', 'Seamless tool integration', 'Documentation & handover']],
  ['Custom Software & AI Systems ★', 'Based on scope', '₹15L–₹50L', ['End-to-end custom development', 'AI workflow integration', 'Scalable, ownership-ready code']],
  ['Ongoing Optimization & Scale', 'Monthly', 'Retainer', ['Performance monitoring', 'Feature enhancements', 'Continuous optimisation']],
];
plans.forEach(([name, time, price, feats]) => {
  if (y > H - 120) { y = newPage(); footer('01 — Home (cont.)'); y = MT; }
  const isBest = name.includes('★');
  drawRect(ML, y, TW, 88, isBest ? '#fff4f0' : LIGHT, 6);
  if (isBest) doc.rect(ML, y, 3, 88).fill(ORANGE);
  doc.fillColor(DARK).font('Helvetica-Bold').fontSize(12).text(name.replace(' ★', ''), ML + 14, y + 12);
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(11).text(price, W - MR - 80, y + 12, { width: 80, align: 'right', lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(9).text('Timeline: ' + time, ML + 14, y + 29);
  feats.forEach((f, i) => {
    doc.fillColor(ORANGE).fontSize(8).text('✓', ML + 14, y + 44 + i * 12, { lineBreak: false });
    doc.fillColor(GREY).font('Helvetica').fontSize(9).text(f, ML + 26, y + 44 + i * 12, { lineBreak: false });
  });
  y += 96;
});

// ══════════════════════════════════════════════════════════════════════════════
//  PAGE 2 — SERVICES
// ══════════════════════════════════════════════════════════════════════════════
y = newPage();
y = pageHeader('Services', 'Enterprise Software & AI Automation Services');
footer('02 — Services');

y = sectionTag(y, 'Service 01');
y = h2(y, 'AI & Business Automation');
y = body(y, 'Automates repetitive manual operations that drain your team\'s time and budget.', GREY);
const aiCapabilities = [
  ['WhatsApp Automation', 'AI-powered lead qualification & instant booking — runs 24/7 without human intervention.'],
  ['Email Sequences', 'Behaviour-triggered campaigns that run without touching your CRM.'],
  ['AI Support Agent', 'Tier-1 queries handled by AI; complex issues auto-escalate to your team.'],
  ['Workflow Automation', '30–60% reduction in manual operations within the first 90 days.'],
];
aiCapabilities.forEach(([cap, desc]) => {
  y = bullet(y, cap + ': ' + desc, GREY);
});
y = divider(y);

y = sectionTag(y, 'Service 02');
y = h2(y, 'Custom Software & Systems');
y = body(y, 'Purpose-built tools that replace off-the-shelf SaaS with systems your team actually adopts.', GREY);
[
  ['AI-Powered CRMs', 'Built around your specific sales process — not a generic template.'],
  ['Operational Dashboards', 'Real-time visibility into your core metrics. No more spreadsheets.'],
  ['Customer Portals', 'Reduce support volume with intelligent self-service.'],
  ['Internal Tools', 'Replace fragmented SaaS subscriptions with one integrated system.'],
].forEach(([cap, desc]) => { y = bullet(y, cap + ': ' + desc, GREY); });
y = divider(y);

y = sectionTag(y, 'Service 03');
y = h2(y, 'AI Strategy & Integration');
y = body(y, 'Deploy production-grade AI into your existing stack — not demos, not experiments.', GREY);
[
  ['AI Architecture', 'Phased roadmap to deploy AI where it creates real, measurable ROI.'],
  ['LLM Fine-Tuning', 'Models trained on your specific business context and terminology.'],
  ['RAG Systems', 'AI that answers questions using your private, secure data.'],
  ['API Integration', 'Seamlessly connect GPT-4o, Claude, and other models into your workflow.'],
].forEach(([cap, desc]) => { y = bullet(y, cap + ': ' + desc, GREY); });
y = divider(y);

y = sectionTag(y, 'Service 04');
y = h2(y, 'Web Development & 3D Experiences');
y = body(y, 'High-performance websites and immersive experiences that convert visitors into clients.', GREY);
[
  ['Next.js Performance', 'Sub-second loads and global edge deployment. SEO-ready from day one.'],
  ['3D & Interactive', 'Make your brand unforgettable with immersive builds that stand out.'],
  ['Conversion Funnels', 'A/B testing and analytics built into the core — not bolted on.'],
  ['Result', '2–4× improvement in conversion rates vs template-based sites.'],
].forEach(([cap, desc]) => { y = bullet(y, cap + ': ' + desc, GREY); });
y = divider(y);

y = sectionTag(y, 'Tech Stack');
y = h2(y, 'Mastered Technologies');
const stack = [
  ['Frontend', 'Next.js, React, TypeScript, Tailwind CSS'],
  ['AI & Automation', 'OpenAI GPT-4o, Claude API, LangChain, Vector DBs'],
  ['Infrastructure', 'AWS, Google Cloud, Docker, CI/CD, Security'],
  ['Data & Backend', 'PostgreSQL, Redis, Node.js, REST/GraphQL'],
  ['Automation Tools', 'n8n, WhatsApp API, Zapier'],
];
stack.forEach(([cat, tools]) => {
  if (y > H - 50) { y = newPage(); footer('02 — Services (cont.)'); y = MT; }
  doc.fillColor(DARK).font('Helvetica-Bold').fontSize(10).text(cat + ': ', ML, y, { continued: true, lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(10).text(tools, { lineBreak: false });
  y += 16;
});

// ══════════════════════════════════════════════════════════════════════════════
//  PAGE 3 — ABOUT
// ══════════════════════════════════════════════════════════════════════════════
y = newPage();
y = pageHeader('About Us', 'We get it. Because we\'ve lived it.');
footer('03 — About');

y = sectionTag(y, 'Our Story');
y = h2(y, 'Two Paths. One Choice.');
y = body(y, 'Every growing company eventually hits the same wall. Too many tools. Spreadsheets that don\'t sync. Your best people spending Friday afternoons doing work that shouldn\'t exist. You don\'t need another vendor — you need someone who actually understands the problem. We do.', GREY);
y = body(y, 'We\'ve built companies. We\'ve felt the frustration of paying for five tools when you really need one well-designed system that your team understands. That\'s why Straveda is different — building AI-powered systems that replace chaos with structure.', GREY);
y = divider(y);

// Two column comparison
y = sectionTag(y, 'The Transformation');
const colW = (TW - 16) / 2;
// Headers
drawRect(ML, y, colW, 26, '#fef2f2', 4);
drawRect(ML + colW + 16, y, colW, 26, '#f0fdf4', 4);
doc.fillColor('#dc2626').font('Helvetica-Bold').fontSize(10).text('The Old Way (Chaos)', ML + 10, y + 8, { lineBreak: false });
doc.fillColor('#16a34a').font('Helvetica-Bold').fontSize(10).text('The Straveda Way (Structure)', ML + colW + 26, y + 8, { lineBreak: false });
y += 34;

const comparisons = [
  ['Paying for 5 tools. None of them talk.', 'One platform, built for how you actually work.'],
  ['Fridays spent on reports that should write themselves.', 'Reports run overnight. Fridays are yours again.'],
  ['A decision needs 2 days just to get the data.', 'Every decision backed by live data instantly.'],
  ['Implementation started 6 months ago. Still setting it up.', 'You\'re live in 5 weeks. Paying back in 90 days.'],
  ['Your best hire is doing data entry.', 'Your best hire is doing their best work.'],
];
comparisons.forEach(([old, newWay]) => {
  const lh1 = doc.heightOfString(old, { width: colW - 10, fontSize: 9.5 });
  const lh2 = doc.heightOfString(newWay, { width: colW - 10, fontSize: 9.5 });
  const h = Math.max(lh1, lh2) + 12;
  doc.fillColor('#dc2626').font('Helvetica').fontSize(9.5).text('✗  ' + old, ML + 6, y + 4, { width: colW - 12 });
  doc.fillColor('#16a34a').font('Helvetica').fontSize(9.5).text('✓  ' + newWay, ML + colW + 22, y + 4, { width: colW - 12 });
  doc.moveTo(ML, y + h).lineTo(W - MR, y + h).lineWidth(0.3).strokeColor(DIVIDER).stroke();
  y += h;
});
y += 16;
y = divider(y);

// Operating Principles
y = sectionTag(y, 'Operating Principles');
y = h2(y, 'How We Work');
const principles = [
  ['Automation First', 'Before we build feature one, we ask: "What can we eliminate?" We prune scope — then automate what\'s left.'],
  ['You Own Everything', 'Full code ownership. Complete documentation. Zero vendor lock-in. If we disappear, your team runs the system.'],
  ['Speed Over Perfection', 'Shipping fast beats planning perfectly. Weekly sprints. Friday builds. Working software by week 4.'],
  ['Transparency', 'No black boxes. We document as we build. You know the "why" behind every decision.'],
  ['Priced for ROI', 'If a project doesn\'t pay for itself in 90 days, we don\'t build it.'],
  ['Senior Execution', 'We cap engagements so you get senior attention on every build.'],
];
principles.forEach(([p, d]) => {
  if (y > H - 70) { y = newPage(); footer('03 — About (cont.)'); y = MT; }
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(10).text(p, ML, y);
  doc.fillColor(GREY).font('Helvetica').fontSize(9.5).text(d, ML + 10, y + 14, { width: TW - 10 });
  y += 14 + doc.heightOfString(d, { width: TW - 10, fontSize: 9.5 }) + 10;
});
y = divider(y);

// Company stats
y = sectionTag(y, 'Company Stats');
const aboutStats = [['15+','Clients'],['20+','Projects'],['3–5×','Avg ROI'],['88%+','Retention'],['4–6w','Impl. Time'],['99.5%','Uptime']];
aboutStats.forEach(([v, l], i) => {
  if (i === 3 && y + 56 > H - MB) { y = newPage(); footer('03 — About (cont.)'); y = MT; }
  statBox(ML + (i % 3) * ((TW + 6) / 3), i < 3 ? y : y + 64, v, l, (TW - 12) / 3);
});
y += 134;

// ══════════════════════════════════════════════════════════════════════════════
//  PAGE 4 — TESTIMONIALS
// ══════════════════════════════════════════════════════════════════════════════
y = newPage();
y = pageHeader('Testimonials', 'Real results from real enterprises.');
footer('04 — Testimonials');

y = sectionTag(y, 'Overview');
const overallStats = [['5.0', 'Google Rating'], ['14+', 'Years Experience'], ['100%', 'Client Satisfaction']];
overallStats.forEach(([v, l], i) => statBox(ML + i * (TW / 3 + 2), y, v, l, TW / 3 - 3));
y += 72;
y = divider(y);

y = sectionTag(y, 'Client Stories');
const testimonials = [
  { name: 'D2C Fashion Brand, Mumbai', role: 'Operations Director', quote: 'We went from 200 leads/month to 1,200 in the same timeframe. Our team went from drowning to thriving.', result: '6× lead throughput' },
  { name: 'SaaS Startup, Bangalore', role: 'Founder', quote: 'Our CRM actually works the way we work. Sales velocity is up 3× and team adoption was instant — 95% vs 45% on Salesforce.', result: '3× sales velocity' },
  { name: 'E-Commerce, Delhi NCR', role: 'CEO', quote: 'We were paying for six different tools. Straveda consolidated everything into one integrated platform. ROI in the first quarter.', result: '50% cost reduction' },
  { name: 'Mid-Market Company, India', role: 'Operations Director', quote: 'We reclaimed 90 hours/month of team capacity from one automation project. That\'s two full-time people worth of work eliminated.', result: '90 hrs/month reclaimed' },
  { name: 'D2C Brand, India', role: 'Head of Growth', quote: 'The WhatsApp automation handles 80% of our lead flow. Response time dropped from 12 hours to under 5 minutes.', result: '80% automation rate' },
  { name: 'Insurance Broker, Mumbai', role: 'Operations Lead', quote: 'Document processing went from 5 minutes to 30 seconds per document. Claim approvals are 3× faster.', result: '10× faster processing' },
  { name: 'Professional Services, Pune', role: 'CEO', quote: 'Fixed price quote, clear timeline, weekly progress updates. No surprises, no scope creep. Live in 5 weeks.', result: 'On-time delivery' },
  { name: 'B2B SaaS, India', role: 'Founder', quote: 'I was skeptical about the 4–6 week timeline. They shipped the first working system in week 4. Every Friday, a demo. Every Monday, our feedback.', result: 'Week-4 delivery' },
];

testimonials.forEach((t) => {
  if (y > H - 110) { y = newPage(); footer('04 — Testimonials (cont.)'); y = MT; }
  drawRect(ML, y, TW, 85, LIGHT, 6);
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(20).text('"', ML + 12, y + 6, { lineBreak: false });
  doc.fillColor(DARK).font('Helvetica').fontSize(9.5)
     .text(t.quote, ML + 26, y + 12, { width: TW - 38 });
  const qh = doc.heightOfString(t.quote, { width: TW - 38, fontSize: 9.5 });
  doc.fillColor(DARK).font('Helvetica-Bold').fontSize(9).text(t.name, ML + 12, y + 14 + qh + 6, { lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(8.5).text(t.role, ML + 12, y + 14 + qh + 19, { lineBreak: false });
  const badgeW = doc.font('Helvetica-Bold').fontSize(8).widthOfString(t.result) + 16;
  drawRect(W - MR - badgeW - 8, y + 14 + qh + 8, badgeW, 16, '#fff4f0', 8);
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(8).text(t.result, W - MR - badgeW - 2, y + 14 + qh + 12, { lineBreak: false });
  y += 93;
});

// ══════════════════════════════════════════════════════════════════════════════
//  PAGE 5 — CAREERS
// ══════════════════════════════════════════════════════════════════════════════
y = newPage();
y = pageHeader('Careers', 'Build systems that eliminate busywork for mid-market teams.');
footer('05 — Careers');

y = sectionTag(y, 'Team Stats');
const teamStats = [['20–25', 'Team Size'], ['52%', 'Women in Tech'], ['100%', 'Remote First'], ['2+yr', 'Avg. Tech Exp.']];
teamStats.forEach(([v, l], i) => statBox(ML + i * (TW / 4 + 1), y, v, l, TW / 4 - 2));
y += 72;
y = divider(y);

y = sectionTag(y, 'Open Roles');
const roles = [
  { title: 'Full Stack Engineer', type: 'Full Time', loc: 'Remote / Nashik', skills: 'Next.js, TypeScript, Node.js', desc: 'Build scalable web applications and internal tools. Own features end-to-end, from API design to pixel-perfect UI.' },
  { title: 'AI / ML Engineer', type: 'Full Time', loc: 'Remote / Nashik', skills: 'Python, LLMs, LangChain', desc: 'Design and deploy AI-powered workflows and automation pipelines. Work with cutting-edge language models in production.' },
  { title: 'Automation Specialist', type: 'Full Time', loc: 'Remote', skills: 'n8n, WhatsApp API, Zapier', desc: 'Architect end-to-end automation workflows that eliminate manual operations for growing businesses.' },
  { title: 'Product Designer', type: 'Contract', loc: 'Remote', skills: 'Figma, UX Research, Design Systems', desc: 'Translate complex business requirements into clean, intuitive interfaces. Push back on anything that gets in the user\'s way.' },
];
roles.forEach((r) => {
  if (y > H - 100) { y = newPage(); footer('05 — Careers (cont.)'); y = MT; }
  drawRect(ML, y, TW, 78, LIGHT, 6);
  doc.fillColor(DARK).font('Helvetica-Bold').fontSize(12).text(r.title, ML + 14, y + 12, { lineBreak: false });
  badge(ML + 14, y + 29, r.type);
  badge(ML + 14 + doc.font('Helvetica-Bold').fontSize(8).widthOfString(r.type) + 36, y + 29, r.loc, '#f1f5f9', '#334155');
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(8.5).text('Skills: ', ML + 14, y + 50, { lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(8.5).text(r.skills, ML + 14 + 36, y + 50, { lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(9).text(r.desc, ML + 14, y + 62, { width: TW - 28 });
  y += 86;
});

y = divider(y);
y = sectionTag(y, 'Hiring Process');
y = h2(y, 'Total: 1–2 weeks from application to offer');
const hsteps = [
  ['Stage 1', 'Initial Conversation (15 min)', 'Within 3 days of applying. Phone call — cultural fit, communication, interest.'],
  ['Stage 2', 'Portfolio / Technical Review (30 min)', '3–5 days after Stage 1. Share portfolio, GitHub repos, or past projects on Zoom.'],
  ['Stage 3', 'Take Home Project (Optional)', 'Real-world problem from our work. No weird algorithmic puzzles.'],
  ['Stage 4', 'Team Interview (20 min)', 'Meet 2–3 team members. Technical deep-dive on your take-home.'],
  ['Stage 5', 'Offer (~1 week)', 'Call with CEO or hiring director. Discuss comp, benefits, start date.'],
];
hsteps.forEach(([stage, title, desc]) => {
  if (y > H - 60) { y = newPage(); footer('05 — Careers (cont.)'); y = MT; }
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(8).text(stage.toUpperCase(), ML, y, { lineBreak: false });
  doc.fillColor(DARK).font('Helvetica-Bold').fontSize(10).text(title, ML + 50, y, { lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(9).text(desc, ML + 50, y + 14, { width: TW - 50 });
  y += 14 + doc.heightOfString(desc, { width: TW - 50, fontSize: 9 }) + 10;
});

// ══════════════════════════════════════════════════════════════════════════════
//  PAGE 6 — CONTACT
// ══════════════════════════════════════════════════════════════════════════════
y = newPage();
y = pageHeader('Contact', 'Let\'s architect your path forward.');
footer('06 — Contact');

y = sectionTag(y, 'Get In Touch');
y = h2(y, '"Tell us about your enterprise challenge.\nWe\'ll respond within 1 business day."');
y += 8;

// Contact details
const contactDetails = [
  ['Email', 'hello@stravedatech.com'],
  ['Location', 'Pune, Maharashtra 411001, India'],
  ['Business Hours', 'Monday–Friday, 9:00 AM–6:00 PM IST'],
  ['Response Time', 'Within 1 business day'],
];
contactDetails.forEach(([label, val]) => {
  if (y > H - 50) { y = newPage(); footer('06 — Contact (cont.)'); y = MT; }
  drawRect(ML, y, TW, 36, LIGHT, 6);
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(9).text(label, ML + 14, y + 6, { lineBreak: false });
  doc.fillColor(DARK).font('Helvetica').fontSize(11).text(val, ML + 14, y + 18, { lineBreak: false });
  y += 44;
});
y = divider(y);

y = sectionTag(y, 'Why Work With Us');
[
  'Response within 1 business day',
  'Free initial consultation',
  'No lock-in contracts',
  'Guaranteed satisfaction',
  'Fixed price — no surprise invoices',
  'Full code ownership from day one',
].forEach((item) => { y = bullet(y, item, GREY); });

y = divider(y);
y = sectionTag(y, 'How to Start');
const startSteps = [
  ['1.', 'Book a 30-Minute Strategy Call', 'Free. No commitment. You\'ll leave with a clear action plan for what to automate or build first.'],
  ['2.', 'Get a Custom Proposal (48 hours)', 'Fixed price quote, timeline, and success metrics. No ambiguity.'],
  ['3.', 'Start Building (4–6 weeks)', 'Weekly sprints with visible progress. Go live and reclaim your team\'s time.'],
];
startSteps.forEach(([num, title, desc]) => {
  if (y > H - 80) { y = newPage(); footer('06 — Contact (cont.)'); y = MT; }
  doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(22).text(num, ML, y, { lineBreak: false });
  doc.fillColor(DARK).font('Helvetica-Bold').fontSize(12).text(title, ML + 30, y + 4, { lineBreak: false });
  doc.fillColor(GREY).font('Helvetica').fontSize(10).text(desc, ML + 30, y + 20, { width: TW - 30 });
  y += 20 + doc.heightOfString(desc, { width: TW - 30, fontSize: 10 }) + 14;
});

// ══════════════════════════════════════════════════════════════════════════════
//  BACK COVER
// ══════════════════════════════════════════════════════════════════════════════
newPage(DARK);
doc.rect(0, 0, W, H).fill(DARK);
doc.rect(0, 0, W, 3).fill(ORANGE);

doc.fillColor('rgba(255,72,0,0.06)').font('Helvetica-Bold').fontSize(380)
   .text('S', -50, 80, { lineBreak: false });

doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(28)
   .text('Ready to eliminate\nmanual work?', ML, 220, { width: TW, lineGap: 4 });

doc.fillColor('rgba(255,255,255,0.55)').font('Helvetica').fontSize(12)
   .text('Book a free 30-minute strategy call.\nWe\'ll send a proposal within 48 hours.', ML, 300, { width: TW });

doc.rect(ML, 370, 200, 48).fill(ORANGE).roundedRect(ML, 370, 200, 48, 8).fill(ORANGE);
doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(13)
   .text('Book Strategy Call →', ML, 388, { width: 200, align: 'center', lineBreak: false });

doc.fillColor('rgba(255,255,255,0.4)').font('Helvetica').fontSize(10)
   .text('hello@stravedatech.com', ML, 440, { lineBreak: false });

doc.rect(0, H - 80, W, 80).fill('#0a0a14');
doc.fillColor(ORANGE).font('Helvetica-Bold').fontSize(18).text('STRAVEDA', ML, H - 58, { lineBreak: false });
doc.fillColor(WHITE).font('Helvetica').fontSize(18).text(' TECH', ML + 100, H - 58, { lineBreak: false });
doc.fillColor('rgba(255,255,255,0.3)').font('Helvetica').fontSize(9)
   .text('Pune, India  ·  Mid-market AI automation & custom software', ML, H - 36, { lineBreak: false });

doc.end();

out.on('finish', () => {
  const size = (fs.statSync(path.join(__dirname, 'straveda-master.pdf')).size / 1024).toFixed(0);
  console.log(`✓ straveda-master.pdf generated (${size} KB)`);
});
