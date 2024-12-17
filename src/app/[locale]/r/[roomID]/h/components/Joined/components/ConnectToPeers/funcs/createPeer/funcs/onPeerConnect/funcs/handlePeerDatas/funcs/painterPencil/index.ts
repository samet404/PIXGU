import type { PainterPencil } from '@/types/webRTCConnData';
import { sendToAllPeers } from '@/utils/sendToAllPeers';
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers';

const canvasWorker = getCanvasWorker()

export const getPainterPencil = (data: PainterPencil['data'], userID: string) => {
    const { x, y, color, size } = data

    canvasWorker.current.postMessage({
        e: 'pencil',
        data: {
            color,
            startX: x,
            startY: y,
            size
        }
    } as CanvasWorkerOnMsgData)

    sendToAllPeers({

        event: 'painterPencil',
        data
    }, {
        except: [userID]
    })
}
