import type { CanvasData } from '@/types'
import { createContext } from 'react'

export const CanvasesDataContext = createContext<CanvasData | null>(null)
