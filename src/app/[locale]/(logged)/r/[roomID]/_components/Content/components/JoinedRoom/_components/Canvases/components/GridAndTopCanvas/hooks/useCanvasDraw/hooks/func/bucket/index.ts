import { useCanvasesMainData, usePainterTool } from '@/zustand/store'
// import { spanFill } from '@/utils/spanFill'
import type { WorkerMessage } from './worker'

export const bucket = (e: PointerEvent) => {
  console.time('bucket')
  const { main, draft, zoom, cellPixelLength, cellSideCount } =
    useCanvasesMainData.getState()
  if (!main) return

  const mctx = main.getContext('2d', {
    willReadFrequently: true,
    desynchronized: true,
  })!
  const dctx = draft!.getContext('2d', {
    willReadFrequently: true,
    desynchronized: true,
  })!
  const color = usePainterTool.getState().with.color
  const bounding = main.getBoundingClientRect()
  const exactX = (e.clientX - bounding.left) * zoom
  const exactY = (e.clientY - bounding.top) * zoom
  const smoothX = Math.floor(exactX / cellPixelLength!)
  const smoothY = Math.floor(exactY / cellPixelLength!)

  const imageData = mctx.getImageData(0, 0, main.width, main.height)

  // const worker = new Worker(new URL('./worker/index.ts', import.meta.url), {
  //   type: 'module',
  // })

  // const message: WorkerMessage = {
  //   smoothX,
  //   smoothY,
  //   imageData,
  //   cellPixelLength: cellPixelLength!,
  //   cellSideCount,
  // }
  // worker.postMessage(message)

  // worker.onmessage = (e) => {
  //   console.log('worker onmessage', e)
  //   const imageData: ImageData = e.data

  //   console.log('imageData: ', imageData)
  //   dctx.putImageData(imageData, 0, 0)

  //   console.timeEnd('bucket')
  // }
}
