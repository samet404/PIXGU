import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { useHostCanvasesData } from '@/zustand/store'

export const resetHostCanvasesStates = () => {
    const canvasWorker = getCanvasWorker()
    const { mctx, dbctx, dpctx } = useHostCanvasesData.getState()


    mctx!.beginPath()
    mctx!.fillStyle = '#ffffff'
    mctx!.fillRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
    mctx!.closePath()

    dbctx!.beginPath()
    dbctx!.clearRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
    dbctx!.closePath()

    dpctx!.beginPath()
    dpctx!.clearRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
    dpctx!.closePath()


    canvasWorker.current.postMessage({ e: 3 } as CanvasWorkerOnMsgData)
}