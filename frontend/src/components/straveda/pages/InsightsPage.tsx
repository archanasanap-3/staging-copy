'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, X, User, Clock } from 'lucide-react';
import { toast } from 'sonner';
import PageHeader from '@/components/straveda/PageHeader';
import HorizontalCarousel from '@/components/straveda/HorizontalCarousel';

const categories = ['All', 'Automation', 'Custom Software', 'AI Strategy', 'Systems', 'Web Development'] as const;
type FilterCategory = (typeof categories)[number];

const featuredTopics = ['All', 'Automation', 'Custom Software', 'AI Strategy', 'Systems', 'Web Development'] as const;

const featuredPost = {
  category: 'AUTOMATION',
  filterCategory: 'Automation' as FilterCategory,
  title: 'The Manual Work Audit: How to Find 40% of Your Team\'s Time',
  date: 'March 2025',
  excerpt:
    'Most growing companies don\'t know where their team\'s time actually goes. We\'ve audited 50+ businesses and found the same pattern: 40–50% of work is repetitive, manual, and eliminable. Here\'s how to find yours.',
  readTime: '8 min read',
  author: { name: 'Straveda Team', title: 'AI Automation & Custom Software' },
  fullContent: [
    'Most growing companies don\'t know where their team\'s time actually goes. You hire smart people to drive growth. Instead, they spend 40% of their time on work that could be automated, doesn\'t require human judgment, repeats the same way every time, and kills their momentum.',
    'Manual work is invisible. It lives in spreadsheets that sync data between tools, email follow up sequences that someone sends manually, data entry that could be automated, status meetings that could be a dashboard, and approvals that ping pong between people. None of it shows up as a discrete "job." So it gets ignored.',
    'Step 1: Do a Time Audit (30 min). Ask your top 3 people: "Walk me through your day. Where does your time go?" You\'ll hear: "I spend 2 hours a day manually qualifying leads", "I copy data from our order system into accounting every afternoon", "I send the same check in email to inactive customers." Write it all down.',
    'Step 2: Calculate the Cost. If your top person spends 2 hours/day on manual qualifying: 2 hours × 20 working days = 40 hours/month. 40 hours × ₹500/hour = ₹20,000/month in lost capacity. ₹20,000 × 12 = ₹2.4L/year. That\'s just one person, one process. Most companies have 3–5 of these.',
    'If you automate just your top 3 time wasters, you reclaim 80–120 hours/month. That\'s 2–3 full-time people\'s worth of capacity. No hiring needed. Costs ₹5L–₹15L to build. Pays for itself in months. Book a strategy call and we\'ll run this audit with you in 30 minutes.',
  ],
};

const posts = [
  {
    category: 'CUSTOM SOFTWARE',
    filterCategory: 'Custom Software' as FilterCategory,
    title: 'Custom CRM vs. Salesforce: When Off the Shelf Doesn\'t Fit',
    date: 'March 2025',
    excerpt:
      'Salesforce works great until it doesn\'t. Here\'s how to decide when a custom CRM actually saves you money.',
    readTime: '5 min read',
    author: { name: 'Dhiraj Harshe', title: 'Founder, Straveda Tech' },
    fullContent: [
      'Most businesses start with Salesforce or HubSpot because they\'re fast to set up and everyone knows them. That\'s a legitimate reason. But after 12-18 months, a pattern emerges: your team spends more time working around the CRM than inside it. Custom fields that don\'t quite fit. Automations that need 3 Zapier steps to do something that should be one click. Licensing costs that climb as your team grows.',
      'A custom CRM built for your specific sales process isn\'t a luxury  it\'s often cheaper over a 3 year horizon. When you own the code, you pay for hosting (a few hundred dollars a month) instead of per seat licenses. When your process changes, you change the software in days, not months of Salesforce consultant time.',
      'The decision comes down to three questions: Does your sales or operations process have more than 5 custom stages or non standard workflows? Do you pay more than ₹2L/month in SaaS licenses across your CRM and adjacent tools? Are you losing data fidelity because your CRM can\'t model your actual business? If the answer to two of three is yes, it\'s time to run the numbers on a custom build.',
      'At Straveda, we\'ve built CRMs that replace Salesforce for businesses at 20 to 200 person scale. The typical project runs 6 to 10 weeks and pays for itself within 18 months on licensing savings alone before you count the productivity gains from software that actually fits.',
    ],
  },
  {
    category: 'AI STRATEGY',
    filterCategory: 'AI Strategy' as FilterCategory,
    title: 'AI for Your Business: The ROI First Framework',
    date: 'February 2025',
    excerpt:
      'Most AI projects fail not because the technology doesn\'t work, but because nobody defined what "working" means.',
    readTime: '6 min read',
    author: { name: 'Radhika Tak', title: 'Founder, Straveda Tech' },
    fullContent: [
      'AI implementation fails in a predictable way: leadership sees a demo, gets excited, approves a pilot, and 6 months later the team is still "experimenting." No production traffic. No metrics. No clear owner. The technology worked fine — the project management didn\'t.',
      'The ROI First Framework flips the sequence. Before writing a line of code, you answer three questions: What specific human decision or action is this AI replacing or augmenting? What\'s the cost of that decision today in time, money, or errors? What does success look like in the first 30 days of production use? If you can\'t answer all three, the project isn\'t ready to start.',
      'The highest-ROI AI applications we see in small and mid-market businesses are not the glamorous ones. They\'re customer support triage that routes 60% of tickets without human review. Lead qualification that scores inbound inquiries before a salesperson picks them up. Document processing that turns a 20-minute manual task into a 30-second automated one. Unglamorous, measurable, and compounding.',
      'Our standard engagement starts with a 2-hour audit of your current operations to find the highest leverage AI insertion points. Most businesses have 3-5 automation opportunities that pay for the entire engagement within 90 days. We build those first, then expand based on what the data shows.',
    ],
  },
  {
    category: 'AUTOMATION',
    filterCategory: 'Automation' as FilterCategory,
    title: 'Why Your Next Product Should Be Built for Speed, Not Perfection',
    date: 'January 2025',
    excerpt:
      'The companies winning right now ship in weeks, not quarters. Here\'s the operational system behind that.',
    readTime: '5 min read',
    author: { name: 'Radhika Tak', title: 'Founder, Straveda Tech' },
    fullContent: [
      'There\'s a myth that quality and speed are in tension. They\'re not — but "perfection" and speed are. Perfection is a moving target defined by hypothetical future users. Quality is a baseline defined by your actual users today. The companies that ship fast have learned to build for quality without chasing perfection.',
      'The operational system behind fast shipping has a few non negotiable components: a strict scope boundary (what is and is not in v1), automated testing that catches regressions without slowing deploys, and a weekly ship cadence that forces prioritization decisions. When you commit to shipping every week, you can\'t let perfect be the enemy of shipped.',
      'At Straveda, our standard engagement includes a deployment pipeline from day one. By week 2, something is in production — even if it\'s just a staging environment with the core data model. By week 4, real users are touching real software. This isn\'t recklessness; it\'s feedback compression. Every week you\'re not in production is a week you\'re building on assumptions.',
      'The automation layer is what makes this sustainable. Automated tests, automated deployments, automated monitoring — these aren\'t nice to haves for a fast team, they\'re the infrastructure that allows speed without chaos. Without them, fast shipping becomes fast breaking. With them, your team spends time building features, not firefighting.',
    ],
  },
  {
    category: 'SYSTEMS',
    filterCategory: 'Systems' as FilterCategory,
    title: 'The Data Silo Problem: How to Build One Source of Truth',
    date: 'December 2024',
    excerpt:
      'Your CRM says one thing, your spreadsheet says another, your ops team has a third number. Here\'s how to fix it.',
    readTime: '6 min read',
    author: { name: 'Radhika Tak', title: 'Founder, Straveda Tech' },
    fullContent: [
      'Data silos aren\'t a storage problem — they\'re a trust problem. When the same metric shows different numbers in different systems, your team stops trusting any of them and falls back on gut feel and tribal knowledge. The result is decisions made on the loudest voice in the room, not the best data.',
      'The root cause is usually fragmented tooling accumulated over time: a CRM for sales, a separate project management tool for delivery, spreadsheets for finance, WhatsApp threads for customer communication. Each tool has its own data model, its own export format, its own definition of "customer" or "deal" or "revenue." Reconciling them manually is a part-time job for someone on your team.',
      'Building one source of truth doesn\'t mean replacing all your tools — it means creating a central data layer that pulls from each tool and enforces a single definition for shared concepts. A PostgreSQL database with automated sync jobs, a simple dashboard showing the metrics that matter, and a clear ownership model for data quality. This is a 4-6 week build, not a multi year ERP implementation.',
      'The businesses we\'ve helped with this problem typically see two immediate benefits: their weekly reporting goes from 3 hours of manual consolidation to a 10-minute dashboard review, and their cross-functional meetings stop being arguments about whose numbers are right. When everyone trusts the same data, the conversation shifts from "what is the number" to "what do we do about it."',
    ],
  },
  {
    category: 'WEB DEVELOPMENT',
    filterCategory: 'Web Development' as FilterCategory,
    title: 'Why Your Website Is Costing You Leads',
    date: 'November 2024',
    excerpt:
      'Most business websites are digital brochures. Here\'s what a lead generating website actually looks like.',
    readTime: '5 min read',
    author: { name: 'Radhika Tak', title: 'Founder, Straveda Tech' },
    fullContent: [
      'If your website\'s primary job is to "look professional," you\'ve already lost. Visitors don\'t come to your website to be impressed — they come because they have a problem and they\'re wondering if you can solve it. A website that leads with your company history, your team headshots, and your "values" is answering questions nobody asked.',
      'A lead generating website is organized around the visitor\'s decision journey, not your organizational chart. The first thing they see answers: what do you do, for whom, and what happens next? Every page has a clear next action. The contact form asks for the minimum information needed to have a useful conversation not a 12 field qualification quiz.',
      'Page speed is not optional. For every second of load time above 2 seconds, conversion rates drop measurably. On mobile, where over 60% of business website traffic now originates, a slow or poorly formatted page is an immediate exit. Next.js with server side rendering, optimized images, and edge deployment typically cuts load times by 40-60% versus a typical WordPress or Webflow site.',
      'The websites we build are designed to convert, not just impress. We start with conversion goals contact form submissions, WhatsApp messages, discovery call bookings  and build backwards from there. Analytics are configured from day one so you know which pages are working and which are leaking visitors. Most of our clients see a meaningful increase in qualified inquiries within the first 60 days, without changing their traffic sources.',
    ],
  },
];

const ease = [0.4, 0, 0.2, 1] as const;

function BlogPostModal({
  post,
  onClose,
}: {
  post: typeof featuredPost | (typeof posts)[number];
  onClose: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Also listen for global 'close-all' custom event from keyboard nav
    const handleCloseAll = () => onClose();
    window.addEventListener('close-all', handleCloseAll);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('close-all', handleCloseAll);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, onClose]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0a0a14] border border-[#e5e7eb] dark:border-white/[0.08] shadow-xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#f8f8fc] dark:bg-white/[0.08] border border-[#e5e7eb] dark:border-white/[0.08] text-[#6b7280] dark:text-[#d1d5db] hover:text-[#1a1a2e] dark:hover:text-[#f0f0f5] hover:bg-[#f0f0f4] dark:hover:bg-white/[0.12] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-12">
          {/* Category badge */}
          <span className="inline-block text-[10px] uppercase tracking-[0.15em] font-medium text-[#FF4800] bg-[#FF4800]/10 px-3 py-1 rounded-full mb-6">
            {post.category}
          </span>

          {/* Title */}
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] leading-tight mb-6">
            {post.title}
          </h2>

          {/* Author + date + read time */}
          <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#6b7280] dark:text-[#d1d5db] mb-8">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span className="text-[#1a1a2e] dark:text-[#f0f0f5] font-medium">{post.author.name}</span>
              <span className="text-[#9ca3af]">— {post.author.title}</span>
            </span>
            <span className="text-[#9ca3af]">|</span>
            <span>{post.date}</span>
            <span className="text-[#9ca3af]">|</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Decorative gradient divider */}
          <div className="h-[2px] w-full bg-gradient-to-r from-[#FF4800] via-[#ff6b33] to-transparent mb-8" />

          {/* Full content paragraphs */}
          <div className="space-y-6">
            {post.fullContent.map((paragraph, i) => (
              <p
                key={i}
                className="text-[15px] sm:text-[16px] leading-[1.8] text-[#4b5563] dark:text-[#d1d5db]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Back to all articles */}
          <div className="mt-10 pt-8 border-t border-[#e5e7eb] dark:border-white/[0.08]">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-[#6b7280] dark:text-[#d1d5db] hover:text-[#FF4800] text-sm font-medium transition-colors"
            >
              <span className="inline-flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                Back to all articles
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function InsightsPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [activeTopic, setActiveTopic] = useState<string>('All');
  const filteredPosts = useMemo(() => {
    const topic = activeTopic === 'All' ? 'All' : activeTopic;
    if (topic === 'All') return posts;
    return posts.filter((p) => p.filterCategory === topic);
  }, [activeTopic]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    // Mocking the API response for static site
    setTimeout(() => {
      toast.success('Subscribed! (Static Mode)');
      setEmail('');
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="bg-white dark:bg-[#0a0a14] min-h-screen">
      {/* HERO */}
      <section className="relative bg-white dark:bg-[#0a0a14] px-6 pt-32 pb-20 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <PageHeader
            eyebrow="Insights & Perspectives"
            title="Enterprise thinking for modern organizations."
            subtitle="Strategy, architecture, and management insights from the Straveda team."
          />
        </div>
      </section>

      {/* FEATURED TOPICS — Horizontal Scrollable Tag Row */}
      <section className="px-6 pt-6 pb-2 bg-white dark:bg-[#0a0a14]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease }}
          >
            <div
              className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin"
              style={{ scrollbarWidth: 'thin' }}
            >
              {featuredTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setActiveTopic(topic)}
                  className={`flex-shrink-0 rounded-full px-5 py-2.5 text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTopic === topic
                      ? 'bg-[#FF4800] text-white shadow-sm'
                      : 'bg-[#f8f8fc] dark:bg-white/[0.06] text-[#6b7280] dark:text-[#d1d5db] hover:bg-[#FF4800] hover:text-white border border-transparent'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="px-6 py-16 md:py-24 bg-[#f8f8fc] dark:bg-[#0a0a14]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="glass-card rounded-xl overflow-hidden cursor-pointer group hover:shadow-md transition-shadow"
            onClick={() => setSelectedPost(-1)}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Featured visual */}
              <div className="lg:w-[60%] w-full">
                <div className="relative w-full aspect-video lg:aspect-[16/9] overflow-hidden" style={{ background: 'linear-gradient(135deg, #0e0c1c 0%, #1a1535 60%, #0e0c1c 100%)' }}>
                  {/* Dot grid */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                  {/* Orange glow */}
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,72,0,0.18) 0%, transparent 70%)' }} />
                  {/* Architecture node diagram */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 270" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    {/* Connector lines */}
                    <line x1="240" y1="60" x2="120" y2="135" stroke="rgba(255,72,0,0.35)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="240" y1="60" x2="360" y2="135" stroke="rgba(255,72,0,0.35)" strokeWidth="1" strokeDasharray="4 3" />
                    <line x1="120" y1="135" x2="80" y2="210" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 4" />
                    <line x1="120" y1="135" x2="180" y2="210" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 4" />
                    <line x1="360" y1="135" x2="300" y2="210" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 4" />
                    <line x1="360" y1="135" x2="400" y2="210" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 4" />
                    {/* Root node */}
                    <rect x="210" y="38" width="60" height="28" rx="6" fill="rgba(255,72,0,0.15)" stroke="#FF4800" strokeWidth="1.2" />
                    <text x="240" y="56" textAnchor="middle" fill="#FF4800" fontSize="9" fontFamily="monospace" fontWeight="600">CORE API</text>
                    {/* Mid nodes */}
                    <rect x="88" y="120" width="64" height="28" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <text x="120" y="138" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="monospace">Services</text>
                    <rect x="328" y="120" width="64" height="28" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <text x="360" y="138" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="monospace">Gateway</text>
                    {/* Leaf nodes */}
                    {[48, 148, 268, 368].map((x, i) => (
                      <g key={i}>
                        <rect x={x} y="197" width="64" height="24" rx="5" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
                        <text x={x + 32} y="212" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">{['Auth', 'Cache', 'Queue', 'Store'][i]}</text>
                      </g>
                    ))}
                    {/* Pulse circle on root */}
                    <circle cx="240" cy="52" r="28" stroke="rgba(255,72,0,0.2)" strokeWidth="1" fill="none">
                      <animate attributeName="r" values="26;34;26" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                  {/* Label */}
                  <div className="absolute bottom-4 left-5">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(255,72,0,0.7)' }}>Enterprise Architecture</span>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="lg:w-[40%] w-full p-8 lg:p-10 flex flex-col justify-center">
                <span className="inline-block text-[11px] uppercase tracking-[0.15em] font-medium text-[#FF4800] bg-[#FF4800]/10 px-3 py-1 rounded-full w-fit mb-5">
                  Enterprise Architecture
                </span>
                <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-medium text-[#1a1a2e] dark:text-[#f0f0f5] leading-snug mb-4">
                  The Case for Open Standards in Modern Enterprise Architecture
                </h2>
                <p className="text-[#9ca3af] text-[13px] mb-4">March 2024</p>
                <p className="text-[#6b7280] dark:text-[#d1d5db] text-[15px] leading-relaxed mb-8">
                  Why forward-thinking enterprises are choosing
                  open standards middleware over proprietary lock in, and what
                  this means for your technology roadmap.
                </p>
                <span className="inline-flex items-center gap-2 text-[#1a1a2e] dark:text-[#f0f0f5] border border-[#e5e7eb] dark:border-white/[0.1] rounded-lg px-5 py-2.5 text-sm font-medium group-hover:bg-[#f8f8fc] dark:group-hover:bg-white/[0.06] transition-colors w-fit">
                  Read article
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* POST GRID WITH CATEGORY FILTER */}
      <section className="px-6 py-16 md:py-24 bg-white dark:bg-[#0a0a14]">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter Bar */}
          <div className="section-glow-top mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, ease }}
            >
              {/* Category pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setActiveCategory(category); setActiveTopic(category); }}
                    className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                      activeCategory === category
                        ? 'bg-[#FF4800] text-white'
                        : 'bg-transparent border border-[#e5e7eb] dark:border-white/[0.1] text-[#6b7280] dark:text-[#d1d5db] hover:border-[#FF4800]/40 hover:text-[#1a1a2e] dark:hover:text-[#f0f0f5]'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              {/* Count indicator */}
              <p className="text-[13px] text-[#9ca3af]">
                Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              </p>
            </motion.div>
          </div>

          {/* Post grid — HorizontalCarousel on mobile, 3-col grid on desktop */}
          <HorizontalCarousel cols={3} size="md" showHint={true}>
            {filteredPosts.map((post, index) => {
              const originalIndex = posts.indexOf(post);
              return (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease }}
                  className="glass-card rounded-xl p-6 sm:p-8 hover:border-[#FF4800]/20 transition-all duration-300 cursor-pointer group hover:shadow-md active:scale-[0.98] min-h-[300px] flex flex-col h-full"
                  onClick={() => setSelectedPost(originalIndex)}
                >
                  <span className="inline-block text-[10px] uppercase tracking-[0.15em] font-medium text-[#FF4800] bg-[#FF4800]/10 px-2.5 py-1 rounded-full mb-4 w-fit">
                    {post.category}
                  </span>
                  <h3 className="text-[17px] sm:text-[19px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] leading-snug mb-2 tracking-tight">
                    {post.title}
                  </h3>
                  <p className="text-[#9ca3af] text-[12px] mb-3">{post.date} · {post.readTime}</p>
                  <p className="text-[#6b7280] dark:text-[#d1d5db] text-[13px] sm:text-[14px] leading-relaxed mb-5 flex-1">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[#6b7280] dark:text-[#d1d5db] text-[12px] sm:text-sm font-medium group-hover:text-[#FF4800] transition-colors">
                    Read article
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.article>
              );
            })}
          </HorizontalCarousel>
        </div>
      </section>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost !== null && (
          <BlogPostModal
            post={selectedPost === -1 ? featuredPost : posts[selectedPost]}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>

      {/* NEWSLETTER CTA */}
      <section className="px-6 py-16 md:py-24 bg-[#f8f8fc] dark:bg-[#0a0a14]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="bg-white dark:bg-white/[0.04] rounded-xl py-16 px-6 md:px-12 text-center border border-[#e5e7eb] dark:border-white/[0.08] shadow-sm"
          >
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium text-[#1a1a2e] dark:text-[#f0f0f5] mb-3">
              Stay ahead of enterprise trends.
            </h2>
            <p className="text-[#6b7280] dark:text-[#d1d5db] text-[15px] sm:text-[16px] mb-8">
              Monthly insights for enterprise leaders.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mt-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className="flex-1 bg-white dark:bg-white/[0.06] border border-[#e5e7eb] dark:border-white/[0.1] focus:border-[#FF4800] text-[#1a1a2e] dark:text-[#f0f0f5] rounded-lg px-4 py-3 text-[15px] placeholder-[#9ca3af] outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FF4800] hover:bg-[#e63f00] text-white font-medium text-[15px] rounded-lg px-6 py-3 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                Subscribe
              </button>
            </form>
            <p className="text-[#9ca3af] text-[12px] mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
