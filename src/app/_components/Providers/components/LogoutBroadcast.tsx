'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { BroadcastChannel } from 'broadcast-channel'
import { useRouter } from 'next/navigation'
import type { PropsWithChildren } from 'react'

export const LogoutBroadcast = ({ children }: PropsWithChildren) => {
  const broadcastChannel = new BroadcastChannel('logout')
  const router = useRouter()

  useEffectOnce(() => {
    broadcastChannel.onmessage = () => router.push('/')
  })

  return children
}