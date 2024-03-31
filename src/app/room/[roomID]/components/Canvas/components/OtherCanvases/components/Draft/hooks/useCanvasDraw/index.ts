// react
import { useRef } from 'react'
//ably
import { useChannel } from 'ably/react'
// jotai
import { useAtomValue, useSetAtom } from 'jotai'
import { roomIDAtom, userIDAtom } from '@/app/room/[roomID]/atoms'
import {
  cellSideCountAtom,
  isDrawingAtom,
  pixelPerDrawAtom,
} from '@/app/room/[roomID]/components/Canvas/atoms'
// types
import type { Types as AblyTypes } from 'ably'
import type { LastDrawedPixel, PixelHistory } from './types'
// funcs
import { addGrid, draw, wsDrawEvent } from './func/_index'
import { useEventListener } from 'usehooks-ts'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { type PixelPerDraw } from '@/app/room/[roomID]/components/Canvas/types'

export const useCanvasDraw = () => {
  // atoms
  const userID = useAtomValue(userIDAtom)
  const roomID = useAtomValue(roomIDAtom)
  const cellSideCount = useAtomValue(cellSideCountAtom)
  const setPixelPerDraw = useSetAtom(pixelPerDrawAtom)
  const setIsDrawing = useSetAtom(isDrawingAtom)
  // global variables

  // canvas variables
  const draftCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const mainCanvasRef = useRef<HTMLCanvasElement>()
  const dctxRef = useRef<CanvasRenderingContext2D>()
  const mctxRef = useRef<CanvasRenderingContext2D>()
  const lastDrawedPixelRef = useRef<LastDrawedPixel>()
  const cellPixelLengthRef = useRef<number>()
  const paintingRef = useRef<boolean>(false)
  const pixelHistoryRef = useRef<PixelHistory>({})
  const pixelPerDrawDataRef = useRef<PixelPerDraw>()
  const pixelPerSecondLimitRef = useRef<number>(100)
  let wsCount: {
    count: number
    date: number
  }[] = []

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

  const roughSizeOfObject = (object: object) => {
    // @ts-ignore
    const objectList = []
    const stack = [object]
    let bytes = 0

    while (stack.length) {
      const value = stack.pop()

      switch (typeof value) {
        case 'boolean':
          bytes += 4
          break
        case 'string':
          // @ts-ignore
          bytes += value.length * 2
          break
        case 'number':
          bytes += 8
          break
        case 'object':
          // @ts-ignore
          if (!objectList.includes(value)) {
            objectList.push(value)
            for (const prop in value) {
              // @ts-ignore
              // eslint-disable-next-line no-prototype-builtins
              if (value.hasOwnProperty(prop)) {
                // @ts-ignore
                stack.push(value[prop])
              }
            }
          }
          break
      }
    }

    return bytes
  }

  // connecting to {roomID}:draw channel
  const { channel: wsRoomDrawChannel } = useChannel(
    `${roomID}:draw`,
    (message: AblyTypes.Message) => {
      wsDrawEvent(
        message,
        draftCanvasRef.current!,
        dctxRef.current!,
        mctxRef.current!,
        pixelHistoryRef.current,
        cellPixelLengthRef.current!,
      )

      wsCount.push({
        count: wsCount.length + 1,
        date: new Date().getSeconds(),
      })

      console.log(wsCount)
      console.log(roughSizeOfObject(message))
      console.log(message)
    },
  )

  const mouseOut = () => {
    console.log('mouseOut')
    paintingRef.current = false

    dctxRef.current!.beginPath()
    setIsDrawing(false)
  }

  let pixelPerSecondLimitAlert = false
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
      setPixelPerDraw(null)
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

  const finishedPosition = () => {
    console.log('finishedPosition')
    paintingRef.current = false

    setIsDrawing(false)

    const mctx = mctxRef.current!
    const dctx = dctxRef.current!
    const draftCanvas = draftCanvasRef.current!

    mctx.drawImage(draftCanvas, 0, 0) // copy drawing to main
    dctx.clearRect(0, 0, draftCanvas.width, draftCanvas.height) // clear draft
  }

  // add event listeners to the draft canvas
  useEventListener('mousedown', startPosition, draftCanvasRef)
  useEventListener('mouseup', finishedPosition, draftCanvasRef)
  useEventListener('mousemove', drawing, draftCanvasRef)
  useEventListener('mouseout', mouseOut, draftCanvasRef)
}
