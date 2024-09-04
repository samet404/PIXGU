'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRef } from 'react'
import { useCanvasesMainData } from '@/zustand/store'
import { useCanvasDraw } from './hooks/useCanvasDraw'
import { roundDownToNearest } from '@/utils/roundDownToNearest'
import { calcPercentage } from '@/utils/calcPercentage'

export const GridAndTopCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cellSideCount = useCanvasesMainData.getState().get().cellSideCount
  const bodyRef = useRef(document.body)

  const setHeightAndWidth = () => {
    if (!canvasRef.current) return
    const width = (() => {
      const containerWidth = roundDownToNearest(
        document.getElementById('canvasesContainer')!.clientWidth,
        80,
      )

      // if container width is greater than 90% of the screen height we set it to 90% of the screen height
      const screenMaxHeight = calcPercentage(90, document.body.clientHeight)
      if (containerWidth >= screenMaxHeight)
        return roundDownToNearest(screenMaxHeight, 80)

      return containerWidth
    })()

    console.log(width)

    canvasRef.current.width = width
    canvasRef.current.height = width

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
