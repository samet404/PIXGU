import { alphaBlendRGBA, calculatePixelsBetween } from '@/utils'
import type { BlurInfo, UndoRedo } from '../types'
import { addNewUndoRedoGroup } from './addNewUndoRedoGroup'

const OFFSETS = {
    2: [[0, 0], [1, 0], [0, 1], [1, 1]],
    3: [[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0]]
}

export const radialPencilPattern = ({ cellSideCount, color, lastPixel, pixels, pixelsOnDraw, size, startX, startY, undoRedo, blurInfo }: RadialPencilPatternInput) => {
    const pixelsToBeFilled: [coors: Uint16Array, color: Uint8ClampedArray][] = []


    const undoRedoOperationIndex = undoRedo.current.operationIndex

    const isInside = (x: number, y: number) => x >= 0 && y >= 0 && x < cellSideCount && y < cellSideCount && !pixelsOnDraw.has(`${x},${y}`)

    const addPixel = (x: number, y: number) => {
        if (isInside(x, y)) {
            const prevColor = pixels[x]![y]!
            const newColor = color[3] !== 255 ? alphaBlendRGBA(prevColor, color) : color
            if (prevColor[0] === newColor[0] && prevColor[1] === newColor[1] && prevColor[2] === newColor[2]) return

            addNewUndoRedoGroup(undoRedo)
            const undoRedoGroupIndex = undoRedo.current.undoRedoGroup.index
            undoRedo.current.stack[undoRedoOperationIndex]![undoRedoGroupIndex]![0].push([new Uint16Array([x, y]), prevColor])
            undoRedo.current.stack[undoRedoOperationIndex]![undoRedoGroupIndex]![1].push([new Uint16Array([x, y]), newColor])

            pixels[x]![y] = newColor
            pixelsOnDraw.add(`${x},${y}`)
            if (blurInfo.hasBlur) blurInfo.blurStack.add([x, y])
            else pixelsToBeFilled.push([new Uint16Array([x, y]), newColor])
        }
    }

    const run = (startX: number, startY: number) => {
        if (size === 1) addPixel(startX, startY)
        else if (size === 2 || size === 3) {
            const offsets = OFFSETS[size]
            for (const [dx, dy] of offsets) {
                addPixel(startX + dx!, startY + dy!)
            }
        }
        else {
            const radius = (size - 3) + 1.5
            const range = Math.ceil(radius)
            const radiusSquared = radius * radius

            for (let y = -range; y <= range; y++) {
                for (let x = -range; x <= range; x++) {
                    if ((x * x + y * y) <= radiusSquared) {
                        addPixel(startX + x, startY + y)
                    }
                }
            }
        }
    }

    run(startX, startY)

    if (lastPixel) {
        const [prevX, prevY] = lastPixel
        const pixelsBetween = calculatePixelsBetween(prevX, prevY, startX, startY)

        for (const { x, y } of pixelsBetween) {
            run(x, y)
        }
    }

    return pixelsToBeFilled
}

export type RadialPencilPatternInput = {
    undoRedo: UndoRedo
    cellSideCount: number
    startX: number
    startY: number
    color: Uint8ClampedArray
    size: number
    pixels: Uint8ClampedArray[][]
    pixelsOnDraw: Set<`${number},${number}`>
    lastPixel: [x: number, y: number] | null
    blurInfo: BlurInfo
}



