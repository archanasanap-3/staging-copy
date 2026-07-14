'use client';

import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PrivacyCardVariant = 'info' | 'callout' | 'success' | 'warning';

interface PrivacyCardProps {
  icon?: LucideIcon;
  title?: string;
  children: React.ReactNode;
  variant?: PrivacyCardVariant;
  className?: string;
}

const containerStyles: Record<PrivacyCardVariant, string> = {
  info: 'glass-subtle border-black/[0.06] dark:border-white/[0.08]',
  callout: 'glass-orange border-[#FF4800]/20',
  success:
    'bg-emerald-50/70 dark:bg-emerald-500/[0.06] border-emerald-500/20 dark:border-emerald-500/25',
  warning: 'bg-amber-50/70 dark:bg-amber-500/[0.06] border-amber-500/20 dark:border-amber-500/25',
};

const iconStyles: Record<PrivacyCardVariant, string> = {
  info: 'bg-[#2B2358]/10 text-[#2B2358] dark:bg-[#a89ee0]/10 dark:text-[#a89ee0]',
  callout: 'bg-[#FF4800]/15 text-[#FF4800]',
  success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
};

export default function PrivacyCard({ icon: Icon, title, children, variant = 'info', className }: PrivacyCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.04] dark:hover:shadow-black/20',
        containerStyles[variant],
        className
      )}
    >
      <div className="flex items-start gap-3.5">
        {Icon && (
          <div className={cn('flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl', iconStyles[variant])}>
            <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          {title && <p className="mb-1 text-[14px] font-semibold text-[#1a1a2e] dark:text-white">{title}</p>}
          <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400">{children}</div>
        </div>
      </div>
    </div>
  );
}
