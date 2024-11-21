import { alphaBlendRGBA } from '@/utils/alphaBlend';
import type { BucketInput, CanvasWorkerPostMsgData } from '../types';

const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]]

export const bucket = ({ x: startX, y: startY, pixels, cellSideCount, color }: BucketInput) => {
    const pixelsToBeFilled: Uint16Array[] = []
    const sRgb = pixels[startX]![startY]!
    const visited: Set<string> = new Set()
    const queue: [number, number][] = [[startX, startY]]

    const isInside = (x: number, y: number, startX: number, startY: number) => {
        if (x < 0 || y < 0 || x >= cellSideCount || y >= cellSideCount) return false

        const rgb = pixels[x]![y]!

        return rgb[0] === sRgb[0] && rgb[1] === sRgb[1] && rgb[2] === sRgb[2]
    }


    while (queue.length > 0) {
        const [x, y] = queue.shift()!
        const visitedKey = `${x},${y}`

        if (!visited.has(visitedKey) && isInside(x, y, startX, startY)) {
            visited.add(visitedKey)
            pixelsToBeFilled.push(new Uint16Array([x, y]))
            const newColor = sRgb[3] !== 255 ? alphaBlendRGBA(pixels[x]![y]!, sRgb) : sRgb
            pixels[x]![y]! = newColor

            // Add neighbors to queue
            for (const [dx, dy] of DIRECTIONS) {
                queue.push([x + dx!, y + dy!])
            }
        }
    }


    return {
        e: 0,
        data: {
            coors: pixelsToBeFilled,
            color
        }
    } as CanvasWorkerPostMsgData
}