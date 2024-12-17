import type { PainterEraser } from '@/types/webRTCConnData'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'

const canvasWorker = getCanvasWorker()

export const getPainterEraser = (data: PainterEraser['data']) => {
    const { x, y, size } = data

    canvasWorker.current.postMessage({
        e: 'eraser',
        data: {
            startX: x,
            startY: y,
            size
        }
    } as CanvasWorkerOnMsgData)
}