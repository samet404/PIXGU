import { storePixelHistory, storePixelsOnBucket } from '@/store'
import type { WorkerOnMsgData, WorkerPostMsgData } from './types'
import { grayLog } from '@/utils'

// Directions for scanning the bucket in flood algorithm
const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]]
const CHUNK_SIZE = 100

const isInside = (x: number, y: number, cellSideCount: number, trgba: Uint16Array) => {
    if (x < 0 || y < 0 || x >= cellSideCount || y >= cellSideCount) return false

    const [r, g, b] = storePixelHistory.getRgb(new Uint16Array([x, y]))
    const [rt, gt, bt] = trgba

    return r === rt && g === gt && b === bt
}

self.onmessage = (e) => {
    const pixelsToBeFilled: Uint16Array[] = []

    grayLog('BUCKET WORKER STARTED', e.data)
    const { smoothX, smoothY, pixelHistory, cellSideCount } = e.data as WorkerOnMsgData

    // initialize
    storePixelHistory.value.history = pixelHistory
    storePixelsOnBucket.reset()

    const trgba = storePixelHistory.getRgb(new Uint16Array([smoothX, smoothY]))

    const visited = new Set<string>()
    const queue: [number, number][] = [[smoothX, smoothY]]

    const processChunk = () => {
        let processed = 0

        while (queue.length > 0 && processed < CHUNK_SIZE) {
            const [x, y] = queue.shift()!
            const key = `${x},${y}`

            if (!visited.has(key) && isInside(x, y, cellSideCount, trgba)) {
                visited.add(key)
                pixelsToBeFilled.push(new Uint16Array([x, y]))
                storePixelHistory.add(x, y, new Uint16Array([x, y]))
                processed++

                // Add neighbors to queue
                for (const [dx, dy] of DIRECTIONS) {
                    queue.push([x + dx!, y + dy!])
                }
            }
        }

        if (queue.length > 0) {
            setTimeout(processChunk, 0)
        } else {
            console.log('Filled pixels:', pixelsToBeFilled.length)
            const msgData: WorkerPostMsgData = {
                coors: pixelsToBeFilled,
                pixelHistory: storePixelHistory.get(),
            }
            self.postMessage(msgData)
        }
    }

    processChunk()
}