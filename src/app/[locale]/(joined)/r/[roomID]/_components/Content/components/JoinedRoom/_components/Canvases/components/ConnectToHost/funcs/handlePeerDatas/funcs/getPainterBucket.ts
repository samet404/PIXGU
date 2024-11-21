import type { PainterBucket } from '@/types/webRTCConnData'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'

const canvasWorker = getCanvasWorker()

export const getPainterBucket = (data: PainterBucket['data']) => {
    const { color, x, y } = data

    canvasWorker.current.postMessage({
        e: 0, data: {
            x,
            y,
            color
        }
    } as CanvasWorkerOnMsgData)
}

