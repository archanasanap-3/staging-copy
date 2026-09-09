'use client'

import { useRouter } from 'next/navigation'
import HomePageComponent from '@/components/features/home/HomePage'

export default function Home() {
  const router = useRouter()

  return (
    <HomePageComponent
      onNavigate={(page) =>
        router.push(
          page === 'home'
            ? '/'
            : page === 'automation'
              ? '/services#automation'
              : page === 'custom-software'
                ? '/services#custom-software'
                : page === 'ai-strategy'
                  ? '/services#ai-strategy'
                  : page === 'web-development'
                    ? '/services#web-development'
                    : `/${page}`
        )
      }
    />
  )
}