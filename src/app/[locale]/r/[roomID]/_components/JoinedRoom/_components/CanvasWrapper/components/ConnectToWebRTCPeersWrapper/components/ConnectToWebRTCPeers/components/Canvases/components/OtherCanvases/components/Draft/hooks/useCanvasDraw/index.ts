// types
import type {
  LastDrawedPixel,
  PixelHistory,
  WebRTCConnData,
  DrawDataRef,
  PeersRef,
} from '@/types'
// react
import { useRef } from 'react'
// jotai
import { useAtomValue } from 'jotai'
import { cellSideCountAtom } from '../../../../atoms'
// funcs
import { addGrid, draw, rtcDrawEvent } from './func/_index'
import { useEventListener } from 'usehooks-ts'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { finishedPosition } from './func/finishedPosition'
import { decodedOnPeerData } from '@/utils/decodedOnPeerData'

export const useCanvasDraw = (peersRef: PeersRef) => {
  // atoms
  const cellSideCount = useAtomValue(cellSideCountAtom)

  // canvas variables
  const draftCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const mainCanvasRef = useRef<HTMLCanvasElement>()
  const dctxRef = useRef<CanvasRenderingContext2D>()
  const mctxRef = useRef<CanvasRenderingContext2D>()
  const lastDrawedPixelRef = useRef<LastDrawedPixel>()
  const cellPixelLengthRef = useRef<number>()
  const paintingRef = useRef<boolean>(false)
  const pixelHistoryRef = useRef<PixelHistory>({})

  // initializing somethings
  useEffectOnce(() => {
    draftCanvasRef.current = document.getElementById(
      `draft-canvas`,
    ) as HTMLCanvasElement

    mainCanvasRef.current = document.getElementById(
      `main-canvas`,
    ) as HTMLCanvasElement

    const draftCanvas = draftCanvasRef.current

    dctxRef.current = draftCanvasRef.current.getContext('2d')!
    mctxRef.current = mainCanvasRef.current.getContext('2d')!

    const draftCanvasW = draftCanvas.width
    const draftCanvasH = draftCanvas.height

    cellPixelLengthRef.current = draftCanvasW / cellSideCount

    const mctx = mctxRef.current

    mctx.beginPath()
    mctx.fillStyle = 'white'
    mctx.fillRect(0, 0, draftCanvasW, draftCanvasH)
    mctx.beginPath()

    addGrid(cellPixelLengthRef.current)
  })

  for (const userID in peersRef.current) {
    if (!peersRef.current[userID]?.peer) return null

    const cellPixelLength = cellPixelLengthRef.current!
    const dctx = dctxRef.current!
    const mctx = mctxRef.current!
    const draftCanvas = draftCanvasRef.current!
    const pixelHistory = pixelHistoryRef.current

    decodedOnPeerData(
      peersRef.current[userID]?.peer,
      (data: WebRTCConnData) => {
        rtcDrawEvent({
          data,
          draftCanvas,
          dctx,
          mctx,
          pixelHistory,
          cellPixelLength,
        })
      },
    )
  }

  const mouseOut = () => {
    console.log('mouseOut')
    paintingRef.current = false

    dctxRef.current!.beginPath()
  }

  const startPosition = (e: MouseEvent) => {
    console.log('startPosition')
    if (e.button !== 0) return null
    paintingRef.current = true

    draw(
      draftCanvasRef.current!,
      dctxRef.current!,
      cellPixelLengthRef.current!,
      pixelHistoryRef,
      wsRoomDrawChannel,
      lastDrawedPixelRef,
      e,
    )
  }

  const drawing = (e: MouseEvent) => {
    if (!paintingRef.current) return null
    if (e.button !== 0) return null

    const result = draw(
      draftCanvasRef.current!,
      dctxRef.current!,
      cellPixelLengthRef.current!,
      pixelHistoryRef,
      wsRoomDrawChannel,
      lastDrawedPixelRef,
      e,
    )
  }

  const mouseup = () =>
    finishedPosition(
      paintingRef,
      mctxRef.current!,
      dctxRef.current!,
      draftCanvasRef.current!,
    )

  // add event listeners to the draft canvas
  useEventListener('mousedown', startPosition, draftCanvasRef)
  useEventListener('mouseup', mouseup, draftCanvasRef)
  useEventListener('mousemove', drawing, draftCanvasRef)
  useEventListener('mouseout', mouseOut, draftCanvasRef)
}

type Args = {
  drawDataRef: DrawDataRef
  peersRef: PeersRef
}
