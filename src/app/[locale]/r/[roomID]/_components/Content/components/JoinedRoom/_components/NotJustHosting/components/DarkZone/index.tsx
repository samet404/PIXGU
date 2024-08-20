'use client'

import { useIsGamePaused } from '@/zustand/store/useIsGamePaused'
import dynamic from 'next/dynamic'

const Content = dynamic(() =>
  import('./components/Content').then((m) => m.Content),
)

export const DarkZone = () => {
  const paused = useIsGamePaused((state) => state.get())

  return (
    paused.isPaused && paused.reason.code !== 'connectingHost' && <Content />
  )
}
