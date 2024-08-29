'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCanvasesMainData } from '@/zustand/store'
import { useRef } from 'react'

export const MainCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cellSideCount = useCanvasesMainData.getState().get().cellSideCount
  const bodyRef = useRef(document.body)

  const getSize = () => bodyRef.current.offsetWidth * 0.45
  const setHeightAndWidth = () => {
    if (!canvasRef.current) return

    canvasRef.current.width = getSize()
    canvasRef.current.height = getSize()

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    useCanvasesMainData.getState().add({
      cellPixelLength: canvasRef.current.width / cellSideCount,
    })
  }

  useEffectOnce(() => {
    if (!canvasRef.current) return
    useCanvasesMainData.getState().add({
      main: canvasRef.current,
    })
    setHeightAndWidth()

    // window.addEventListener('resize', () => setHeightAndWidth())
    // return () => {
    // window.removeEventListener('resize', () => setHeightAndWidth())
    // }
  })

  return (
    <canvas
      ref={canvasRef}
      style={{
        imageRendering: 'pixelated',
      }}
      id="main-canvas"
      className="rounded-lg"
    />
  )
}
