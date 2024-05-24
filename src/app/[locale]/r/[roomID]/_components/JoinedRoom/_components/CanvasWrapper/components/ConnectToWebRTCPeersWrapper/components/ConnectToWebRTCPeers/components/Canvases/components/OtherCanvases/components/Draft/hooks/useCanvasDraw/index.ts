// types
import type { WebRTCConnData, PeersRef, CanvasDataRef } from '@/types'

import { draw } from './func'
import { useEventListener } from 'usehooks-ts'
import { finishedPosition } from './func/finishedPosition'
import { decodedOnPeerData } from '@/utils/decodedOnPeerData'
import { useInitCanvasData } from './hooks/useInitCanvasData'

export const useCanvasDraw = ({ peersRef, canvasDataRef }: Args) => {
  useInitCanvasData({ canvasDataRef })

  for (const userID in peersRef.current) {
    if (!peersRef.current[userID]?.peer) return null

    const mouseOut = () => {
      console.log('mouseOut')
      if (!canvasDataRef.current.painter?.isPainter) return null

      const dc = canvasDataRef.current.draft
      if (!dc) return null

      canvasDataRef.current.painter.painting = false
      const dctx = dc.getContext('2d')!

      dctx.beginPath()
    }

    const startPosition = (e: MouseEvent) => {
      console.log('startPosition')
      if (e.button !== 0) return null

      canvasDataRef.current.painter.painting = true

      draw()
    }

    // const drawing = (e: MouseEvent) => {
    //   if (!paintingRef.current) return null
    //   if (e.button !== 0) return null

    //   const result = draw(
    //     draftCanvasRef.current!,
    //     dctxRef.current!,
    //     cellPixelLengthRef.current!,
    //     pixelHistoryRef,
    //     wsRoomDrawChannel,
    //     lastDrawedPixelRef,
    //     e,
    //   )
    // }

    // const mouseup = () =>
    //   finishedPosition(
    //     paintingRef,
    //     mctxRef.current!,
    //     dctxRef.current!,
    //     draftCanvasRef.current!,
    //   )

    // // add event listeners to the draft canvas
    // useEventListener('mousedown', startPosition, draftCanvasRef)
    // useEventListener('mouseup', mouseup, draftCanvasRef)
    // useEventListener('mousemove', drawing, draftCanvasRef)
    // useEventListener('mouseout', mouseOut, draftCanvasRef)
  }
}
type Args = {
  canvasDataRef: CanvasDataRef
  peersRef: PeersRef
}
