'use client'

import { useRef } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCanvasesMainData } from '@/zustand/store'
import { roundDownToNearest } from '@/utils/roundDownToNearest'
import { calcPercentage } from '@/utils/calcPercentage'

export const DraftCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cellSideCount = useCanvasesMainData.getState().get().cellSideCount

  const setHeightAndWidth = () => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')!

    // disabled antialiasing
    ctx.imageSmoothingEnabled = false

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
      width={480}
      height={480}
      ref={canvasRef}
      id="draft-canvas"
      style={{
        imageRendering: 'pixelated',
      }}
      className="absolute bottom-0 left-0 right-0 top-0 z-30 rounded-lg"
    />
  )
}
