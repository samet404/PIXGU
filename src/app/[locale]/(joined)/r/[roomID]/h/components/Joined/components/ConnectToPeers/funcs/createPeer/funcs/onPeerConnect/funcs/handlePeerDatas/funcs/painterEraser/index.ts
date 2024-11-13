import type { PainterEraser } from '@/types/webRTCConnData';
import { eraser } from './eraser';
import { sendToAllPeers } from '@/utils/sendToAllPeers';
import { useWhoIsPainter } from '@/zustand/store';

export const getPainterEraser = (data: PainterEraser['data'], userID: string) => {
    if (!useWhoIsPainter.getState().isPainter(userID)) return

    eraser(data)
    sendToAllPeers({
        from: 'host',
        event: 'painterEraser',
        data
    }, {
        except: [userID]
    })
}