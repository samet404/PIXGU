'use client'

import { useAmISpectator } from '@/zustand/store/useAmISpectator'
import dynamic from 'next/dynamic'

const Content = dynamic(() =>
  import('./components/Content').then((m) => m.Content),
)

export const Spectator = () => {
  const amISpectator = useAmISpectator((s) => s.amISpectator)

  if (amISpectator) return <Content />
}
