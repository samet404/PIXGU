import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'

const canvasWorker = getCanvasWorker()

export const eyedropper = (x: number, y: number) => canvasWorker.current.postMessage({
  e: 'eyedropper',
  data: [x, y]
} as CanvasWorkerOnMsgData)

