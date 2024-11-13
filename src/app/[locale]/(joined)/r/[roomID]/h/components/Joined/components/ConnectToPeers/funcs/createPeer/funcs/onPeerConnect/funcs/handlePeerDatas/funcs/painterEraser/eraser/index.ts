import { storePixelsOnDraw } from '@/store'
import { calculatePixelsBetween } from '@/utils/calculatePixelsBetween'
import { fillWithDefaultPattern } from '@/helpers/room'
import type { PainterEraser } from '@/types/webRTCConnData'
import {
    useHostCanvasesData,
} from '@/zustand/store'

const color = new Uint8ClampedArray([255, 255, 255, 255])

export const eraser = (
    data: PainterEraser['data'],
) => {
    const { x, y, size } = data
    const { mctx, cellPixelLength, cellSideCount } = useHostCanvasesData.getState()

    const runFillWithDefaultPattern = (x: number, y: number) => fillWithDefaultPattern(mctx!, x, y, cellSideCount, size, cellPixelLength!, color)

    runFillWithDefaultPattern(x, y)

    const lastPixelOnDraw = storePixelsOnDraw.get().lastPixel

    if (lastPixelOnDraw) {
        const [prevX, prevY] = lastPixelOnDraw
        const pixelsBetween = calculatePixelsBetween(prevX, prevY, x, y)

        for (let coordinates of pixelsBetween) {
            const { x, y } = coordinates
            runFillWithDefaultPattern(x, y)
        }
    }

    storePixelsOnDraw.setLastPixel([x, y])
}