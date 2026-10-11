'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Code2, Palette, Rocket, Compass, Users } from 'lucide-react';
import Link from 'next/link';
import { OPEN_ROLES, OPEN_APPLICATION_SLUG } from './roles';
import HorizontalCarousel from '@/components/features/common/HorizontalCarousel';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease },
};

// Shared typography — matches PageHeader (Services / Insights)
const H2_CLASS = 'font-bold text-black dark:text-white tracking-tight';
const H2_STYLE = {
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  lineHeight: 1.0,
  letterSpacing: '-2px',
} as const;
const EYEBROW = 'text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF4800] mb-5';
const LEAD = 'font-normal text-[16px] leading-[1.75] text-[#6b7280] dark:text-[#9ca3af]';

// ── Data ─────────────────────────────────────────────────────────────────────

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

const MENTORSHIPS = [
  { from: 'Junior Engineer', to: 'Senior Architect', focus: 'learning system design', icon: Code2, color: '#F43F6E' },
  { from: 'Designer', to: 'PM', focus: 'learning product thinking', icon: Palette, color: '#F5C400' },
  { from: 'Mid Level Engineer', to: 'Startup founder', focus: 'learning to lead', icon: Rocket, color: '#14C8B8' },
  { from: 'PM', to: 'Design director', focus: 'learning design systems', icon: Compass, color: '#6D28D9' },
  { from: 'Developer', to: 'Tech Lead', focus: 'learning to lead teams', icon: Users, color: '#FF4800' },
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

// ── Sections ──────────────────────────────────────────────────────────────────

function HeroSection({ onViewRoles }: { onViewRoles: () => void }) {
  return (
    <section className="relative bg-[#F6F1E7] dark:bg-[#0a0a14] overflow-hidden pt-32 md:pt-36 pb-12 md:pb-16">
      <div className="mx-auto w-full max-w-4xl px-5">
        <motion.div {...fadeUp}>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-[1px] w-8 bg-[#FF4800]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">Careers at StravedaTech</span>
          </div>
          <h1 className="font-bold leading-[1.1] tracking-tight mb-6 text-black dark:text-white max-w-3xl" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.25rem)' }}>
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
    <section className="px-5 bg-[#F6F1E7] dark:bg-[#0a0a14] pt-32 md:pt-36 pb-12 md:pb-16">
      <div className="max-w-[1320px] mx-auto">
        <motion.div {...fadeUp} className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800] mb-4">Who We Are</p>
          <h2 className="font-bold leading-[1.1] tracking-tight text-black dark:text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.25rem)' }}>
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
  return (
    <section className="px-5 bg-[#F6F1E7] dark:bg-[#0a0a14] pt-32 md:pt-36 pb-12 md:pb-16">
      <div className="max-w-[1200px] mx-auto">
        {/* Intro */}
        <motion.div {...fadeUp} className="mb-12">
          <h1
            className="font-bold text-black dark:text-white md:whitespace-nowrap"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.1, letterSpacing: '-1.5px' }}
          >
            We Don&apos;t Offer Jobs,{' '}
            <span style={{ color: '#FF4800' }}>We Offer Careers</span>
          </h1>
          <p className={`${LEAD} mt-6 max-w-2xl`}>
            Your growth is our competitive advantage. We invest in you because teams win when people grow.
          </p>
        </motion.div>

        {/* Mentorship */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div {...fadeUp} className="flex flex-col justify-center pr-4">
            <p className={EYEBROW}>Mentorship</p>
            <h2 className={H2_CLASS} style={H2_STYLE}>
              Mentorship Program
            </h2>
            <p className={`${LEAD} mt-5`}>
              Every engineer, designer, and PM gets matched with a mentor based on growth goals, not seniority. Monthly 1 hour sessions.
            </p>
          </motion.div>

          {MENTORSHIPS.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.from + m.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="rounded-2xl bg-white dark:bg-white/[0.04] p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)] border border-black/[0.04] dark:border-white/[0.08]"
              >
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-full text-white"
                  style={{ background: m.color, boxShadow: `0 8px 20px ${m.color}55` }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="text-[20px] font-semibold leading-7 text-[#1a1a2e] dark:text-[#f0f0f5]">
                  {m.from} <span style={{ color: '#FF4800' }}>→</span> {m.to}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-[#6b7280] dark:text-[#9ca3af]">
                  Mentored by a {m.to.toLowerCase()} — {m.focus}.
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HiringProcessSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="px-5 bg-[#F6F1E7] dark:bg-[#0a0a14] py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp} className="mb-10">
          <p className={EYEBROW}>Hiring Process</p>
          <h2 className={H2_CLASS} style={H2_STYLE}>
            No Surprises, Just Clarity
          </h2>
          <p className={`${LEAD} mt-6 max-w-2xl`}>
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
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800] mb-2">What We Assess</p>
                        <p className="font-normal text-[15px] text-[#6b7280] dark:text-[#9ca3af] leading-[1.6]">{s.assesses}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800] mb-2">Format</p>
                        <p className="font-normal text-[15px] text-[#6b7280] dark:text-[#9ca3af] leading-[1.6]">{s.format}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800] mb-2">Expected Timeline</p>
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
    <section className="px-5 bg-[#F6F1E7] dark:bg-[#0a0a14] py-12 md:py-16">
      <div className="max-w-[1320px] mx-auto">
      </div>
    </section>
  );
}

function OpenRolesSection() {
  const [openRole, setOpenRole] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const tracks = ['All', 'Engineering', 'AI & Automation', 'Design'];
  const filtered = filter === 'All' ? OPEN_ROLES : OPEN_ROLES.filter((r) => r.track === filter);

  const pill = 'inline-flex items-center rounded-full px-3 py-1 text-[12px] font-normal border border-black/[0.15] dark:border-white/[0.18] text-[#1a1a2e] dark:text-[#f0f0f5]';

  return (
    <section id="open-roles" className="px-5 bg-[#F6F1E7] dark:bg-[#0a0a14] py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp} className="mb-8">
          <p className={EYEBROW}>Open Roles</p>
          <h2 className={`${H2_CLASS} mb-8`} style={H2_STYLE}>
            Find your place on the team
          </h2>
          <div className="flex gap-2 flex-wrap">
            {tracks.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className="rounded-full px-4 py-1.5 text-[13px] font-normal transition-all"
                style={{
                  background: filter === t ? '#0f172a' : 'transparent',
                  color: filter === t ? '#ffffff' : '#1a1a2e',
                  border: `1px solid ${filter === t ? '#0f172a' : 'rgba(0,0,0,0.18)'}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="border-t border-black/[0.1] dark:border-white/[0.1]">
          {filtered.map((role, i) => {
            const isOpen = openRole === role.title;
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
                className="border-b border-black/[0.1] dark:border-white/[0.1]"
              >
                <div
                  className="flex items-start justify-between gap-6 py-6 cursor-pointer"
                  onClick={() => {
                    setOpenRole(isOpen ? null : role.title);
                  }}
                >
                  <div>
                    <h3 className="text-[20px] font-semibold leading-7 text-[#1a1a2e] dark:text-[#f0f0f5]">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-6 text-[#6b7280] dark:text-[#9ca3af]">
                      {role.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className={pill}>{role.track}</span>
                      <span className={pill}>{role.location}</span>
                      <span className={pill}>{role.type}</span>
                    </div>
                  </div>
                  <Link
                    href={`/careers/apply/${role.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-shrink-0 text-[16px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] whitespace-nowrap hover:underline"
                  >
                    Apply <span style={{ color: '#FF4800' }}>↗</span>
                  </Link>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF4800] mb-3">
                          What you&apos;ll do
                        </p>
                        <ul className="space-y-2.5 mb-5">
                          {role.responsibilities.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af]"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4800]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <Link
                          href={`/careers/apply/${role.slug}`}
                          className="inline-block rounded-full px-5 py-2 text-[13px] font-medium text-white"
                          style={{ background: '#FF4800' }}
                        >
                          Apply for this role →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OpenApplicationSection() {
  return (
    <section className="px-5 bg-[#F6F1E7] dark:bg-[#0a0a14] py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp} className="glass-card rounded-2xl overflow-hidden">
          <div
            className="flex flex-col gap-6 px-10 py-10 md:flex-row md:items-center md:justify-between md:px-14"
            style={{ background: 'linear-gradient(135deg, #FF4800 0%, #cc3900 100%)' }}
          >
            <div>
              <h2
                className="font-bold text-white mb-3"
                style={{ ...H2_STYLE, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
              >
                Don&apos;t see your role?
              </h2>
              <p className="font-normal text-[16px] text-white/80 leading-[1.75] max-w-xl">
                We sometimes create roles for exceptional people. Drop your resume and tell us what you build. We read every application.
              </p>
            </div>
            <Link
              href={`/careers/apply/${OPEN_APPLICATION_SLUG}`}
              className="flex-shrink-0 rounded-full bg-white px-7 py-3 text-[14px] font-medium text-[#1a1a2e] transition-transform hover:scale-[1.03]"
            >
              Send open application <span style={{ color: '#FF4800' }}>→</span>
            </Link>
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
    <div className="bg-[#F6F1E7] dark:bg-[#0a0a14] min-h-screen">
      {/* <HeroSection onViewRoles={scrollToRoles} /> */}
      {/* <WhoWorksHereSection /> */}
      <GrowthSection />
      <OpenRolesSection />
      <OpenApplicationSection />
      <HiringProcessSection />

    </div>
  );
}
