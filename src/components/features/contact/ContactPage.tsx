'use client';

import { useState, useRef } from 'react';
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


/* ─── Floating Label Input ────────────────────────────────────────── */
function FloatingInput({
  id,
  name,
  type = 'text',
  required = false,
  value,
  onChange,
  label,
  delay = 0,
}: {
  id: string
  name: string
  type?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  delay?: number
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 + delay, ease: [0.16, 1, 0.3, 1] }}
      className="floating-input-group relative group"
    >
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="floating-input w-full bg-white/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-xl px-4 min-h-[56px] py-3 outline-none transition-all duration-500 focus:border-[#FF4800] focus:ring-4 focus:ring-[#FF4800]/10"
      />
      <label
        htmlFor={id}
        className={`floating-label absolute left-4 transition-all duration-300 ease-[0.16,1,0.3,1] pointer-events-none ${isActive
          ? 'floating-label-active'
          : 'floating-label-inactive'
          }`}
      >
        {label}
      </label>

      {/* Animated underline / glow */}
      <motion.div
        initial={false}
        animate={{ scaleX: focused ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4800] origin-center z-[2] shadow-[0_0_15px_rgba(255,72,0,0.5)]"
      />
    </motion.div>
  );
}

/* ─── Floating Label Textarea ─────────────────────────────────────── */
function FloatingTextarea({
  id,
  name,
  required = false,
  value,
  onChange,
  label,
  rows = 5,
  delay = 0,
}: {
  id: string
  name: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  label: string
  rows?: number
  delay?: number
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 + delay, ease: [0.16, 1, 0.3, 1] }}
      className="floating-input-group relative group"
    >
      <textarea
        id={id}
        name={name}
        required={required}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="floating-input w-full bg-white/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 outline-none transition-all duration-500 focus:border-[#FF4800] focus:ring-4 focus:ring-[#FF4800]/10 resize-none"
      />
      <label
        htmlFor={id}
        className={`floating-label absolute left-4 transition-all duration-300 ease-[0.16,1,0.3,1] pointer-events-none ${isActive
          ? 'floating-label-active'
          : 'floating-label-inactive'
          }`}
      >
        {label}
      </label>

      {/* Animated underline / glow */}
      <motion.div
        initial={false}
        animate={{ scaleX: focused ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF4800] origin-center z-[2] shadow-[0_0_15px_rgba(255,72,0,0.5)]"
      />
    </motion.div>
  );
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const isSubmitting = formStatus === 'sending';

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')
    setErrorMsg('')

    try {
      const formspreeUrl = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID}`;
      const res = await fetch(formspreeUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.')

      setFormStatus('success')
      setFormData(initialFormData)
      toast.success("Message sent! We'll get back to you within 1 business day.")
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send. Please try again.'
      setFormStatus('error')
      setErrorMsg(msg)
      toast.error(msg)
    }
  }

  return (
    <div className="bg-white dark:bg-[#0a0a14] min-h-screen">
      {/* ─── Inline styles for floating labels, mobile card & animations ─── */}
      <style>{`
        /* ─── Floating Label base ───────────────────────────────────── */
        .floating-label-inactive {
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
          color: #9ca3af;
        }
        .floating-label-active {
          top: 0;
          transform: translateY(-50%);
          font-size: 11px;
          font-weight: 500;
          color: #FF4800;
          background: transparent;
          padding: 0 6px;
          letter-spacing: 0.02em;
        }
        textarea ~ .floating-label-inactive {
          top: 16px;
          transform: translateY(0);
        }
        textarea ~ .floating-label-active {
          top: 0;
          transform: translateY(-50%);
        }

        /* ─── Dark Mode Overrides ────────────────────────────────────── */
        html.dark .contact-form-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(30px) saturate(1.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
        }
        
        .dark .floating-label-active {
          background: #0a0a14 !important;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .shake-error {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>

      {/* HERO */}
      <section
        className="relative flex items-center justify-center bg-white dark:bg-[#0a0a14] overflow-hidden"
        style={{ minHeight: '50vh' }}
      >
        {/* Floating accent blob — top-right */}
        <div
          className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle, #FF4800 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10 pt-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[11px] uppercase tracking-[0.5em] text-[#FF4800] font-bold mb-6"
          >
            Get in Touch
          </motion.p>
          <h1 className="text-[40px] sm:text-[56px] md:text-[64px] lg:text-[84px] font-bold text-[#1a1a2e] dark:text-white leading-[0.9] tracking-tighter uppercase mb-8">
            Let&apos;s architect <br /><span className="text-[#FF4800]">your path forward.</span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ transformOrigin: 'center' }}
            className="h-px w-24 bg-[#FF4800]/60 mx-auto mb-10"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-[#6b7280] dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed md:whitespace-nowrap"
          >
            Tell us about your enterprise challenge. We&apos;ll respond within 1 business day.
          </motion.p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="px-4 sm:px-6 pt-12 sm:pt-24 pb-24 sm:pb-32 bg-[#f8f8fc] dark:bg-[#0a0a14] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,72,0,0.04)_0%,_transparent_50%)]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start relative z-10">
          {/* LEFT — Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <form
              ref={formRef}
              onMouseMove={handleMouseMove}
              onSubmit={handleSubmit}
              className={`contact-form-card relative p-6 sm:p-12 space-y-8 rounded-[32px] overflow-hidden group ${formStatus === 'error' ? 'shake-error' : ''}`}
            >
              {/* Cursor Light Effect */}
              <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0"
                style={{
                  background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,72,0,0.12), transparent 40%)`
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <FloatingInput
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  label="Full Name *"
                  delay={0.1}
                />
                <FloatingInput
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  label="Phone Number *"
                  delay={0.2}
                />
              </div>

              <div className="grid grid-cols-1 relative z-10">
                <FloatingInput
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Work Email (optional)"
                  delay={0.3}
                />
              </div>

              <div className="relative z-10">
                <FloatingTextarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  label="Tell us about your challenge... (optional)"
                  delay={0.5}
                />
              </div>

              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-red-500 dark:text-red-400 text-xs font-bold uppercase tracking-widest rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-5 py-4 relative z-10 text-center"
                >
                  {errorMsg}
                </motion.p>
              )}


              <div className="relative z-10 pt-4">
                <MagneticButton className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden group/btn bg-[#FF4800] text-white text-[13px] font-bold uppercase tracking-[0.2em] rounded-2xl min-h-[64px] transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_20px_50px_rgba(255,72,0,0.4)] disabled:opacity-50"
                  >
                    <AnimatePresence mode="wait">
                      {formStatus === 'success' ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center justify-center gap-3"
                        >
                          <CheckCircle2 size={20} />
                          SENT SUCCESSFULLY
                        </motion.div>
                      ) : isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-3"
                        >
                          <Loader2 className="w-5 h-5 animate-spin" />
                          PROCESSING...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-3"
                        >
                          SEND MESSAGE
                          <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-2" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </MagneticButton>
              </div>

              <p className="text-[#9ca3af] dark:text-slate-500 text-[10px] text-center uppercase tracking-[0.2em] relative z-10 font-bold">
                Zero spam policy. We respond within 24 hours.
              </p>
            </form>
          </motion.div>

          {/* RIGHT — Contact Info */}
          <div className="mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0, ease }}
              custom={0}
              className="text-[#6b7280] dark:text-[#9ca3af] text-[12px] uppercase tracking-[0.15em] font-medium mb-8"
            >
              Or reach us directly
            </motion.div>

            {/* Email */}
            <motion.div
              custom={1}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex items-start gap-4 mb-6"
            >
              <Mail className="w-5 h-5 text-[#FF4800] mt-0.5 shrink-0" />
              <div>
                <a href="mailto:stravedatech@gmail.com" className="text-[#1a1a2e] dark:text-[#f0f0f5] text-[18px] font-medium hover:text-[#FF4800] transition-colors">
                  stravedatech@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              custom={1.5}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex items-start gap-4 mb-6"
            >
              <Phone className="w-5 h-5 text-[#FF4800] mt-0.5 shrink-0" />
              <div>
                <a href="tel:+919623095766" className="text-[#1a1a2e] dark:text-[#f0f0f5] text-[18px] font-medium hover:text-[#FF4800] transition-colors">
                  +91 96230 95766
                </a>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              custom={2}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex items-start gap-4 mb-6"
            >
              <MapPin className="w-5 h-5 text-[#FF4800] mt-0.5 shrink-0" />
              <div>
                <p className="text-[#1a1a2e] dark:text-[#f0f0f5] text-[16px] font-medium">
                  Pune, Maharashtra 411001
                </p>
                <p className="text-[#6b7280] dark:text-[#9ca3af] text-[14px]">India</p>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              custom={3}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex items-start gap-4 mb-6"
            >
              <Clock className="w-5 h-5 text-[#FF4800] mt-0.5 shrink-0" />
              <div>
                <p className="text-[#1a1a2e] dark:text-[#f0f0f5] text-[16px] font-medium">
                  Monday &ndash; Friday
                </p>
                <p className="text-[#6b7280] dark:text-[#9ca3af] text-[14px]">
                  9:00 AM &ndash; 6:00 PM IST
                </p>
              </div>
            </motion.div>

            {/* Website */}
            <motion.div
              custom={4}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex items-start gap-4 mb-6"
            >
              <Globe className="w-5 h-5 text-[#FF4800] mt-0.5 shrink-0" />
              <a
                href="https://stravedatech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a1a2e] dark:text-[#f0f0f5] text-[18px] font-medium hover:text-[#FF4800] transition-colors"
              >
                stravedatech.com
              </a>
            </motion.div>

            {/* Map Placeholder — Enhanced */}
            <motion.div
              custom={5}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="my-8"
            >
              <div className="relative rounded-xl border border-[#e5e7eb] dark:border-white/[0.06] bg-[#f8f8fc] dark:bg-white/[0.04] overflow-hidden h-48 flex flex-col items-center justify-center gap-2">
                {/* Subtle radial gradient for depth */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,72,0,0.04) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />
                {/* Subtle grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4800]/10">
                    <MapPin className="h-5 w-5 text-[#FF4800] map-pin-pulse" />
                  </div>
                  <p className="text-[14px] font-medium text-[#1a1a2e] dark:text-[#f0f0f5]">Pune, Maharashtra 411001 · India</p>
                  <a
                    href="https://maps.google.com/?q=Pune+Maharashtra+411001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-[#FF4800] hover:text-[#e63f00] font-medium underline underline-offset-2 transition-colors"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              custom={6}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="h-px bg-[#e5e7eb] dark:bg-white/[0.06] my-8"
            />
          </div>
        </div>
      </section>

      {/* PROJECT REQUEST WIZARD */}
      <section className="px-6 py-24 bg-white dark:bg-[#121212]">
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
