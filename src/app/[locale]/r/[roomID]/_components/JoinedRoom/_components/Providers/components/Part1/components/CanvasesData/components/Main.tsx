import type { RChildren, CanvasesMainData } from '@/types'
import { CanvasesMainDataContext } from '@/context/client'
import { objDefineReadonly } from '@/utils/objDefineReadonly'

export const Main = ({ children }: RChildren) => {
  const value = {
    cellSideCount: 40,

    draft: null,
    main: null,
  }

  objDefineReadonly(value, 'cellPixelLength', 0)

  return (
    <CanvasesMainDataContext.Provider value={value as CanvasesMainData}>
      {children}
    </CanvasesMainDataContext.Provider>
  )
}
