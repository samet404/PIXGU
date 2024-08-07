'use client'

import { Fragment, useContext, useRef } from 'react'
import { useCanvasDraw } from './hooks/useCanvasDraw'
import { CanvasesMainDataContext } from '@/context/client'
import { useEffectOnce } from '@/hooks/useEffectOnce'

export const DraftCanvas = () => {
  const canvasData = useContext(CanvasesMainDataContext)!
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffectOnce(() => {
    canvasRef.current!.height = canvasRef.current!.width * 1
    canvasData.draft = canvasRef.current

    window.addEventListener('resize', () => {
      canvasRef.current!.height = canvasRef.current!.width * 1
    })
  })
  useCanvasDraw()

  return (
    <Fragment>
      <canvas
        ref={canvasRef}
        id="Draftcanvas-canvas"
        className="absolute bottom-0 left-0 right-0 top-0 z-30 rounded-lg"
      />
    </Fragment>
  )
}
