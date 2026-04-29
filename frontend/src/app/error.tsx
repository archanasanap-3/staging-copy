'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowLeft, RotateCw, Home } from 'lucide-react'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    document.title = 'Error — Straveda'
  }, [])

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    checkDark()

    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  const bg = isDark ? '#0a0a14' : '#FFFFFF'
  const textPrimary = isDark ? '#f0f0f5' : '#1a1a2e'
  const textSecondary = isDark ? '#9ca3af' : '#6b7280'
  const cardBg = isDark ? 'rgba(18,18,30,0.8)' : 'rgba(255,255,255,0.9)'
  const cardBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative"
      style={{ backgroundColor: bg }}
    >
      {/* Animated background pattern */}
      <div
        aria-hidden="true"
        className="fixed inset-0 overflow-hidden pointer-events-none"
      >
        {/* Gradient orbs */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FF4800 0%, transparent 70%)',
            animation: 'error-orb-1 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #2B2358 0%, transparent 70%)',
            animation: 'error-orb-2 10s ease-in-out infinite',
          }}
        />
        {/* Dot grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="error-dot-pattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill={isDark ? '#f0f0f5' : '#1a1a2e'} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#error-dot-pattern)" />
        </svg>
      </div>

      <style>{`
        @keyframes error-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.1); }
        }
        @keyframes error-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.05); }
        }
        @keyframes error-pulse-ring {
          0% { transform: scale(0.8); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
      `}</style>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden"
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: isDark
              ? '0 4px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.03)'
              : '0 4px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)',
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #FF4800, #2B2358, transparent)',
            }}
          />

          {/* Icon with pulsing ring */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="relative mx-auto mb-6 w-20 h-20 flex items-center justify-center"
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid #FF4800',
                animation: 'error-pulse-ring 2s ease-out infinite',
              }}
            />
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255,72,0,0.1), rgba(43,35,88,0.1))',
                border: '1px solid rgba(255,72,0,0.2)',
              }}
            >
              <AlertTriangle
                size={32}
                style={{ color: '#FF4800' }}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold mb-3"
            style={{ color: textPrimary }}
          >
            Something went wrong
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm sm:text-base mb-8 leading-relaxed"
            style={{ color: textSecondary }}
          >
            An unexpected error has occurred. Our team has been notified
            and we&apos;re working to resolve this issue.
          </motion.p>

          {/* Error digest */}
          {error.digest && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="text-xs mb-6 px-3 py-1.5 rounded-full inline-block"
              style={{
                color: textSecondary,
                backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                border: `1px solid ${cardBorder}`,
              }}
            >
              Error ID: {error.digest}
            </motion.p>
          )}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button
              onClick={reset}
              aria-label="Try reloading the page"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #FF4800, #e03e00)',
                boxShadow: '0 2px 12px rgba(255,72,0,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,72,0,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(255,72,0,0.3)'
              }}
            >
              <RotateCw size={16} />
              Try Again
            </button>

            <a
              href="/"
              aria-label="Navigate to the Straveda homepage"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                color: textPrimary,
                backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                border: `1px solid ${cardBorder}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.borderColor = 'rgba(255,72,0,0.3)'
                e.currentTarget.style.backgroundColor = isDark
                  ? 'rgba(255,72,0,0.08)'
                  : 'rgba(255,72,0,0.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = cardBorder
                e.currentTarget.style.backgroundColor = isDark
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(0,0,0,0.04)'
              }}
            >
              <Home size={16} />
              Go Home
            </a>
          </motion.div>
        </motion.div>

        {/* Footer support link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center text-xs mt-6"
          style={{ color: textSecondary }}
        >
          If the problem persists, please{' '}
          <a
            href="/"
            className="inline-flex items-center gap-1 transition-colors duration-200"
            style={{ color: '#FF4800' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none'
            }}
            aria-label="Contact Straveda support team"
          >
            contact our support team
            <ArrowLeft size={12} style={{ transform: 'rotate(180deg)' }} aria-hidden="true" />
          </a>
        </motion.p>
      </div>
    </div>
  )
}
