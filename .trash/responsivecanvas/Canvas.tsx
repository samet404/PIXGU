'use client'

import { useEventListener } from '@/hooks'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { getElementByID } from '@/utils/getElementByID'
import { useRef } from 'react'

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  //   useEventListener(document, 'resize', () => {
  //     console.log(a)
  //   })

  return (
    <canvas
      ref={canvasRef}
      id="responsive-canvas"
      className="w-full bg-pink-400"
    />
  )
}
