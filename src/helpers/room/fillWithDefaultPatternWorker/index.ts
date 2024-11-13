console.log('Worker initialized')

import type { WorkerOnMsgData } from './types'
import { calculatePixelsBetween } from '@/utils'

// Pre-calculate offsets for better performance
const OFFSETS = {
  2: [[0, 0], [1, 0], [0, 1], [1, 1]],
  3: [[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0]]
}

self.onmessage = (e) => {
  const pixelsToBeFilled: Uint16Array[] = []
  const { cellSideCount, smoothX, smoothY, color, size, rgbsData, pixelsOnDraw, lastPixel } = e.data as WorkerOnMsgData
  console.log('worker onmessage', { cellSideCount, smoothX, smoothY, color, size, rgbsData, pixelsOnDraw, lastPixel })
  pixelsToBeFilled.length = 0

  const isInside = (x: number, y: number) => x >= 0 && y >= 0 && x < cellSideCount && y < cellSideCount && !pixelsOnDraw.some(([x2, y2]) => x === x2 && y === y2)

  const addPixel = (x: number, y: number) => {
    if (isInside(x, y)) {
      pixelsToBeFilled.push(new Uint16Array([x, y])) // Here was the bug - using wrong coordinates
      rgbsData[`${x}_${y}`] = color
      pixelsOnDraw.push([x, y])
    }
  }

  const run = (smoothX: number, smoothY: number) => {
    if (size === 1) {
      addPixel(smoothX, smoothY)
    }
    else if (size === 2 || size === 3) {
      const offsets = OFFSETS[size]
      for (const [dx, dy] of offsets) {
        addPixel(smoothX + dx!, smoothY + dy!)
      }
    }
    else {
      // Optimize radial calculation
      const radius = (size - 3) + 1.5
      const range = Math.ceil(radius)
      const radiusSquared = radius * radius // Avoid sqrt for performance

      for (let y = -range; y <= range; y++) {
        for (let x = -range; x <= range; x++) {
          if ((x * x + y * y) <= radiusSquared) {
            addPixel(smoothX + x, smoothY + y)
          }
        }
      }
    }
  }

  run(smoothX, smoothY)

  if (lastPixel) {
    const [prevX, prevY] = lastPixel
    const pixelsBetween = calculatePixelsBetween(prevX!, prevY!, smoothX, smoothY)

    for (const { x, y } of pixelsBetween) {
      run(x, y)
    }
  }

  self.postMessage({
    pixelsToBeFilled,
    rgbsData,
    pixelsOnDraw,
  })
}

