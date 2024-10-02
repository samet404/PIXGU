'use client'

import { useSettings } from '@/zustand/store'
import dynamic from 'next/dynamic'

const Content = dynamic(() => import('./Content').then((m) => m.Content))

export const States = () => {
  const developerMode = useSettings((s) => s.developerMode)

  if (developerMode) return <Content />
}
