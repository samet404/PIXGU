import type { PainterMouseDown } from '@/types/webRTCConnData'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'

const canvasWorker = getCanvasWorker()

export const getPainterMouseDown = (data: PainterMouseDown['data'], userID: string) => {

    canvasWorker.current.postMessage({
        e: 'mousedown',
        data: Object.values(data)
    } as CanvasWorkerOnMsgData)

    sendToAllPeers({
        event: 'painterMouseDown',
        data: data
    }, {
        except: [userID]
    })
}