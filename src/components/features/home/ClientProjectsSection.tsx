'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight, Quote, RotateCcw } from 'lucide-react';
import Image from 'next/image';

interface ClientProject {
  company: string;
  /** Client logo shown on the card; falls back to a typographic wordmark when omitted. */
  logo?: string;
  project: string;
  url: string;
  image: string;
  quote: string;
  author: string;
  role: string;
  accent: string;
}

const clientProjects: ClientProject[] = [
  {
    company: 'MegaClick',
    project: 'Tax & compliance services platform',
    logo: '/clients/megaclick-logo.png',
    url: 'https://mega-click-delta.vercel.app/',
    image: '/clients/megaclick.png',
    quote: 'Straveda gave us a clean, fast website that makes our registration and filing services easy to understand. Clients now reach out with the right questions from day one.',
    author: 'MegaClick Team',
    role: 'Founders',
    accent: '#0B4EA2',
  },
  {
    company: 'Everlive India',
    project: 'Ayurvedic products storefront',
    logo: '/clients/everlive-logo.webp',
    url: 'https://everliveindia.com/',
    image: '/clients/everlive.png',
    quote: 'The site captures "Ancient Ayurveda. Modern Science." perfectly. Our full herbal range is now easy to browse, and the design feels premium and trustworthy.',
    author: 'Everlive Team',
    role: 'Brand Owners',
    accent: '#0E9F8E',
  },
  {
    company: 'SMIDI Fertilizers',
    project: 'Plant nutrition catalogue & farmer portal',
    logo: '/clients/smidi-logo.png',
    url: 'https://www.smidifertilizers.com/',
    image: '/clients/smidi.png',
    quote: 'Our crop-specific products and farmer support programs are finally presented clearly in one place. Dealers and farmers find what they need in seconds.',
    author: 'SMIDI Team',
    role: 'Management',
    accent: '#2F8F3A',
  },
  {
    company: 'Atharva Enterprises',
    project: 'Electrical contractor website',
    logo: '/clients/atharva-logo.png',
    url: 'https://atharva-website-theta.vercel.app/',
    image: '/clients/atharva.png',
    quote: 'We wanted a site that reflects our licensed, professional work. Straveda delivered exactly that, on time and with a fixed price.',
    author: 'Atharva Team',
    role: 'Proprietors',
    accent: '#FF4800',
  },
  {
    company: 'Dhanwantari Hospital',
    project: 'Multispeciality hospital website',
    logo: '/clients/dhanwantari-logo.jpeg',
    url: 'https://dhanwantarihospital.co.in/',
    image: '/clients/dhanwantari.png',
    quote: 'Patients can now see our doctors, services and emergency number instantly and book appointments online. It reflects the trust we have built over 25 years.',
    author: 'Hospital Administration',
    role: 'Administration',
    accent: '#E8372C',
  },
];


function FlipCard({ item, index }: { item: ClientProject; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);

  const frame =
    'absolute inset-0 overflow-hidden rounded-[24px] border border-neutral-300/80 bg-white shadow-[0_14px_35px_rgba(0,0,0,0.08)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] dark:border-white/15 dark:bg-[#181824]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-[340px] select-none sm:h-[350px] lg:h-[360px]"
      style={{ perspective: '1600px' }}
    >
      <div
        className="relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d]"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* ── FRONT: project ── */}
        <div
          role="button"
          tabIndex={flipped ? -1 : 0}
          aria-label={`${item.company}: show client review`}
          onClick={toggle}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
          className={`${frame} flex cursor-pointer flex-col`}
        >
          <div className="relative min-h-0 flex-1 overflow-hidden bg-neutral-200">
            <Image
              src={item.image}
              alt={item.project}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="flex h-[76px] shrink-0 items-center justify-between border-t border-neutral-200 bg-white px-6 dark:border-white/15 dark:bg-[#181824] sm:h-[82px] sm:px-8">
            <div className="flex min-w-0 items-center gap-3 pr-4">
              {item.logo && (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 ring-1 ring-neutral-200">
                  <Image src={item.logo} alt={`${item.company} logo`} width={40} height={40} className="h-full w-full object-contain" />
                </span>
              )}
              <h3 className="truncate text-lg font-bold tracking-[-0.02em] text-neutral-950 dark:text-white sm:text-xl">
                {item.company}
              </h3>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-900 transition-colors duration-300 group-hover:bg-[#FF4800] group-hover:text-white dark:border-white/25 dark:text-white">
              <ArrowUpRight size={20} />
            </span>
          </div>
        </div>

        {/* ── BACK: review ── */}
        <div
          role="button"
          tabIndex={flipped ? 0 : -1}
          aria-label={`${item.company}: show project`}
          onClick={toggle}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
          className={`${frame} flex cursor-pointer flex-col justify-between p-5`}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div>
            <div className="flex items-start justify-between gap-3">
              {item.logo ? (
                <span className="flex h-11 items-center rounded-xl bg-white px-3 ring-1 ring-neutral-200"><Image src={item.logo} alt={`${item.company} logo`} width={140} height={36} className="h-8 w-auto max-w-[140px] object-contain" /></span>
              ) : (
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-white"
                    style={{ background: item.accent }}
                  >
                    {item.company.charAt(0)}
                  </span>
                  <span className="text-xl font-bold tracking-[-0.02em] text-neutral-950 dark:text-white">
                    {item.company}
                  </span>
                </div>
              )}
              <div className="flex shrink-0 gap-0.5 pt-1" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={16} className="fill-[#FF4800] text-[#FF4800]" />
                ))}
              </div>
            </div>

            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
              {item.project}
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-[#FF4800] hover:underline"
            >
              Visit website <ArrowUpRight size={14} />
            </a>

            <Quote className="mt-2 h-5 w-5 text-[#FF4800]" strokeWidth={2.5} />
            <p className="mt-2 line-clamp-4 text-[14px] leading-[1.6] text-neutral-700 dark:text-neutral-300 sm:text-[15px]">
              {item.quote}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-neutral-200 pt-4 dark:border-white/15">
            <div>
              <p className="text-base font-bold text-neutral-950 dark:text-white">{item.author}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {item.role}, {item.company}
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-900 transition-colors duration-300 hover:bg-[#FF4800] hover:text-white dark:border-white/25 dark:text-white">
              <RotateCcw size={18} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ClientProjectsSection() {
  const items = clientProjects;

  return (
    <section
      id="section-clients"
      className="relative overflow-hidden bg-[#F6F1E7] py-16 transition-colors duration-300 dark:bg-[#0a0a14] md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4800]">Our clients</p>
          <h2 className="max-w-3xl text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-neutral-950 dark:text-white sm:text-4xl md:text-[2.75rem]">
            Real projects. Real results. <span className="text-[#FF4800]">Flip a card to hear from the client</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {items.map((item, i) => (
            <FlipCard key={item.company} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
