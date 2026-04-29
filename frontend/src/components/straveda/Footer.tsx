'use client';

import { useRef } from 'react';
import { Mail, MapPin, ArrowUp } from 'lucide-react';
import { useCursorStyle } from '@/lib/cursor-context';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const FOOTER_LINKS = {
  EXPLORE: [
    { label: 'Home', page: 'home' },
    { label: 'What We Build', page: 'services' },
    { label: 'Why Straveda', page: 'about' },
    { label: 'Insights', page: 'insights' },
    { label: 'Careers', page: 'careers' },
    { label: 'Contact', page: 'contact' },
  ],
  SERVICES: [
    { label: 'AI & Automation', page: 'services' },
    { label: 'Custom Software', page: 'services' },
    { label: 'AI Strategy & Integration', page: 'services' },
    { label: 'Web Development & 3D', page: 'services' },
  ],
  RESOURCES: [
    { label: 'Insights (Blog)', page: 'insights' },
    { label: 'Discovery Call Guide', page: 'contact' },
    { label: 'Pricing & Timeline', page: 'contact' },
    { label: 'Contact Us', page: 'contact' },
  ],
} as const;

export default function Footer({ onNavigate }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const { setCursorStyle } = useCursorStyle();

  return (
    <footer
      ref={footerRef}
      className="relative mt-auto overflow-hidden bg-[#fffaf8] py-10 pb-6 dark:bg-[#0a0a14]"
      onMouseEnter={() => setCursorStyle('nav')}
      onMouseLeave={() => setCursorStyle('default')}
    >
      {/* ── 1. BACKGROUND GRADIENTS ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute -right-[10%] -top-[20%] w-[70%] h-[140%] rounded-full opacity-[0.65] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #FF4800 0%, #ff8c00 100%)' }}
        />
        <div 
          className="absolute -left-[5%] bottom-[-10%] w-[50%] h-[70%] rounded-full opacity-[0.3] blur-[100px]"
          style={{ background: 'radial-gradient(circle, #ffebd5 0%, #FF4800 100%)' }}
        />
      </div>

      {/* ── 2. EXACT EVERLIVE WATERMARK (Solid & Sharp) ── */}
      <div className="absolute inset-0 z-1 flex items-end justify-center px-4 pb-4 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="text-[20vw] font-bold uppercase tracking-tighter"
          style={{ 
            color: 'rgba(15, 23, 42, 0.06)', // Slightly darker for visibility
            fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
            lineHeight: '0.6',
            marginBottom: '20px',
          }}>
          Straveda
        </span>
      </div>

      {/* ── 3. MAIN CONTENT (High Visibility) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* ── MOBILE-STACKED LAYOUT (< md) ── */}
        <div className="flex flex-col items-center text-center md:hidden pb-2">

          {/* Logo */}
          <span className="text-2xl font-black tracking-tighter text-[#0f172a] dark:text-white mb-1">
            Str<span className="text-[#FF4800]">a</span>veda
          </span>
          <p className="text-[13px] text-[#0f172a] dark:text-gray-300 font-medium mb-5">
            Exceptional value. Cost effective solutions.
          </p>

          {/* Two-column link grid */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-4 mb-6 w-full max-w-xs">
            {Object.values(FOOTER_LINKS).flat().slice(0, 8).map((link: { label: string; page: string }) => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.page)}
                className="text-[13px] font-semibold text-[#0f172a] dark:text-gray-200 hover:text-[#FF4800] transition-colors text-center"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex gap-3 mb-6">
            <a
              href="https://linkedin.com/company/straveda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Straveda on LinkedIn"
              className="w-11 h-11 rounded-full border-2 border-[#0f172a]/10 flex items-center justify-center text-[#0f172a] hover:bg-[#FF4800] hover:text-white hover:border-[#FF4800] transition-all cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com/straveda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Straveda on Instagram"
              className="w-11 h-11 rounded-full border-2 border-[#0f172a]/10 flex items-center justify-center text-[#0f172a] hover:bg-[#FF4800] hover:text-white hover:border-[#FF4800] transition-all cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>

          {/* Legal */}
          <div className="border-t-2 border-[#0f172a]/5 pt-4 w-full flex flex-col items-center gap-2 text-[11px] font-black text-[#0f172a]/40 uppercase tracking-[0.2em]">
            <p>© 2026 Straveda Tech. All rights reserved.</p>
            <div className="flex gap-6">
              <button className="hover:text-[#FF4800]">Privacy Policy</button>
              <button className="hover:text-[#FF4800]">Terms of Service</button>
            </div>
          </div>
        </div>

        {/* ── DESKTOP GRID LAYOUT (md+) ── */}
        <div className="hidden md:block">
          {/* Back to Top */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#0f172a] hover:text-[#FF4800] transition-colors"
            >
              <ArrowUp size={14} strokeWidth={3} /> BACK TO TOP
            </button>
          </div>

          <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-8 mb-8">

            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <div>
                <span className="text-2xl font-black tracking-tighter text-[#0f172a] dark:text-white">
                  Str<span className="text-[#FF4800]">a</span>veda
                </span>
                <p className="mt-2 text-[14px] text-[#0f172a] dark:text-gray-300 font-bold leading-snug max-w-[280px]">
                  Exceptional value.<br/>Cost effective solutions.
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com/company/straveda"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Straveda on LinkedIn"
                  className="w-11 h-11 rounded-full border-2 border-[#0f172a]/10 flex items-center justify-center text-[#0f172a] hover:bg-[#FF4800] hover:text-white hover:border-[#FF4800] transition-all cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/straveda"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Straveda on Instagram"
                  className="w-11 h-11 rounded-full border-2 border-[#0f172a]/10 flex items-center justify-center text-[#0f172a] hover:bg-[#FF4800] hover:text-white hover:border-[#FF4800] transition-all cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Links Columns */}
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="lg:col-span-2 space-y-3">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#FF4800]">{title}</h3>
                <ul className="space-y-2">
                  {links.map((link: { label: string; page: string }) => (
                    <li key={link.label}>
                      <button
                        onClick={() => onNavigate(link.page)}
                        className="text-[13px] font-bold text-[#0f172a] dark:text-gray-200 hover:text-[#FF4800] transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-[#FF4800]">CONTACT US</h3>
              <div className="space-y-3 text-[13px] font-bold text-[#0f172a] dark:text-gray-200">
                <a href="mailto:hello@straveda.com" className="flex items-center gap-3 group">
                  <Mail size={18} className="text-[#FF4800] shrink-0" />
                  <span className="border-b-2 border-[#0f172a]/10 group-hover:border-[#FF4800] transition-all">hello@straveda.com</span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#FF4800] mt-1 shrink-0" />
                  <span className="leading-tight">Pune, Maharashtra<br/>411001, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-5 border-t-2 border-[#0f172a]/5 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] font-black text-[#0f172a]/40 uppercase tracking-[0.2em]">
            <p>© 2026 Straveda Tech. All rights reserved.</p>
            <div className="flex gap-10">
              <button className="hover:text-[#FF4800]">Privacy Policy</button>
              <button className="hover:text-[#FF4800]">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}