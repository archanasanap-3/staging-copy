'use client';

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';

interface Section {
  id: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: 'section-hero', label: 'Hero' },
  { id: 'section-partners', label: 'Partners' },
  { id: 'section-services', label: 'Services' },
  { id: 'section-about', label: 'About' },
  { id: 'section-capabilities', label: 'Capabilities' },
  { id: 'section-process', label: 'Process' },
  { id: 'section-testimonials', label: 'Testimonials' },
  { id: 'section-faq', label: 'FAQ' },
];

export default function SectionProgress() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const { resolvedTheme } = useTheme();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    // Find the section with the highest intersection ratio
    let bestIndex = 0;
    let bestRatio = 0;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionIndex = SECTIONS.findIndex((s) => s.id === entry.target.id);
        if (sectionIndex !== -1 && entry.intersectionRatio > bestRatio) {
          bestRatio = entry.intersectionRatio;
          bestIndex = sectionIndex;
        }
      }
    });

    if (bestRatio > 0) {
      setActiveIndex(bestIndex);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5],
      rootMargin: '-10% 0px -10% 0px',
    });

    observerRef.current = observer;

    // Small delay to ensure DOM elements are available
    const timer = setTimeout(() => {
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          observer.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [mounted, handleIntersect]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Don't render on server or until mounted
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <nav
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:flex lg:flex-col"
      aria-label="Section navigation"
    >
      <ul className="flex flex-col items-end gap-3">
        {SECTIONS.map((section, index) => {
          const isActive = index === activeIndex;
          const isHovered = index === hoveredIndex;

          return (
            <li key={section.id} className="relative flex items-center">
              {/* Tooltip — appears to the left of the dot */}
              <span
                className="pointer-events-none absolute right-5 whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider transition-all duration-200"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(4px)',
                  background: isDark ? '#1e1e30' : '#1a1a2e',
                  color: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                {section.label}
              </span>

              {/* Dot button */}
              <button
                onClick={() => scrollToSection(section.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: isActive ? '20px' : '16px',
                  height: isActive ? '20px' : '16px',
                  border: isActive
                    ? 'none'
                    : `2px solid ${isDark ? '#4b5563' : '#d1d5db'}`,
                  background: isActive ? '#FF4800' : 'transparent',
                  boxShadow: isActive
                    ? '0 0 8px rgba(255, 72, 0, 0.4), 0 0 16px rgba(255, 72, 0, 0.15)'
                    : isHovered
                      ? `0 0 6px ${isDark ? 'rgba(255,72,0,0.2)' : 'rgba(255,72,0,0.15)'}`
                      : 'none',
                  transition: 'all 0.3s ease',
                }}
                aria-label={`Navigate to ${section.label} section`}
                aria-current={isActive ? 'true' : undefined}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
