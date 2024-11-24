import { sendToAllPeers } from '@/utils/sendToAllPeers';
import { postMsgToCanvasWorker } from '@/workers';

export const getPainterMouseUp = (userID: string) => {
    postMsgToCanvasWorker({ e: 'mouseUp' })

    sendToAllPeers({
        event: 'painterEraserOrPencilOut'
    }, {
        except: [userID]
    })
} 