
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Send,
  Bot,
  Users,
  BarChart3,
  Check,
  CheckCheck,
  Smile,
  Paperclip,
  Camera,
  Mic,
  ChevronLeft,
  Phone,
  Video,
  MoreVertical,
} from 'lucide-react';

interface Props {
  isDark?: boolean;
}

const barChartData = [
  { day: 'Mon', value: 58 },
  { day: 'Tue', value: 88 },
  { day: 'Wed', value: 45 },
  { day: 'Thu', value: 80 },
  { day: 'Fri', value: 72 },
  { day: 'Sat', value: 92 },
];

const customerPersonas = [
  {
    id: 1,
    name: 'High Engagement',
    icon: '📈',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Fast Response',
    icon: '⚡',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Active Users',
    icon: '👥',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Converted Leads',
    icon: '✅',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
  },
];

const bottomActionButtons = [
  { id: 'better-decisions', label: 'Better Decisions', icon: '📊' },
  { id: 'improve-campaigns', label: 'Improve Campaigns', icon: '🚀' },
  { id: 'increase-engagement', label: 'Increase Engagement', icon: '💬' },
  {
    id: 'track-everything',
    label: 'Track Everything in One Place',
    icon: '📈',
  },
];

const featureHighlights = [
  {
    icon: Send,
    title: 'Campaigns',
    description: 'Send and schedule customer messages.',
  },
  {
    icon: Bot,
    title: 'AI Chatbots',
    description: 'Automate replies to common questions.',
  },
  {
    icon: Users,
    title: 'Lead Management',
    description: 'Organize enquiries and follow-ups.',
  },
  {
    icon: BarChart3,
    title: 'Reports & Analytics',
    description: 'Track campaign performance.',
  },
];

export default function SandesaGrowthSection({ isDark }: Props) {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;

      if (width < 920) {
        setScale(Math.max(0.36, width / 910));
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const STAGE_WIDTH = 900;
  const STAGE_HEIGHT = 385;

  return (
    <section className="relative overflow-hidden bg-[#F6F1E7] pt-8 pb-12 transition-colors duration-300 dark:bg-[#0a0a14] sm:pt-10 sm:pb-16 md:pt-12 md:pb-20">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          background:
            'radial-gradient(circle at 75% 35%, rgba(255, 72, 0, 0.12) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="mb-6 text-left sm:mb-8">
          <div className="mb-3 inline-flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 animate-pulse rounded-full bg-[#FF4800] ring-4 ring-[#FF4800]/20" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF4800]">
              BUILT BY STRAVEDA · SANDESA AI
            </span>
          </div>

          {/* Updated heading: Sandesa alone is blue */}
          <h2 className="text-2xl font-bold leading-[1.18] tracking-tight text-neutral-950 dark:text-white sm:text-3xl md:text-4xl lg:text-[42px]">
            Meet{' '}
            <span className="text-[#1769FF]">Sandesa</span>{' '}
            WhatsApp Business Platform, Powered by AI
          </h2>

          {/* Single line on desktop; wraps on smaller screens */}
          <p className="mt-3 max-w-none whitespace-normal text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base lg:whitespace-nowrap">
            Send campaigns, automate customer conversations, manage enquiries,
            and use AI to support your customers—all from one platform.
          </p>

          {/* Action CTAs */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="https://sandesaai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#FF4800] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#e03e00] hover:shadow-md sm:text-sm"
            >
              <span>Explore Sandesa AI</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-white/20 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-5 sm:w-5">
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </span>
            </a>

            <a
              href="https://sandesaai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-neutral-300/80 bg-white/80 px-5 py-2.5 text-xs font-semibold text-neutral-800 backdrop-blur-sm transition-all duration-200 hover:border-neutral-400 hover:bg-white hover:text-black dark:border-neutral-700/80 dark:bg-neutral-800/80 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white sm:text-sm"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Main Showcase Stage */}
        <div
          ref={containerRef}
          className="relative mx-auto mt-4 flex w-full justify-center overflow-hidden sm:mt-6"
        >
          <div
            style={{
              width: STAGE_WIDTH,
              height: STAGE_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              marginBottom: `${(scale - 1) * STAGE_HEIGHT}px`,
            }}
            className="relative shrink-0"
          >
            {/* 1. LEFT: Analytics Window */}
            <div className="absolute left-0 top-[15px] z-10 w-[345px]">
              <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:border-neutral-800 dark:bg-[#161622]">
                {/* Mac dots */}
                <div className="mb-3 flex items-center gap-1.5 border-b border-neutral-100 pb-2 dark:border-neutral-800">
                  <span className="h-2 w-2 rounded-full bg-[#FF5F56]" />
                  <span className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
                  <span className="h-2 w-2 rounded-full bg-[#27C93F]" />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Message Performance */}
                  <div className="flex flex-col justify-between">
                    <p className="text-[11px] font-bold text-neutral-800 dark:text-neutral-200">
                      Message Performance
                    </p>

                    <div className="mt-2 flex h-[72px] items-end justify-between gap-1 pt-1">
                      {barChartData.map((item, idx) => (
                        <div
                          key={item.day}
                          className="flex flex-1 flex-col items-center gap-1"
                        >
                          <div className="relative flex h-[55px] w-full max-w-[11px] items-end overflow-hidden rounded-t-sm bg-[#E9ECEF] dark:bg-neutral-800">
                            <motion.div
                              initial={{ height: 0 }}
                              whileInView={{ height: `${item.value}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.7,
                                delay: idx * 0.08,
                              }}
                              className="w-full rounded-t-sm bg-[#25D366]"
                            />
                          </div>
                          <span className="text-[8.5px] font-medium text-neutral-400 dark:text-neutral-500">
                            {item.day}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Split */}
                  <div className="flex flex-col items-center justify-between">
                    <p className="w-full text-left text-[11px] font-bold text-neutral-800 dark:text-neutral-200">
                      Engagement Split
                    </p>

                    <div className="relative my-auto flex h-[68px] w-[68px] items-center justify-center">
                      <svg
                        viewBox="0 0 36 36"
                        className="h-full w-full -rotate-90"
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="none"
                          stroke="#00A3FF"
                          strokeWidth="5.5"
                          strokeDasharray="30 100"
                          strokeDashoffset="0"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="none"
                          stroke="#FF7A00"
                          strokeWidth="5.5"
                          strokeDasharray="25 100"
                          strokeDashoffset="-30"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="none"
                          stroke="#25D366"
                          strokeWidth="5.5"
                          strokeDasharray="45 100"
                          strokeDashoffset="-55"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom statistics */}
                <div className="mt-3 grid grid-cols-3 gap-1.5 border-t border-neutral-100 pt-2 text-left dark:border-neutral-800">
                  <div>
                    <span className="block text-[9.5px] text-neutral-500 dark:text-neutral-400">
                      Delivery Rate %
                    </span>
                    <span className="text-[13.5px] font-bold text-neutral-900 dark:text-white">
                      69.1%
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9.5px] text-neutral-500 dark:text-neutral-400">
                      Read Rate %
                    </span>
                    <span className="text-[13.5px] font-bold text-neutral-900 dark:text-white">
                      98%
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9.5px] text-neutral-500 dark:text-neutral-400">
                      Click/Reply Rate %
                    </span>
                    <span className="text-[13.5px] font-bold text-neutral-900 dark:text-white">
                      32%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Analytics badge */}
            <div className="absolute left-0 top-[292px] z-30">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/90 bg-white/95 px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-sm dark:border-neutral-800 dark:bg-[#161622] dark:text-neutral-200">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span>Campaign Analytics</span>
              </div>
            </div>

            {/* Campaign Success badge */}
            <div className="absolute left-[268px] top-[292px] z-30">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/90 bg-white/95 px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-md backdrop-blur-sm dark:border-neutral-800 dark:bg-[#161622] dark:text-neutral-200">
                <span>Campaign Success</span>
                <span>📊</span>
              </div>
            </div>

            {/* 2. CENTER: Smartphone Mockup */}
            <div className="absolute left-[312px] top-[5px] z-20 w-[240px]">
              <div className="relative rounded-[32px] bg-[#121111] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-black/20 dark:ring-white/10">
                {/* Dynamic Island */}
                <div className="absolute left-1/2 top-2.5 z-30 flex h-3 w-14 -translate-x-1/2 items-center justify-end rounded-full bg-black px-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#1e1e1e]" />
                </div>

                {/* Phone Screen */}
                <div className="relative flex h-[350px] flex-col overflow-hidden rounded-[24px] bg-[#EFEAE2]">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-4 pt-1.5 pb-0.5 text-[9.5px] font-semibold text-neutral-800">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[8.5px]">●●●●</span>
                      <span className="text-[8.5px]">📶</span>
                      <span className="text-[8.5px]">🔋</span>
                    </div>
                  </div>

                  {/* WhatsApp header */}
                  <div className="flex items-center justify-between bg-[#008069] px-2 py-1 text-white shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <ChevronLeft size={15} />
                      <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[9px] font-bold">
                        <span>W</span>
                        <span className="absolute -right-0.5 -bottom-0.5 flex h-2 w-2 items-center justify-center rounded-full bg-[#25D366] text-[5px] text-white">
                          <Check size={6} strokeWidth={3} />
                        </span>
                      </div>
                      <span className="text-[10.5px] font-semibold">
                        WhatsApp
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/90">
                      <Video size={11} />
                      <Phone size={10} />
                      <MoreVertical size={11} />
                    </div>
                  </div>

                  {/* Chat content */}
                  <div className="relative flex-1 space-y-1.5 overflow-hidden px-2 py-1.5">
                    <div className="flex justify-center">
                      <span className="rounded-md bg-white/80 px-2 py-0.5 text-[8.5px] font-medium text-neutral-500 shadow-sm">
                        Today
                      </span>
                    </div>

                    {/* Outgoing message */}
                    <div className="ml-auto max-w-[94%] rounded-xl rounded-tr-none bg-[#DCF8C6] p-2 text-neutral-900 shadow-sm">
                      <p className="text-[9.5px] leading-snug">
                        Sent a campaign message to restore your personalized
                        inside your campaign promotion. You would complete
                        your naming here:
                      </p>
                      <p className="mt-1 text-[9px] font-medium text-emerald-950">
                        Send your message.
                      </p>
                      <div className="mt-1 flex items-center justify-end gap-0.5 text-[8px] text-neutral-500">
                        <span>3:20 PM</span>
                        <CheckCheck
                          size={10}
                          className="text-[#34B7F1]"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>

                    {/* Quick replies */}
                    <div className="space-y-1 pt-0.5">
                      <div className="flex items-center justify-between rounded-lg border border-neutral-200/90 bg-white px-2 py-1 text-[9px] font-medium text-neutral-800 shadow-sm">
                        <span>Interested</span>
                        <span className="text-[7.5px] text-neutral-400">
                          12:30
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-neutral-200/90 bg-white px-2 py-1 text-[9px] font-medium text-neutral-800 shadow-sm">
                        <span>Tell me more</span>
                        <span className="text-[7.5px] text-neutral-400">
                          12:30
                        </span>
                      </div>
                    </div>

                    {/* Replies count */}
                    <div className="flex justify-center pt-1">
                      <div className="inline-flex rounded-full border border-neutral-200/90 bg-white/95 px-3 py-1 text-[9.5px] font-bold text-neutral-700 shadow-sm dark:border-neutral-700 dark:bg-[#161622] dark:text-neutral-300">
                        Replies: 320
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp input bar */}
                  <div className="flex items-center gap-1.5 bg-[#F0F2F5] px-2 py-1">
                    <Smile size={14} className="shrink-0 text-neutral-500" />
                    <div className="flex flex-1 items-center justify-between rounded-full bg-white px-2 py-0.5 text-[9.5px] text-neutral-400">
                      <span>Message</span>
                      <div className="flex items-center gap-1 text-neutral-400">
                        <Paperclip size={11} />
                        <Camera size={11} />
                      </div>
                    </div>
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#008069] text-white">
                      <Mic size={10} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Upper-right delivery badges */}
            <div className="absolute left-[520px] top-[25px] z-30 flex flex-col items-start gap-1">
              <div className="flex items-center gap-1 rounded-full border border-neutral-200/90 bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-neutral-800 shadow-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-[#161622] dark:text-neutral-200">
                <span>Message Delivered</span>
                <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#25D366] text-[7.5px] text-white">
                  <Check size={7} strokeWidth={3} />
                </span>
              </div>

              <div className="mt-0.5 flex items-center gap-1 rounded-full border border-neutral-200/90 bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-neutral-800 shadow-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-[#161622] dark:text-neutral-200">
                <span>Read (Blue Tick)</span>
                <CheckCheck
                  size={11}
                  className="text-[#34B7F1]"
                  strokeWidth={2.5}
                />
              </div>

              <div className="rounded-full border border-neutral-200/90 bg-white/95 px-2 py-0.5 text-[9.5px] font-bold text-neutral-700 shadow-sm dark:border-neutral-700 dark:bg-[#161622] dark:text-neutral-300">
                Read: 980
              </div>
            </div>

            {/* 4. Customer Replied — moved lower */}
            <div className="absolute left-[515px] top-[255px] z-30">
              <div className="flex items-center gap-2 rounded-full border border-neutral-200/90 bg-white/95 px-3 py-1 text-[10.5px] font-semibold text-neutral-800 shadow-md backdrop-blur-sm dark:border-neutral-700 dark:bg-[#161622] dark:text-neutral-200">
                <span>Customer Replied</span>
                <span className="text-[10px]">💬</span>
              </div>
            </div>

            {/* 5. Dotted connector lines */}
            <svg
              className="pointer-events-none absolute left-[552px] top-[10px] z-10 h-[225px] w-[143px]"
              viewBox="0 0 143 225"
              fill="none"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="115"
                x2="28"
                y2="115"
                stroke="#94a3b8"
                strokeWidth="1.25"
                strokeDasharray="3 3"
              />

              <path
                d="M 28,115 C 65,115 100,22 143,22"
                stroke="#94a3b8"
                strokeWidth="1.25"
                strokeDasharray="3 3"
              />
              <path
                d="M 28,115 C 65,115 100,76 143,76"
                stroke="#94a3b8"
                strokeWidth="1.25"
                strokeDasharray="3 3"
              />
              <path
                d="M 28,115 C 65,115 100,130 143,130"
                stroke="#94a3b8"
                strokeWidth="1.25"
                strokeDasharray="3 3"
              />
              <path
                d="M 28,115 C 65,115 100,184 143,184"
                stroke="#94a3b8"
                strokeWidth="1.25"
                strokeDasharray="3 3"
              />
            </svg>

            {/* 6. RIGHT: Customer personas */}
            <div className="absolute left-[695px] top-[10px] z-20 h-[340px] w-[205px]">
              {customerPersonas.map((persona, index) => (
                <div
                  key={persona.id}
                  className="absolute left-0 flex items-center gap-2"
                  style={{ top: `${6 + index * 54}px` }}
                >
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full shadow-sm ring-2 ring-white dark:ring-neutral-800">
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/90 bg-white/95 px-2.5 py-1 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-[#161622] dark:text-neutral-200">
                    <span>{persona.name}</span>
                    <span>{persona.icon}</span>
                  </div>
                </div>
              ))}

              {/* Optional Automation Layer — improved text spacing */}
              <div className="absolute top-[224px] left-0 w-full">
                <div className="rounded-2xl border border-neutral-200/80 bg-white/75 p-3 text-left shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-[#14141e]/80">
                  <span className="mb-1 block text-[10px] font-medium leading-relaxed text-neutral-500 dark:text-neutral-400">
                    Optional Automation Layer
                  </span>

                  <p className="mb-1 text-[13px] font-semibold leading-snug text-neutral-900 dark:text-neutral-100">
                    Analytics Dashboard
                  </p>

                  <p className="mb-1 text-[12px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                    Live Data Tracking
                  </p>

                  <p className="text-[12px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                    Performance Insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom action buttons */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-neutral-200/60 pt-4 dark:border-neutral-800/70 sm:mt-5 sm:gap-2.5">
          {bottomActionButtons.map((btn, index) => {
            const isActive = activeTab === index;

            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setActiveTab(isActive ? null : index)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all duration-200 sm:text-[13px] ${
                  isActive
                    ? 'scale-[1.02] bg-neutral-900 text-white shadow-md dark:bg-white dark:text-neutral-900'
                    : 'border border-neutral-200/90 bg-white/95 text-neutral-700 hover:border-neutral-300 hover:bg-white hover:text-black dark:border-neutral-800 dark:bg-[#161622] dark:text-neutral-300 dark:hover:bg-neutral-800'
                }`}
              >
                <span>{btn.label}</span>
                <span>{btn.icon}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom feature highlights: 2 columns on mobile, 4 on desktop */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
          {featureHighlights.map((feat, index) => {
            const Icon = feat.icon;

            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group flex flex-col p-1 text-left"
              >
                <div className="mb-1.5 inline-flex items-center gap-2">
                  <Icon
                    size={18}
                    className="shrink-0 text-[#FF4800] transition-transform duration-200 group-hover:scale-110"
                    strokeWidth={2.2}
                  />
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white sm:text-base">
                    {feat.title}
                  </h3>
                </div>

                <p className="text-[11.5px] leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-[13px]">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
