'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ClientsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-16 dark:bg-[#0a0a14]">
      {/* Heading */}
      <div className="relative z-40 mx-auto max-w-7xl px-4 text-center">
        {/* Small Label */}
        <p
          className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em]"
          style={{ color: '#FF4800' }}
        >
          our clients
        </p>

        <h2 className="font-bold text-black dark:text-white text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight leading-[1.2] mx-auto">
          Built Together Growing Together
        </h2>
      </div>

      {/* Cards + Rope */}
      <div className="relative mx-auto mt-6 h-[430px] w-full max-w-[1200px]">

        {/* ================================================= */}
        {/* ROPE - BEHIND CARDS BUT CONNECTING TO EVERY PIN */}
        {/* ================================================= */}
        <svg
          className="pointer-events-none absolute inset-0 z-[10] h-full w-full"
          viewBox="0 0 1500 430"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
              M0 175
              C120 205, 230 205, 350 135
              C480 65, 620 115, 750 150
              C880 185, 1020 65, 1150 135
              C1270 205, 1380 205, 1500 175
            "
            stroke="#d1d5db"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>

        {/* ================================================= */}
        {/* CARDS */}
        {/* ================================================= */}

        {/* ================= DESKTOP CARDS ================= */}
        <div className="absolute inset-0 z-[20] hidden md:block">

          {/* ================= CARD 1 ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="absolute left-[-5px] top-[175px] z-[20]"
          >
            <div className="relative w-[190px] overflow-visible rounded-[20px] border-[6px] border-white bg-white shadow-[0_14px_35px_rgba(0,0,0,0.10)] dark:border-[#181824] dark:bg-[#181824]">
              <div className="absolute left-1/2 top-[-48px] z-[50] h-[52px] w-[22px] -translate-x-1/2 rotate-[4deg] rounded-[5px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                <span className="absolute left-1/2 top-[9px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white" />
              </div>

              <div className="h-[145px] w-full overflow-hidden rounded-[13px]">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=85"
                  alt="Sarah Mitchell"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="px-3 py-3">
                <h3 className="text-[15px] font-semibold leading-tight text-[#282451] dark:text-[#f0f0f5]">
                  Sarah Mitchell
                </h3>
                <p className="mt-1 text-[11px] text-[#6b7280] dark:text-[#9ca3af]">
                  Founder & CEO
                </p>
              </div>
            </div>
          </motion.div>

          {/* ================= CARD 2 ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25, rotate: 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="absolute left-[22%] top-[115px] z-[30]"
          >
            <div className="relative w-[190px] overflow-visible rounded-[20px] border-[6px] border-white bg-white shadow-[0_14px_35px_rgba(0,0,0,0.10)] dark:border-[#181824] dark:bg-[#181824]">
              <div className="absolute left-1/2 top-[-48px] z-[50] h-[52px] w-[22px] -translate-x-1/2 rotate-[4deg] rounded-[5px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                <span className="absolute left-1/2 top-[9px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white" />
              </div>

              <div className="h-[145px] w-full overflow-hidden rounded-[13px]">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85"
                  alt="Daniel Carter"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="px-3 py-3">
                <h3 className="text-[15px] font-semibold leading-tight text-[#282451] dark:text-[#f0f0f5]">
                  Daniel Carter
                </h3>
                <p className="mt-1 text-[11px] text-[#6b7280] dark:text-[#9ca3af]">
                  Operations Director
                </p>
              </div>
            </div>
          </motion.div>

          {/* ================= CARD 3 ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute left-1/2 top-[150px] z-[40] -translate-x-1/2"
          >
            <div className="relative w-[190px] overflow-visible rounded-[20px] border-[6px] border-white bg-white shadow-[0_14px_35px_rgba(0,0,0,0.10)] dark:border-[#181824] dark:bg-[#181824]">
              <div className="absolute left-1/2 top-[-48px] z-[50] h-[52px] w-[22px] -translate-x-1/2 rotate-[2deg] rounded-[5px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                <span className="absolute left-1/2 top-[9px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white" />
              </div>

              <div className="h-[145px] w-full overflow-hidden rounded-[13px]">
                <img
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=85"
                  alt="Olivia Anderson"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="px-3 py-3">
                <h3 className="text-[15px] font-semibold leading-tight text-[#282451] dark:text-[#f0f0f5]">
                  Olivia Anderson
                </h3>
                <p className="mt-1 text-[11px] text-[#6b7280] dark:text-[#9ca3af]">
                  Growth Lead
                </p>
              </div>
            </div>
          </motion.div>

          {/* ================= CARD 4 ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute right-[22%] top-[115px] z-[30]"
          >
            <div className="relative w-[190px] overflow-visible rounded-[20px] border-[6px] border-white bg-white shadow-[0_14px_35px_rgba(0,0,0,0.10)] dark:border-[#181824] dark:bg-[#181824]">
              <div className="absolute left-1/2 top-[-48px] z-[50] h-[52px] w-[22px] -translate-x-1/2 rotate-[-4deg] rounded-[5px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                <span className="absolute left-1/2 top-[9px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white" />
              </div>

              <div className="h-[145px] w-full overflow-hidden rounded-[13px]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=85"
                  alt="James Wilson"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="px-3 py-3">
                <h3 className="text-[15px] font-semibold leading-tight text-[#282451] dark:text-[#f0f0f5]">
                  James Wilson
                </h3>
                <p className="mt-1 text-[11px] text-[#6b7280] dark:text-[#9ca3af]">
                  Business Head
                </p>
              </div>
            </div>
          </motion.div>

          {/* ================= CARD 5 ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25, rotate: 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute right-[-5px] top-[175px] z-[20]"
          >
            <div className="relative w-[190px] overflow-visible rounded-[20px] border-[6px] border-white bg-white shadow-[0_14px_35px_rgba(0,0,0,0.10)] dark:border-[#181824] dark:bg-[#181824]">
              <div className="absolute left-1/2 top-[-48px] z-[50] h-[52px] w-[22px] -translate-x-1/2 rotate-[-4deg] rounded-[5px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                <span className="absolute left-1/2 top-[9px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white" />
              </div>

              <div className="h-[145px] w-full overflow-hidden rounded-[13px]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=85"
                  alt="Emma Thompson"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="px-3 py-3">
                <h3 className="text-[15px] font-semibold leading-tight text-[#282451] dark:text-[#f0f0f5]">
                  Emma Thompson
                </h3>
                <p className="mt-1 text-[11px] text-[#6b7280] dark:text-[#9ca3af]">
                  Product Manager
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ================================================= */}
        {/* MOBILE CLIENT CARDS */}
        {/* ================================================= */}
        <div className="relative mt-6 block h-[300px] w-full overflow-hidden md:hidden">

          {/* MOBILE ROPE */}
          <svg
            className="pointer-events-none absolute left-[-10px] top-[72px] z-[5] h-[100px] w-[900px]"
            viewBox="0 0 900 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="
                M0 35
                C120 75, 180 75, 270 45
                C360 15, 450 15, 540 45
                C630 75, 720 75, 900 35
              "
              stroke="#d1d5db"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>

          {/* MOBILE HORIZONTAL SCROLL */}
          <div
            className="relative z-[20] flex h-full w-full gap-5 overflow-x-auto px-5 pb-4 pt-[105px]"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* ================= MOBILE CARD 1 ================= */}
            <div className="relative min-w-[145px] shrink-0 rotate-[-5deg]">
              <div className="absolute left-1/2 top-[-43px] z-[50] h-[46px] w-[19px] -translate-x-1/2 rotate-[4deg] rounded-[4px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                <span className="absolute left-1/2 top-[8px] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white" />
              </div>

              <div className="overflow-hidden rounded-[16px] border-[5px] border-white bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)]">
                <div className="h-[110px] w-full overflow-hidden rounded-[10px]">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=85"
                    alt="Sarah Mitchell"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-2.5 py-2.5">
                  <h3 className="text-[12px] font-semibold leading-tight text-[#282451]">
                    Sarah Mitchell
                  </h3>
                  <p className="mt-1 text-[9px] text-[#6b7280]">
                    Founder & CEO
                  </p>
                </div>
              </div>
            </div>

            {/* ================= MOBILE CARD 2 ================= */}
            <div className="relative min-w-[145px] shrink-0 rotate-[4deg]">
              <div className="absolute left-1/2 top-[-43px] z-[50] h-[46px] w-[19px] -translate-x-1/2 rotate-[4deg] rounded-[4px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                <span className="absolute left-1/2 top-[8px] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white" />
              </div>

              <div className="overflow-hidden rounded-[16px] border-[5px] border-white bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)]">
                <div className="h-[110px] w-full overflow-hidden rounded-[10px]">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85"
                    alt="Daniel Carter"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-2.5 py-2.5">
                  <h3 className="text-[12px] font-semibold leading-tight text-[#282451]">
                    Daniel Carter
                  </h3>
                  <p className="mt-1 text-[9px] text-[#6b7280]">
                    Operations Director
                  </p>
                </div>
              </div>
            </div>

            {/* ================= MOBILE CARD 3 ================= */}
            <div className="relative min-w-[145px] shrink-0 rotate-[-2deg]">
              <div className="absolute left-1/2 top-[-43px] z-[50] h-[46px] w-[19px] -translate-x-1/2 rotate-[2deg] rounded-[4px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                <span className="absolute left-1/2 top-[8px] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white" />
              </div>

              <div className="overflow-hidden rounded-[16px] border-[5px] border-white bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)]">
                <div className="h-[110px] w-full overflow-hidden rounded-[10px]">
                  <img
                    src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=85"
                    alt="Olivia Anderson"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-2.5 py-2.5">
                  <h3 className="text-[12px] font-semibold leading-tight text-[#282451]">
                    Olivia Anderson
                  </h3>
                  <p className="mt-1 text-[9px] text-[#6b7280]">
                    Growth Lead
                  </p>
                </div>
              </div>
            </div>

            {/* ================= MOBILE CARD 4 ================= */}
            <div className="relative min-w-[145px] shrink-0 rotate-[4deg]">
              <div className="absolute left-1/2 top-[-43px] z-[50] h-[46px] w-[19px] -translate-x-1/2 rotate-[-4deg] rounded-[4px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                <span className="absolute left-1/2 top-[8px] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white" />
              </div>

              <div className="overflow-hidden rounded-[16px] border-[5px] border-white bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)]">
                <div className="h-[110px] w-full overflow-hidden rounded-[10px]">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=85"
                    alt="James Wilson"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-2.5 py-2.5">
                  <h3 className="text-[12px] font-semibold leading-tight text-[#282451]">
                    James Wilson
                  </h3>
                  <p className="mt-1 text-[9px] text-[#6b7280]">
                    Business Head
                  </p>
                </div>
              </div>
            </div>

            {/* ================= MOBILE CARD 5 ================= */}
            <div className="relative min-w-[145px] shrink-0 rotate-[-5deg]">
              <div className="absolute left-1/2 top-[-43px] z-[50] h-[46px] w-[19px] -translate-x-1/2 rotate-[-4deg] rounded-[4px] bg-[#FF4800] shadow-[0_3px_8px_rgba(0,0,0,0.15)]">
                <span className="absolute left-1/2 top-[8px] h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white" />
              </div>

              <div className="overflow-hidden rounded-[16px] border-[5px] border-white bg-white shadow-[0_10px_25px_rgba(0,0,0,0.10)]">
                <div className="h-[110px] w-full overflow-hidden rounded-[10px]">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=85"
                    alt="Emma Thompson"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-2.5 py-2.5">
                  <h3 className="text-[12px] font-semibold leading-tight text-[#282451]">
                    Emma Thompson
                  </h3>
                  <p className="mt-1 text-[9px] text-[#6b7280]">
                    Product Manager
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
