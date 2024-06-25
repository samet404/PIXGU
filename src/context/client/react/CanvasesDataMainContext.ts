import type { CanvasesMainData } from '@/types'
import { createContext } from 'react'

export const CanvasesMainDataContext = createContext<CanvasesMainData | null>(
  null,
)
