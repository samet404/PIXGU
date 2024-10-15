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
  let setcount = 0
  const visited = new Set<string>()
  const { smoothX, smoothY, cellSideCount, imageData, cellPixelLength } = data
  const targetColor = getPixel(
    imageData,
    Math.floor(smoothX * cellPixelLength),
    Math.floor(smoothY * cellPixelLength),
  )
  const [r, g, b, a] = targetColor

  const inside = (x: number, y: number) => {
    // Check if the point (x, y) is inside the fillable area
    // Return true if inside, false otherwise
    if (x < 0 || y < 0 || x >= cellSideCount || y >= cellSideCount) return false

    const key = `${x},${y}`
    if (visited.has(key)) return false

    const pixelData = getPixel(imageData, x, y)
    const r2 = pixelData[0]
    const g2 = pixelData[1]
    const b2 = pixelData[2]
    const a2 = pixelData[3]

    const isColorEqual = r === r2 && g === g2 && b === b2 && a === a2
    console.log('isColorEqual: ', isColorEqual)
    console.log(r, g, b, a, r2, g2, b2, a2)
    return isColorEqual
  }

  spanFill(
    smoothX,
    smoothY,
    (x, y) => inside(x, y),
    (x, y) => {
      setcount++
      setPixel(imageData, cellSideCount, x, y, r!, g!, b!, a!)
      const key = `${x},${y}`
      visited.add(key)
    },
  )

  console.log('setcount: ', setcount)

  self.postMessage(imageData)
})
