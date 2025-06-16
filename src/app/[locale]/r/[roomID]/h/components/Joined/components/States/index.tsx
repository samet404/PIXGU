'use client'

import { useDeveloperSettings } from '@/zustand/store/useDeveloperSettings'
import dynamic from 'next/dynamic'

const Content = dynamic(() => import('./Content').then((m) => m.Content))

export const States = () => {
  const developerMode = useDeveloperSettings((s) => s.isOpen)

  if (developerMode) return <Content />
}
