'use client'

import { useMemo } from 'react'

interface MarqueeProps {
  items?: string[]
  speed?: number
  direction?: 'left' | 'right'
}

export default function Marquee({
  items = [
    'AI & Automation',
    'Custom Software',
    'WhatsApp Automation',
    'AI Powered CRMs',
    'LLM Integration',
    'Workflow Automation',
    'Next.js Development',
    'Business Intelligence',
    'API Integrations',
    'Web Experiences',
  ],
  speed = 25,
  direction = 'left',
}: MarqueeProps) {
  // Build the inner content: items separated by dots
  const content = useMemo(
    () =>
      items.map((item) => (
        <span key={item} className="inline-flex items-center gap-4 whitespace-nowrap">
          <span
            className="text-[15px] font-semibold uppercase tracking-widest"
            style={{ color: 'rgba(0,0,0,0.18)' }}
          >
            {item}
          </span>
          <span
            className="text-[15px]"
            style={{ color: 'rgba(0,0,0,0.1)' }}
          >
            &middot;
          </span>
        </span>
      )),
    [items],
  )

  const keyframeName = direction === 'left' ? 'marqueeScrollLeft' : 'marqueeScrollRight'

  return (
    <section
      className="w-full overflow-hidden py-6"
      style={{
        background: '#f8f8fc',
        borderTop: '1px solid rgba(0,0,0,0.04)',
        borderBottom: '1px solid rgba(0,0,0,0.04)',
      }}
    >
      <style>{`
        @keyframes marqueeScrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeScrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div
        className="inline-flex w-max"
        style={{
          animation: `${keyframeName} ${speed}s linear infinite`,
        }}
      >
        {/* First copy */}
        {content}
        {/* Duplicate for seamless loop */}
        {content}
      </div>
    </section>
  )
}
