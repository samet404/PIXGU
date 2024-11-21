import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'

const canvasWorker = getCanvasWorker()

export const eyedropper = (x: number, y: number) => canvasWorker.current.postMessage({
  e: 6,
  data: [x, y]
} as CanvasWorkerOnMsgData)

