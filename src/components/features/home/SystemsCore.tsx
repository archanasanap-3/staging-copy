'use client';

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Zap, Target, TrendingUp, Users, Shield, Cpu, ArrowRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────── */
/* 1. Types & Constants                                                    */
/* ─────────────────────────────────────────────────────────────────────── */

interface Pillar {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  x: number; // Percent from center
  y: number; // Percent from center
  color: string;
}

const pillars: Pillar[] = [
  { id: '1', title: 'Scale Faster', desc: 'Break growth ceilings with automated infrastructure.', icon: <Zap size={20} />, x: -28, y: -25, color: '#FF4800' },
  { id: '2', title: 'Automate Ops', desc: 'Remove human bottlenecks from recurring workflows.', icon: <Cpu size={20} />, x: 28, y: -25, color: '#FF4800' },
  { id: '3', title: 'Reduce Manual', desc: 'Replace 40 hours of data entry with 40ms of code.', icon: <Users size={20} />, x: -36, y: 15, color: '#FF4800' },
  { id: '4', title: 'Reliable Systems', desc: 'Build architecture that scales without breaking.', icon: <Shield size={20} />, x: 36, y: 15, color: '#FF4800' },
  { id: '5', title: 'Efficiency', desc: 'Optimize every micro-interaction in your stack.', icon: <Target size={20} />, x: 0, y: 45, color: '#FF4800' },
];

/* ─────────────────────────────────────────────────────────────────────── */
/* 2. Sub-Components                                                       */
/* ─────────────────────────────────────────────────────────────────────── */

function ConnectionLine({ active, x, y }: { active: boolean; x: number; y: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
      <motion.line
        x1="50%" y1="50%"
        x2={`${50 + x}%`} y2={`${50 + y}%`}
        stroke="rgba(255, 72, 0, 0.15)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: active ? 1 : 0, 
          opacity: active ? 1 : 0.2,
          stroke: active ? 'rgba(255, 72, 0, 0.4)' : 'rgba(255, 72, 0, 0.15)'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

function PillarCard({ pillar, active, onHover, isDark }: { pillar: Pillar; active: boolean; onHover: (id: string | null) => void; isDark: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(pillar.id)}
      onMouseLeave={() => { onHover(null); setMousePos({ x: 0, y: 0 }); }}
      initial={{ opacity: 0, scale: 0.8, x: `${pillar.x * 0.5}vw`, y: `${pillar.y * 0.5}vh` }}
      whileInView={{ opacity: 1, scale: 1, x: `${pillar.x}vw`, y: `${pillar.y}vh` }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: parseInt(pillar.id) * 0.1 }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
      style={{
        width: '240px',
        perspective: '1000px',
      }}
    >
      <motion.div
        animate={{ 
          rotateY: mousePos.x * 20, 
          rotateX: -mousePos.y * 20,
          scale: active ? 1.05 : 1,
          boxShadow: active 
            ? '0 20px 40px rgba(255, 72, 0, 0.15), 0 0 0 1px rgba(255, 72, 0, 0.3)' 
            : '0 10px 30px rgba(0, 0, 0, 0.05)',
        }}
        className={`relative overflow-hidden rounded-2xl p-6 transition-colors duration-500 ${
          isDark ? 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]' : 'bg-white/80 backdrop-blur-xl border border-black/[0.05]'
        }`}
      >
        <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${isDark ? 'bg-[#FF4800]/15' : 'bg-[#FF4800]/10'}`}>
          <div className="text-[#FF4800]">{pillar.icon}</div>
        </div>
        <h4 className={`text-lg font-bold mb-2 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{pillar.title}</h4>
        <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{pillar.desc}</p>
        
        {/* Glow effect */}
        <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle at center, ${pillar.color}10 0%, transparent 70%)` }} />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* 3. Main Section                                                         */
/* ─────────────────────────────────────────────────────────────────────── */

export default function SystemsCoreSection({ isDark }: { isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative lg:min-h-[120vh] flex flex-col items-center justify-start overflow-hidden py-20 md:py-24 lg:py-32"
      style={{
        background: isDark ? '#0a0a14' : '#e8e8f0'
      }}
    >
      {/* 1. Header Area */}
      <div className="relative z-20 max-w-4xl px-6 text-center mb-12 lg:mb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF4800] mb-6"
        >
          Systems Core
        </motion.p>
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase mb-8 leading-[0.9] dark:text-white">
          {"One Goal: Systems That Run Without You.".split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.2em]"
            >
              {word}
            </motion.span>
          ))}
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          className="h-px w-24 bg-[#FF4800]/40 mx-auto mb-8"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          We build integrated AI-powered architecture that transforms chaotic operations into high-velocity engines. 
          Zero manual friction. Infinite scalability.
        </motion.p>
      </div>

      {/* 2. Interactive Orbit Area */}
      <motion.div
        style={{ opacity, scale }}
        className="relative w-full h-[600px] hidden lg:flex items-center justify-center pointer-events-auto"
      >
        {/* Background Grid/Mesh */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, #FF480010 0%, transparent 70%)` }} />
        </div>

        {/* Central Core */}
        <motion.div 
          style={{ rotate }}
          className="relative z-10 flex items-center justify-center"
        >
          {/* Animated Rings */}
          <div className="absolute w-[400px] h-[400px] rounded-full border border-[#FF4800]/10 animate-[spin_20s_linear_infinite]" />
          <div className="absolute w-[500px] h-[500px] rounded-full border border-[#FF4800]/5 animate-[spin_30s_linear_infinite_reverse]" />
          
          {/* The Core Orb */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(255,72,0,0.2)]">
            <div className="absolute inset-0 bg-[#FF4800] opacity-10 blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4800] to-[#2B2358] opacity-20" />
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-4 rounded-full bg-[#FF4800]/20 blur-md"
            />
            <Zap size={40} className="text-[#FF4800] relative z-10" />
          </div>
        </motion.div>

        {/* Connection Lines */}
        {pillars.map((p) => (
          <ConnectionLine key={p.id} active={activePillar === p.id} x={p.x} y={p.y} />
        ))}

        {/* Pillars */}
        {pillars.map((p) => (
          <PillarCard 
            key={p.id} 
            pillar={p} 
            active={activePillar === p.id} 
            onHover={setActivePillar}
            isDark={isDark}
          />
        ))}
      </motion.div>

      {/* 2b. Mobile / tablet: stacked grid (orbit layout can't fit narrow screens) */}
      <div className="lg:hidden relative z-20 w-full max-w-lg px-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pillars.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: parseInt(p.id) * 0.08 }}
            className={`relative overflow-hidden rounded-2xl p-6 ${
              isDark ? 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]' : 'bg-white/80 backdrop-blur-xl border border-black/[0.05]'
            } ${p.id === '5' ? 'sm:col-span-2' : ''}`}
            style={{ boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.05)' }}
          >
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${isDark ? 'bg-[#FF4800]/15' : 'bg-[#FF4800]/10'}`}>
              <div className="text-[#FF4800]">{p.icon}</div>
            </div>
            <h4 className={`text-lg font-bold mb-2 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{p.title}</h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{p.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* 3. CTA Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-20 mt-12 lg:mt-40 xl:mt-48 flex flex-col items-center"
      >
        <button className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#FF4800] text-white font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,72,0,0.4)]">
          Build Your Core System
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </section>
  );
}
