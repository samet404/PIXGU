import { storePixelsOnDraw } from '@/store'
import { calculatePixelsBetween } from '@/utils/calculatePixelsBetween'
import { fillOnePixel } from '@/utils/room'
import {
  useAmIPainting,
  useCanvasesMainData,
  usePainterTool,
} from '@/zustand/store'

export const pencil = (
  smoothX: number,
  smoothY: number,
) => {
  if (!useAmIPainting.getState().amIPainting) return
  const isExits = storePixelsOnDraw.isExits([smoothX, smoothY])
  console.log('isExits: ', isExits)

  if (isExits) return

  const { r, g, b, a } = usePainterTool.getState().with.color
  const { main, draft } = useCanvasesMainData.getState().get()
  const mctx = main!.getContext('2d')!
  const dctx = draft!.getContext('2d')!

  const runFillOnePixel = () => fillOnePixel(draft!, dctx, mctx, smoothX, smoothY, new Uint8ClampedArray([r, g, b, a]), 'pencil', {
    pixelImageData: true
  })

  runFillOnePixel()
  storePixelsOnDraw.set([smoothX, smoothY])


  const lastPixelOnDraw = storePixelsOnDraw.get().lastPixel

  if (lastPixelOnDraw) {
    const [prevX, prevY] = lastPixelOnDraw

    console.log(smoothX, smoothY, prevX, prevY)
    console.log(storePixelsOnDraw.value)
    const pixelsBetween = calculatePixelsBetween(prevX, prevY, smoothX, smoothY)

    console.log('pixels between ', pixelsBetween.length)
    console.log('pixelsBetween: ', pixelsBetween, { smoothX, smoothY, prevX, prevY })

    for (let cordinates of pixelsBetween) {
      const { x, y } = cordinates
      if (storePixelsOnDraw.isExits([x, y]) || x === smoothX && y === smoothY) continue

      runFillOnePixel()
      storePixelsOnDraw.set([x, y])
    }
  }

  storePixelsOnDraw.setLastPixel([smoothX, smoothY])
}
