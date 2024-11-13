import type { WorkerOnMsgData, WorkerPostMsgData } from './types'
import { positiveLog } from '@/utils/positiveLog'
import { fillOnePixel } from '@/helpers/room'
import { storePixelHistory } from '@/store'
import { useCanvasesMainData, usePainterTool } from '@/zustand/store'

const worker = new Worker(new URL('./worker.ts', import.meta.url), {
  type: 'module',
})

worker.onmessage = (e) => {
  const data: WorkerPostMsgData = e.data

  positiveLog('BUCKET WORKER DONE', data)
  const { coors, pixelHistory } = data
  storePixelHistory.value.history = {
    rgb: {
      ...storePixelHistory.value.history.rgb,
      ...pixelHistory.rgb
    },
    tool: {
      ...storePixelHistory.value.history.tool,
      ...pixelHistory.tool
    }
  }

  const { mctx, dbctx, draft_bucket, cellPixelLength } = useCanvasesMainData.getState()
  //TODO fix
  const color = usePainterTool.getState().with.color
  for (let i = 0; i < coors.length; i++) {
    const [x, y] = coors[i]!
    fillOnePixel(dbctx!, x!, y!, cellPixelLength!, new Uint8ClampedArray(color))
  }
  mctx!.drawImage(draft_bucket!, 0, 0)
  draft_bucket!.width = draft_bucket!.width
}

export const bucket = async (
  mctx: CanvasRenderingContext2D, dbctx: CanvasRenderingContext2D, draft_bucket: HTMLCanvasElement, smoothX: number, smoothY: number, cellSideCount: number, cellPixelLength: number, rgba: Uint8ClampedArray
) => {

  const msgData: WorkerOnMsgData = {
    smoothX,
    smoothY,
    cellSideCount: cellSideCount!,
    pixelHistory: storePixelHistory.get(),
  }

  worker.postMessage(msgData);
}