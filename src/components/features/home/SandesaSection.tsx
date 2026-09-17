'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Check, MessageSquare, Megaphone, GitMerge, BarChart2 } from 'lucide-react';
import Image from 'next/image';

interface Props {
  isDark: boolean;
}

const ease = [0.4, 0, 0.2, 1] as const;

export default function SandesaSection({ isDark }: Props) {
  return (
    <section className="relative pt-4 pb-16 md:pt-6 md:pb-24 overflow-hidden bg-gradient-to-br from-[#fff6f0] to-[#ffffff] dark:from-[#110c0a] dark:to-[#0a0a14]">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle at 80% 50%, rgba(255, 72, 0, 0.15) 0%, transparent 60%)'
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-12 lg:gap-8 items-start">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF4800]/10 border border-[#FF4800]/20 mb-8">
              <Zap size={14} className="text-[#FF4800] fill-[#FF4800]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF4800]">
                Built by Straveda
              </span>
            </div>

            <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-[-1.5px] text-[#0f172a] dark:text-[#f0f0f5] mb-4 text-left">
              Meet Sandesa
              <br />
              <span className="text-[#FF4800]">
                WhatsApp automation, powered by AI
              </span>
            </h2>

            <p className="text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-10 max-w-lg">
              Sandesa helps businesses automate customer conversations, campaigns, support and workflows all from one platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-4 lg:mb-12">
              <a 
                href="https://sandesaai.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-full bg-[#FF4800] px-8 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[#e64100] shadow-[0_8px_20px_rgba(255,72,0,0.3)] hover:shadow-[0_12px_24px_rgba(255,72,0,0.4)]"
              >
                Explore Sandesa
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </motion.div>

          {/* Right Content (Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="relative flex items-start justify-start w-full overflow-visible lg:mt-4 pb-12 lg:pb-0"
          >
            <div className="relative w-full lg:scale-[1.18] lg:origin-top-left lg:-ml-[90px]">
              <Image
                src="/sandesa dashboard.png"
                alt="Sandesa Dashboard"
                width={1400}
                height={1050}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />

              {/* Floating Element */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -bottom-8 -right-4 lg:-bottom-8 lg:right-4 w-[45%] lg:w-[40%] xl:w-[35%] max-w-[400px]" style={{
                  filter: 'drop-shadow(0px 25px 35px rgba(0,0,0,0.15))'
                }}
              >
                <Image
                  src="/sandesa float 1.png"
                  alt="Sandesa Feature"
                  width={600}
                  height={450}
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
