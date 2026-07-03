'use client';

import { useRef, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingDown, Zap, CheckCircle, Bot } from 'lucide-react';
import { useTheme } from 'next-themes';

function usePrefetchContact() {
  const done = useRef(false);
  return () => {
    if (done.current) return;
    done.current = true;
    import('@/components/features/contact/ContactPage').catch(() => {});
  };
}


function NodeCard({
  pos,
  delay,
  floatAnim,
  floatDuration = 4.5,
  isDark,
  emoji,
  label,
  sub,
  status,
}: {
  pos: { left: number; top: number };
  delay: number;
  floatAnim: string;
  floatDuration?: number;
  isDark: boolean;
  emoji: string;
  label: string;
  sub: string;
  status: 'success' | 'active';
}) {
  const statusColor = status === 'success' ? '#4ade80' : '#FF4800';
  const statusLabel = status === 'success' ? 'Complete' : 'Running';
  const bg   = isDark ? 'rgba(15,15,28,0.88)' : 'rgba(255,255,255,0.88)';
  const bdr  = isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.95)';
  const shdw = isDark ? '0 8px 32px rgba(0,0,0,0.45)' : '0 4px 24px rgba(0,0,0,0.10)';
  const txt  = isDark ? '#f0f0f5' : '#0f172a';
  const muted = isDark ? '#94a3b8' : '#64748b';
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.55, delay }}
      style={{ position: 'absolute', left: `${pos.left}px`, top: `${pos.top}px`, zIndex: 8 }}
    >
      <div style={{ animation: `${floatAnim} ${floatDuration}s ease-in-out ${delay + 0.4}s infinite` }}>
        <div style={{
          width: '148px', borderRadius: '16px',
          background: bg,
          backdropFilter: 'blur(24px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
          border: bdr, boxShadow: shdw,
          padding: '11px 13px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
            <span style={{ fontSize: '15px', lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: txt, lineHeight: 1.2 }}>{label}</span>
          </div>
          <p style={{ fontSize: '10px', color: muted, margin: '0 0 6px 0', lineHeight: 1.3 }}>{sub}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: statusColor, boxShadow: `0 0 5px ${statusColor}`,
              flexShrink: 0,
              animation: status === 'active' ? 'pulse-dot 1.8s ease-in-out infinite' : undefined,
            }} />
            <span style={{ fontSize: '9.5px', fontWeight: 600, color: statusColor }}>{statusLabel}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface AnimatedHeroProps {
  onNavigate: (page: string) => void;
}

export default function AnimatedHero({ onNavigate }: AnimatedHeroProps) {
  const prefetchContact = usePrefetchContact();
  const { theme, resolvedTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  const cardBorder = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.07)';
  const cardShadow = isDark ? '0 8px 28px rgba(0,0,0,0.55)' : '0 8px 24px rgba(0,0,0,0.09)';
  const textPrimary = isDark ? '#f0f0f5' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <style>{`
        @keyframes fcard-up    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes fcard-down  { 0%,100%{transform:translateY(0)} 50%{transform:translateY( 9px)} }
        @keyframes pulse-dot   { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:.9;transform:scale(1.4)} }
        @keyframes wf-float-a  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes wf-float-b  { 0%,100%{transform:translateY(0)} 50%{transform:translateY( 7px)} }
        @keyframes wf-flow     { 0%{stroke-dashoffset:0} 100%{stroke-dashoffset:-20} }
        @keyframes hub-ring    { 0%,100%{box-shadow:0 8px 32px rgba(255,72,0,0.40),0 0 0 0 rgba(255,72,0,0.18)} 50%{box-shadow:0 12px 40px rgba(255,72,0,0.58),0 0 0 9px rgba(255,72,0,0)} }
      `}</style>

      {/* ── Spotlight background — directional radial gradient shading ── */}
      <div aria-hidden="true" className="absolute inset-0" style={{ zIndex: 0 }}>
        {/* Base colour */}
        <div className="absolute inset-0" style={{
          background: isDark ? '#06060c' : '#fdfcf9',
        }} />
        {/* Primary spotlight — strong orange glow from bottom-left */}
        <div className="absolute inset-0" style={{
          background: isDark
            ? 'radial-gradient(ellipse 95% 85% at -2% 108%, rgba(255,72,0,0.55) 0%, rgba(180,50,0,0.28) 28%, rgba(30,10,0,0.18) 50%, transparent 70%)'
            : 'radial-gradient(ellipse 95% 85% at -2% 108%, rgba(255,90,10,0.32) 0%, rgba(255,140,60,0.18) 28%, rgba(255,210,150,0.08) 52%, transparent 72%)',
        }} />
        {/* Secondary fill — warm halo around text area */}
        <div className="absolute inset-0" style={{
          background: isDark
            ? 'radial-gradient(ellipse 60% 55% at 28% 72%, rgba(255,72,0,0.12) 0%, transparent 65%)'
            : 'radial-gradient(ellipse 60% 55% at 28% 72%, rgba(255,120,40,0.10) 0%, transparent 65%)',
        }} />
        {/* Edge vignette — darkens corners away from spotlight */}
        <div className="absolute inset-0" style={{
          background: isDark
            ? 'radial-gradient(ellipse 70% 80% at 75% 20%, rgba(0,0,0,0.55) 0%, transparent 60%)'
            : 'radial-gradient(ellipse 70% 80% at 78% 15%, rgba(240,235,228,0.55) 0%, transparent 62%)',
        }} />
      </div>

      {/* ── Two-column layout ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10 md:pt-24 md:pb-12 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-10 items-center">

        {/* ─── LEFT: Text content ─────────────────────────── */}
        <div className="flex flex-col text-center lg:text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center lg:justify-start mb-5"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold"
              style={{
                background: isDark ? 'rgba(255,72,0,0.15)' : 'rgba(255,72,0,0.09)',
                border: '1px solid rgba(255,72,0,0.28)',
                color: '#FF4800',
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ background: '#FF4800', animation: 'pulse-dot 2.5s ease-in-out infinite' }}
              />
              AI Studio · Pune, India
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-bold mb-5"
            style={{
              fontSize: 'clamp(1.9rem, 3.2vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              color: textPrimary,
            }}
          >
            AI that eliminates work.{' '}
            <span style={{ color: '#FF4800' }}>Software that runs your operations.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-[480px] mx-auto lg:mx-0 text-[16px] leading-[1.8]"
            style={{ color: textMuted }}
          >
            We build AI-powered business systems and custom software for mid-market companies in India — cutting manual work by 50% in 90 days.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="mt-7 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
          >
            <motion.button
              type="button"
              onClick={() => onNavigate('contact')}
              onMouseEnter={prefetchContact}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-[15px] text-[15px] font-bold text-white"
              style={{ background: '#FF4800', boxShadow: '0 10px 32px rgba(255,72,0,0.42)' }}
            >
              Book Strategy Call <ArrowUpRight className="h-4 w-4" />
            </motion.button>

            <motion.button
              type="button"
              onClick={() => onNavigate('services')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border px-8 py-[14px] text-[14px] font-medium transition-colors duration-200"
              style={{
                background: 'transparent',
                borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(15,23,42,0.2)',
                color: isDark ? 'rgba(255,255,255,0.75)' : '#334155',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              See What We Build <ArrowUpRight className="h-4 w-4" />
            </motion.button>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.58 }}
            className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2"
          >
            {['Fixed price quote', 'Weekly delivery', 'Full code ownership'].map(item => (
              <span key={item} className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: textMuted }}>
                <CheckCircle className="h-3.5 w-3.5 shrink-0" style={{ color: '#FF4800' }} />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ─── RIGHT: Flat floating UI cards ─────────── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:flex items-center justify-center w-full"
          style={{ minHeight: '520px' }}
        >
          <div style={{ position: 'relative', width: '560px', height: '480px', flexShrink: 0 }}>

            {/* ── Center Image: Dashboard ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ position: 'absolute', left: '60px', top: '70px', zIndex: 10, width: '440px' }}
            >
              <div style={{
                filter: isDark ? 'drop-shadow(0px 20px 40px rgba(0,0,0,0.5))' : 'drop-shadow(0px 20px 40px rgba(0,0,0,0.06))',
                animation: 'wf-float-a 6s ease-in-out infinite',
              }}>
                <img
                  src="/images/center_dashboard_light.png"
                  alt="AI Dashboard Interface"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '20px',
                    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
                  }}
                />
              </div>
            </motion.div>

            {/* ── Side Image 1: Cost Saved (Top Left) ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              style={{ position: 'absolute', left: '10px', top: '20px', zIndex: 12, width: '180px' }}
            >
              <div style={{
                filter: isDark ? 'drop-shadow(0px 15px 30px rgba(0,0,0,0.5))' : 'drop-shadow(0px 15px 30px rgba(0,0,0,0.06))',
                animation: 'wf-float-b 5.2s ease-in-out 0.4s infinite',
              }}>
                <img
                  src="/images/cost_saved_card.png"
                  alt="Cost Saved 60%"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.06)',
                  }}
                />
              </div>
            </motion.div>

            {/* ── Side Image 2: Time to Live (Bottom Right) ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              style={{ position: 'absolute', right: '-40px', bottom: '10px', zIndex: 11, width: '200px' }}
            >
              <div style={{
                filter: isDark ? 'drop-shadow(0px 15px 30px rgba(0,0,0,0.5))' : 'drop-shadow(0px 15px 30px rgba(0,0,0,0.06))',
                animation: 'wf-float-a 4.8s ease-in-out 0.8s infinite',
              }}>
                <img
                  src="/images/time_to_live_card.png"
                  alt="Time To Live 90 Days"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.06)',
                  }}
                />
              </div>
            </motion.div>

            {/* ── AI Agent Active Pill (Top Right, recreated in HTML) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{ position: 'absolute', right: '50px', top: '35px', zIndex: 9 }}
            >
              <div style={{
                animation: 'wf-float-a 5s ease-in-out 0.6s infinite',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(255,72,0,0.08)',
                  border: '1px solid rgba(255,72,0,0.2)',
                  borderRadius: '100px',
                  padding: '8px 16px',
                  backdropFilter: 'blur(8px)',
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF4800', boxShadow: '0 0 6px #FF4800', animation: 'pulse-dot 2s infinite' }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#FF4800' }}>AI Agent Active</span>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Mobile: compact metric pills below text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="lg:hidden absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 flex-wrap justify-center"
      >
        {[
          { icon: TrendingDown, value: '−50%', label: 'Manual Work' },
          { icon: Zap, value: '3–5×', label: 'Efficiency' },
        ].map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-full px-4 py-2.5 backdrop-blur-sm"
            style={{ background: isDark ? 'rgba(12,12,24,0.9)' : 'rgba(255,255,255,0.95)', border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}
          >
            <Icon className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
            <span className="text-[13px] font-black" style={{ color: isDark ? '#f0f0f5' : '#0f172a', letterSpacing: '-0.5px' }}>{value}</span>
            <span className="text-[11px]" style={{ color: textMuted }}>{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          zIndex: 5,
          background: `linear-gradient(to bottom, transparent, ${isDark ? '#06060c' : '#fdfcf9'})`,
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[11px] uppercase tracking-widest" style={{ color: '#94a3b8' }}>Scroll</span>
          <div
            className="flex h-8 w-5 items-start justify-center rounded-full pt-1.5"
            style={{ border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(43,35,88,0.25)'}` }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-2 w-1 rounded-full"
              style={{ background: '#FF4800' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
