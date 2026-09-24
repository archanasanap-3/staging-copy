'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import HorizontalCarousel from '@/components/features/common/HorizontalCarousel';

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
  title: "Full Stack Engineer",
  track: "Engineering",
  type: "Full-time",
  location: "Remote / Hybrid",
  desc: "Build scalable web applications and internal tools while working closely with product and design teams.",
  responsibilities: [
    "Build scalable web applications and internal tools.",
    "Develop clean and reusable frontend and backend features.",
    "Work with APIs, databases, and modern frameworks.",
    "Collaborate with designers and engineers to deliver quality products.",
    "Debug issues and improve application performance.",
  ],
},
  {
  title: "AI/ML Engineer",
  track: "AI & Automation",
  type: "Full-time",
  location: "Remote / Hybrid",
  desc: "Design and build intelligent solutions using modern AI and machine learning technologies.",
  responsibilities: [
    "Build AI-powered applications and intelligent workflows.",
    "Work with LLMs, APIs, data pipelines, and AI tools.",
    "Develop and test machine learning solutions.",
    "Integrate AI capabilities into real-world business products.",
    "Collaborate with product and engineering teams.",
  ],
},
  {
  title: "Automation Specialist",
  track: "AI & Automation",
  type: "Full-time",
  location: "Remote / Hybrid",
  desc: "Build business automation workflows that reduce repetitive work and improve operational efficiency.",
  responsibilities: [
    "Build and optimize automated business workflows.",
    "Work with tools like n8n, Zapier, and WhatsApp APIs.",
    "Connect different platforms and business systems.",
    "Identify repetitive processes that can be automated.",
    "Monitor and improve automation reliability.",
  ],
},
  {
  title: "Product Designer",
  track: "Design",
  type: "Full-time",
  location: "Remote / Hybrid",
  desc: "Design intuitive digital experiences across web and product platforms.",
  responsibilities: [
    "Design clean and intuitive web and product experiences.",
    "Create wireframes, user flows, and high-fidelity designs.",
    "Work closely with developers and product teams.",
    "Understand user needs and translate them into experiences.",
    "Continuously improve usability and visual consistency.",
  ],
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
  /*
  {
    stage: 'Stage 3',
    title: 'Take Home Project',
    duration: 'Optional',
    timeline: 'Flexible',
    format: 'Real World problem from our work. Build a feature. Fix a design. No weird algorithmic puzzles.',
    assesses: 'How you code/design. Problem solving. Communication about Trade Offs.',
  },
  */
  {
    stage: 'Stage 3',
    title: 'Team Interview',
    duration: '20 min',
    timeline: '3 to 5 days after project submission',
    format: 'Meet 2 to 3 team members (rotating panels). Technical deep dive on your take home. Ask us anything.',
    assesses: 'Fit with team. Communication. How you think about problems.',
  },
  {
    stage: 'Stage 4',
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
const inputCls = "w-full rounded-lg px-4 py-2.5 text-[18px] border border-black/[0.1] dark:border-white/[0.1] bg-white/60 dark:bg-white/[0.04] text-[#1a1a2e] dark:text-[#f0f0f5] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#FF4800]/40 transition";

interface ApplicationForm {
  name: string; email: string; phone: string;
  linkedin: string; portfolio: string; whyJoin: string; resume: string;
}
const EMPTY_FORM: ApplicationForm = { name: '', email: '', phone: '', linkedin: '', portfolio: '', whyJoin: '', resume: '' };

// ── ApplyForm ─────────────────────────────────────────────────────────────────

function ApplyForm({
  roleTitle,
  onClose,
}: {
  roleTitle: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ApplicationForm>({
    ...EMPTY_FORM,
  });

  const [status, setStatus] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set =
    (key: keyof ApplicationForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.resume.trim()) {
      setErrorMsg('Please provide a link to your resume.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const fd = new FormData();

      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('portfolio', form.portfolio || form.linkedin);
      fd.append('message', form.whyJoin);

      // Automatically selected role
      fd.append('position', roleTitle);

      fd.append('formType', 'career');
      fd.append('resume', form.resume);

      const formspreeUrl = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_CAREER_ID}`;

      const res = await fetch(formspreeUrl, {
        method: 'POST',
        body: fd,
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Something went wrong.');
      }

      setStatus('success');
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Failed to submit. Please try again.';

      setStatus('error');
      setErrorMsg(msg);
    }
  };

  if (status === 'success') {
    return (
      <div
        className="px-7 pb-8 pt-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(255,72,0,0.1)' }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF4800"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p className="text-[15px] font-normal text-[#1a1a2e] dark:text-[#f0f0f5] mb-1">
          Application submitted!
        </p>

        <p className="font-normal text-[13px] text-[#6b7280] dark:text-[#9ca3af]">
          We&apos;ll review it and get back to you within 5 business days.
        </p>

        <button
          onClick={onClose}
          className="mt-5 text-[12px] text-[#FF4800] font-medium hover:underline"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
      className="px-7 pb-8 pt-2 border-t border-black/[0.06] dark:border-white/[0.06]"
    >
      <p className="text-[12px] font-normal uppercase tracking-widest text-[#FF4800] mb-5 mt-5">
        Apply — {roleTitle}
      </p>

      {/* AUTO SELECTED ROLE */}
      <div className="mb-4">
        <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
          Position
        </label>

        <input
          value={roleTitle}
          readOnly
          className={
            inputCls +
            ' bg-[#fff7f2] text-[#FF4800] font-medium cursor-default'
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
            Full Name *
          </label>

          <input
            required
            value={form.name}
            onChange={set('name')}
            placeholder="Your name"
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
            Email
          </label>

          <input
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="you@example.com"
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
            Phone *
          </label>

          <input
            required
            value={form.phone}
            onChange={set('phone')}
            placeholder="+91 98000 00000"
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
            LinkedIn URL
          </label>

          <input
            value={form.linkedin}
            onChange={set('linkedin')}
            placeholder="linkedin.com/in/you"
            className={inputCls}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
          Portfolio / GitHub
        </label>

        <input
          value={form.portfolio}
          onChange={set('portfolio')}
          placeholder="github.com/you or yoursite.com"
          className={inputCls}
        />
      </div>

      <div className="mb-3">
        <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
          Why do you want to join Straveda? *
        </label>

        <textarea
          required
          rows={4}
          value={form.whyJoin}
          onChange={set('whyJoin')}
          placeholder="Tell us what excites you about this role..."
          className={inputCls + ' resize-none'}
        />
      </div>

      <div className="mb-5">
        <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">
          Resume Link (Google Drive) *
        </label>

        <input
          required
          type="url"
          value={form.resume}
          onChange={set('resume')}
          placeholder="Google Drive link (Make sure it is public)"
          className={inputCls}
        />
      </div>

      {errorMsg && (
        <p className="font-normal text-[12px] text-red-500 mb-3">
          {errorMsg}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg px-6 py-2.5 text-[13px] font-medium text-white transition-all duration-200 disabled:opacity-60"
          style={{ background: '#FF4800' }}
          onMouseEnter={(e) => {
            if (status !== 'loading') {
              e.currentTarget.style.background = '#e03e00';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FF4800';
          }}
        >
          {status === 'loading'
            ? 'Submitting…'
            : 'Submit Application →'}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="text-[12px] text-[#9ca3af] hover:text-[#6b7280] transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────────

function HeroSection({ onViewRoles }: { onViewRoles: () => void }) {
  return (
<section className="relative bg-white dark:bg-[#0a0a14] px-6 pt-32 pb-8 overflow-hidden">    
    <div className="mx-auto w-full max-w-4xl px-6">
        <motion.div {...fadeUp}>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-[1px] w-8 bg-[#FF4800]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#FF4800]">Careers at StravedaTech</span>
          </div>
          <h1 className="font-normal leading-[1.1] tracking-[-2.05px] mb-6 text-[#24213F] dark:text-[#f0f0f5] max-w-3xl" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.25rem)' }}>
            Build the systems that eliminate busywork<br />
            <span style={{ color: '#FF4800' }}>for mid-market teams.</span>
          </h1>
          <p className="font-normal text-base leading-7 text-[#6b7280] dark:text-[#9ca3af] max-w-2xl mb-10">
            We solve operational problems by removing what&apos;s unnecessary before building anything new. You&apos;ll create AI systems, software, and experiences that deliver measurable outcomes not just output.
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
          <p className="font-normal text-[15px] leading-[1.8] text-[#1a1a2e] dark:text-[#f0f0f5] mb-5">
            &ldquo;I came to StravedaTech to solve problems, and that&apos;s exactly what we do every day. Last quarter, I led a project that cut our client&apos;s manual operations by 50% in 6 weeks. That&apos;s the impact we deliver.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-semibold" style={{ background: '#FF4800' }}>S</div>
            <div>
              <p className="text-[13px] font-normal text-[#1a1a2e] dark:text-[#f0f0f5]">StravedaTech Team Member</p>
              <p className="font-normal text-[11px] text-[#6b7280] dark:text-[#9ca3af]">Automation Engineer</p>
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
    <section className="pt-32 pb-20 px-6 bg-white dark:bg-[#0d0d1a]">
      <div className="max-w-[1320px] mx-auto">
        <motion.div {...fadeUp} className="mb-12">
          <p className="text-[12px] font-normal uppercase tracking-[0.25em] text-[#FF4800] mb-4">Who We Are</p>
          <h2 className="font-normal leading-[1.1] tracking-[-2.05px] text-[#202039] dark:text-[#f0f0f5] mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.25rem)' }}>
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
              <p className="text-[32px] font-normal tracking-[-1px] mb-1" style={{ color: '#FF4800' }}>{s.value}</p>
              <p className="font-normal text-[12px] text-[#6b7280] dark:text-[#9ca3af]">{s.label}</p>
            </motion.div>
          ))}
        </HorizontalCarousel>

        <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {traits.map((t) => (
            <div key={t} className="flex items-start gap-3 glass-card rounded-xl px-5 py-4">
              <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#FF4800' }} />
              <p className="font-normal text-[14px] text-[#6b7280] dark:text-[#9ca3af] leading-[1.6]">{t}</p>
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
    <section className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
       <motion.div {...fadeUp} className="mb-14">
  <span className="mb-6 inline-block  px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FF4800]">
    Growth & Learning
  </span>

   <h2
            className="font-normal heading-gradient mx-auto"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-1.5px', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
          We Don&apos;t Offer Jobs  We Offer Careers          
 </h2>

    <p className="font-normal mt-4 text-[19px] leading-7 text-[#6b7280] dark:text-[#9ca3af]  text-left">
  Your growth is our competitive advantage. We invest in you because teams win when people grow.
          </p>

</motion.div>

       {/* Certification Pathways */}
<motion.div {...fadeUp} className="mb-14">

  <h3
    className="font-normal heading-gradient"
   style={{
  fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
  lineHeight: 1.05,
  letterSpacing: '-1.5px',
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
}}
  >
    Certification Pathway
  </h3>

  <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-4">

    {CERTIFICATIONS.map((c, i) => (
      <motion.div
        key={c.area}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: i * 0.08,
          ease,
        }}
        className="h-full"
      >
        <p
          className="mb-4 text-[15px] font-normal uppercase tracking-[0.25em]"
          style={{ color: '#FF4800' }}
        >
          {c.area}
        </p>

        <ul className="space-y-2">
          {c.certs.map((cert) => (
           <li
  key={cert}
  className="flex items-center gap-2 text-[18px] font-normal text-[#4b5563] dark:text-[#9ca3af] leading-7"
>
              <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#6b7280]" />
              {cert}
            </li>
          ))}
        </ul>
      </motion.div>
    ))}

  </div>

</motion.div>

       {/* Mentorship */}
<motion.div {...fadeUp} className="mb-14">

  <h3
    className="font-normal heading-gradient"
    style={{
  fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
  lineHeight: 1.05,
  letterSpacing: '-1.5px',
}}
  >
    Mentorship Program
  </h3>

  <p className="mt-6 text-[19px] leading-7 text-[#64748b]">
    Every engineer, designer, and PM gets matched with a mentor based on
    growth goals, not seniority. Monthly 1 hour sessions.
  </p>

  <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

    {MENTORSHIPS.map((m, i) => (
      <motion.div
        key={m.from + m.to}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: i * 0.08,
          ease,
        }}
      >
       <p className="mt-5 text-[20px] font-normal text-[#4b5563] dark:text-[#f0f0f5] leading-6">
  {m.from} → {m.to}
</p>

<p className="mt-2 text-[20px] font-normal text-[#6b7280] dark:text-[#9ca3af] leading-6">
  {m.focus}
</p>
      </motion.div>
    ))}

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
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp} className="mb-12">
          <p className="text-[12px] fon t-normal uppercase tracking-[0.25em] text-[#FF4800] mb-4">Hiring Process</p>
          <h2 className="font-normal leading-[1.1] tracking-[-2.05px] text-[#202039] dark:text-[#f0f0f5] mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.25rem)' }}>
            No Surprises Just Clarity
          </h2>
          <p className="font-normal text-[15px] leading-7 text-[#667085] dark:text-[#9ca3af] max-w-lg">
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
                        <p className="text-[10px] font-normal uppercase tracking-widest text-[#FF4800] mb-2">What We Assess</p>
                        <p className="font-normal text-[15px] text-[#6b7280] dark:text-[#9ca3af] leading-[1.6]">{s.assesses}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-normal uppercase tracking-widest text-[#FF4800] mb-2">Format</p>
                        <p className="font-normal text-[15px] text-[#6b7280] dark:text-[#9ca3af] leading-[1.6]">{s.format}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-normal uppercase tracking-widest text-[#FF4800] mb-2">Expected Timeline</p>
                        <p className="font-normal text-[15px] text-[#6b7280] dark:text-[#9ca3af] leading-[1.6]">{s.timeline}</p>
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
      <div className="max-w-[1320px] mx-auto">
      </div>
    </section>
  );
}

function OpenRolesSection() {
  const [openRole, setOpenRole] = useState<string | null>(null);
  const [applyingRole, setApplyingRole] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const tracks = ['All', 'Engineering', 'AI & Automation', 'Design'];
  const filtered = filter === 'All' ? OPEN_ROLES : OPEN_ROLES.filter((r) => r.track === filter);

  return (
    <section id="open-roles" className="py-20 px-6 bg-white dark:bg-[#0d0d1a]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp} className="mb-10">
          <p className="text-[12px] font-normal uppercase tracking-[0.25em] text-[#FF4800] mb-4">Open Roles</p>
          <h2 className="font-normal leading-[1.1] tracking-[-2.05px] text-[#1a1a2e] dark:text-[#f0f0f5] mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.25rem)' }}>
            Find your place on the team.
          </h2>
          <div className="flex gap-2 flex-wrap">
            {tracks.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className="px-4 py-2 rounded-lg text-[15px] font-medium transition-all"
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

        <div className="columns-1 md:columns-2 gap-4">
          {filtered.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              className="glass-card rounded-xl overflow-hidden mb-4 break-inside-avoid"
            >
              <div
                className="px-7 py-6 cursor-pointer"
onClick={() => {
  setOpenRole(openRole === role.title ? null : role.title);
  setApplyingRole(null);
}}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-[15px] font-semibold uppercase tracking-[0.12em] px-2 py-1 rounded" style={{ background: 'rgba(255,72,0,0.1)', color: '#FF4800' }}>{role.track}</span>
                      <span className="text-[15px] text-[#6b7280] dark:text-[#9ca3af]">{role.type}</span>
                      <span className="text-[15px] text-[#6b7280] dark:text-[#9ca3af]">· {role.location}</span>
                    </div>
                    <h3 className="text-[18px] font-normal text-[#1a1a2e] dark:text-[#f0f0f5] mb-2">
  {role.title}
</h3>

<div className="flex gap-2 flex-wrap">
  {("tags" in role && Array.isArray(role.tags)
    ? role.tags
    : []
  ).map((tag) => (
    <span
      key={tag}
      className="text-[11px] px-2 py-1 rounded bg-black/[0.04] dark:bg-white/[0.05] text-[#6b7280] dark:text-[#9ca3af]"
    >
      {tag}
    </span>
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
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      className="overflow-hidden"
    >
      <div className="border-t border-black/[0.06] dark:border-white/[0.06]">

        {/* ROLE DESCRIPTION */}
        <div className="px-7 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF4800] mb-3">
  What you&apos;ll do
</p>

<ul className="space-y-2.5 mb-6">
  {role.responsibilities.map((item) => (
    <li
      key={item}
      className="flex items-start gap-3 text-[13px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af]"
    >
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4800]" />
      <span>{item}</span>
    </li>
  ))}
</ul>

          {/* APPLY BUTTON */}
          {applyingRole !== role.title && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setApplyingRole(role.title);
              }}
              className="text-[12px] font-semibold text-[#FF4800] hover:underline"
            >
              Apply for this role ↓
            </button>
          )}
        </div>

        {/* FORM */}
        <AnimatePresence>
          {applyingRole === role.title && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden"
            >
              <ApplyForm
                roleTitle={role.title}
                onClose={() => setApplyingRole(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>

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
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    whatYouBuild: '',
  });

  const [resume, setResume] = useState('');
  const [resumeError, setResumeError] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
      setForm((f) => ({
        ...f,
        [key]: e.target.value,
      }));

  // Resume file validation
  const handleResumeFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    setResumeError('');
    setResumeFile(null);

    if (!file) return;

    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (!extension || !allowedExtensions.includes(extension)) {
      setResumeError(
        'Only PDF, DOC, and DOCX files are allowed.'
      );
      e.target.value = '';
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setResumeError(
        'Resume file must be less than 5 MB.'
      );
      e.target.value = '';
      return;
    }

    setResumeFile(file);

    // Clear Google Drive link when file is selected
    setResume('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // At least one resume option is required
    if (!resume.trim() && !resumeFile) {
      setErrorMsg(
        'Please provide a Google Drive resume link or upload your resume.'
      );
      return;
    }

    if (resumeError) {
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const fd = new FormData();

      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('message', form.whatYouBuild);
      fd.append('position', 'Open Application');
      fd.append('formType', 'career');

      // Google Drive resume
      if (resume.trim()) {
        fd.append('resume', resume);
      }

      // Uploaded resume file
      if (resumeFile) {
        fd.append('resume_file', resumeFile);
      }

      const formspreeUrl = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_CAREER_ID}`;

      const res = await fetch(formspreeUrl, {
        method: 'POST',
        body: fd,
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ?? 'Something went wrong.'
        );
      }

      setStatus('success');
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Failed to submit. Please try again.';

      setStatus('error');
      setErrorMsg(msg);
    }
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          {...fadeUp}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div
            className="px-10 py-8 md:px-14"
            style={{
              background:
                'linear-gradient(135deg, #FF4800 0%, #cc3900 100%)',
            }}
          >
            <h2
              className="font-normal text-white mb-2 tracking-[-2.05px]"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                lineHeight: 1.1,
              }}
            >
              Don&apos;t see your role?
            </h2>

            <p className="font-normal text-[15px] text-white/80 leading-[1.7]">
              We sometimes create roles for exceptional people.
              Drop your resume and tell us what you build we read
              every application.
            </p>
          </div>

          <div className="px-10 py-8 md:px-14">
            {status === 'success' ? (
              <div className="text-center py-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'rgba(255,72,0,0.1)',
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF4800"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <p className="text-[15px] font-normal text-[#1a1a2e] dark:text-[#f0f0f5] mb-1">
                  We&apos;ve got your application!
                </p>

                <p className="font-normal text-[15px] text-[#6b7280] dark:text-[#9ca3af]">
                  If there&apos;s a fit, you&apos;ll hear from us directly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[15px] font-semibold text-[#6b7280] mb-1">
                      Full Name *
                    </label>

                    <input
                      required
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Your name"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-[15px] font-semibold text-[#6b7280] mb-1">
                      Email
                    </label>

                    <input
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="you@example.com"
                      className={inputCls}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[15px] font-semibold text-[#6b7280] mb-1">
                      Phone *
                    </label>

                    <input
                      required
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="+91 98000 00000"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[15px] font-semibold text-[#6b7280] mb-1">
                    What do you build & why Straveda? *
                  </label>

                  <textarea
                    required
                    rows={4}
                    value={form.whatYouBuild}
                    onChange={set('whatYouBuild')}
                    placeholder="Tell us about yourself, your skills, and what excites you about working with us..."
                    className={inputCls + ' resize-none'}
                  />
                </div>

                {/* RESUME */}
                <div className="mb-5">
                  <label className="block text-[15px] font-semibold text-[#6b7280] mb-1">
                    Resume *
                  </label>

                  {/* Google Drive Link */}
                  <input
                    type="url"
                    value={resume}
                    onChange={(e) => {
                      setResume(e.target.value);
                      setResumeFile(null);
                      setResumeError('');
                      setErrorMsg('');
                    }}
                    placeholder="Google Drive resume link"
                    className={inputCls}
                  />

                  <p className="mt-2 text-[11px] text-[#9ca3af]">
                    OR upload your resume
                  </p>

                  {/* PDF / DOC / DOCX */}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeFileChange}
                    className="mt-2 block w-full text-[12px] text-[#6b7280]
                      file:mr-3 file:rounded-lg file:border-0
                      file:bg-[#fff7f2] file:px-4 file:py-2
                      file:text-[12px] file:font-medium
                      file:text-[#FF4800]
                      hover:file:bg-[#fff0e8]"
                  />

                  {resumeFile && (
                    <p className="mt-2 text-[12px] text-[#6b7280]">
                      Selected: {resumeFile.name}
                    </p>
                  )}

                  {resumeError && (
                    <p className="mt-2 text-[12px] text-red-500">
                      {resumeError}
                    </p>
                  )}

                  <p className="mt-1 text-[11px] text-[#9ca3af]">
                    Accepted formats: PDF, DOC, DOCX • Max size: 5 MB
                  </p>
                </div>

                {errorMsg && (
                  <p className="font-normal text-[12px] text-red-500 mb-3">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="rounded-lg px-7 py-3 text-[13px] font-medium text-white transition-all duration-200 disabled:opacity-60"
                  style={{ background: '#FF4800' }}
                  onMouseEnter={(e) => {
                    if (status !== 'loading') {
                      e.currentTarget.style.background = '#e03e00';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FF4800';
                  }}
                >
                  {status === 'loading'
                    ? 'Submitting…'
                    : 'Send Open Application →'}
                </button>
              </form>
            )}
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
    <div className="font-[Inter] bg-white inm-h-screen">
      {/* <HeroSection onViewRoles={scrollToRoles} /> */}
      {/* <WhoWorksHereSection /> */}
      <GrowthSection />
      <OpenRolesSection />
      <OpenApplicationSection />
      <HiringProcessSection />
      
    </div>
  );
}
