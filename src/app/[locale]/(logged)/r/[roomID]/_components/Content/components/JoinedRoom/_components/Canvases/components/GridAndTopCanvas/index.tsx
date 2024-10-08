'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRef, type MouseEvent } from 'react'
import { useCanvasesMainData } from '@/zustand/store'
import { useCanvasDraw } from './hooks/useCanvasDraw'
import { roundDownToNearest } from '@/utils/roundDownToNearest'
import { calcPercentage } from '@/utils/calcPercentage'

export const GridAndTopCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cellSideCount = useCanvasesMainData.getState().get().cellSideCount

  const setHeightAndWidth = () => {
    if (!canvasRef.current) return

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
      width={480}
      height={480}
      ref={canvasRef}
      id="grid-canvas"
      className={clsxMerge(
        'absolute bottom-0 left-0 right-0 top-0 z-30 cursor-crosshair rounded-lg',
      )}
    />
  )
}
