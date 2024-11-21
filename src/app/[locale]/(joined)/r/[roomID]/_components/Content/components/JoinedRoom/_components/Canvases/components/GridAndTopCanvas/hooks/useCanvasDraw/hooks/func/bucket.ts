import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { useAmIPainting, usePainterTool } from '@/zustand/store'

const canvasWorker = getCanvasWorker()

export const bucket = (smoothX: number, smoothY: number) => {
    const button = useAmIPainting.getState().button
    const color = new Uint8ClampedArray(usePainterTool.getState().with[button === 0 ? 'color1' : 'color2'])
    canvasWorker.current.postMessage({
        e: 0, data: {
            x: smoothX,
            y: smoothY,
            color
        }
    } as CanvasWorkerOnMsgData)
    sendToHostPeer({

        event: 'painterBucket',
        data: {
            x: smoothX,
            y: smoothY,
            color
        }
    })
}