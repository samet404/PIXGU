import type { PainterBucket } from '@/types/webRTCConnData'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { useWhoIsPainter } from '@/zustand/store'

const canvasWorker = getCanvasWorker()

export const getPainterBucket = (data: PainterBucket['data'], userID: string) => {
    if (!useWhoIsPainter.getState().isPainter(userID)) return
    const { x, y, color } = data


    canvasWorker.current.postMessage({
        e: 0, data: {
            x,
            y,
            color
        }
    } as CanvasWorkerOnMsgData)
}
