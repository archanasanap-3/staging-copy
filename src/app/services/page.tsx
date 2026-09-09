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
            : page === 'software'
              ? '/services#custom-software'
              : page === 'strategy'
                ? '/services#ai-strategy'
                : page === 'digital'
                  ? '/services#web-development'
                  : `/${page}`
      )
    }
  />
)
}
