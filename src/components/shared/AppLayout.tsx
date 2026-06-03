'use client';

/**
 * AppLayout — Global "App Shell" wrapper
 *
 * Replaces ResponsiveWrapper with a richer layout primitive:
 *  ▸ Persistent engineering dot-grid background (light + dark variants)
 *  ▸ overflow-x: hidden hard cap via max-w-[100vw]
 *  ▸ Centered flex column — children fill full width
 *  ▸ Safe-zone padding integration point
 *
 * The dot grid is fixed (stays with the viewport), giving the whole site
 * a unified engineering-blueprint background on both light and dark themes.
 */
export default function AppLayout({
  children,
  className = '',
  showGrid = true,
}: {
  children: React.ReactNode;
  className?: string;
  showGrid?: boolean;
}) {
  return (
    <div
      className={[
        /* Centering shell */
        'relative flex flex-col items-center',
        /* Full width, hard overflow guard */
        'w-full max-w-[100vw] overflow-x-hidden',
        /* Fill viewport vertically */
        'min-h-screen',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* ── Engineering grid — fixed overlay behind all content ── */}
      {showGrid && (
        <>
          {/* Light mode dot grid */}
          <div
            className="pointer-events-none fixed inset-0 z-0 dark:opacity-0 transition-opacity duration-300"
            style={{
              backgroundImage: 'radial-gradient(rgba(0,0,0,0.028) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
            aria-hidden="true"
          />
          {/* Dark mode dot grid */}
          <div
            className="pointer-events-none fixed inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Content column — sits above the grid ── */}
      <div className="relative z-10 w-full flex flex-col flex-1">
        {children}
      </div>
    </div>
  );
}
