'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ShieldCheck,
  Users,
  Database,
  Settings2,
  Cookie,
  Bot,
  Share2,
  Lock,
  Archive,
  Globe2,
  Scale,
  Baby,
  Puzzle,
  History,
  Mail,
  UserCircle,
  Phone,
  Building2,
  Receipt,
  CreditCard,
  Cpu,
  AppWindow,
  Network,
  BarChart3,
  KeyRound,
  LifeBuoy,
  Terminal,
  UploadCloud,
  BrainCircuit,
  Rocket,
  Gauge,
  ShieldAlert,
  MessageSquare,
  Headset,
  CheckCircle2,
  Server,
  Cloud,
  Landmark,
  Briefcase,
  Eye,
  PenLine,
  Trash2,
  Ban,
  Download,
  Undo2,
  XCircle,
  Gavel,
  Wifi,
  MonitorCheck,
  type LucideIcon,
} from 'lucide-react';
import PrivacyHero from './PrivacyHero';
import PrivacyTableOfContents, { type TocSection } from './PrivacyTableOfContents';
import PrivacySection from './PrivacySection';
import PrivacyCard from './PrivacyCard';
import PrivacyContactCard from './PrivacyContactCard';

const SCROLL_OFFSET = 108;
const COOKIE_STORAGE_KEY = 'straveda-cookie-consent';

const SECTIONS: TocSection[] = [
  { id: 'introduction', title: 'Introduction', icon: ShieldCheck },
  { id: 'scope', title: 'Scope', icon: Users },
  { id: 'information-we-collect', title: 'Information We Collect', icon: Database },
  { id: 'how-we-use-information', title: 'How We Use Your Information', icon: Settings2 },
  { id: 'cookies-tracking', title: 'Cookies & Tracking', icon: Cookie },
  { id: 'ai-automation', title: 'AI & Automation', icon: Bot },
  { id: 'sharing-of-information', title: 'Sharing of Information', icon: Share2 },
  { id: 'data-security', title: 'Data Security', icon: Lock },
  { id: 'data-retention', title: 'Data Retention', icon: Archive },
  { id: 'international-transfers', title: 'International Transfers', icon: Globe2 },
  { id: 'your-rights', title: 'Your Rights', icon: Scale },
  { id: 'childrens-privacy', title: "Children's Privacy", icon: Baby },
  { id: 'third-party-services', title: 'Third-Party Services', icon: Puzzle },
  { id: 'changes-to-policy', title: 'Changes to This Policy', icon: History },
  { id: 'contact-us', title: 'Contact Us', icon: Mail },
];

interface InfoItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

function InfoGrid({ items, columns = 3 }: { items: InfoItem[]; columns?: 2 | 3 }) {
  return (
    <div className={`grid gap-3.5 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''}`}>
      {items.map((item) => (
        <PrivacyCard key={item.title} icon={item.icon} title={item.title} variant="info">
          {item.desc}
        </PrivacyCard>
      ))}
    </div>
  );
}

function Chip({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 px-4 py-2 text-[13px] font-medium text-[#1a1a2e] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF4800]/30 dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-white">
      <Icon className="h-3.5 w-3.5 text-[#FF4800]" strokeWidth={2} aria-hidden="true" />
      {label}
    </span>
  );
}

const COLLECT_ITEMS: InfoItem[] = [
  { icon: UserCircle, title: 'Account Information', desc: 'Name, username, role and account preferences when you create a Straveda account.' },
  { icon: Phone, title: 'Contact Information', desc: 'Email address, phone number and mailing address used to communicate with you.' },
  { icon: Building2, title: 'Company Information', desc: 'Organization name, size, industry and team details for business clients.' },
  { icon: Receipt, title: 'Billing Details', desc: 'Invoicing address, tax identifiers and subscription plan information.' },
  { icon: CreditCard, title: 'Payment Information', desc: 'Processed securely by our PCI-compliant payment partners — we never store full card numbers.' },
  { icon: Cpu, title: 'Technical Device Information', desc: 'Device type, operating system and hardware identifiers used to keep our platform secure.' },
  { icon: AppWindow, title: 'Browser Information', desc: 'Browser type, version and language settings used to render our services correctly.' },
  { icon: Wifi, title: 'IP Address', desc: 'Collected for security, fraud prevention and approximate location for compliance.' },
  { icon: BarChart3, title: 'Usage Analytics', desc: 'Feature usage, session duration and interaction patterns to improve our products.' },
  { icon: Cookie, title: 'Cookies', desc: 'Small data files that keep you signed in and help us understand how our site is used.' },
  { icon: KeyRound, title: 'Authentication Data', desc: 'Hashed credentials, session tokens and multi-factor authentication records.' },
  { icon: LifeBuoy, title: 'Support Requests', desc: 'Messages, attachments and diagnostic information you share with our support team.' },
  { icon: Terminal, title: 'API Logs', desc: 'Request metadata, timestamps and status codes generated when you use our APIs.' },
  { icon: UploadCloud, title: 'Customer Uploaded Content', desc: 'Files, documents and data you upload into our SaaS platform to use our services.' },
  { icon: BrainCircuit, title: 'AI Usage Data', desc: 'Prompts, generated outputs and model interaction data used to power AI features.' },
];

const USE_ITEMS: InfoItem[] = [
  { icon: Rocket, title: 'Provide Services', desc: 'Operate, deliver and maintain the software, AI and IT services you rely on.' },
  { icon: Gauge, title: 'Improve Performance', desc: 'Diagnose issues, optimize speed and enhance reliability across our platform.' },
  { icon: KeyRound, title: 'Authentication', desc: 'Verify your identity and keep your account and data secure.' },
  { icon: ShieldAlert, title: 'Fraud Detection', desc: 'Identify suspicious activity and protect our systems and customers from abuse.' },
  { icon: Headset, title: 'Customer Support', desc: 'Respond to inquiries, troubleshoot issues and provide technical assistance.' },
  { icon: MessageSquare, title: 'Communication', desc: 'Send service updates, security alerts and, with consent, product news.' },
  { icon: Receipt, title: 'Billing', desc: 'Process payments, generate invoices and manage subscriptions.' },
  { icon: Lock, title: 'Security', desc: 'Protect against unauthorized access, breaches and data loss.' },
  { icon: BarChart3, title: 'Analytics', desc: 'Understand product usage trends to guide our roadmap and design decisions.' },
  { icon: Bot, title: 'AI Features', desc: 'Power intelligent automation, recommendations and generative capabilities.' },
  { icon: Scale, title: 'Legal Compliance', desc: 'Meet regulatory obligations, enforce our terms and respond to lawful requests.' },
];

const COOKIE_ITEMS: InfoItem[] = [
  { icon: ShieldCheck, title: 'Essential Cookies', desc: 'Required for core functionality like login sessions and security — cannot be disabled.' },
  { icon: Gauge, title: 'Performance Cookies', desc: 'Help us understand load times and technical performance across devices.' },
  { icon: BarChart3, title: 'Analytics Cookies', desc: 'Measure usage patterns so we can improve navigation and content.' },
  { icon: Lock, title: 'Security Cookies', desc: 'Detect fraud, enforce authentication and protect against malicious activity.' },
  { icon: MessageSquare, title: 'Marketing Cookies', desc: 'Used, with your consent, to tailor communications and measure campaigns.' },
];

const SHARE_ITEMS: InfoItem[] = [
  { icon: Cloud, title: 'Cloud Providers', desc: 'Infrastructure partners that securely host our application and data.' },
  { icon: CreditCard, title: 'Payment Providers', desc: 'PCI-compliant processors that handle billing and transactions.' },
  { icon: Server, title: 'Hosting Providers', desc: 'Providers that serve our websites, applications and APIs reliably.' },
  { icon: BarChart3, title: 'Analytics Services', desc: 'Tools that help us understand product usage in aggregate, anonymized form.' },
  { icon: MessageSquare, title: 'Communication Platforms', desc: 'Email, SMS and chat providers used to deliver notifications and support.' },
  { icon: Landmark, title: 'Government Authorities', desc: 'Only when legally required, such as in response to a valid court order.' },
  { icon: Briefcase, title: 'Professional Advisors', desc: 'Auditors, legal counsel and consultants bound by confidentiality obligations.' },
];

const SECURITY_ITEMS: InfoItem[] = [
  { icon: Lock, title: 'Encryption', desc: 'Data encrypted in transit and at rest using industry-standard protocols.' },
  { icon: ShieldCheck, title: 'HTTPS', desc: 'All traffic to our platform is served over secure, encrypted connections.' },
  { icon: KeyRound, title: 'Access Controls', desc: 'Role-based permissions restrict data access to authorized personnel only.' },
  { icon: MonitorCheck, title: 'Monitoring', desc: 'Continuous system monitoring to detect and respond to anomalies quickly.' },
  { icon: Eye, title: 'Regular Security Reviews', desc: 'Periodic audits and vulnerability assessments of our infrastructure.' },
  { icon: Archive, title: 'Backups', desc: 'Automated, encrypted backups to protect against data loss.' },
  { icon: Network, title: 'Authentication', desc: 'Strong password policies and multi-factor authentication support.' },
  { icon: Server, title: 'Secure Infrastructure', desc: 'Hardened cloud environments with layered network protections.' },
  { icon: Scale, title: 'Industry Best Practices', desc: 'Security programs aligned with widely recognized industry standards.' },
];

const RIGHTS_ITEMS: InfoItem[] = [
  { icon: Eye, title: 'Access', desc: 'Request a copy of the personal information we hold about you.' },
  { icon: PenLine, title: 'Correction', desc: 'Ask us to correct inaccurate or incomplete information.' },
  { icon: Trash2, title: 'Deletion', desc: 'Request deletion of your personal data, subject to legal retention needs.' },
  { icon: Ban, title: 'Restriction', desc: 'Ask us to limit how we process your information in certain circumstances.' },
  { icon: Download, title: 'Portability', desc: 'Receive your data in a structured, commonly used, machine-readable format.' },
  { icon: Undo2, title: 'Withdraw Consent', desc: 'Withdraw previously given consent at any time, without affecting past processing.' },
  { icon: XCircle, title: 'Object to Processing', desc: 'Object to certain processing activities, including direct marketing.' },
  { icon: Gavel, title: 'Complaint Rights', desc: 'Lodge a complaint with your local data protection authority.' },
];

const THIRD_PARTY_ITEMS: InfoItem[] = [
  { icon: CreditCard, title: 'Payment Gateways', desc: 'Secure processors used to handle billing and transactions.' },
  { icon: BarChart3, title: 'Analytics', desc: 'Tools that help us measure and improve product performance.' },
  { icon: Cloud, title: 'Cloud Providers', desc: 'Infrastructure partners that host our services and data.' },
  { icon: Mail, title: 'Email Providers', desc: 'Services used to deliver transactional and account-related email.' },
  { icon: Bot, title: 'AI APIs', desc: 'Third-party model providers that power select AI features.' },
];

const SCOPE_ITEMS: { icon: LucideIcon; label: string }[] = [
  { icon: Globe2, label: 'Website Visitors' },
  { icon: Users, label: 'Customers' },
  { icon: Cloud, label: 'SaaS Users' },
  { icon: Terminal, label: 'API Users' },
  { icon: Briefcase, label: 'Partners' },
  { icon: Building2, label: 'Business Clients' },
];

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const tocTrackRef = useRef<HTMLDivElement>(null);
  const tocNavRef = useRef<HTMLElement>(null);

  // Track which section is currently in view — drives TOC highlighting
  useEffect(() => {
    const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Drive the reading-progress bar and the "sticky" TOC position directly via
  // rAF/DOM refs (no per-frame re-renders). Native `position: sticky` doesn't
  // work here because the site's global layout wrapper forces `overflow-y:
  // auto` on an ancestor (a side effect of its `overflow-x: hidden`), which
  // neutralizes sticky positioning for every descendant on the site — see
  // the note on PrivacyTableOfContents' `navRef` prop.
  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    let raf = 0;

    const tick = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = maxScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) : 0;
      if (progressBarRef.current) progressBarRef.current.style.width = `${p}%`;
      if (progressTextRef.current) progressTextRef.current.textContent = `${Math.round(p)}%`;

      const track = tocTrackRef.current;
      const nav = tocNavRef.current;
      if (track && nav) {
        if (!desktopQuery.matches) {
          nav.style.position = '';
          nav.style.top = '';
          nav.style.left = '';
          nav.style.width = '';
        } else {
          const trackRect = track.getBoundingClientRect();
          const navHeight = nav.offsetHeight;
          if (trackRect.top > SCROLL_OFFSET) {
            nav.style.position = '';
            nav.style.top = '';
            nav.style.left = '';
            nav.style.width = '';
          } else if (trackRect.bottom - navHeight < SCROLL_OFFSET) {
            nav.style.position = 'absolute';
            nav.style.top = `${track.offsetHeight - navHeight}px`;
            nav.style.left = '0';
            nav.style.width = '100%';
          } else {
            nav.style.position = 'fixed';
            nav.style.top = `${SCROLL_OFFSET}px`;
            nav.style.left = `${trackRect.left}px`;
            nav.style.width = `${trackRect.width}px`;
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const handleManageCookies = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(COOKIE_STORAGE_KEY);
    window.location.reload();
  }, []);

  return (
    <div className="relative bg-[#F6F1E7] dark:bg-[#0a0a14]">
      <PrivacyHero effectiveDate="January 1, 2026" lastUpdated="July 14, 2026" readingTime="10 min read" version="v1.0" />

      <div className="mx-auto max-w-7xl px-0 pb-24">
        <div className="lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
          {/* Table of contents — desktop sticky sidebar, mobile accordion (self-managed responsive variants) */}
          <div ref={tocTrackRef} className="mt-10 mb-8 lg:relative lg:mt-10 lg:mb-0">
            <PrivacyTableOfContents
              sections={SECTIONS}
              activeId={activeId}
              onNavigate={handleNavigate}
              progressBarRef={progressBarRef}
              progressTextRef={progressTextRef}
              navRef={tocNavRef}
            />
          </div>

          {/* Content column */}
          <div className="mx-auto mt-10 w-full max-w-[800px] space-y-6 lg:mx-0 md:space-y-8">
            <PrivacySection id="introduction" number="01" title="Introduction" icon={ShieldCheck}>
              <p>
                At Straveda, privacy is not an afterthought — it is a foundation of how we design and operate
                our software, AI solutions, cloud infrastructure and IT services. We build tools for
                businesses that automate operations, ship products faster and adopt AI responsibly, and we
                recognize that this work depends on your trust.
              </p>
              <p>
                This Privacy Policy explains, in plain language, what information we collect, why we collect
                it, how we use and protect it, and the choices and rights available to you. We are committed
                to transparency at every step of our relationship with you — whether you&apos;re browsing our
                website, using our platform, integrating with our APIs, or working with us as a business
                client.
              </p>
            </PrivacySection>

            <PrivacySection id="scope" number="02" title="Scope" icon={Users}>
              <p>This Privacy Policy applies to anyone who interacts with Straveda, including:</p>
              <div className="flex flex-wrap gap-2.5">
                {SCOPE_ITEMS.map((item) => (
                  <Chip key={item.label} icon={item.icon} label={item.label} />
                ))}
              </div>
              <p>
                Wherever you fall on this list, the same core commitments apply: we collect only what we
                need, we use it for clearly stated purposes, and we protect it with industry-appropriate
                safeguards.
              </p>
            </PrivacySection>

            <PrivacySection id="information-we-collect" number="03" title="Information We Collect" icon={Database}>
              <p>
                We collect information that you provide directly, information generated automatically as you
                use our services, and information related to how our AI and automation features are used.
                The categories below summarize what we may collect, depending on how you interact with
                Straveda.
              </p>
              <InfoGrid items={COLLECT_ITEMS} />
            </PrivacySection>

            <PrivacySection id="how-we-use-information" number="04" title="How We Use Your Information" icon={Settings2}>
              <p>We use the information we collect for specific, legitimate business purposes, including to:</p>
              <InfoGrid items={USE_ITEMS} />
            </PrivacySection>

            <PrivacySection id="cookies-tracking" number="05" title="Cookies & Tracking Technologies" icon={Cookie}>
              <p>
                We use cookies and similar tracking technologies to operate our website, remember your
                preferences, keep you securely signed in, and understand how our services are used. Cookies
                generally fall into the following categories:
              </p>
              <InfoGrid items={COOKIE_ITEMS} columns={3} />
              <PrivacyCard icon={Settings2} title="Manage your preferences" variant="callout">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span>
                    You can accept, decline or update non-essential cookies at any time from our cookie
                    banner.
                  </span>
                  <button
                    type="button"
                    onClick={handleManageCookies}
                    className="inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-[#FF4800] px-4 py-2 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e63f00] hover:shadow-lg"
                  >
                    Manage Cookie Preferences
                  </button>
                </div>
              </PrivacyCard>
            </PrivacySection>

            <PrivacySection id="ai-automation" number="06" title="Artificial Intelligence & Automation" icon={Bot}>
              <p>
                Straveda builds AI-powered features and automation into our products to help you work faster
                and smarter. Because generative and automated systems work probabilistically, we ask that you
                keep the following in mind:
              </p>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <PrivacyCard icon={Bot} variant="info">AI features may generate content, suggestions or automated actions based on the data you provide.</PrivacyCard>
                <PrivacyCard icon={Eye} variant="info">You should always review AI-generated outputs before relying on or acting upon them.</PrivacyCard>
                <PrivacyCard icon={ShieldAlert} variant="info">Straveda does not guarantee the accuracy, completeness or reliability of AI-generated content.</PrivacyCard>
                <PrivacyCard icon={Scale} variant="info">Our AI features are designed to assist your workflows — they do not replace professional, legal, financial or medical advice.</PrivacyCard>
              </div>
            </PrivacySection>

            <PrivacySection id="sharing-of-information" number="07" title="Sharing of Information" icon={Share2}>
              <PrivacyCard icon={CheckCircle2} title="We never sell your personal information." variant="success">
                Straveda does not sell, rent or trade your personal data to third parties for their own
                marketing purposes — full stop.
              </PrivacyCard>
              <p>We only share information with carefully selected categories of service providers who help us operate Straveda, including:</p>
              <InfoGrid items={SHARE_ITEMS} />
            </PrivacySection>

            <PrivacySection id="data-security" number="08" title="Data Security" icon={Lock}>
              <p>
                We invest in layered technical and organizational safeguards to protect your information
                against unauthorized access, alteration, disclosure or destruction, including:
              </p>
              <InfoGrid items={SECURITY_ITEMS} />
              <p>
                While we work hard to protect your data, no method of transmission or storage is completely
                secure. We continuously evaluate and improve our security posture as threats evolve.
              </p>
            </PrivacySection>

            <PrivacySection id="data-retention" number="09" title="Data Retention" icon={Archive}>
              <p>
                We retain personal information only for as long as necessary to fulfil the purposes described
                in this Policy — including providing our services, meeting legal and accounting obligations,
                resolving disputes and enforcing our agreements. Retention periods vary depending on the type
                of data and the context in which it was collected.
              </p>
              <p>
                When information is no longer needed, we securely delete or anonymize it using processes
                designed to prevent recovery or reconstruction.
              </p>
            </PrivacySection>

            <PrivacySection id="international-transfers" number="10" title="International Transfers" icon={Globe2}>
              <p>
                As a technology provider, Straveda may process and store information on servers located in
                countries other than your own, using trusted cloud infrastructure partners. Where data is
                transferred internationally, we implement appropriate safeguards — such as standard
                contractual clauses, encryption and vendor due diligence — designed to ensure your information
                receives a consistent level of protection wherever it is processed.
              </p>
            </PrivacySection>

            <PrivacySection id="your-rights" number="11" title="Your Rights" icon={Scale}>
              <p>Depending on your location and applicable law, you may have the following rights regarding your personal information:</p>
              <InfoGrid items={RIGHTS_ITEMS} />
              <p>
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:stravedatech@gmail.com" className="animated-underline font-semibold text-[#FF4800]">
                  stravedatech@gmail.com
                </a>
                . We will respond within the timeframe required by applicable law.
              </p>
            </PrivacySection>

            <PrivacySection id="childrens-privacy" number="12" title="Children's Privacy" icon={Baby}>
              <PrivacyCard icon={ShieldAlert} variant="warning" title="Not intended for children">
                Straveda&apos;s services are designed for businesses and professional use, and are not
                intended for individuals under the age of 18 (or the age of legal majority in their
                jurisdiction). We do not knowingly collect personal information from children. If we become
                aware that we have inadvertently collected such information, we will take steps to delete it
                promptly.
              </PrivacyCard>
            </PrivacySection>

            <PrivacySection id="third-party-services" number="13" title="Third-Party Services" icon={Puzzle}>
              <p>Straveda integrates with trusted third-party services to power parts of our platform, including:</p>
              <InfoGrid items={THIRD_PARTY_ITEMS} />
              <p>
                Each third-party provider maintains its own privacy policy governing how it handles data. We
                encourage you to review those policies to understand their practices.
              </p>
            </PrivacySection>

            <PrivacySection id="changes-to-policy" number="14" title="Changes to This Policy" icon={History}>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices,
                technologies, legal requirements or other factors. When we make material changes, we will
                update the &ldquo;Last Updated&rdquo; date at the top of this page and, where appropriate,
                notify you through our website or by email.
              </p>
              <p>We encourage you to review this page periodically to stay informed about how we protect your information.</p>
            </PrivacySection>

            <PrivacySection id="contact-us" number="15" title="Contact Us" icon={Mail}>
              <p>
                If you have questions, concerns or requests regarding this Privacy Policy or how we handle
                your information, we&apos;d love to hear from you.
              </p>
              <PrivacyContactCard />
            </PrivacySection>
          </div>
        </div>
      </div>
    </div>
  );
}
