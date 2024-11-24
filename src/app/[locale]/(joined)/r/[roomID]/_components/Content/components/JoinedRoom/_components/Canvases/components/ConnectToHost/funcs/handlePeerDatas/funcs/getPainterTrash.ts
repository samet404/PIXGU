import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { useCanvasesMainData } from '@/zustand/store'

export const getPainterTrash = () => {

  const { mctx } = useCanvasesMainData.getState().get()
  const canvasWorker = getCanvasWorker()
  canvasWorker.current.postMessage({ e: 'reset' } as CanvasWorkerOnMsgData)

  mctx!.beginPath()
  mctx!.fillStyle = '#ffffff'
  mctx!.fillRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
  mctx!.closePath()
}
