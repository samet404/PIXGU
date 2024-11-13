import type { WorkerOnMsgData as PatternWorkerOnMsgData, WorkerPostMsgData as PatternWorkerPostMsgData } from './fillWithDefaultPatternWorker/types'
import { storePixelHistory, storePixelsOnDraw } from '@/store'
import { fillOnePixel } from './fillOnePixel'

let mainData: {
    dpctx: CanvasRenderingContext2D,
    smoothX: number,
    smoothY: number,
    color: Uint8ClampedArray,
    cellPixelLength: number,
    cellSideCount: number,
    size: number,
} | null = null

let fillWithDefaultPatternWorker: Worker | null = null

export const eraser = (
    dpctx: CanvasRenderingContext2D,
    smoothX: number,
    smoothY: number,
    color: Uint8ClampedArray,
    cellPixelLength: number,
    cellSideCount: number,
    size: number,
) => {
    console.log('eraser')
    return
    if (!fillWithDefaultPatternWorker) {
        fillWithDefaultPatternWorker = new Worker(new URL('./fillWithDefaultPatternWorker/index.ts', import.meta.url), {
            type: 'module',
        })

        fillWithDefaultPatternWorker.onmessage = (e) => {
            const { pixelHistory, pixelsOnDraw, pixelsToBeFilled } = e.data as PatternWorkerPostMsgData
            const { dpctx, color, cellPixelLength } = mainData!

            for (const coors of pixelsToBeFilled) {
                const [x, y] = coors
                fillOnePixel(dpctx, x!, y!, cellPixelLength!, color)
            }

            storePixelsOnDraw.value = pixelsOnDraw
            storePixelHistory.value.history = {
                ...storePixelHistory.value.history,
                ...pixelHistory
            }
        }
    }

    mainData = {
        dpctx,
        smoothX,
        smoothY,
        color,
        cellPixelLength,
        cellSideCount,
        size,
    }

    const msgData: PatternWorkerOnMsgData = {
        cellSideCount,
        smoothX,
        smoothY,
        color,
        size,
        pixelsOnDraw: storePixelsOnDraw.get(),
        pixelHistory: storePixelHistory.value.history,
    }

    fillWithDefaultPatternWorker.postMessage(msgData)
    storePixelsOnDraw.setLastPixel([smoothX, smoothY])
}