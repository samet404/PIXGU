import type { CanvasesMainData } from '@/types'
import { CanvasesMainDataContext } from '@/context/client'
import { objDefineReadonly } from '@/utils/objDefineReadonly'
import type { PropsWithChildren } from 'react'

export const CanvasesMainDataProvider = ({ children }: PropsWithChildren) => {
  const value: CanvasesMainData = {
    cellSideCount: null,
    cellPixelLength: null,
    draft: null,
    main: null,
  }

  objDefineReadonly(value, 'cellSideCount', 40)

  return (
    <CanvasesMainDataContext.Provider value={value}>
      {children}
    </CanvasesMainDataContext.Provider>
  )
}
