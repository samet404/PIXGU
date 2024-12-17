import type { PainterMouseDown } from '@/types/webRTCConnData';
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers';

const canvasWorker = getCanvasWorker()

export const getPainterMouseDown = (data: PainterMouseDown['data']) =>
    canvasWorker.current.postMessage({
        e: 'mousedown',
        data: Object.values(data)
    } as CanvasWorkerOnMsgData)
