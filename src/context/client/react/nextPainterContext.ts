import { createContext } from 'react'

export const NextPainterContext = createContext<{
  value?: string
}>({})
