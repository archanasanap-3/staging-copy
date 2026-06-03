'use client'

import { useRouter } from 'next/navigation'
import AboutPage from '@/components/features/about/AboutPage'

export default function About() {
  const router = useRouter()
  return <AboutPage onNavigate={(page) => router.push(page === 'home' ? '/' : `/${page}`)} />
}
