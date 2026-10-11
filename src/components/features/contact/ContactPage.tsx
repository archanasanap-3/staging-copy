'use client';

import { useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Clock, Globe, CheckCircle2, Loader2, Award, FolderGit2, ArrowRight, Phone } from 'lucide-react';
import { toast } from 'sonner';
import TextReveal from '@/components/animations/TextReveal';
import MagneticButton from '@/components/features/common/MagneticButton';
import ProjectRequestWizard from '@/components/features/common/ProjectRequestWizard';

const ease = [0.4, 0, 0.2, 1] as const;

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

const infoItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease },
  }),
}


type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isSubmitting = formStatus === 'sending';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      setErrorMsg('Please accept the terms and privacy policy.');
      return;
    }

    setFormStatus('sending');
    setErrorMsg('');

    try {
      const formspreeUrl = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID}`;
      const res = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');

      setFormStatus('success');
      setFormData(initialFormData);
      toast.success("Message sent! We'll get back to you within 24 hours.");
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Failed to send. Please try again.';
      setFormStatus('error');
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="bg-[#F6F1E7] dark:bg-[#0a0a14] min-h-screen">
      {/* ─── MAIN CONTACT SECTION — fits a single screen ─── */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#F6F1E7] px-4 pb-10 pt-28 dark:bg-[#0a0a14] sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-16">

            {/* ── LEFT: intro + ways to reach us ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col gap-10 lg:col-span-6"
            >
              <div>
                <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">
                  Get In Touch
                </span>
                <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-black dark:text-white sm:text-4xl md:text-[2.5rem]">
                  Always here to <span className="text-[#FF4800]">help you</span>
                </h1>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Have a question about custom software, business automation or AI? Tell us about it and we&apos;ll
                  get back to you within 24 hours.
                </p>
              </div>

              <ul className="space-y-5">
                {[
                  { icon: Phone, label: 'Call us', value: '+91 96230 95766', href: 'tel:+919623095766' },
                  { icon: Mail, label: 'Email', value: 'stravedatech@gmail.com', href: 'mailto:stravedatech@gmail.com' },
                  { icon: InstagramIcon, label: 'Instagram', value: '@stravedaofficial', href: 'https://www.instagram.com/stravedaofficial/' },
                  { icon: LinkedInIcon, label: 'LinkedIn', value: 'Straveda Tech', href: 'https://www.linkedin.com/company/straveda-tech/' },
                ].map(({ icon: Icon, label, value, href }, i) => (
                  <motion.li
                    key={label}
                    custom={i}
                    variants={infoItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-black transition-colors duration-300 group-hover:text-[#FF4800] dark:text-white [&_svg]:h-[22px] [&_svg]:w-[22px]">
                        <Icon />
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-400">{label}</span>
                        <span className="mt-0.5 text-base font-semibold text-black transition-colors duration-300 group-hover:text-[#FF4800] dark:text-white">
                          {value}
                        </span>
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* ── RIGHT: compact form ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="lg:col-span-6"
            >
              <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_18px_50px_rgba(20,17,12,0.07)] dark:border-white/10 dark:bg-[#12121e] sm:p-8">
                <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                  Ready to get started?
                </h2>
                <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                  Tell us about your project and we&apos;ll reply within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="w-full rounded-xl bg-white dark:bg-[#151528] px-4 py-3 text-[15px] font-medium text-black dark:text-white placeholder:text-neutral-400 border border-neutral-200 dark:border-neutral-700/80 focus:border-[#FF4800] focus:ring-2 focus:ring-[#FF4800]/20 focus:outline-none transition duration-200"
                    />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full rounded-xl bg-white dark:bg-[#151528] px-4 py-3 text-[15px] font-medium text-black dark:text-white placeholder:text-neutral-400 border border-neutral-200 dark:border-neutral-700/80 focus:border-[#FF4800] focus:ring-2 focus:ring-[#FF4800]/20 focus:outline-none transition duration-200"
                    />
                  </div>

                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full rounded-xl bg-white dark:bg-[#151528] px-4 py-3 text-[15px] font-medium text-black dark:text-white placeholder:text-neutral-400 border border-neutral-200 dark:border-neutral-700/80 focus:border-[#FF4800] focus:ring-2 focus:ring-[#FF4800]/20 focus:outline-none transition duration-200"
                  />

                  <textarea
                    required
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="w-full rounded-xl bg-white dark:bg-[#151528] px-4 py-3 text-[15px] font-medium text-black dark:text-white placeholder:text-neutral-400 border border-neutral-200 dark:border-neutral-700/80 focus:border-[#FF4800] focus:ring-2 focus:ring-[#FF4800]/20 focus:outline-none transition duration-200 resize-none"
                  />

                  <div className="flex items-center gap-2.5">
                    <input
                      id="termsCheckbox"
                      type="checkbox"
                      required
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="h-4 w-4 cursor-pointer rounded border-neutral-300 accent-[#FF4800] focus:ring-[#FF4800]"
                    />
                    <label
                      htmlFor="termsCheckbox"
                      className="cursor-pointer select-none text-xs text-neutral-600 dark:text-neutral-400 sm:text-[13px]"
                    >
                      I accept the terms and privacy policy.
                    </label>
                  </div>

                  {errorMsg && <p className="text-xs font-semibold text-red-500">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[#14110c] px-8 py-3.5 text-[15px] font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#FF4800] disabled:opacity-60 dark:bg-[#1a1a2e] dark:hover:bg-[#FF4800]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* PROJECT REQUEST WIZARD */}
      <section className="bg-[#F6F1E7] px-4 py-12 dark:bg-[#0a0a14] sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT: intro + what happens next */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease }}
            className="lg:col-span-5"
          >
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">Quick Start</p>
            <h2 className="mb-4 text-3xl font-bold leading-[1.2] tracking-tight text-black dark:text-white sm:text-4xl md:text-[2.5rem]">
              Start your <span className="text-[#FF4800]">project</span>
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              Tell us about your needs in three easy steps and we&apos;ll shape a plan around your business.
            </p>

            <div className="mt-10">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                What happens next
              </p>
              <ol className="relative space-y-7 border-l border-black/10 pl-7 dark:border-white/15">
                {[
                  { t: 'We review your request', d: 'A senior team member reads it and replies within 24 hours.' },
                  { t: 'Free discovery call', d: '30 minutes to map your workflows and spot what to automate.' },
                  { t: 'Fixed-price roadmap', d: 'A clear plan, timeline and price, with full code ownership.' },
                ].map((step, i) => (
                  <li key={step.t} className="relative">
                    <span className="absolute -left-[2.35rem] top-0 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#FF4800] text-[10px] font-bold text-white ring-4 ring-[#F6F1E7] dark:ring-[#0a0a14]">
                      {i + 1}
                    </span>
                    <p className="text-[15px] font-bold leading-tight text-black dark:text-white">{step.t}</p>
                    <p className="mt-1 max-w-xs text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{step.d}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {[
                ['24h', 'Reply time'],
                ['100%', 'Code ownership'],
                ['Free', 'First consultation'],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-bold leading-none tracking-tight text-[#FF4800]">{v}</p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: wizard */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="lg:col-span-7 lg:border-l lg:border-black/10 lg:pl-14 dark:lg:border-white/10"
          >
            <ProjectRequestWizard />
          </motion.div>
        </div>
      </section>

      {/* ── OFFICE LOCATIONS MAP (commented out) ─────────────────────────── */}
      {false && (
      <section className="px-6 bg-[#F6F1E7] dark:bg-[#0a0a14] border-t border-black/5 dark:border-white/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#FF4800] font-bold mb-4">
              Our Offices
            </p>
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-bold text-black dark:text-white leading-tight mb-4">
              Find Us
            </h2>
            <p className="text-[#6b7280] dark:text-[#9ca3af] text-base max-w-xl mx-auto">
              We work across Pune and Nashik — reach us at either location or connect online.
            </p>
            <div className="h-[2px] w-12 bg-[#FF4800] mx-auto mt-6 rounded-full" />
          </motion.div>

          {/* Map cards grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">

            {/* ── Pune Office ─── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease }}
              className="group rounded-2xl overflow-hidden border border-black/8 dark:border-white/8 bg-white dark:bg-[#111122] shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(255,72,0,0.10)] dark:hover:shadow-[0_8px_40px_rgba(255,72,0,0.15)] transition-shadow duration-500"
            >
              {/* Map embed */}
              <div className="relative w-full h-[240px] md:h-[280px] bg-[#f0f0f0] dark:bg-[#1a1a2e]">
                <iframe
                  title="Pune Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.70792592854!2d73.72283255!3d18.524564749999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1715941200000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />
                {/* Orange tint overlay on dark mode */}
                <div className="absolute inset-0 pointer-events-none rounded-t-2xl" style={{ background: 'linear-gradient(to bottom, transparent 70%, rgba(255,72,0,0.03))' }} />
              </div>

              {/* Card info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-[#FF4800]/10 flex items-center justify-center">
                      <MapPin size={14} className="text-[#FF4800]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800] mb-1">Pune Office</p>
                      <p className="text-[#1a1a2e] dark:text-[#f0f0f5] font-medium text-[15px]">Pune, Maharashtra, India</p>
                      <p className="text-[#9ca3af] text-[13px] mt-0.5">Primary Headquarters</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Pune,Maharashtra,India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#FF4800] hover:text-[#e03f00] transition-colors border border-[#FF4800]/20 hover:border-[#FF4800]/50 rounded-full px-3 py-1.5 transition-all duration-200"
                  >
                    Open Maps
                    <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* ── Nashik Office ─── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="group rounded-2xl overflow-hidden border border-black/8 dark:border-white/8 bg-white dark:bg-[#111122] shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(255,72,0,0.10)] dark:hover:shadow-[0_8px_40px_rgba(255,72,0,0.15)] transition-shadow duration-500"
            >
              {/* Map embed */}
              <div className="relative w-full h-[240px] md:h-[280px] bg-[#f0f0f0] dark:bg-[#1a1a2e]">
                <iframe
                  title="Nashik Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120059.37843571742!2d73.72449065!3d20.011133699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeba3bc8f4683%3A0x4d3b70ce98e8b9e0!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1715941200000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 pointer-events-none rounded-t-2xl" style={{ background: 'linear-gradient(to bottom, transparent 70%, rgba(255,72,0,0.03))' }} />
              </div>

              {/* Card info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-[#FF4800]/10 flex items-center justify-center">
                      <MapPin size={14} className="text-[#FF4800]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800] mb-1">Nashik Office</p>
                      <p className="text-[#1a1a2e] dark:text-[#f0f0f5] font-medium text-[15px]">Nashik, Maharashtra, India</p>
                      <p className="text-[#9ca3af] text-[13px] mt-0.5">Regional Operations</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Nashik,Maharashtra,India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#FF4800] hover:text-[#e03f00] transition-colors border border-[#FF4800]/20 hover:border-[#FF4800]/50 rounded-full px-3 py-1.5 transition-all duration-200"
                  >
                    Open Maps
                    <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      )}

    </div>

  );
}
