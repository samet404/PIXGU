import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { postMsgToCanvasWorker } from '@/workers'
import { useAmIPainting, usePainterTool } from '@/zustand/store'


export const bucket = (smoothX: number, smoothY: number) => {
    const button = useAmIPainting.getState().button
    console.log('button type: ', button)
    console.log('bucket')
    const color = new Uint8ClampedArray(usePainterTool.getState().with[button === 0 ? 'color1' : 'color2'])

    postMsgToCanvasWorker({
        e: 'bucket',
        data: {
            x: smoothX,
            y: smoothY,
            color
        }
    })

    sendToHostPeer({
        event: 'painterBucket',
        data: {
            x: smoothX,
            y: smoothY,
            color
        }
    })
}