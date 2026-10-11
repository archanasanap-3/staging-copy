'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useCursorStyle } from '@/lib/cursor-context';

const FOOTER_LINKS = {
  EXPLORE: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {label: 'Commerce OS', href: '/commerce-os'},
    { label: 'Careers', href: '/careers' },
  ],
  SERVICES: [
    { label: 'AI & Automation', href: '/services#automation' },
    { label: 'Custom Software', href: '/services#custom-software' },
    { label: 'AI Strategy & Integration', href: '/services#ai-strategy' },
    { label: 'Web Development & 3D', href: '/services#web-development' },
  ],
} as const;

/* Shared dark-mode-safe social icon class */
const SOCIAL_CLS =
  'w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_4px_16px_rgba(120,60,20,0.15)] ' +
  'text-[#FF4800] hover:bg-[#FF4800] hover:text-white transition-all cursor-pointer';

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { setCursorStyle } = useCursorStyle();

  return (
    <div className="mt-auto bg-[#F6F1E7] dark:bg-[#0a0a14]">
    <footer
      ref={footerRef}
      className="relative overflow-hidden rounded-t-[32px] bg-gradient-to-br from-[#FFD0B2] via-[#FFBD94] to-[#FFA877] pt-10 pb-5 text-[#2b1608] dark:from-[#2b1608] dark:via-[#1f1209] dark:to-[#14110c] dark:text-white md:rounded-t-[48px] md:pt-12"
      onMouseEnter={() => setCursorStyle('nav')}
      onMouseLeave={() => setCursorStyle('default')}
    >
      {/* Subtle brand glow */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF4800]/40 to-transparent" />
        <div className="absolute -right-[10%] -top-[30%] h-[70%] w-[45%] rounded-full bg-[#FF4800]/[0.10] blur-[120px]" />
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 z-[1] flex items-end justify-center overflow-hidden px-4 pointer-events-none select-none" aria-hidden="true">
        <span
          className="translate-y-[18%] text-[20vw] font-bold uppercase leading-none tracking-tighter text-[#FF4800]/[0.07] dark:text-white/[0.04]"
          style={{ fontFamily: 'var(--font-plus-jakarta-sans), "Plus Jakarta Sans", system-ui, sans-serif' }}
        >
          Straveda
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex justify-center">

        {/* MOBILE */}
        <div className="flex flex-col items-center text-center md:hidden pb-2">
          <div className="relative h-16 w-64 -my-1 mb-1">
            <Image src="/logos/main_logo.png" alt="Straveda" fill sizes="288px" className="object-contain dark:hidden" />
            <Image src="/logos/blackmain_logo.png" alt="Straveda" fill sizes="288px" className="object-contain hidden dark:block" />
          </div>
          <p className="text-[13px] text-[#2b1608]/75 dark:text-white/80 font-medium mb-5">
            Exceptional value. Cost effective solutions.
          </p>

          <div className="grid grid-cols-2 gap-x-10 gap-y-4 mb-6 w-full max-w-xs">
            {Object.values(FOOTER_LINKS).flat().slice(0, 8).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] font-medium text-[#2b1608]/85 dark:text-white/85 hover:text-[#FF4800] dark:hover:text-[#FF4800] transition-colors transition-colors text-center"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex gap-3 mb-6">
            <a href="https://www.linkedin.com/company/straveda-tech/" target="_blank" rel="noopener noreferrer" aria-label="Straveda on LinkedIn" className={SOCIAL_CLS}><LinkedInIcon /></a>
            <a href="https://www.instagram.com/stravedaofficial/" target="_blank" rel="noopener noreferrer" aria-label="Straveda on Instagram" className={SOCIAL_CLS}><InstagramIcon /></a>
            <a href="https://wa.me/919623095766" target="_blank" rel="noopener noreferrer" aria-label="Straveda on WhatsApp" className={SOCIAL_CLS}><WhatsAppIcon /></a>
          </div>

          <div className="border-t border-[#2b1608]/15 dark:border-white/10 pt-4 w-full flex flex-col items-center gap-2 text-[11px] font-semibold text-[#2b1608]/60 dark:text-white/50 uppercase tracking-[0.18em]">
            <p>© 2026 Straveda Tech. All rights reserved.</p>
            <div className="flex gap-6 normal-case tracking-normal text-[13px] font-bold text-[#2b1608]/75 dark:text-white/70">
              <Link href="/privacy-policy" className="hover:text-[#FF4800] transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>

       {/* DESKTOP */}
<div className="hidden md:block">

  <div className="grid grid-cols-4 gap-x-12 gap-y-6 mb-5 items-start w-full max-w-[1500px] mx-auto">

    {/* Brand */}
    <div className="space-y-3 flex flex-col items-center">
      <div>
        <div className="relative h-16 w-64 -my-1">
          <Image src="/logos/main_logo.png" alt="Straveda" fill sizes="224px" className="object-contain object-center dark:hidden" />
          <Image src="/logos/blackmain_logo.png" alt="Straveda" fill sizes="224px" className="object-contain object-center hidden dark:block" />
        </div>

        <p className="mt-2 text-[14px] text-[#2b1608]/75 dark:text-white/80 font-medium leading-snug max-w-[280px] text-center">
          Exceptional value.<br />
          Cost effective solutions.
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <a
          href="https://www.linkedin.com/company/straveda-tech/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Straveda on LinkedIn"
          className={SOCIAL_CLS}
        >
          <LinkedInIcon />
        </a>

        <a
          href="https://www.instagram.com/stravedaofficial/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Straveda on Instagram"
          className={SOCIAL_CLS}
        >
          <InstagramIcon />
        </a>

        <a
          href="https://wa.me/919623095766"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Straveda on WhatsApp"
          className={SOCIAL_CLS}
        >
          <WhatsAppIcon />
        </a>
      </div>
    </div>

    {/* Explore & Services */}
    {Object.entries(FOOTER_LINKS).map(([title, links]) => (
  <div
    key={title}
    className={`space-y-3 text-left ${
      title === 'EXPLORE' ? 'md:ml-20' : ''
    }`}
  >
        <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E03A00] dark:text-[#ff6b2b]">
          {title}
        </h3>

        <ul className="space-y-1.5">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[14px] font-medium text-[#2b1608]/85 dark:text-white/85 hover:text-[#FF4800] dark:hover:text-[#FF4800] transition-colors transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}

    {/* Contact */}
    <div className="space-y-3 text-left">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E03A00] dark:text-[#ff6b2b]">
        CONTACT US
      </h3>

      <div className="space-y-3 text-[14px] font-medium text-[#2b1608]/85 dark:text-white/85">

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=stravedatech@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-start gap-3 group"
        >
          <Mail
            size={18}
            className="shrink-0 text-[#FF4800]"
          />
          <span className="hover:text-[#FF4800] transition-colors">
            stravedatech@gmail.com
          </span>
        </a>

        <a
          href="tel:+919623095766"
          className="flex items-center justify-start gap-3 group"
        >
          <Phone
            size={18}
            className="shrink-0 text-[#FF4800]"
          />
          <span>+91 96230 95766</span>
        </a>

        <div className="flex items-start justify-start gap-3">
          <MapPin
            size={18}
            className="mt-1 shrink-0 text-[#FF4800]"
          />

          <span className="leading-5">
            Pune, Maharashtra
            <br />
            411001, India
          </span>
        </div>

      </div>
    </div>

  </div>
          <div className="pt-4 border-t border-[#2b1608]/15 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] font-semibold text-[#2b1608]/60 dark:text-white/50 uppercase tracking-[0.18em]">
            <p>© 2026 Straveda Tech. All rights reserved.</p>
            <div className="flex gap-10 normal-case tracking-normal text-[13px] font-bold text-[#2b1608]/75 dark:text-white/70">
  <Link
    href="/privacy-policy"
    className="hover:text-[#FF4800] transition-colors duration-300"
  >
    Privacy Policy
  </Link>

</div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}