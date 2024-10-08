'use client'

import { useWhoIsPainterClient } from '@/zustand/store'
import type { PropsWithChildren } from 'react'

export const Wrapper = ({ children }: PropsWithChildren) => {
  const whoIsPainter = useWhoIsPainterClient((s) => s.value)

  if (whoIsPainter.status === 'thereIsNoPainter') return
  if (whoIsPainter.amIPainter) return children
}
