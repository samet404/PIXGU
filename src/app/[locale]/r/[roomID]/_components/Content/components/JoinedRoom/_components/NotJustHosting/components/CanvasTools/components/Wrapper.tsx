'use client'

import { usePainterData } from '@/zustand/store'
import type { PropsWithChildren } from 'react'

export const Wrapper = ({ children }: PropsWithChildren) => {
  const amIPainter = usePainterData((s) => s.amIPainter)
  if (amIPainter) return children
}
