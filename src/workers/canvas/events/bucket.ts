import { alphaBlendRGBA } from '@/utils/alphaBlend';
import type { BucketInput, CanvasWorkerPostMsgData } from '../types';
import { addNewUndoRedoGroup } from '../utils/addNewUndoRedoGroup';

const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]]

export const bucket = ({ x: startX, y: startY, pixels, cellSideCount, blurInfo, color, undoRedo }: BucketInput) => {
    const pixelsToBeFilled: [coors: Uint16Array, color: Uint8ClampedArray][] = []
    const startRgb = pixels[startX]![startY]!
    const visited: Set<string> = new Set()
    const queue: [number, number][] = [[startX, startY]]

    const undoRedoOperationIndex = undoRedo.current.operationIndex

    const isInside = (x: number, y: number): [true, Uint8ClampedArray] | [false, undefined] => {
        if (x < 0 || y < 0 || x >= cellSideCount || y >= cellSideCount) return [false, undefined]

        const rgb = pixels[x]![y]!

        const inside = rgb[0] === startRgb[0] && rgb[1] === startRgb[1] && rgb[2] === startRgb[2]
        if (inside) return [true, rgb]
        return [false, undefined]
    }

    while (queue.length > 0) {
        const [x, y] = queue.shift()!
        const visitedKey = `${x},${y}`

        if (!visited.has(visitedKey)) {
            const [inside, prevPixel] = isInside(x, y)
            if (inside) {
                visited.add(visitedKey)
                const prevColor = pixels[x]![y]!
                const newColor = color[3] !== 255 ? alphaBlendRGBA(prevPixel, color) : color

                addNewUndoRedoGroup(undoRedo)
                const undoRedoGroupIndex = undoRedo.current.undoRedoGroup.index
                undoRedo.current.stack[undoRedoOperationIndex]![undoRedoGroupIndex]![0]!.push([new Uint16Array([x, y]), prevColor])
                undoRedo.current.stack[undoRedoOperationIndex]![undoRedoGroupIndex]![1]!.push([new Uint16Array([x, y]), newColor])


                pixels[x]![y]! = newColor
                if (blurInfo.hasBlur) blurInfo.blurStack.add([x, y])
                else pixelsToBeFilled.push([new Uint16Array([x, y]), newColor])

                // Add neighbors to queue
                for (const [dx, dy] of DIRECTIONS) {
                    queue.push([x + dx!, y + dy!])

                }
            }

        }
    }


    return {
        e: 'bucket',
        data: pixelsToBeFilled,
    } as CanvasWorkerPostMsgData
}