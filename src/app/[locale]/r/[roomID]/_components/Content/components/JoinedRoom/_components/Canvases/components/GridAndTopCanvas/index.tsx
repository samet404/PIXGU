'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRef } from 'react'
import { useCanvasesMainData } from '@/zustand/store'
import { useCanvasDraw } from './hooks/useCanvasDraw'
import { roundDownToNearest } from '@/utils/roundDownToNearest'

export const GridAndTopCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cellSideCount = useCanvasesMainData.getState().get().cellSideCount
  const bodyRef = useRef(document.body)

  const getSize = () =>
    roundDownToNearest(bodyRef.current.offsetHeight * 0.8, 40)
  const setHeightAndWidth = () => {
    if (!canvasRef.current) return

    canvasRef.current.width = getSize()
    canvasRef.current.height = getSize()

    useCanvasesMainData.getState().add({
      cellPixelLength: canvasRef.current.width / cellSideCount,
    })
  }

  useEffectOnce(() => {
    if (!canvasRef.current) return
    useCanvasesMainData.getState().add({
      grid: canvasRef.current,
    })
    setHeightAndWidth()

    // window.addEventListener('resize', () => setHeightAndWidth())
    // return () => {
    //   window.removeEventListener('resize', () => setHeightAndWidth())
    // }
  })

  useCanvasDraw()

  return (
    <canvas
      ref={canvasRef}
      id="grid-canvas"
      style={{
        imageRendering: 'pixelated',
      }}
      className={clsxMerge(
        'absolute bottom-0 left-0 right-0 top-0 z-30 cursor-crosshair rounded-lg',
      )}
    />
  )
}
