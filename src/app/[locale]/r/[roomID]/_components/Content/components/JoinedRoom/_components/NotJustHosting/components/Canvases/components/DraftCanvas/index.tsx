'use client'

import { useRef } from 'react'
import { useCanvasDraw } from './hooks/useCanvasDraw'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCanvasesMainData } from '@/zustand/store'

export const DraftCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffectOnce(() => {
    if (!canvasRef.current) return
    canvasRef.current.width = canvasRef.current.height

    useCanvasesMainData.getState().add({
      draft: canvasRef.current,
    })

    window.addEventListener('resize', () => {
      if (!canvasRef.current) return
      canvasRef.current.width = canvasRef.current.height
    })

    return () => {
      window.removeEventListener('resize', () => {
        if (!canvasRef.current) return
        canvasRef.current.width = canvasRef.current.height
      })
    }
  })

  useCanvasDraw()

  return (
    <canvas
      ref={canvasRef}
      id="draft-canvas"
      className="absolute bottom-0 left-0 right-0 top-0 z-30 h-full rounded-lg"
    />
  )
}
