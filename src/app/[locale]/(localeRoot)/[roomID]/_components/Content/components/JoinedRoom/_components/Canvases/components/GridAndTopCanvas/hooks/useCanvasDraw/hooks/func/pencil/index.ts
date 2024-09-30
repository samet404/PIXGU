import { drawOnCanvas } from './funcs/drawOnCanvas'
import {
  useAmIPainting,
  useCanvasesMainData,
  usePainterTool,
  usePixelsOnDraw,
} from '@/zustand/store'

export const pencil = (
  e: PointerEvent,
  myUserID: string,
  x: number,
  y: number,
) => {
  if (!useAmIPainting.getState().amIPainting) return

  const canvasesMainData = useCanvasesMainData.getState().get()
  const { cellPixelLength, cellSideCount } = canvasesMainData
  if (!cellPixelLength || !cellSideCount) return

  const isExits = usePixelsOnDraw.getState().isExits({
    x,
    y,
  })

  if (isExits) return

  const { r, g, b, a } = usePainterTool.getState().with.color
  drawOnCanvas(x, y, { r, g, b, a }, myUserID)
}
