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