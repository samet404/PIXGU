import { type PropsWithChildren } from 'react'
import { CurrentPainterContext, NextPainterContext } from '@/context/client'

export const CurrentAndNextPainter = ({ children }: PropsWithChildren) => (
  <CurrentPainterContext.Provider value={{}}>
    <NextPainterContext.Provider value={{}}>
      {children}
    </NextPainterContext.Provider>
  </CurrentPainterContext.Provider>
)
