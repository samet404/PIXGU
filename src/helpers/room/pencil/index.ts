import type { WorkerOnMsgData as PatternWorkerOnMsgData, WorkerPostMsgData as PatternWorkerPostMsgData } from '../fillWithDefaultPatternWorker/types'
import { storePixelHistory, storePixelsOnDraw } from '@/store'
import { fillOnePixel } from '../fillOnePixel'
import { useCanvasesMainData, usePainterTool } from '@/zustand/store'

const fillWithDefaultPatternWorker = new Worker(new URL('../fillWithDefaultPatternWorker/index.ts', import.meta.url), {
    type: 'module',
})

let isProcessing = false
const queue: Array<{
    smoothX: number,
    smoothY: number,
    color: Uint8ClampedArray,
    size: number,
}> = []

fillWithDefaultPatternWorker.onmessage = (e) => {
    const { rgbsData, pixelsOnDraw, pixelsToBeFilled } = e.data as PatternWorkerPostMsgData
    const { dpctx, cellPixelLength } = useCanvasesMainData.getState()

    for (const [x, y] of pixelsToBeFilled) {
        fillOnePixel(dpctx!, x!, y!, cellPixelLength!, queue[0]!.color)
    }

    storePixelsOnDraw.value.value = [...storePixelsOnDraw.value.value, ...pixelsOnDraw]
    storePixelHistory.value.history.rgb = {
        ...storePixelHistory.value.history.rgb,
        ...rgbsData
    }

    queue.shift()
    isProcessing = false

    if (queue.length > 0) processPencil()

}

function processPencil() {
    const t0 = Date.now()

    console.log('processPencil')
    isProcessing = true
    const { smoothX, smoothY, color, size } = queue[0]!
    const { cellSideCount } = useCanvasesMainData.getState()

    const msgData: PatternWorkerOnMsgData = {
        cellSideCount,
        smoothX,
        smoothY,
        color,
        size,
        pixelsOnDraw: storePixelsOnDraw.get().value,
        lastPixel: storePixelsOnDraw.get().lastPixel,
        rgbsData: storePixelHistory.value.history.rgb,
    }

    console.log('msgData:', JSON.parse(JSON.stringify(msgData))) // This will show us what can be serialized

    fillWithDefaultPatternWorker.postMessage(msgData)
    storePixelsOnDraw.setLastPixel([smoothX, smoothY])

    console.log(`pencil took ${Date.now() - t0} milliseconds.`);
}


export const pencil = (
    smoothX: number,
    smoothY: number,
) => {
    console.log('pencil', { smoothX, smoothY })
    const size = usePainterTool.getState().options.pencil.size
    const color = new Uint8ClampedArray(usePainterTool.getState().with.color)

    queue.push({ smoothX, smoothY, color, size })

    if (!isProcessing) processPencil()

}