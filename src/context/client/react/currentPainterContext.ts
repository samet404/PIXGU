import { createContext } from 'react'

export const CurrentPainterContext = createContext<{
  value?: string
}>({})
