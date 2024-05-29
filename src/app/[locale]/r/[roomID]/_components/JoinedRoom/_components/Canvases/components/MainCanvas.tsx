'use client'

import { CanvasesDataContext } from '@/context/client'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useContext, useRef } from 'react'

export const MainCanvas = () => {
  const canvasData = useContext(CanvasesDataContext)!
  const mainCanvas = useRef<HTMLCanvasElement>(null)

  useEffectOnce(() => {
    canvasData.main = mainCanvas.current
  })

  return (
    <canvas
      ref={mainCanvas}
      id="main-canvas"
      width={600}
      height={600}
      className="rounded-lg"
    />
  )
}
