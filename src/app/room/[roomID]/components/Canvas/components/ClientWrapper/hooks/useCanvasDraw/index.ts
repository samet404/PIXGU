// react
import { useEffect, useRef } from 'react'
//ably
import { useChannel } from 'ably/react'
// jotai
import { useAtomValue, useSetAtom } from 'jotai'
import { roomIDAtom, userIDAtom } from '@/app/room/[roomID]/atoms'
import { cellSideCountAtom, pixelPerSecondAtom } from '../../../../atoms'
// types
import { type Types as AblyTypes } from 'ably'
import type { PixelPerSecond, LastDrawedPixel, PixelHistory } from './types'
// funcs
import { addGrid, draw, wsDrawEvent, setPixelPerSecond } from './func/_index'
import { useInterval } from 'usehooks-ts'

export const useCanvasDraw = () => {
  // atoms
  const userID = useAtomValue(userIDAtom)
  const roomID = useAtomValue(roomIDAtom)
  const cellSideCount = useAtomValue(cellSideCountAtom)
  const setPixelPerSecond = useSetAtom(pixelPerSecondAtom)
  // global variables

  // canvas variables
  const draftCanvasRef = useRef<HTMLCanvasElement>()
  const mainCanvasRef = useRef<HTMLCanvasElement>()
  const dctxRef = useRef<CanvasRenderingContext2D>()
  const mctxRef = useRef<CanvasRenderingContext2D>()
  const lastDrawedPixelRef = useRef<LastDrawedPixel>()
  const cellPixelLengthRef = useRef<number>()
  const paintingRef = useRef<boolean>(false)
  const pixelHistoryRef = useRef<PixelHistory>({})
  const pixelPerSecondRef = useRef<number>()

  useInterval(() => {
    const pixelPerSecond = pixelPerSecondRef.current
    const lastIndex = pixelPerSecond.length - 1

    if (!pixelPerSecond[lastIndex]) {
      setPixelPerSecond(0)
      return null
    }
    if (
      pixelPerSecond[lastIndex]!.Date.getTime() + 1000 >
      new Date().getTime()
    ) {
      setPixelPerSecond(0)
      return null
    }

    if (
      pixelPerSecond[lastIndex]!.Date.getTime() + 1000 <=
      new Date().getTime()
    )
      setPixelPerSecond(pixelPerSecond[lastIndex]!.count)
  }, 1000)

  // initializing somethings
  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    draftCanvasRef.current = document.getElementById(
      `draft-canvas-${userID}`,
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
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  // connecting to {roomID}:draw channel
  const { channel: wsRoomDrawChannel } = useChannel(
    `${roomID}:draw`,
    (message: AblyTypes.Message) =>
      wsDrawEvent(
        message,
        draftCanvasRef.current!,
        dctxRef.current!,
        mctxRef.current!,
        pixelHistoryRef.current,
        cellPixelLengthRef.current!,
      ),
  )

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
      pixelPerSecondRef,
      wsRoomDrawChannel,
      lastDrawedPixelRef,
      e,
    )
  }

  const drawing = (e: MouseEvent) => {
    if (!paintingRef.current) return null
    if (e.button !== 0) return null

    draw(
      draftCanvasRef.current!,
      dctxRef.current!,
      cellPixelLengthRef.current!,
      pixelHistoryRef,
      pixelPerSecondRef,
      wsRoomDrawChannel,
      lastDrawedPixelRef,
      e,
    )
  }

  const finishedPosition = () => {
    console.log('finishedPosition')
    paintingRef.current = false

    const mctx = mctxRef.current!
    const dctx = dctxRef.current!
    const draftCanvas = draftCanvasRef.current!

    mctx.drawImage(draftCanvas, 0, 0) // copy drawing to main
    dctx.clearRect(0, 0, draftCanvas.width, draftCanvas.height) // clear draft
  }

  // add event listeners to the draft canvas
  useEffect(() => {
    draftCanvasRef.current!.addEventListener('mousedown', startPosition)
    draftCanvasRef.current!.addEventListener('mouseup', finishedPosition)
    draftCanvasRef.current!.addEventListener('mousemove', drawing)
    draftCanvasRef.current!.addEventListener('mouseout', mouseOut)

    return () => {
      draftCanvasRef.current!.removeEventListener('mousedown', startPosition)
      draftCanvasRef.current!.removeEventListener('mouseup', finishedPosition)
      draftCanvasRef.current!.removeEventListener('mousemove', drawing)
      draftCanvasRef.current!.removeEventListener('mouseout', mouseOut)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID, roomID])
}
