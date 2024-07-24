import { PainterDataContext } from '@/context/client'
import type { PropsWithChildren } from 'react'

export const PainterDataProvider = ({ children }: PropsWithChildren) => (
  <PainterDataContext.Provider
    value={{
      value: null,
    }}
  >
    {children}
  </PainterDataContext.Provider>
)
