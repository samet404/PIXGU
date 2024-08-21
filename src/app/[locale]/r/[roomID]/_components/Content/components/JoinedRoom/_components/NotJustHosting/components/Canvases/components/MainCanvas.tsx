'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCanvasesMainData } from '@/zustand/store'
import { useRef } from 'react'

export const MainCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffectOnce(() => {
    if (!canvasRef.current) return
    canvasRef.current.height = canvasRef.current.width

    useCanvasesMainData.getState().add({
      main: canvasRef.current,
    })

    window.addEventListener('resize', () => {
      if (!canvasRef.current) return
      canvasRef.current.height = canvasRef.current.width
    })

    return () => {
      window.removeEventListener('resize', () => {
        if (!canvasRef.current) return
        canvasRef.current.height = canvasRef.current.width
      })
    }
  })

  return (
    <canvas
      ref={canvasRef}
      id="main-canvas"
      className="h-full rounded-lg bg-white"
    />
  )
}
