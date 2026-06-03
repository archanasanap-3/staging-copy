'use client'

import { useRouter } from 'next/navigation'
import InsightsPage from '@/components/features/insights/InsightsPage'

export default function Insights() {
  const router = useRouter()
  return <InsightsPage onNavigate={(page) => router.push(page === 'home' ? '/' : `/${page}`)} />
}
