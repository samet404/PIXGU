import { useEffect } from 'react'
import { roomIDAtom, userIDAtom } from '@/app/room/[roomID]/atoms'
import { useAtomValue } from 'jotai'
import { cellSideCountAtom } from '../../../../atoms'
import { fillOnePixel } from './func/fillOnePixel'
import { addGrid } from './func/addGrid'
import { useChannel } from 'ably/react'
import { type Types } from 'ably'
import { isObjectEmpty } from '@/utils/isObjectEmpty'
import { type pixelHistory } from './types'
import { getRgbAndOpacity } from './func/getRgbAndOpacity'
import { IntRange } from '@/src/types/intRange'

export const useCanvasDraw = () => {
  // atoms
  const userID = useAtomValue(userIDAtom)
  const roomID = useAtomValue(roomIDAtom)
  const cellSideCount = useAtomValue(cellSideCountAtom)
  // global variables

  // canvas variables
  let draftCanvas: HTMLCanvasElement
  let mainCanvas: HTMLCanvasElement
  let dctx: CanvasRenderingContext2D
  let mctx: CanvasRenderingContext2D

  // canvas resolution

  /**
   * Represent the pixels size in the canvas
   */
  let cellPixelLength: number

  let pixelHistory: pixelHistory = {}

  const { channel: wsRoomDrawChannel } = useChannel(
    `${roomID}:draw`,
    (message: Types.Message) => {
      const { x, y, opacity, rgb } = message.data as {
        x: number
        y: number
        rgb: `rgb(${string}, ${string}, ${string})`
        opacity: IntRange<0, 2>
      }

      const draw = () => {
        pixelHistory[`${x}_${y}`] = {
          rgb: rgb,
          opacity: opacity,
        }
        fillOnePixel(draftCanvas, dctx, cellPixelLength, x, y, rgb, opacity)
        mctx.drawImage(draftCanvas, 0, 0) // copy drawing to main
        dctx.clearRect(0, 0, draftCanvas.width, draftCanvas.height) // clear draft
      }

      const isPixelHistoryEmpty = isObjectEmpty(pixelHistory)

      if (!isPixelHistoryEmpty) {
        const isHistoryHasSameCordinate = Object.hasOwn(
          pixelHistory,
          `${x}_${y}`,
        )

        if (isHistoryHasSameCordinate) {
          const history = pixelHistory[`${x}_${y}`]

          if (history?.opacity == opacity && history?.rgb == rgb) return null

          draw()
        } else if (!isHistoryHasSameCordinate) draw()
      }

      if (isPixelHistoryEmpty) draw()
    },
  )

  // initializing somethings
  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    draftCanvas = document.getElementById(
      `draft-canvas-${userID}`,
    ) as HTMLCanvasElement

    mainCanvas = document.getElementById(`main-canvas`) as HTMLCanvasElement

    dctx = draftCanvas.getContext('2d')!
    mctx = mainCanvas.getContext('2d')!

    const draftCanvasW = draftCanvas.width
    const draftCanvasH = draftCanvas.height

    cellPixelLength = draftCanvasW / cellSideCount

    mctx.beginPath()
    mctx.fillStyle = 'white'
    mctx.fillRect(0, 0, draftCanvasW, draftCanvasH)
    mctx.beginPath()

    addGrid(cellPixelLength)
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  let painting = false

  const draw = (e: MouseEvent) => {
    const draftCanvasBoundingRect = draftCanvas.getBoundingClientRect()

    const x = e.clientX - draftCanvasBoundingRect.left
    const y = e.clientY - draftCanvasBoundingRect.top

    const newX = Math.floor(x / cellPixelLength)
    const newY = Math.floor(y / cellPixelLength)

    const { rgb, opacity } = getRgbAndOpacity()

    const isPixelHistoryEmpty = isObjectEmpty(pixelHistory)

    if (!isPixelHistoryEmpty) {
      const isHistoryHasSameCordinate = Object.hasOwn(
        pixelHistory,
        `${newX}_${newY}`,
      )

      if (isHistoryHasSameCordinate) {
        const history = pixelHistory[`${newX}_${newY}`]

        console.log(1)
        if (history?.opacity == opacity && history?.rgb == rgb) return null

        console.log(2)
        pixelHistory[`${newX}_${newY}`] = {
          rgb: rgb,
          opacity: opacity,
        }
        fillOnePixel(
          draftCanvas,
          dctx,
          cellPixelLength,
          newX,
          newY,
          rgb,
          opacity,
        )
        wsRoomDrawChannel.publish('draw', { x: newX, y: newY, rgb, opacity })
      } else if (!isHistoryHasSameCordinate) {
        console.log(3)
        pixelHistory[`${newX}_${newY}`] = {
          rgb: rgb,
          opacity: opacity,
        }
        fillOnePixel(
          draftCanvas,
          dctx,
          cellPixelLength,
          newX,
          newY,
          rgb,
          opacity,
        )
        wsRoomDrawChannel.publish('draw', { x: newX, y: newY, rgb, opacity })
      }
    }

    if (isPixelHistoryEmpty) {
      console.log(4)
      pixelHistory[`${newX}_${newY}`] = {
        rgb: rgb,
        opacity: opacity,
      }
      fillOnePixel(draftCanvas, dctx, cellPixelLength, newX, newY, rgb, opacity)
      wsRoomDrawChannel.publish('draw', { x: newX, y: newY, rgb, opacity })
    }
  }

  const mouseOut = () => {
    console.log('mouseOut')

    painting = false

    const dctx = draftCanvas.getContext('2d')!
    dctx?.beginPath()
  }

  const startPosition = (e: MouseEvent) => {
    console.log('startPosition')
    if (e.button !== 0) return null
    painting = true

    draw(e)
  }

  const finishedPosition = () => {
    console.log('finishedPosition')
    painting = false

    mctx.drawImage(draftCanvas, 0, 0) // copy drawing to main
    dctx.clearRect(0, 0, draftCanvas.width, draftCanvas.height) // clear draft
  }

  const drawing = (e: MouseEvent) => {
    if (!painting) return null
    if (e.button !== 0) return null

    draw(e)
  }

  // add event listeners to the draft canvas
  useEffect(() => {
    draftCanvas.addEventListener('mousedown', startPosition)
    draftCanvas.addEventListener('mouseup', finishedPosition)
    draftCanvas.addEventListener('mousemove', drawing)
    draftCanvas.addEventListener('mouseout', mouseOut)

    return () => {
      draftCanvas.removeEventListener('mousedown', startPosition)
      draftCanvas.removeEventListener('mouseup', finishedPosition)
      draftCanvas.removeEventListener('mousemove', drawing)
      draftCanvas.removeEventListener('mouseout', mouseOut)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID, roomID])
}
