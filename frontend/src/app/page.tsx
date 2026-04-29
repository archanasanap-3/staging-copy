'use client'

import { useState, useCallback, useEffect, lazy, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import SmoothScroll from '@/components/straveda/SmoothScroll'
import Preloader from '@/components/straveda/Preloader'
import Navbar from '@/components/straveda/Navbar'
import AppLayout from '@/components/straveda/AppLayout'
import Footer from '@/components/straveda/Footer'
import BackToTop from '@/components/straveda/BackToTop'
import CustomCursor from '@/components/straveda/CustomCursor'
import CookieConsent from '@/components/straveda/CookieConsent'
import ScrollProgress from '@/components/straveda/ScrollProgress'
import SearchOverlay from '@/components/straveda/SearchOverlay'
import KeyboardHint from '@/components/straveda/KeyboardHint'

const pages = ['home', 'services', 'about', 'insights', 'careers', 'contact', 'testimonials'] as const
type Page = typeof pages[number]

const pageComponents: Record<Page, React.LazyExoticComponent<React.ComponentType<{ onNavigate: (page: string) => void }>>> = {
  home: lazy(() => import('@/components/straveda/pages/HomePage')),
  services: lazy(() => import('@/components/straveda/pages/ServicesPage')),
  about: lazy(() => import('@/components/straveda/pages/AboutPage')),
  insights: lazy(() => import('@/components/straveda/pages/InsightsPage')),
  careers: lazy(() => import('@/components/straveda/pages/CareersPage')),
  contact: lazy(() => import('@/components/straveda/pages/ContactPage')),
  testimonials: lazy(() => import('@/components/straveda/pages/TestimonialsPage')),
}

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

function HomeContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchParams = useSearchParams()

  // Handle initial page from query param
  useEffect(() => {
    const pageParam = searchParams.get('page') as Page
    if (pageParam && pages.includes(pageParam)) {
      setCurrentPage(pageParam)
    }
  }, [searchParams])

  // Handle back/forward buttons
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.page) {
        setCurrentPage(e.state.page)
      } else {
        setCurrentPage('home')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleNavigate = useCallback((page: string) => {
    const validPage = page as Page
    if (pages.includes(validPage)) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      window.dispatchEvent(new CustomEvent('page-change'))
      
      // Update URL without reloading
      const newUrl = validPage === 'home' ? '/' : `?page=${validPage}`
      window.history.pushState({ page: validPage }, '', newUrl)
      
      setTimeout(() => {
        setCurrentPage(validPage)
      }, 50)
    }
  }, [])

  // ── Keyboard navigation ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      // Skip when user is typing in an input or textarea
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return
      }

      const idx = pages.indexOf(currentPage)

      switch (e.key) {
        case 'ArrowRight': {
          e.preventDefault()
          const next = e.shiftKey
            ? (idx - 1 + pages.length) % pages.length
            : (idx + 1) % pages.length
          handleNavigate(pages[next])
          break
        }
        case 'ArrowLeft': {
          e.preventDefault()
          const next = e.shiftKey
            ? (idx + 1) % pages.length
            : (idx - 1 + pages.length) % pages.length
          handleNavigate(pages[next])
          break
        }
        case 'Home': {
          e.preventDefault()
          handleNavigate('home')
          break
        }
        case 'End': {
          e.preventDefault()
          handleNavigate('contact')
          break
        }
        case 'Escape': {
          window.dispatchEvent(new CustomEvent('close-all'))
          break
        }
        case '1': case '2': case '3': case '4': case '5': case '6': {
          if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            const pageIdx = parseInt(e.key) - 1
            if (pageIdx >= 0 && pageIdx < pages.length) {
              e.preventDefault()
              handleNavigate(pages[pageIdx])
            }
          }
          break
        }
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, handleNavigate])

  // ── Update document title & announce to screen readers ──
  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'Straveda — Enterprise IT Consulting & Technology Strategy',
      services: 'Services — Straveda',
      about: 'About — Straveda',
      insights: 'Insights — Straveda',
      careers: 'Careers — Straveda',
      contact: 'Contact — Straveda',
      testimonials: 'Testimonials — Straveda',
    }
    document.title = titles[currentPage]
  }, [currentPage])

  const CurrentPageComponent = pageComponents[currentPage]

  return (
    <SmoothScroll>
      <CustomCursor>
        <AppLayout className="noise-overlay bg-white dark:bg-[#121212] text-[#1a1a2e] dark:text-[#f0f0f5]">
          <Preloader />
          <ScrollProgress />
          <Navbar currentPage={currentPage} onNavigate={handleNavigate} onSearchToggle={() => setSearchOpen(prev => !prev)} />

          {/* Screen reader live region for page navigation announcements */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} page
          </div>

          <main className="flex-1 w-full" role="main" tabIndex={0}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <Suspense fallback={<PageLoader />}>
                  <CurrentPageComponent onNavigate={handleNavigate} />
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer onNavigate={handleNavigate} />
          <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={(page) => { setSearchOpen(false); handleNavigate(page); }} />

          <BackToTop />
          <CookieConsent />
          <KeyboardHint />
        </AppLayout>
      </CustomCursor>
    </SmoothScroll>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<PageLoader />}>
      <HomeContent />
    </Suspense>
  )
}
