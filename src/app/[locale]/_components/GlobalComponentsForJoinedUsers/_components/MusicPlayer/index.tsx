'use client'

import { useSoundSettings } from '@/zustand/store/useSoundSettings'
import dynamic from 'next/dynamic'

const Content = dynamic(() => import('./components/Content').then((m) => m.Content))

export const MusicPlayer = () => {
  const isMusicOpen = useSoundSettings(s => s.music)

  if (isMusicOpen) return <Content />
}