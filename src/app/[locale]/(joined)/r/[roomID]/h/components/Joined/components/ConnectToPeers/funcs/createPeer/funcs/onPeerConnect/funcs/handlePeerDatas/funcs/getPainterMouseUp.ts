import { sendToAllPeers } from '@/utils/sendToAllPeers';
import { postMsgToCanvasWorker } from '@/workers';
import { useWhoIsPainter } from '@/zustand/store';

export const getPainterMouseUp = (userID: string) => {
    if (!useWhoIsPainter.getState().isPainter(userID)) return

    postMsgToCanvasWorker({ e: 'mouseUp' })

    sendToAllPeers({
        event: 'painterEraserOrPencilOut'
    }, {
        except: [userID]
    })
} 