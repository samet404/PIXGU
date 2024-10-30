function floodFillIterative(startX: number, startY: number, isInside: (x: number, y: number) => boolean, set: (x: number, y: number) => void): number[][] {
  const queue = [[startX, startY]];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  while (queue.length > 0) {
    const [x, y] = queue.shift()!
    set(x!, y!)


    for (const [dx, dy] of directions) {
      const newX = x! + dx!;
      const newY = y! + dy!;

      if (isInside(newX, newY)) {
        queue.push([newX, newY])
      }
    }
  }

  return queue
}


import { spanFill } from '@/utils/spanFill'
import { getPixel } from '../getPixel'
import { setPixel } from '../setPixel'

export type WorkerMessage = {
  smoothX: number
  smoothY: number
  imageData: ImageData
  cellPixelLength: number
  cellSideCount: number
}

self.addEventListener('message', ({ data }: { data: WorkerMessage }) => {
  // Sends a message of "Hellow, window!" from the web worker:
  const { smoothX, smoothY, cellSideCount, imageData, cellPixelLength } = data
  const targetColor = getPixel(
    imageData,
    cellPixelLength,
    smoothX,
    smoothY,
  )
  const [r, g, b, a] = targetColor

  console.log({
    targetColor,
    smoothX,
    smoothY,
    cellPixelLength,
    cellSideCount,
    imageData,
    getPixel: getPixel(imageData, cellPixelLength, smoothX, smoothY),
  })

  // setPixel(imageData, cellPixelLength, smoothX, smoothY, 255, 0, 0, 0)
  // console.log('after pixel: ', getPixel(imageData, cellPixelLength, smoothX, smoothY))

  const isInside = (x: number, y: number) => {
    // Check if the point (x, y) is inside the fillable area
    // Return true if inside, false otherwise
    console.log('isInside: ', x, y, cellSideCount)
    if (x >= 0 && y >= 0 && x < cellSideCount && y < cellSideCount) {
      console.log('isInside1: ', true)


      const pixelData = getPixel(imageData, cellPixelLength, x, y)
      const r2 = pixelData[0]
      const g2 = pixelData[1]
      const b2 = pixelData[2]
      const a2 = pixelData[3]

      const isColorEqual = r === r2 && g === g2 && b === b2 && a === a2
      console.log('isColorEqual: ', isColorEqual)
      console.log(r, g, b, a, r2, g2, b2, a2)

      console.log('isInside2: ', isColorEqual)
      return isColorEqual
    }

    console.log('isInside1: ', false)
    return false
  }

  const inside = floodFillIterative(
    smoothX,
    smoothY,
    (x, y) => isInside(x, y),
    (x, y) => {
      setPixel(imageData, cellPixelLength, x, y, r!, g!, b!, a!)
    },
  )


  self.postMessage(inside)
})

