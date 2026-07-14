'use client';

import type { RefObject } from 'react';
import { ListTree, type LucideIcon } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export interface TocSection {
  id: string;
  title: string;
  icon: LucideIcon;
}

interface PrivacyTableOfContentsProps {
  sections: TocSection[];
  activeId: string;
  onNavigate: (id: string) => void;
  /** Written to directly on scroll (rAF) to avoid per-frame re-renders */
  progressBarRef?: RefObject<HTMLDivElement | null>;
  progressTextRef?: RefObject<HTMLSpanElement | null>;
  /**
   * The site's global layout wrapper sets `overflow-x: hidden`, which forces
   * `overflow-y: auto` on that ancestor and neutralizes `position: sticky`
   * for every descendant (its own scroll offset never moves — the page
   * actually scrolls via `<html>`). The parent drives the "stuck" position
   * manually via rAF and writes it here to avoid relying on native sticky.
   */
  navRef?: RefObject<HTMLElement | null>;
}

export default function PrivacyTableOfContents({
  sections,
  activeId,
  onNavigate,
  progressBarRef,
  progressTextRef,
  navRef,
}: PrivacyTableOfContentsProps) {
  return (
    <>
      {/* Desktop — sidebar (position driven manually via rAF, see navRef) */}
      <nav ref={navRef} aria-label="Table of contents" className="glass-card hidden rounded-3xl p-5 lg:block">
        <div className="mb-4 flex items-center justify-between px-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF4800]">On this page</p>
          <span ref={progressTextRef} className="text-[11px] font-semibold text-gray-400" aria-hidden="true">
            0%
          </span>
        </div>

        <div
          className="mb-4 h-1 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10"
          aria-label="Reading progress"
        >
          <div
            ref={progressBarRef}
            className="h-full w-0 rounded-full bg-gradient-to-r from-[#FF4800] to-[#ff6a33]"
          />
        </div>

        <ul className="scrollbar-hide max-h-[calc(100vh-260px)] space-y-1 overflow-y-auto pr-1">
          {sections.map(({ id, title, icon: Icon }) => {
            const active = activeId === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onNavigate(id)}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-all duration-200',
                    active
                      ? 'bg-[#FF4800]/10 text-[#FF4800]'
                      : 'text-gray-500 hover:bg-black/[0.03] hover:text-[#1a1a2e] dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-white'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 flex-shrink-0 transition-colors',
                      active ? 'text-[#FF4800]' : 'text-gray-400 group-hover:text-[#FF4800]'
                    )}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="truncate">{title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile / Tablet — accordion */}
      <div className="lg:hidden">
        <Accordion type="single" collapsible defaultValue="toc" className="glass-card rounded-2xl px-2">
          <AccordionItem value="toc" className="border-none">
            <AccordionTrigger className="px-3 py-4 text-[13px] font-bold tracking-[0.2em] text-[#FF4800] uppercase hover:no-underline">
              <span className="flex items-center gap-2">
                <ListTree className="h-4 w-4" aria-hidden="true" /> Table of Contents
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-1 pb-3">
              <ul className="space-y-1">
                {sections.map(({ id, title, icon: Icon }) => {
                  const active = activeId === id;
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => onNavigate(id)}
                        aria-current={active ? 'true' : undefined}
                        className={cn(
                          'flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-colors',
                          active
                            ? 'bg-[#FF4800]/10 text-[#FF4800]'
                            : 'text-gray-600 hover:bg-black/[0.03] hover:text-[#FF4800] dark:text-gray-300 dark:hover:bg-white/[0.05]'
                        )}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0 text-[#FF4800]" strokeWidth={1.75} aria-hidden="true" />
                        <span>{title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
