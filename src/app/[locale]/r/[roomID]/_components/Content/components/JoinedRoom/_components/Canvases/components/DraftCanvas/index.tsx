'use client'

import { useRef } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCanvasesMainData } from '@/zustand/store'
import { roundDownToNearest } from '@/utils/roundDownToNearest'

export const DraftCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cellSideCount = useCanvasesMainData.getState().get().cellSideCount
  const bodyRef = useRef(document.body)

  const getSize = () =>
    roundDownToNearest(bodyRef.current.offsetHeight * 0.8, 40)
  const setHeightAndWidth = () => {
    if (!canvasRef.current) return

    canvasRef.current.width = getSize()
    canvasRef.current.height = getSize()

    const ctx = canvasRef.current.getContext('2d')!
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
      ref={canvasRef}
      id="draft-canvas"
      style={{
        imageRendering: 'pixelated',
      }}
      className="absolute bottom-0 left-0 right-0 top-0 z-30 rounded-lg"
    />
  )
}
