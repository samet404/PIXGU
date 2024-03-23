import { getSearchParam } from '@/utils/getSearchParam'
import { useEffect } from 'react'
import { roomIDAtom, userIDAtom } from '@/app/room/[roomID]/atoms'
import { useAtomValue, useSetAtom } from 'jotai'
import { infoAtom } from '../../../../atoms'
import { type Color } from '@/types/color'
import { fillOnePixel } from './func/fillOnePixel'

export const useCanvasDraw = () => {
  // atoms
  const userID = useAtomValue(userIDAtom)
  const roomID = useAtomValue(roomIDAtom)

  // global variables

  // canvas variables
  let draftCanvas: HTMLCanvasElement
  let mainCanvas: HTMLCanvasElement
  let dctx: CanvasRenderingContext2D
  let mctx: CanvasRenderingContext2D

  // color variables
  let canvasColor: `${string}-${string}-${string}-${string}`
  let r: string
  let g: string
  let b: string
  let opacity: string
  let colorHistory: Color[] = []

  // canvas resolution

  /**
   * Represent the pixels size in the canvas
   */
  const pixelSize = 10
  let cellPixelLength

  // initialize some global variables
  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    draftCanvas = document.getElementById(
      `draft-canvas-${userID}`,
    ) as HTMLCanvasElement

    mainCanvas = document.getElementById(`main-canvas`) as HTMLCanvasElement

    dctx = draftCanvas.getContext('2d')!
    mctx = mainCanvas.getContext('2d')!

    cellPixelLength = draftCanvas.width / pixelSize

    const { info } = fillOnePixel(draftCanvas, dctx, resolution, 3, 0)
    console.log(info)
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  let painting = false

  const mouseOut = () => {
    console.log('mouseOut')

    painting = false

    const dctx = draftCanvas.getContext('2d')!
    dctx?.beginPath()
  }

  const startPosition = (e: MouseEvent) => {
    canvasColor = (getSearchParam('color') ??
      '0-0-0-1)') as `${string}-${string}-${string}-${string}`
    opacity = canvasColor.split('-')[3] ?? '1'

    const canvasColorSplit = canvasColor.split('-')
    r = canvasColorSplit[0] ?? '0'
    g = canvasColorSplit[1] ?? '0'
    b = canvasColorSplit[2] ?? '0'

    if (e.target != draftCanvas) return null
  }

  const finishedPosition = () => {
    const dctx = draftCanvas.getContext('2d')!
    const mctx = mainCanvas.getContext('2d')!

    dctx.beginPath()

    painting = false

    mctx.drawImage(draftCanvas, 0, 0) // copy drawing to main
    dctx.clearRect(0, 0, draftCanvas.width, draftCanvas.height) // clear draft
    console.log('finishedPosition')
  }

  const draw = (e: MouseEvent) => {
    if (!painting) return null
  }

  // add event listeners to the draft canvas
  useEffect(() => {
    const draftCanvas = document.getElementById(
      `draft-canvas-${userID}`,
    ) as HTMLCanvasElement

    draftCanvas.addEventListener('mousedown', startPosition)
    draftCanvas.addEventListener('mouseup', finishedPosition)
    draftCanvas.addEventListener('mousemove', draw)
    draftCanvas.addEventListener('mouseout', mouseOut)

    return () => {
      draftCanvas.removeEventListener('mousedown', startPosition)
      draftCanvas.removeEventListener('mouseup', finishedPosition)
      draftCanvas.removeEventListener('mousemove', draw)
      draftCanvas.removeEventListener('mouseout', mouseOut)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID, roomID])

  // Websocket implementation
  const setInfo = useSetAtom(infoAtom)
}
