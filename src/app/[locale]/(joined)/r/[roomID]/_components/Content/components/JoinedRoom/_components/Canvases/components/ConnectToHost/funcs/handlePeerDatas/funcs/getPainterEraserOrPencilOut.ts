import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'

export const getPainterEraserOrPencilOut = () => {
    const canvasWorker = getCanvasWorker()

    canvasWorker.current.postMessage({ e: 'mouseUp' } as CanvasWorkerOnMsgData)
}