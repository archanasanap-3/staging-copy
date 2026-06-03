'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Loader2, CheckCircle2, ArrowRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCursorStyle } from '@/lib/cursor-context'

interface FloatingCTAProps {
  onNavigate: (page: string) => void
}

interface FormData {
  name: string
  email: string
  message: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  message: '',
}

export default function FloatingCTA({ onNavigate }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [isMobile, setIsMobile] = useState(true)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { setCursorStyle } = useCursorStyle()

  // Show the FAB after 3-second delay on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Detect mobile screen size
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Close expanded panel on 'close-all' custom event (Escape key from keyboard nav)
  useEffect(() => {
    const handleCloseAll = () => {
      if (isExpanded) setIsExpanded(false)
    }
    window.addEventListener('close-all', handleCloseAll)
    return () => window.removeEventListener('close-all', handleCloseAll)
  }, [isExpanded])

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev)
    setShowTooltip(false)
  }, [])

  const handleClose = useCallback(() => {
    setIsExpanded(false)
  }, [])

  const handleNavigateToContact = useCallback(() => {
    setIsExpanded(false)
    onNavigate('contact')
  }, [onNavigate])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      // Clear status when user starts editing again
      if (status !== 'idle') {
        setStatus('idle')
        setStatusMessage('')
      }
    },
    [status]
  )

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    setStatusMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: 'Quick Contact',
          email: formData.email,
          phone: '',
          service: "Not sure — let's talk",
          message: formData.message,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setStatusMessage('Message sent! We\'ll be in touch soon.')
        setFormData(initialFormData)
        // Auto-close after 2.5 seconds on success
        setTimeout(() => {
          setIsExpanded(false)
          setStatus('idle')
          setStatusMessage('')
        }, 2500)
      } else {
        setStatus('error')
        setStatusMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setStatusMessage('Network error. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }, [formData])

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Backdrop overlay when expanded */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`fixed inset-0 z-[44] ${isDark ? 'bg-black/40' : 'bg-black/20'}`}
                  onClick={handleClose}
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>

            {/* Mobile Panel — slides up from bottom */}
            <AnimatePresence>
              {isExpanded && isMobile && (
                <motion.div
                  key="mobile-panel"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] as const }}
                  className="fixed bottom-0 right-4 z-[46] rounded-t-2xl p-6"
                  style={{
                    width: 'calc(100vw - 2rem)',
                    maxWidth: '320px',
                    background: isDark ? 'rgba(18, 18, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'}`,
                    borderBottom: 'none',
                    boxShadow: isDark
                      ? '0 -10px 40px rgba(0, 0, 0, 0.5)'
                      : '0 -10px 40px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[16px] font-semibold" style={{ color: isDark ? '#f0f0f5' : '#1a1a2e' }}>Quick Contact</h3>
                    <button
                      onClick={handleClose}
                      className={`transition-colors p-1 rounded-lg ${isDark ? 'text-[#9ca3af] hover:text-[#f0f0f5] hover:bg-white/[0.06]' : 'text-[#6b7280] hover:text-[#1a1a2e] hover:bg-black/[0.04]'}`}
                      aria-label="Close quick contact panel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Mobile: Name input */}
                  <div className="mb-3">
                    <label htmlFor="cta-mobile-name" className="sr-only">
                      Name
                    </label>
                    <input
                      id="cta-mobile-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full border focus:border-[#FF4800] rounded-lg px-3.5 py-2.5 text-[14px] placeholder-[#9ca3af] outline-none transition-colors ${isDark ? 'bg-[#12121e] border-[rgba(255,255,255,0.12)] text-[#f0f0f5]' : 'bg-white border-[#e5e7eb] text-[#1a1a2e]'}`}
                    />
                  </div>

                  {/* Mobile: Email input */}
                  <div className="mb-4">
                    <label htmlFor="cta-mobile-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="cta-mobile-email"
                      name="email"
                      type="email"
                      required
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full border focus:border-[#FF4800] rounded-lg px-3.5 py-2.5 text-[14px] placeholder-[#9ca3af] outline-none transition-colors ${isDark ? 'bg-[#12121e] border-[rgba(255,255,255,0.12)] text-[#f0f0f5]' : 'bg-white border-[#e5e7eb] text-[#1a1a2e]'}`}
                    />
                  </div>

                  {/* Mobile: Send quick message button */}
                  <button
                    onClick={handleNavigateToContact}
                    className="w-full bg-[#FF4800] hover:bg-[#e63f00] text-white text-[14px] font-medium rounded-lg py-2.5 transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,72,0,0.3)] flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send quick message
                  </button>

                  {/* Mobile: Go to Contact Page link */}
                  <button
                    onClick={handleNavigateToContact}
                    className="w-full text-center text-[#FF4800] text-[13px] font-medium mt-3 hover:underline transition-colors flex items-center justify-center gap-1.5"
                  >
                    Go to Contact Page
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Panel — full form with inline status */}
            <AnimatePresence>
              {isExpanded && !isMobile && (
                <motion.div
                  key="desktop-panel"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
                  className="fixed bottom-[72px] right-6 w-[320px] rounded-2xl p-6 z-[46]"
                  style={{
                    background: isDark ? 'rgba(18, 18, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'}`,
                    boxShadow: isDark
                      ? '0 25px 50px rgba(0, 0, 0, 0.5)'
                      : '0 25px 50px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[16px] font-semibold" style={{ color: isDark ? '#f0f0f5' : '#1a1a2e' }}>Quick Contact</h3>
                    <button
                      onClick={handleClose}
                      className={`transition-colors p-1 rounded-lg ${isDark ? 'text-[#9ca3af] hover:text-[#f0f0f5] hover:bg-white/[0.06]' : 'text-[#6b7280] hover:text-[#1a1a2e] hover:bg-black/[0.04]'}`}
                      aria-label="Close quick contact panel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Inline status feedback */}
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-2 text-green-600 text-[13px] mb-4 rounded-lg px-3 py-2 ${isDark ? 'bg-green-900/20' : 'bg-green-50'}`}
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      {statusMessage}
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-2 text-red-600 text-[13px] mb-4 rounded-lg px-3 py-2 ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}
                    >
                      <X className="w-4 h-4 shrink-0" />
                      {statusMessage}
                    </motion.div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label htmlFor="cta-name" className="sr-only">
                        Name
                      </label>
                      <input
                        id="cta-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full border focus:border-[#FF4800] rounded-lg px-3.5 py-2.5 text-[14px] placeholder-[#9ca3af] outline-none transition-colors disabled:opacity-50 ${isDark ? 'bg-[#12121e] border-[rgba(255,255,255,0.12)] text-[#f0f0f5]' : 'bg-white border-[#e5e7eb] text-[#1a1a2e]'}`}
                      />
                    </div>

                    <div>
                      <label htmlFor="cta-email" className="sr-only">
                        Email
                      </label>
                      <input
                        id="cta-email"
                        name="email"
                        type="email"
                        required
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full border focus:border-[#FF4800] rounded-lg px-3.5 py-2.5 text-[14px] placeholder-[#9ca3af] outline-none transition-colors disabled:opacity-50 ${isDark ? 'bg-[#12121e] border-[rgba(255,255,255,0.12)] text-[#f0f0f5]' : 'bg-white border-[#e5e7eb] text-[#1a1a2e]'}`}
                      />
                    </div>

                    <div>
                      <label htmlFor="cta-message" className="sr-only">
                        Message
                      </label>
                      <textarea
                        id="cta-message"
                        name="message"
                        required
                        rows={3}
                        placeholder="How can we help?"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full border focus:border-[#FF4800] rounded-lg px-3.5 py-2.5 text-[14px] placeholder-[#9ca3af] outline-none transition-colors resize-none disabled:opacity-50 ${isDark ? 'bg-[#12121e] border-[rgba(255,255,255,0.12)] text-[#f0f0f5]' : 'bg-white border-[#e5e7eb] text-[#1a1a2e]'}`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#FF4800] hover:bg-[#e63f00] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[14px] font-medium rounded-lg py-2.5 transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,72,0,0.3)] flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-[11px] text-center mt-3" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
                    We&apos;ll respond within 1 business day.
                  </p>

                  {/* Link to full contact page */}
                  <button
                    onClick={handleNavigateToContact}
                    className="w-full text-center text-[#FF4800] text-[13px] font-medium mt-2 hover:underline transition-colors"
                  >
                    Go to full contact form
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FAB — visible on all screen sizes */}
            <motion.button
              data-magnetic
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggle}
              onMouseEnter={() => { if (!isMobile) setShowTooltip(true); setCursorStyle('link') }}
              onMouseLeave={() => { setShowTooltip(false); setCursorStyle('default') }}
              className="fixed w-12 h-12 md:w-14 md:h-14 right-4 md:right-6 rounded-full bg-[#FF4800] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(255,72,0,0.4)] orange-pulse pulse-glow transition-shadow duration-200 hover:shadow-[0_4px_30px_rgba(255,72,0,0.6)] z-[47]"
              style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
              aria-label={isExpanded ? 'Close quick contact' : 'Open quick contact'}
            >
              {isExpanded ? (
                <X className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
              )}

              {/* Tooltip — desktop only */}
              <AnimatePresence>
                {showTooltip && !isExpanded && !isMobile && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[12px] font-medium px-3 py-1.5 rounded-lg shadow-lg pointer-events-none ${isDark ? 'bg-[#1e1e30] text-[#f0f0f5]' : 'bg-white text-[#1a1a2e]'}`}
                  >
                    Need help?
                    {/* Tooltip arrow */}
                    <span className={`absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent ${isDark ? 'border-l-[#1e1e30]' : 'border-l-white'}`} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
