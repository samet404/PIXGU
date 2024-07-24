import { useInitCanvasData } from './hooks/useInitCanvasData'
import { useMouseDown, useMouseMove, useMouseOut, useMouseUp } from './hooks'

export const useCanvasDraw = () => {
  useInitCanvasData()

  // Mouse events
  useMouseOut()
  useMouseUp()
  useMouseDown()
  useMouseMove()
}
