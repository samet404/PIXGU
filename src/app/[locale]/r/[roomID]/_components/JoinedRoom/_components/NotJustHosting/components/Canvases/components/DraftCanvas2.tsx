'use client'

import { Fragment, useContext, useRef } from 'react'
import { CanvasesMainDataContext } from '@/context/client'
import { useEffectOnce } from '@/hooks/useEffectOnce'

export const DraftCanvas2 = () => {
  const canvasData = useContext(CanvasesMainDataContext)!
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffectOnce(() => {
    canvasRef.current!.height = canvasRef.current!.width * 1
    canvasData.draft2 = canvasRef.current

    window.addEventListener('resize', () => {
      canvasRef.current!.height = canvasRef.current!.width * 1
    })
  })

  return (
    <Fragment>
      <canvas
        ref={canvasRef}
        id="Draftcanvas-canvas"
        className="absolute bottom-0 left-0 right-0 top-0 z-30 w-full rounded-lg"
      />
    </Fragment>
  )
}
