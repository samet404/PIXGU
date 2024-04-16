// react
import { useRef } from 'react'
//ably
import { useChannel } from 'ably/react'
// jotai
import { useAtomValue } from 'jotai'
import { roomIDAtom, userIDAtom } from '@/app/room/[roomID]/atoms'
import { cellSideCountAtom } from '../../../../atoms'
// types
import type { LastDrawedPixel, PixelHistory, pixelPerSecond } from './types'
// funcs
import { addGrid, draw, wsDrawEvent } from './func/_index'
import { useEventListener } from 'usehooks-ts'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { type Message } from 'ably'
import { finishedPosition } from './func/finishedPosition'

export const useCanvasDraw = () => {
  // atoms
  const userID = useAtomValue(userIDAtom)
  const roomID = useAtomValue(roomIDAtom)
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
  const pixelPerSecondRef = useRef<pixelPerSecond>()
  const pixelPerSecondLimitRef = useRef<number>(100)
  let pixelPerSecondLimitAlert = false

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

  // connecting to {roomID}:draw channel
  const { channel: wsRoomDrawChannel } = useChannel(
    `${roomID}:draw`,
    (message: Message) => {
      wsDrawEvent(
        message,
        draftCanvasRef.current!,
        dctxRef.current!,
        mctxRef.current!,
        pixelHistoryRef.current,
        cellPixelLengthRef.current!,
      )

      console.log(message)
    },
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
    const pixelPerSecondLimit = pixelPerSecondLimitRef.current

    if (
      pixelPerDrawDataRef.current &&
      pixelPerDrawDataRef.current.pixelCount == pixelPerSecondLimit &&
      !pixelPerSecondLimitAlert
    ) {
      alert(`You can draw ${pixelPerSecondLimit} pixels per second`)
      pixelPerSecondLimitAlert = true
      paintingRef.current = false
      return null
    }

    if (pixelPerSecondLimitAlert) {
      pixelPerDrawDataRef.current = {
        pixelCount: 1,
        date: new Date(),
      }
      pixelPerSecondLimitAlert = false
    }

    const result = draw(
      draftCanvasRef.current!,
      dctxRef.current!,
      cellPixelLengthRef.current!,
      pixelHistoryRef,
      wsRoomDrawChannel,
      lastDrawedPixelRef,
      e,
    )

    if (!result?.isSuccess) setIsDrawing(false)
    if (result?.isSuccess) {
      setIsDrawing(true)

      if (
        !pixelPerDrawDataRef.current ||
        pixelPerDrawDataRef.current.pixelCount == 50
      ) {
        pixelPerDrawDataRef.current = {
          pixelCount: 1,
          date: new Date(),
        }
      }

      const pixelPerDrawData = pixelPerDrawDataRef.current
      const nowDate = new Date().getTime()

      if (nowDate - pixelPerDrawData.date.getTime() < 1000) {
        pixelPerDrawDataRef.current.pixelCount++

        const pixelPerDrawData = pixelPerDrawDataRef.current
        pixelPerDrawData.remainingTime =
          1000 + pixelPerDrawData.date.getTime() - nowDate

        setPixelPerDraw(pixelPerDrawData)
      }

      if (nowDate - pixelPerDrawData.date.getTime() >= 1000) {
        setPixelPerDraw(pixelPerDrawData)
        pixelPerDrawDataRef.current = {
          pixelCount: 1,
          date: new Date(),
        }
      }
    }
  }

  const drawing = (e: MouseEvent) => {
    if (!paintingRef.current) return null
    if (e.button !== 0) return null

    const pixelPerSecondLimit = pixelPerSecondLimitRef.current

    if (
      pixelPerDrawDataRef.current &&
      pixelPerDrawDataRef.current.pixelCount == pixelPerSecondLimit &&
      !pixelPerSecondLimitAlert
    ) {
      alert(`You can draw ${pixelPerSecondLimit} pixels per second`)
      paintingRef.current = false
      pixelPerSecondLimitAlert = true
      setPixelPerDraw(null)
      return null
    }

    const result = draw(
      draftCanvasRef.current!,
      dctxRef.current!,
      cellPixelLengthRef.current!,
      pixelHistoryRef,
      wsRoomDrawChannel,
      lastDrawedPixelRef,
      e,
    )

    if (!result?.isSuccess) setIsDrawing(false)

    if (result?.isSuccess) {
      setIsDrawing(true)

      const nowDate = new Date().getTime()

      if (!result?.isSuccess) setIsDrawing(false)
      if (result?.isSuccess) {
        setIsDrawing(true)

        const pixelPerDrawData = pixelPerDrawDataRef.current!
        if (nowDate - pixelPerDrawData.date.getTime() < 1000) {
          pixelPerDrawDataRef.current!.pixelCount++

          pixelPerDrawData.remainingTime =
            1000 + pixelPerDrawData.date.getTime() - nowDate

          setPixelPerDraw(pixelPerDrawData)
        }

        if (nowDate - pixelPerDrawData.date.getTime() >= 1000) {
          setPixelPerDraw(pixelPerDrawData)
          pixelPerDrawDataRef.current = {
            pixelCount: 1,
            date: new Date(),
          }
        }
      }
    }
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
