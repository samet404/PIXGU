'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRef } from 'react'
import { useCanvasesMainData } from '@/zustand/store/useCanvasesMainData'
import { useCanvasDraw } from './hooks/useCanvasDraw'

export const GridAndTopCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const cellSideCount = useCanvasesMainData.getState().get().cellSideCount


  useEffectOnce(() => {
    const gctx = canvasRef.current!.getContext('2d')!

    useCanvasesMainData.getState().add({
      gctx,
      cellPixelLength: canvasRef.current!.width / cellSideCount,
      grid: canvasRef.current!,
    })
  })

  useCanvasDraw()

  return (
    <canvas
      width={480}
      height={480}
      ref={canvasRef}
      id="grid-canvas"
      className={clsxMerge(
        'absolute inset-0 z-30 rounded-lg',
      )}
    />
  )
}
