import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import {
    useAmIPainting,
    usePainterTool,
} from '@/zustand/store'

const canvasWorker = getCanvasWorker()

export const eraser = (
    smoothX: number,
    smoothY: number,
) => {
    if (!useAmIPainting.getState().amIPainting) return

    const size = usePainterTool.getState().options.eraser.size
    console.log('sending to worker with size: ', size)

    canvasWorker.current.postMessage({
        e: 'eraser',
        data: {
            startX: smoothX,
            startY: smoothY,
            size
        }
    } as CanvasWorkerOnMsgData)
    sendToHostPeer({

        event: 'painterEraser',
        data: {
            x: smoothX,
            y: smoothY,
            size
        }
    })
}