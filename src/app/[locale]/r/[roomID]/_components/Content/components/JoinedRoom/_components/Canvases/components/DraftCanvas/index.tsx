'use client'

import { useRef } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCanvasesMainData } from '@/zustand/store'

export const DraftCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cellSideCount = useCanvasesMainData.getState().get().cellSideCount
  const bodyRef = useRef(document.body)

  const getSize = () => bodyRef.current.offsetWidth * 0.45
  const setHeightAndWidth = () => {
    if (!canvasRef.current) return

    canvasRef.current.width = getSize()
    canvasRef.current.height = getSize()

    useCanvasesMainData.getState().add({
      draft: canvasRef.current,
      cellPixelLength: canvasRef.current.width / cellSideCount,
    })
  }

  useEffectOnce(() => {
    if (!canvasRef.current) return

    useCanvasesMainData.getState().add({
      draft: canvasRef.current,
    })
    setHeightAndWidth()

    // window.addEventListener('resize', () => setHeightAndWidth())
    // return () => {
    //   window.removeEventListener('resize', () => setHeightAndWidth())
    // }
  })

  return (
    <canvas
      ref={canvasRef}
      id="draft-canvas"
      style={{
        imageRendering: 'pixelated',
      }}
      className="absolute bottom-0 left-0 right-0 top-0 z-30 rounded-lg"
    />
  )
}
