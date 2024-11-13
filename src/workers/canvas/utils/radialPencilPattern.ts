import { calculatePixelsBetween } from '@/utils'

const OFFSETS = {
    2: [[0, 0], [1, 0], [0, 1], [1, 1]],
    3: [[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0]]
}

export const radialPencilPattern = ({ cellSideCount, color, lastPixel, pixels, pixelsOnDraw, size, startX, startY }: RadialPencilPatternInput) => {
    const pixelsToBeFilled: Uint16Array[] = []

    const isInside = (x: number, y: number) => x >= 0 && y >= 0 && x < cellSideCount && y < cellSideCount && !pixelsOnDraw.some(([x2, y2]) => x === x2 && y === y2)

    const addPixel = (x: number, y: number) => {
        if (isInside(x, y)) {
            pixelsToBeFilled.push(new Uint16Array([x, y]))
            pixels[x]![y]! = color
            pixelsOnDraw.push([x, y])
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
        const pixelsBetween = calculatePixelsBetween(prevX!, prevY!, startX, startY)

        for (const { x, y } of pixelsBetween) {
            run(x, y)
        }
    }

    return pixelsToBeFilled
}

export type RadialPencilPatternInput = {
    cellSideCount: number
    startX: number
    startY: number
    color: Uint8ClampedArray
    size: number
    pixels: Uint8ClampedArray[][]
    pixelsOnDraw: [x: number, y: number][]
    lastPixel: [x: number, y: number] | null
}