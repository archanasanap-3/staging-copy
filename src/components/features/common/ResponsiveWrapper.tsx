'use client';

/**
 * ResponsiveWrapper
 *
 * Global layout shell that guarantees:
 *  – Full-width column, never narrower than the viewport
 *  – No horizontal scroll bleed from any child section
 *  – Content column is centered via flex, child sections control their own max-widths
 *  – max-w-[100vw] hard cap prevents any overflow from causing side-scroll on mobile
 */
export default function ResponsiveWrapper({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        'flex flex-col items-center',
        'w-full max-w-[100vw]',
        'overflow-x-hidden',
        'min-h-screen',
        'relative',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Full-width inner column — sections stretch edge to edge via their own bg classes */}
      <div className="w-full flex flex-col flex-1">
        {children}
      </div>
    </div>
  );
}
