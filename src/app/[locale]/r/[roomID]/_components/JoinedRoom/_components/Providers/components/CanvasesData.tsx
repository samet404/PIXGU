import { CanvasesDataContext } from '@/context/client'
import { type ReactNode } from 'react'

const CanvasesData = ({ children }: Props) => {
  const value = {
    cellPixelLength: 0,
    cellSideCount: 40,

    draft: null,
    main: null,

    painter: {
      isPainter: null,
      lastDrawedPixel: null,
      painting: null,
      pixelHistory: {},
    },
  }

  return (
    <CanvasesDataContext.Provider value={value}>
      {children}
    </CanvasesDataContext.Provider>
  )
}

export default CanvasesData

type Props = {
  children: ReactNode
}
