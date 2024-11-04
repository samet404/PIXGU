import { fillOnePixel } from '@/utils/room/fillOnePixel'
import { useCanvasesMainData } from '@/zustand/store'
import { addToHistory } from './addToHistory'
import { storePixelHistory, storePixelsOnBucket } from '@/store'

const DEFAULT_COLOR = [
  255,
  255,
  255,
  255
]
const COLOR_TO_FILL = {
  r: 0,
  g: 100,
  b: 0,
  a: 100,
}

type WorkerMessage = {
  smoothX: number
  smoothY: number
  imageData: ImageData
  cellPixelLength: number
  cellSideCount: number
}

export const bucket = async (e: PointerEvent) => {

  const worker = new Worker(new URL('./worker.ts', import.meta.url), {
    type: 'module',
  })



  const message: WorkerMessage = {
    smoothX,
    smoothY,
    imageData,
    cellPixelLength: cellPixelLength!,
    cellSideCount,
  }
  worker.postMessage(message)

  //   worker.onmessage = (e) => {
  //     console.log('worker onmessage', e)
  //   }
  // }

  console.log('bucket')
  const { main, draft, zoom, cellPixelLength, cellSideCount } =
    useCanvasesMainData.getState()

  const mctx = main!.getContext('2d')!
  const dctx = draft!.getContext('2d')!
  const bounding = main!.getBoundingClientRect()
  const exactX = (e.clientX - bounding.left) * zoom
  const exactY = (e.clientY - bounding.top) * zoom
  const smoothX = Math.floor(exactX / cellPixelLength!)
  const smoothY = Math.floor(exactY / cellPixelLength!)

  const [rt, gt, bt, at] = (() => {
    const color = storePixelHistory.get([smoothX, smoothY])?.rgba
    if (!color) return DEFAULT_COLOR
    return color
  })()

  const isInside = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= cellSideCount || y >= cellSideCount) return false

    if (storePixelsOnBucket.isExits([x, y])) return false

    const pixelData = storePixelHistory.get([x, y])?.rgba
    const [r, g, b, a] = pixelData ?? DEFAULT_COLOR
    return r === rt && g === gt && b === bt && a === at
  }

  const set = (x: number, y: number) => {
    const { pixelImageData } = fillOnePixel(x, y, COLOR_TO_FILL, {
      pixelImageData: true
    })
    addToHistory(pixelImageData, x, y)
    storePixelsOnBucket.add([x, y])
  }

  const queue: [number, number][] = [[smoothX, smoothY]]
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

  const processChunk = async () => {
    const CHUNK_SIZE = 10
    let processed = 0

    while (queue.length > 0 && processed < CHUNK_SIZE) {
      const [x, y] = queue.shift()!
      if (isInside(x, y)) {
        set(x, y)
        processed++

        for (const [dx, dy] of directions) {
          const newX = x + dx!
          const newY = y + dy!
          if (isInside(newX, newY)) {
            queue.push([newX, newY])
          }
        }
      }
    }

    // Update canvas
    mctx.drawImage(draft!, 0, 0)

    if (queue.length > 0) {
      // Process next chunk in next frame
      requestAnimationFrame(processChunk)
    } else {
      // Clear draft when done
      dctx.clearRect(0, 0, draft!.width, draft!.height)
    }
  }

  // Start processing
  requestAnimationFrame(processChunk)
}



