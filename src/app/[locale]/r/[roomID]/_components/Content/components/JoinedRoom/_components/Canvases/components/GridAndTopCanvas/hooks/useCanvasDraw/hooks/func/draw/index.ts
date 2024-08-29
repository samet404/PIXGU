import { drawOnCanvas } from './funcs/drawOnCanvas'
import {
  useCanvasesMainData,
  useRgba,
  useWhoIsPainterClient,
} from '@/zustand/store'

/**
 * This function is responsible for drawing on the canvas when the user is drawing
 */
export const draw = (e: MouseEvent, myUserID: string) => {
  const canvasesMainData = useCanvasesMainData.getState().get()
  const whoIsPainter = useWhoIsPainterClient.getState().value
  if (whoIsPainter.status === 'thereIsNoPainter') return
  if (!whoIsPainter.amIPainter) return null

  const { cellPixelLength, cellSideCount } = canvasesMainData
  if (!cellPixelLength || !cellSideCount) return null

  const dc = canvasesMainData.draft
  if (!dc) return null

  const dcBoundingRect = dc.getBoundingClientRect()

  const x = e.clientX - dcBoundingRect.left
  const y = e.clientY - dcBoundingRect.top
  const newX = Math.floor(x / cellPixelLength)
  const newY = Math.floor(y / cellPixelLength)
  console.log(newX, newY)
  const { r, g, b, a } = useRgba.getState().value

  drawOnCanvas(newX, newY, { r, g, b, a }, myUserID)
}
