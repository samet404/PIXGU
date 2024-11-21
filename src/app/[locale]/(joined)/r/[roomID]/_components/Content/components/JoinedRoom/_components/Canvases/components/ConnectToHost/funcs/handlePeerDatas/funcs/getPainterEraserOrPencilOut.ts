import { clearAndPasteToMainCanvas } from '@/helpers/room'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { useCanvasesMainData } from '@/zustand/store'

export const getPainterEraserOrPencilOut = () => {
    const canvasWorker = getCanvasWorker()

    canvasWorker.current.postMessage({ e: 4 } as CanvasWorkerOnMsgData)
    const { dpctx, mctx } = useCanvasesMainData.getState().get()
    clearAndPasteToMainCanvas(dpctx!, mctx!)
}