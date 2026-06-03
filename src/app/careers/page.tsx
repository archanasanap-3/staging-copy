'use client'

import { useRouter } from 'next/navigation'
import CareersPage from '@/components/features/careers/CareersPage'

export default function Careers() {
  const router = useRouter()
  return <CareersPage onNavigate={(page) => router.push(page === 'home' ? '/' : `/${page}`)} />
}
