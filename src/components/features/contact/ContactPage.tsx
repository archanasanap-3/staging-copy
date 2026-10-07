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
    <div className="bg-white dark:bg-[#0a0a14] min-h-screen">
      {/* ─── HERO / MAIN CONTACT SECTION (Matched with Reference UI) ─── */}
      <section className="relative bg-white dark:bg-[#0a0a14] pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* ── LEFT COLUMN: Info ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="lg:col-span-5 xl:col-span-6 space-y-8"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF4800] block mb-3">
                  Get In Touch
                </span>
                <h2
                  className="font-bold text-black dark:text-white text-left text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2] whitespace-nowrap"
                  style={{ color: isDark ? '#ffffff' : '#000000' }}
                >
                  Always Here to Help you
                </h2>
                <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                  Have a question about custom software, business automation, or AI solutions? Our team is ready to understand your challenges and build systems that deliver real outcomes.
                </p>
              </div>

              {/* 4 Info Items */}
              <div className="space-y-6 pt-2">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#f0f2f7] dark:bg-white/[0.06] text-black dark:text-white shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-black dark:text-white">
                      Location
                    </h3>
                    <p className="mt-0.5 text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-400">
                      Pune, Maharashtra 411001, India
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#f0f2f7] dark:bg-white/[0.06] text-black dark:text-white shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-black dark:text-white">
                      Contact
                    </h3>
                    <p className="mt-0.5 text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-400">
                      <a href="tel:+919623095766" className="hover:text-[#FF4800] transition-colors">
                        +91 96230 95766
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#f0f2f7] dark:bg-white/[0.06] text-black dark:text-white shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-black dark:text-white">
                      Email
                    </h3>
                    <p className="mt-0.5 text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-400">
                      <a href="mailto:stravedatech@gmail.com" className="hover:text-[#FF4800] transition-colors">
                        stravedatech@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours of operation */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#f0f2f7] dark:bg-white/[0.06] text-black dark:text-white shrink-0">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-black dark:text-white">
                      Hours of operation
                    </h3>
                    <p className="mt-0.5 text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-400">
                      Monday &ndash; Friday: 09:00 &ndash; 18:00 IST
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN: Form Card ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="lg:col-span-7 xl:col-span-6"
            >
              <div className="rounded-3xl bg-[#f8f9fb] dark:bg-[#0f0f1d] p-6 sm:p-10 lg:p-12 border border-neutral-200/80 dark:border-neutral-800 shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
                <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
                  Ready To Get Started?
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  Tell us about your project and we&apos;ll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {/* Name */}
                  <div>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="w-full rounded-xl bg-white dark:bg-[#151528] px-4.5 py-3.5 text-base font-medium text-black dark:text-white placeholder:text-neutral-400 border border-neutral-200 dark:border-neutral-700/80 shadow-sm focus:border-[#FF4800] focus:ring-2 focus:ring-[#FF4800]/20 focus:outline-none transition duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full rounded-xl bg-white dark:bg-[#151528] px-4.5 py-3.5 text-base font-medium text-black dark:text-white placeholder:text-neutral-400 border border-neutral-200 dark:border-neutral-700/80 shadow-sm focus:border-[#FF4800] focus:ring-2 focus:ring-[#FF4800]/20 focus:outline-none transition duration-200"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter number"
                      className="w-full rounded-xl bg-white dark:bg-[#151528] px-4.5 py-3.5 text-base font-medium text-black dark:text-white placeholder:text-neutral-400 border border-neutral-200 dark:border-neutral-700/80 shadow-sm focus:border-[#FF4800] focus:ring-2 focus:ring-[#FF4800]/20 focus:outline-none transition duration-200"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write a message..."
                      className="w-full rounded-xl bg-white dark:bg-[#151528] px-4.5 py-3.5 text-base font-medium text-black dark:text-white placeholder:text-neutral-400 border border-neutral-200 dark:border-neutral-700/80 shadow-sm focus:border-[#FF4800] focus:ring-2 focus:ring-[#FF4800]/20 focus:outline-none transition duration-200 resize-none"
                    />
                  </div>

                  {/* Terms & Privacy checkbox */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <input
                      id="termsCheckbox"
                      type="checkbox"
                      required
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="h-4 w-4 rounded border-neutral-300 text-[#0f172a] focus:ring-[#FF4800] accent-[#0f172a] cursor-pointer"
                    />
                    <label
                      htmlFor="termsCheckbox"
                      className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 select-none cursor-pointer"
                    >
                      Accept terms and privacy policy.
                    </label>
                  </div>

                  {errorMsg && (
                    <p className="text-xs font-semibold text-red-500">
                      {errorMsg}
                    </p>
                  )}

                  {/* Send Message Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center rounded-full bg-[#0c1222] hover:bg-[#FF4800] dark:bg-[#1a1a2e] dark:hover:bg-[#FF4800] text-white px-8 py-3.5 text-sm sm:text-base font-semibold shadow-md transition-all duration-300 disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* PROJECT REQUEST WIZARD */}
      <section className="px-5 py-24 bg-white dark:bg-[#121212]">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease }}
            className="text-[11px] uppercase tracking-[0.2em] text-[#FF4800] font-medium mb-4"
          >
            QUICK START
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] leading-tight mb-4"
          >
            Start Your Project
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="text-[#6b7280] dark:text-[#9ca3af] text-base md:text-lg"
          >
            Tell us about your needs in 3 easy steps
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            style={{ transformOrigin: 'center' }}
            className="h-[2px] w-12 bg-[#FF4800] mx-auto mt-6"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <ProjectRequestWizard />
        </motion.div>
      </section>

      {/* ── OFFICE LOCATIONS MAP (commented out) ─────────────────────────── */}
      {false && (
      <section className="px-6 py-20 md:py-28 bg-[#fafafa] dark:bg-[#0d0d1a] border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#FF4800] font-medium mb-4">
              Our Offices
            </p>
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] leading-tight mb-4">
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
                      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF4800] mb-1">Pune Office</p>
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
                      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF4800] mb-1">Nashik Office</p>
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
