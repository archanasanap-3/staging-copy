'use client'

import { useRouter } from 'next/navigation'
import ContactPage from '@/components/features/contact/ContactPage'

export default function Contact() {
  const router = useRouter()
  return <ContactPage onNavigate={(page) => router.push(page === 'home' ? '/' : `/${page}`)} />
}
