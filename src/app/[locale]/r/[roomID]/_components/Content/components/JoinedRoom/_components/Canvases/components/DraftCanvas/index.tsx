'use client'

import { useRef } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCanvasesMainData } from '@/zustand/store'
import { roundDownToNearest } from '@/utils/roundDownToNearest'
import { calcPercentage } from '@/utils/calcPercentage'

export const DraftCanvas = () => {
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
      console.log(document.body.clientHeight)
      const screenMaxHeight = calcPercentage(90, document.body.clientHeight)
      console.log(screenMaxHeight + 'maxScreenHeight')
      if (containerWidth > screenMaxHeight)
        return roundDownToNearest(screenMaxHeight, 40)

      return containerWidth
    })()

    canvasRef.current.width = width
    canvasRef.current.height = width

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
