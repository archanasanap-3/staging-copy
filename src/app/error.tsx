'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a14] px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8 max-w-lg"
      >
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-[#FF4800]">Oops!</h1>
          <h2 className="text-2xl font-semibold text-white">Something went wrong</h2>
          <p className="text-gray-400">
            An unexpected error occurred. Our engineers have been notified and are working to resolve it.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 bg-[#FF4800] hover:bg-[#e63f00] text-white px-8 py-3 rounded-full transition-all hover:scale-105"
          >
            <RefreshCcw className="w-5 h-5" />
            Try again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 border border-white/10 hover:bg-white/5 text-white px-8 py-3 rounded-full transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
