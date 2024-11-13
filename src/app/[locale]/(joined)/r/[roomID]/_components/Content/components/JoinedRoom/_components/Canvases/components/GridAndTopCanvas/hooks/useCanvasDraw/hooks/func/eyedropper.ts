import { storePixelHistory } from '@/store'
import { usePainterTool } from '@/zustand/store'

export const eyedropper = (e: PointerEvent, x: number, y: number) => {
  const data = storePixelHistory.getRgb(new Uint8ClampedArray([x, y]))
  usePainterTool.getState().setRGBA(
    [data[0]!, data[1]!, data[2]!, 255]
  )
}
