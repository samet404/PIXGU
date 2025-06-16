import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { useHostCanvasesData } from '@/zustand/store/useHostCanvasesData'

export const resetHostCanvasesStates = () => {
    const canvasWorker = getCanvasWorker()
    const { mctx } = useHostCanvasesData.getState()


    mctx!.beginPath()
    mctx!.fillStyle = '#ffffff'
    mctx!.fillRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
    mctx!.closePath()

    canvasWorker.current.postMessage({ e: 'reset' } as CanvasWorkerOnMsgData)
}