'use client';

import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import Link from 'next/link';
import AppLayout from '@/components/shared/AppLayout';

export default function NotFound() {
  return (
    <AppLayout className="noise-overlay bg-[#0a0a14] text-white">
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-12 max-w-2xl"
        >
          <div className="space-y-6">
            <h1 className="text-[12rem] font-bold leading-none tracking-tighter text-white/5 select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
              404
            </h1>
            <div className="relative z-10 space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold heading-gradient">Page Not Found</h2>
              <p className="text-xl text-gray-400 max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved to another quadrant.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 bg-[#FF4800] hover:bg-[#e63f00] text-white px-10 py-4 rounded-full transition-all hover:scale-105 shadow-xl shadow-[#FF4800]/20"
            >
              <Home className="w-5 h-5" />
              Return to HQ
            </Link>
          </div>

          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale pointer-events-none select-none">
            {['Services', 'About', 'Insights', 'Contact'].map((item) => (
              <div key={item} className="text-sm uppercase tracking-widest font-bold">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
