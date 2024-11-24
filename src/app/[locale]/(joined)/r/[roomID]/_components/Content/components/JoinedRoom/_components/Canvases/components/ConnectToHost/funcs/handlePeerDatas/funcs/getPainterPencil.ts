import type { PainterPencil } from '@/types/webRTCConnData';
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers';

const canvasWorker = getCanvasWorker()

export const getPainterPencil = (data: PainterPencil['data']) => {
    const { x, y, color, size } = data

    canvasWorker.current.postMessage({
        e: 'pencil',
        data: {
            color,
            startX: x,
            startY: y,
            size
        }
    } as CanvasWorkerOnMsgData)
}