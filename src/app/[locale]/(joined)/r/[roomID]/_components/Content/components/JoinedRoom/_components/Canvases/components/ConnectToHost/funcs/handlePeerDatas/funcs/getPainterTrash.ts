import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { useCanvasesMainData } from '@/zustand/store'

export const getPainterTrash = () => {

  const { mctx, dbctx, dpctx } = useCanvasesMainData.getState().get()
  const canvasWorker = getCanvasWorker()
  canvasWorker.current.postMessage({ e: 3 } as CanvasWorkerOnMsgData)

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


}
