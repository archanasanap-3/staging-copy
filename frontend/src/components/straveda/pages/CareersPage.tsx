'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import HorizontalCarousel from '@/components/straveda/HorizontalCarousel';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease },
};

// ── Data ─────────────────────────────────────────────────────────────────────

const OPEN_ROLES = [
  {
    title: 'Full Stack Engineer',
    type: 'Full Time',
    track: 'Engineering',
    location: 'Remote / Nashik',
    tags: ['Next.js', 'TypeScript', 'Node.js'],
    desc: 'Build scalable web applications and internal tools for our clients. You will own features End To End, from API design to pixel perfect UI.',
  },
  {
    title: 'AI/ML Engineer',
    type: 'Full time',
    track: 'AI & Automation',
    location: 'Remote / Nashik',
    tags: ['Python', 'LLMs', 'LangChain'],
    desc: 'Design and deploy AI Powered workflows and automation pipelines. Work directly with Cutting Edge language models and integrate them into production systems.',
  },
  {
    title: 'Automation Specialist',
    type: 'Full Time',
    track: 'AI & Automation',
    location: 'Remote',
    tags: ['n8n', 'WhatsApp API', 'Zapier'],
    desc: 'Architect End To End automation workflows that eliminate manual operations for growing businesses. Deep knowledge of integration platforms is a plus.',
  },
  {
    title: 'Product Designer',
    type: 'Contract',
    track: 'Design',
    location: 'Remote',
    tags: ['Figma', 'UX Research', 'Design Systems'],
    desc: "Translate complex business requirements into clean, intuitive interfaces. You care deeply about user experience and push back on anything that gets in the user's way.",
  },
];

const HIRING_STAGES = [
  {
    stage: 'Stage 1',
    title: 'Initial Conversation',
    duration: '15 min',
    timeline: 'Within 3 days of applying',
    format: 'Phone call with recruiter or hiring manager',
    assesses: 'Cultural fit. Communication. Why you\'re interested in StravedaTech.',
  },
  {
    stage: 'Stage 2',
    title: 'Portfolio / Technical Review',
    duration: '30 min',
    timeline: '3–5 days after Stage 1',
    format: 'Share portfolio (designers, frontend), GitHub repos (engineers), or past projects. We review, ask questions on a Zoom call.',
    assesses: 'Your work. Quality. Process. Depth of thinking.',
  },
  {
    stage: 'Stage 3',
    title: 'Take Home Project',
    duration: 'Optional',
    timeline: 'Flexible',
    format: 'Real World problem from our work. Build a feature. Fix a design. No weird algorithmic puzzles.',
    assesses: 'How you code/design. Problem solving. Communication about Trade Offs.',
  },
  {
    stage: 'Stage 4',
    title: 'Team Interview',
    duration: '20 min',
    timeline: '3 to 5 days after project submission',
    format: 'Meet 2 to 3 team members (rotating panels). Technical deep dive on your take home. Ask us anything.',
    assesses: 'Fit with team. Communication. How you think about problems.',
  },
  {
    stage: 'Stage 5',
    title: 'Offer',
    duration: '~1 week',
    timeline: 'Within 3 to 5 days of final interview',
    format: 'Call with our CEO or hiring director. Discuss comp, benefits, start date, questions.',
    assesses: 'If we both want to work together, we make an offer.',
  },
];

const ROLE_TRACKS = [
  {
    track: 'AI & Automation',
    levels: [
      { title: 'Automation Engineer (Entry)', desc: 'Build workflows, implement automation systems, learn real client use cases.' },
      { title: 'Automation Engineer (Mid)', desc: 'Design complex systems, lead automation logic, mentor juniors.' },
      { title: 'Senior Automation Architect', desc: 'Define AI strategies, design scalable systems, lead client solutions.' },
      { title: 'Principal AI Engineer', desc: 'Set AI vision, drive innovation, influence company direction.' },
    ],
  },
  {
    track: 'Custom Software',
    levels: [
      { title: 'Developer (Entry)', desc: 'Build features, understand systems, ship consistently.' },
      { title: 'Developer (Mid)', desc: 'Own Modules, Design APIs, handle End To End delivery.' },
      { title: 'Senior Engineer', desc: 'Lead Projects, mentor team, Make Architectural decisions.' },
      { title: 'Tech Lead / Engineering Manager', desc: 'Build teams, define systems, drive execution.' },
    ],
  },
  {
    track: 'Design',
    levels: [
      { title: 'Product Designer (Entry)', desc: 'Design interfaces, support user research.' },
      { title: 'Product Designer (Mid)', desc: 'Own product flows, lead UX decisions.' },
      { title: 'Senior Designer / Lead', desc: 'Drive design systems, mentor team.' },
      { title: 'Design Director', desc: 'Define design strategy, influence product direction.' },
    ],
  },
];

const CERTIFICATIONS = [
  {
    area: 'Cloud Architecture',
    certs: ['AWS Solutions Architect', 'GCP Professional', 'Azure Fundamentals'],
  },
  {
    area: 'AI / ML',
    certs: ['DeepLearning.AI Specializations', 'Anthropic API Certification', 'LangChain Advanced'],
  },
  {
    area: 'Product & Design',
    certs: ['Reforge', 'Nielsen Norman Group UX', 'Jobs to be Done'],
  },
  {
    area: 'Leadership',
    certs: ['RadReads Coaching', 'Management Training for Leads', 'Exec Presence Workshops'],
  },
];

const MENTORSHIPS = [
  { from: 'Junior Engineer', to: 'Senior Architect', focus: 'learning system design' },
  { from: 'Designer', to: 'PM', focus: 'learning product thinking' },
  { from: 'Mid Level Engineer', to: 'Startup founder', focus: 'learning to lead' },
  { from: 'PM', to: 'Design director', focus: 'learning design systems' },
];

const VALUES = [
  {
    title: 'Remove Friction',
    body: 'Every project starts with "What can we remove?" not "What should we build?" We\'re ruthless about complexity. Elegant solutions over clever code.',
    practice: 'Code reviews focus on readability. Meetings have agendas. Tools are chosen for power and simplicity.',
  },
  {
    title: 'Own Outcomes',
    body: 'We don\'t ship features. We ship results. Every piece of work is tied to a metric: support tickets reduced, conversion lifted, time saved.',
    practice: 'We measure everything. We follow up with clients post-launch. We iterate based on data.',
  },
  {
    title: 'Grow Together',
    body: 'Your growth is ours. We mentor. We invest in learning. We celebrate wins (big and small). We give honest feedback.',
    practice: 'Learning budgets. Mentorship program. Clear promotion pathways. Everyone gets a say on big decisions.',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

type FormState = 'idle' | 'loading' | 'success' | 'error';
const inputCls = "w-full rounded-lg px-4 py-2.5 text-[13px] border border-black/[0.1] dark:border-white/[0.1] bg-white/60 dark:bg-white/[0.04] text-[#1a1a2e] dark:text-[#f0f0f5] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#FF4800]/40 transition";

interface ApplicationForm {
  name: string; email: string; phone: string;
  linkedin: string; portfolio: string; whyJoin: string; resume: File | null;
}
const EMPTY_FORM: ApplicationForm = { name: '', email: '', phone: '', linkedin: '', portfolio: '', whyJoin: '', resume: null };

// ── ApplyForm ─────────────────────────────────────────────────────────────────

function ApplyForm({ roleTitle, onClose }: { roleTitle: string; onClose: () => void }) {
  const [form, setForm] = useState<ApplicationForm>(EMPTY_FORM);
  const [status, setStatus] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof ApplicationForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, resume: e.target.files?.[0] ?? null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.resume) { setErrorMsg('Please attach your resume (PDF).'); return; }
    setStatus('loading'); setErrorMsg('');
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:      form.name,
          email:     form.email,
          phone:     form.phone,
          portfolio: form.portfolio || form.linkedin,
          message:   form.whyJoin,
          position:  roleTitle,
          formType:  'career',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
      setStatus('success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit. Please try again.';
      setStatus('error');
      setErrorMsg(msg);
    }
  };

  if (status === 'success') {
    return (
      <div className="px-7 pb-8 pt-6 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,72,0,0.1)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF4800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <p className="text-[15px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] mb-1">Application submitted!</p>
        <p className="text-[13px] text-[#6b7280] dark:text-[#9ca3af]">We&apos;ll review it and get back to you within 5 business days.</p>
        <button onClick={onClose} className="mt-5 text-[12px] text-[#FF4800] font-medium hover:underline">Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="px-7 pb-8 pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
      <p className="text-[12px] font-bold uppercase tracking-widest text-[#FF4800] mb-5 mt-5">Apply — {roleTitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Full Name *</label>
          <input required value={form.name} onChange={set('name')} placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Email *</label>
          <input required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className={inputCls} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Phone</label>
          <input value={form.phone} onChange={set('phone')} placeholder="+91 98000 00000" className={inputCls} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">LinkedIn URL</label>
          <input value={form.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/in/you" className={inputCls} />
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Portfolio / GitHub</label>
        <input value={form.portfolio} onChange={set('portfolio')} placeholder="github.com/you or yoursite.com" className={inputCls} />
      </div>
      <div className="mb-3">
        <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Why do you want to join Straveda? *</label>
        <textarea required rows={4} value={form.whyJoin} onChange={set('whyJoin')} placeholder="Tell us what excites you about this role..." className={inputCls + ' resize-none'} />
      </div>
      <div className="mb-5">
        <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Resume (PDF, max 5 MB) *</label>
        <input ref={fileRef} type="file" accept=".pdf" onChange={handleFile} className="hidden" />
        <button type="button" onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] border border-dashed border-[#FF4800]/40 text-[#FF4800] hover:bg-[#FF4800]/5 transition w-full justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
          {form.resume ? form.resume.name : 'Upload Resume PDF'}
        </button>
      </div>
      {errorMsg && <p className="text-[12px] text-red-500 mb-3">{errorMsg}</p>}
      <div className="flex items-center gap-3">
        <button type="submit" disabled={status === 'loading'}
          className="rounded-lg px-6 py-2.5 text-[13px] font-medium text-white transition-all duration-200 disabled:opacity-60"
          style={{ background: '#FF4800' }}
          onMouseEnter={(e) => { if (status !== 'loading') e.currentTarget.style.background = '#e03e00'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#FF4800'; }}>
          {status === 'loading' ? 'Submitting…' : 'Submit Application →'}
        </button>
        <button type="button" onClick={onClose} className="text-[12px] text-[#9ca3af] hover:text-[#6b7280] transition">Cancel</button>
      </div>
    </form>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────────

function HeroSection({ onViewRoles }: { onViewRoles: () => void }) {
  return (
    <section className="relative bg-[#f5f5f0] dark:bg-[#030303] pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp}>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-[1px] w-8 bg-[#FF4800]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF4800]">Careers at StravedaTech</span>
          </div>
          <h1 className="text-[42px] md:text-[66px] font-light leading-[1] tracking-[-2px] mb-6 text-[#1a1a2e] dark:text-[#f0f0f5] max-w-3xl">
            Build the systems that eliminate busywork<br />
            <span style={{ color: '#FF4800' }}>for mid-market teams.</span>
          </h1>
          <p className="text-[17px] leading-[1.7] text-[#6b7280] dark:text-[#9ca3af] max-w-2xl mb-10">
            We solve operational problems by removing what&apos;s unnecessary before building anything new. You&apos;ll create AI systems, software, and experiences that deliver measurable outcomes—not just output.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onViewRoles}
              className="rounded-lg px-7 py-3 text-[14px] font-medium text-white transition-all"
              style={{ background: '#FF4800' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#e03e00'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#FF4800'; }}
            >
              View All Open Roles →
            </button>
            <a
              href="/about"
              className="rounded-lg px-7 py-3 text-[14px] font-medium text-[#1a1a2e] dark:text-[#f0f0f5] border border-black/[0.12] dark:border-white/[0.12] hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all"
            >
              Learn More About Us
            </a>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="mt-16 glass-card rounded-2xl p-8 md:p-10 max-w-3xl"
        >
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="mb-5" style={{ opacity: 0.3 }}>
            <path d="M0 20V12C0 5.373 4.701 1.12 14.103 0l1.33 2.24C10.19 3.307 7.493 5.84 6.72 9.6H12V20H0zm16 0V12C16 5.373 20.701 1.12 30.103 0l1.33 2.24C26.19 3.307 23.493 5.84 22.72 9.6H28V20H16z" fill="#1a1a2e" className="dark:fill-white" />
          </svg>
          <p className="text-[15px] leading-[1.8] text-[#1a1a2e] dark:text-[#f0f0f5] mb-5">
            &ldquo;I came to StravedaTech to solve problems, and that&apos;s exactly what we do every day. Last quarter, I led a project that cut our client&apos;s manual operations by 50% in 6 weeks. That&apos;s the impact we deliver.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-semibold" style={{ background: '#FF4800' }}>S</div>
            <div>
              <p className="text-[13px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5]">StravedaTech Team Member</p>
              <p className="text-[11px] text-[#6b7280] dark:text-[#9ca3af]">Automation Engineer</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhoWorksHereSection() {
  const stats = [
    { value: '20–25', label: 'Team size' },
    { value: '2+', label: 'Avg. years in tech' },
    { value: '52%', label: 'Women in technical roles' },
    { value: '100%', label: 'Remote first' },
  ];
  const traits = [
    'Engineers, designers, strategists, PMs — no suits',
    'Mix of Full Time and fractional specialists',
    'Distributed across US and India',
    'Employee Resource Group: StravedaTech Community (meets monthly)',
  ];

  return (
    <section className="py-20 px-6 bg-white dark:bg-[#0d0d1a]">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#FF4800] mb-4">Who We Are</p>
          <h2 className="text-[32px] md:text-[44px] font-light tracking-[-1px] text-[#1a1a2e] dark:text-[#f0f0f5] mb-4">
            Smart people solving<br />real problems. That&apos;s us.
          </h2>
        </motion.div>

        <HorizontalCarousel cols={4} size="sm" className="mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="glass-card rounded-xl p-6 text-center h-full active:scale-95 transition-transform"
            >
              <p className="text-[32px] font-light tracking-[-1px] mb-1" style={{ color: '#FF4800' }}>{s.value}</p>
              <p className="text-[12px] text-[#6b7280] dark:text-[#9ca3af]">{s.label}</p>
            </motion.div>
          ))}
        </HorizontalCarousel>

        <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {traits.map((t) => (
            <div key={t} className="flex items-start gap-3 glass-card rounded-xl px-5 py-4">
              <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#FF4800' }} />
              <p className="text-[14px] text-[#6b7280] dark:text-[#9ca3af] leading-[1.6]">{t}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function GrowthSection() {
  const [openTrack, setOpenTrack] = useState<string | null>('AI & Automation');

  return (
    <section className="py-20 px-6 bg-[#f5f5f0] dark:bg-[#030303]">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#FF4800] mb-4">Growth & Learning</p>
          <h2 className="text-[32px] md:text-[44px] font-light tracking-[-1px] text-[#1a1a2e] dark:text-[#f0f0f5] mb-4">
            We Don&apos;t Offer Jobs.<br />We Offer Careers.
          </h2>
          <p className="text-[16px] text-[#6b7280] dark:text-[#9ca3af] max-w-xl leading-[1.7]">
            Your growth is our competitive advantage. We invest in you because teams win when people grow.
          </p>
        </motion.div>

        {/* Certification Pathways */}
        <motion.div {...fadeUp} className="mb-14">
          <h3 className="text-[20px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] mb-6">Certification Pathways</h3>
          <HorizontalCarousel cols={2} size="md">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.area}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="glass-card rounded-xl p-6 h-full active:scale-95 transition-transform"
              >
                <p className="text-[12px] font-bold uppercase tracking-[0.25em] mb-3" style={{ color: '#FF4800' }}>{c.area}</p>
                <ul className="space-y-2">
                  {c.certs.map((cert) => (
                    <li key={cert} className="flex items-center gap-2 text-[13px] text-[#6b7280] dark:text-[#9ca3af]">
                      <span className="w-1 h-1 rounded-full flex-shrink-0 bg-[#6b7280]" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </HorizontalCarousel>
        </motion.div>

        {/* Mentorship */}
        <motion.div {...fadeUp} className="mb-14">
          <h3 className="text-[20px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] mb-2">Mentorship Program</h3>
          <p className="text-[14px] text-[#6b7280] dark:text-[#9ca3af] mb-6 max-w-xl leading-[1.6]">
            Every engineer, designer, and PM gets matched with a mentor based on growth goals, not seniority. Monthly 1 hour sessions.
          </p>
          <HorizontalCarousel cols={2} size="md" showHint={false}>
            {MENTORSHIPS.map((m) => (
              <div key={m.from + m.to} className="glass-card rounded-xl px-5 py-4 flex items-center gap-4 active:scale-95 transition-transform h-full">
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-[#1a1a2e] dark:text-[#f0f0f5]">{m.from} → {m.to}</p>
                  <p className="text-[12px] text-[#6b7280] dark:text-[#9ca3af]">{m.focus}</p>
                </div>
              </div>
            ))}
          </HorizontalCarousel>
        </motion.div>

        {/* Weekly Knowledge Shares */}
        <motion.div {...fadeUp} className="mb-14">
          <div className="glass-card rounded-xl p-7 md:p-9">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,72,0,0.1)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF4800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h3 className="text-[17px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] mb-1">Weekly Knowledge Shares</h3>
                <p className="text-[13px] text-[#6b7280] dark:text-[#9ca3af] mb-4">Friday 4 PM — 30-min deep dive on a tool, technique, or lesson learned. Everyone presents at least 2×/year.</p>
                <div className="flex flex-wrap gap-2">
                  {['Building AI agents at scale', 'CSS Grid mastery', 'Negotiation strategies', 'Design critique frameworks'].map((t) => (
                    <span key={t} className="text-[11px] px-3 py-1.5 rounded-full border border-[#FF4800]/30 text-[#FF4800]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Role Progression */}
        <motion.div {...fadeUp}>
          <h3 className="text-[20px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] mb-2">How You Grow at Straveda</h3>
          <p className="text-[14px] text-[#6b7280] dark:text-[#9ca3af] mb-7">Growth here is based on impact — not tenure. You move forward by what you build, not how long you stay.</p>

          <div className="flex gap-2 mb-6 flex-wrap">
            {ROLE_TRACKS.map((t) => (
              <button
                key={t.track}
                onClick={() => setOpenTrack(t.track)}
                className="px-4 py-2 rounded-lg text-[12px] font-medium transition-all"
                style={{
                  background: openTrack === t.track ? '#FF4800' : 'transparent',
                  color: openTrack === t.track ? 'white' : '#6b7280',
                  border: `1px solid ${openTrack === t.track ? '#FF4800' : 'rgba(0,0,0,0.1)'}`,
                }}
              >
                {t.track}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {ROLE_TRACKS.filter((t) => t.track === openTrack).map((track) => (
              <motion.div
                key={track.track}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
                className=""
              >
                <HorizontalCarousel cols={4} size="sm" showHint={false}>
                {track.levels.map((lvl, i) => (
                  <div key={lvl.title} className="glass-card rounded-xl p-5 relative h-full active:scale-95 transition-transform">
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#FF4800' }}>
                      Level {i + 1}
                    </div>
                    <p className="text-[13px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] mb-2 leading-[1.4]">{lvl.title}</p>
                    <p className="text-[12px] text-[#6b7280] dark:text-[#9ca3af] leading-[1.6]">{lvl.desc}</p>
                    {i < track.levels.length - 1 && (
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden md:flex w-4 h-4 items-center justify-center z-10">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF4800" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </div>
                    )}
                  </div>
                ))}
                </HorizontalCarousel>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Promotion criteria */}
          <div className="mt-8 glass-card rounded-xl p-6">
            <p className="text-[13px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] mb-4">Promotion Criteria</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Measurable impact delivered', 'Ownership of systems/projects', 'Depth in your domain', 'Mentorship & team contribution', 'Reviews happen annually'].map((c) => (
                <div key={c} className="flex items-center gap-2 text-[12px] text-[#6b7280] dark:text-[#9ca3af]">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#FF4800' }} />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HiringProcessSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 px-6 bg-white dark:bg-[#0d0d1a]">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#FF4800] mb-4">Hiring Process</p>
          <h2 className="text-[32px] md:text-[44px] font-light tracking-[-1px] text-[#1a1a2e] dark:text-[#f0f0f5] mb-4">
            No surprises. Just clarity.
          </h2>
          <p className="text-[15px] text-[#6b7280] dark:text-[#9ca3af] max-w-lg leading-[1.7]">
            Total process: <strong className="text-[#1a1a2e] dark:text-[#f0f0f5]">1–2 weeks</strong> from application to offer.
          </p>
        </motion.div>

        <div className="space-y-3">
          {HIRING_STAGES.map((s, i) => (
            <motion.div
              key={s.stage}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center gap-5 px-6 py-5 text-left"
              >
                <span className="text-[11px] font-bold uppercase tracking-widest w-14 flex-shrink-0" style={{ color: '#FF4800' }}>{s.stage}</span>
                <span className="flex-1 text-[14px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5]">{s.title}</span>
                <span className="text-[12px] text-[#6b7280] dark:text-[#9ca3af] mr-4 hidden md:block">{s.duration}</span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round"
                  style={{ transform: openIdx === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease', flexShrink: 0 }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 border-t border-black/[0.06] dark:border-white/[0.06] grid grid-cols-1 md:grid-cols-3 gap-5 mt-2 pt-5">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF4800] mb-2">What We Assess</p>
                        <p className="text-[13px] text-[#6b7280] dark:text-[#9ca3af] leading-[1.6]">{s.assesses}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF4800] mb-2">Format</p>
                        <p className="text-[13px] text-[#6b7280] dark:text-[#9ca3af] leading-[1.6]">{s.format}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF4800] mb-2">Expected Timeline</p>
                        <p className="text-[13px] text-[#6b7280] dark:text-[#9ca3af] leading-[1.6]">{s.timeline}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="py-20 px-6 bg-[#f5f5f0] dark:bg-[#030303]">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#FF4800] mb-4">Culture & Values</p>
          <h2 className="text-[32px] md:text-[44px] font-light tracking-[-1px] text-[#1a1a2e] dark:text-[#f0f0f5]">
            We Remove Friction.<br />We Own Outcomes.<br />We Grow Together.
          </h2>
        </motion.div>
        <HorizontalCarousel cols={3} size="md">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="glass-card rounded-xl p-7 h-full active:scale-95 transition-transform"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-5" style={{ background: 'rgba(255,72,0,0.1)' }}>
                <span className="w-2 h-2 rounded-full" style={{ background: '#FF4800' }} />
              </div>
              <p className="text-[16px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] mb-3">{v.title}</p>
              <p className="text-[13px] leading-[1.7] text-[#6b7280] dark:text-[#9ca3af] mb-4">{v.body}</p>
              <div className="border-t border-black/[0.06] dark:border-white/[0.06] pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#FF4800' }}>In Practice</p>
                <p className="text-[12px] text-[#6b7280] dark:text-[#9ca3af] leading-[1.6]">{v.practice}</p>
              </div>
            </motion.div>
          ))}
        </HorizontalCarousel>
      </div>
    </section>
  );
}

function OpenRolesSection() {
  const [openRole, setOpenRole] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const tracks = ['All', 'Engineering', 'AI & Automation', 'Design'];
  const filtered = filter === 'All' ? OPEN_ROLES : OPEN_ROLES.filter((r) => r.track === filter);

  return (
    <section id="open-roles" className="py-20 px-6 bg-white dark:bg-[#0d0d1a]">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#FF4800] mb-4">Open Roles</p>
          <h2 className="text-[32px] md:text-[44px] font-light tracking-[-1px] text-[#1a1a2e] dark:text-[#f0f0f5] mb-6">
            Find your place on the team.
          </h2>
          <div className="flex gap-2 flex-wrap">
            {tracks.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className="px-4 py-2 rounded-lg text-[12px] font-medium transition-all"
                style={{
                  background: filter === t ? '#FF4800' : 'transparent',
                  color: filter === t ? 'white' : '#6b7280',
                  border: `1px solid ${filter === t ? '#FF4800' : 'rgba(0,0,0,0.1)'}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-4">
          {filtered.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <div
                className="px-7 py-6 cursor-pointer"
                onClick={() => setOpenRole(openRole === role.title ? null : role.title)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded" style={{ background: 'rgba(255,72,0,0.1)', color: '#FF4800' }}>{role.track}</span>
                      <span className="text-[11px] text-[#6b7280] dark:text-[#9ca3af]">{role.type}</span>
                      <span className="text-[11px] text-[#6b7280] dark:text-[#9ca3af]">· {role.location}</span>
                    </div>
                    <h3 className="text-[16px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] mb-2">{role.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {role.tags.map((tag) => (
                        <span key={tag} className="text-[11px] px-2 py-1 rounded bg-black/[0.04] dark:bg-white/[0.05] text-[#6b7280] dark:text-[#9ca3af]">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round"
                    style={{ transform: openRole === role.title ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease', flexShrink: 0, marginTop: 4 }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              <AnimatePresence>
                {openRole === role.title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-black/[0.06] dark:border-white/[0.06]">
                      <div className="px-7 py-5">
                        <p className="text-[13px] text-[#6b7280] dark:text-[#9ca3af] leading-[1.7] mb-5">{role.desc}</p>
                        <button
                          onClick={(e) => { e.stopPropagation(); }}
                          className="text-[12px] font-semibold text-[#FF4800] hover:underline"
                        >
                          Apply for this role ↓
                        </button>
                      </div>
                      <ApplyForm roleTitle={role.title} onClose={() => setOpenRole(null)} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpenApplicationSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', whatYouBuild: '' });
  const [resume, setResume] = useState<File | null>(null);
  const [status, setStatus] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) { setErrorMsg('Please attach your resume (PDF).'); return; }
    setStatus('loading'); setErrorMsg('');
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:     form.name,
          email:    form.email,
          phone:    form.phone,
          message:  form.whatYouBuild,
          position: 'Open Application',
          formType: 'career',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
      setStatus('success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit. Please try again.';
      setStatus('error');
      setErrorMsg(msg);
    }
  };

  return (
    <section className="py-20 px-6 bg-[#f5f5f0] dark:bg-[#030303]">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="glass-card rounded-2xl overflow-hidden">
          <div className="px-10 py-8 md:px-14" style={{ background: 'linear-gradient(135deg, #FF4800 0%, #cc3900 100%)' }}>
            <h2 className="text-[26px] md:text-[32px] font-light text-white mb-2 tracking-[-0.5px]">Don&apos;t see your role?</h2>
            <p className="text-[14px] text-white/80 max-w-md leading-[1.7]">
              We sometimes create roles for exceptional people. Drop your resume and tell us what you build — we read every application.
            </p>
          </div>
          <div className="px-10 py-8 md:px-14">
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,72,0,0.1)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF4800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <p className="text-[15px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] mb-1">We&apos;ve got your application!</p>
                <p className="text-[13px] text-[#6b7280] dark:text-[#9ca3af]">If there&apos;s a fit, you&apos;ll hear from us directly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Full Name *</label>
                    <input required value={form.name} onChange={set('name')} placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Email *</label>
                    <input required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className={inputCls} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Phone</label>
                    <input value={form.phone} onChange={set('phone')} placeholder="+91 98000 00000" className={inputCls} />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">What do you build & why Straveda? *</label>
                  <textarea required rows={4} value={form.whatYouBuild} onChange={set('whatYouBuild')}
                    placeholder="Tell us about yourself, your skills, and what excites you about working with us..."
                    className={inputCls + ' resize-none'} />
                </div>
                <div className="mb-6">
                  <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Resume (PDF, max 5 MB) *</label>
                  <input ref={fileRef} type="file" accept=".pdf" onChange={(e) => setResume(e.target.files?.[0] ?? null)} className="hidden" />
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] border border-dashed border-[#FF4800]/40 text-[#FF4800] hover:bg-[#FF4800]/5 transition w-full justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                    {resume ? resume.name : 'Upload Resume PDF'}
                  </button>
                </div>
                {errorMsg && <p className="text-[12px] text-red-500 mb-3">{errorMsg}</p>}
                <button type="submit" disabled={status === 'loading'}
                  className="rounded-lg px-7 py-3 text-[13px] font-medium text-white transition-all duration-200 disabled:opacity-60"
                  style={{ background: '#FF4800' }}
                  onMouseEnter={(e) => { if (status !== 'loading') e.currentTarget.style.background = '#e03e00'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#FF4800'; }}>
                  {status === 'loading' ? 'Submitting…' : 'Send Open Application →'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-[#0d0d1a]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-[32px] md:text-[48px] font-light tracking-[-1.5px] text-[#1a1a2e] dark:text-[#f0f0f5] mb-4">
            Ready to make an impact?
          </h2>
          <p className="text-[15px] text-[#6b7280] dark:text-[#9ca3af] mb-8 max-w-md mx-auto leading-[1.7]">
            Don&apos;t see a fit? Reach out — we sometimes create roles for exceptional people.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#open-roles"
              className="rounded-lg px-8 py-3.5 text-[14px] font-medium text-white transition-all"
              style={{ background: '#FF4800' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#e03e00'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#FF4800'; }}
            >
              View All Open Roles →
            </a>
            <a
              href="mailto:contact@stravedatech.com"
              className="rounded-lg px-8 py-3.5 text-[14px] font-medium text-[#1a1a2e] dark:text-[#f0f0f5] border border-black/[0.12] dark:border-white/[0.12] hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all"
            >
              contact@stravedatech.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface CareersPageProps {
  onNavigate: (page: string) => void;
}

export default function CareersPage({ onNavigate: _onNavigate }: CareersPageProps) {
  const scrollToRoles = () => {
    document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <HeroSection onViewRoles={scrollToRoles} />
      <WhoWorksHereSection />
      <GrowthSection />
      <HiringProcessSection />
      <ValuesSection />
      <OpenRolesSection />
      <OpenApplicationSection />
      <CTASection />
    </div>
  );
}
