'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Home,
  Braces,
  Users,
  BookOpen,
  Mail,
  ArrowRight,
} from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

interface NavItem {
  label: string;
  page: string;
  description: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    page: 'home',
    description: 'Enterprise IT consulting overview',
    icon: <Home className="h-5 w-5" />,
  },
  {
    label: 'Services',
    page: 'services',
    description: 'Architecture, strategy, management, software',
    icon: <Braces className="h-5 w-5" />,
  },
  {
    label: 'About',
    page: 'about',
    description: 'Our team, mission, and expertise',
    icon: <Users className="h-5 w-5" />,
  },
  {
    label: 'Insights',
    page: 'insights',
    description: 'Blog articles and industry perspectives',
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    label: 'Contact',
    page: 'contact',
    description: 'Get in touch with our team',
    icon: <Mail className="h-5 w-5" />,
  },
];

interface BlogPost {
  title: string;
  category: string;
  page: string;
}

const BLOG_POSTS: BlogPost[] = [
  { title: 'The Manual Work Audit: How to Find 40% of Your Team\'s Time', category: 'Automation', page: 'insights' },
  { title: 'Custom CRM vs. Salesforce: When Off the Shelf Doesn\'t Fit', category: 'Custom Software', page: 'insights' },
  { title: 'AI for Your Business: The ROI First Framework', category: 'AI Strategy', page: 'insights' },
  { title: 'Why Your Next Product Should Be Built for Speed, Not Perfection', category: 'Automation', page: 'insights' },
  { title: 'The Data Silo Problem: How to Build One Source of Truth', category: 'Systems', page: 'insights' },
  { title: 'Why Your Website Is Costing You Leads', category: 'Web Development', page: 'insights' },
];

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} style={{ color: '#FF4800' }}>{part}</span>
    ) : (
      part
    )
  );
}

const ease = [0.4, 0, 0.2, 1] as const;

export default function SearchOverlay({ isOpen, onClose, onNavigate }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on open, lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Small delay to let animation start before focusing
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset query when overlay opens (via callback in setTimeout)
  const prevIsOpen = useRef(isOpen);
  useEffect(() => {
    if (!prevIsOpen.current && isOpen) {
      const t = setTimeout(() => setQuery(''), 0);
      return () => clearTimeout(t);
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

  // Keyboard: Escape closes
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Real-time filtering
  const filteredNavItems = useMemo(() => {
    if (!query.trim()) return NAV_ITEMS;
    const lowerQuery = query.toLowerCase();
    return NAV_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const filteredBlogPosts = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return BLOG_POSTS.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.category.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const handleNavigate = useCallback(
    (page: string) => {
      onClose();
      onNavigate(page);
    },
    [onClose, onNavigate]
  );

  const totalResults = filteredNavItems.length + filteredBlogPosts.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center modal-overlay"
          style={{
            background: 'rgba(255, 255, 255, 0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          onClick={onClose}
        >
          {/* Center panel */}
          <motion.div
            className="relative w-full max-w-[640px] mx-4 mt-[15vh]"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 flex items-center justify-center w-10 h-10 rounded-full hover:text-[#1a1a2e] hover:bg-black/[0.05] transition-all duration-200 cursor-pointer"
              style={{ color: 'rgba(0, 0, 0, 0.4)' }}
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Search input */}
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5"
                style={{ color: '#9ca3af' }}
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, articles..."
                className="w-full rounded-xl text-[16px] pl-12 pr-4 py-4 outline-none transition-shadow duration-200"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #e5e7eb',
                  color: '#1a1a2e',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(255, 72, 0, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255, 72, 0, 0.4)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-[#1a1a2e] transition-colors cursor-pointer"
                  style={{ color: 'rgba(0, 0, 0, 0.3)' }}
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results panel */}
            <div
              className="mt-3 rounded-xl overflow-hidden max-h-[60vh] overflow-y-auto"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              {/* Results count */}
              {query.trim() && (
                <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <p className="text-[12px]" style={{ color: '#9ca3af' }}>
                    {totalResults} result{totalResults !== 1 ? 's' : ''} found
                  </p>
                </div>
              )}

              {/* Navigation results */}
              {filteredNavItems.length > 0 && (
                <div>
                  {!query.trim() && (
                    <div className="px-4 pt-4 pb-2">
                      <p className="text-[11px] uppercase tracking-wider font-medium" style={{ color: '#9ca3af' }}>
                        Pages
                      </p>
                    </div>
                  )}
                  {filteredNavItems.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => handleNavigate(item.page)}
                      className="w-full flex items-center gap-4 px-4 py-3.5 text-left transition-colors duration-150 hover:bg-black/[0.03] cursor-pointer group"
                    >
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 transition-colors duration-150 group-hover:bg-black/[0.05]"
                        style={{ background: 'rgba(0, 0, 0, 0.03)', color: '#6b7280' }}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-medium" style={{ color: '#1a1a2e' }}>
                          {highlightMatch(item.label, query)}
                        </p>
                        <p className="text-[13px]" style={{ color: '#6b7280' }}>
                          {highlightMatch(item.description, query)}
                        </p>
                      </div>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                        style={{ color: '#FF4800' }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Blog post results */}
              {filteredBlogPosts.length > 0 && (
                <div>
                  <div className="px-4 pt-3 pb-2 mt-1" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
                    <p className="text-[11px] uppercase tracking-wider font-medium" style={{ color: '#9ca3af' }}>
                      Articles
                    </p>
                  </div>
                  {filteredBlogPosts.map((post, index) => (
                    <button
                      key={post.title}
                      onClick={() => handleNavigate(post.page)}
                      className="w-full flex items-start gap-4 px-4 py-3.5 text-left transition-colors duration-150 hover:bg-black/[0.03] cursor-pointer group"
                    >
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 transition-colors duration-150 group-hover:bg-black/[0.05]"
                        style={{ background: 'rgba(0, 0, 0, 0.03)', color: '#6b7280' }}
                      >
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-medium leading-snug" style={{ color: '#1a1a2e' }}>
                          {highlightMatch(post.title, query)}
                        </p>
                        <p className="text-[12px] mt-1" style={{ color: '#FF4800' }}>
                          {post.category}
                        </p>
                      </div>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                        style={{ color: '#FF4800' }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* No results */}
              {query.trim() && totalResults === 0 && (
                <div className="px-4 py-10 text-center">
                  <Search className="h-8 w-8 mx-auto mb-3" style={{ color: '#9ca3af' }} />
                  <p className="text-[14px]" style={{ color: '#6b7280' }}>
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-[13px] mt-1" style={{ color: '#9ca3af' }}>
                    Try searching for a page or article title
                  </p>
                </div>
              )}
            </div>

            {/* Keyboard hint */}
            <div className="mt-3 flex items-center justify-center gap-4">
              <div className="flex items-center gap-1.5">
                <kbd
                  className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] font-medium"
                  style={{
                    background: 'rgba(0, 0, 0, 0.04)',
                    color: '#9ca3af',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                >
                  ESC
                </kbd>
                <span className="text-[11px]" style={{ color: '#9ca3af' }}>to close</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd
                  className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] font-medium"
                  style={{
                    background: 'rgba(0, 0, 0, 0.04)',
                    color: '#9ca3af',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                >
                  ↑↓
                </kbd>
                <span className="text-[11px]" style={{ color: '#9ca3af' }}>to navigate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd
                  className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] font-medium"
                  style={{
                    background: 'rgba(0, 0, 0, 0.04)',
                    color: '#9ca3af',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                >
                  ↵
                </kbd>
                <span className="text-[11px]" style={{ color: '#9ca3af' }}>to select</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
