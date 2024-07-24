import type { PainterData } from '@/types'
import { createContext } from 'react'

export const PainterDataContext = createContext<PainterData>({
  value: null,
})
