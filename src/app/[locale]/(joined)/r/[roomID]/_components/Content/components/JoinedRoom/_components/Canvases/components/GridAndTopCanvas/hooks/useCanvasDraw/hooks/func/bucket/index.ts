// import { useCanvasesMainData, usePainterTool } from '@/zustand/store'
import { fillOnePixel } from '@/utils/room/fillOnePixel'
import { spanFill } from '@/utils/spanFill'
// import type { WorkerMessage } from './worker'
// import { setPixel } from './setPixel'

import { useCanvasesMainData, usePainterTool, usePixelHistory } from '@/zustand/store'

// export const bucket = (e: PointerEvent) => {
//   console.log('bucket')

//   const { main, draft, zoom, cellPixelLength, cellSideCount } =
//     useCanvasesMainData.getState()
//   if (!main) {
//     console.log('main not found')
//     return
//   }

//   const mctx = main.getContext('2d', {
//     willReadFrequently: true,
//     desynchronized: true,
//   })!
//   const dctx = draft!.getContext('2d', {
//     willReadFrequently: true,
//     desynchronized: true,
//   })!
//   const bounding = main.getBoundingClientRect()
//   const exactX = (e.clientX - bounding.left) * zoom
//   const exactY = (e.clientY - bounding.top) * zoom
//   const smoothX = Math.floor(exactX / cellPixelLength!)
//   const smoothY = Math.floor(exactY / cellPixelLength!)

//   const imageData = mctx.getImageData(0, 0, main.width, main.height)

//   const worker = new Worker(new URL('./worker/index.ts', import.meta.url), {
//     type: 'module',
//   })


//   const message: WorkerMessage = {
//     smoothX,
//     smoothY,
//     imageData,
//     cellPixelLength: cellPixelLength!,
//     cellSideCount,
//   }
//   worker.postMessage(message)

//   worker.onmessage = (e) => {
//     console.log('worker onmessage', e)
//   }
// }


export const bucket = (e: PointerEvent) => {
  console.log('bucket')
  const DEFAULT_COLOR = {
    r: 255,
    g: 255,
    b: 255,
    a: 255,
  }
  const COLOR_TO_FILL = {
    r: 255,
    g: 100,
    b: 0,
    a: 255,
  }

  const { main, draft, zoom, cellPixelLength, cellSideCount } =
    useCanvasesMainData.getState()
  if (!main) {
    console.log('main not found')
    return
  }

  const mctx = main.getContext('2d', {
    willReadFrequently: true,
    desynchronized: true,
  })!
  const dctx = draft!.getContext('2d', {
    willReadFrequently: true,
    desynchronized: true,
  })!
  const bounding = main.getBoundingClientRect()
  const exactX = (e.clientX - bounding.left) * zoom
  const exactY = (e.clientY - bounding.top) * zoom
  const smoothX = Math.floor(exactX / cellPixelLength!)
  const smoothY = Math.floor(exactY / cellPixelLength!)

  const targetColor = (() => {
    const color = usePixelHistory.getState()[`${smoothX}_${smoothY}`]?.rgba
    if (!color) return DEFAULT_COLOR
    return color
  })()

  const isInside = (x: number, y: number) => {
    console.log('isInside: ', x, y, cellSideCount)

    if (x >= 0 && y >= 0 && x < cellSideCount && y < cellSideCount) {
      console.log('isInside1: ', true)


      const pixelData = usePixelHistory.getState()[`${x}_${y}`]?.rgba
      if (!pixelData) return false

      const [r, g, b, a] = pixelData


      const isColorEqual = r === rt && g === gt && b === bt && a === at
      console.log('isColorEqual: ', isColorEqual)
      console.log({ r, g, b, a, rt, gt, bt, at })

      console.log('isInside2: ', isColorEqual)
      return isColorEqual
    }

    console.log('isInside1: ', false)
    return false
  }

  spanFill(smoothX, smoothY, isInside, (x, y) => {
    fillOnePixel(x, y, COLOR_TO_FILL)
  })
}