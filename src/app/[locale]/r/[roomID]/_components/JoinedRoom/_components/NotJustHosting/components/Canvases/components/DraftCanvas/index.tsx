'use client'

import { Fragment, useContext, useRef } from 'react'
import { useCanvasDraw } from './hooks/useCanvasDraw'
import dynamic from 'next/dynamic'
import { CanvasesMainDataContext } from '@/context/client'
import { useEffectOnce } from '@/hooks/useEffectOnce'

const ConnectToPeers = dynamic(
  () => import('./components/ConnectToPeers').then((m) => m.ConnectToPeers),
  {
    ssr: false,
  },
)

export const DraftCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasData = useContext(CanvasesMainDataContext)!

  useEffectOnce(() => {
    canvasData.draft = canvasRef.current
  })

  useCanvasDraw()

  return (
    <Fragment>
      <canvas
        ref={canvasRef}
        id="Draftcanvas-canvas"
        width={600}
        height={600}
        className="absolute bottom-0 left-0 right-0 top-0 z-30 rounded-lg"
      />
      <ConnectToPeers />
    </Fragment>
  )
}
