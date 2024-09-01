import { drawOnCanvas } from './funcs/drawOnCanvas'
import {
  useCanvasesMainData,
  usePixelsOnDraw,
  useRgba,
  useWhoIsPainterClient,
} from '@/zustand/store'

/**
 * This function is responsible for drawing on the canvas when the user is drawing
 */
export const draw = (e: MouseEvent, myUserID: string) => {
  const canvasesMainData = useCanvasesMainData.getState().get()
  // const whoIsPainter = useWhoIsPainterClient.getState().value
  // if (whoIsPainter.status === 'thereIsNoPainter') return
  // if (!whoIsPainter.amIPainter) return

  const { cellPixelLength, cellSideCount } = canvasesMainData
  if (!cellPixelLength || !cellSideCount) return

  const dc = canvasesMainData.draft
  if (!dc) return

  const dcBoundingRect = dc.getBoundingClientRect()

  const x = e.clientX - dcBoundingRect.left
  const y = e.clientY - dcBoundingRect.top
  const newX = Math.floor(x / cellPixelLength)
  const newY = Math.floor(y / cellPixelLength)

  const isExits = usePixelsOnDraw.getState().isExits({
    x: newX,
    y: newY,
  })

  console.log(isExits)

  if (isExits) return

  usePixelsOnDraw.getState().set({
    x: newX,
    y: newY,
  })

  console.log(newX, newY)
  const { r, g, b, a } = useRgba.getState().value

  drawOnCanvas(newX, newY, { r, g, b, a }, myUserID)
}
