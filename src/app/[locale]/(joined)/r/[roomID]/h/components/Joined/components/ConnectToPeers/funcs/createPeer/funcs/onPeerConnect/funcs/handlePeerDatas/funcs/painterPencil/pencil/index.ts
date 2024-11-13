import { storePixelsOnDraw } from '@/store'
import { calculatePixelsBetween } from '@/utils/calculatePixelsBetween'
import { fillWithDefaultPattern } from '@/helpers/room'
import {
  useHostCanvasesData,
} from '@/zustand/store'
import type { PainterPencil } from '@/types/webRTCConnData'

export const pencil = (
  data: PainterPencil['data'],
) => {
  const { x, y, size } = data
  const color = new Uint8ClampedArray([...Object.values(data.color as Object)])
  const { mctx, cellPixelLength, cellSideCount } = useHostCanvasesData.getState()
  console.log('pencil func', {
    x,
    y,
    color,
    size,
    cellPixelLength,
    cellSideCount,
    mctx,
    storePixelsOnDraw,
    calculatePixelsBetween,
    fillWithDefaultPattern,
    useHostCanvasesData,

  })
  const runFillWithDefaultPattern = (x: number, y: number) => fillWithDefaultPattern(mctx!, x, y, cellSideCount, size, cellPixelLength!, color)

  runFillWithDefaultPattern(x, y)

  const lastPixelOnDraw = storePixelsOnDraw.get().lastPixel

  if (lastPixelOnDraw) {
    const [prevX, prevY] = lastPixelOnDraw
    const pixelsBetween = calculatePixelsBetween(prevX, prevY, x, y)

    for (let coordinates of pixelsBetween) {
      const { x, y } = coordinates
      runFillWithDefaultPattern(x, y)
    }
  }

  storePixelsOnDraw.setLastPixel([x, y])
}