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
export const draw = (
  e: PointerEvent,
  myUserID: string,
  x: number,
  y: number,
) => {
  const canvasesMainData = useCanvasesMainData.getState().get()
  // const whoIsPainter = useWhoIsPainterClient.getState().value
  // if (whoIsPainter.status === 'thereIsNoPainter') return
  // if (!whoIsPainter.amIPainter) return

  const { cellPixelLength, cellSideCount, zoom } = canvasesMainData
  if (!cellPixelLength || !cellSideCount) return

  const isExits = usePixelsOnDraw.getState().isExits({
    x,
    y,
  })

  if (isExits) return

  const { r, g, b, a } = useRgba.getState().value
  drawOnCanvas(x, y, { r, g, b, a }, myUserID)
}
