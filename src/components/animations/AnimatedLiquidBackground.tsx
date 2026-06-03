'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';

export default function AnimatedLiquidBackground() {
  const { theme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      <style>{`
        @keyframes liq-1 {
          0%,100% { border-radius:63% 37% 54% 46%/55% 48% 52% 45%; transform:translate(0%,0%) scale(1); }
          25%      { border-radius:40% 60% 45% 55%/60% 35% 65% 40%; transform:translate(4%,-5%) scale(1.04); }
          50%      { border-radius:52% 48% 37% 63%/40% 62% 38% 60%; transform:translate(-3%,4%) scale(0.97); }
          75%      { border-radius:46% 54% 63% 37%/50% 52% 48% 50%; transform:translate(5%,3%) scale(1.02); }
        }
        @keyframes liq-2 {
          0%,100% { border-radius:37% 63% 46% 54%/40% 55% 45% 60%; transform:translate(0%,0%); }
          33%      { border-radius:63% 37% 60% 40%/55% 40% 60% 45%; transform:translate(-5%,4%); }
          66%      { border-radius:46% 54% 37% 63%/60% 50% 50% 40%; transform:translate(3%,-3%); }
        }
        @keyframes liq-3 {
          0%,100% { border-radius:54% 46% 40% 60%/48% 63% 37% 52%; transform:translate(0%,0%); }
          40%      { border-radius:37% 63% 55% 45%/52% 40% 60% 48%; transform:translate(-4%,-4%); }
          70%      { border-radius:60% 40% 46% 54%/40% 55% 45% 60%; transform:translate(4%,5%); }
        }
        @keyframes liq-4 {
          0%,100% { border-radius:50% 50% 40% 60%/55% 45% 55% 45%; transform:translate(0%,0%); }
          50%      { border-radius:40% 60% 55% 45%/45% 55% 45% 55%; transform:translate(3%,-4%); }
        }
        @keyframes liq-5 {
          0%,100% { border-radius:45% 55% 60% 40%/60% 45% 55% 40%; transform:translate(0%,0%); }
          50%      { border-radius:60% 40% 45% 55%/40% 60% 40% 60%; transform:translate(-4%,4%); }
        }
      `}</style>

      {/* Base background */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(135deg,rgb(5,5,15) 0%,rgb(10,10,20) 100%)'
            : 'linear-gradient(135deg,rgb(255,252,248) 0%,rgb(255,253,250) 100%)',
        }}
      />

      {/* Liquid blob layer — blur removed for performance, using radial-gradients instead */}
      <div
        className="absolute inset-0"
        style={{ willChange: 'transform', transform: 'translateZ(0)', contain: 'paint' }}
      >
        {/* Orange blob — top-left */}
        <div
          className="absolute"
          style={{
            width: '60%', height: '60%', top: '-5%', left: '-5%',
            background: isDark ? 'radial-gradient(circle, rgba(255,72,0,0.08) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255,72,0,0.40) 0%, transparent 70%)',
            animation: 'liq-1 22s ease-in-out infinite',
            mixBlendMode: 'normal',
          }}
        />

        {/* Deep Navy blob — right-center */}
        <div
          className="absolute"
          style={{
            width: '58%', height: '62%', top: '20%', right: '-8%',
            background: isDark ? 'radial-gradient(circle, rgba(10,10,40,0.30) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(20,20,50,0.10) 0%, transparent 70%)',
            animation: 'liq-2 28s ease-in-out infinite',
            mixBlendMode: 'normal',
          }}
        />

        {/* Warm orange blob — bottom-center */}
        <div
          className="absolute"
          style={{
            width: '50%', height: '50%', bottom: '-5%', left: '20%',
            background: isDark ? 'radial-gradient(circle, rgba(255,110,30,0.06) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255,110,30,0.30) 0%, transparent 70%)',
            animation: 'liq-3 18s ease-in-out infinite',
            mixBlendMode: 'normal',
          }}
        />

        {/* Red-orange accent — top-right */}
        <div
          className="absolute"
          style={{
            width: '38%', height: '38%', top: '8%', right: '15%',
            background: isDark ? 'radial-gradient(circle, rgba(200,50,0,0.04) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255,160,100,0.35) 0%, transparent 70%)',
            animation: 'liq-4 14s ease-in-out infinite',
            mixBlendMode: 'normal',
          }}
        />

        {/* Subtle Orange accent — bottom-left */}
        <div
          className="absolute"
          style={{
            width: '45%', height: '45%', bottom: '8%', left: '-5%',
            background: isDark ? 'radial-gradient(circle, rgba(255,72,0,0.03) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255,72,0,0.10) 0%, transparent 70%)',
            animation: 'liq-5 24s ease-in-out infinite',
            mixBlendMode: 'normal',
          }}
        />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 30% 50%,transparent 40%,rgba(0,0,0,0.45) 100%)'
            : 'radial-gradient(ellipse at 30% 50%,transparent 55%,rgba(255,255,255,0.4) 100%)',
        }}
      />
    </div>
  );
}
