'use client'

import { useRouter } from 'next/navigation'
import TestimonialsPage from '@/components/features/common/TestimonialsPage'

export default function Testimonials() {
  const router = useRouter()
  return <TestimonialsPage onNavigate={(page) => router.push(page === 'home' ? '/' : `/${page}`)} />
}
