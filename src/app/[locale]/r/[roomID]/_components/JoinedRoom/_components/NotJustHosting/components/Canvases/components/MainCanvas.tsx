'use client'

import { CanvasesMainDataContext } from '@/context/client'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useContext, useRef } from 'react'

export const MainCanvas = () => {
  const canvasesMainData = useContext(CanvasesMainDataContext)!
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffectOnce(() => {
    canvasRef.current!.height = canvasRef.current!.width * 1
    canvasesMainData.main = canvasRef.current

    window.addEventListener('resize', () => {
      canvasRef.current!.height = canvasRef.current!.width * 1
    })
  })

  return (
    <canvas ref={canvasRef} id="main-canvas" className="w-full rounded-lg" />
  )
}
