import type { BucketInput, WorkerPostMsgData } from '../types';

const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]]
const CHUNK_SIZE = 100

export const bucket = ({ x: startX, y: startY, pixels, cellSideCount }: BucketInput) => {
    const pixelsToBeFilled: Uint16Array[] = []
    const sRgb = pixels[startX]![startX]!
    const visited: Set<string> = new Set()
    const queue: [number, number][] = [[startX, startY]]

    const isInside = (x: number, y: number, startX: number, startY: number) => {
        if (x < 0 || y < 0 || x >= cellSideCount || y >= cellSideCount) return false

        const rgb = pixels[x]![y]!
        const sRgb = pixels[startX]![startY]!

        return rgb[0] === sRgb[0] && rgb[1] === sRgb[1] && rgb[2] === sRgb[2]
    }

    const processChunk = () => {
        let processed = 0

        while (queue.length > 0 && processed < CHUNK_SIZE) {
            const [x, y] = queue.shift()!
            const visitedKey = `${x},${y}`

            if (!visited.has(visitedKey) && isInside(x, y, startX, startY)) {
                visited.add(visitedKey)
                pixelsToBeFilled.push(new Uint16Array([x, y]))
                pixels[x]![y]! = sRgb
                processed++

                // Add neighbors to queue
                for (const [dx, dy] of DIRECTIONS) {
                    queue.push([x + dx!, y + dy!])
                }
            }
        }

        if (queue.length > 0)
            processChunk()
        else
            return {
                event: 0,
                coors: pixelsToBeFilled,
            } as WorkerPostMsgData

    }

    processChunk()
}