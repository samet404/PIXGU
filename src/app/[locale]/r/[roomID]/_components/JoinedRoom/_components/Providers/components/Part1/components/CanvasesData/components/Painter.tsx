import type { RChildren, CanvasesPainterData } from '@/types'
import { CanvasesPainterDataContext } from '@/context/client'
import { objDefineReadonly } from '@/utils/objDefineReadonly'

export const Painter = ({ children }: RChildren) => {
  const value: CanvasesPainterData = {
    isPainter: false,
    data: {
      lastDrawedPixel: null,
      painting: false,
      pixelHistory: {},
    },
  }

  objDefineReadonly(value, 'cellPixelLength', 0)

  return (
    <CanvasesPainterDataContext.Provider value={value}>
      {children}
    </CanvasesPainterDataContext.Provider>
  )
}
