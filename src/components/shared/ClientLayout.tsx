'use client'

import { useState, Suspense, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import SmoothScroll from '@/components/shared/SmoothScroll'
import Preloader from '@/components/shared/Preloader'
import Navbar from '@/components/shared/Navbar'
import AppLayout from '@/components/shared/AppLayout'
import Footer from '@/components/shared/Footer'
import BackToTop from '@/components/features/common/BackToTop'
import CustomCursor from '@/components/shared/CustomCursor'
import CookieConsent from '@/components/features/common/CookieConsent'
import SearchOverlay from '@/components/features/common/SearchOverlay'
import KeyboardHint from '@/components/features/common/KeyboardHint'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  },
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-[#FF4800] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)

  // Determine current page name for screen readers
  const pageName = pathname === '/' ? 'Home' : pathname.replace('/', '').charAt(0).toUpperCase() + pathname.slice(2)

  return (
    <SmoothScroll>
      <CustomCursor>
        <AppLayout className="noise-overlay bg-white dark:bg-[#121212] text-[#1a1a2e] dark:text-[#f0f0f5]">
          <Preloader />
          <Navbar onSearchToggle={() => setSearchOpen(prev => !prev)} />

          {/* Screen reader live region for page navigation announcements */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {pageName} page
          </div>

          <main className="flex-1 w-full" role="main" tabIndex={0}>
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <Suspense fallback={<PageLoader />}>
                  {children}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer />
          <SearchOverlay 
            isOpen={searchOpen} 
            onClose={() => setSearchOpen(false)} 
            onNavigate={(page) => { 
              setSearchOpen(false); 
              router.push(page === 'home' ? '/' : `/${page}`);
            }} 
          />

          <BackToTop />
          <CookieConsent />
          <KeyboardHint />
        </AppLayout>
      </CustomCursor>
    </SmoothScroll>
  )
}
