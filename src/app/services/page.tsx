'use client'

import { useRouter } from 'next/navigation'
import ServicesPage from '@/components/features/services/ServicesPage'

export default function Services() {
  const router = useRouter()

  return (
    <ServicesPage
      onNavigate={(page) =>
        router.push(
          page === 'home'
            ? '/'
            : page === 'automation'
              ? '/services#automation'
              : page === 'custom-software'
                ? '/services#custom-software'
                : page === 'strategy' || page === 'ai-strategy'
                  ? '/services#ai-strategy'
                  : page === 'web-development'
                    ? '/services#web-development'
                    : `/${page}`
        )
      }
    />
  )
}