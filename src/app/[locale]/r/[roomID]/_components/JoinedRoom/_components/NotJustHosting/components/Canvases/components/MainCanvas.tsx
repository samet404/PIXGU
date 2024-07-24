'use client'

import { CanvasesMainDataContext } from '@/context/client'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useContext, useRef } from 'react'

export const MainCanvas = () => {
  const canvasesMainData = useContext(CanvasesMainDataContext)!
  const mainCanvas = useRef<HTMLCanvasElement>(null)

  useEffectOnce(() => {
    canvasesMainData.main = mainCanvas.current
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
