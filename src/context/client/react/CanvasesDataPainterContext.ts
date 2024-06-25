import type { CanvasesPainterData } from '@/types'
import { createContext } from 'react'

export const CanvasesPainterDataContext =
  createContext<CanvasesPainterData | null>(null)
